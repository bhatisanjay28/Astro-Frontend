/**
 * S24 — /compatibility/ hub strings, both languages. The sign grid flips
 * primary/gloss names per language (both come from zodiac-signs.ts); pair
 * pages are dynamic twins (P3) so picker/card links go through withLang.
 */
import type { Lang } from "../i18n";

export const COMPATIBILITY: Record<
  Lang,
  {
    title: string;
    description: string;
    crumbsRoot: string;
    crumbsCurrent: string;
    kicker: string;
    h1: string;
    lede: string;
    pickerAria: string;
    yourSign: string;
    chooseYour: string;
    partnerSign: string;
    chooseTheir: string;
    swapAria: string;
    check: string;
    hint: string;
    howAria: string;
    howH: string;
    steps: { h3: string; p: string }[];
    gridAria: string;
    gridPre: string;
    gridSuf: string;
    gridNote: string;
    stripAria: string;
    strip: string;
    vedicAria: string;
    vedicH: string;
    vedicP: string;
    vedicBtn: string;
  }
> = {
  en: {
    title: "Zodiac Sign Compatibility — Check Your Sun Sign Match | Vyotish",
    description:
      "Pick two zodiac signs and see how compatible they are: love, sexual, friendship, communication, trust and emotional scores with an overall rating and original relationship tips for all 144 pairings.",
    crumbsRoot: "Astrology",
    crumbsCurrent: "Zodiac Sign Compatibility",
    kicker: "Astrology · Sun signs",
    h1: "Zodiac Sign Compatibility",
    lede: "Choose your sign and your partner's sign to see an honest sun-sign reading: six compatibility scores, what each means for the two of you, and practical tips for the friction points. Same sign for both works too.",
    pickerAria: "Check compatibility",
    yourSign: "Your sign",
    chooseYour: "Choose your sign",
    partnerSign: "Partner's sign",
    chooseTheir: "Choose their sign",
    swapAria: "Swap the two signs",
    check: "Check Compatibility",
    hint: "Choosing the same sign twice is allowed.",
    howAria: "How this works",
    howH: "How the reading works",
    steps: [
      {
        h3: "Pick both signs",
        p: "Either order works — every pairing is symmetrical, so Aries & Cancer reads the same as Cancer & Aries.",
      },
      {
        h3: "We compare the charts",
        p: "The engine looks at the angle between the two signs, their elements, modes and ruling planets — the classical Western sun-sign method.",
      },
      {
        h3: "You get scores and tips",
        p: "Six categories scored on an honest 35–95 scale, a short explanation for each, and tips written for this exact pairing.",
      },
    ],
    gridAria: "All pairings by sign",
    gridPre: "Browse all ",
    gridSuf: " pairings",
    gridNote:
      "Each card opens the sign with itself — similarities and friction points of two identical natures. Every other pairing is reachable from any sign page.",
    stripAria: "Method and disclaimer",
    strip:
      "Sun-sign compatibility is an interpretive method, not a scientific measure — scores are a structured way to think about a pairing, not a verdict on any real relationship. All readings are for guidance and entertainment.",
    vedicAria: "Vedic alternative",
    vedicH: "Want the Vedic view?",
    vedicP:
      "Kundli Matching scores a real birth-chart pair across 36 gunas, rather than sun signs.",
    vedicBtn: "Open Kundli Matching",
  },
  hi: {
    title: "राशियों की अनुकूलता — अपनी सूर्य राशि का मिलान देखें | Vyotish",
    description:
      "दो राशियाँ चुनें और देखें कि वे कितनी अनुकूल हैं: प्रेम, मैत्री, संवाद, विश्वास और भावनात्मक स्कोर, समग्र रेटिंग और मौलिक संबंध सुझाव — सभी 144 जोड़ियों के लिए।",
    crumbsRoot: "ज्योतिष",
    crumbsCurrent: "राशियों की अनुकूलता",
    kicker: "ज्योतिष · सूर्य राशियाँ",
    h1: "राशियों की अनुकूलता",
    lede: "अपनी राशि और साथी की राशि चुनें और एक ईमानदार सूर्य-राशि वाचन देखें: छह अनुकूलता स्कोर, वे आप दोनों के लिए क्या अर्थ रखते हैं, और टकराव के बिंदुओं पर व्यावहारिक सुझाव। दोनों में एक ही राशि चुनना भी संभव है।",
    pickerAria: "अनुकूलता जाँचें",
    yourSign: "आपकी राशि",
    chooseYour: "अपनी राशि चुनें",
    partnerSign: "साथी की राशि",
    chooseTheir: "साथी की राशि चुनें",
    swapAria: "दोनों राशियाँ आपस में बदलें",
    check: "अनुकूलता देखें",
    hint: "दोनों में एक ही राशि चुनना भी संभव है।",
    howAria: "यह कैसे काम करता है",
    howH: "वाचन कैसे बनता है",
    steps: [
      {
        h3: "दोनों राशियाँ चुनें",
        p: "कोई भी क्रम चलेगा — हर जोड़ी सममित है, इसलिए मेष और कर्क वैसा ही पढ़ा जाता है जैसा कर्क और मेष।",
      },
      {
        h3: "हम कुंडलियों की तुलना करते हैं",
        p: "इंजन दोनों राशियों के बीच के कोण, उनके तत्व, गुण और स्वामी ग्रह देखता है — पाश्चात्य सूर्य-राशि की शास्त्रीय पद्धति।",
      },
      {
        h3: "आपको स्कोर और सुझाव मिलते हैं",
        p: "छह विभागों के स्कोर ईमानदार 35–95 पैमाने पर, हर एक के लिए संक्षिप्त व्याख्या, और इसी जोड़ी के लिए लिखे गए सुझाव।",
      },
    ],
    gridAria: "राशि-वार सभी जोड़ियाँ",
    gridPre: "सभी ",
    gridSuf: " जोड़ियाँ देखें",
    gridNote:
      "हर कार्ड उसी राशि को उसी के साथ खोलता है — दो एक-समान स्वभावों की समानताएँ और टकराव के बिंदु। बाकी हर जोड़ी किसी भी राशि पृष्ठ से पहुँची जा सकती है।",
    stripAria: "पद्धति और अस्वीकरण",
    strip:
      "सूर्य-राशि अनुकूलता एक व्याख्यात्मक पद्धति है, वैज्ञानिक माप नहीं — स्कोर किसी जोड़ी के बारे में सोचने का संरचित तरीका हैं, किसी असली संबंध पर निर्णय नहीं। सभी वाचन मार्गदर्शन और मनोरंजन के लिए हैं।",
    vedicAria: "वैदिक विकल्प",
    vedicH: "वैदिक दृष्टि चाहिए?",
    vedicP: "कुंडली मिलान सूर्य राशि की जगह असली जन्म-कुंडली जोड़ी को 36 गुणों पर आँकता है।",
    vedicBtn: "कुंडली मिलान खोलें",
  },
};

/**
 * S24 — /compatibility/[sign1]/[sign2] pair-page chrome. The reading itself
 * comes from the backend API (EN payload for now); these strings localize the
 * page around it, including the picker and the script-rendered states.
 */
export const ZC_PAIR: Record<
  Lang,
  {
    title: (a: string, b: string) => string;
    description: (a: string, b: string) => string;
    crumbsRoot: string;
    crumbsHub: string;
    pairLabel: (a: string, b: string) => string;
    h1: (a: string, b: string) => string;
    ledeSame: (a: string) => string;
    ledeDiff: (a: string, b: string) => string;
    loading: string;
    pickerAria: string;
    pickerH: string;
    yourSign: string;
    partnerSign: string;
    swapAria: string;
    check: string;
    hint: string;
    moreAria: string;
    matchingLink: string;
    horoLink: (sign: string) => string;
    errUnavailable: string;
    errGeneric: string;
    errNetwork: string;
    retry: string;
  }
> = {
  en: {
    title: (a, b) => `${a} & ${b} Compatibility — Sun Sign Match Score & Tips | Vyotish`,
    description: (a, b) =>
      `Read the ${a}–${b} sun-sign match: love, sexual, friendship, communication, trust and emotional compatibility with an overall score and original relationship tips.`,
    crumbsRoot: "Astrology",
    crumbsHub: "Zodiac Compatibility",
    pairLabel: (a, b) => `${a} & ${b}`,
    h1: (a, b) => `${a} & ${b} Compatibility`,
    ledeSame: (a) =>
      `Two ${a} partners — how the same sign pairs with itself, and where the similarities help or pinch.`,
    ledeDiff: (a, b) =>
      `How ${a} and ${b} get along, scored honestly across six aspects of a relationship — with original tips for the friction points.`,
    loading: "Reading the charts…",
    pickerAria: "Check another pair",
    pickerH: "Check another pairing",
    yourSign: "Your sign",
    partnerSign: "Partner's sign",
    swapAria: "Swap the two signs",
    check: "Check Compatibility",
    hint: "Choosing the same sign twice is allowed.",
    moreAria: "Related readings",
    matchingLink: "Vedic Kundli Matching →",
    horoLink: (s) => `${s} horoscope →`,
    errUnavailable:
      "This pairing's reading isn't published yet — it should appear shortly. Meanwhile, every pairing is available from the Zodiac Compatibility hub.",
    errGeneric: "Couldn't load this reading right now. Please try again in a moment.",
    errNetwork: "Couldn't reach the astrology engine. Check your connection and try again.",
    retry: "Try again",
  },
  hi: {
    title: (a, b) => `${a} और ${b} अनुकूलता — सूर्य राशि मिलान स्कोर और सुझाव | Vyotish`,
    description: (a, b) =>
      `${a}–${b} सूर्य-राशि मिलान पढ़ें: प्रेम, यौन, मैत्री, संवाद, विश्वास और भावनात्मक अनुकूलता, समग्र स्कोर और मौलिक संबंध सुझाव।`,
    crumbsRoot: "ज्योतिष",
    crumbsHub: "राशियों की अनुकूलता",
    pairLabel: (a, b) => `${a} और ${b}`,
    h1: (a, b) => `${a} और ${b} अनुकूलता`,
    ledeSame: (a) =>
      `दो ${a} साथी — एक ही राशि अपने आप से कैसे जुड़ती है, और समानताएँ कहाँ मदद करती हैं या चुभती हैं।`,
    ledeDiff: (a, b) =>
      `${a} और ${b} कैसे मिलते हैं — संबंध के छह पहलुओं पर ईमानदार स्कोर, और टकराव के बिंदुओं पर मौलिक सुझाव।`,
    loading: "कुंडलियाँ पढ़ी जा रही हैं…",
    pickerAria: "दूसरी जोड़ी जाँचें",
    pickerH: "दूसरी जोड़ी जाँचें",
    yourSign: "आपकी राशि",
    partnerSign: "साथी की राशि",
    swapAria: "दोनों राशियाँ आपस में बदलें",
    check: "अनुकूलता देखें",
    hint: "दोनों में एक ही राशि चुनना भी संभव है।",
    moreAria: "संबंधित वाचन",
    matchingLink: "वैदिक कुंडली मिलान →",
    horoLink: (s) => `${s} राशिफल →`,
    errUnavailable:
      "इस जोड़ी का वाचन अभी प्रकाशित नहीं हुआ — शीघ्र ही आ जाएगा। तब तक हर जोड़ी राशियों की अनुकूलता हब से उपलब्ध है।",
    errGeneric: "यह वाचन अभी लोड नहीं हो सका। कृपया थोड़ी देर बाद फिर कोशिश करें।",
    errNetwork: "ज्योतिष इंजन तक पहुँच नहीं। अपना कनेक्शन जाँचकर फिर कोशिश करें।",
    retry: "फिर कोशिश करें",
  },
};
