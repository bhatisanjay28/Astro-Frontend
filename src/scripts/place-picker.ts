/**
 * Birthplace autocomplete (owner directive, 2026-11-20) — enhances every
 * [data-place-field] rendered by PlaceField.astro. Suggestions come from the
 * backend /places proxy (Google Places when configured, the Vyotish city
 * table otherwise); the chosen place is resolved to lat/lng/IANA-tz and
 * written into the wrapper's hidden role inputs, so the pages' existing
 * submit logic keeps working unchanged.
 *
 * Search-select UX (S15-1, owner directive 2026-11-21):
 *   × clear button — visible whenever the input holds text; wipes text +
 *     roles + selection, refocuses the input, announces via the status line.
 *   focus/click select-all — the first keystroke replaces a filled field.
 *   any edit after a selection invalidates it immediately (roles wiped,
 *     data-place-selected removed, per-field Places session reset,
 *     suggestions dropped), so a stale place can never submit with new text.
 *   free text without a pick → aria-invalid + "Please select a city from
 *     the list." on blur.
 *   Escape closes the list (first press) and clears the field (second).
 *   disabled/readonly fields bind nothing (no × button is rendered either).
 *
 * Selection state is the wrapper's data-place-selected="true" attribute —
 * SSR prefill renders it, edits/clears remove it, and consumers/tests can
 * read it. `window.vyPlacePicker.rebind()` re-derives it for fields injected
 * after load (dynamic hosts) or whose saved state was written client-side.
 */

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL ?? "https://astro-backend.vyotish.workers.dev";

/** fresh Google Places billing session — per field, reset on clear/edit-after-pick */
function makeSession(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

interface Suggestion {
  place_id: string;
  main: string;
  secondary: string;
  label: string;
}

function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] ?? ch,
  );
}

/** Dropdown styles — injected once; token vars keep it on-theme everywhere. */
function injectStyles(): void {
  if (document.getElementById("pp-styles")) return;
  const style = document.createElement("style");
  style.id = "pp-styles";
  style.textContent = `
    .pp-list {
      position: absolute; top: 100%; left: 0; right: 0; z-index: 40;
      background: var(--bg-raised, #fff);
      border: 1px solid var(--color-border-strong, #bbb);
      border-radius: var(--radius-card, 10px);
      box-shadow: 0 8px 24px rgba(0,0,0,.25);
      overflow: hidden; max-height: 260px; overflow-y: auto;
    }
    .pp-opt {
      display: flex; flex-direction: column; gap: 1px; width: 100%;
      text-align: left; padding: 9px 12px; border: none; cursor: pointer;
      background: transparent; font: inherit; font-size: 13.5px;
    }
    .pp-opt + .pp-opt { border-top: 1px solid var(--border-faint, #8882); }
    .pp-opt:hover, .pp-opt.active { background: var(--bg-hover, #8881); }
    .pp-opt .pp-main { color: var(--text-body, #1a1a1a); font-weight: 500; }
    .pp-opt .pp-sec { color: var(--text-dim, #777); font-size: 12px; }
    .pp-empty { padding: 10px 12px; color: var(--text-dim, #777); font-size: 13px; }
  `;
  document.head.appendChild(style);
}

const bound = new WeakSet<HTMLElement>();
/** per-field state re-derivation (used by setupField and rebind) */
const derivers = new WeakMap<HTMLElement, () => void>();

function setupField(field: HTMLElement): void {
  if (bound.has(field)) return;
  bound.add(field);
  const input = field.querySelector<HTMLInputElement>("[data-place-input]");
  const list = field.querySelector<HTMLElement>("[data-place-list]");
  const status = field.querySelector<HTMLElement>("[data-place-status]");
  if (!input || !list || !status) return;
  // locked fields (AC-8): no bindings, no clear button, no validation
  if (input.disabled || input.readOnly) return;
  const clearBtn = field.querySelector<HTMLButtonElement>("[data-place-clear]");
  const roles = {
    lat: field.querySelector<HTMLInputElement>('[data-place-role="lat"]'),
    lng: field.querySelector<HTMLInputElement>('[data-place-role="lng"]'),
    tz: field.querySelector<HTMLInputElement>('[data-place-role="tz"]'),
    combined: field.querySelector<HTMLInputElement>('[data-place-role="combined"]'),
    place_id: field.querySelector<HTMLInputElement>('[data-place-role="place_id"]'),
  };

  let items: Suggestion[] = [];
  let activeIdx = -1;
  let debounceT: ReturnType<typeof setTimeout> | undefined;
  let lastQuery = "";
  let session = makeSession();

  const isSelected = (): boolean => field.getAttribute("data-place-selected") === "true";

  const setError = (msg: string): void => {
    status.textContent = msg;
    status.classList.add("pp-error");
    input.setAttribute("aria-invalid", "true");
  };

  const clearError = (): void => {
    status.classList.remove("pp-error");
    input.removeAttribute("aria-invalid");
  };

  /** plain (non-error) status text — also drops any validation state */
  const say = (msg: string): void => {
    clearError();
    status.textContent = msg;
  };

  const close = (): void => {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    activeIdx = -1;
  };

  const syncClear = (): void => {
    if (!clearBtn) return;
    const show = input.value.length > 0;
    clearBtn.hidden = !show;
    input.classList.toggle("has-clear", show);
  };

  const clearRoles = (): void => {
    for (const el of [roles.lat, roles.lng, roles.tz, roles.combined, roles.place_id]) {
      if (el) el.value = "";
    }
    field.removeAttribute("data-place-selected");
  };

  /** full clear — text + stored selection (AC-1); refocus + announce */
  const clearField = (announce: boolean): void => {
    input.value = "";
    lastQuery = "";
    clearRoles();
    items = [];
    session = makeSession();
    clearError();
    status.textContent = announce ? "City cleared." : "";
    close();
    syncClear();
    input.focus();
  };

  const renderList = (): void => {
    if (items.length === 0) {
      list.innerHTML =
        '<div class="pp-empty">No matching place found — try a nearby larger city.</div>';
    } else {
      list.innerHTML = items
        .map(
          (s, i) =>
            `<button type="button" class="pp-opt${i === activeIdx ? " active" : ""}" role="option" aria-selected="${i === activeIdx}" tabindex="-1" data-idx="${i}">` +
            `<span class="pp-main">${esc(s.main)}</span>` +
            (s.secondary ? `<span class="pp-sec">${esc(s.secondary)}</span>` : "") +
            `</button>`,
        )
        .join("");
    }
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  };

  const choose = (idx: number): void => {
    const s = items[idx];
    if (!s) return;
    input.value = s.label;
    say("Resolving coordinates…");
    close();
    fetch(`${API_BASE}/api/v1/places/resolve?place_id=${encodeURIComponent(s.place_id)}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok || j.error) {
          // fail closed: the previous selection (if any) must not linger
          clearRoles();
          syncClear();
          say("Could not resolve that place — please pick another from the list.");
          input.select();
          return;
        }
        const d = j.data as {
          place_id?: string;
          lat: number;
          lng: number;
          tz: string;
          label: string;
          structured?: Record<string, unknown>;
        };
        clearRoles();
        const pid = d.place_id ?? s.place_id;
        if (roles.place_id) roles.place_id.value = pid;
        if (roles.combined) roles.combined.value = `${d.lat},${d.lng},${d.tz}`;
        if (roles.lat) roles.lat.value = String(d.lat);
        if (roles.lng) roles.lng.value = String(d.lng);
        if (roles.tz) roles.tz.value = d.tz;
        field.setAttribute("data-place-selected", "true");
        session = makeSession(); // this session was consumed by the pick
        syncClear();
        say(`✓ ${d.label || s.label}`);
        input.select(); // type-to-replace without refocusing (AC-2)
        // bubbles so section-level consumers can listen on a wrapper
        field.dispatchEvent(
          new CustomEvent("place:selected", {
            bubbles: true,
            detail: {
              ...d,
              place_id: pid,
              // city-table picks expose their slug (panchang city URLs use it)
              slug: pid.startsWith("city:") ? pid.slice(5) : undefined,
            },
          }),
        );
      })
      .catch(() => {
        clearRoles();
        syncClear();
        say("Could not reach the place service — please try again.");
      });
  };

  const fetchSuggest = (q: string): void => {
    lastQuery = q;
    fetch(`${API_BASE}/api/v1/places/autocomplete?q=${encodeURIComponent(q)}&session=${session}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok || j.error) {
          items = [];
          say("Suggestions are unavailable right now — please try again shortly.");
          close();
          return;
        }
        items = (j.data?.suggestions ?? []) as Suggestion[];
        renderList();
      })
      .catch(() => {
        items = [];
        say("Suggestions are unavailable right now — please try again shortly.");
        close();
      });
  };

  // mousedown so clicking an option does not lose focus/trigger blur-close
  list.addEventListener("mousedown", (e) => e.preventDefault());
  list.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-idx]");
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    if (!Number.isNaN(idx)) choose(idx);
  });

  // AC-2: the first keystroke replaces a filled field. Deferred one tick —
  // a real mouse click finalises caret placement after the click handler,
  // which would collapse a synchronous select().
  const scheduleSelect = (): void => {
    if (input.value) setTimeout(() => input.select(), 0);
  };
  input.addEventListener("focus", scheduleSelect);
  input.addEventListener("click", scheduleSelect);

  input.addEventListener("input", () => {
    // typing invalidates any previous selection (stale coordinates guard, AC-2/3)
    const hadSelection = isSelected();
    clearRoles();
    if (hadSelection) {
      items = []; // drop the consumed session's suggestions (AC-3)
      session = makeSession();
      lastQuery = ""; // retyping the same query must fetch again (session consumed)
    }
    clearError();
    status.textContent = "";
    syncClear();
    const q = input.value.trim();
    if (debounceT) clearTimeout(debounceT);
    if (q.length < 2) {
      lastQuery = "";
      close();
      return;
    }
    if (q === lastQuery) return;
    debounceT = setTimeout(() => fetchSuggest(q), 250);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // AC-5: first Esc closes the list, second Esc clears the field
      if (!list.hidden) close();
      else if (input.value) clearField(true);
      return;
    }
    if (list.hidden || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIdx = (activeIdx + 1) % items.length;
      renderList();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIdx = activeIdx <= 0 ? items.length - 1 : activeIdx - 1;
      renderList();
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(Math.max(activeIdx, 0));
    }
  });

  if (clearBtn) {
    // keep focus in the input while using × (AC-1)
    clearBtn.addEventListener("mousedown", (e) => e.preventDefault());
    clearBtn.addEventListener("click", () => clearField(true));
  }

  input.addEventListener("blur", () =>
    setTimeout(() => {
      close();
      // focus moved back inside the field (e.g. × keeps it via mousedown) — skip
      if (field.contains(document.activeElement)) return;
      // AC-4: free text without a pick must never look valid
      if (input.value.trim() && !isSelected()) setError("Please select a city from the list.");
    }, 150),
  );

  derivers.set(
    field,
    (): void => {
      // AC-7: adopt SSR prefill / saved state — visible text AND resolved roles
      const rolesFilled = Boolean((roles.combined ?? roles.lat)?.value);
      if (input.value.trim() && rolesFilled) {
        field.setAttribute("data-place-selected", "true");
        syncClear();
      } else {
        // nothing (or hidden-only defaults like muhurat's New Delhi) — no ×
        field.removeAttribute("data-place-selected");
        syncClear();
      }
    },
  );
  derivers.get(field)?.();
}

void (async () => {
  injectStyles();
  document.querySelectorAll<HTMLElement>("[data-place-field]").forEach(setupField);
})();

export {};

declare global {
  interface Window {
    vyPlacePicker: { rebind(): void };
  }
}
// Re-scan for fields added after load and re-derive saved state — the public
// seam for dynamic hosts (and the e2e harness) that inject PlaceField markup
// or write a saved place client-side.
window.vyPlacePicker = {
  rebind(): void {
    injectStyles();
    document.querySelectorAll<HTMLElement>("[data-place-field]").forEach((field) => {
      if (!bound.has(field)) setupField(field);
      derivers.get(field)?.();
    });
  },
};
