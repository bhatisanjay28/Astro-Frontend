/**
 * S24 — /poojan/[slug] puja-detail chrome, both languages. DB content
 * (purpose, description, includes, muhurat_note) stays as served until the
 * hi-block merge; the puja's own Hindi name (name_hi) is used on /hi pages.
 */
import type { Lang } from "../i18n";

export const POOJAN_SLUG: Record<
  Lang,
  {
    title: (name: string) => string;
    descFallback: (name: string) => string;
    home: string;
    hub: string;
    purposeK: string;
    durK: string;
    modeK: string;
    dakshinaK: string;
    onRequest: string;
    priceV: (p: number | null) => string;
    includesH: string;
    muhuratH: string;
    requestH: (name: string) => string;
    subjectLabel: string;
    submitLabel: string;
    finePre: string;
    fineLink: string;
    finePost: string;
  }
> = {
  en: {
    title: (name) => `${name} — Vedic Puja | Vyotish Poojan`,
    descFallback: (name) => `${name} — Vedic puja on Vyotish. Request a booking directly.`,
    home: "Home",
    hub: "Poojan",
    purposeK: "Purpose:",
    durK: "Duration",
    modeK: "Mode",
    dakshinaK: "Dakshina",
    onRequest: "On request",
    priceV: (p) => (p === null ? "On request" : `₹${p.toLocaleString("en-IN")}`),
    includesH: "What's included",
    muhuratH: "Muhurat note",
    requestH: (name) => `Request ${name}`,
    subjectLabel: "Puja",
    submitLabel: "Request Puja",
    finePre: "Exploring options? ",
    fineLink: "Back to the full catalogue",
    finePost: ".",
  },
  hi: {
    title: (name) => `${name} — वैदिक पूजा | व्योतिष पूजन`,
    descFallback: (name) => `${name} — व्योतिष पर वैदिक पूजा। सीधे बुकिंग का अनुरोध करें।`,
    home: "मुखपृष्ठ",
    hub: "पूजन",
    purposeK: "उद्देश्य:",
    durK: "अवधि",
    modeK: "माध्यम",
    dakshinaK: "दक्षिणा",
    onRequest: "अनुरोध पर",
    priceV: (p) => (p === null ? "अनुरोध पर" : `₹${p.toLocaleString("en-IN")}`),
    includesH: "क्या शामिल है",
    muhuratH: "मुहूर्त टिप्पणी",
    requestH: (name) => `${name} का अनुरोध करें`,
    subjectLabel: "पूजा",
    submitLabel: "पूजा का अनुरोध करें",
    finePre: "विकल्प देख रहे हैं? ",
    fineLink: "पूरे कैटलॉग पर लौटें",
    finePost: "।",
  },
};
