/** The 9 main tabs (PRD §4) — single source for header/footer/home tiles/mobile drawer. */
export interface NavTab {
  label: string;
  label_hi: string;
  href: string;
  description: string;
  /** Material Symbols icon name (home design §9) */
  icon: string;
}

export const NAV_TABS: NavTab[] = [
  {
    label: "Consultations",
    label_hi: "परामर्श",
    href: "/consultations",
    description: "Find an astrologer and request a booking",
    icon: "support_agent",
  },
  {
    label: "Horoscope",
    label_hi: "राशिफल",
    href: "/horoscope",
    description: "Daily to yearly predictions for 12 signs",
    icon: "auto_awesome",
  },
  {
    label: "Panchang",
    label_hi: "पंचांग",
    href: "/panchang",
    description: "Daily Vedic calendar for your city",
    icon: "calendar_month",
  },
  {
    label: "Muhurat",
    label_hi: "मुहूर्त",
    href: "/muhurat",
    description: "Auspicious timings for every event",
    icon: "verified",
  },
  {
    label: "Astrology",
    label_hi: "ज्योतिष",
    href: "/astrology",
    description: "Free Kundli, matching and learning",
    icon: "insights",
  },
  {
    label: "Poojan",
    label_hi: "पूजन",
    href: "/poojan",
    description: "Pooja catalogue and booking",
    icon: "temple_hindu",
  },
  {
    label: "Free Calculators",
    label_hi: "गणना यंत्र",
    href: "/calculators",
    description: "Quick astrology and numerology tools",
    icon: "calculate",
  },
  {
    label: "Gemstones",
    label_hi: "रत्न",
    href: "/gemstones",
    description: "Coming soon..!",
    icon: "diamond",
  },
  {
    label: "Blog",
    label_hi: "ब्लॉग",
    href: "/blog",
    description: "Astro-education articles",
    icon: "article",
  },
];

export const LEGAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Refund & Cancellation", href: "/refund" },
  { label: "Disclaimer", href: "/disclaimer" },
];
