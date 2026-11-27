/**
 * Kundli Matching page vocabulary (S24) — labels, hints and the
 * JS-injected result lines (verdicts, Manglik rows, table headers). JS
 * phrases are prefix strings composed client-side (define:vars is JSON-only).
 */
import type { Lang } from "../i18n";

export const MATCHING: Record<
  Lang,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    boy: string;
    girl: string;
    boyDate: string;
    boyTime: string;
    boyPlace: string;
    girlDate: string;
    girlTime: string;
    girlPlace: string;
    submit: string;
    hint: string;
    fine: string;
    // JS-injected
    errFields: string;
    matching: string;
    fail: string;
    okPre: string;
    okTh: string;
    warnPre: string;
    thKoota: string;
    thPoints: string;
    thDetail: string;
    manglikH3: string;
    yes: string;
    no: string;
    cancelPre: string;
    rowBoyManglik: string;
    rowGirlManglik: string;
    rowReading: string;
    rowBoyProfile: string;
    rowGirlProfile: string;
    moonLbl: string;
    padaLbl: string;
    flagline: string;
    errBackend: string;
  }
> = {
  en: {
    title: "Kundli Matching — Ashtakoota Guna Milan | Vyotish",
    description:
      "36-guna Ashtakoota marriage matching with per-koota explanations, plus classical Manglik checks from Lagna, Moon and Venus — computed by the Vyotish engine.",
    h1: "Kundli Matching",
    lede: "Classical Ashtakoota milan — eight kootas, 36 gunas, accept ≥ 18 — plus Manglik dosha from Lagna, Moon and Venus. Everything computes in the Vyotish backend; details are never stored.",
    boy: "Boy",
    girl: "Girl",
    boyDate: "Boy birth date",
    boyTime: "Boy birth time",
    boyPlace: "Boy birth place",
    girlDate: "Girl birth date",
    girlTime: "Girl birth time",
    girlPlace: "Girl birth place",
    submit: "Match Kundlis",
    hint: "The Ashtakoota table and Manglik verdicts appear here.",
    fine: "Verification note: koota tables follow widely published variants and are indicative. Matching supports life decisions — consult a qualified astrologer for a full reading.",
    errFields: "Please pick both birth dates and select each birth place from the suggestions.",
    matching: "Matching 36 gunas across 8 kootas…",
    fail: "Match computation failed.",
    okPre: "Acceptable match — ",
    okTh: "threshold ",
    warnPre: "Below threshold — ",
    thKoota: "Koota",
    thPoints: "Points",
    thDetail: "Detail",
    manglikH3: "Manglik dosha",
    yes: "Yes",
    no: "No",
    cancelPre: " (cancelled: ",
    rowBoyManglik: "Boy Manglik",
    rowGirlManglik: "Girl Manglik",
    rowReading: "Reading",
    rowBoyProfile: "Boy profile",
    rowGirlProfile: "Girl profile",
    moonLbl: "Moon ",
    padaLbl: " pada ",
    flagline: "Koota tables follow widely published variants — treat results as indicative.",
    errBackend: "The backend could not be reached — please refresh and try again.",
  },
  hi: {
    title: "कुंडली मिलान — अष्टकूट गुण मिलान | Vyotish",
    description:
      "36 गुण अष्टकूट विवाह मिलान — प्रत्येक कूट की व्याख्या के साथ, और लग्न, चंद्र तथा शुक्र से शास्त्रीय मांगलिक जाँच — व्योतिष इंजन द्वारा गणना।",
    h1: "कुंडली मिलान",
    lede: "शास्त्रीय अष्टकूट मिलान — आठ कूट, 36 गुण, 18 या अधिक स्वीकार्य — साथ में लग्न, चंद्र और शुक्र से मांगलिक दोष जाँच। पूरी गणना व्योतिष बैकएंड में होती है; विवरण कभी संग्रहीत नहीं होते।",
    boy: "वर",
    girl: "वधू",
    boyDate: "वर की जन्म तिथि",
    boyTime: "वर का जन्म समय",
    boyPlace: "वर का जन्म स्थान",
    girlDate: "वधू की जन्म तिथि",
    girlTime: "वधू का जन्म समय",
    girlPlace: "वधू का जन्म स्थान",
    submit: "कुंडलियाँ मिलाएँ",
    hint: "अष्टकूट तालिका और मांगलिक निष्कर्ष यहाँ दिखाई देंगे।",
    fine: "सत्यापन टिप्पणी: कूट तालिकाएँ व्यापक रूप से प्रकाशित रूपों के अनुसार हैं और संकेतात्मक हैं। मिलान जीवन के निर्णयों में सहायक है — पूर्ण वाचन के लिए योग्य ज्योतिषी से परामर्श करें।",
    errFields: "कृपया दोनों जन्म-तिथियाँ चुनें और प्रत्येक जन्म स्थान सुझावों में से चुनें।",
    matching: "8 कूटों में 36 गुण मिलाए जा रहे हैं…",
    fail: "मिलान गणना असफल रही।",
    okPre: "स्वीकार्य मिलान — ",
    okTh: "देहलीज़ ",
    warnPre: "देहलीज़ से कम — ",
    thKoota: "कूट",
    thPoints: "अंक",
    thDetail: "विवरण",
    manglikH3: "मांगलिक दोष",
    yes: "हाँ",
    no: "नहीं",
    cancelPre: " (निरस्त: ",
    rowBoyManglik: "वर मांगलिक",
    rowGirlManglik: "वधू मांगलिक",
    rowReading: "वाचन",
    rowBoyProfile: "वर की कुंडली",
    rowGirlProfile: "वधू की कुंडली",
    moonLbl: "चंद्र ",
    padaLbl: " पद ",
    flagline: "कूट तालिकाएँ व्यापक रूप से प्रकाशित रूपों के अनुसार हैं — परिणामों को संकेतात्मक ही मानें।",
    errBackend: "बैकएंड तक पहुँच नहीं बन पाई — कृपया रीफ़्रेश करके दोबारा कोशिश करें।",
  },
};
