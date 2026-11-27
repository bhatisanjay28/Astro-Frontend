/**
 * Chrome vocabulary (S24) — utility bar, header CTA, footer, consent banner,
 * skip link, 404. One Record<Lang, …> per surface; Hindi written for an
 * Indian audience with consistent Jyotish vocabulary (no machine literals).
 */
import type { Lang } from "../i18n";

/** UtilityBar: precision line, switcher labels, theme toggle. */
export const UTILITY: Record<
  Lang,
  { precision: string; calc: string; themeTitle: string; themeAria: string }
> = {
  en: {
    precision: "astronomy-engine & Lahiri Ayanamsha precision computation",
    calc: "Calculated from local sunrise & true astronomical coordinates",
    themeTitle: "Toggle Light/Dark Theme",
    themeAria: "Toggle Theme",
  },
  hi: {
    precision: "astronomy-engine व लहरी अयनांश आधारित सुस्पष्ट गणना",
    calc: "स्थानीय सूर्योदय व वास्तविक खगोलीय निर्देशांकों से गणना",
    themeTitle: "प्रकाश/गहरी थीम बदलें",
    themeAria: "थीम बदलें",
  },
};

/** Header: talk CTA, drawer a11y labels. */
export const HEADER: Record<
  Lang,
  {
    cta: string;
    mainNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    submenu: string;
  }
> = {
  en: {
    cta: "Talk to Astrologer",
    mainNav: "Main Navigation",
    mobileNav: "Mobile Navigation",
    openMenu: "Open mobile menu",
    closeMenu: "Close menu",
    submenu: "submenu",
  },
  hi: {
    cta: "ज्योतिषी से बात करें",
    mainNav: "मुख्य नेविगेशन",
    mobileNav: "मोबाइल नेविगेशन",
    openMenu: "मोबाइल मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    submenu: "सबमेनू",
  },
};

/** Skip link + consent banner + cookie notice (Base.astro). */
export const BASE_CHROME: Record<
  Lang,
  { skip: string; consent: string; consentOk: string; consentAria: string }
> = {
  en: {
    skip: "Skip to main content",
    consent:
      "Vyotish does not load analytics or tracking yet. When that changes we will ask here before anything non-essential runs.",
    consentOk: "Got it",
    consentAria: "Cookie notice",
  },
  hi: {
    skip: "मुख्य सामग्री पर जाएँ",
    consent:
      "व्योतिष अभी कोई एनालिटिक्स या ट्रैकिंग लोड नहीं करता। जब ऐसा होगा, तो कुछ भी अनावश्यक चलने से पहले यहीं से आपकी सहमति ली जाएगी।",
    consentOk: "ठीक है",
    consentAria: "कुकी सूचना",
  },
};

/** Footer (Sally design pass 2026-11-20 — text translated, layout unchanged). */
export const FOOTER: Record<
  Lang,
  {
    mission: string;
    metaEngine: string;
    metaTz: string;
    trustChip: string;
    colPortals: string;
    colTools: string;
    colLegal: string;
    portalsAria: string;
    toolsAria: string;
    legalAria: string;
    disclaimerLead: string;
    disclaimerBody: string;
    copyright: string;
    guidance: string;
    tools: Array<{ label: string; href: string }>;
    legal: Array<{ label: string; href: string }>;
  }
> = {
  en: {
    mission:
      "Authentic Vedic astrology calculated with modern astronomical rigor. Providing accessible, zero-cost Janam Kundli charts, precision daily Panchang, and straightforward consultation booking.",
    metaEngine: "Engine: astronomy-engine • Lahiri Ayanamsha",
    metaTz: "Timezones: IANA Time Zone Database",
    trustChip: "Zero OTP — we never ask for one-time passwords",
    colPortals: "Portals",
    colTools: "Popular Tools",
    colLegal: "Trust & Legal",
    portalsAria: "Portals",
    toolsAria: "Popular Tools",
    legalAria: "Trust and Legal",
    disclaimerLead: "Astrological Disclaimer:",
    disclaimerBody:
      "Astrology content, horoscope readings, and calculation tools provided on Vyotish are for philosophical guidance, self-discovery, and cultural informational purposes only. Astrological outcomes cannot be guaranteed. This platform does not provide or replace certified medical diagnoses, legal counsel, psychiatric therapy, or licensed financial planning.",
    copyright: `© ${new Date().getFullYear()} Vyotish Platform. All rights reserved.`,
    guidance: "Astrological content is for guidance, not a substitute for professional advice.",
    tools: [
      { label: "Free Janam Kundli", href: "/kundli" },
      { label: "Kundli Matching (36 Guna)", href: "/matching" },
      { label: "Moon Sign (Rashi) Finder", href: "/calculators/rashi" },
      { label: "Shani Sade Sati Check", href: "/calculators/sade-sati" },
      { label: "Manglik Dosha Analysis", href: "/calculators/mangal-dosha" },
      { label: "Vedic Numerology", href: "/calculators/numerology" },
    ],
    legal: [
      { label: "Privacy Policy (DPDP Act)", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Refund & Cancellation", href: "/refund" },
      { label: "Astrological Disclaimer", href: "/disclaimer" },
      { label: "About Vyotish", href: "/about" },
      { label: "Grievance & Contact", href: "/contact" },
    ],
  },
  hi: {
    mission:
      "आधुनिक खगोलीय सूक्ष्मता के साथ गणित प्रामाणिक वैदिक ज्योतिष। सुलभ और निःशुल्क जन्म कुंडली, सुस्पष्ट दैनिक पंचांग और सीधा-सरल परामर्श बुकिंग।",
    metaEngine: "इंजन: astronomy-engine • लहरी अयनांश",
    metaTz: "समय क्षेत्र: IANA Time Zone Database",
    trustChip: "शून्य OTP — हम कभी वन-टाइम पासवर्ड नहीं मांगते",
    colPortals: "पोर्टल",
    colTools: "प्रमुख यंत्र",
    colLegal: "भरोसा और कानूनी",
    portalsAria: "पोर्टल",
    toolsAria: "प्रमुख यंत्र",
    legalAria: "भरोसा और कानूनी",
    disclaimerLead: "ज्योतिषीय अस्वीकरण:",
    disclaimerBody:
      "व्योतिष पर दी गई ज्योतिषीय सामग्री, राशिफल वाचन और गणना यंत्र केवल दार्शनिक मार्गदर्शन, आत्म-अन्वेषण और सांस्कृतिक जानकारी के उद्देश्य से हैं। ज्योतिषीय परिणामों की गारंटी नहीं दी जा सकती। यह मंच प्रमाणित चिकित्सा निदान, कानूनी सलाह, मनोचिकित्सीय उपचार या लाइसेंसी वित्तीय योजना नहीं देता, न ही इनका विकल्प है।",
    copyright: `© ${new Date().getFullYear()} व्योतिष प्लेटफ़ॉर्म। सर्वाधिकार सुरक्षित।`,
    guidance: "ज्योतिषीय सामग्री मार्गदर्शन के लिए है — किसी विशेषज्ञ सलाह का विकल्प नहीं।",
    tools: [
      { label: "मुफ्त जन्म कुंडली", href: "/kundli" },
      { label: "कुंडली मिलान (36 गुण)", href: "/matching" },
      { label: "चंद्र राशि खोजक", href: "/calculators/rashi" },
      { label: "शनि साढ़े साती जाँच", href: "/calculators/sade-sati" },
      { label: "मांगलिक दोष विश्लेषण", href: "/calculators/mangal-dosha" },
      { label: "वैदिक अंकज्योतिष", href: "/calculators/numerology" },
    ],
    legal: [
      { label: "गोपनीयता नीति (DPDP अधिनियम)", href: "/privacy" },
      { label: "उपयोग की शर्तें", href: "/terms" },
      { label: "धनवापसी और रद्दीकरण", href: "/refund" },
      { label: "ज्योतिषीय अस्वीकरण", href: "/disclaimer" },
      { label: "व्योतिष के बारे में", href: "/about" },
      { label: "शिकायत और संपर्क", href: "/contact" },
    ],
  },
};

/** 404 page (EN layout with honest Hindi line). */
export const NOT_FOUND: Record<Lang, { title: string; body: string; home: string }> = {
  en: {
    title: "404 — page not found",
    body: "The page you were looking for doesn't exist on Vyotish.",
    home: "Go to homepage",
  },
  hi: {
    title: "404 — पृष्ठ नहीं मिला",
    body: "आप जो पृष्ठ खोज रहे हैं, वह व्योतिष पर उपलब्ध नहीं है।",
    home: "मुखपृष्ठ पर जाएँ",
  },
};

/** Brand tagline under the wordmark (Header). */
export const BRAND_TAGLINE: Record<Lang, string> = {
  en: "Vedic Astrology & Wisdom",
  hi: "वैदिक ज्योतिष और ज्ञान",
};
