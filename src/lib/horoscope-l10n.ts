/**
 * Horoscope page chrome vocabulary, English + Hindi (S22).
 *
 * D12 boundary: horoscope CONTENT (overviews, areas, tables, lucky values)
 * is data — the API serves it per lang. This module translates only the page
 * furniture that is frontend config: period names, h1 wording, date words,
 * field labels, and the sign-independent sidebar/picker strings.
 */

export type HoroLang = "en" | "hi";

/** Chip / tab label per period slug (page slugs: yesterday/daily/tomorrow/…). */
export const PERIOD_LABEL: Record<HoroLang, Record<string, string>> = {
  en: {
    yesterday: "Yesterday",
    daily: "Today",
    tomorrow: "Tomorrow",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  },
  hi: {
    yesterday: "बीते कल",
    daily: "आज",
    tomorrow: "कल",
    weekly: "साप्ताहिक",
    monthly: "मासिक",
    yearly: "वार्षिक",
  },
};

/** Possessive h1 wording per period slug ("{title} Rashiphal — {sign}"). */
export const PERIOD_TITLE: Record<HoroLang, Record<string, string>> = {
  en: {
    yesterday: "Yesterday's",
    daily: "Today's",
    tomorrow: "Tomorrow's",
    weekly: "This Week's",
    monthly: "This Month's",
    yearly: "This Year's",
  },
  hi: {
    yesterday: "बीते कल का",
    daily: "आज का",
    tomorrow: "कल का",
    weekly: "इस सप्ताह का",
    monthly: "इस माह का",
    yearly: "इस वर्ष का",
  },
};

export const MONTHS_FULL: Record<HoroLang, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  hi: [
    "जनवरी",
    "फरवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ],
};

export const MONTHS_SHORT: Record<HoroLang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  hi: ["जन", "फर", "मार्च", "अप्रै", "मई", "जून", "जुल", "अग", "सित", "अक्टू", "नव", "दिस"],
};

export const WEEKDAYS: Record<HoroLang, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
};

/** Weekday lords (sign.lord values) — Hindi only (EN uses the payload verbatim). */
export const LORD_HI: Record<string, string> = {
  Mars: "मंगल",
  Venus: "शुक्र",
  Mercury: "बुध",
  Moon: "चंद्र",
  Sun: "सूर्य",
  Saturn: "शनि",
  Jupiter: "गुरु",
};

/** Lucky-card heading per period (daily uses the block header verbatim). */
export const luckyHeading = (
  lang: HoroLang,
  period: string,
  blockHeading: string | undefined,
): string => {
  const en: Record<string, string> = {
    yesterday: "Lucky yesterday",
    tomorrow: "Lucky tomorrow",
    weekly: "Lucky this week",
    monthly: "Lucky this month",
    yearly: "Lucky this year",
  };
  const hi: Record<string, string> = {
    yesterday: "बीते कल के शुभ",
    tomorrow: "कल के शुभ",
    weekly: "इस सप्ताह के शुभ",
    monthly: "इस माह के शुभ",
    yearly: "इस वर्ष के शुभ",
  };
  const map = lang === "hi" ? hi : en;
  if (period === "daily") return blockHeading ?? (lang === "hi" ? "आज के शुभ" : "Lucky today");
  return map[period] ?? (lang === "hi" ? "आज के शुभ" : "Lucky today");
};

/** Sidebar "explore" period link labels. */
export const PERIOD_SIDEBAR_LABEL: Record<HoroLang, Record<string, string>> = {
  en: {
    yesterday: "Yesterday's rashiphal",
    daily: "Today's rashiphal",
    tomorrow: "Tomorrow's rashiphal",
    weekly: "Weekly rashiphal",
    monthly: "Monthly rashiphal",
    yearly: "Yearly rashiphal",
  },
  hi: {
    yesterday: "बीते कल का राशिफल",
    daily: "आज का राशिफल",
    tomorrow: "कल का राशिफल",
    weekly: "साप्ताहिक राशिफल",
    monthly: "मासिक राशिफल",
    yearly: "वार्षिक राशिफल",
  },
};

/** Trust-card copy (reviewer sentence removed per S22 item 1). */
export const TRUST: Record<HoroLang, { title: string; body: string }> = {
  en: {
    title: "Team Vyotish",
    body: "Composed from classical Jyotish rules (planetary strength, weekday lords and Sade Sati phases) and reviewed by our Jyotishi panel.",
  },
  hi: {
    title: "टीम व्योतिष",
    body: "पारंपरिक ज्योतिष नियमों (ग्रह-बल, वार-स्वामी और साढ़े साती अवस्था) से रचित और हमारे ज्योतिषी पैनल द्वारा समीक्षित।",
  },
};

/** Detail-component strings not carried by content_blocks. */
export const DETAIL: Record<HoroLang, Record<string, string>> = {
  en: {
    unavailable: "This reading is being prepared — please check back shortly.",
    legacy_love: "Love & Relationships",
    legacy_career: "Career & Business",
    legacy_finance: "Finance",
    legacy_health: "Health",
    sadesati: "Sade Sati",
    saturn_phase: "Saturn's transit phase",
    month_col: "Month",
    rating_col: "Rating",
  },
  hi: {
    unavailable: "यह रीडिंग तैयार हो रही है — कृपया थोड़ी देर बाद दोबारा देखें।",
    legacy_love: "प्रेम और रिश्ते",
    legacy_career: "करियर और व्यापार",
    legacy_finance: "धन",
    legacy_health: "स्वास्थ्य",
    sadesati: "साढ़े साती",
    saturn_phase: "शनि का गोचर चरण",
    month_col: "माह",
    rating_col: "रेटिंग",
  },
};
