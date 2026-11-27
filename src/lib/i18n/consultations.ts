/**
 * S24 — /consultations/[slug] astrologer-profile chrome, both languages.
 * DB content (about, expertise, titles) stays as served until the hi-block
 * merge; these strings localize the page around it.
 */
import type { Lang } from "../i18n";

export const CONSULT_SLUG: Record<
  Lang,
  {
    titleSuffix: string;
    descFallback: (name: string, title: string, expertise: string) => string;
    home: string;
    hub: string;
    availYes: string;
    availNo: string;
    expK: string;
    yearsV: (n: number | null) => string;
    rateK: string;
    onRequest: string;
    rateV: (r: number | null) => string;
    langK: string;
    dash: string;
    expertiseH: string;
    sessionsH: string;
    sessionFallback: string;
    minV: (n: number) => string;
    requestH: (name: string) => string;
    subjectLabel: string;
    submitLabel: string;
    finePre: string;
    fineLink: string;
    finePost: string;
  }
> = {
  en: {
    titleSuffix: " | Vyotish Consultations",
    descFallback: (name, title, expertise) =>
      `${name} — ${title || "Vedic astrologer"} on Vyotish: ${expertise}. Request a consultation directly.`,
    home: "Home",
    hub: "Consultations",
    availYes: "Available",
    availNo: "Unavailable",
    expK: "Experience",
    yearsV: (n) => `${n ?? "—"} years`,
    rateK: "Consultation rate",
    onRequest: "On request",
    rateV: (r) => (r === null ? "On request" : `₹${r} / min`),
    langK: "Languages",
    dash: "—",
    expertiseH: "Expertise",
    sessionsH: "Session types",
    sessionFallback: "Session",
    minV: (n) => ` · ${n} min`,
    requestH: (name) => `Request a consultation with ${name}`,
    subjectLabel: "Topic",
    submitLabel: "Request Consultation",
    finePre: "Looking for someone else? ",
    fineLink: "Back to the full directory",
    finePost: ".",
  },
  hi: {
    titleSuffix: " | व्योतिष परामर्श",
    descFallback: (name, title, expertise) =>
      `${name} — ${title || "वैदिक ज्योतिषी"} व्योतिष पर: ${expertise}। सीधे परामर्श का अनुरोध करें।`,
    home: "मुखपृष्ठ",
    hub: "परामर्श",
    availYes: "उपलब्ध",
    availNo: "उपलब्ध नहीं",
    expK: "अनुभव",
    yearsV: (n) => `${n ?? "—"} वर्ष`,
    rateK: "परामर्श शुल्क",
    onRequest: "अनुरोध पर",
    rateV: (r) => (r === null ? "अनुरोध पर" : `₹${r} / मिनट`),
    langK: "भाषाएँ",
    dash: "—",
    expertiseH: "विशेषज्ञता",
    sessionsH: "सत्र प्रकार",
    sessionFallback: "सत्र",
    minV: (n) => ` · ${n} मिनट`,
    requestH: (name) => `${name} से परामर्श का अनुरोध करें`,
    subjectLabel: "विषय",
    submitLabel: "परामर्श का अनुरोध करें",
    finePre: "किसी और की तलाश है? ",
    fineLink: "पूरी निर्देशिका पर लौटें",
    finePost: "।",
  },
};
