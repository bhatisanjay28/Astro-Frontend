/**
 * S24 — About page content, both languages. Prose is authored in-repo (never
 * user input), so set:html stays safe; internal links inside Hindi prose point
 * at the /hi twins. Claims stay repo-verified — translation only, no new facts.
 */
import type { Lang } from "../i18n";

interface AboutSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string[];
}

export const ABOUT: Record<
  Lang,
  {
    title: string;
    heading: string;
    eyebrow: string;
    intro: string;
    updated: string;
    note: string;
    sections: AboutSection[];
  }
> = {
  en: {
    title: "About Vyotish | Vyotish",
    heading: "About Vyotish",
    eyebrow: "About Vyotish",
    intro:
      "Authentic Vedic astrology, calculated with modern astronomical rigor — free core tools, honest guidance, and no fear-selling.",
    updated: "21 November 2026",
    note: "Vyotish is launching in phases; some sections carry an honest “coming soon” label until they are ready. This page is reviewed and updated as the site grows.",
    sections: [
      {
        id: "why",
        heading: "Why Vyotish exists",
        paragraphs: [
          "Vyotish is our attempt to bring classical Vedic astrology into modern life without the noise that usually surrounds it — no fear-selling, no miracle promises, no paywalls in front of basic charts. The core idea is simple: <strong>authentic Vedic astrology, calculated with real astronomical rigor, offered honestly.</strong>",
          "Most people meet astrology through someone trying to sell them something. We wanted the opposite experience: a place where you can generate a proper Janam Kundli, check today’s panchang, find a muhurat, understand your chart — free — and only then decide whether you want a human consultation.",
        ],
      },
      {
        id: "rigor",
        heading: "What “calculated with rigor” means",
        paragraphs: [
          "Every computation on Vyotish rests on published, open methods — nothing is a black box:",
        ],
        bullets: [
          "<strong>Sidereal zodiac with the Lahiri ayanamsha</strong> — the reference frame used in India’s official panchang calculations.",
          "<strong>Planetary positions from astronomy-engine</strong>, an open-source (MIT-licensed) astronomical library, running behind our own Lahiri sidereal layer.",
          "<strong>Time handled through the IANA Time Zone database</strong> — including historical zones and half-hour offsets — so a birth time means the same thing everywhere.",
          "<strong>70,000+ cities worldwide, India first</strong>, sourced from the GeoNames database, for birth-place lookups.",
          "<strong>250+ automated tests</strong> across the calculation engine and APIs, and growing with every fix.",
        ],
        note: [
          'Precision in astronomy is our standard; honesty about interpretation is our promise. Where computation ends and opinion begins, we say so — see our <a href="/disclaimer">astrological disclaimer</a>.',
        ],
      },
      {
        id: "what-you-find",
        heading: "What you will find here",
        bullets: [
          "<strong>Janam Kundli</strong> — a full Vedic birth chart, free, no signup.",
          "<strong>Kundli matching</strong> — the traditional 36-guna compatibility score for two charts.",
          "<strong>Panchang</strong> — daily tithi, nakshatra, yoga, karana and sunrise/sunset, plus a monthly calendar.",
          "<strong>Muhurat</strong> — auspicious timing for today, and a finder for events like travel, exams and property.",
          "<strong>23 free calculators</strong> — rashi, sade sati, mangal dosha, gemstone recommendation and more.",
          "<strong>Horoscopes, Learn and blog</strong> — daily, weekly and monthly readings, and grounded explainers.",
          "<strong>Consultations and pooja booking</strong> — requests routed to us; you confirm the session with a human before anything happens.",
        ],
        note: [
          "The site works on the slowest phones we could test and never asks you to create an account to use a tool. It runs in English and Hindi.",
        ],
      },
      {
        id: "never-do",
        heading: "What we will never do",
        bullets: [
          "<strong>No fear-selling:</strong> we will not frighten you into a remedy. If a chart shows a dosha, we explain what tradition says, at what weight, and what — if anything — you might do about it.",
          "<strong>No cure claims:</strong> no gemstone, pooja or mantra is sold as medicine. Ever.",
          "<strong>No guaranteed results:</strong> predictions are opinions; you will never see “100% guaranteed” here.",
          "<strong>No fabricated trust:</strong> no invented reviews, ratings, user counts or awards. Real numbers, real testimonials, or an honest empty space.",
          '<strong>No hidden fees:</strong> the tools are free; when paid services open, their prices and this site’s <a href="/refund">refund policy</a> will be published before you are ever charged.',
        ],
      },
      {
        id: "privacy",
        heading: "How we handle your data",
        paragraphs: [
          'The tools run without storing your inputs — you compute a chart, take your result, and the details are not kept in our database. Booking requests collect only what a human needs to schedule your session, and birth details for consultations are taken only with an explicit consent tick. Deletion on request is a promise, not a process. The full detail lives in our <a href="/privacy">Privacy Policy</a>, written against India’s DPDP Act, 2023.',
        ],
      },
      {
        id: "today",
        heading: "Where Vyotish is today",
        paragraphs: [
          "This is phase one of a phased public launch. The calculation engine, the tool layer and the content sections are live; a few things — like the gemstones section — show an honest “coming soon” label until they are ready rather than a hollow page. Sample or illustrative content is always marked as such, and it is replaced by reviewed, real content as we grow.",
          "We keep fixing, measuring and correcting in the open: if a computed value looks wrong, report it and it becomes a test case and a fix.",
        ],
      },
      {
        id: "contact",
        heading: "Talk to us",
        paragraphs: [
          'Every genuine message reaches a human: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>, or through our <a href="/contact">contact page</a>. Corrections, questions, feedback and well-wishes are all welcome — especially corrections.',
        ],
      },
    ],
  },
  hi: {
    title: "व्योतिष के बारे में | Vyotish",
    heading: "व्योतिष के बारे में",
    eyebrow: "व्योतिष के बारे में",
    intro:
      "प्रामाणिक वैदिक ज्योतिष — आधुनिक खगोलीय कठोरता से गणना; मुफ़्त मूल टूल, ईमानदार मार्गदर्शन, और डर बेचने की नहीं।",
    updated: "21 नवंबर 2026",
    note: "व्योतिष चरणबद्ध लॉन्च कर रहा है; कुछ खंड तैयार होने तक ईमानदार “जल्द आ रहा है” लेबल रखते हैं। साइट के बढ़ने के साथ यह पृष्ठ समीक्षित और अद्यतन होता रहता है।",
    sections: [
      {
        id: "why",
        heading: "व्योतिष क्यों बना है",
        paragraphs: [
          "व्योतिष हमारा प्रयास है कि शास्त्रीय वैदिक ज्योतिष को आधुनिक जीवन में उस शोर के बिना पहुँचाया जाए जो आम तौर पर उसके चारों ओर होता है — न डर बेचने वाले दावे, न चमत्कार के वादे, न बुनियादी चार्ट के आगे पे-वॉल। मूल विचार सरल है: <strong>प्रामाणिक वैदिक ज्योतिष, वास्तविक खगोलीय कठोरता से गणना, ईमानदारी से प्रस्तुत।</strong>",
          "ज़्यादातर लोग ज्योतिष से किसी बिक्री करने वाले के ज़रिए जुड़ते हैं। हम उसका उलटा अनुभव चाहते थे: एक ऐसी जगह जहाँ आप ठीक-ठाक जन्म कुंडली बना सकें, आज का पंचांग देख सकें, मुहूर्त खोज सकें, अपनी कुंडली समझ सकें — मुफ़्त में — और तभी तय कर सकें कि किसी व्यक्ति से परामर्श चाहिए या नहीं।",
        ],
      },
      {
        id: "rigor",
        heading: "“कठोरता से गणना” का अर्थ",
        paragraphs: ["व्योतिष की हर गणना प्रकाशित, खुली पद्धतियों पर टिकी है — कुछ भी अज्ञेय ब्लैक-बॉक्स नहीं:"],
        bullets: [
          "<strong>लहरी अयनांश के साथ निरयण राशिचक्र</strong> — वही संदर्भ-चक्र जो भारत की सरकारी पंचांग गणनाओं में उपयोग होता है।",
          "<strong>astronomy-engine से ग्रह स्थितियाँ</strong> — ओपन-सोर्स (MIT लाइसेंस) खगोलीय लाइब्रेरी, जो हमारी अपनी लहरी निरयण परत के पीछे चलती है।",
          "<strong>समय IANA टाइम ज़ोन डेटाबेस से</strong> — ऐतिहासिक क्षेत्र और आधे-घंटे के अंतर सहित — ताकि जन्म समय का अर्थ हर जगह वही रहे।",
          "<strong>दुनिया भर के 70,000+ शहर, भारत पहले</strong>, जन्म-स्थान खोज के लिए GeoNames डेटाबेस से।",
          "<strong>250+ स्वचालित टेस्ट</strong> गणना-इंजन और API पर — और हर सुधार के साथ बढ़ते हुए।",
        ],
        note: [
          'खगोलीय सटीकता हमारा मानक है; व्याख्या के बारे में ईमानदारी हमारा वादा। जहाँ गणना समाप्त और राय शुरू होती है, हम वही खुलकर कहते हैं — देखें हमारा <a href="/hi/disclaimer">ज्योतिषीय अस्वीकरण</a>।',
        ],
      },
      {
        id: "what-you-find",
        heading: "यहाँ आपको क्या मिलेगा",
        bullets: [
          "<strong>जन्म कुंडली</strong> — पूर्ण वैदिक जन्म चार्ट, मुफ़्त, बिना साइनअप।",
          "<strong>कुंडली मिलान</strong> — दो कुंडलियों का पारंपरिक 36-गुण मिलान स्कोर।",
          "<strong>पंचांग</strong> — दैनिक तिथि, नक्षत्र, योग, करण और सूर्योदय/सूर्यास्त, साथ में मासिक कैलेंडर।",
          "<strong>मुहूर्त</strong> — आज का शुभ समय, और यात्रा, परीक्षा, संपत्ति जैसे अवसरों के लिए खोज।",
          "<strong>23 मुफ़्त कैलकुलेटर</strong> — राशि, साढ़ेसाती, मंगल दोष, रत्न सुझाव और अन्य।",
          "<strong>राशिफल, Learn और ब्लॉग</strong> — दैनिक, साप्ताहिक और मासिक वाचन, और तथ्यात्मक व्याख्याएँ।",
          "<strong>परामर्श और पूजा बुकिंग</strong> — अनुरोध हम तक पहुँचते हैं; कुछ भी होने से पहले आप किसी व्यक्ति के साथ सत्र की पुष्टि करते हैं।",
        ],
        note: [
          "साइट हमारे परीक्षित सबसे धीमे फ़ोन पर भी चलती है और किसी टूल के लिए खाता बनाने को नहीं कहती। यह अंग्रेज़ी और हिन्दी — दोनों में चलती है।",
        ],
      },
      {
        id: "never-do",
        heading: "जो हम कभी नहीं करेंगे",
        bullets: [
          "<strong>डर बेचकर नहीं:</strong> हम आपको डरा कर उपाय नहीं बेचते। यदि कुंडली में दोष दिखे, हम बताते हैं कि परंपरा क्या कहती है, कितने भार के साथ, और उसके बारे में — यदि कुछ करना ही है — क्या किया जा सकता है।",
          "<strong>इलाज के दावे नहीं:</strong> कोई रत्न, पूजा या मंत्र दवा के रूप में नहीं बेचा जाता। कभी नहीं।",
          "<strong>गारंटीड नतीजे नहीं:</strong> भविष्यवाणियाँ राय हैं; यहाँ आपको कभी “100% गारंटीड” नहीं दिखेगा।",
          "<strong>बनावटी विश्वास नहीं:</strong> कोई गढ़े हुए रिव्यू, रेटिंग, उपयोगकर्ता-संख्या या पुरस्कार नहीं। या तो असली आँकड़े और असली प्रशंसापत्र — या एक ईमानदार खाली जगह।",
          '<strong>छिपे हुए शुल्क नहीं:</strong> टूल मुफ़्त हैं; जब सशुल्क सेवाएँ खुलेंगी, उनकी कीमतें और साइट की <a href="/hi/refund">रिफ़ंड नीति</a> आपसे कोई शुल्क लेने से पहले प्रकाशित होगी।',
        ],
      },
      {
        id: "privacy",
        heading: "आपका डेटा हम कैसे संभालते हैं",
        paragraphs: [
          'टूल आपके दिए विवरण संग्रहीत किए बिना चलते हैं — आप चार्ट बनाते हैं, परिणाम ले जाते हैं, और विवरण हमारे डेटाबेस में नहीं रखे जाते। बुकिंग अनुरोध में केवल वही चीज़ें ली जाती हैं जो आपका सत्र निर्धारित करने के लिए किसी व्यक्ति को चाहिए, और परामर्श के लिए जन्म विवरण केवल स्पष्ट सहमति चिह्न पर लिए जाते हैं। अनुरोध पर मिटाना वादा है, लंबी प्रक्रिया नहीं। पूरा विवरण हमारी <a href="/hi/privacy">गोपनीयता नीति</a> में है, जो भारत के DPDP अधिनियम, 2023 के अनुरूप लिखी गई है।',
        ],
      },
      {
        id: "today",
        heading: "आज व्योतिष कहाँ है",
        paragraphs: [
          "यह चरणबद्ध सार्वजनिक लॉन्च का पहला चरण है। गणना-इंजन, टूल परत और सामग्री खंड लाइव हैं; कुछ चीज़ें — जैसे रत्न खंड — तैयार होने तक ईमानदार “जल्द आ रहा है” लेबल दिखाती हैं, खोखला पेज नहीं। नमूना या उदाहरण-सामग्री सदैव ऐसा चिह्नित होती है, और बढ़ते ही समीक्षित, असली सामग्री से बदली जाती है।",
          "हम खुले रूप से सुधार, मापन और संशोधन करते रहते हैं: यदि कोई गणित मान गलत लगे, रिपोर्ट करें — वही टेस्ट-केस और सुधार बन जाएगा।",
        ],
      },
      {
        id: "contact",
        heading: "हमसे बात करें",
        paragraphs: [
          'हर सच्चा संदेश किसी व्यक्ति तक पहुँचता है: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>, या हमारे <a href="/hi/contact">संपर्क पृष्ठ</a> से। सुधार, प्रश्न, प्रतिक्रिया और शुभकामनाएँ — सब स्वागत योग्य हैं, विशेष रूप से सुधार।',
        ],
      },
    ],
  },
};
