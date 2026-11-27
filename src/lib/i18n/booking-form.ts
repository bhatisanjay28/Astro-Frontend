/**
 * Shared booking-request form vocabulary (S24) — labels, placeholders,
 * subject lists and the JS-injected result/validation lines. Submit labels
 * stay per-page props (pages pass their own). The client script reads the
 * page language from document.documentElement.lang (set by Base).
 */
import type { Lang } from "../i18n";

export const BOOKING_FORM: Record<
  Lang,
  {
    yourName: string;
    phone: string;
    emailOptional: string;
    pujaPlaceholder: string;
    gotra: string;
    prefDate: string;
    modePlace: string;
    modePlacePh: string;
    prefTime: string;
    prefTimePh: string;
    message: string;
    savedNote: string;
    submitNote: string;
    sending: string;
    failPrefix: string;
    fail: string;
    successPrefix: string;
    successFallback: string;
    unreachable: string;
    errName: string;
    errPhone: string;
    /** defaults when the page passes no explicit submit/subject label */
    subjectLabelFallback: string;
    submitFallback: string;
    subjects: { puja: string[]; consultation: string[] };
  }
> = {
  en: {
    yourName: "Your name",
    phone: "Phone (WhatsApp preferred)",
    emailOptional: "Email (optional)",
    pujaPlaceholder: "Which puja?",
    gotra: "Gotra (optional)",
    prefDate: "Preferred date (optional)",
    modePlace: "Mode / place (optional)",
    modePlacePh: "Online / Home / Temple + city",
    prefTime: "Preferred time (optional)",
    prefTimePh: "e.g. morning / 6 pm IST",
    message: "Message (optional)",
    savedNote:
      "Saved securely — used only to contact you about this request. Birth details are never stored without explicit consent.",
    submitNote:
      "Submitting sends a real request to the Vyotish team — no payment is taken on this page.",
    sending: "Sending your request…",
    failPrefix: "Request not sent: ",
    fail: "Could not send the request — please try again.",
    successPrefix: "✓ Request received — ",
    successFallback: "the Vyotish team will contact you.",
    unreachable: "The booking service could not be reached — please refresh and try again.",
    errName: "Please enter your name.",
    errPhone: "Please enter your phone number.",
    subjectLabelFallback: "Topic",
    submitFallback: "Send Request",
    subjects: {
      puja: [
        "Graha Shanti",
        "Satyanarayan Katha",
        "Griha Pravesh",
        "Rudrabhishek",
        "Navagraha",
        "Kaal Sarp Shanti",
        "Other",
      ],
      consultation: [
        "Vedic Kundli Reading",
        "Career & Business",
        "Marriage Matching",
        "Muhurat Selection",
        "Health & Wellbeing",
        "Vastu Guidance",
        "Other",
      ],
    },
  },
  hi: {
    yourName: "आपका नाम",
    phone: "फ़ोन (व्हाट्सएप प्राथमिक)",
    emailOptional: "ईमेल (वैकल्पिक)",
    pujaPlaceholder: "कौन सी पूजा?",
    gotra: "गोत्र (वैकल्पिक)",
    prefDate: "पसंदीदा तारीख़ (वैकल्पिक)",
    modePlace: "माध्यम / स्थान (वैकल्पिक)",
    modePlacePh: "ऑनलाइन / घर / मंदिर + शहर",
    prefTime: "पसंदीदा समय (वैकल्पिक)",
    prefTimePh: "जैसे सुबह / शाम 6 बजे IST",
    message: "संदेश (वैकल्पिक)",
    savedNote:
      "सुरक्षित रूप से सेव — केवल आपसे इस अनुरोध के बारे में संपर्क करने के लिए उपयोग किया जाता है। जन्म विवरण स्पष्ट सहमति के बिना कभी संग्रहीत नहीं किए जाते।",
    submitNote: "भेजने पर व्योतिष टीम को एक वास्तविक अनुरोध जाता है — इस पेज पर कोई भुगतान नहीं लिया जाता।",
    sending: "आपका अनुरोध भेजा जा रहा है…",
    failPrefix: "अनुरोध नहीं भेजा गया: ",
    fail: "अनुरोध नहीं भेजा जा सका — कृपया दोबारा कोशिश करें।",
    successPrefix: "✓ अनुरोध प्राप्त हुआ — ",
    successFallback: "व्योतिष टीम आपसे संपर्क करेगी।",
    unreachable: "बुकिंग सेवा उपलब्ध नहीं है — कृपया पेज रीफ़्रेश करके दोबारा कोशिश करें।",
    errName: "कृपया अपना नाम दर्ज करें।",
    errPhone: "कृपया अपना फ़ोन नंबर दर्ज करें।",
    subjectLabelFallback: "विषय",
    submitFallback: "अनुरोध भेजें",
    subjects: {
      puja: ["ग्रह शांति", "सत्यनारायण कथा", "गृह प्रवेश", "रुद्राभिषेक", "नवग्रह", "काल सर्प शांति", "अन्य"],
      consultation: [
        "वैदिक कुंडली वाचन",
        "करियर और व्यापार",
        "विवाह मिलान",
        "मुहूर्त चयन",
        "स्वास्थ्य और कल्याण",
        "वास्तु मार्गदर्शन",
        "अन्य",
      ],
    },
  },
};
