/**
 * /sitemap.xml — hand-rolled sitemap (Epic 6.3, feeds 7.1). Static routes
 * plus every dynamic prerendered page: horoscope sign×period, calculator
 * tools, panchang cities, learn articles, and all blog surfaces. Lastmod
 * only where a real date exists (blog publish time) — honest metadata.
 *
 * S24 — bilingual coverage: every EN route with a prerendered /hi twin is
 * listed beside it with en/hi/x-default xhtml alternates (matching the
 * per-page hreflang tags Base.astro emits, driven by the same i18n helpers).
 * Blog articles, learn articles, category/tag/pagination routes and
 * /coming-soon stay EN-only — no fabricated twins (owner requirement #5).
 */
import { getCollection } from "astro:content";
import {
  fetchAstrologers,
  fetchBlogCategories,
  fetchBlogPosts,
  fetchBlogTags,
  fetchPanchangCities,
  fetchPujas,
} from "../lib/content";
import { hiPathOf } from "../lib/i18n";
import { canonicalPairs } from "../lib/zodiac-signs";

const SITE = "https://vyotish.com";

const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];
const PERIODS = ["yesterday", "daily", "tomorrow", "weekly", "monthly", "yearly"];
const TOOLS = [
  "rashi",
  "nakshatra",
  "lagna",
  "vimshottari-dasha",
  "sade-sati",
  "mangal-dosha",
  "kaal-sarp",
  "karakas",
  "ishta-devata",
  "transits",
  "moon-phase",
  "sun-sign",
  "numerology",
  "destiny-number",
  "lo-shu",
  "vehicle-number",
  "name-numerology",
  "mobile-numerology",
  "age",
  "name-compatibility",
  "love",
  "friendship",
  "flames",
];

const STATIC = [
  "",
  "/about",
  "/astrology",
  "/astrology/learn",
  "/blog",
  "/calculators",
  "/compatibility",
  "/consultations",
  "/contact",
  "/disclaimer",
  "/gemstones",
  "/horoscope",
  "/kundli",
  "/matching",
  "/muhurat",
  "/panchang",
  "/poojan",
  "/privacy",
  "/refund",
  "/terms",
];

interface Entry {
  loc: string;
  lastmod?: string;
  /** Hindi twin path (set on the EN side; drives xhtml alternates). */
  hi?: string;
  /** English twin path (set on the HI side; drives xhtml alternates). */
  en?: string;
}

export async function GET() {
  const [cities, posts, categories, tags, astrologers, pujas] = await Promise.all([
    fetchPanchangCities(),
    fetchBlogPosts({ perPage: 50 }),
    fetchBlogCategories(),
    fetchBlogTags(),
    fetchAstrologers(),
    fetchPujas(),
  ]);
  const learn = await getCollection("learn");

  const entries: Entry[] = [];
  // Twinned pairs: both twins listed, each carrying the full alternate set
  // pointing at the OTHER side (reciprocal hreflang).
  const pair = (p: string): void => {
    const hi = hiPathOf(p);
    entries.push({ loc: p, hi });
    entries.push({ loc: hi, en: p });
  };
  for (const p of STATIC) pair(p);
  // Chrome-less internal page — listed, but no twin (hasHiTwin: false).
  entries.push({ loc: "/coming-soon" });
  for (const s of SIGNS) for (const per of PERIODS) pair(`/horoscope/${s}/${per}`);
  for (const t of TOOLS) pair(`/calculators/${t}`);
  for (const p of canonicalPairs()) pair(`/compatibility/${p.sign1.slug}/${p.sign2.slug}`);
  for (const a of astrologers ?? []) pair(`/consultations/${a.slug}`);
  for (const p of pujas ?? []) pair(`/poojan/${p.slug}`);
  for (const c of cities ?? []) pair(`/panchang/${c.slug}`);
  // EN-only surfaces: learn articles (original-language scholarship, same
  // policy as blog) and all deep blog routes.
  for (const a of learn) entries.push({ loc: `/astrology/learn/${a.id}` });
  for (const p of posts?.posts ?? []) {
    entries.push({ loc: `/blog/${p.slug}`, lastmod: p.publish_at ?? undefined });
  }
  for (const c of categories ?? []) entries.push({ loc: `/blog/category/${c.slug}` });
  for (const t of tags ?? []) entries.push({ loc: `/blog/tag/${t.slug}` });
  const totalPages = Math.max(1, Math.ceil((posts?.total ?? 0) / 10));
  for (let i = 2; i <= totalPages; i += 1) entries.push({ loc: `/blog/page/${i}` });

  const altLink = (lang: string, href: string): string =>
    `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`;
  const alternates = (e: Entry): string => {
    // !== undefined, not truthiness: the home EN twin is "" (apex URL).
    if (e.hi !== undefined) {
      return (
        altLink("en", SITE + e.loc) +
        altLink("hi", SITE + e.hi) +
        altLink("x-default", SITE + e.loc)
      );
    }
    if (e.en !== undefined) {
      return (
        altLink("en", SITE + e.en) + altLink("hi", SITE + e.loc) + altLink("x-default", SITE + e.en)
      );
    }
    return "";
  };

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries
      .map(
        (e) =>
          `<url><loc>${SITE}${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${alternates(e)}</url>`,
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
