/**
 * S24 — Terms of Use content, both languages (Epic 7.3 final draft).
 * Translation only; internal links inside Hindi prose point at the /hi twins.
 */
import type { Lang } from "../i18n";
import type { LegalDoc } from "./legal";

export const TERMS: Record<Lang, LegalDoc> = {
  en: {
    title: "Terms of Use | Vyotish",
    heading: "Terms of Use",
    intro:
      "The rules for using vyotish.com — what we provide, how to use it fairly, and how disputes are handled.",
    updated: "21 November 2026",
    sections: [
      {
        id: "acceptance",
        heading: "Acceptance of these terms",
        paragraphs: [
          "By accessing or using <strong>vyotish.com</strong> (the “Site”), you agree to these Terms of Use. If you do not agree, please do not use the Site. These terms apply to every visitor and user, whether you browse, use the free tools, read content or submit a booking request.",
        ],
      },
      {
        id: "about",
        heading: "About these terms",
        paragraphs: [
          'In these terms, “Vyotish”, “we”, “our” and “us” mean the operator of the Site, and “you” means the user. Our <a href="/privacy">Privacy Policy</a> is part of these terms, and so is our <a href="/disclaimer">Astrological Disclaimer</a> — please read all three.',
        ],
      },
      {
        id: "eligibility",
        heading: "Who can use Vyotish",
        paragraphs: [
          'You must be at least 18 years old to submit booking requests or newsletter subscriptions on your own behalf. If you are below 18, a parent or lawful guardian must provide the necessary consent — and their contact details — on your behalf, consistent with our <a href="/privacy#children">Privacy Policy</a> and India’s Digital Personal Data Protection Act, 2023.',
          "You confirm that any information you submit to the Site is accurate to the best of your knowledge and that you are legally capable of entering into these terms under the Indian Contract Act, 1872.",
        ],
      },
      {
        id: "services",
        heading: "What Vyotish provides",
        bullets: [
          "Free self-service tools: Janam Kundli, Kundli matching, daily and monthly Panchang, Muhurat lookup, and a suite of Vedic astrology calculators.",
          "Editorial content: daily horoscopes, a Learn section and a blog.",
          "Booking requests for consultations and poojas, routed to us for scheduling.",
          "Vyotish does not accept online payments at this time. Submitting a booking request costs nothing; when payments open, we will publish the payment terms here before they take effect.",
        ],
        note: [
          "We may add, change, suspend or retire any feature. Where a feature is marked “coming soon”, it simply is not live yet — we would rather show you an honest label than a hollow page.",
        ],
      },
      {
        id: "nature-of-guidance",
        heading: "The nature of astrology guidance",
        paragraphs: [
          "All astrological content on Vyotish — charts, scores, horoscopes, muhurat suggestions, blog posts and consultations — is provided for personal insight, reflection and guidance only. Astrology is a faith-based advisory tradition; its interpretations are opinions and are not an exact science. Outcomes of your decisions are never guaranteed by us.",
          'Nothing on the Site is a substitute for advice from a licensed professional — a doctor, lawyer, financial adviser or mental-health professional. See our <a href="/disclaimer">full disclaimer</a>.',
        ],
      },
      {
        id: "your-responsibilities",
        heading: "Your responsibilities",
        bullets: [
          "Provide correct birth details where the tool or booking needs them; the accuracy of any chart depends on the accuracy of what you enter.",
          "Make your own decisions; use Vyotish content as one input, not a directive.",
          "Use the Site only for lawful, personal, non-commercial purposes.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable use",
        paragraphs: ["When using Vyotish, you agree not to:"],
        bullets: [
          "Scrape, harvest or bulk-download content, or run automated tools against the Site, without our prior written permission (reasonable personal use of the free tools is always fine).",
          "Interfere with the Site’s operation, probe or test its security without authorisation, or attempt to access systems, data or admin interfaces you are not entitled to.",
          "Submit unlawful, defamatory, harassing, deceptive or infringing content through our forms.",
          "Impersonate any person, or submit bookings you do not intend to honour.",
          "Circumvent rate limits, or use the Site in a way that could impair it for other users.",
        ],
        note: [
          "We use rate limiting and edge protections to enforce these rules and keep the Site fast and safe for everyone.",
        ],
      },
      {
        id: "bookings",
        heading: "Bookings, consultations and poojas",
        paragraphs: [
          "Submitting a booking request is an enquiry, not a confirmed appointment. A booking is confirmed only when we reach back and fix the date and time with you, and — once payments open — the applicable fee is paid. Until then, availability is not guaranteed and no fee is charged.",
          'If you need to cancel or reschedule, see our <a href="/refund">Refund &amp; Cancellation</a> policy for the windows and conditions that will apply when payments are live. Once a consultation or pooja has been delivered, the advice given in it is the personal professional opinion of the astrologer or pujari concerned, and we are not responsible for outcomes flowing from it.',
        ],
      },
      {
        id: "ip",
        heading: "Intellectual property",
        paragraphs: [
          "The Site’s design, text, brand name, code and compilations are owned by Vyotish or licensed to us, and are protected under Indian copyright and trademark law. You may use the Site and print or share your own computed charts for personal, non-commercial purposes. You may not republish, resell or systematically copy Site content without our written permission.",
          "Vyotish is built on open-source software, including the astronomy-engine library (MIT licence) and GeoNames city data (Creative Commons licence). Their licences and our acknowledgements are listed in THIRD_PARTY_LICENSES.md in the project repository.",
        ],
      },
      {
        id: "third-party",
        heading: "Third-party links and services",
        paragraphs: [
          "The Site may link to third-party websites or embed third-party services (for example, city search powered by the Google Places API, or analytics if you accept it). We do not control and are not responsible for third-party content, policies or practices. Your use of those services is governed by their own terms.",
        ],
      },
      {
        id: "availability",
        heading: "Availability and no warranty",
        paragraphs: [
          "The Site and its content are provided on an “as is” and “as available” basis. We do not warrant that the Site will be uninterrupted, timely, secure or error-free, or that computational results will always be free of faults — although we test hard and fix reported faults quickly. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including fitness for a particular purpose.",
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, Vyotish is not liable for any indirect, incidental, special or consequential losses — including lost profit, lost data or emotional distress — arising from your use of the Site or reliance on its content.",
          "Where liability cannot be excluded, our total liability for any claim is limited to the amount you actually paid us for the service giving rise to the claim (in this phase, typically nothing) or ₹1,000, whichever is greater. Nothing in these terms limits liability that cannot lawfully be limited — including liability for fraud or for death or personal injury caused by negligence.",
        ],
      },
      {
        id: "indemnity",
        heading: "Indemnity",
        paragraphs: [
          "You agree to indemnify and hold harmless Vyotish and its operator, contributors and service providers from claims, damages and reasonable costs arising from your breach of these terms, your misuse of the Site, or content you submit through our forms.",
        ],
      },
      {
        id: "termination",
        heading: "Suspension and termination",
        paragraphs: [
          "We may suspend or restrict access to the Site (or to specific features) where you breach these terms, abuse the tools, or create risk for other users or for the Site’s security. You may stop using the Site at any time. Sections that should survive termination — intellectual property, limitation of liability, indemnity, governing law — do survive.",
        ],
      },
      {
        id: "grievance",
        heading: "Grievance and complaints",
        paragraphs: [
          '<strong>Grievance Officer, Vyotish</strong> — email: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>.',
          'Under the Consumer Protection (E-Commerce) Rules, 2020, we acknowledge every complaint within 48 hours and redress it within one month of receipt. Service and refund matters are described on our <a href="/refund">Refund &amp; Cancellation</a> page; data-protection grievances on our <a href="/privacy#grievance">Privacy Policy</a> page.',
        ],
      },
      {
        id: "law",
        heading: "Governing law and dispute resolution",
        paragraphs: [
          "These terms are governed by the laws of India. If you have a dispute, please write to our Grievance Officer first — most matters resolve there. If we cannot resolve a dispute within 30 days of notice, it will be referred to binding arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996, seated in India and conducted in English. The courts at the seat of arbitration have exclusive jurisdiction over matters not resolved by arbitration, and over applications for interim relief.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms as the Site evolves. The current version always lives on this page with its date. For material changes affecting existing bookings or consents, we will also notify you directly (for example, by email) where we hold your contact details.",
        ],
      },
      {
        id: "contact",
        heading: "Contact",
        paragraphs: [
          'Questions about these terms: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>, or through our <a href="/contact">contact page</a>.',
        ],
      },
    ],
  },
  hi: {
    title: "उपयोग की शर्तें | Vyotish",
    heading: "उपयोग की शर्तें",
    intro:
      "vyotish.com के उपयोग के नियम — हम क्या देते हैं, उसका न्यायसंगत उपयोग कैसे करें, और विवाद कैसे निपटे जाते हैं।",
    updated: "21 नवंबर 2026",
    sections: [
      {
        id: "acceptance",
        heading: "इन शर्तों की स्वीकृति",
        paragraphs: [
          "<strong>vyotish.com</strong> (“साइट”) तक पहुँचकर या उसका उपयोग करके आप इन उपयोग-शर्तों से सहमत होते हैं। यदि असहमत हैं तो कृपया साइट का उपयोग न करें। ये शर्तें हर दर्शक और उपयोगकर्ता पर लागू होती हैं — चाहे आप देखें, मुफ़्त टूल चलाएँ, सामग्री पढ़ें या बुकिंग अनुरोध भेजें।",
        ],
      },
      {
        id: "about",
        heading: "इन शर्तों के बारे में",
        paragraphs: [
          'इन शर्तों में “Vyotish”, “हम”, “हमारा” और “हमारे द्वारा” का अर्थ साइट के संचालक से है, और “आप” का अर्थ उपयोगकर्ता से। हमारी <a href="/hi/privacy">गोपनीयता नीति</a> इन शर्तों का भाग है, और हमारा <a href="/hi/disclaimer">ज्योतिषीय अस्वीकरण</a> भी — कृपया तीनों पढ़ें।',
        ],
      },
      {
        id: "eligibility",
        heading: "व्योतिष कौन उपयोग कर सकता है",
        paragraphs: [
          'अपने नाम पर बुकिंग अनुरोध या न्यूज़लेटर सदस्यता भेजने के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए। 18 से कम होने पर माता-पिता या विधिक संरक्षक को आपकी ओर से आवश्यक सहमति — और अपने संपर्क विवरण — देने होंगे, हमारी <a href="/hi/privacy#children">गोपनीयता नीति</a> और भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के अनुरूप।',
          "आप पुष्टि करते हैं कि साइट को दी गई कोई भी जानकारी आपकी जानकारी में सही है और भारतीय अनुबंध अधिनियम, 1872 के अंतर्गत इन शर्तों में प्रवेश की आपकी विधिक क्षमता है।",
        ],
      },
      {
        id: "services",
        heading: "व्योतिष क्या देता है",
        bullets: [
          "मुफ़्त स्व-सेवा टूल: जन्म कुंडली, कुंडली मिलान, दैनिक और मासिक पंचांग, मुहूर्त खोज, और वैदिक ज्योतिष कैलकुलेटरों की श्रृंखला।",
          "संपादकीय सामग्री: दैनिक राशिफल, Learn खंड और ब्लॉग।",
          "परामर्श और पूजा के लिए बुकिंग अनुरोध, निर्धारण हेतु हम तक पहुँचते हुए।",
          "व्योतिष इस समय ऑनलाइन भुगतान स्वीकार नहीं करता। बुकिंग अनुरोध भेजने पर कोई लागत नहीं; भुगतान खुलने पर भुगतान-शर्तें प्रभावी होने से पहले यहीं प्रकाशित करेंगे।",
        ],
        note: [
          "हम कोई भी सुविधा जोड़, बदल, निलंबित या समाप्त कर सकते हैं। जहाँ कोई सुविधा “जल्द आ रहा है” चिह्नित है, वह सीधी-सी बात है कि वह अभी लाइव नहीं — खोखला पेज दिखाने की बजाय हम ईमानदार लेबल दिखाना पसंद करते हैं।",
        ],
      },
      {
        id: "nature-of-guidance",
        heading: "ज्योतिष मार्गदर्शन की प्रकृति",
        paragraphs: [
          "व्योतिष की सारी ज्योतिषीय सामग्री — चार्ट, स्कोर, राशिफल, मुहूर्त सुझाव, ब्लॉग लेख और परामर्श — केवल व्यक्तिगत अंतर्दृष्टि, मंथन और मार्गदर्शन के लिए है। ज्योतिष एक श्रद्धा-आधारित परामर्श परंपरा है; उसकी व्याख्याएँ मत हैं, एकदम सटीक विज्ञान नहीं। आपके निर्णयों के परिणामों की गारंटी हम कभी नहीं देते।",
          'साइट की कोई चीज़ किसी लाइसेंस-प्राप्त पेशेवर — चिकित्सक, अधिवक्ता, वित्तीय सलाहकार या मानसिक-स्वास्थ्य विशेषज्ञ — की सलाह का विकल्प नहीं है। हमारा <a href="/hi/disclaimer">पूर्ण अस्वीकरण</a> देखें।',
        ],
      },
      {
        id: "your-responsibilities",
        heading: "आपकी ज़िम्मेदारियाँ",
        bullets: [
          "जहाँ टूल या बुकिंग को जन्म विवरण चाहिए, सही विवरण दें; किसी भी चार्ट की शुद्धता आपके दर्ज विवरण की शुद्धता पर टिकी है।",
          "अपने निर्णय स्वयं लें; व्योतिष सामग्री को एक आधार मानें, आदेश नहीं।",
          "साइट का उपयोग केवल विधिसम्मत, व्यक्तिगत, गैर-व्यावसायिक उद्देश्यों के लिए करें।",
        ],
      },
      {
        id: "acceptable-use",
        heading: "स्वीकार्य उपयोग",
        paragraphs: ["व्योतिष का उपयोग करते समय आप सहमत होते हैं कि आप:"],
        bullets: [
          "हमारी पूर्व लिखित अनुमति के बिना सामग्री स्क्रैप, हार्वेस्ट या थोक में डाउनलोड नहीं करेंगे, और साइट पर स्वचालित टूल नहीं चलाएँगे (मुफ़्त टूल का उचित व्यक्तिगत उपयोग सदैव स्वीकार्य है)।",
          "साइट के संचालन में बाधा नहीं डालेंगे, अनधिकृत रूप से उसकी सुरक्षा जाँच या परीक्षण नहीं करेंगे, और जिन प्रणालियों, डेटा या प्रशासक इंटरफ़ेस के लिए आप अधिकृत नहीं हैं उन्हें खोलने का प्रयास नहीं करेंगे।",
          "अवैध, मानहानिकारक, उत्पीड़क, भ्रामक या अधिकार-उल्लंघक सामग्री हमारे फ़ॉर्म के ज़रिए नहीं भेजेंगे।",
          "किसी व्यक्ति का रूप नहीं धरेंगे, और ऐसी बुकिंग नहीं भेजेंगे जिन्हें निभाने का आशय नहीं है।",
          "दर-सीमाएँ बायपास नहीं करेंगे, और साइट का ऐसा उपयोग नहीं करेंगे जो अन्य उपयोगकर्ताओं के लिए उसे बाधित कर सके।",
        ],
        note: [
          "इन नियमों का प्रवर्तन और साइट को सबके लिए तेज़-सुरक्षित रखना हम दर-सीमा और एज-संरक्षण से करते हैं।",
        ],
      },
      {
        id: "bookings",
        heading: "बुकिंग, परामर्श और पूजा",
        paragraphs: [
          "बुकिंग अनुरोध भेजना एक पूछताछ है, पुष्ट अपॉइंटमेंट नहीं। बुकिंग तभी पुष्ट होती है जब हम आप तक पहुँचकर तिथि और समय आपके साथ तय करें, और — भुगतान खुलने पर — लागू शुल्क का भुगतान हो जाए। तब तक उपलब्धता की गारंटी नहीं और कोई शुल्क नहीं लिया जाता।",
          'रद्द या पुनर्निर्धारण करना हो तो हमारी <a href="/hi/refund">रिफ़ंड और रद्दीकरण</a> नीति देखें — भुगतान लाइव होने पर लागू होने वाली अवधियाँ और शर्तें वहीं हैं। एक बार परामर्श या पूजा प्रदान हो जाने के बाद उसमें दी गई सलाह संबंधित ज्योतिषी या पुजारी का व्यक्तिगत व्यावसायिक मत है, और उससे निकले परिणामों के लिए हम उत्तरदायी नहीं।',
        ],
      },
      {
        id: "ip",
        heading: "बौद्धिक संपदा",
        paragraphs: [
          "साइट का डिज़ाइन, पाठ, ब्रैंड नाम, कोड और संकलन व्योतिष के स्वामित्व में हैं या हमें लाइसेंसित हैं, और भारतीय कॉपीराइट व ट्रेडमार्क कानून के अंतर्गत संरक्षित हैं। आप साइट उपयोग कर सकते हैं और अपने गणित चार्ट व्यक्तिगत, गैर-व्यावसायिक उद्देश्यों के लिए प्रिंट या साझा कर सकते हैं। हमारी लिखित अनुमति के बिना साइट सामग्री पुनःप्रकाशित, पुनःविक्रीत या व्यवस्थित रूप से प्रतिलिपित नहीं कर सकते।",
          "व्योतिष ओपन-सोर्स सॉफ़्टवेयर पर बना है — astronomy-engine लाइब्रेरी (MIT लाइसेंस) और GeoNames शहर-डेटा (Creative Commons लाइसेंस) सहित। उनके लाइसेंस और हमारे स्वीकृति-पृष्ठ प्रोजेक्ट रिपॉज़िटरी की THIRD_PARTY_LICENSES.md में सूचित हैं।",
        ],
      },
      {
        id: "third-party",
        heading: "तृतीय-पक्ष लिंक और सेवाएँ",
        paragraphs: [
          "साइट तृतीय-पक्ष वेबसाइटों को जोड़ सकती है या तृतीय-पक्ष सेवाएँ एम्बेड कर सकती है (उदाहरण के लिए, Google Places API से चलने वाली शहर-खोज, या विश्लेषण यदि आप स्वीकार करें)। हम तृतीय-पक्ष सामग्री, नीतियों या प्रथाओं को नियंत्रित नहीं करते और उनके लिए उत्तरदायी नहीं। उन सेवाओं का उपयोग उनकी अपनी शर्तों से संचालित होता है।",
        ],
      },
      {
        id: "availability",
        heading: "उपलब्धता और वारंटी नहीं",
        paragraphs: [
          "साइट और उसकी सामग्री “जैसी है” और “जैसी उपलब्ध है” आधार पर दी जाती हैं। हम वारंटी नहीं देते कि साइट निरंतर, समय-पर, सुरक्षित या त्रुटि-मुक्त रहेगी, या गणित परिणाम सदैव दोष-मुक्त होंगे — यद्यपि हम कठोर परीक्षण करते हैं और रिपोर्ट किए दोष तुरंत ठीक करते हैं। कानून द्वारा अनुमत अधिकतम सीमा तक हम सभी वारंटियों — स्पष्ट या अंतर्निहित, किसी विशिष्ट उद्देश्य के अनुरूपता सहित — से विरत होते हैं।",
        ],
      },
      {
        id: "liability",
        heading: "दायित्व की सीमा",
        paragraphs: [
          "कानून द्वारा अनुमत अधिकतम सीमा तक व्योतिष साइट के उपयोग या उसकी सामग्री पर भरोसे से उपजने वाले किसी भी अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी नुकसान — मुनाफ़े की हानि, डेटा हानि या भावनात्मक संताप सहित — के लिए उत्तरदायी नहीं।",
          "जहाँ दायित्व अपवर्जित नहीं किया जा सकता, किसी दावे के लिए हमारा कुल दायित्व उस सेवा के लिए आपके द्वारा वास्तव में चुकाई गई राशि (इस चरण में सामान्यतः शून्य) या ₹1,000 — इनमें से जो अधिक हो — तक सीमित है। इन शर्तों में कुछ भी उस दायित्व को सीमित नहीं करता जिसे कानूनन सीमित नहीं किया जा सकता — धोखे, या लापरवाही से मृत्यु या शारीरिक हानि के लिए दायित्व सहित।",
        ],
      },
      {
        id: "indemnity",
        heading: "क्षतिपूर्ति",
        paragraphs: [
          "आप सहमत होते हैं कि इन शर्तों के उल्लंघन, साइट के दुरुपयोग, या हमारे फ़ॉर्म के ज़रिए दी गई सामग्री से उपजने वाले दावों, क्षति और युक्तियुक्त लागतों के लिए आप व्योतिष और उसके संचालक, योगदानकर्ताओं व सेवा-प्रदाताओं को क्षतिपूर्ति देकर निर्दोष रखेंगे।",
        ],
      },
      {
        id: "termination",
        heading: "निलंबन और समाप्ति",
        paragraphs: [
          "इन शर्तों के उल्लंघन, टूलों के दुरुपयोग, या अन्य उपयोगकर्ताओं या साइट की सुरक्षा के लिए जोखिम बनाने पर हम साइट (या किसी विशिष्ट सुविधा) तक पहुँच निलंबित या सीमित कर सकते हैं। आप किसी भी समय साइट का उपयोग रोक सकते हैं। समाप्ति के बाद भी जो खंड जीवित रहने चाहिए — बौद्धिक संपदा, दायित्व की सीमा, क्षतिपूर्ति, लागू विधि — वे जीवित रहते हैं।",
        ],
      },
      {
        id: "grievance",
        heading: "शिकायत और अभियोग",
        paragraphs: [
          '<strong>शिकायत अधिकारी, Vyotish</strong> — ईमेल: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>।',
          'उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 के अंतर्गत हम हर शिकायत 48 घंटों में स्वीकार करते हैं और प्राप्ति के एक मास के भीतर निवारण करते हैं। सेवा और रिफ़ंड विषय हमारे <a href="/hi/refund">रिफ़ंड और रद्दीकरण</a> पृष्ठ पर; डेटा-संरक्षण शिकायतें हमारे <a href="/hi/privacy#grievance">गोपनीयता नीति</a> पृष्ठ पर।',
        ],
      },
      {
        id: "law",
        heading: "लागू विधि और विवाद निपटान",
        paragraphs: [
          "इन शर्तों पर भारत के विधियाँ लागू होती हैं। कोई विवाद हो तो कृपया पहले हमारे शिकायत अधिकारी को लिखें — अधिकांश मामले वहीं निपट जाते हैं। यदि सूचना के 30 दिनों के भीतर विवाद हल न हो, तो वह पंचाट और मध्यस्थता अधिनियम, 1996 के अंतर्गत एक अकेले पंच के बंधनकारी पंचाट को निर्दिष्ट होगा, जिसका आसन भारत में होगा और कार्यवाही अंग्रेज़ी में होगी। पंचाट-आसन के न्यायालयों को पंचाट से अनुत्तल विषयों और अंतरिम राहत की आवेदनों पर अनन्य क्षेत्राधिकार है।",
        ],
      },
      {
        id: "changes",
        heading: "इन शर्तों में परिवर्तन",
        paragraphs: [
          "साइट के विकसित होने के साथ हम इन शर्तों को अद्यतन कर सकते हैं। वर्तमान संस्करण सदैव अपनी तिथि के साथ इसी पृष्ठ पर रहता है। मौजूदा बुकिंग या सहमतियों को प्रभावित करने वाले ठोस परिवर्तनों पर हम आपको सीधे (उदाहरण के लिए, ईमेल से) भी सूचित करेंगे, जहाँ आपके संपर्क विवरण हमारे पास हों।",
        ],
      },
      {
        id: "contact",
        heading: "संपर्क",
        paragraphs: [
          'इन शर्तों के बारे में प्रश्न: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>, या हमारे <a href="/hi/contact">संपर्क पृष्ठ</a> से।',
        ],
      },
    ],
  },
};
