/**
 * /sitemap.xml — hand-rolled sitemap (Epic 6.3, feeds 7.1). Static routes
 * plus every dynamic prerendered page: horoscope sign×period, calculator
 * tools, panchang cities, learn articles, and all blog surfaces. Lastmod
 * only where a real date exists (blog publish time) — honest metadata.
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
  "/coming-soon",
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

  const entries: Entry[] = STATIC.map((p) => ({ loc: p }));
  entries.push({ loc: "/hi" });
  for (const s of SIGNS) for (const per of PERIODS) entries.push({ loc: `/horoscope/${s}/${per}` });
  for (const t of TOOLS) entries.push({ loc: `/calculators/${t}` });
  for (const p of canonicalPairs()) {
    entries.push({ loc: `/compatibility/${p.sign1.slug}/${p.sign2.slug}` });
  }
  for (const a of astrologers ?? []) entries.push({ loc: `/consultations/${a.slug}` });
  for (const p of pujas ?? []) entries.push({ loc: `/poojan/${p.slug}` });
  for (const c of cities ?? []) entries.push({ loc: `/panchang/${c.slug}` });
  for (const a of learn) entries.push({ loc: `/astrology/learn/${a.id}` });
  for (const p of posts?.posts ?? []) {
    entries.push({ loc: `/blog/${p.slug}`, lastmod: p.publish_at ?? undefined });
  }
  for (const c of categories ?? []) entries.push({ loc: `/blog/category/${c.slug}` });
  for (const t of tags ?? []) entries.push({ loc: `/blog/tag/${t.slug}` });
  const totalPages = Math.max(1, Math.ceil((posts?.total ?? 0) / 10));
  for (let i = 2; i <= totalPages; i += 1) entries.push({ loc: `/blog/page/${i}` });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `<url><loc>${SITE}${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
