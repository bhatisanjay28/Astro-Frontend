/**
 * Admin UI shared client (Epic 6.4). The UI is a thin client over the
 * admin API — all real authorization happens server-side (requireAdmin,
 * 401/403); this module only manages the token lifecycle and small DOM
 * helpers. Tokens live in sessionStorage (per-tab, no persistence).
 */

export const API_BASE =
  import.meta.env.PUBLIC_API_BASE_URL ?? "https://astro-backend.vyotish.workers.dev";

const TOKEN_KEY = "vyotish.admin.token";
const REFRESH_KEY = "vyotish.admin.refresh";
const EMAIL_KEY = "vyotish.admin.email";

export function saveSession(token: string, refresh: string, email: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(REFRESH_KEY, refresh);
  sessionStorage.setItem(EMAIL_KEY, email);
}

export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
}

export function storedEmail(): string {
  return sessionStorage.getItem(EMAIL_KEY) ?? "";
}

interface ApiEnvelope {
  data?: unknown;
  meta?: unknown;
  error?: { code: string; message: string; details?: unknown };
}

/** Authenticated API call. On 401 tries one refresh, then bounces to login. */
export async function api<T = ApiEnvelope>(
  path: string,
  init: RequestInit = {},
  depth = 0,
): Promise<
  { ok: true; status: number; body: T } | { ok: false; status: number; body: ApiEnvelope }
> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // FormData AND Blob/File bodies carry their own content-type — forcing
      // application/json onto an upload makes the Workers validator 400
      // (phase-3 review P1-2; File extends Blob).
      ...(init.body && !(init.body instanceof FormData) && !(init.body instanceof Blob)
        ? { "Content-Type": "application/json" }
        : {}),
    },
  });
  // Depth guard: only ONE refresh-retry per logical call. If refresh keeps
  // succeeding while the endpoint keeps 401ing (project misconfiguration),
  // bounce to login instead of recursing forever (QA phase-1 finding 10).
  if (
    res.status === 401 &&
    depth < 1 &&
    sessionStorage.getItem(REFRESH_KEY) &&
    !path.startsWith("/auth")
  ) {
    const refreshed = await tryRefresh();
    if (refreshed) return api(path, init, depth + 1);
  }
  let body: ApiEnvelope = {};
  try {
    body = (await res.json()) as ApiEnvelope;
  } catch {
    /* non-JSON (e.g. CSV) — leave empty */
  }
  if (res.status === 401 && !path.startsWith("/auth")) {
    clearSession();
    location.href = "/admin/login";
  }
  return res.ok
    ? { ok: true, status: res.status, body: body as T }
    : { ok: false, status: res.status, body };
}

async function tryRefresh(): Promise<boolean> {
  const refresh = sessionStorage.getItem(REFRESH_KEY);
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { data?: { access_token?: string; refresh_token?: string } };
    if (!body.data?.access_token) return false;
    sessionStorage.setItem(TOKEN_KEY, body.data.access_token);
    if (body.data.refresh_token) sessionStorage.setItem(REFRESH_KEY, body.data.refresh_token);
    return true;
  } catch {
    return false;
  }
}

/* ----------------------------- DOM helpers ----------------------------- */

export function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;"); // single-quoted attrs in generated HTML
}

export function el<T extends HTMLElement>(sel: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(sel);
}

export function toast(msg: string, bad = false): void {
  const t = el<HTMLDivElement>("#admin-toast");
  if (!t) return;
  t.textContent = msg;
  t.className = bad ? "toast bad" : "toast";
  t.removeAttribute("hidden");
  setTimeout(() => t.setAttribute("hidden", ""), 3500);
}

/** Renders rows into a <tbody>; empty state keeps an honest message. */
export function renderRows<T>(
  tbodySel: string,
  rows: T[] | undefined,
  rowHtml: (r: T) => string,
  emptyText = "Nothing here yet.",
): void {
  const tbody = el<HTMLTableSectionElement>(tbodySel);
  if (!tbody) return;
  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty">${esc(emptyText)}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(rowHtml).join("");
}

/** Gate: verify the stored token against /admin/me; redirect if invalid.
 * Also arms the 30-minute idle timer and fills the sidebar identity chip. */
export async function requireSession(): Promise<boolean> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (!token) {
    location.href = "/admin/login";
    return false;
  }
  const res = await api<{
    data?: {
      user_id?: string;
      email?: string;
      role?: string;
      display_name?: string | null;
      capabilities?: string[];
    };
  }>("/api/v1/admin/me");
  if (!res.ok) return false;
  const me = res.body.data ?? {};
  const email = el<HTMLSpanElement>("#admin-email");
  if (email) email.textContent = me.display_name || me.email || "";
  const role = el<HTMLSpanElement>("#admin-role");
  if (role) {
    role.textContent = (me.role ?? "").replace(/_/g, " ") || "staff";
    role.removeAttribute("hidden");
  }
  // capabilities power UI affordances only — the API remains the real gate
  const w = window as unknown as {
    __vyotishAdmin?: { userId: string; role: string; capabilities: string[] };
  };
  w.__vyotishAdmin = {
    userId: me.user_id ?? "",
    role: me.role ?? "",
    capabilities: me.capabilities ?? [],
  };
  armIdleLogout();
  return true;
}

/**
 * Admin Phase 1 — sign out properly: revoke the Supabase session
 * server-side, then drop the local token. Best-effort: even if the revoke
 * call fails, the local session is cleared and the user is bounced.
 */
export function logout(reason?: string): void {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const finish = (): void => {
    clearSession();
    location.href = `/admin/login${reason ? `?reason=${encodeURIComponent(reason)}` : ""}`;
  };
  if (!token) {
    finish();
    return;
  }
  void fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: token }),
  })
    .catch(() => undefined)
    .finally(finish);
}

/** 30 minutes without interaction ends the session (idle timeout). */
const IDLE_MS = 30 * 60 * 1000;
let idleTimer: ReturnType<typeof setTimeout> | undefined;

function armIdleLogout(): void {
  if (idleTimer !== undefined) return; // arm once per page
  const reset = (): void => {
    if (idleTimer !== undefined) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      // Revoke the server session, not just the local copy — clearSession()
      // alone left the Supabase session live until token expiry (QA
      // phase-1 finding 10).
      logout("idle");
    }, IDLE_MS);
  };
  for (const ev of ["pointerdown", "keydown", "scroll"] as const) {
    document.addEventListener(ev, reset, { passive: true });
  }
  reset();
}

export function fmtDate(v: unknown): string {
  if (typeof v !== "string" || !v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
        d,
      );
}
