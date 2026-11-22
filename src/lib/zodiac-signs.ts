/**
 * Zodiac sign identity for the frontend (D12 boundary: sign slugs/names are
 * site config — all compatibility content, scores and explanations come from
 * the backend API). Wheel order matches the horoscope SIGNS lists and the
 * backend engine, so a pair's canonical slug is the wheel-sorted join.
 */
export interface ZodiacSignMeta {
  slug: string;
  symbol: string;
  hi: string;
  en: string;
}

export const ZODIAC_SIGNS: ZodiacSignMeta[] = [
  { slug: "aries", symbol: "♈", hi: "मेष", en: "Aries" },
  { slug: "taurus", symbol: "♉", hi: "वृषभ", en: "Taurus" },
  { slug: "gemini", symbol: "♊", hi: "मिथुन", en: "Gemini" },
  { slug: "cancer", symbol: "♋", hi: "कर्क", en: "Cancer" },
  { slug: "leo", symbol: "♌", hi: "सिंह", en: "Leo" },
  { slug: "virgo", symbol: "♍", hi: "कन्या", en: "Virgo" },
  { slug: "libra", symbol: "♎", hi: "तुला", en: "Libra" },
  { slug: "scorpio", symbol: "♏", hi: "वृश्चिक", en: "Scorpio" },
  { slug: "sagittarius", symbol: "♐", hi: "धनु", en: "Sagittarius" },
  { slug: "capricorn", symbol: "♑", hi: "मकर", en: "Capricorn" },
  { slug: "aquarius", symbol: "♒", hi: "कुम्भ", en: "Aquarius" },
  { slug: "pisces", symbol: "♓", hi: "मीन", en: "Pisces" },
];

const BY_SLUG = new Map(ZODIAC_SIGNS.map((s) => [s.slug, s]));

export function signBySlug(slug: string): ZodiacSignMeta | undefined {
  return BY_SLUG.get(slug);
}

/** Canonical pair slug: wheel-order-sorted join, e.g. leo+aries → "aries-leo". */
export function canonicalPairSlug(a: string, b: string): string | null {
  const ia = ZODIAC_SIGNS.findIndex((s) => s.slug === a);
  const ib = ZODIAC_SIGNS.findIndex((s) => s.slug === b);
  if (ia === -1 || ib === -1) return null;
  return ia <= ib ? `${a}-${b}` : `${b}-${a}`;
}

/** All 78 canonical pairs (12 same-sign + 66 off-diagonal), wheel order. */
export function canonicalPairs(): Array<{ sign1: ZodiacSignMeta; sign2: ZodiacSignMeta }> {
  const pairs: Array<{ sign1: ZodiacSignMeta; sign2: ZodiacSignMeta }> = [];
  for (let i = 0; i < ZODIAC_SIGNS.length; i += 1) {
    for (let j = i; j < ZODIAC_SIGNS.length; j += 1) {
      pairs.push({ sign1: ZODIAC_SIGNS[i], sign2: ZODIAC_SIGNS[j] });
    }
  }
  return pairs;
}
