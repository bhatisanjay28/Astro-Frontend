/** The 9 main tabs (PRD §4) — single source for header/footer/home tiles/mobile drawer.
 * S17-1: the optional `menu` on a tab drives the header mega menu (desktop hover panel)
 * and the mobile drawer accordion from this ONE config. Every href is a real route
 * (verified against sitemap.xml.ts + the live API slugs, 2026-11-22). A tab without
 * `menu` renders as a plain link — Gemstones has no sub-pages, so no dropdown. */

export interface MenuLink {
  label: string;
  href: string;
  /** One-line description shown under the label (desktop panel). */
  desc?: string;
  /** Hindi label (Devanagari) shown beside the label. */
  hi?: string;
}

export interface MenuGroup {
  /** Column heading in the desktop panel (and the accordion on mobile). */
  title?: string;
  /** Grid columns this group's links flow into (desktop panel, default 1). */
  cols?: number;
  links: MenuLink[];
}

export interface NavTab {
  label: string;
  label_hi: string;
  href: string;
  description: string;
  /** Material Symbols icon name (home design §9) */
  icon: string;
  /** Sub-categories for the mega menu / mobile accordion (absent → plain tab). */
  menu?: MenuGroup[];
}

const SIGNS = [
  { slug: "aries", en: "Aries", hi: "मेष" },
  { slug: "taurus", en: "Taurus", hi: "वृषभ" },
  { slug: "gemini", en: "Gemini", hi: "मिथुन" },
  { slug: "cancer", en: "Cancer", hi: "कर्क" },
  { slug: "leo", en: "Leo", hi: "सिंह" },
  { slug: "virgo", en: "Virgo", hi: "कन्या" },
  { slug: "libra", en: "Libra", hi: "तुला" },
  { slug: "scorpio", en: "Scorpio", hi: "वृश्चिक" },
  { slug: "sagittarius", en: "Sagittarius", hi: "धनु" },
  { slug: "capricorn", en: "Capricorn", hi: "मकर" },
  { slug: "aquarius", en: "Aquarius", hi: "कुम्भ" },
  { slug: "pisces", en: "Pisces", hi: "मीन" },
] as const;

export const NAV_TABS: NavTab[] = [
  {
    label: "Consultations",
    label_hi: "परामर्श",
    href: "/consultations",
    description: "Find an astrologer and request a booking",
    icon: "support_agent",
    menu: [
      {
        title: "Directory",
        links: [
          {
            label: "All astrologers",
            href: "/consultations",
            desc: "Verified Jyotish scholars — browse by expertise and language",
          },
        ],
      },
      {
        title: "Booking",
        links: [
          {
            label: "Request a consultation",
            href: "/consultations#book",
            desc: "No payment online — an astrologer responds within 24–48 hours",
          },
        ],
      },
    ],
  },
  {
    label: "Horoscope",
    label_hi: "राशिफल",
    href: "/horoscope",
    description: "Daily to yearly predictions for 12 signs",
    icon: "auto_awesome",
    menu: [
      {
        title: "Horoscope",
        links: [
          {
            label: "All signs & periods",
            href: "/horoscope",
            desc: "Yesterday to yearly — pick a Moon sign",
          },
        ],
      },
      {
        title: "12 Moon signs",
        cols: 4,
        links: SIGNS.map((s) => ({
          label: s.en,
          href: `/horoscope/${s.slug}/daily`,
          hi: s.hi,
        })),
      },
    ],
  },
  {
    label: "Panchang",
    label_hi: "पंचांग",
    href: "/panchang",
    description: "Daily Vedic calendar for your city",
    icon: "calendar_month",
    menu: [
      {
        title: "Panchang",
        links: [
          {
            label: "Panchang home",
            href: "/panchang",
            desc: "Search any of ~70,000 cities worldwide",
          },
        ],
      },
      {
        title: "Popular cities",
        cols: 2,
        links: [
          { label: "New Delhi", href: "/panchang/new-delhi", hi: "नई दिल्ली" },
          { label: "Mumbai", href: "/panchang/mumbai", hi: "मुंबई" },
          { label: "Bengaluru", href: "/panchang/bengaluru", hi: "बेंगलुरु" },
          { label: "Hyderabad", href: "/panchang/hyderabad", hi: "हैदराबाद" },
          { label: "Chennai", href: "/panchang/chennai", hi: "चेन्नई" },
          { label: "Kolkata", href: "/panchang/kolkata", hi: "कोलकाता" },
          { label: "Pune", href: "/panchang/pune", hi: "पुणे" },
          { label: "Ahmedabad", href: "/panchang/ahmedabad", hi: "अहमदाबाद" },
        ],
      },
    ],
  },
  {
    label: "Muhurat",
    label_hi: "मुहूर्त",
    href: "/muhurat",
    description: "Auspicious timings for every event",
    icon: "verified",
    menu: [
      {
        title: "Muhurat",
        links: [
          {
            label: "Muhurat home",
            href: "/muhurat",
            desc: "Today's auspicious windows for your city",
          },
        ],
      },
      {
        title: "On this page",
        links: [
          {
            label: "Today's windows",
            href: "/muhurat#today-h",
            desc: "Abhijit, Brahma Muhurta, Rahu Kaal",
          },
          {
            label: "Muhurat finder",
            href: "/muhurat#finder-h",
            desc: "10 events — marriage, griha pravesh, vehicle, business…",
          },
        ],
      },
    ],
  },
  {
    label: "Astrology",
    label_hi: "ज्योतिष",
    href: "/astrology",
    description: "Free Kundli, matching and learning",
    icon: "insights",
    menu: [
      {
        title: "Charts & matching",
        links: [
          {
            label: "Free Kundli",
            href: "/kundli",
            desc: "Full birth chart — grahas, dasha, divisionals",
          },
          {
            label: "Kundli Matching",
            href: "/matching",
            desc: "Ashtakoota 36-guna milan + Manglik",
          },
          {
            label: "Zodiac Compatibility",
            href: "/compatibility",
            desc: "All 144 sun-sign pairings",
          },
        ],
      },
      {
        title: "Learn",
        links: [
          {
            label: "Learn astrology",
            href: "/astrology/learn",
            desc: "Original articles on the classics",
          },
          { label: "The 12 Rashis", href: "/astrology/learn/the-12-rashis" },
          { label: "The 27 Nakshatras", href: "/astrology/learn/the-27-nakshatras" },
          { label: "Navagraha — nine grahas", href: "/astrology/learn/navagraha-nine-grahas" },
          { label: "The 12 Houses", href: "/astrology/learn/the-12-houses" },
        ],
      },
    ],
  },
  {
    label: "Poojan",
    label_hi: "पूजन",
    href: "/poojan",
    description: "Pooja catalogue and booking",
    icon: "temple_hindu",
    menu: [
      {
        title: "Poojan",
        links: [
          {
            label: "Pooja catalogue",
            href: "/poojan",
            desc: "Purpose, duration and inclusions listed for every puja",
          },
        ],
      },
      {
        title: "Popular pujas",
        links: [
          { label: "Navagraha Shanti", href: "/poojan/navagraha-shanti" },
          { label: "Maha Rudrabhishek", href: "/poojan/maha-rudrabhishek" },
          { label: "Griha Pravesh & Vastu Shanti", href: "/poojan/griha-pravesh-vastu" },
          { label: "Book a puja", href: "/poojan#book" },
        ],
      },
    ],
  },
  {
    label: "Free Calculators",
    label_hi: "गणना यंत्र",
    href: "/calculators",
    description: "Quick astrology and numerology tools",
    icon: "calculate",
    menu: [
      {
        title: "Free Calculators",
        links: [
          {
            label: "All calculators",
            href: "/calculators",
            desc: "23 free tools — instant, no login",
          },
        ],
      },
      {
        title: "Birth charts",
        links: [
          { label: "Rashi (Moon sign)", href: "/calculators/rashi" },
          { label: "Nakshatra", href: "/calculators/nakshatra" },
          { label: "Rising Sign (Lagna)", href: "/calculators/lagna" },
          { label: "Vimshottari Dasha", href: "/calculators/vimshottari-dasha" },
          { label: "Atmakaraka / Darakaraka", href: "/calculators/karakas" },
          { label: "Ishta Devata", href: "/calculators/ishta-devata" },
        ],
      },
      {
        title: "Doshas & transits",
        links: [
          { label: "Sade Sati", href: "/calculators/sade-sati" },
          { label: "Mangal Dosha", href: "/calculators/mangal-dosha" },
          { label: "Kaal Sarp", href: "/calculators/kaal-sarp" },
          { label: "Current Transit Chart", href: "/calculators/transits" },
        ],
      },
      {
        title: "Numerology",
        links: [
          { label: "Vedic Numerology", href: "/calculators/numerology" },
          { label: "Destiny Number", href: "/calculators/destiny-number" },
          { label: "Lo Shu Grid", href: "/calculators/lo-shu" },
          { label: "Name Numerology", href: "/calculators/name-numerology" },
          { label: "Mobile Numerology", href: "/calculators/mobile-numerology" },
          { label: "Lucky Vehicle Number", href: "/calculators/vehicle-number" },
        ],
      },
      {
        title: "Sun, moon & fun",
        links: [
          { label: "Moon Phase", href: "/calculators/moon-phase" },
          { label: "Sun Sign", href: "/calculators/sun-sign" },
          { label: "Age Calculator", href: "/calculators/age" },
          { label: "Name Compatibility", href: "/calculators/name-compatibility" },
          { label: "Love (fun)", href: "/calculators/love" },
          { label: "Friendship (fun)", href: "/calculators/friendship" },
          { label: "FLAMES (fun)", href: "/calculators/flames" },
        ],
      },
    ],
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
    menu: [
      {
        title: "Blog",
        links: [
          {
            label: "All articles",
            href: "/blog",
            desc: "Astro-education from the Vyotish team — also as RSS",
          },
        ],
      },
      {
        title: "Categories",
        links: [
          { label: "Astrology Basics", href: "/blog/category/basics" },
          { label: "Panchang Guides", href: "/blog/category/panchang-guides" },
          { label: "RSS feed", href: "/blog/rss.xml" },
        ],
      },
    ],
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
