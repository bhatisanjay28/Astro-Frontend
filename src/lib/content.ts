/**
 * Build-time backend client (D12: ALL page data lives in Supabase and is
 * served only through backend APIs — the frontend is a thin renderer and
 * carries NO baked content).
 *
 * These fetches run at build time (static output) so home/panchang pages
 * render server data into HTML. Every helper fails SOFT: on any failure it
 * returns null/[] and the caller renders an honest empty state — never
 * fake or seed data.
 */
export const API_BASE =
  import.meta.env.PUBLIC_API_BASE_URL ?? "https://astro-backend.vyotish.workers.dev";

export interface HomeAstrologer {
  slug: string;
  name: string;
  title: string;
  about: string;
  expertise: string[];
  languages: string[];
  experience_years: number | null;
  rate_per_min: number | null;
  is_available: boolean;
  availability_label: string;
  accent: "primary" | "secondary";
  is_sample: boolean;
}

export interface HomePooja {
  slug: string;
  name: string;
  category: string;
  purpose: string;
  description: string;
  duration_label: string;
  mode: string[];
  includes: string[];
  price_inr: number | null;
  accent: "primary" | "secondary";
  is_sample: boolean;
}

export interface HomeFaq {
  question: string;
  answer: string;
  is_sample: boolean;
}

export interface HomeContent {
  lang: string;
  astrologers: HomeAstrologer[];
  poojas: HomePooja[];
  faqs: HomeFaq[];
  /** keyed content blocks (calculators, trust_cards, blog_teasers, …) */
  blocks: Record<string, unknown> & { is_sample: boolean };
}

export interface ApiCity {
  slug: string;
  name: string;
  name_en: string;
  name_hi: string | null;
  country: string;
  lat: number;
  lng: number;
  tz: string;
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchHomeContent(lang = "en"): Promise<HomeContent | null> {
  const body = await getJson<{ data: HomeContent }>(`${API_BASE}/api/v1/content/home?lang=${lang}`);
  return body?.data ?? null;
}

/** /panchang/{slug} pages exist for the biggest cities — India-first (where
 * the audience is) plus major world cities for the diaspora. The worldwide
 * autocomplete covers every other place via coordinates. */
export const PANCHANG_CITY_LIMIT = 150;

export async function fetchCities(country?: string, limit?: number): Promise<ApiCity[] | null> {
  const q = country ? `&country=${encodeURIComponent(country)}` : "";
  const l = limit ? `&limit=${limit}` : "";
  const body = await getJson<{ data: { cities: ApiCity[] } }>(
    `${API_BASE}/api/v1/cities?lang=en${q}${l}`,
  );
  return body?.data.cities ?? null;
}

/** The panchang city page set: top Indian cities first, then world cities
 * (diaspora hubs), deduped by slug. */
export async function fetchPanchangCities(): Promise<ApiCity[]> {
  const [india, world] = await Promise.all([fetchCities("IN", 110), fetchCities(undefined, 60)]);
  const seen = new Set<string>();
  const merged: ApiCity[] = [];
  for (const c of [...(india ?? []), ...(world ?? [])]) {
    if (!seen.has(c.slug)) {
      seen.add(c.slug);
      merged.push(c);
    }
  }
  return merged;
}

/** Astrologer directory row (Epic 5.2 — GET /api/v1/astrologers). */
export interface ApiAstrologer extends HomeAstrologer {
  session_types: Array<{ type?: string; duration_min?: number }>;
}

export async function fetchAstrologers(): Promise<ApiAstrologer[] | null> {
  const body = await getJson<{ data: { astrologers: ApiAstrologer[] } }>(
    `${API_BASE}/api/v1/astrologers`,
  );
  return body?.data.astrologers ?? null;
}

/** Puja catalogue row (Epic 5.3 — GET /api/v1/pujas). */
export interface ApiPuja extends HomePooja {
  name_hi: string | null;
  muhurat_note: string;
}

export async function fetchPujas(category?: string): Promise<ApiPuja[] | null> {
  const q = category ? `category=${encodeURIComponent(category)}&` : "";
  const body = await getJson<{ data: { pujas: ApiPuja[] } }>(`${API_BASE}/api/v1/pujas?${q}`);
  return body?.data.pujas ?? null;
}

/** Keyed published content blocks by block_key prefix (Epic 4.2b —
 * GET /api/v1/content/blocks). Null on any failure → honest empty state. */
export async function fetchContentBlocks(
  prefix: string,
  lang = "en",
): Promise<Record<string, unknown> | null> {
  const body = await getJson<{
    data: { blocks: Record<string, unknown>; is_sample: boolean };
  }>(`${API_BASE}/api/v1/content/blocks?lang=${lang}&prefix=${encodeURIComponent(prefix)}`);
  return body?.data.blocks ?? null;
}

/** Public site settings (Epic 1.9/5.4 — GET /api/v1/settings). */
export interface ApiSettings {
  engine: { ayanamsha: string; month_system: string; house_system: string; chart_style: string };
  gemstones_site_url: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  /** Epic 5.2 — admin-authored offers banner JSON; renderer validates shape. */
  offers_config: unknown;
}

export async function fetchSettings(): Promise<ApiSettings | null> {
  const body = await getJson<{ data: ApiSettings }>(`${API_BASE}/api/v1/settings`);
  return body?.data ?? null;
}

/* ------------------------------------------------------------------ */
/* Offers (Epic 5.2 — admin-authored public.offers_config JSON)         */
/* ------------------------------------------------------------------ */

/** One offer banner. Admin contract (settings UI, key `offers_config`):
 * `[{"text": "Diwali muhurat bookings open", "href": "/muhurat", "audience": "puja"}]`
 * — audience (optional) filters where it shows: consultation | puja | all. */
export interface ApiOffer {
  text: string;
  href?: string;
  audience?: "consultation" | "puja" | "all";
}

/** Fail-soft shape check: anything that isn't an array of text-bearing
 * objects degrades to an empty list (never renders broken markup). */
export function parseOffers(raw: unknown, audience: "consultation" | "puja"): ApiOffer[] {
  if (!Array.isArray(raw)) return [];
  const out: ApiOffer[] = [];
  for (const o of raw) {
    if (typeof o !== "object" || o === null) continue;
    const rec = o as Record<string, unknown>;
    const text = typeof rec.text === "string" ? rec.text.trim() : "";
    if (!text || text.length > 300) continue;
    const a = rec.audience;
    if (a !== undefined && a !== "all" && a !== audience) continue;
    const aud = a === "all" || a === audience ? (a as ApiOffer["audience"]) : undefined;
    const href = typeof rec.href === "string" && rec.href.startsWith("/") ? rec.href : undefined;
    out.push({ text, href, audience: aud });
  }
  return out.slice(0, 5);
}

/* ------------------------------------------------------------------ */
/* Blog (Epic 6.3 — GET /api/v1/blog/*)                                */
/* ------------------------------------------------------------------ */

/** Listing-card shape (no content_md — see backend blog.ts). */
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  alt_text: string | null;
  publish_at: string | null;
  reading_minutes: number | null;
}

export interface BlogTag {
  slug: string;
  name: string;
}

export interface BlogPost extends BlogPostSummary {
  content_md: string;
  author: { name: string };
  category: BlogTag | null;
  tags: BlogTag[];
  related: Array<{ slug: string; title: string; excerpt: string | null }>;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchBlogPosts(
  opts: { page?: number; perPage?: number; category?: string; tag?: string; q?: string } = {},
): Promise<{ posts: BlogPostSummary[]; total: number } | null> {
  const p = new URLSearchParams();
  if (opts.page) p.set("page", String(opts.page));
  p.set("per_page", String(opts.perPage ?? 10));
  if (opts.category) p.set("category", opts.category);
  if (opts.tag) p.set("tag", opts.tag);
  if (opts.q) p.set("q", opts.q);
  const body = await getJson<{ data: { posts: BlogPostSummary[] }; meta: { total: number } }>(
    `${API_BASE}/api/v1/blog/posts?${p.toString()}`,
  );
  return body ? { posts: body.data.posts, total: body.meta.total } : null;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const body = await getJson<{ data: BlogPost }>(
    `${API_BASE}/api/v1/blog/posts/${encodeURIComponent(slug)}`,
  );
  return body?.data ?? null;
}

export async function fetchBlogCategories(): Promise<BlogTag[] | null> {
  const body = await getJson<{ data: { categories: BlogTag[] } }>(
    `${API_BASE}/api/v1/blog/categories`,
  );
  return body?.data.categories ?? null;
}

export async function fetchBlogTags(): Promise<BlogTag[] | null> {
  const body = await getJson<{ data: { tags: BlogTag[] } }>(`${API_BASE}/api/v1/blog/tags`);
  return body?.data.tags ?? null;
}

/* ---- Horoscope (Step 4) — resolve-current payloads for /horoscope/{sign}/{period} ---- */

/** Structured page payload the generator composes (mirrors backend HoroscopePayload). */
export interface HoroscopePayload {
  period: string;
  date_key: string;
  rating: string;
  overview: { text: string; source: string };
  range?: { start: string; end: string };
  thought?: { text: string; theme: number; source: string };
  areas?: Record<
    string,
    { text: string; rating: string; pb: string; retro: boolean; source: string }
  >;
  dos?: { text: string; house: number; source: string };
  donts?: { text: string; house: number; source: string };
  lucky?: {
    planet: string;
    planet_hi: string;
    basis: string;
    house: number | null;
    why: {
      key: string;
      params: {
        planet: string;
        planet_hi: string;
        sign: string;
        sign_hi: string;
        house: number | null;
      };
    };
    colours: Array<{ en: string; hi: string; swatch: string }>;
    number: number;
    direction: { en: string; hi: string } | null;
    deity: { en: string; hi: string };
    mantra: { hi: string; en: string };
  };
  chandrashtama?: boolean;
  best_days?: Array<{ date: string; planets_en: string[]; planets_hi: string[] }>;
  testing_day?: { date: string; planets_en: string[]; planets_hi: string[] };
  sky?: Array<{
    date: string;
    kind: string;
    en: string;
    hi: string;
    planet: string | null;
    sign: string | null;
  }>;
  sadesati?: {
    active: boolean;
    phases: Array<{ label: string; label_hi: string; months_en: string; months_hi: string }>;
  };
  year_areas?: Record<string, { text: string; rating: string; driver: string; source: string }>;
  month_table?: Array<{ month: string; month_hi: string; clause: string; rating: string }>;
}

/** Fixed page strings from content_blocks horoscope.* (migration 0013). */
export interface HoroscopeBlocks {
  disclaimer?: { text: string };
  disclosure?: { text: string };
  rating_labels?: { labels: Record<string, { label: string; glyph: string }> };
  lucky_why?: Record<string, string>;
  sadesati_note?: { text: string };
  chandrashtama_tag?: { text: string };
  month_clause_intro?: { text: string };
  headers?: Record<string, string>;
  area_names?: Record<string, string>;
}

export interface HoroscopeSignRow {
  sign: string;
  overview: string;
  love: string;
  career: string;
  finance: string;
  health: string;
  is_sample: boolean;
  has_payload: boolean;
  payload: HoroscopePayload | null;
}

export interface HoroscopePage {
  period: string;
  resolved_period: string;
  date_key: string;
  /** the IST key the tab asked for — differs from date_key only when stale */
  requested_date_key: string;
  /** true → the newest window's rows are missing; content is the latest
   * earlier window and the UI must label it (S23 "never a wrong date") */
  stale: boolean;
  range: { start: string; end: string } | null;
  blocks: HoroscopeBlocks;
  row: HoroscopeSignRow | null;
}

/** Build-time resolve-current fetch for one (period, sign); fail-soft → null. */
export async function fetchHoroscopePage(
  period: string,
  sign: string,
  lang = "en",
): Promise<HoroscopePage | null> {
  const body = await getJson<{
    data: {
      period: string;
      resolved_period: string;
      date_key: string;
      requested_date_key: string;
      stale: boolean;
      range: { start: string; end: string } | null;
      blocks: HoroscopeBlocks;
      signs: HoroscopeSignRow[];
    };
  }>(
    `${API_BASE}/api/v1/horoscope?period=${encodeURIComponent(period)}&sign=${encodeURIComponent(sign)}&lang=${lang}`,
  );
  if (!body?.data) return null;
  return {
    period: body.data.period,
    resolved_period: body.data.resolved_period,
    date_key: body.data.date_key,
    requested_date_key: body.data.requested_date_key ?? body.data.date_key,
    stale: body.data.stale ?? false,
    range: body.data.range,
    blocks: body.data.blocks ?? {},
    row: body.data.signs?.[0] ?? null,
  };
}
