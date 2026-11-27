/**
 * Home page vocabulary (S24) — hero, section headings, widget labels,
 * forms and honest empty states. DB-served block/FAQ/astrologer/pooja content
 * stays as served by the API (hi rows preferred when they exist — the page
 * merges build-time hi+en home payloads); everything authored in code is
 * translated here. Natural Hindi, consistent Jyotish terms.
 */
import type { Lang } from "../i18n";

export const HOME: Record<
  Lang,
  {
    title: string;
    description: string;
    jsonLdDesc: string;
    heroBadge: string;
    heroH1: string;
    heroSub: string;
    ctaKundli: string;
    ctaPanchang: string;
    ctaTalk: string;
    kundliCardTitle: string;
    kundliCardStyle: string;
    lblLagna: string;
    lblMoon: string;
    lblDasha: string;
    kundliCardCta: string;
    exploreKicker: string;
    exploreH2: string;
    exploreSub: string;
    soon: string;
    calcKicker: string;
    calcH2: string;
    calcSub: string;
    calcSearch: string;
    calcSearchAria: string;
    astroKicker: string;
    astroH2: string;
    astroSub: string;
    specAria: string;
    specAll: string;
    specs: string[];
    yrsExp: (y: string) => string;
    bookCta: string;
    astroNote: string;
    poojanKicker: string;
    poojanH2: string;
    poojanSub: string;
    poojanViewAll: string;
    duration: (d: string) => string;
    mode: string;
    dakshina: string;
    poojaBookCta: string;
    gemBody: string;
    gemPlaceholder: string;
    gemSuccess: string;
    gemNote: string;
    notifyBtn: string;
    blogKicker: string;
    blogH2: string;
    blogSub: string;
    blogBrowse: string;
    trustKicker: string;
    trustH2: string;
    trustSub: string;
    faqH2: string;
    newsH3: string;
    newsSub: string;
    newsPlaceholder: string;
    newsBtn: string;
    newsSuccess: string;
    newsFail: string;
    spamNote: string;
    emptiness: string;
    // HomePanchang widget
    glanceKicker: string;
    vedicDay: string;
    glanceH2: string;
    city: string;
    cityPlaceholder: string;
    day: string;
    today: string;
    tomorrow: string;
    limbs: Array<{ label: string; icon: string; key: string }>;
    sunriseSunset: string;
    rahuKaal: string;
    abhijit: string;
    hinduMonth: string;
    method: string;
    monthSystem: string;
    panchangMore: string;
    // JS-injected panchang strings (prefix/suffix — define:vars is JSON only)
    uptoPre: string;
    uptoSuf: string;
    followedPre: string;
    rulingPre: string;
    weekdays: string[];
    adhika: string;
    vikram: string;
    methodLahiri: string;
    monthPurnimanta: string;
    // HomeKundli widget
    hkKicker: string;
    hkNoSignup: string;
    hkH2: string;
    hkSub: string;
    hkName: string;
    hkNamePlaceholder: string;
    optional: string;
    hkGender: string;
    gender: { male: string; female: string; other: string };
    hkStyle: string;
    styles: { north: string; south: string; east: string };
    styleLabels: { north: string; south: string; east: string };
    hkDob: string;
    hkTob: string;
    hkPlace: string;
    hkPlaceNote: string;
    hkSubmit: string;
    hkPrivacy: string;
    hkResultTitle: string;
    hkLagna: string;
    hkMoon: string;
    hkDasha: string;
    hkIncludesH: string;
    hkIncludes: Array<{ strong: string; text: string }>;
    hkMatchTitle: string;
    hkMatchPoints: string;
    hkMatchSub: string;
    hkMatchCta: string;
    hkFullReport: string;
    hkErrPlace: string;
    hkErrCalc: string;
    // BookingModal
    bmTitle: string;
    bmSecure: string;
    bmClose: string;
    bmName: string;
    bmNamePlaceholder: string;
    bmPhone: string;
    bmEmail: string;
    bmTopic: string;
    topics: string[];
    bmDate: string;
    bmWindow: string;
    windows: string[];
    bmConsent: (href: string) => string;
    bmProtected: string;
    bmAutoCheck: string;
    bmSubmit: string;
    bmOk: string;
    bmFail: string;
    bmErrName: string;
    bmErrPhone: string;
  }
> = {
  en: {
    title: "Vyotish — Authentic Vedic Astrology, Panchang & Kundli",
    description:
      "Authentic Vedic Astrology, high-precision Panchang, Shubh Muhurat finder, and free Janam Kundli with Lahiri Ayanamsha.",
    jsonLdDesc:
      "Authentic Vedic astrology: panchang, kundli, muhurat and horoscopes computed from modern ephemeris science.",
    heroBadge: "Vedic Ephemeris Accuracy • Lahiri Ayanamsha • Free Forever",
    heroH1: "Authentic Vedic Wisdom, Calculated with Astronomical Precision.",
    heroSub:
      "Vyotish brings traditional Jyotish science to modern life. Calculate your free Janam Kundli without signup, inspect city-accurate Panchang and Shubh Muhurat, or consult verified Vedic scholars.",
    ctaKundli: "Free Kundli (No Signup)",
    ctaPanchang: "Today's Panchang",
    ctaTalk: "Talk to Astrologer",
    kundliCardTitle: "Janam Kundli — Lagna Chart",
    kundliCardStyle: "North Indian",
    lblLagna: "Lagna (Asc)",
    lblMoon: "Moon Sign",
    lblDasha: "Current Dasha",
    kundliCardCta: "Enter your birth details to generate your chart →",
    exploreKicker: "Core Architecture",
    exploreH2: "Explore All 9 Vyotish Portals",
    exploreSub:
      "Structured for deep Vedic study, auspicious family timing, spiritual ceremonies, and personalized astrological consultations.",
    soon: "Coming soon..!",
    calcKicker: "Free Tools",
    calcH2: "Astrology & Numerology Calculators",
    calcSub:
      "Tier 1 verified calculators with instant results, plain-language explanations, and zero login barrier.",
    calcSearch: "Search calculators…",
    calcSearchAria: "Search calculators",
    astroKicker: "Astrologer Directory",
    astroH2: "Consult Verified Jyotish Scholars",
    astroSub:
      "Choose an expert based on expertise, language, and lineage. Transparent consultation request process.",
    specAria: "Specialization",
    specAll: "All Specializations",
    specs: ["Vedic Kundli", "Marriage Muhurat", "Vastu Shastra", "Career & Business"],
    yrsExp: (y) => `${y} yrs exp`,
    bookCta: "Request Consultation",
    astroNote:
      "Book by request — send your details and our team confirms every consultation personally. Live chat and audio calling are coming soon.",
    poojanKicker: "Spiritual Services",
    poojanH2: "Sacred Vedic Pooja Catalogue",
    poojanSub:
      "Authentic Vedic rituals performed by qualified pandits with complete Samagri and customized Sankalp.",
    poojanViewAll: "View All Pooja Services →",
    duration: (d) => `Duration: ${d}`,
    mode: "Mode:",
    dakshina: "Dakshina",
    poojaBookCta: "Book Pooja",
    gemBody:
      "We are preparing our dedicated lab-certified gemstone platform. Each gemstone is verified with government-accredited lab certificates and energised by traditional Vedic rituals before dispatch.",
    gemPlaceholder: "Enter your email for launch access",
    gemSuccess: "Thank you! You will be notified when the Gemstones platform launches.",
    gemNote: "Our dedicated gemstones store is launching soon.",
    notifyBtn: "Notify Me",
    blogKicker: "Jyotish Insights",
    blogH2: "Articles & Vedic Studies",
    blogSub: "Original research and classical commentary from the Team Vyotish scholars.",
    blogBrowse: "Browse All Articles →",
    trustKicker: "Transparency & Ethics",
    trustH2: "Our Mathematical & Ethical Standards",
    trustSub:
      "Only true astronomical calculation statements. No invented testimonials, fabricated ratings, or fear-based guarantees.",
    faqH2: "Frequently Asked Questions",
    newsH3: "Subscribe to Weekly Vedic Calendar & Ekadashi Alerts",
    newsSub:
      "Receive upcoming Tithi changes, auspicious Shubh Muhurats, and major festival vrats directly to your inbox every Monday.",
    newsPlaceholder: "Enter your email",
    newsBtn: "Subscribe",
    newsSuccess: "Subscribed to weekly Panchang updates!",
    newsFail: "Could not subscribe right now — please try again.",
    spamNote: "Zero spam. Unsubscribe anytime in 1 click.",
    emptiness:
      "This section is temporarily empty — the backend content service could not be reached at build time.",
    glanceKicker: "Today at a Glance",
    vedicDay: "Vedic Day: Sunrise to Sunrise",
    glanceH2: "Daily Panchang & Auspicious Timings",
    city: "City",
    cityPlaceholder: "New Delhi (default) — type your city",
    day: "Day",
    today: "Today",
    tomorrow: "Tomorrow",
    limbs: [
      { label: "Tithi (तिथि)", icon: "wb_sunny", key: "tithi" },
      { label: "Vaar (दिन / वार)", icon: "today", key: "vaar" },
      { label: "Nakshatra (नक्षत्र)", icon: "stars", key: "nakshatra" },
      { label: "Yoga (योग)", icon: "self_improvement", key: "yoga" },
      { label: "Karana (करण)", icon: "hourglass_bottom", key: "karana" },
    ],
    sunriseSunset: "Sunrise & Sunset",
    rahuKaal: "Rahu Kaal (Inauspicious)",
    abhijit: "Abhijit Muhurat (Auspicious)",
    hinduMonth: "Hindu Month & Samvat",
    method: "Method:",
    monthSystem: "Month:",
    panchangMore: "View Complete Choghadiya, Hora & Monthly Calendar →",
    uptoPre: "Upto ",
    uptoSuf: "",
    followedPre: "Followed by ",
    rulingPre: "Ruling: ",
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    adhika: "(Adhik)",
    vikram: "Vikram",
    methodLahiri: "Lahiri Ayanamsha",
    monthPurnimanta: "Purnimanta & Amanta",
    hkKicker: "Free Vedic Tool",
    hkNoSignup: "No Signup Required",
    hkH2: "Generate Free Janam Kundli",
    hkSub:
      "Enter exact date, time and location of birth. Your chart is computed with the open-source astronomy-engine library, using Lahiri Ayanamsha.",
    hkName: "Full Name (पूरा नाम)",
    hkNamePlaceholder: "e.g. Ramesh Kumar",
    optional: "(optional)",
    hkGender: "Gender (लिंग)",
    gender: { male: "Male (पुरुष)", female: "Female (महिला)", other: "Other" },
    hkStyle: "Chart Style (शैली)",
    styles: {
      north: "North Indian (उत्तरी)",
      south: "South Indian (दक्षिणी)",
      east: "East Indian (पूर्वी)",
    },
    styleLabels: { north: "North Indian", south: "South Indian", east: "East Indian" },
    hkDob: "Date of Birth (जन्म तिथि)",
    hkTob: "Time of Birth (जन्म समय)",
    hkPlace: "Place of Birth (जन्म स्थान)",
    hkPlaceNote: "Auto-resolves latitude, longitude, and historical IANA time zone",
    hkSubmit: "Calculate Janam Kundli Now",
    hkPrivacy:
      "🔒 Your birth details are used strictly for calculation. We never sell data, send spam, or ask for OTPs.",
    hkResultTitle: "Your Kundli",
    hkLagna: "Lagna (Asc)",
    hkMoon: "Moon Sign",
    hkDasha: "Current Dasha",
    hkIncludesH: "What Your Free Kundli Includes:",
    hkIncludes: [
      {
        strong: "Lagna & Navamsha Charts:",
        text: " D-1 and D-9 divisional charts rendered as clean responsive SVG diagrams.",
      },
      {
        strong: "Planetary Degrees:",
        text: " Exact degrees, Nakshatra padas, retrograde status, and combustion for 9 grahas.",
      },
      {
        strong: "Vimshottari Dasha:",
        text: " Complete Mahadasha, Antardasha and Pratyantardasha timeline up to 120 years.",
      },
      {
        strong: "Major Dosha Analysis:",
        text: " Unbiased mathematical check for Manglik Dosha, Kaal Sarp, and Shani Sade Sati.",
      },
      {
        strong: "Ashtakoota Matching:",
        text: " 36-point Guna Milan tool for compatibility without mandatory registration.",
      },
    ],
    hkMatchTitle: "Kundli Matching (गुण मिलान)",
    hkMatchPoints: "36 Points",
    hkMatchSub:
      "Match boy and girl birth charts with authentic Ashtakoota methodology (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi).",
    hkMatchCta: "Open Kundli Matching Tool →",
    hkFullReport: "Open the full Kundli report →",
    hkErrPlace: "Please pick your birth place from the suggestions list.",
    hkErrCalc: "Could not calculate right now — please try again.",
    bmTitle: "Book Consultation Request",
    bmSecure: "Saved securely — used only to contact you about this request.",
    bmClose: "Close modal",
    bmName: "Full Name",
    bmNamePlaceholder: "Your full name",
    bmPhone: "WhatsApp / Phone Number",
    bmEmail: "Email Address",
    bmTopic: "Primary Consultation Topic",
    topics: [
      "Kundli & Life Path Overview",
      "Career, Business & Financial Timing",
      "Marriage Compatibility & Matchmaking",
      "Health, Dosha & Vedic Remedies",
      "Auspicious Muhurat Selection",
    ],
    bmDate: "Preferred Date",
    bmWindow: "Preferred Time Window",
    windows: [
      "Morning (10:00 AM - 01:00 PM)",
      "Afternoon (02:00 PM - 05:00 PM)",
      "Evening (06:00 PM - 09:00 PM)",
    ],
    bmConsent: (href) =>
      `I consent to processing these details strictly for scheduling my astrological consultation under the Vyotish <a href="${href}" target="_blank" rel="noopener" class="text-light-primary dark:text-dark-primary underline">Privacy Policy</a>.`,
    bmProtected: "Protected by Cloudflare Turnstile",
    bmAutoCheck: "Automatic bot check",
    bmSubmit: "Submit Consultation Request",
    bmOk: "Request received. Our team will confirm your booking by phone/WhatsApp shortly.",
    bmFail: "Could not submit right now — please try again.",
    bmErrName: "Please enter your name.",
    bmErrPhone: "Please enter your phone number.",
  },
  hi: {
    title: "व्योतिष — प्रामाणिक वैदिक ज्योतिष, पंचांग और कुंडली",
    description:
      "प्रामाणिक वैदिक ज्योतिष, सुस्पष्ट पंचांग, शुभ मुहूर्त खोजक और लहरी अयनांश आधारित मुफ्त जन्म कुंडली।",
    jsonLdDesc: "प्रामाणिक वैदिक ज्योतिष: आधुनिक खगोलीय गणना से निकला पंचांग, कुंडली, मुहूर्त और राशिफल।",
    heroBadge: "वैदिक ग्रह-गणना सूक्ष्मता • लहरी अयनांश • हमेशा मुफ्त",
    heroH1: "प्रामाणिक वैदिक ज्ञान, खगोलीय सूक्ष्मता के साथ गणित।",
    heroSub:
      "व्योतिष पारंपरिक ज्योतिष-विज्ञान को आधुनिक जीवन तक लाता है। बिना रजिस्ट्रेशन मुफ्त जन्म कुंडली बनाएँ, अपने शहर का सटीक पंचांग और शुभ मुहूर्त देखें, या प्रमाणित वैदिक विद्वानों से परामर्श लें।",
    ctaKundli: "मुफ्त कुंडली (बिना रजिस्ट्रेशन)",
    ctaPanchang: "आज का पंचांग",
    ctaTalk: "ज्योतिषी से बात करें",
    kundliCardTitle: "जन्म कुंडली — लग्न कुंडली",
    kundliCardStyle: "उत्तर भारतीय",
    lblLagna: "लग्न",
    lblMoon: "चंद्र राशि",
    lblDasha: "वर्तमान दशा",
    kundliCardCta: "अपना जन्म विवरण भरें और कुंडली बनाएँ →",
    exploreKicker: "मुख्य विभाग",
    exploreH2: "व्योतिष के सभी 9 पोर्टल देखें",
    exploreSub:
      "गहन वैदिक अध्ययन, शुभ गृह-मुहूर्त, आध्यात्मिक अनुष्ठान और व्यक्तिगत ज्योतिष परामर्श — सब एक ही स्थान पर।",
    soon: "शीघ्र आ रहा है..!",
    calcKicker: "मुफ्त यंत्र",
    calcH2: "ज्योतिष और अंकज्योतिष गणना यंत्र",
    calcSub: "तुरंत परिणाम देने वाले, सरल भाषा में व्याख्या करने वाले प्रमाणित यंत्र — कोई लॉगिन नहीं।",
    calcSearch: "यंत्र खोजें…",
    calcSearchAria: "गणना यंत्र खोजें",
    astroKicker: "ज्योतिषी निर्देशिका",
    astroH2: "प्रमाणित ज्योतिष विद्वानों से परामर्श करें",
    astroSub:
      "विशेषज्ञता, भाषा और परंपरा के आधार पर अपने ज्योतिषी चुनें। परामर्श अनुरोध की पूरी प्रक्रिया पारदर्शी है।",
    specAria: "विशेषज्ञता",
    specAll: "सभी विशेषज्ञताएँ",
    specs: ["वैदिक कुंडली", "विवाह मुहूर्त", "वास्तु शास्त्र", "करियर और व्यापार"],
    yrsExp: (y) => `${y} वर्ष अनुभव`,
    bookCta: "परामर्श का अनुरोध करें",
    astroNote:
      "अनुरोध से बुकिंग — अपना विवरण भेजें और हमारी टीम हर परामर्श की व्यक्तिगत पुष्टि करती है। लाइव चैट और ऑडियो कॉल शीघ्र आ रहे हैं।",
    poojanKicker: "आध्यात्मिक सेवाएँ",
    poojanH2: "पवित्र वैदिक पूजा सूची",
    poojanSub:
      "योग्य पंडितों द्वारा की जाने वाली प्रामाणिक वैदिक अनुष्ठान सेवाएँ — संपूर्ण सामग्री और आपके नाम-गोत्र का संकल्प सहित।",
    poojanViewAll: "सभी पूजा सेवाएँ देखें →",
    duration: (d) => `अवधि: ${d}`,
    mode: "विधि:",
    dakshina: "दक्षिणा",
    poojaBookCta: "पूजा बुक करें",
    gemBody:
      "हम लैब-प्रमाणित रत्नों का समर्पित मंच तैयार कर रहे हैं। हर रत्न सरकारी मान्यता प्राप्त प्रयोगशाला प्रमाणपत्र से सत्यापित और प्रेषण से पहले पारंपरिक वैदिक अनुष्ठान से प्राण-प्रतिष्ठित होता है।",
    gemPlaceholder: "लॉन्च सूचना के लिए अपना ईमेल दर्ज करें",
    gemSuccess: "धन्यवाद! रत्न मंच लॉन्च होते ही आपको सूचित किया जाएगा।",
    gemNote: "हमारा समर्पित रत्न भंडार शीघ्र लॉन्च हो रहा है।",
    notifyBtn: "सूचना चाहिए",
    blogKicker: "ज्योतिष दृष्टि",
    blogH2: "लेख और वैदिक अध्ययन",
    blogSub: "टीम व्योतिष विद्वानों के मौलिक शोध और शास्त्रीय व्याख्या।",
    blogBrowse: "सभी लेख देखें →",
    trustKicker: "पारदर्शिता और नैतिकता",
    trustH2: "हमारे गणितीय और नैतिक मानक",
    trustSub:
      "केवल सत्य खगोलीय गणना-विवरण। न कोई बनावटी प्रशंसापत्र, न कृत्रिम रेटिंग, न भय दिखाकर कुछ बताने वाले दावे।",
    faqH2: "अक्सर पूछे जाने वाले प्रश्न",
    newsH3: "साप्ताहिक वैदिक कैलेंडर और एकादशी सूचनाएँ पाएँ",
    newsSub:
      "आने वाली तिथि परिवर्तन, शुभ मुहूर्त और प्रमुख पर्व-व्रत की सूचनाएँ हर सोमवार सीधे अपने इनबॉक्स में पाएँ।",
    newsPlaceholder: "अपना ईमेल दर्ज करें",
    newsBtn: "सब्सक्राइब करें",
    newsSuccess: "साप्ताहिक पंचांग अपडेट की सदस्यता ली गई!",
    newsFail: "अभी सदस्यता नहीं ली जा सकी — कृपया थोड़ी देर बाद दोबारा कोशिश करें।",
    spamNote: "कोई स्पैम नहीं। कभी भी 1 क्लिक में सदस्यता रद्द करें।",
    emptiness: "यह खंड अस्थायी रूप से खाली है — बिल्ड के समय बैकएंड सामग्री सेवा तक पहुँच नहीं बन पाई।",
    glanceKicker: "आज एक दृष्टि में",
    vedicDay: "वैदिक दिन: सूर्योदय से सूर्योदय",
    glanceH2: "दैनिक पंचांग और शुभ समय",
    city: "शहर",
    cityPlaceholder: "नई दिल्ली (डिफ़ॉल्ट) — अपना शहर लिखें",
    day: "दिन",
    today: "आज",
    tomorrow: "कल",
    limbs: [
      { label: "तिथि", icon: "wb_sunny", key: "tithi" },
      { label: "वार", icon: "today", key: "vaar" },
      { label: "नक्षत्र", icon: "stars", key: "nakshatra" },
      { label: "योग", icon: "self_improvement", key: "yoga" },
      { label: "करण", icon: "hourglass_bottom", key: "karana" },
    ],
    sunriseSunset: "सूर्योदय और सूर्यास्त",
    rahuKaal: "राहु काल (अशुभ)",
    abhijit: "अभिजीत मुहूर्त (शुभ)",
    hinduMonth: "हिन्दू माह और संवत्",
    method: "विधि:",
    monthSystem: "मास:",
    panchangMore: "पूर्ण चौघड़िया, होरा और मासिक कैलेंडर देखें →",
    uptoPre: "",
    uptoSuf: " तक",
    followedPre: "इसके बाद ",
    rulingPre: "स्वामी: ",
    weekdays: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
    adhika: "(अधिक)",
    vikram: "विक्रम",
    methodLahiri: "लहरी अयनांश",
    monthPurnimanta: "पूर्णिमांत और अमांत",
    hkKicker: "मुफ्त वैदिक यंत्र",
    hkNoSignup: "रजिस्ट्रेशन आवश्यक नहीं",
    hkH2: "मुफ्त जन्म कुंडली बनाएँ",
    hkSub:
      "जन्म की सटीक तिथि, समय और स्थान भरें। आपकी कुंडली ओपन-सोर्स astronomy-engine लाइब्रेरी से लहरी अयनांश पर गणित होती है।",
    hkName: "पूरा नाम",
    hkNamePlaceholder: "जैसे रमेश कुमार",
    optional: "(वैकल्पिक)",
    hkGender: "लिंग",
    gender: { male: "पुरुष", female: "महिला", other: "अन्य" },
    hkStyle: "कुंडली शैली",
    styles: { north: "उत्तर भारतीय", south: "दक्षिण भारतीय", east: "पूर्व भारतीय" },
    styleLabels: { north: "उत्तर भारतीय", south: "दक्षिण भारतीय", east: "पूर्व भारतीय" },
    hkDob: "जन्म तिथि",
    hkTob: "जन्म समय",
    hkPlace: "जन्म स्थान",
    hkPlaceNote: "अक्षांश, देशांतर और उस समय का IANA समय क्षेत्र स्वतः जुड़ता है",
    hkSubmit: "अभी जन्म कुंडली बनाएँ",
    hkPrivacy:
      "🔒 आपके जन्म विवरण केवल गणना के लिए उपयोग होते हैं। हम डेटा नहीं बेचते, स्पैम नहीं भेजते और OTP नहीं मांगते।",
    hkResultTitle: "आपकी कुंडली",
    hkLagna: "लग्न (Asc)",
    hkMoon: "चन्द्र राशि",
    hkDasha: "वर्तमान दशा",
    hkIncludesH: "आपकी मुफ्त कुंडली में क्या-क्या मिलेगा:",
    hkIncludes: [
      { strong: "लग्न और नवमांश कुंडली:", text: " D-1 और D-9 वर्ग कुंडलियाँ — स्वच्छ, रिस्पॉन्सिव SVG आरेख।" },
      { strong: "ग्रहों के अंश:", text: " 9 ग्रहों के सटीक अंश, नक्षत्र-पाद, वक्री स्थिति और अस्त स्थिति।" },
      { strong: "विंशोत्तरी दशा:", text: " 120 वर्ष तक की पूर्ण महादशा, अंतर्दशा और प्रत्यंतर्दशा अवधि।" },
      {
        strong: "प्रमुख दोष विश्लेषण:",
        text: " मांगलिक दोष, काल सर्प और शनि साढ़े साती की निष्पक्ष गणितीय जाँच।",
      },
      { strong: "अष्टकूटा मिलान:", text: " बिना रजिस्ट्रेशन 36 गुण मिलान यंत्र।" },
    ],
    hkMatchTitle: "कुंडली मिलान",
    hkMatchPoints: "36 गुण",
    hkMatchSub:
      "वर-वधू की कुंडलियों का प्रामाणिक अष्टकूटा मिलान (वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी)।",
    hkMatchCta: "कुंडली मिलान यंत्र खोलें →",
    hkFullReport: "पूर्ण कुंडली रिपोर्ट खोलें →",
    hkErrPlace: "कृपया सुझाव सूची से अपना जन्म स्थान चुनें।",
    hkErrCalc: "अभी गणना नहीं हो सकी — कृपया पुनः प्रयास करें।",
    bmTitle: "परामर्श अनुरोध बुक करें",
    bmClose: "मॉडल बंद करें",
    bmSecure: "सुरक्षित रूप से सुरक्षित — केवल इस अनुरोध के लिए संपर्क करने में उपयोग होगा।",
    bmName: "पूरा नाम",
    bmNamePlaceholder: "आपका पूरा नाम",
    bmPhone: "व्हाट्सएप / फ़ोन नंबर",
    bmEmail: "ईमेल पता",
    bmTopic: "परामर्श का मुख्य विषय",
    topics: [
      "कुंडली और जीवन-पथ का अवलोकन",
      "करियर, व्यापार और वित्तीय समय",
      "विवाह अनुकूलता और मिलान",
      "स्वास्थ्य, दोष और वैदिक उपाय",
      "शुभ मुहूर्त चयन",
    ],
    bmDate: "अभीष्ट तिथि",
    bmWindow: "अभीष्ट समय-अवधि",
    windows: [
      "प्रातः (10:00 पूर्वाह्न - 01:00 अपराह्न)",
      "दोपहर (02:00 अपराह्न - 05:00 अपराह्न)",
      "सायंकाल (06:00 अपराह्न - 09:00 रात्रि)",
    ],
    bmConsent: (href) =>
      `मैं सहमति देता/देती हूँ कि ये विवरण केवल मेरे ज्योतिषीय परामर्श की समय-सारिणी के लिए, व्योतिष <a href="${href}" target="_blank" rel="noopener" class="text-light-primary dark:text-dark-primary underline">गोपनीयता नीति</a> के अंतर्गत संसाधित हों।`,
    bmProtected: "Cloudflare Turnstile से सुरक्षित",
    bmAutoCheck: "स्वचालित बॉट जाँच",
    bmSubmit: "परामर्श अनुरोध भेजें",
    bmOk: "अनुरोध मिल गया। हमारी टीम शीघ्र ही फ़ोन/व्हाट्सएप द्वारा आपकी बुकिंग की पुष्टि करेगी।",
    bmFail: "अभी भेजा नहीं जा सका — कृपया पुनः प्रयास करें।",
    bmErrName: "कृपया अपना नाम दर्ज करें।",
    bmErrPhone: "कृपया अपना फ़ोन नंबर दर्ज करें।",
  },
};
