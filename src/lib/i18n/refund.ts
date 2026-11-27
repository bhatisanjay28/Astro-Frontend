/**
 * S24 — Refund & Cancellation content, both languages (Epic 7.3 final
 * draft). Translation only; internal links inside Hindi prose point at the
 * /hi twins.
 */
import type { Lang } from "../i18n";
import type { LegalDoc } from "./legal";

export const REFUND: Record<Lang, LegalDoc> = {
  en: {
    title: "Refund & Cancellation | Vyotish",
    heading: "Refund & Cancellation",
    intro:
      "Our cancellation and refund commitments for consultations and poojas — published before payments even open, so you always know where you stand.",
    updated: "21 November 2026",
    sections: [
      {
        id: "scope",
        heading: "Scope and current status",
        paragraphs: [
          "This policy covers cancellations, refunds and disputes for <strong>consultations</strong> and <strong>pooja bookings</strong> on Vyotish.",
          "<strong>Important for today:</strong> Vyotish is currently in its first launch phase and does not accept online payments. Submitting a booking or enquiry request costs nothing — you are never charged on this website at present, so there is nothing to refund yet. We publish the principles below in advance so you know exactly where you stand before any payment is ever taken.",
        ],
      },
      {
        id: "consultations",
        heading: "Consultations — when payments open",
        bullets: [
          "<strong>Cancel or reschedule before the session is scheduled:</strong> full refund.",
          "<strong>Cancel at least 24 hours before the confirmed session time:</strong> full refund.",
          "<strong>Cancel within 24 hours of the confirmed session time:</strong> one free reschedule, or a refund of 50% of the fee.",
          "<strong>After the session has started:</strong> no refund — the service has been delivered. If you feel a session was materially not delivered (for example, the astrologer was absent or the session was cut short by a technical failure on our side), tell us within 7 days and we will review it for a refund or a repeat session.",
        ],
        note: [
          "We do not refund completed consultations merely for dissatisfaction with the astrologer’s interpretation — every astrologer’s reading is their professional opinion, and opinions differ. What we do guarantee is that the session you paid for actually happens, with the astrologer you chose.",
        ],
      },
      {
        id: "poojas",
        heading: "Pooja bookings — when payments open",
        bullets: [
          "<strong>More than 48 hours before the scheduled pooja:</strong> full refund.",
          "<strong>Between 24 and 48 hours before:</strong> refund less 20% — preparations and materials are already underway.",
          "<strong>Within 24 hours of the scheduled pooja:</strong> no refund; you may reschedule once.",
          "<strong>Once the ritual has begun:</strong> non-refundable, in line with standard practice — the service is being performed on your behalf and is complete in substance.",
        ],
      },
      {
        id: "by-us",
        heading: "If we cancel",
        paragraphs: [
          "If we cannot deliver a service you paid for — an astrologer becomes unavailable, a slot falls through, the pooja cannot be performed — you choose: a full refund, or a rescheduled date. We bear the cost when we cause the cancellation, and we never levy a cancellation charge on you that we would not bear ourselves.",
        ],
      },
      {
        id: "failed-payments",
        heading: "Failed or duplicate payments",
        paragraphs: [
          "If money is debited from you twice, or debited for a booking that failed, we reverse the excess in full. Payment-gateway technical failures on our side are always our cost, not yours.",
        ],
      },
      {
        id: "processing",
        heading: "How refunds are processed",
        bullets: [
          "Refunds go back to the <strong>original payment method</strong> you used — never to a store wallet that locks the money in.",
          "Once a refund is approved, we initiate it within 2 business days; it typically reflects within <strong>5–7 business days</strong>, depending on your bank or card issuer.",
          "We reissue or adjust the GST invoice where one was issued.",
          "Where a refund is triggered by our error, we absorb any payment-gateway processing charges rather than deducting them from you.",
        ],
      },
      {
        id: "non-refundable",
        heading: "What is non-refundable",
        bullets: [
          "Completed consultations (except a materially undelivered session — see above).",
          "Poojas whose ritual has begun.",
          "No-shows without prior cancellation notice.",
        ],
      },
      {
        id: "how-to-request",
        heading: "How to request a refund or cancellation",
        paragraphs: [
          'Email <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> with your booking reference, the registered name, and what you are asking for. We acknowledge within 48 hours and give you a decision within 7 business days — well inside the one-month complaint redressal timeline required by the Consumer Protection (E-Commerce) Rules, 2020. Unresolved complaints go to our Grievance Officer as described on our <a href="/terms#grievance">Terms of Use</a> page.',
        ],
      },
      {
        id: "chargebacks",
        heading: "Chargebacks",
        paragraphs: [
          "If you disagree with a charge, please contact us before raising a chargeback with your bank — it is almost always faster for everyone, and we would rather make it right than fight a dispute. We cooperate fully with lawful chargeback processes either way.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          "When payments go live, we will publish any additions to this policy on this page — with the date — before they take effect, and these published terms govern every booking made after that point.",
        ],
      },
    ],
  },
  hi: {
    title: "रिफ़ंड और रद्दीकरण | Vyotish",
    heading: "रिफ़ंड और रद्दीकरण",
    intro:
      "परामर्श और पूजा के लिए हमारी रद्दीकरण और रिफ़ंड प्रतिबद्धताएँ — भुगतान खुलने से पहले ही प्रकाशित, ताकि आप हमेशा जानें कि आपकी स्थिति क्या है।",
    updated: "21 नवंबर 2026",
    sections: [
      {
        id: "scope",
        heading: "विस्तार और वर्तमान स्थिति",
        paragraphs: [
          "यह नीति व्योतिष पर <strong>परामर्श</strong> और <strong>पूजा बुकिंग</strong> के रद्दीकरण, रिफ़ंड और विवादों को कवर करती है।",
          "<strong>आज के लिए महत्वपूर्ण:</strong> व्योतिष इस समय अपने पहले लॉन्च चरण में है और ऑनलाइन भुगतान स्वीकार नहीं करता। बुकिंग या पूछताछ अनुरोध भेजने पर कोई लागत नहीं — इस समय इस वेबसाइट पर आपसे कभी शुल्क नहीं लिया जाता, इसलिए अभी रिफ़ंड की कोई बात ही नहीं। नीचे के सिद्धांत हम पहले से प्रकाशित करते हैं ताकि कोई भुगतान लेने से पहले आप ठीक-ठीक जानें कि आपकी स्थिति क्या होगी।",
        ],
      },
      {
        id: "consultations",
        heading: "परामर्श — भुगतान खुलने पर",
        bullets: [
          "<strong>सत्र निर्धारित होने से पहले रद्द या पुनर्निर्धारण:</strong> पूर्ण रिफ़ंड।",
          "<strong>पुष्ट सत्र-समय से कम से कम 24 घंटे पहले रद्द:</strong> पूर्ण रिफ़ंड।",
          "<strong>पुष्ट सत्र-समय के 24 घंटों के भीतर रद्द:</strong> एक निःशुल्क पुनर्निर्धारण, या शुल्क का 50% रिफ़ंड।",
          "<strong>सत्र शुरू हो जाने के बाद:</strong> कोई रिफ़ंड नहीं — सेवा प्रदान हो चुकी है। यदि आप महसूस करें कि सत्र ठोस रूप से नहीं दिया गया (उदाहरण के लिए, ज्योतिषी अनुपस्थित रहे या हमारी ओर से तकनीकी विफलता से सत्र अधूरा रहे), 7 दिनों के भीतर बताएँ — हम रिफ़ंड या दोहराया सत्र के लिए समीक्षा करेंगे।",
        ],
        note: [
          "ज्योतिषी की व्याख्या से असंतोष के मात्र कारण पर हम पूर्ण हुए परामर्श का रिफ़ंड नहीं करते — हर ज्योतिषी का वाचन उनका व्यावसायिक मत है, और मत भिन्न होते हैं। हम जो गारंटी देते हैं वह यह है कि जिस सत्र के लिए आपने भुगतान किया वह सचमुच होगा, उसी ज्योतिषी के साथ जिसे आपने चुना।",
        ],
      },
      {
        id: "poojas",
        heading: "पूजा बुकिंग — भुगतान खुलने पर",
        bullets: [
          "<strong>निर्धारित पूजा से 48 घंटे से अधिक पहले:</strong> पूर्ण रिफ़ंड।",
          "<strong>24 से 48 घंटे पहले के बीच:</strong> 20% की कटौती के साथ रिफ़ंड — तैयारियाँ और सामग्री तब तक चल चुकी होती हैं।",
          "<strong>निर्धारित पूजा के 24 घंटों के भीतर:</strong> कोई रिफ़ंड नहीं; एक बार पुनर्निर्धारण कर सकते हैं।",
          "<strong>अनुष्ठान शुरू हो जाने के बाद:</strong> अगैर-वापसी, मानक प्रथा के अनुरूप — सेवा आपकी ओर से की जा रही है और सारतः पूर्ण है।",
        ],
      },
      {
        id: "by-us",
        heading: "यदि हम रद्द करें",
        paragraphs: [
          "यदि हम आपके भुगतान की सेवा नहीं दे पाएँ — ज्योतिषी अनुपलब्ध हो जाए, स्लॉट छूट जाए, पूजा नहीं हो सके — तो आप चुनते हैं: पूर्ण रिफ़ंड, या नई निर्धारित तिथि। रद्दीकरण हमारी ओर से हो तो लागत हम वहन करते हैं, और आप पर कभी वैसा रद्दीकरण शुल्क नहीं लगाते जो स्वयं न वहन करें।",
        ],
      },
      {
        id: "failed-payments",
        heading: "विफल या दोहराए भुगतान",
        paragraphs: [
          "यदि आपसे धन दो बार कटे, या किसी विफल बुकिंग के लिए कटा, तो अतिरिक्त राशि हम पूरी वापस करते हैं। हमारी ओर से भुगतान-गेटवे की तकनीकी विफलताएँ सदैव हमारी लागत होती हैं, आपकी नहीं।",
        ],
      },
      {
        id: "processing",
        heading: "रिफ़ंड कैसे प्रोसेस होते हैं",
        bullets: [
          "रिफ़ंड उसी <strong>मूल भुगतान माध्यम</strong> पर जाता है जिसका आपने उपयोग किया — कभी भी ऐसे स्टोर-वॉलेट पर नहीं जो राशि अंदर बंद कर दे।",
          "रिफ़ंड स्वीकृत होते ही हम उसे 2 कार्य-दिवसों में शुरू करते हैं; सामान्यतः वह <strong>5–7 कार्य-दिवसों</strong> में दिख जाता है, आपके बैंक या कार्ड जारीकर्ता पर निर्भर।",
          "जहाँ GST चालान जारी हुआ था, वह पुनः जारी या समायोजित करते हैं।",
          "हमारी त्रुटि से रिफ़ंड ट्रिगर हो तो भुगतान-गेटवे प्रोसेसिंग शुल्क हम वहन करते हैं, आपसे काटते नहीं।",
        ],
      },
      {
        id: "non-refundable",
        heading: "जो रिफ़ंड-योग्य नहीं",
        bullets: [
          "पूर्ण हुए परामर्श (ठोस रूप से न दिया गया सत्र छोड़ — ऊपर देखें)।",
          "जिन पूजाओं का अनुष्ठान शुरू हो चुका है।",
          "पूर्व सूचना रद्दीकरण के बिना न आना (no-show)।",
        ],
      },
      {
        id: "how-to-request",
        heading: "रिफ़ंड या रद्दीकरण का अनुरोध कैसे करें",
        paragraphs: [
          '<a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> पर अपना बुकिंग संदर्भ, पंजीकृत नाम और आप क्या माँग रहे हैं, लिखें। हम 48 घंटों में स्वीकारोक्ति देते हैं और 7 कार्य-दिवसों में निर्णय — उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 की अपेक्षित एक-मास शिकायत निवारण अवधि के भीतर ही। अनुत्तल शिकायतें हमारे शिकायत अधिकारी के पास जाती हैं — विवरण हमारे <a href="/hi/terms#grievance">उपयोग की शर्तें</a> पृष्ठ पर।',
        ],
      },
      {
        id: "chargebacks",
        heading: "चार्जबैक",
        paragraphs: [
          "यदि आप किसी शुल्क से असहमत हैं, बैंक से चार्जबैक उठाने से पहले कृपया हमसे संपर्क करें — यह सबके लिए लगभग हमेशा तेज़ रहता है, और हम विवाद लड़ने की बजाय बात ठीक करना पसंद करते हैं। दोनों ही स्थितियों में हम विधिसम्मत चार्जबैक प्रक्रिया के साथ पूर्ण सहयोग करते हैं।",
        ],
      },
      {
        id: "changes",
        heading: "इस नीति में परिवर्तन",
        paragraphs: [
          "भुगतान शुरू होने पर इस नीति में कोई भी जोड़ प्रभावी होने से पहले — तिथि के साथ — इसी पृष्ठ पर प्रकाशित करेंगे, और उसके बाद बनी हर बुकिंग पर यही प्रकाशित शर्तें लागू होंगी।",
        ],
      },
    ],
  },
};
