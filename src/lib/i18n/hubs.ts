/**
 * Hub-page vocabulary (S24) — the five top-level index pages outside home:
 * /astrology/, /calculators/, /panchang/, /consultations/, /poojan/.
 * DB-served card content (Tier 1 calculators, astrologer rows, puja rows)
 * stays as served by the API; page chrome, headings and notes are translated
 * here. Natural Hindi, consistent Jyotish terms.
 */
import type { Lang } from "../i18n";

export const ASTROLOGY_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    open: string;
    sections: Array<{
      href: string;
      title: string;
      title_hi: string;
      desc: string;
      desc_hi: string;
    }>;
  }
> = {
  en: {
    title: "Astrology — Kundli, Matching, Calculators & Learn | Vyotish",
    description:
      "Everything Vedic astrology on Vyotish: free kundli generation, Ashtakoota matching, free calculators and original learning articles.",
    h1: "Astrology",
    lede: "Classical Jyotish computed properly — precise sidereal positions from the backend engine, honest verification flags, and no fear-based readings anywhere.",
    open: "Open →",
    sections: [
      {
        href: "/kundli",
        title: "Free Kundli",
        title_hi: "जन्म कुंडली",
        desc: "Full birth chart — nine grahas, Lagna, houses, Navamsha, divisionals, Sade Sati and the Vimshottari dasha table.",
        desc_hi:
          "पूर्ण जन्म कुंडली — नौ ग्रह, लग्न, भाव, नवांश, वर्ग कुंडलियाँ, साढ़े साती और विंशोत्तरी दशा तालिका।",
      },
      {
        href: "/matching",
        title: "Kundli Matching",
        title_hi: "कुंडली मिलान",
        desc: "Ashtakoota 36-guna milan with per-koota explanations and Manglik dosha from Lagna, Moon and Venus.",
        desc_hi: "अष्टकूट 36 गुण मिलान — प्रत्येक कूट की व्याख्या और लग्न, चंद्र तथा शुक्र से मांगलिक दोष की जाँच।",
      },
      {
        href: "/compatibility",
        title: "Zodiac Compatibility",
        title_hi: "राशि मैत्री",
        desc: "Western sun-sign matching for all 144 pairings — love, trust, communication and emotional scores with original tips.",
        desc_hi:
          "पश्चिमी सूर्य-राशि मैत्री — सभी 144 जोड़ियों के प्रेम, भरोसा, संवाद और भावनात्मक स्कोर, मौलिक सुझावों के साथ।",
      },
      {
        href: "/calculators",
        title: "Calculators",
        title_hi: "कैलकुलेटर",
        desc: "Rashi, Nakshatra, Sade Sati, Kaal Sarp, numerology and the full Tier 2 tool set — instant, free.",
        desc_hi: "राशि, नक्षत्र, साढ़े साती, काल सर्प, अंक ज्योतिष और पूरा Tier 2 यंत्र-सेट — तुरंत, मुफ़्त।",
      },
      {
        href: "/astrology/learn/",
        title: "Learn",
        title_hi: "अध्ययन",
        desc: "Original articles: the 12 rashis, Navagraha, 27 nakshatras, houses, panchang, doshas and dasha.",
        desc_hi: "मौलिक लेख — 12 राशियाँ, नवग्रह, 27 नक्षत्र, भाव, पंचांग, दोष और दशा।",
      },
    ],
  },
  hi: {
    title: "ज्योतिष — कुंडली, मिलान, यंत्र और अध्ययन | Vyotish",
    description:
      "व्योतिष पर वैदिक ज्योतिष का पूरा संसार: मुफ्त कुंडली निर्माण, अष्टकूट मिलान, मुफ्त गणना यंत्र और मौलिक अध्ययन लेख।",
    h1: "ज्योतिष",
    lede: "शास्त्रीय ज्योतिष, ठीक से गणना किया हुआ — बैकएंड इंजन से सटीक निरयण ग्रह-स्थितियाँ, ईमानदार सत्यापन फ़्लैग, और कहीं भी डर बेचने वाली बातें नहीं।",
    open: "खोलें →",
    sections: [],
  },
};
// hi sections mirror the EN array (same hrefs, Hindi titles/descriptions)
ASTROLOGY_HUB.hi.sections = ASTROLOGY_HUB.en.sections.map((s) => ({
  href: s.href,
  title: s.title_hi,
  title_hi: s.title_hi,
  desc: s.desc_hi,
  desc_hi: s.desc_hi,
}));

export const CALCULATORS_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    featured: string;
    more: string;
    empty: string;
    open: string;
    note: string;
  }
> = {
  en: {
    title: "Free Astrology & Numerology Calculators | Vyotish",
    description:
      "Free Tier 1 and Tier 2 Vedic calculators — Rashi, Nakshatra, Sade Sati, Mangal Dosha, Kaal Sarp, numerology and more — computed live by the Vyotish engine.",
    h1: "Free calculators",
    lede: "Every tool is computed by the Vyotish backend engine (/api/v1) — instant results, plain-language explanations, zero login. Birth-based tools never store your details.",
    featured: "Featured calculators",
    more: "More tools",
    empty:
      "Featured tools are temporarily unavailable — the backend content service could not be reached at build time. The full list below still works.",
    open: "Open →",
    note: 'Building a match? Use the <a href="/matching">Guna Milan (Ashtakoota) page</a>, or generate a full chart on the <a href="/kundli">Free Kundli page</a>. Fun tools are always labelled <em>"for fun"</em>; astrological verdicts carry their verification status.',
  },
  hi: {
    title: "मुफ़्त ज्योतिष एवं अंक ज्योतिष यंत्र | Vyotish",
    description:
      "मुफ़्त Tier 1 और Tier 2 वैदिक यंत्र — राशि, नक्षत्र, साढ़े साती, मांगल दोष, काल सर्प, अंक ज्योतिष और भी बहुत कुछ — व्योतिष इंजन द्वारा लाइव गणना के साथ।",
    h1: "मुफ़्त यंत्र (कैलकुलेटर)",
    lede: "हर यंत्र व्योतिष बैकएंड इंजन (/api/v1) से गणना करता है — तुरंत परिणाम, सरल भाषा में व्याख्या, शून्य लॉगिन। जन्म-आधारित यंत्र आपके विवरण कभी संग्रहीत नहीं करते।",
    featured: "चुनिंदा यंत्र",
    more: "अन्य यंत्र",
    empty:
      "चुनिंदा यंत्र अस्थायी रूप से उपलब्ध नहीं हैं — बिल्ड के समय बैकएंड सामग्री सेवा तक पहुँच नहीं बन पाई। नीचे की पूरी सूची फिर भी काम करती है।",
    open: "खोलें →",
    note: 'मिलान कर रहे हैं? <a href="/hi/matching">गुण मिलान (अष्टकूट) पेज</a> इस्तेमाल करें, या <a href="/hi/kundli">मुफ़्त कुंडली पेज</a> पर पूरी कुंडली बनाएँ। मनोरंजन-यंत्र हमेशा <em>"मनोरंजन हेतु"</em> लिखे होते हैं; ज्योतिषीय निष्कर्ष अपना सत्यापन स्टेटस साथ रखते हैं।',
  },
};

export const PANCHANG_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    searchLabel: string;
    searchPh: string;
    empty: string;
    noPage: string;
  }
> = {
  en: {
    title: "Panchang by City | Vyotish",
    description:
      "Daily Vedic Panchang for your city — five limbs with start/end times, sunrise-based day, Rahu Kaal and more.",
    h1: "Panchang",
    lede: "Choose a city — every city has its own page, computed in its own timezone.",
    searchLabel: "Search any city worldwide",
    searchPh: "Start typing your city…",
    empty:
      "City pages are temporarily unavailable — the backend city service could not be reached at build time. Please try again later.",
    noPage:
      "This town has no dedicated page yet — open a nearby city below and switch its place field to it (or use the Panchang page's own place field).",
  },
  hi: {
    title: "शहर के अनुसार पंचांग | Vyotish",
    description:
      "आपके शहर का दैनिक वैदिक पंचांग — पाँच अंग, प्रारंभ/समाप्ति समय, सूर्योदय-आधारित दिन, राहु काल और भी बहुत कुछ।",
    h1: "पंचांग",
    lede: "अपना शहर चुनें — हर शहर का अपना पेज है, उसी शहर के समय-क्षेत्र में गणना के साथ।",
    searchLabel: "दुनिया का कोई भी शहर खोजें",
    searchPh: "अपने शहर का नाम लिखना शुरू करें…",
    empty:
      "शहर-पेज अस्थायी रूप से उपलब्ध नहीं हैं — बिल्ड के समय बैकएंड शहर सेवा तक पहुँच नहीं बन पाई। कृपया थोड़ी देर बाद दोबारा कोशिश करें।",
    noPage:
      "इस कस्बे का अभी कोई समर्पित पेज नहीं है — नीचे कोई नज़दीकी शहर खोलें और उसके प्लेस फ़ील्ड में अपना स्थान चुनें (या पंचांग पेज का अपना प्लेस फ़ील्ड इस्तेमाल करें)।",
  },
};

export const CONSULTATIONS_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    empty: string;
    yrsExp: string;
    availOn: string;
    availOff: string;
    profile: string;
    previewNote: string;
    formH2: string;
    subjectLabel: string;
    submitLabel: string;
  }
> = {
  en: {
    title: "Consult a Jyotish Scholar — Astrologer Directory | Vyotish",
    description:
      "Browse verified Vedic astrologers by expertise, language and experience — request a consultation directly; an astrologer responds within 24–48 hours.",
    h1: "Consultations",
    lede: "Choose a scholar by expertise, language and lineage. An astrologer responds personally within 24–48 hours. No payment is taken online yet.",
    empty:
      "The astrologer directory is temporarily unavailable — the backend service could not be reached at build time. Please try again later.",
    yrsExp: "yrs exp",
    availOn: "Available",
    availOff: "Unavailable",
    profile: "View profile →",
    previewNote:
      "Launch preview: profiles shown are illustrative while the directory is being finalised.",
    formH2: "Request a consultation",
    subjectLabel: "Topic",
    submitLabel: "Request Consultation",
  },
  hi: {
    title: "ज्योतिषी से परामर्श — ज्योतिषी निर्देशिका | Vyotish",
    description:
      "विशेषज्ञता, भाषा और अनुभव के आधार पर प्रमाणित वैदिक ज्योतिषी खोजें — सीधे परामर्श का अनुरोध करें; ज्योतिषी 24–48 घंटों में व्यक्तिगत उत्तर देता है।",
    h1: "ज्योतिष परामर्श",
    lede: "विशेषज्ञता, भाषा और परंपरा के आधार पर विद्वान चुनें। ज्योतिषी 24–48 घंटों में व्यक्तिगत रूप से उत्तर देता है। अभी ऑनलाइन भुगतान नहीं लिया जाता।",
    empty:
      "ज्योतिषी निर्देशिका अस्थायी रूप से उपलब्ध नहीं है — बिल्ड के समय बैकएंड सेवा तक पहुँच नहीं बन पाई। कृपया थोड़ी देर बाद दोबारा कोशिश करें।",
    yrsExp: "वर्ष अनुभव",
    availOn: "उपलब्ध",
    availOff: "उपलब्ध नहीं",
    profile: "प्रोफ़ाइल देखें →",
    previewNote: "लॉन्च प्रीव्यू: निर्देशिका के पूर्ण होने तक दिखाई गई प्रोफ़ाइलें उदाहरण-स्वरूप हैं।",
    formH2: "परामर्श का अनुरोध करें",
    subjectLabel: "विषय",
    submitLabel: "परामर्श का अनुरोध करें",
  },
};

export const GEMSTONES: Record<
  Lang,
  {
    titleLive: string;
    titleSoon: string;
    description: string;
    h1Live: string;
    pLive: string;
    ctaLive: string;
    h1Soon: string;
    pSoon: string;
    backHome: string;
  }
> = {
  en: {
    titleLive: "Gemstones | Vyotish",
    titleSoon: "Gemstones — Coming soon..! | Vyotish",
    description:
      "Vyotish gemstones recommendations — lab-certified stones with traditional Vedic energisation.",
    h1Live: "Vyotish Gemstones",
    pLive:
      "Our dedicated lab-certified gemstone platform is ready — every stone ships with a government-accredited certificate and traditional Vedic energisation.",
    ctaLive: "Visit the gemstone store →",
    h1Soon: "Coming soon..!",
    pSoon:
      "Our gemstone recommendations are being crafted with the same care as the rest of Vyotish — traditional guidance, honest sourcing, no exaggerated claims. The moment the store launches, this page links straight to it.",
    backHome: "← Back to home",
  },
  hi: {
    titleLive: "रत्न | Vyotish",
    titleSoon: "रत्न — शीघ्र आ रहा है..! | Vyotish",
    description: "व्योतिष रत्न सुझाव — प्रयोगशाला-प्रमाणित रत्न, पारंपरिक वैदिक प्राण-प्रतिष्ठा के साथ।",
    h1Live: "व्योतिष रत्न",
    pLive:
      "हमारा समर्पित प्रयोगशाला-प्रमाणित रत्न मंच तैयार है — हर रत्न सरकार-मान्यता प्राप्त प्रमाणपत्र और पारंपरिक वैदिक प्राण-प्रतिष्ठा के साथ भेजा जाता है।",
    ctaLive: "रत्न स्टोर देखें →",
    h1Soon: "शीघ्र आ रहा है..!",
    pSoon:
      "हमारे रत्न सुझाव उसी ईमानदारी से तैयार हो रहे हैं जिससे व्योतिष का बाकी हिस्सा बना है — पारंपरिक मार्गदर्शन, पारदर्शी स्रोत, कोई अतिशयोक्तिपूर्ण दावा नहीं। स्टोर लॉन्च होते ही यह पेज सीधे उसी से जुड़ जाएगा।",
    backHome: "← मुखपृष्ठ पर लौटें",
  },
};

export const BLOG_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    ledePre: string;
    rssLabel: string;
    ledePost: string;
    searchPh: string;
    searchAria: string;
    searchBtn: string;
    clear: string;
    empty: string;
  }
> = {
  en: {
    title: "Blog — Vedic Astrology Articles | Vyotish",
    description:
      "Original astro-education articles: rashis, nakshatras, yogas, doshas, dasha, panchang and practical astrology guides from the Vyotish team.",
    h1: "Vyotish Blog",
    ledePre:
      "Original articles on Vedic astrology — how the system works, what the classics say and how Vyotish computes it. Also available as ",
    rssLabel: "RSS",
    ledePost: ".",
    searchPh: "Search articles…",
    searchAria: "Search articles",
    searchBtn: "Search",
    clear: "Show all articles",
    empty:
      'The first articles are being written and edited — check back shortly. Meanwhile, the <a href="/astrology/learn">Learn library</a> is open.',
  },
  hi: {
    title: "ब्लॉग — वैदिक ज्योतिष लेख | Vyotish",
    description:
      "मौलिक ज्योतिष-शिक्षा लेख: राशियाँ, नक्षत्र, योग, दोष, दशा, पंचांग और व्यावहारिक ज्योतिष मार्गदर्शिकाएँ — व्योतिष टीम से।",
    h1: "व्योतिष ब्लॉग",
    ledePre:
      "वैदिक ज्योतिष पर मौलिक लेख — व्यवस्था कैसे काम करती है, शास्त्र क्या कहते हैं और व्योतिष उसे कैसे गणना करता है। ",
    rssLabel: "RSS",
    ledePost: " में भी उपलब्ध।",
    searchPh: "लेख खोजें…",
    searchAria: "लेख खोजें",
    searchBtn: "खोजें",
    clear: "सभी लेख दिखाएँ",
    empty:
      'पहले लेख लिखे और संपादित किए जा रहे हैं — थोड़ी देर बाद फिर देखें। इस बीच <a href="/hi/astrology/learn">अध्ययन-संग्रह</a> खुला है।',
  },
};

/** Blog card meta (PostCard + client search cards): locale drives the
 * Intl date month names; readSuf follows the reading minutes. */
export const BLOG_CARD: Record<Lang, { readSuf: string; locale: string }> = {
  en: { readSuf: " min read", locale: "en-IN" },
  hi: { readSuf: " मिनट में पढ़ें", locale: "hi-IN" },
};

/** Blog pager (Prev/Next strip under the post grid). */
export const BLOG_PAGER: Record<
  Lang,
  { pageOf: (page: number, pages: number) => string; newer: string; older: string; aria: string }
> = {
  en: {
    pageOf: (page, pages) => `Page ${page} of ${pages}`,
    newer: "← Newer",
    older: "Older →",
    aria: "Pagination",
  },
  hi: {
    pageOf: (page, pages) => `${pages} में से पृष्ठ ${page}`,
    newer: "← नए",
    older: "पुराने →",
    aria: "पेजिनेशन",
  },
};

/** Blog client-search island strings (blog-search.ts module script). */
export const BLOG_SEARCH: Record<
  Lang,
  {
    searching: (q: string) => string;
    results: (n: number, q: string) => string;
    noMatch: (q: string) => string;
    unavailable: string;
  }
> = {
  en: {
    searching: (q) => `Searching for “${q}”…`,
    results: (n, q) => `${n} result${n === 1 ? "" : "s"} for “${q}”`,
    noMatch: (q) => `No articles match “${q}” — try another word.`,
    unavailable: "Search is unavailable right now — please try again later.",
  },
  hi: {
    searching: (q) => `“${q}” के लिए खोज रहे हैं…`,
    results: (n, q) => `“${q}” के लिए ${n} परिणाम`,
    noMatch: (q) => `“${q}” से मिलता कोई लेख नहीं — कोई दूसरा शब्द आज़माएँ।`,
    unavailable: "अभी खोज उपलब्ध नहीं है — कृपया थोड़ी देर बाद फिर कोशिश करें।",
  },
};

export const POOJAN_HUB: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    empty: string;
    purpose: string;
    includes: string;
    onRequest: string;
    details: string;
    formH2: string;
    subjectLabel: string;
    submitLabel: string;
  }
> = {
  en: {
    title: "Poojan — Vedic Puja Catalogue | Vyotish",
    description:
      "Vedic pujas with purpose, duration, mode and what's included — Graha Shanti, Satyanarayan, Griha Pravesh and more — booked through the Vyotish admin inbox.",
    h1: "Poojan",
    lede: "Traditional pujas performed by qualified pandits — online or at your home/temple. Every listing states its purpose, duration and inclusions. Request below; the team confirms muhurat, samagri and mode personally.",
    empty:
      "The poojan catalogue is temporarily unavailable — the backend service could not be reached at build time. Please try again later.",
    purpose: "Purpose:",
    includes: "Includes:",
    onRequest: "On request",
    details: "Details →",
    formH2: "Request a puja",
    subjectLabel: "Puja",
    submitLabel: "Request Puja",
  },
  hi: {
    title: "पूजन — वैदिक पूजा सूची | Vyotish",
    description:
      "उद्देश्य, अवधि, माध्यम और शामिल विवरण के साथ वैदिक पूजाएँ — ग्रह शांति, सत्यनारायण, गृह प्रवेश और भी बहुत कुछ — व्योतिष टीम के माध्यम से बुक।",
    h1: "पूजन",
    lede: "योग्य पंडितों द्वारा की जाने वाली पारंपरिक पूजाएँ — ऑनलाइन या आपके घर/मंदिर पर। हर लिस्टिंग अपना उद्देश्य, अवधि और शामिल विवरण बताती है। नीचे अनुरोध करें; टीम मुहूर्त, सामग्री और माध्यम व्यक्तिगत रूप से तय करती है।",
    empty:
      "पूजन सूची अस्थायी रूप से उपलब्ध नहीं है — बिल्ड के समय बैकएंड सेवा तक पहुँच नहीं बन पाई। कृपया थोड़ी देर बाद दोबारा कोशिश करें।",
    purpose: "उद्देश्य:",
    includes: "शामिल हैं:",
    onRequest: "अनुरोध पर",
    details: "विवरण →",
    formH2: "पूजा का अनुरोध करें",
    subjectLabel: "पूजा",
    submitLabel: "पूजा का अनुरोध करें",
  },
};
