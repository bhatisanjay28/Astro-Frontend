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
