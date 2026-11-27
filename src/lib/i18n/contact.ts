/**
 * S24 — Contact page strings, both languages (Sally polished layout, copy
 * corrections preserved). Internal shortcut links go through withLang.
 */
import type { Lang } from "../i18n";

export const CONTACT: Record<
  Lang,
  {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    intro: string;
    emailH2: string;
    emailSub: string;
    copyAriaPre: string;
    copyTitle: string;
    emailNote: string;
    waH2: string;
    waSub: string;
    waBtn: string;
    soon: string;
    bookH2: string;
    bookSub: string;
    bookBtn: string;
    calloutAria: string;
    calloutStrong: string;
    calloutP: string;
    shortcutsH: string;
    sc: { label: string; desc: string }[];
    footPre: string;
    footPost: string;
    copied: string;
    copyFail: string;
    breadcrumbAria: string;
  }
> = {
  en: {
    title: "Contact | Vyotish",
    description:
      "Contact Vyotish — consultations, corrections, feedback or just a hello. Every genuine message reaches a human.",
    eyebrow: "We're here to help",
    h1: "Contact Vyotish",
    intro:
      "Consultations, corrections, feedback or just a hello — every genuine message reaches a human.",
    emailH2: "Email us",
    emailSub: "For consultations, corrections, feedback and support",
    copyAriaPre: "Copy email address ",
    copyTitle: "Copy email address",
    emailNote: "We read and reply to every genuine message.",
    waH2: "WhatsApp chat",
    waSub: "WhatsApp chat support is coming soon.",
    waBtn: "Chat on WhatsApp",
    soon: "Coming soon",
    bookH2: "Book a consultation",
    bookSub: "Live 1:1 session with a Vedic astrologer.",
    bookBtn: "Find an astrologer",
    calloutAria: "Safety note",
    calloutStrong: "Your safety first.",
    calloutP:
      "We never ask for OTPs, passwords or payments over chat. All bookings happen on vyotish.com itself.",
    shortcutsH: "Quick answers, no wait",
    sc: [
      { label: "Today's panchang", desc: "Tithi, nakshatra & muhurat for your city" },
      { label: "23 free calculators", desc: "Kundli, matching, dasha & more" },
      { label: "Learn astrology", desc: "Planets, houses & basics, explained simply" },
    ],
    footPre: "Write to ",
    footPost: " for anything urgent — a human reads it.",
    copied: "Copied to clipboard",
    copyFail: "Copy failed — select it above instead",
    breadcrumbAria: "Breadcrumb",
  },
  hi: {
    title: "संपर्क करें | Vyotish",
    description:
      "व्योतिष से संपर्क — परामर्श, सुधार, प्रतिक्रिया या बस एक नमस्ते। हर सच्चा संदेश किसी व्यक्ति तक पहुँचता है।",
    eyebrow: "हम मदद के लिए यहाँ हैं",
    h1: "व्योतिष से संपर्क करें",
    intro: "परामर्श, सुधार, प्रतिक्रिया या बस एक नमस्ते — हर सच्चा संदेश किसी व्यक्ति तक पहुँचता है।",
    emailH2: "हमें ईमेल करें",
    emailSub: "परामर्श, सुधार, प्रतिक्रिया और सहायता के लिए",
    copyAriaPre: "ईमेल पता कॉपी करें ",
    copyTitle: "ईमेल पता कॉपी करें",
    emailNote: "हम हर सच्चा संदेश पढ़ते हैं और उसका उत्तर देते हैं।",
    waH2: "WhatsApp चैट",
    waSub: "WhatsApp चैट सहायता जल्द आ रही है।",
    waBtn: "WhatsApp पर चैट करें",
    soon: "जल्द आ रहा है",
    bookH2: "परामर्श बुक करें",
    bookSub: "वैदिक ज्योतिषी के साथ सीधा 1:1 सत्र।",
    bookBtn: "ज्योतिषी खोजें",
    calloutAria: "सुरक्षा नोट",
    calloutStrong: "आपकी सुरक्षा सबसे पहले।",
    calloutP: "हम चैट पर कभी OTP, पासवर्ड या भुगतान नहीं माँगते। सभी बुकिंग vyotish.com पर ही होती हैं।",
    shortcutsH: "तुरंत उत्तर, बिना प्रतीक्षा",
    sc: [
      { label: "आज का पंचांग", desc: "आपके शहर की तिथि, नक्षत्र और मुहूर्त" },
      { label: "23 मुफ़्त कैलकुलेटर", desc: "कुंडली, मिलान, दशा और अन्य" },
      { label: "ज्योतिष सीखें", desc: "ग्रह, भाव और आधार — सरल भाषा में" },
    ],
    footPre: "कुछ भी तत्पर हो तो ",
    footPost: " पर लिखें — उसे कोई व्यक्ति पढ़ता है।",
    copied: "क्लिपबोर्ड पर कॉपी हो गया",
    copyFail: "कॉपी नहीं हुआ — ऊपर से चुन लें",
    breadcrumbAria: "ब्रेडक्रंब",
  },
};
