/**
 * S24 — /kundli page strings, both languages. Static chrome renders from the
 * dict directly; the inline script receives the JS-side keys through
 * define:vars (JSON-serialized — functions not allowed, so composed verdict
 * lines use prefix/suffix strings). signNames/planetNames are plain maps and
 * arrays, which define:vars passes fine.
 */
import type { Lang } from "../i18n";

export const KUNDLI: Record<
  Lang,
  {
    // page chrome
    title: string;
    description: string;
    h1: string;
    lede: string;
    birthDate: string;
    birthTime: string;
    chartStyle: string;
    styleNorth: string;
    styleSouth: string;
    ariaNorth: string;
    ariaSouth: string;
    placeLabel: string;
    submit: string;
    errGeneric: string;
    errPlace: string;
    figPre: string;
    figPost: string;
    h2Planets: string;
    h2Dasha: string;
    h2Doshas: string;
    h2Interp: string;
    fine: string;
    // result summary
    sumLagna: string;
    sumBirth: string;
    sumDasha: string;
    padaLbl: string;
    // planet table
    thPlanet: string;
    thLon: string;
    thSign: string;
    thNak: string;
    thD9: string;
    thMotion: string;
    retro: string;
    direct: string;
    // dasha table
    thLord: string;
    thStart: string;
    thEnd: string;
    thYears: string;
    // dosha verdicts (prefix/suffix composition)
    dMangal: string;
    dKaal: string;
    dSadeSati: string;
    vPresent: string;
    vNot: string;
    vMangCancel: string;
    cancelPre: string;
    kaalSuf: string;
    ssRunPre: string;
    ssRunPost: string;
    ssNotRun: string;
    ssSatPre: string;
    ssMid: string;
    ssSatPost: string;
    ssWinPre: string;
    ssTo: string;
    ssWinPost: string;
    ssNextPre: string;
    ssNextPost: string;
    // name maps (identity fallbacks on en)
    signNames: string[];
    planetNames: Record<string, string>;
    locale: string;
  }
> = {
  en: {
    title: "Free Kundli (Janam Kundali) — No Signup | Vyotish",
    description:
      "Free online Kundli with North/South Indian charts, planetary positions, Navamsha, Vimshottari Dasha and dosha notes. No signup; birth data never stored.",
    h1: "Free Kundli",
    lede: "Enter birth details — the chart computes live on our engine. No signup; birth data is processed for this request and never stored.",
    birthDate: "Birth date",
    birthTime: "Birth time",
    chartStyle: "Chart style",
    styleNorth: "North Indian",
    styleSouth: "South Indian",
    ariaNorth: "North Indian chart",
    ariaSouth: "South Indian chart",
    placeLabel: "Place of birth",
    submit: "Generate Kundli",
    errGeneric: "Could not generate the Kundli — please check the inputs.",
    errPlace: "Please select your place of birth from the suggestions.",
    figPre: "Chart (",
    figPost: ") — printable SVG",
    h2Planets: "Planetary positions",
    h2Dasha: "Vimshottari Dasha (Maha-dashas)",
    h2Doshas: "Dosha notes",
    h2Interp: "Understanding your kundli",
    fine: "The short notes above are curated by the Vyotish team and are indicative, not a full reading. Always cross-check major decisions with a qualified astrologer.",
    sumLagna: "Lagna",
    sumBirth: "Birth (local)",
    sumDasha: "Current Maha-dasha",
    padaLbl: " pada ",
    thPlanet: "Planet",
    thLon: "Longitude",
    thSign: "Sign",
    thNak: "Nakshatra (pada)",
    thD9: "Navamsha (D9)",
    thMotion: "Motion",
    retro: "Retrograde*",
    direct: "Direct",
    thLord: "Lord",
    thStart: "Start",
    thEnd: "End",
    thYears: "Years",
    dMangal: "Mangal Dosha",
    dKaal: "Kaal Sarp",
    dSadeSati: "Shani Sade Sati",
    vPresent: "Present",
    vNot: "Not indicated",
    vMangCancel: "Present but cancelled",
    cancelPre: "Cancellation: ",
    kaalSuf: " — present",
    ssRunPre: "Running — phase ",
    ssRunPost: " of 3",
    ssNotRun: "Not running",
    ssSatPre: "Saturn in ",
    ssMid: " vs natal Moon in ",
    ssSatPost: ".",
    ssWinPre: " Window: ",
    ssTo: " to ",
    ssWinPost: ".",
    ssNextPre: "Next window: ",
    ssNextPost: ".",
    signNames: [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ],
    planetNames: {},
    locale: "en-IN",
  },
  hi: {
    title: "मुफ़्त कुंडली (जन्म कुंडली) — बिना साइनअप | Vyotish",
    description:
      "मुफ़्त ऑनलाइन कुंडली — उत्तर/दक्षिण भारतीय चार्ट, ग्रह स्थितियाँ, नवमांश, विंशोत्तरी दशा और दोष नोट्स। बिना साइनअप; जन्म विवरण कभी संग्रहीत नहीं होते।",
    h1: "मुफ़्त कुंडली",
    lede: "जन्म विवरण भरें — चार्ट हमारी इंजन पर तुरंत गणित होता है। बिना साइनअप; जन्म विवरण इसी अनुरोध के लिए प्रोसेस होते हैं और कभी संग्रहीत नहीं होते।",
    birthDate: "जन्म तिथि",
    birthTime: "जन्म समय",
    chartStyle: "चार्ट शैली",
    styleNorth: "उत्तर भारतीय",
    styleSouth: "दक्षिण भारतीय",
    ariaNorth: "उत्तर भारतीय कुंडली चार्ट",
    ariaSouth: "दक्षिण भारतीय कुंडली चार्ट",
    placeLabel: "जन्म स्थान",
    submit: "कुंडली बनाएँ",
    errGeneric: "कुंडली नहीं बनाई जा सकी — कृपया विवरण जाँच लें।",
    errPlace: "कृपया सुझावों में से अपना जन्म स्थान चुनें।",
    figPre: "चार्ट (",
    figPost: ") — प्रिंट योग्य SVG",
    h2Planets: "ग्रह स्थितियाँ",
    h2Dasha: "विंशोत्तरी दशा (महादशाएँ)",
    h2Doshas: "दोष नोट्स",
    h2Interp: "अपनी कुंडली समझें",
    fine: "ऊपर दिए संक्षिप्त नोट व्योतिष टीम द्वारा चुने गए हैं और संकेतात्मक हैं, पूर्ण वाचन नहीं। बड़े निर्णयों की पुष्टि सदैव योग्य ज्योतिषी से करें।",
    sumLagna: "लग्न",
    sumBirth: "जन्म (स्थानीय समय)",
    sumDasha: "वर्तमान महादशा",
    padaLbl: " पद ",
    thPlanet: "ग्रह",
    thLon: "रेखांश",
    thSign: "राशि",
    thNak: "नक्षत्र (पद)",
    thD9: "नवमांश (D9)",
    thMotion: "गति",
    retro: "वक्री*",
    direct: "मार्गी",
    thLord: "स्वामी",
    thStart: "प्रारंभ",
    thEnd: "समाप्ति",
    thYears: "वर्ष",
    dMangal: "मंगल दोष",
    dKaal: "काल सर्प",
    dSadeSati: "शनि साढ़ेसाती",
    vPresent: "उपस्थित",
    vNot: "संकेत नहीं",
    vMangCancel: "उपस्थित पर निरस्त",
    cancelPre: "निरस्तीकरण: ",
    kaalSuf: " — उपस्थित",
    ssRunPre: "चल रही है — चरण ",
    ssRunPost: "/3",
    ssNotRun: "नहीं चल रही",
    ssSatPre: "शनि ",
    ssMid: " राशि में बनाम जन्म-चंद्र ",
    ssSatPost: " राशि में।",
    ssWinPre: " अवधि: ",
    ssTo: " से ",
    ssWinPost: "।",
    ssNextPre: "अगली अवधि: ",
    ssNextPost: "।",
    signNames: [
      "मेष",
      "वृषभ",
      "मिथुन",
      "कर्क",
      "सिंह",
      "कन्या",
      "तुला",
      "वृश्चिक",
      "धनु",
      "मकर",
      "कुम्भ",
      "मीन",
    ],
    planetNames: {
      Sun: "सूर्य",
      Moon: "चंद्र",
      Mars: "मंगल",
      Mercury: "बुध",
      Jupiter: "गुरु",
      Venus: "शुक्र",
      Saturn: "शनि",
      Rahu: "राहु",
      Ketu: "केतु",
    },
    locale: "hi-IN",
  },
};
