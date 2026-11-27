/**
 * S24 — Learn hub (/astrology/learn/) + article-page chrome. Article bodies
 * are original-language scholarship (same policy as blog): deep learn routes
 * have NO /hi twin, so the article page renders EN content under localized
 * chrome on /hi.
 */
import type { Lang } from "../i18n";

export const LEARN_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    ledePre: string;
    ledeLink: string;
    ledePost: string;
    empty: string;
    cta: string;
  }
> = {
  en: {
    title: "Learn Vedic Astrology — Original Articles | Vyotish",
    description:
      "Original Vedic astrology scholarship: the 12 rashis, Navagraha, 27 nakshatras, houses, panchang yogas, doshas and Vimshottari dasha.",
    h1: "Learn Vedic Astrology",
    ledePre: "",
    ledeLink: "free calculators",
    ledePost: ".",
    empty: "Articles are being prepared — please check back shortly.",
    cta: "Read →",
  },
  hi: {
    title: "वैदिक ज्योतिष सीखें — मौलिक लेख | Vyotish",
    description:
      "मौलिक वैदिक ज्योतिष: 12 राशियाँ, नवग्रह, 27 नक्षत्र, भाव, पंचांग योग, दोष और विंशोत्तरी दशा।",
    h1: "वैदिक ज्योतिष सीखें",
    ledePre: "",
    ledeLink: "मुफ़्त कैलकुलेटर",
    ledePost: "।",
    empty: "लेख तैयार किए जा रहे हैं — कृपया शीघ्र ही देखें।",
    cta: "पढ़ें →",
  },
};

/** Full lede for the hub (composed so the inline calculators link stays). */
export function learnLede(lang: Lang, calcHref: string): string {
  if (lang === "en") {
    return `Original, no-fear scholarship: what the classical system actually says, how Vyotish computes it, and where interpretation schools differ. Pair the theory with the <a href="${calcHref}">${LEARN_HUB.en.ledeLink}</a>.`;
  }
  return `मौलिक, निडर अध्ययन: शास्त्रीय पद्धति वास्तव में क्या कहती है, व्योतिष उसे कैसे गणित करता है, और व्याख्या-परंपराएँ कहाँ भिन्न होती हैं। सिद्धांत को <a href="${calcHref}">${LEARN_HUB.hi.ledeLink}</a> के साथ जोड़ें।`;
}

export const LEARN_ART: Record<
  Lang,
  {
    learnLabel: string;
    moreH: string;
    practicePre: string;
    calcLink: string;
    practiceMid: string;
    kundliLink: string;
    practicePost: string;
  }
> = {
  en: {
    learnLabel: "Learn",
    moreH: "Keep learning",
    practicePre: "Practice on the ",
    calcLink: "free calculators",
    practiceMid: " or generate your ",
    kundliLink: "free kundli",
    practicePost: ".",
  },
  hi: {
    learnLabel: "सीखें",
    moreH: "सीखते रहें",
    practicePre: "",
    calcLink: "मुफ़्त कैलकुलेटर",
    practiceMid: " पर अभ्यास करें या अपनी ",
    kundliLink: "मुफ़्त कुंडली",
    practicePost: " बनाएँ।",
  },
};
