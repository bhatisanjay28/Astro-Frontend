/** The 9 main tabs (PRD §4) — single source for header/footer/home tiles/mobile drawer.
 * S17-1: the optional `menu` on a tab drives the header mega menu (desktop hover panel)
 * and the mobile drawer accordion from this ONE config. Every href is a real route
 * (verified against sitemap.xml.ts + the live API slugs, 2026-11-22). A tab without
 * `menu` renders as a plain link — Gemstones has no sub-pages, so no dropdown.
 * S24: every label/desc/title carries a Hindi twin (label_hi / hi / hi_desc /
 * title_hi / display_hi) so the whole chrome renders natural Hindi on /hi pages;
 * withLang() (lib/i18n.ts) now keeps EVERY twin route in the visitor's language. */

import { withLang } from "../lib/i18n";

export { withLang };

export interface MenuLink {
  label: string;
  href: string;
  /** One-line description shown under the label (desktop panel). */
  desc?: string;
  /** Hindi label (Devanagari) shown beside the label. */
  hi?: string;
  /** Hindi description for the desktop panel (hi pages render this instead of desc). */
  hi_desc?: string;
}

export interface MenuGroup {
  /** Column heading in the desktop panel (and the accordion on mobile). */
  title?: string;
  /** Hindi column heading (hi pages). */
  title_hi?: string;
  /** Grid columns this group's links flow into (desktop panel, default 1). */
  cols?: number;
  links: MenuLink[];
}

export interface NavTab {
  label: string;
  label_hi: string;
  href: string;
  description: string;
  description_hi?: string;
  /** Footer portal display name override (e.g. "Daily Panchang"). */
  display_hi?: string;
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
    description_hi: "ज्योतिषी खोजें और परामर्श के लिए अनुरोध करें",
    display_hi: "ज्योतिषी परामर्श",
    icon: "support_agent",
    menu: [
      {
        title: "Directory",
        title_hi: "निर्देशिका",
        links: [
          {
            label: "All astrologers",
            hi: "सभी ज्योतिषी",
            href: "/consultations",
            desc: "Verified Jyotish scholars — browse by expertise and language",
            hi_desc: "प्रमाणित ज्योतिष विद्वान — विशेषज्ञता और भाषा के अनुसार देखें",
          },
        ],
      },
      {
        title: "Booking",
        title_hi: "बुकिंग",
        links: [
          {
            label: "Request a consultation",
            hi: "परामर्श का अनुरोध करें",
            href: "/consultations#book",
            desc: "No payment online — an astrologer responds within 24–48 hours",
            hi_desc: "ऑनलाइन भुगतान नहीं — ज्योतिषी 24–48 घंटों में उत्तर देते हैं",
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
    description_hi: "12 राशियों के लिए दैनिक से वार्षिक राशिफल",
    display_hi: "राशिफल",
    icon: "auto_awesome",
    menu: [
      {
        title: "Horoscope",
        title_hi: "राशिफल",
        links: [
          {
            label: "All signs & periods",
            hi: "सभी राशियाँ और अवधियाँ",
            href: "/horoscope",
            desc: "Yesterday to yearly — pick a Moon sign",
            hi_desc: "बीते कल से वार्षिक तक — अपनी चंद्र राशि चुनें",
          },
        ],
      },
      {
        title: "12 Moon signs",
        title_hi: "12 चंद्र राशियाँ",
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
    description_hi: "आपके शहर का दैनिक वैदिक कैलेंडर",
    display_hi: "दैनिक पंचांग",
    icon: "calendar_month",
    menu: [
      {
        title: "Panchang",
        title_hi: "पंचांग",
        links: [
          {
            label: "Panchang home",
            hi: "पंचांग मुखपृष्ठ",
            href: "/panchang",
            desc: "Search any of ~70,000 cities worldwide",
            hi_desc: "दुनिया भर के लगभग 70,000 शहर खोजें",
          },
        ],
      },
      {
        title: "Popular cities",
        title_hi: "प्रमुख शहर",
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
    description_hi: "हर शुभ कार्य के लिए शुभ समय",
    display_hi: "शुभ मुहूर्त",
    icon: "verified",
    menu: [
      {
        title: "Muhurat",
        title_hi: "मुहूर्त",
        links: [
          {
            label: "Muhurat home",
            hi: "मुहूर्त मुखपृष्ठ",
            href: "/muhurat",
            desc: "Today's auspicious windows for your city",
            hi_desc: "आपके शहर के आज के शुभ समय",
          },
        ],
      },
      {
        title: "On this page",
        title_hi: "इस पेज पर",
        links: [
          {
            label: "Today's windows",
            hi: "आज के शुभ समय",
            href: "/muhurat#today-h",
            desc: "Abhijit, Brahma Muhurta, Rahu Kaal",
            hi_desc: "अभिजीत, ब्रह्म मुहूर्त, राहु काल",
          },
          {
            label: "Muhurat finder",
            hi: "मुहूर्त खोजक",
            href: "/muhurat#finder-h",
            desc: "10 events — marriage, griha pravesh, vehicle, business…",
            hi_desc: "10 कार्य — विवाह, गृह प्रवेश, वाहन, व्यापार…",
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
    description_hi: "मुफ्त कुंडली, मिलान और ज्योतिष शिक्षा",
    display_hi: "ज्योतिष (कुंडली)",
    icon: "insights",
    menu: [
      {
        title: "Charts & matching",
        title_hi: "कुंडली और मिलान",
        links: [
          {
            label: "Free Kundli",
            hi: "मुफ्त कुंडली",
            href: "/kundli",
            desc: "Full birth chart — grahas, dasha, divisionals",
            hi_desc: "पूर्ण जन्म कुंडली — ग्रह, दशा, वर्ग कुंडलियाँ",
          },
          {
            label: "Kundli Matching",
            hi: "कुंडली मिलान",
            href: "/matching",
            desc: "Ashtakoota 36-guna milan + Manglik",
            hi_desc: "अष्टकूटा 36 गुण मिलान + मांगलिक",
          },
          {
            label: "Zodiac Compatibility",
            hi: "राशि अनुकूलता",
            href: "/compatibility",
            desc: "All 144 sun-sign pairings",
            hi_desc: "सभी 144 सूर्य-राशि जोड़े",
          },
        ],
      },
      {
        title: "Learn",
        title_hi: "ज्योतिष शिक्षा",
        links: [
          {
            label: "Learn astrology",
            hi: "ज्योतिष सीखें",
            href: "/astrology/learn",
            desc: "Original articles on the classics",
            hi_desc: "क्लासिक ग्रंथों पर मौलिक लेख",
          },
          { label: "The 12 Rashis", hi: "12 राशियाँ", href: "/astrology/learn/the-12-rashis" },
          {
            label: "The 27 Nakshatras",
            hi: "27 नक्षत्र",
            href: "/astrology/learn/the-27-nakshatras",
          },
          {
            label: "Navagraha — nine grahas",
            hi: "नवग्रह",
            href: "/astrology/learn/navagraha-nine-grahas",
          },
          { label: "The 12 Houses", hi: "12 भाव", href: "/astrology/learn/the-12-houses" },
        ],
      },
    ],
  },
  {
    label: "Poojan",
    label_hi: "पूजन",
    href: "/poojan",
    description: "Pooja catalogue and booking",
    description_hi: "पूजा सूची और बुकिंग",
    display_hi: "वैदिक पूजन",
    icon: "temple_hindu",
    menu: [
      {
        title: "Poojan",
        title_hi: "पूजन",
        links: [
          {
            label: "Pooja catalogue",
            hi: "पूजा सूची",
            href: "/poojan",
            desc: "Purpose, duration and inclusions listed for every puja",
            hi_desc: "हर पूजा का उद्देश्य, अवधि और सामग्री विवरण",
          },
        ],
      },
      {
        title: "Popular pujas",
        title_hi: "प्रमुख पूजाएँ",
        links: [
          { label: "Navagraha Shanti", hi: "नवग्रह शांति", href: "/poojan/navagraha-shanti" },
          { label: "Maha Rudrabhishek", hi: "महा रुद्राभिषेक", href: "/poojan/maha-rudrabhishek" },
          {
            label: "Griha Pravesh & Vastu Shanti",
            hi: "गृह प्रवेश व वास्तु शांति",
            href: "/poojan/griha-pravesh-vastu",
          },
          { label: "Book a puja", hi: "पूजा बुक करें", href: "/poojan#book" },
        ],
      },
    ],
  },
  {
    label: "Free Calculators",
    label_hi: "गणना यंत्र",
    href: "/calculators",
    description: "Quick astrology and numerology tools",
    description_hi: "शीघ्र ज्योतिष और अंकज्योतिष यंत्र",
    display_hi: "गणना यंत्र",
    icon: "calculate",
    menu: [
      {
        title: "Free Calculators",
        title_hi: "गणना यंत्र",
        links: [
          {
            label: "All calculators",
            hi: "सभी गणना यंत्र",
            href: "/calculators",
            desc: "23 free tools — instant, no login",
            hi_desc: "23 मुफ्त यंत्र — तुरंत, बिना लॉगिन",
          },
        ],
      },
      {
        title: "Birth charts",
        title_hi: "जन्म कुंडली यंत्र",
        links: [
          { label: "Rashi (Moon sign)", hi: "राशि (चंद्र)", href: "/calculators/rashi" },
          { label: "Nakshatra", hi: "नक्षत्र", href: "/calculators/nakshatra" },
          { label: "Rising Sign (Lagna)", hi: "लग्न", href: "/calculators/lagna" },
          {
            label: "Vimshottari Dasha",
            hi: "विंशोत्तरी दशा",
            href: "/calculators/vimshottari-dasha",
          },
          {
            label: "Atmakaraka / Darakaraka",
            hi: "आत्मकारक / दराकारक",
            href: "/calculators/karakas",
          },
          { label: "Ishta Devata", hi: "इष्ट देवता", href: "/calculators/ishta-devata" },
        ],
      },
      {
        title: "Doshas & transits",
        title_hi: "दोष और गोचर",
        links: [
          { label: "Sade Sati", hi: "साढ़े साती", href: "/calculators/sade-sati" },
          { label: "Mangal Dosha", hi: "मंगल दोष", href: "/calculators/mangal-dosha" },
          { label: "Kaal Sarp", hi: "काल सर्प", href: "/calculators/kaal-sarp" },
          { label: "Current Transit Chart", hi: "वर्तमान गोचर कुंडली", href: "/calculators/transits" },
        ],
      },
      {
        title: "Numerology",
        title_hi: "अंकज्योतिष",
        links: [
          { label: "Vedic Numerology", hi: "वैदिक अंकज्योतिष", href: "/calculators/numerology" },
          { label: "Destiny Number", hi: "भाग्यांक", href: "/calculators/destiny-number" },
          { label: "Lo Shu Grid", hi: "लो शु ग्रिड", href: "/calculators/lo-shu" },
          { label: "Name Numerology", hi: "नाम अंकज्योतिष", href: "/calculators/name-numerology" },
          {
            label: "Mobile Numerology",
            hi: "मोबाइल अंकज्योतिष",
            href: "/calculators/mobile-numerology",
          },
          { label: "Lucky Vehicle Number", hi: "शुभ वाहन अंक", href: "/calculators/vehicle-number" },
        ],
      },
      {
        title: "Sun, moon & fun",
        title_hi: "सूर्य, चंद्र और मनोरंजन",
        links: [
          { label: "Moon Phase", hi: "चंद्र कला", href: "/calculators/moon-phase" },
          { label: "Sun Sign", hi: "सूर्य राशि", href: "/calculators/sun-sign" },
          { label: "Age Calculator", hi: "आयु यंत्र", href: "/calculators/age" },
          {
            label: "Name Compatibility",
            hi: "नाम अनुकूलता",
            href: "/calculators/name-compatibility",
          },
          { label: "Love (fun)", hi: "प्रेम (मनोरंजन)", href: "/calculators/love" },
          { label: "Friendship (fun)", hi: "मित्रता (मनोरंजन)", href: "/calculators/friendship" },
          { label: "FLAMES (fun)", hi: "FLAMES (मनोरंजन)", href: "/calculators/flames" },
        ],
      },
    ],
  },
  {
    label: "Gemstones",
    label_hi: "रत्न",
    href: "/gemstones",
    description: "Coming soon..!",
    description_hi: "शीघ्र आ रहा है..!",
    display_hi: "रत्न",
    icon: "diamond",
  },
  {
    label: "Blog",
    label_hi: "ब्लॉग",
    href: "/blog",
    description: "Astro-education articles",
    description_hi: "ज्योतिष-शिक्षा लेख",
    display_hi: "ब्लॉग",
    icon: "article",
    menu: [
      {
        title: "Blog",
        title_hi: "ब्लॉग",
        links: [
          {
            label: "All articles",
            hi: "सभी लेख",
            href: "/blog",
            desc: "Astro-education from the Vyotish team — also as RSS",
            hi_desc: "व्योतिष टीम के ज्योतिष-शिक्षा लेख — RSS भी उपलब्ध",
          },
        ],
      },
      {
        title: "Categories",
        title_hi: "श्रेणियाँ",
        links: [
          { label: "Astrology Basics", hi: "ज्योतिष आधार", href: "/blog/category/basics" },
          { label: "Panchang Guides", hi: "पंचांग गाइड", href: "/blog/category/panchang-guides" },
          { label: "RSS feed", hi: "RSS फ़ीड", href: "/blog/rss.xml" },
        ],
      },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: "About", hi: "हमारे बारे में", href: "/about" },
  { label: "Contact", hi: "संपर्क", href: "/contact" },
  { label: "Privacy Policy", hi: "गोपनीयता नीति", href: "/privacy" },
  { label: "Terms of Use", hi: "उपयोग की शर्तें", href: "/terms" },
  { label: "Refund & Cancellation", hi: "धनवापसी और रद्दीकरण", href: "/refund" },
  { label: "Disclaimer", hi: "अस्वीकरण", href: "/disclaimer" },
];
