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
): Promise<
  { ok: true; status: number; body: T } | { ok: false; status: number; body: ApiEnvelope }
> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
    },
  });
  if (res.status === 401 && sessionStorage.getItem(REFRESH_KEY) && !path.startsWith("/auth")) {
    const refreshed = await tryRefresh();
    if (refreshed) return api(path, init);
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
    .replace(/"/g, "&quot;");
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

/** Gate: verify the stored token against /admin/me; redirect if invalid. */
export async function requireSession(): Promise<boolean> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (!token) {
    location.href = "/admin/login";
    return false;
  }
  const res = await api<{ data?: { email?: string; role?: string; aal?: string } }>(
    "/api/v1/admin/me",
  );
  if (!res.ok) return false;
  const email = el<HTMLSpanElement>("#admin-email");
  if (email) email.textContent = res.body.data?.email ?? "";
  return true;
}

export function logout(): void {
  clearSession();
  location.href = "/admin/login";
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
