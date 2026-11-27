/**
 * S24 — /calculators/[tool] page chrome + client-script strings, both
 * languages. Per-tool copy (title, description, notes, extra-field labels)
 * lives in the page's registry as *_hi fields; this dict carries the shared
 * chrome and the four form/result states.
 */
import type { Lang } from "../i18n";

export const CALC_TOOL: Record<
  Lang,
  {
    titleSuffix: string;
    descSuffix: string;
    crumbsRoot: string;
    funFlag: string;
    apiNote: string;
    submitDefault: string;
    birthDate: string;
    birthTime: string;
    placeBirth: string;
    place: string;
    timeOfBirth: string;
    dateOfBirth: string;
    date: string;
    optionalSuffix: string;
    nameLbl: string;
    firstName: string;
    yourName: string;
    otherName: string;
    resultHint: string;
    allCalc: string;
    kundliPre: string;
    kundliLink: string;
    kundliPost: string;
    matchPre: string;
    matchLink: string;
    matchPost: string;
    /* client-script strings */
    nameMsg: string;
    selectCity: string;
    selectBirthPlace: string;
    needPlaceTime: string;
    calculating: string;
    errFallback: string;
    checkInputs: string;
    netErr: string;
  }
> = {
  en: {
    titleSuffix: " — Free Vedic Calculator | Vyotish",
    descSuffix: " Free, instant, no login — computed live by the Vyotish engine.",
    crumbsRoot: "Calculators",
    funFlag: "For fun — not an astrological verdict",
    apiNote: "Free · instant · computed live — nothing is stored.",
    submitDefault: "Calculate",
    birthDate: "Birth date",
    birthTime: "Birth time",
    placeBirth: "Place of birth",
    place: "Place",
    timeOfBirth: "Time of birth",
    dateOfBirth: "Date of birth",
    date: "Date",
    optionalSuffix: " (optional)",
    nameLbl: "Name",
    firstName: "First name",
    yourName: "Your name",
    otherName: "Other name",
    resultHint: "Your result will appear here — instant, and nothing is stored.",
    allCalc: "← All calculators",
    kundliPre: "Kundli with charts & Dasha on the ",
    kundliLink: "Free Kundli page",
    kundliPost: "",
    matchPre: " · Matching on the ",
    matchLink: "Match page",
    matchPost: "",
    nameMsg: "Please enter your name.",
    selectCity: "Please select a city from the list.",
    selectBirthPlace: "Please select your place of birth from the suggestions.",
    needPlaceTime: "Add your place of birth to use the birth time — or clear the time field.",
    calculating: "Calculating…",
    errFallback: "The calculation failed — please check the inputs and try again.",
    checkInputs: " Please check the inputs.",
    netErr: "The backend could not be reached — please refresh and try again.",
  },
  hi: {
    titleSuffix: " — मुफ़्त वैदिक कैलकुलेटर | Vyotish",
    descSuffix: " मुफ़्त, तुरंत, बिना लॉगिन — व्योतिष इंजन से लाइव गणित।",
    crumbsRoot: "कैलकुलेटर",
    funFlag: "मनोरंजन हेतु — ज्योतिषीय निर्णय नहीं",
    apiNote: "मुफ़्त · तुरंत · लाइव गणित — कुछ भी सहेजा नहीं जाता।",
    submitDefault: "गणना करें",
    birthDate: "जन्म तिथि",
    birthTime: "जन्म समय",
    placeBirth: "जन्म स्थान",
    place: "स्थान",
    timeOfBirth: "जन्म का समय",
    dateOfBirth: "जन्म तिथि",
    date: "तिथि",
    optionalSuffix: " (वैकल्पिक)",
    nameLbl: "नाम",
    firstName: "पहला नाम",
    yourName: "आपका नाम",
    otherName: "दूसरा नाम",
    resultHint: "परिणाम यहीं दिखेगा — तुरंत, और कुछ भी सहेजा नहीं जाता।",
    allCalc: "← सभी कैलकुलेटर",
    kundliPre: "चार्ट और दशा सहित कुंडली ",
    kundliLink: "मुफ़्त कुंडली पृष्ठ",
    kundliPost: " पर",
    matchPre: " · मिलान ",
    matchLink: "मिलान पृष्ठ",
    matchPost: " पर",
    nameMsg: "कृपया अपना नाम दर्ज करें।",
    selectCity: "कृपया सूची से एक शहर चुनें।",
    selectBirthPlace: "कृपया सुझावों में से अपना जन्म स्थान चुनें।",
    needPlaceTime: "जन्म समय के साथ जन्म स्थान जोड़ें — या समय फ़ील्ड साफ़ करें।",
    calculating: "गणना हो रही है…",
    errFallback: "गणना विफल रही — कृपया इनपुट जाँचकर फिर कोशिश करें।",
    checkInputs: " कृपया इनपुट जाँचें।",
    netErr: "बैकएंड तक पहुँच नहीं मिली — कृपया रिफ़्रेश करके फिर कोशिश करें।",
  },
};
