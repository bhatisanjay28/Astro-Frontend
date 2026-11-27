/**
 * S24 — /muhurat/ hub strings, both languages. Event option labels are
 * localized per language (the option VALUE stays the API slug); window names
 * and verdicts shown in the islands are mapped client-side with a raw-value
 * fallback until the API serves hi (P5 audit).
 */
import type { Lang } from "../i18n";

export const MUHURAT: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    todayH: string;
    yourCity: string;
    defNote: string;
    loading: string;
    avoid: string;
    unavailToday: string;
    finderH: string;
    eventLabel: string;
    from: string;
    to: string;
    city: string;
    submit: string;
    errFinder: string;
    errCity: string;
    failPre: string;
    exclPre: string;
    exclPost: string;
    events: Record<string, string>;
    verdicts: Record<string, string>;
    windowNames: Record<string, string>;
    locale: string;
  }
> = {
  en: {
    title: "Muhurat Today & Finder | Vyotish",
    description:
      "Today's auspicious and inauspicious windows (Abhijit, Brahma Muhurta, Rahu Kaal) and an event-wise muhurat finder.",
    h1: "Muhurat",
    lede: "Today's auspicious and inauspicious periods for your city, plus an event-wise finder. <strong>Treat the windows as indicative only — for an important occasion, confirm the muhurat in a personal consultation.</strong>",
    todayH: "Today",
    yourCity: "Your city",
    defNote: "Defaults to New Delhi — pick your city above for local windows.",
    loading: "Loading…",
    avoid: "avoid",
    unavailToday: "Unavailable right now.",
    finderH: "Muhurat finder",
    eventLabel: "Event",
    from: "From",
    to: "To",
    city: "City",
    submit: "Find muhurat windows",
    errFinder: "Could not run the finder — check the range (max 62 days) and try again.",
    errCity: "Please select the city from the suggestions.",
    failPre: "Failing rules: ",
    exclPre: " (excludes ",
    exclPost: ")",
    events: {
      marriage: "Marriage",
      engagement: "Engagement",
      griha_pravesh: "Griha Pravesh",
      vehicle: "Vehicle purchase",
      property: "Property purchase",
      business: "Business start",
      naamkaran: "Naamkaran",
      mundan: "Mundan",
      annaprashan: "Annaprashan",
      travel: "Travel",
    },
    verdicts: {
      suitable: "Suitable",
      conditional: "Conditional",
      not_suitable: "Not suitable",
    },
    windowNames: {
      Abhijit: "Abhijit",
      "Brahma Muhurta": "Brahma Muhurta",
      "Rahu Kaal": "Rahu Kaal",
      Yamaganda: "Yamaganda",
      "Gulika Kaal": "Gulika Kaal",
      "Dur Muhurat": "Dur Muhurat",
      "Vijaya Muhurat": "Vijaya Muhurat",
    },
    locale: "en-GB",
  },
  hi: {
    title: "आज का मुहूर्त और मुहूर्त खोज | Vyotish",
    description: "आज की शुभ और अशुभ अवधियाँ (अभिजीत, ब्रह्म मुहूर्त, राहु काल) और अवसर-वार मुहूर्त खोज।",
    h1: "मुहूर्त",
    lede: "आपके शहर के लिए आज की शुभ और अशुभ अवधियाँ, साथ में अवसर-वार मुहूर्त खोज। <strong>इन अवधियों को केवल संकेत मानें — किसी महत्वपूर्ण अवसर के लिए मुहूर्त की पुष्टि व्यक्तिगत परामर्श में करें।</strong>",
    todayH: "आज",
    yourCity: "आपका शहर",
    defNote: "डिफ़ॉल्ट नई दिल्ली — स्थानीय अवधियों के लिए ऊपर अपना शहर चुनें।",
    loading: "लोड हो रहा है…",
    avoid: "से बचें",
    unavailToday: "अभी उपलब्ध नहीं।",
    finderH: "मुहूर्त खोज",
    eventLabel: "अवसर",
    from: "से",
    to: "तक",
    city: "शहर",
    submit: "मुहूर्त अवधियाँ खोजें",
    errFinder: "खोज नहीं चल सकी — अवधि जाँचें (अधिकतम 62 दिन) और फिर कोशिश करें।",
    errCity: "कृपया सुझावों में से शहर चुनें।",
    failPre: "अनुपयुक्त नियम: ",
    exclPre: " (छोड़कर: ",
    exclPost: ")",
    events: {
      marriage: "विवाह",
      engagement: "सगाई",
      griha_pravesh: "गृह प्रवेश",
      vehicle: "वाहन क्रय",
      property: "संपत्ति क्रय",
      business: "व्यापार प्रारंभ",
      naamkaran: "नामकरण",
      mundan: "मुंडन",
      annaprashan: "अन्नप्राशन",
      travel: "यात्रा",
    },
    verdicts: {
      suitable: "उपयुक्त",
      conditional: "सशर्त",
      not_suitable: "अनुपयुक्त",
    },
    windowNames: {
      Abhijit: "अभिजीत",
      "Brahma Muhurta": "ब्रह्म मुहूर्त",
      "Rahu Kaal": "राहु काल",
      Yamaganda: "यमगंड",
      "Gulika Kaal": "गुलिक काल",
      "Dur Muhurat": "दुर्मुहूर्त",
      "Vijaya Muhurat": "विजया मुहूर्त",
    },
    locale: "hi-IN",
  },
};
