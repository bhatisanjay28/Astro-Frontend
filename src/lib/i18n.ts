/**
 * Site-wide language core (S24). The site is bilingual under a mechanical
 * prefix scheme: every public EN route has a Hindi twin at the same path
 * under /hi (e.g. /kundli/ ↔ /hi/kundli/). One source of truth decides:
 *  - which language a path IS (langFromPath),
 *  - where its counterpart lives (hiPathOf / enPathOf),
 *  - which hrefs stay untranslated (hasHiTwin) — blog articles remain in
 *    their original language (owner requirement #5), so deep blog routes
 *    have NO /hi twin; the /hi/blog/ hub links the EN articles.
 * withLang() is the one helper every component uses to keep a visitor's
 * language sticky across navigation (owner requirement #2).
 *
 * Admin/coming-soon are chrome-less or internal — never translated.
 */

export type Lang = "en" | "hi";

/** Path prefixes whose deep routes have NO /hi twin (blog articles stay EN;
 * /blog itself — the listing hub — DOES have one). Admin is internal chrome.
 * Learn articles are original-language scholarship too (same policy as blog)
 * — /astrology/learn/ itself has a twin, its article slugs do not. */
const NO_TWIN_EXACT = new Set(["/coming-soon"]);
const NO_TWIN_PREFIXES = ["/blog/", "/admin"];

/** "/hi/…" (with or without trailing slash) → "hi"; everything else → "en". */
export function langFromPath(path: string): Lang {
  return path === "/hi" || path === "/hi/" || path.startsWith("/hi/") ? "hi" : "en";
}

/** EN counterpart of a path (strips the /hi prefix); EN paths pass through. */
export function enPathOf(path: string): string {
  if (path === "/hi" || path === "/hi/") return "/";
  if (path.startsWith("/hi/")) return path.slice(3) || "/";
  return path;
}

/** Hindi twin of an EN path ("/" → "/hi/", "/kundli" → "/hi/kundli"). */
export function hiPathOf(enPath: string): string {
  if (enPath === "/" || enPath === "") return "/hi/";
  return `/hi${enPath}`;
}

/** Does this EN path have a prerendered Hindi twin? (blog/learn deep routes
 * don't; their hubs do.) Astro page paths carry a trailing slash ("/blog/"),
 * so it is normalized before matching. */
export function hasHiTwin(enPath: string): boolean {
  const stripped = enPath.split("#")[0].split("?")[0].replace(/\/+$/, "");
  const clean = stripped === "" ? "/" : stripped;
  if (clean === "/" || clean === "/blog") return true;
  if (NO_TWIN_EXACT.has(clean)) return false;
  // learn article slugs stay EN — but the learn hub keeps its twin
  if (clean.startsWith("/astrology/learn/") && clean.slice("/astrology/learn/".length) !== "") {
    return false;
  }
  return !NO_TWIN_PREFIXES.some((p) => clean.startsWith(p));
}

/** Split "#fragment" off an href (query strings are not used on public pages). */
function splitHash(href: string): [string, string] {
  const i = href.indexOf("#");
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i + 1)];
}

/**
 * Keep the visitor's language: on a Hindi page, internal hrefs to routes with
 * twins are rewritten to their /hi twin; on an English page hrefs pass
 * through untouched (EN is the default locale). Blog articles, admin and
 * external/anchor/mailto links are returned unchanged — never a dead link,
 * never a fabricated URL.
 */
export function withLang(href: string, currentPath: string): string {
  if (langFromPath(currentPath) !== "hi") return href;
  const [path, frag] = splitHash(href);
  if (!path.startsWith("/")) return href; // external / mailto / tel / pure anchor
  if (!hasHiTwin(path)) return href; // blog article etc. — stays EN by policy
  return hiPathOf(path) + (frag ? `#${frag}` : "");
}

/** The language switcher targets for the CURRENT page (Base.astro). */
export function switcherHrefs(currentPath: string): { en: string; hi: string } {
  const lang = langFromPath(currentPath);
  const en = enPathOf(currentPath);
  if (lang === "hi") return { en, hi: currentPath };
  // EN side: blog/learn deep routes fall back to their Hindi hub (never /hi/
  // home for a page whose twin lives elsewhere).
  const hi = hasHiTwin(en)
    ? hiPathOf(en)
    : en.startsWith("/astrology/learn/")
      ? "/hi/astrology/learn/"
      : "/hi/blog/";
  return { en: currentPath, hi };
}
