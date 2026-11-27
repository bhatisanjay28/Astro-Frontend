/**
 * S24 — /panchang/[city] per-city page chrome. The day view itself is the
 * live API (client-side; script strings localize in the P4 pass). City name_hi
 * leads the Hindi page with the English name as gloss.
 */
import type { Lang } from "../i18n";

export const PANCHANG_CITY: Record<
  Lang,
  {
    title: (name: string) => string;
    description: (name: string, tz: string) => string;
    h1Label: string;
    lede: (lat: string, lng: string, tz: string) => string;
    citiesLink: string;
    citiesPost: string;
  }
> = {
  en: {
    title: (name) => `Panchang for ${name} — Today | Vyotish`,
    description: (name, tz) =>
      `Today's Vedic Panchang for ${name}: Tithi, Nakshatra, Yoga, Karana with start/end times, sunrise/sunset, Rahu Kaal and more — in ${tz}.`,
    h1Label: "Panchang",
    lede: (lat, lng, tz) =>
      `Coordinates ${lat}°, ${lng}° · Timezone ${tz} · Vedic day runs sunrise → sunrise. See also `,
    citiesLink: "other cities",
    citiesPost: ".",
  },
  hi: {
    title: (name) => `${name} का पंचांग — आज | Vyotish`,
    description: (name, tz) =>
      `${name} का आज का वैदिक पंचांग: तिथि, नक्षत्र, योग, करण — प्रारंभ/समाप्ति समय, सूर्योदय/सूर्यास्त, राहु काल और भी बहुत कुछ — ${tz} में।`,
    h1Label: "पंचांग",
    lede: (lat, lng, tz) =>
      `निर्देशांक ${lat}°, ${lng}° · समय-क्षेत्र ${tz} · वैदिक दिन सूर्योदय → सूर्योदय। यह भी देखें `,
    citiesLink: "अन्य शहर",
    citiesPost: "।",
  },
};
