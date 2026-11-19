/**
 * Birthplace autocomplete (owner directive, 2026-11-20) — enhances every
 * [data-place-field] rendered by PlaceField.astro. Suggestions come from the
 * backend /places proxy (Google Places when configured, the Vyotish city
 * table otherwise); the chosen place is resolved to lat/lng/IANA-tz and
 * written into the wrapper's hidden role inputs, so the pages' existing
 * submit logic keeps working unchanged.
 */

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL ?? "https://astro-backend.vyotish.workers.dev";

// one billing session per page load (Google Places session pricing)
const SESSION =
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now());

interface Suggestion {
  place_id: string;
  main: string;
  secondary: string;
  label: string;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] ?? ch
  ));
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

function setupField(field: HTMLElement): void {
  const input = field.querySelector<HTMLInputElement>("[data-place-input]");
  const list = field.querySelector<HTMLElement>("[data-place-list]");
  const status = field.querySelector<HTMLElement>("[data-place-status]");
  if (!input || !list || !status) return;
  const roles = {
    lat: field.querySelector<HTMLInputElement>('[data-place-role="lat"]'),
    lng: field.querySelector<HTMLInputElement>('[data-place-role="lng"]'),
    tz: field.querySelector<HTMLInputElement>('[data-place-role="tz"]'),
    combined: field.querySelector<HTMLInputElement>('[data-place-role="combined"]'),
  };

  let items: Suggestion[] = [];
  let activeIdx = -1;
  let debounceT: ReturnType<typeof setTimeout> | undefined;
  let lastQuery = "";

  const clearValue = (): void => {
    for (const el of [roles.lat, roles.lng, roles.tz, roles.combined]) {
      if (el) el.value = "";
    }
  };

  const close = (): void => {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    activeIdx = -1;
  };

  const renderList = (): void => {
    if (items.length === 0) {
      list.innerHTML = '<div class="pp-empty">No matching place found — try a nearby larger city.</div>';
    } else {
      list.innerHTML = items
        .map(
          (s, i) =>
            `<button type="button" class="pp-opt${i === activeIdx ? " active" : ""}" role="option" aria-selected="${i === activeIdx}" data-idx="${i}">` +
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
    status.textContent = "Resolving coordinates…";
    close();
    fetch(`${API_BASE}/api/v1/places/resolve?place_id=${encodeURIComponent(s.place_id)}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok || j.error) {
          status.textContent = "Could not resolve that place — please pick another from the list.";
          return;
        }
        const d = j.data as { lat: number; lng: number; tz: string; label: string };
        clearValue();
        if (roles.combined) roles.combined.value = `${d.lat},${d.lng},${d.tz}`;
        if (roles.lat) roles.lat.value = String(d.lat);
        if (roles.lng) roles.lng.value = String(d.lng);
        if (roles.tz) roles.tz.value = d.tz;
        status.textContent = `✓ ${d.label || s.label}`;
        field.dispatchEvent(new CustomEvent("place:selected", { detail: d }));
      })
      .catch(() => {
        status.textContent = "Could not reach the place service — please try again.";
      });
  };

  const fetchSuggest = (q: string): void => {
    lastQuery = q;
    fetch(`${API_BASE}/api/v1/places/autocomplete?q=${encodeURIComponent(q)}&session=${SESSION}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok || j.error) {
          items = [];
          status.textContent = "Suggestions are unavailable right now — please try again shortly.";
          close();
          return;
        }
        items = (j.data?.suggestions ?? []) as Suggestion[];
        renderList();
      })
      .catch(() => {
        status.textContent = "Suggestions are unavailable right now — please try again shortly.";
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

  input.addEventListener("input", () => {
    // typing invalidates any previous selection (stale coordinates guard)
    clearValue();
    status.textContent = "";
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
      choose(activeIdx >= 0 ? activeIdx : 0);
    } else if (e.key === "Escape") {
      close();
    }
  });

  input.addEventListener("blur", () => setTimeout(close, 150));
}

void (async () => {
  injectStyles();
  document.querySelectorAll<HTMLElement>("[data-place-field]").forEach(setupField);
})();
