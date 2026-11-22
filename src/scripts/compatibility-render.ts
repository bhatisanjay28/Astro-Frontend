/**
 * Compatibility result renderer — Epic ZC S-ZC-3.
 * Emits the pair-result structure into [data-zc-result]; styles live in the
 * `is:global` block of pages/compatibility/[sign1]/[sign2].astro keyed off
 * [data-zc-result] (JS-injected nodes never match Astro scoped CSS — the
 * established root-cause fix for "alignment" bugs).
 *
 * The frontend never invents astrology copy: verdicts, explanations, tips,
 * the disclaimer and the method note all come from the API (D12). Scores are
 * rendered as authored by the backend engine; nothing is recomputed here.
 */

export interface ZcPairPayload {
  pair: string;
  requested: { sign1: string; sign2: string };
  facts: {
    aspect: string;
    degrees: number;
    element_pair: string;
    modality_pair: string;
    polarity_pair: string;
    rulers: string;
    ruler_note: string;
    shared_ruler: { planet: string; disputed: boolean } | null;
  };
  overall: { score: number; band: string; band_note: string; verdict: string };
  categories: Array<{ key: string; label: string; score: number; explanation: string }>;
  tips: string[];
  disclaimer: string;
  method_note: string;
  verified: boolean;
}

export function esc(s: unknown): string {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] as string;
  });
}

function bandClass(band: string): string {
  return band.toLowerCase().replace(/\s+/g, "-");
}

function chip(label: string, value: string): string {
  return `<span class="zc-chip"><span class="zc-chip-label">${esc(label)}</span> ${esc(value)}</span>`;
}

function factChips(facts: ZcPairPayload["facts"]): string {
  // Raw values — chip() escapes once; do NOT pre-escape (double-escape bug).
  let html = chip("Aspect", `${facts.aspect} · ${facts.degrees}°`);
  html += chip("Elements", facts.element_pair);
  html += chip("Modes", facts.modality_pair);
  html += chip("Polarity", facts.polarity_pair);
  html += chip("Rulers", facts.rulers);
  if (facts.shared_ruler) {
    const disputed = facts.shared_ruler.disputed
      ? " (traditional — disputed by modern astrologers)"
      : "";
    html += chip("Shared ruler", `${facts.shared_ruler.planet}${disputed}`);
  }
  return html;
}

function categoryCard(cat: ZcPairPayload["categories"][number]): string {
  const pct = Math.max(0, Math.min(100, cat.score));
  // Band thresholds here MUST mirror the backend bandFor() (85/70/55/40) —
  // styling-only coupling; if the backend bands ever change, update this too.
  const band =
    cat.score >= 85
      ? "Excellent"
      : cat.score >= 70
        ? "Strong"
        : cat.score >= 55
          ? "Mixed"
          : cat.score >= 40
            ? "Challenging"
            : "Very challenging";
  return `
    <div class="zc-cat zc-band-${bandClass(band)}">
      <div class="zc-cat-head">
        <h3>${esc(cat.label)}</h3>
        <span class="zc-cat-score">${cat.score}<span class="zc-score-max">/95</span></span>
      </div>
      <div class="zc-bar" aria-hidden="true"><div class="zc-bar-fill" style="width:${pct}%"></div></div>
      <p class="zc-cat-text">${esc(cat.explanation)}</p>
    </div>`;
}

/** Renders the full success payload. Returns the HTML string. */
export function renderPairResult(payload: ZcPairPayload): string {
  const ov = payload.overall;
  const html = `
    <div class="zc-overall">
      <div class="zc-score-block">
        <span class="zc-score-value">${ov.score}</span><span class="zc-score-range">/ 95</span>
      </div>
      <div class="zc-overall-copy">
        <p class="zc-eyebrow">Overall compatibility</p>
        <p class="zc-band-line"><span class="zc-band-chip">${esc(ov.band)}</span></p>
        <p class="zc-verdict">${esc(ov.verdict)}</p>
        <p class="zc-band-note">${esc(ov.band_note)}</p>
        ${payload.verified ? "" : '<p class="zc-unverified">Interpretive method — scores sit in an honest 35–95 range.</p>'}
      </div>
    </div>
    <div class="zc-facts">${factChips(payload.facts)}</div>
    ${payload.facts.ruler_note ? `<p class="zc-ruler-note">${esc(payload.facts.ruler_note)}</p>` : ""}
    <h2 class="zc-section-title">How the two signs compare</h2>
    <div class="zc-cats">${payload.categories.map(categoryCard).join("")}</div>
    <h2 class="zc-section-title">Relationship tips for this pairing</h2>
    <ul class="zc-tips">${payload.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="zc-note-strip">
      <p class="zc-method">${esc(payload.method_note)}</p>
      <p class="zc-disclaimer">${esc(payload.disclaimer)}</p>
    </div>`;
  return html;
}
