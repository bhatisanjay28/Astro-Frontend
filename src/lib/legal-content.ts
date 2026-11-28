/**
 * Admin Phase 5 — Trust & Legal DB overrides.
 *
 * The five LegalPage docs (privacy / terms / refund / disclaimer / about) are
 * authored in-repo (src/lib/i18n/*.ts) and stay the FALLBACK. A super admin
 * can override any (doc, lang) pair from /admin/legal; the override is a
 * content_blocks row (block_key `legal.<doc>`, payload = the LegalDoc shape,
 * status published — sanitized server-side by the blocks PUT).
 *
 * Public pages resolve at BUILD time: the DB override wins, everything else
 * (no block, API unreachable, invalid/garbage payload shape) falls back to
 * the in-repo dict — a broken override can never take a live page down
 * (parseOffers fail-soft precedent). The Pages deploy hook fires on every
 * legal.* write, so the static site re-bakes within ~1 minute of a save.
 */

import { fetchContentBlocks } from "./content";
import type { Lang } from "./i18n";
import type { LegalDoc, LegalSection } from "./i18n/legal";

export const LEGAL_BLOCK_PREFIX = "legal.";

/** Doc slug (as used by the admin UI) → content_blocks block_key. */
export const LEGAL_DOC_KEYS: Record<string, string> = {
  privacy: "legal.privacy",
  terms: "legal.terms",
  refund: "legal.refund",
  disclaimer: "legal.disclaimer",
  about: "legal.about",
};

/** Payload size guards — an override must stay in the same class as the
 * in-repo documents, never become a free-form storage dump. */
const MAX = {
  title: 200,
  heading: 200,
  intro: 600,
  updated: 100,
  sections: 40,
  sectionId: 80,
  paragraph: 5000,
  bullet: 1000,
  note: 2000,
};

function stringArray(v: unknown, maxLen: number): string[] | null {
  if (!Array.isArray(v)) return null;
  const out: string[] = [];
  for (const item of v) {
    if (typeof item !== "string" || item.length > maxLen) return null;
    out.push(item);
  }
  return out;
}

/** Fail-soft shape check for a legal.* payload → LegalDoc, or null. */
export function parseLegalDoc(raw: unknown): LegalDoc | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;

  const title = typeof r.title === "string" ? r.title.trim() : "";
  const heading = typeof r.heading === "string" ? r.heading.trim() : "";
  const intro = typeof r.intro === "string" ? r.intro : "";
  const updated = typeof r.updated === "string" ? r.updated.trim() : "";
  if (!title || title.length > MAX.title) return null;
  if (!heading || heading.length > MAX.heading) return null;
  if (intro.length > MAX.intro) return null;
  if (!updated || updated.length > MAX.updated) return null;

  if (!Array.isArray(r.sections) || r.sections.length === 0 || r.sections.length > MAX.sections) {
    return null;
  }
  const sections: LegalSection[] = [];
  for (const s of r.sections) {
    if (typeof s !== "object" || s === null || Array.isArray(s)) return null;
    const rec = s as Record<string, unknown>;
    const id = typeof rec.id === "string" ? rec.id.trim() : "";
    const sectionHeading = typeof rec.heading === "string" ? rec.heading.trim() : "";
    if (
      !id ||
      id.length > MAX.sectionId ||
      !sectionHeading ||
      sectionHeading.length > MAX.heading
    ) {
      return null;
    }
    const section: LegalSection = { id, heading: sectionHeading };
    if (rec.paragraphs !== undefined) {
      const p = stringArray(rec.paragraphs, MAX.paragraph);
      if (p === null) return null;
      section.paragraphs = p;
    }
    if (rec.bullets !== undefined) {
      const b = stringArray(rec.bullets, MAX.bullet);
      if (b === null) return null;
      section.bullets = b;
    }
    if (rec.note !== undefined) {
      const n = stringArray(rec.note, MAX.note);
      if (n === null) return null;
      section.note = n;
    }
    sections.push(section);
  }
  return { title, heading, intro, updated, sections };
}

/**
 * Build-time resolve for one (doc, lang): DB override wins, in-repo dict
 * otherwise. Any fetch/parse failure degrades to the authored document.
 */
export async function resolveLegalDoc(
  doc: keyof typeof LEGAL_DOC_KEYS | string,
  lang: Lang,
  fallback: Record<Lang, LegalDoc>,
): Promise<LegalDoc> {
  const key = LEGAL_DOC_KEYS[doc] ?? doc;
  try {
    const blocks = await fetchContentBlocks(LEGAL_BLOCK_PREFIX, lang);
    if (!blocks) return fallback[lang];
    return parseLegalDoc(blocks[key]) ?? fallback[lang];
  } catch {
    return fallback[lang];
  }
}
