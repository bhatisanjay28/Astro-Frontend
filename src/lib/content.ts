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

export async function fetchCities(country?: string): Promise<ApiCity[] | null> {
  const q = country ? `&country=${encodeURIComponent(country)}` : "";
  const body = await getJson<{ data: { cities: ApiCity[] } }>(
    `${API_BASE}/api/v1/cities?lang=en${q}`,
  );
  return body?.data.cities ?? null;
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

/** Public site settings (Epic 1.9/5.4 — GET /api/v1/settings). */
export interface ApiSettings {
  engine: { ayanamsha: string; month_system: string; house_system: string; chart_style: string };
  gemstones_site_url: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
}

export async function fetchSettings(): Promise<ApiSettings | null> {
  const body = await getJson<{ data: ApiSettings }>(`${API_BASE}/api/v1/settings`);
  return body?.data ?? null;
}
