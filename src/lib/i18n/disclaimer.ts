/**
 * S24 — Astrological Disclaimer content, both languages (Epic 7.3 final
 * draft). Translation only; internal links inside Hindi prose point at the
 * /hi twins.
 */
import type { Lang } from "../i18n";
import type { LegalDoc } from "./legal";

export const DISCLAIMER: Record<Lang, LegalDoc> = {
  en: {
    title: "Astrological Disclaimer | Vyotish",
    heading: "Astrological Disclaimer",
    intro:
      "What Vyotish astrology content is — and what it is not. Written plainly, because trust starts with honesty.",
    updated: "21 November 2026",
    sections: [
      {
        id: "purpose",
        heading: "What this disclaimer covers",
        paragraphs: [
          'This disclaimer applies to everything on Vyotish: kundli charts, matching scores, panchang data, muhurat suggestions, calculators, daily horoscopes, Learn and blog content, and consultations. It sits alongside our <a href="/terms">Terms of Use</a>.',
        ],
      },
      {
        id: "faith-based",
        heading: "Astrology is a faith-based advisory tradition",
        paragraphs: [
          "Vedic astrology is a traditional shastra — a faith-based advisory practice, not an exact science. What astrology can do with real precision is astronomy: the positions of planets in the sky at a given moment can be computed exactly, and we do that rigorously. What no one can guarantee is the <em>interpretation</em> — what those positions mean for a particular life. Interpretations on Vyotish are informed opinions rooted in classical tradition, and different astrologers may read the same chart differently.",
        ],
      },
      {
        id: "not-professional-advice",
        heading: "Not a substitute for professional advice",
        paragraphs: [
          "Nothing you receive from Vyotish — a chart, a horoscope, a consultation, a remedy suggestion — is a substitute for advice, diagnosis or treatment from a licensed professional such as a doctor, psychiatrist, lawyer, chartered accountant or financial adviser.",
          "If you have a medical condition, take astrology’s view alongside your doctor’s — never instead of it. Never delay or discontinue professional medical, legal or financial care based on anything you read here.",
        ],
      },
      {
        id: "no-guarantees",
        heading: "No guaranteed outcomes",
        paragraphs: [
          "We do not promise that any prediction, timing, remedy or consultation will produce a particular result — marriage, a job, wealth, recovery or anything else. Life outcomes depend on far more than a chart, and results vary from person to person. You will never find “100% guaranteed” claims on Vyotish; where you see that language anywhere, it is not us, and we would like to know about it.",
        ],
      },
      {
        id: "decisions",
        heading: "Your decisions are yours",
        paragraphs: [
          "How you interpret and act on anything Vyotish shows or tells you is entirely your decision and your responsibility. Content on the Site is general in nature and is not tailored advice for your specific situation unless it comes to you through a booked consultation.",
        ],
      },
      {
        id: "calculation-accuracy",
        heading: "Calculation accuracy",
        paragraphs: [
          "The astronomical layer of Vyotish uses published, open astronomical methods: planetary positions computed with the open-source <strong>astronomy-engine</strong> library, the sidereal zodiac with the <strong>Lahiri ayanamsha</strong> (the standard used in India’s official panchang calculations), and local time handled through the <strong>IANA Time Zone database</strong>. Our engine runs behind a growing automated test suite, and city data comes from the GeoNames database.",
          'Even with rigorous computation, rounding conventions and edge cases exist. If a computed value looks wrong — a tithi boundary, a nakshatra span, an ayanamsha offset — tell us at <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> and we will investigate and correct it. Report the page, the inputs and what you expected; every correction makes the tool better for everyone.',
        ],
      },
      {
        id: "birth-details",
        heading: "Birth details are your responsibility",
        paragraphs: [
          "A chart is only as accurate as the birth date, time and place entered. If you do not know your exact birth time, say so when booking a consultation — our astrologers work with rectification and prashna approaches rather than pretending to precision. We are not responsible for results computed from incorrect inputs.",
        ],
      },
      {
        id: "remedies",
        heading: "Remedies: gemstones, mantras and rituals",
        paragraphs: [
          "Recommendations such as gemstones, mantras, rudraksha or specific poojas are faith-based suggestions offered in good faith, drawing on classical practice. They are always voluntary — you decide whether to adopt them. We present remedies as traditional practices, never as cures: <strong>Vyotish does not claim that any gemstone, ritual or remedy treats, cures or prevents any disease or medical condition.</strong>",
        ],
      },
      {
        id: "horoscopes",
        heading: "Horoscopes, blog and Learn content",
        paragraphs: [
          "Daily, weekly and monthly horoscopes, and all editorial content, are written for general audiences — sun/moon sign or transit based — and cannot account for your full birth chart. They are editorial content, not personalised advice. When our content cites classical sources or traditions, we name them; when something is our interpretation, it is ours.",
        ],
      },
      {
        id: "astrologers",
        heading: "Consulting astrologers",
        paragraphs: [
          "Each astrologer or pujari you consult through Vyotish is an independent professional, solely responsible for the accuracy, appropriateness and consequences of the advice they personally give. Their interpretations may differ from one another and from general Site content — that is inherent to a tradition of interpretation, and it is honest to say so.",
        ],
      },
      {
        id: "third-party",
        heading: "Third-party content and links",
        paragraphs: [
          "External links are provided for reference. We do not control third-party sites, do not endorse their content, and are not responsible for their accuracy or practices.",
        ],
      },
      {
        id: "no-fabrication",
        heading: "Our no-fabrication policy",
        paragraphs: [
          "We do not invent reviews, ratings, user counts, awards or credentials — not for the Site and not for its astrologers. Where testimonials exist, they are real; until then, review areas stay empty rather than filled with sample praise. Content that is illustrative or sample is clearly marked as such. If anything on Vyotish ever looks like a fabricated claim, please report it — honesty is not just policy here, it is the product.",
        ],
      },
      {
        id: "contact",
        heading: "Questions and corrections",
        paragraphs: [
          'Found an error, or want to question a claim? Email <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> or use our <a href="/contact">contact page</a>. We publish corrections — silence is not our style.',
        ],
      },
    ],
  },
  hi: {
    title: "ज्योतिषीय अस्वीकरण | Vyotish",
    heading: "ज्योतिषीय अस्वीकरण",
    intro:
      "व्योतिष की ज्योतिषीय सामग्री क्या है — और क्या नहीं। साफ़ भाषा में लिखा गया, क्योंकि भरोसा ईमानदारी से शुरू होता है।",
    updated: "21 नवंबर 2026",
    sections: [
      {
        id: "purpose",
        heading: "इस अस्वीकरण का विस्तार",
        paragraphs: [
          'यह अस्वीकरण व्योतिष की हर चीज़ पर लागू होता है: कुंडली चार्ट, मिलान स्कोर, पंचांग डेटा, मुहूर्त सुझाव, कैलकुलेटर, दैनिक राशिफल, Learn और ब्लॉग सामग्री, और परामर्श। यह हमारे <a href="/hi/terms">उपयोग की शर्तों</a> के साथ खड़ा है।',
        ],
      },
      {
        id: "faith-based",
        heading: "ज्योतिष एक श्रद्धा-आधारित परामर्श परंपरा है",
        paragraphs: [
          "वैदिक ज्योतिष एक परंपरागत शास्त्र है — श्रद्धा-आधारित परामर्श पद्धति, एकदम सटीक विज्ञान नहीं। ज्योतिष जिसमें वास्तविक सटीकता से काम कर सकता है वह है खगोल: किसी दिए क्षण में आकाश में ग्रहों की स्थितियाँ ठीक-ठीक गणित की जा सकती हैं, और हम वह कठोरता से करते हैं। जिसकी गारंटी कोई नहीं दे सकता वह है <em>व्याख्या</em> — वे स्थितियाँ किसी विशिष्ट जीवन के लिए क्या अर्थ रखती हैं। व्योतिष की व्याख्याएँ शास्त्रीय परंपरा में निहित सूचित मत हैं, और भिन्न ज्योतिषी एक ही कुंडली को भिन्न पढ़ सकते हैं।",
        ],
      },
      {
        id: "not-professional-advice",
        heading: "पेशेवर सलाह का विकल्प नहीं",
        paragraphs: [
          "व्योतिष से आपको मिलने वाली कोई चीज़ — कुंडली, राशिफल, परामर्श, उपाय-सुझाव — चिकित्सक, मनोचिकित्सक, अधिवक्ता, चार्टर्ड अकाउंटेंट या वित्तीय सलाहकार जैसे लाइसेंस-प्राप्त पेशेवर से सलाह, निदान या उपचार का विकल्प नहीं है।",
          "कोई चिकित्सकीय स्थिति हो तो ज्योतिष का दृष्टिकोण अपने चिकित्सक के दृष्टिकोण के साथ रखें — उसके बदले कभी नहीं। यहाँ पढ़ी किसी भी बात के आधार पर पेशेवर चिकित्सकीय, विधिक या वित्तीय देखभाल को कभी टालें या रोकें नहीं।",
        ],
      },
      {
        id: "no-guarantees",
        heading: "कोई गारंटित परिणाम नहीं",
        paragraphs: [
          "हम किसी भविष्यवाणी, समय, उपाय या परामर्श से किसी विशिष्ट परिणाम — विवाह, नौकरी, धन, स्वास्थ्य-लाभ या कुछ और — का वादा नहीं करते। जीवन के परिणाम कुंडली से कहीं अधिक बातों पर निर्भर करते हैं, और परिणाम व्यक्ति-दर-व्यक्ति भिन्न होते हैं। व्योतिष पर आपको कभी “100% गारंटित” दावे नहीं मिलेंगे; यह भाषा कहीं और दिखे तो वह हम नहीं हैं, और हम उसकी सूचना जानना चाहेंगे।",
        ],
      },
      {
        id: "decisions",
        heading: "आपके निर्णय आपके हैं",
        paragraphs: [
          "व्योतिष जो कुछ भी दिखाता या बताता है, उसे आप कैसे समझें और उस पर क्या करें — वह पूरी तरह आपका निर्णय और आपकी ज़िम्मेदारी है। साइट की सामग्री सामान्य प्रकृति की है और आपकी विशिष्ट स्थिति के लिए अनुरूप सलाह नहीं, जब तक कि वह बुक किए गए परामर्श के ज़रिए न आए।",
        ],
      },
      {
        id: "calculation-accuracy",
        heading: "गणना की शुद्धता",
        paragraphs: [
          "व्योतिष की खगोलीय परत प्रकाशित, खुले खगोलीय तरीकों पर चलती है: ओपन-सोर्स <strong>astronomy-engine</strong> लाइब्रेरी से ग्रह-स्थितियाँ, <strong>लाहिरी अयनांश</strong> के साथ निरयण राशिचक्र (भारत की आधिकारिक पंचांग गणनाओं में प्रयुक्त मानक), और स्थानीय समय <strong>IANA समय-क्षेत्र डेटाबेस</strong> के ज़रिए। हमारा इंजन बढ़ते स्वचालित परीक्षण-सूट के पीछे चलता है, और शहर-डेटा GeoNames डेटाबेस से आता है।",
          'कठोर गणना के बावजूद पूर्णांकन-परिपाटी और किनारे-प्रकरण रहते हैं। कोई गणित मान ग़लत लगे — तिथि सीमा, नक्षत्र अवधि, अयनांश ऑफ़सेट — <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> पर बताएँ, हम जाँचकर सुधारेंगे। पृष्ठ, दर्ज इनपुट और अपेक्षित परिणाम बताएँ; हर सुधार टूल को सबके लिए बेहतर बनाता है।',
        ],
      },
      {
        id: "birth-details",
        heading: "जन्म विवरण आपकी ज़िम्मेदारी हैं",
        paragraphs: [
          "कुंडली उतनी ही शुद्ध होती है जितने दर्ज जन्म-तिथि, समय और स्थान। यदि आपका सटीक जन्म-समय ज्ञात नहीं, तो परामर्श बुक करते समय यह कह दें — हमारे ज्योतिषी सटीकता का दिखावा करने के बजाय शोधन (rectification) और प्रश्न-पद्धतियों से काम करते हैं। ग़लत इनपुट से निकले परिणामों के लिए हम उत्तरदायी नहीं।",
        ],
      },
      {
        id: "remedies",
        heading: "उपाय: रत्न, मंत्र और अनुष्ठान",
        paragraphs: [
          "रत्न, मंत्र, रुद्राक्ष या विशिष्ट पूजा जैसी सिफ़ारिशें शास्त्रीय प्रथा से ली गई, सद्भावपूर्ण, श्रद्धा-आधारित सुझाव हैं। वे सदैव स्वैच्छिक हैं — अपनाना आप तय करते हैं। हम उपायों को पारंपरिक प्रथा के रूप में प्रस्तुत करते हैं, उपचार के रूप में कभी नहीं: <strong>व्योतिष का दावा नहीं है कि कोई रत्न, अनुष्ठान या उपाय किसी रोग या चिकित्सकीय स्थिति का इलाज करता है, उसे ठीक करता है या उससे बचाता है।</strong>",
        ],
      },
      {
        id: "horoscopes",
        heading: "राशिफल, ब्लॉग और Learn सामग्री",
        paragraphs: [
          "दैनिक, साप्ताहिक और मासिक राशिफल, और सारी संपादकीय सामग्री, सामान्य दर्शकों के लिए लिखी जाती है — राशि या गोचर आधारित — और आपकी पूर्ण जन्म-कुंडली का हिसाब नहीं रख सकती। वे संपादकीय सामग्री हैं, व्यक्तिगत सलाह नहीं। जब हमारी सामग्री शास्त्रीय स्रोतों या परंपराओं का उल्लेख करती है, हम उन्हें नाम देते हैं; जब कुछ हमारी व्याख्या है, वह हमारी है।",
        ],
      },
      {
        id: "astrologers",
        heading: "ज्योतिषियों से परामर्श",
        paragraphs: [
          "व्योतिष के ज़रिए आप जिसे भी परामर्श दें — हर ज्योतिषी या पुजारी एक स्वतंत्र पेशेवर है, और उनके व्यक्तिगत रूप से दी गई सलाह की शुद्धता, उपयुक्तता और परिणामों के लिए अकेले उत्तरदायी हैं। उनकी व्याख्याएँ एक-दूसरे से और साइट की सामान्य सामग्री से भिन्न हो सकती हैं — व्याख्या की परंपरा में यह स्वभाविक है, और यह कहना ईमानदारी है।",
        ],
      },
      {
        id: "third-party",
        heading: "तृतीय-पक्ष सामग्री और लिंक",
        paragraphs: [
          "बाहरी लिंक संदर्भ हेतु दिए जाते हैं। हम तृतीय-पक्ष साइटों को नियंत्रित नहीं करते, उनकी सामग्री का समर्थन नहीं करते, और उनकी शुद्धता या प्रथाओं के लिए उत्तरदायी नहीं।",
        ],
      },
      {
        id: "no-fabrication",
        heading: "हम कुछ भी गढ़ते नहीं",
        paragraphs: [
          "हम समीक्षाएँ, रेटिंग, उपयोगकर्ता-संख्या, पुरस्कार या प्रमाण-पत्र नहीं गढ़ते — न साइट के लिए, न उसके ज्योतिषियों के लिए। जहाँ प्रशंसापत्र मौजूद हैं, वे वास्तविक हैं; तब तक समीक्षा-क्षेत्र नमूना-प्रशंसा से भरने के बजाय खाली रहते हैं। उदाहरणार्थ या नमूना सामग्री स्पष्ट रूप से ऐसा चिह्नित होती है। यदि व्योतिष पर कभी कुछ गढ़ा हुआ दावा लगे, कृपया रिपोर्ट करें — ईमानदारी यहाँ केवल नीति नहीं, उत्पाद ही है।",
        ],
      },
      {
        id: "contact",
        heading: "प्रश्न और सुधार",
        paragraphs: [
          'कोई त्रुटि मिली, या किसी दावे पर प्रश्न है? <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> पर लिखें या हमारे <a href="/hi/contact">संपर्क पृष्ठ</a> का उपयोग करें। हम सुधार प्रकाशित करते हैं — चुप्पी हमारी शैली नहीं।',
        ],
      },
    ],
  },
};
