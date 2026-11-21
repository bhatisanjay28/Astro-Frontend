/**
 * Calculator results renderer — Epic 14 S14-2 AC-2/AC-3
 * (design/output-spec.md §1–§3). Emits the shared B1–B5 block structure with
 * spec class names; styles live in the `is:global` block of
 * pages/calculators/[tool].astro keyed off [data-calc-result] (JS-injected
 * nodes never match Astro scoped CSS — the root-cause fix for "alignment").
 *
 * The frontend never invents astrology copy: verdicts, meanings and guidance
 * all come from the API (D12). Unknown data keys still render as detail rows.
 */
import { CALC_MAP, LO_SHU_PLANET_NAMES } from "./calculator-render-map";
import type { Cell, Chip, DetailCard, ToolSpec } from "./calculator-renderer-types";

export function esc(s: unknown): string {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] as string;
  });
}

const cellHtml = (cell: Cell): string => {
  if (typeof cell === "string") return esc(cell);
  const cls = [
    cell.status ? `cell-${cell.status}` : "",
    cell.badge ? "cell-badge" : "",
    cell.highlight ? "cell-hl" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<span class="${cls}">${esc(cell.text)}</span>`;
};

function cardHtml(card: DetailCard): string {
  let html = `<div class="detail-card">`;
  if (card.title) html += `<div class="detail-title">${esc(card.title)}</div>`;
  if (card.bar) {
    html += `<div class="bar" role="img" aria-label="${esc(card.bar.label)}"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, card.bar.pct))}%"></div></div>`;
    html += `<p class="bar-label">${esc(card.bar.label)}</p>`;
  }
  if (card.loshu) {
    html += `<div class="loshu">`;
    for (const cell of card.loshu) {
      const planet = LO_SHU_PLANET_NAMES[cell.number] ?? "";
      html += `<div class="loshu-cell ${cell.count > 0 ? "has" : "miss"}"><span class="ln">${esc(cell.number)}</span><span class="lp">${esc(planet)}</span></div>`;
    }
    html += `</div>`;
  }
  if (card.table) {
    html += `<div class="table-scroll"><table class="table"><thead><tr>${card.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>`;
    for (const r of card.table.rows) {
      html += `<tr>${r.map((c) => `<td>${cellHtml(c)}</td>`).join("")}</tr>`;
    }
    html += `</tbody></table></div>`;
  }
  if (card.rows) {
    for (const [k, v] of card.rows) {
      html += `<div class="row"><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></div>`;
    }
  }
  if (card.list) {
    html += `<ul class="blist">${card.list.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
  }
  if (card.legend) html += `<p class="legend">${esc(card.legend)}</p>`;
  html += `</div>`;
  return html;
}

function chipHtml(chip: Chip): string {
  const statusCls = chip.status ? ` chip-${chip.status}` : "";
  const value = chip.value ? esc(chip.value) : "";
  return `<span class="chip${statusCls}"><span class="chip-k">${esc(chip.label)}</span>${value ? `<span class="chip-v">${value}</span>` : ""}</span>`;
}

function meaningHtml(spec: ToolSpec, interpretation: unknown): string {
  const interp = (interpretation ?? null) as Record<string, unknown> | null;
  const text =
    spec.meaning?.text?.filter(Boolean) ?? (interp?.meaning ? [String(interp.meaning)] : []);
  const guidance = spec.meaning?.guidance ?? (interp?.guidance as string[] | undefined) ?? [];
  const basis = spec.meaning?.basis ?? (interp?.basis ? String(interp.basis) : "");
  if (!text.length && !guidance.length && !basis) return "";
  let html = `<div class="meaning">`;
  for (const p of text) html += `<p>${esc(p)}</p>`;
  if (guidance.length)
    html += `<ul class="guidance">${guidance.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>`;
  if (basis) html += `<p class="basis">Basis: ${esc(basis)}</p>`;
  html += `</div>`;
  return html;
}

/** Generic rows for any data keys the map did not consume (honesty rule). */
function leftoverHtml(data: Record<string, unknown>, hide: string[]): string {
  const keys = Object.keys(data).filter(
    (k) =>
      !hide.includes(k) &&
      k !== "engine_version" &&
      k !== "interpretation" &&
      k !== "for_fun" &&
      k !== "verified",
  );
  if (!keys.length) return "";
  const rows = keys.map((k) => {
    const v = data[k];
    let text: string;
    if (v == null) text = "—";
    else if (Array.isArray(v))
      text =
        v.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(", ") || "—";
    else if (typeof v === "object") text = JSON.stringify(v);
    else text = String(v);
    return `<div class="row"><span class="k">${esc(k.replace(/_/g, " "))}</span><span class="v">${esc(text)}</span></div>`;
  });
  return `<div class="detail-card"><div class="detail-title">More details</div>${rows.join("")}</div>`;
}

export function renderCalculatorResult(
  endpoint: string,
  data: Record<string, unknown>,
  meta: Record<string, unknown> | null,
  box: HTMLElement,
): void {
  const path = endpoint.replace(/^\/api\/v1/, "");
  const entry = CALC_MAP[path];
  let spec: ToolSpec;
  let hide: string[] = [];
  if (entry) {
    hide = entry.hide;
    try {
      spec = entry.build(data);
    } catch {
      // A mapping bug must never blank the result — fall back to raw rows.
      spec = { eyebrow: "RESULT", main: "" };
    }
  } else {
    spec = { eyebrow: "RESULT", main: "" };
  }

  let html = "";
  if (spec.main || spec.eyebrow) {
    html += `<div class="verdict-card">`;
    if (spec.eyebrow) html += `<div class="verdict-eyebrow">${esc(spec.eyebrow)}</div>`;
    if (spec.main) html += `<div class="verdict-main">${esc(spec.main)}</div>`;
    if (spec.sub) html += `<div class="verdict-sub">${esc(spec.sub)}</div>`;
    if (spec.status) {
      const words = { good: "Auspicious", bad: "Challenging", info: "Mixed" } as const;
      html += `<span class="status-chip status-${spec.status}">${words[spec.status]}</span>`;
    }
    html += `</div>`;
  }
  if (spec.chips?.length) {
    html += `<div class="chip-row">${spec.chips.map(chipHtml).join("")}</div>`;
  }
  html += meaningHtml(spec, data.interpretation);
  for (const card of spec.details ?? []) html += cardHtml(card);
  html += leftoverHtml(data, hide);

  if (data.verified === false) {
    html += `<p class="flagline">Table set pending Jyotishi review (P11) — treat as indicative.</p>`;
  }
  if (data.for_fun === true) {
    html += `<p class="flagline">For entertainment only.</p>`;
  }
  const metaNote = meta && typeof meta.note === "string" ? meta.note : null;
  if (metaNote) html += `<p class="flagline">${esc(metaNote)}</p>`;

  box.innerHTML = html;
}
