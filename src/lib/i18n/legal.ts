/**
 * S24 — shared LegalPage chrome (TOC, updated chip, closing cards, back link)
 * plus the localized Related-documents labels. Page bodies live in
 * privacy.ts / terms.ts / refund.ts / disclaimer.ts; About uses about.ts.
 */
import type { Lang } from "../i18n";

export const LEGAL_CHROME: Record<
  Lang,
  {
    tocAria: string;
    tocTitle: string;
    sectionsWord: string;
    updatedPre: string;
    relatedAria: string;
    relatedTitle: string;
    current: string;
    trustTitle: string;
    trustText: string;
    questionsLabel: string;
    backHome: string;
    eyebrow: string;
    relatedDocs: { label: string; href: string }[];
  }
> = {
  en: {
    tocAria: "On this page",
    tocTitle: "On this page",
    sectionsWord: "sections",
    updatedPre: "Last updated: ",
    relatedAria: "Related documents",
    relatedTitle: "Related documents",
    current: "Current",
    trustTitle: "Your safety first",
    trustText: "We never ask for OTPs, passwords or payments over chat.",
    questionsLabel: "Questions about this document?",
    backHome: "← Back to home",
    eyebrow: "Trust & Legal",
    relatedDocs: [
      { label: "Privacy Policy (DPDP Act)", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Refund & Cancellation", href: "/refund" },
      { label: "Astrological Disclaimer", href: "/disclaimer" },
      { label: "About Vyotish", href: "/about" },
    ],
  },
  hi: {
    tocAria: "इस पृष्ठ पर",
    tocTitle: "इस पृष्ठ पर",
    sectionsWord: "खंड",
    updatedPre: "अंतिम अद्यतन: ",
    relatedAria: "संबंधित दस्तावेज़",
    relatedTitle: "संबंधित दस्तावेज़",
    current: "यही",
    trustTitle: "आपकी सुरक्षा सबसे पहले",
    trustText: "हम चैट पर कभी OTP, पासवर्ड या भुगतान नहीं माँगते।",
    questionsLabel: "इस दस्तावेज़ के बारे में प्रश्न?",
    backHome: "← मुखपृष्ठ पर लौटें",
    eyebrow: "भरोसा और कानूनी",
    relatedDocs: [
      { label: "गोपनीयता नीति (DPDP अधिनियम)", href: "/privacy" },
      { label: "उपयोग की शर्तें", href: "/terms" },
      { label: "रिफ़ंड और रद्दीकरण", href: "/refund" },
      { label: "ज्योतिषीय अस्वीकरण", href: "/disclaimer" },
      { label: "व्योतिष के बारे में", href: "/about" },
    ],
  },
};

/** Shared LegalPage section shape (exported so the page dicts stay consistent). */
export interface LegalSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string[];
}

export interface LegalDoc {
  title: string;
  heading: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}
