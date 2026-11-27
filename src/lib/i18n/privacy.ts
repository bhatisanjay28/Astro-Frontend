/**
 * S24 — Privacy Policy content, both languages (Epic 7.3 final draft,
 * DPDP Act 2023 + DPDP Rules 2025 grounded). Translation only — no new
 * claims; internal links inside Hindi prose point at the /hi twins.
 */
import type { Lang } from "../i18n";
import type { LegalDoc } from "./legal";

export const PRIVACY: Record<Lang, LegalDoc> = {
  en: {
    title: "Privacy Policy | Vyotish",
    heading: "Privacy Policy",
    intro:
      "How Vyotish collects, uses and protects personal data — written against India's Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.",
    updated: "21 November 2026",
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        paragraphs: [
          "Vyotish (“Vyotish”, “we”, “our” or “us”) operates the website <strong>vyotish.com</strong> and the services offered on it. Under the Digital Personal Data Protection Act, 2023 (“DPDP Act”), Vyotish is the <em>Data Fiduciary</em> — the entity responsible for deciding how your personal data is collected and used.",
          "We run Vyotish on a simple principle: we collect only what the task in front of you actually needs, we say what we use it for, and we delete it when we no longer need it.",
        ],
      },
      {
        id: "data-we-collect",
        heading: "Personal data we collect",
        paragraphs: ["This is the complete list of what we ask for, feature by feature:"],
        bullets: [
          "<strong>Kundli, matching, panchang, muhurat and calculator tools:</strong> birth date, birth time, birth place and, where a tool requires it, gender. These inputs are used to compute your result <strong>and are not stored in our database</strong> — the calculation happens, the result is shown to you, and the inputs are not saved on our servers (city-name lookups are cached as public reference data, with nothing linking them to you).",
          "<strong>Consultation booking requests:</strong> your name, phone number, email address (optional), consultation topic, preferred date and time, and your message. Birth details are not collected through the booking form in this phase; when we introduce them for astrologer preparation, they will be taken only behind a separate, explicit consent tick — never assumed.",
          "<strong>Pooja booking requests:</strong> your name, phone number, email address (optional), gotra (if you choose to provide it), preferred date, location, language and message.",
          "<strong>Newsletter:</strong> your email address only. You can unsubscribe at any time.",
          "<strong>Site administrators:</strong> team accounts hold an email address and a securely hashed password. There are no public user accounts on Vyotish — you can use every tool without signing up.",
          "<strong>Technical and security data:</strong> server request logs (IP address, browser type, timestamps) processed by our hosting and security infrastructure to keep the site running and safe.",
          "<strong>Analytics:</strong> if — and only if — you accept analytics, we use Google Analytics 4 in an aggregate, non-advertising way. Nothing analytics-related loads before you explicitly accept. We do not run advertising trackers, and we do not sell data.",
        ],
      },
      {
        id: "purposes",
        heading: "What we use it for",
        paragraphs: ["We process personal data only for these stated purposes:"],
        bullets: [
          "Computing the kundli chart, matching score, panchang, muhurat or calculator result you asked for.",
          "Scheduling and delivering consultations or pooja services you requested.",
          "Replying to your messages, corrections and support requests.",
          "Sending the newsletter you subscribed to.",
          "Keeping the site secure — detecting abuse, rate-limiting automated traffic and protecting accounts.",
          "Improving content quality based on aggregate usage patterns that do not identify you.",
        ],
      },
      {
        id: "consent",
        heading: "Consent and how we take it",
        paragraphs: [
          "We rely on your consent for the personal data described above. Under the DPDP Act (Section 6), consent must be free, specific, informed, unconditional and unambiguous, given by a clear affirmative action — which is why our forms use separate, unticked checkboxes, and when birth details are introduced for consultations they will carry their own explicit consent box rather than a pre-ticked one.",
          'You may withdraw consent at any time by writing to <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> — withdrawal is as easy as giving consent. When you withdraw, we stop processing your data (and instruct our service providers to do the same) within a reasonable time, keeping only what another law requires or what we need for security records.',
          "You can also explore almost the entire site — charts, panchang, muhurat, calculators, blog — without giving us any personal data at all.",
        ],
      },
      {
        id: "sharing",
        heading: "Who we share data with",
        paragraphs: [
          "We never sell or rent your personal data. We share it only where the task needs it, with:",
        ],
        bullets: [
          "<strong>Our infrastructure providers, under contract:</strong> Supabase (database and authentication), Cloudflare (website delivery, security and DDoS protection), and the Google Places API (city-name suggestions while you type a birth place — Google receives the characters you type into that field only).",
          "<strong>Your astrologer or pujari:</strong> the booking details needed to prepare and conduct your consultation or pooja — nothing beyond what the booking contains.",
          "<strong>Google Analytics 4:</strong> pseudonymous usage events, only if you accepted analytics.",
          "<strong>Legal disclosures:</strong> where disclosure is required by law or a lawful order of a court or government authority.",
        ],
      },
      {
        id: "where-data-lives",
        heading: "Where your data lives",
        paragraphs: [
          "Your data is stored in Supabase’s managed cloud database and served through Cloudflare’s global network, which may involve processing outside India. The DPDP Act permits such cross-border transfers except to countries restricted by the Central Government; we will honour any such restrictions as they are notified.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        bullets: [
          "<strong>Consultation and pooja requests:</strong> up to 24 months after the request is closed, then erased (or longer only if a law requires it).",
          "<strong>Newsletter subscriptions:</strong> until you unsubscribe.",
          "<strong>Security and server logs:</strong> short-retention operational logs on our hosting platform; if longer retention ever becomes necessary, we will state it here first.",
          "<strong>Tool inputs (kundli, calculators, matching):</strong> not stored at all.",
          "<strong>Panchang and astronomical caches:</strong> these are computed results keyed by date and city — they contain no personal data.",
        ],
        note: [
          "When you ask us to erase your data, or when you withdraw consent, we erase it sooner wherever no law requires us to keep it.",
        ],
      },
      {
        id: "security",
        heading: "How we protect your data",
        paragraphs: [
          "Security safeguards (DPDP Act, Section 8(5); DPDP Rules, Rule 6) applied on Vyotish today:",
        ],
        bullets: [
          "Row Level Security is enabled on every database table; the database service key exists only on the server and is never shipped to your browser.",
          "All traffic is encrypted in transit over HTTPS/TLS.",
          "Least-privilege access controls and access logging on our hosting platform (Cloudflare).",
          "Rate limiting on forms and Cloudflare edge protections against abusive traffic.",
          "We do not collect card or payment data — payments are not enabled in this phase.",
        ],
        note: [
          "If a personal data breach ever affects you, we will notify you without delay — describing what happened, its likely effects, the steps we are taking and how to reach us — and report the breach to the Data Protection Board of India within 72 hours, as DPDP Rules Rule 7 requires.",
        ],
      },
      {
        id: "your-rights",
        heading: "Your rights under the DPDP Act",
        bullets: [
          "<strong>Access (Section 11):</strong> ask for a summary of your personal data, how we process it, and who we have shared it with.",
          "<strong>Correction, completion, updating and erasure (Section 12):</strong> fix inaccurate data or have it erased, subject to legal retention requirements.",
          "<strong>Withdraw consent (Section 6(4)):</strong> at any time, as easily as you gave it.",
          "<strong>Nomination (Section 14):</strong> nominate another individual to exercise your rights if you are unable to, or in the event of your death.",
          "<strong>Grievance redressal (Section 13):</strong> complain to us first; escalate to the Data Protection Board of India if unsatisfied.",
        ],
        note: [
          'To exercise any right, email <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> from the email address you used with us (or include your booking reference). We verify your identity before acting — we will not action requests on data we cannot associate with you.',
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "Under the DPDP Act, anyone below 18 years of age is a child. We do not knowingly process a child’s personal data without verifiable consent from the child’s parent or lawful guardian. If a booking or form submission indicates the person is a child, we will seek verifiable parental consent — or erase the data. We never track or direct targeted advertising at children.",
        ],
      },
      {
        id: "grievance",
        heading: "Grievance contact",
        paragraphs: [
          '<strong>Grievance Officer, Vyotish</strong> — email: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>.',
          'We acknowledge every grievance as it arrives and respond within <strong>30 days</strong>. In no case will the response period exceed 90 days, the maximum published period permitted under DPDP Rules (Rule 14). This contact also handles consumer complaints under the Consumer Protection (E-Commerce) Rules, 2020 — see our <a href="/refund">Refund &amp; Cancellation</a> page for service-related matters.',
          "If you are not satisfied with our response, you may escalate to the <strong>Data Protection Board of India</strong>, as set up under the DPDP Act, once it is operational.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          "We publish every revision of this policy on this page with the date of the change. If a change materially affects how we use data you have already given us, we will seek your fresh consent where the DPDP Act requires it.",
        ],
      },
    ],
  },
  hi: {
    title: "गोपनीयता नीति | Vyotish",
    heading: "गोपनीयता नीति",
    intro:
      "व्योतिष व्यक्तिगत डेटा कैसे एकत्र करता है, उसका उपयोग कैसे करता है और उसे कैसे सुरक्षित रखता है — भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 और DPDP नियम, 2025 के अनुरूप।",
    updated: "21 नवंबर 2026",
    sections: [
      {
        id: "who-we-are",
        heading: "हम कौन हैं",
        paragraphs: [
          "व्योतिष (“Vyotish”, “हम”, “हमारा” या “हमारे द्वारा”) <strong>vyotish.com</strong> वेबसाइट और उस पर दी जाने वाली सेवाएँ संचालित करता है। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (“DPDP अधिनियम”) के अंतर्गत व्योतिष <em>डेटा फिड्यूशियरी</em> है — वह संस्था जो तय करने के लिए उत्तरदायी है कि आपका व्यक्तिगत डेटा कैसे एकत्र और उपयोग किया जाए।",
          "हम व्योतिष एक सरल सिद्धांत पर चलाते हैं: हम केवल वही एकत्र करते हैं जो आपके सामने के काम को सचमुच चाहिए, हम बताते हैं कि उसका उपयोग किस लिए करते हैं, और जब आवश्यकता समाप्त हो जाती है तो उसे मिटा देते हैं।",
        ],
      },
      {
        id: "data-we-collect",
        heading: "हम कौन-सा व्यक्तिगत डेटा एकत्र करते हैं",
        paragraphs: ["सुविधा-दर-सुविधा, यह है वह पूरी सूची जो हम माँगते हैं:"],
        bullets: [
          "<strong>कुंडली, मिलान, पंचांग, मुहूर्त और कैलकुलेटर टूल:</strong> जन्म तिथि, जन्म समय, जन्म स्थान और जहाँ टूल माँगे, वहाँ लिंग। इन विवरणों का उपयोग आपका परिणाम गणित करने के लिए होता है <strong>और हमारे डेटाबेस में संग्रहीत नहीं किए जाते</strong> — गणना होती है, परिणाम आपको दिखता है, और विवरण हमारे सर्वर पर सहेजे नहीं जाते (शहर-नाम खोजें सार्वजनिक संदर्भ-डेटा के रूप में कैश होती हैं, उनका आपसे कोई संबंध नहीं जुड़ता)।",
          "<strong>परामर्श बुकिंग अनुरोध:</strong> आपका नाम, फ़ोन नंबर, ईमेल पता (वैकल्पिक), परामर्श का विषय, पसंदीदा तिथि और समय, और आपका संदेश। इस चरण में बुकिंग फ़ॉर्म के ज़रिए जन्म विवरण एकत्र नहीं किए जाते; जब हम ज्योतिषी की तैयारी के लिए उन्हें जोड़ेंगे, वे केवल एक अलग, स्पष्ट सहमति चिह्न के पीछे ही लिए जाएँगे — कभी मान लिए नहीं जाएँगे।",
          "<strong>पूजा बुकिंग अनुरोध:</strong> आपका नाम, फ़ोन नंबर, ईमेल पता (वैकल्पिक), गोत्र (यदि आप देना चुनें), पसंदीदा तिथि, स्थान, भाषा और संदेश।",
          "<strong>न्यूज़लेटर:</strong> केवल आपका ईमेल पता। आप किसी भी समय सदस्यता रद्द कर सकते हैं।",
          "<strong>साइट प्रशासक:</strong> टीम खातों में एक ईमेल पता और सुरक्षित रूप से हैश किया गया पासवर्ड होता है। व्योतिष पर कोई सार्वजनिक उपयोगकर्ता खाता नहीं है — बिना साइनअप आप हर टूल चला सकते हैं।",
          "<strong>तकनीकी और सुरक्षा डेटा:</strong> सर्वर अनुरोध लॉग (IP पता, ब्राउज़र प्रकार, समय-चिह्न) जो साइट को चालू और सुरक्षित रखने के लिए हमारे होस्टिंग और सुरक्षा ढाँचे द्वारा प्रोसेस किए जाते हैं।",
          "<strong>विश्लेषण (Analytics):</strong> यदि — और केवल यदि — आप विश्लेषण स्वीकार करते हैं, तो हम Google Analytics 4 का उपयोग समग्र, गैर-विज्ञापन रूप में करते हैं। आपके स्पष्ट स्वीकार से पहले विश्लेषण से जुड़ी कोई चीज़ लोड नहीं होती। हम विज्ञापन ट्रैकर नहीं चलाते और डेटा नहीं बेचते।",
        ],
      },
      {
        id: "purposes",
        heading: "इसका उपयोग हम किस लिए करते हैं",
        paragraphs: ["हम व्यक्तिगत डेटा केवल इन घोषित उद्देश्यों के लिए प्रोसेस करते हैं:"],
        bullets: [
          "आपके माँगे कुंडली चार्ट, मिलान स्कोर, पंचांग, मुहूर्त या कैलकुलेटर परिणाम की गणना।",
          "आपके अनुरोधित परामर्श या पूजा सेवाओं की स्थापना और प्रदान।",
          "आपके संदेशों, सुधारों और सहायता अनुरोधों के उत्तर।",
          "आपकी सदस्यता वाला न्यूज़लेटर भेजना।",
          "साइट को सुरक्षित रखना — दुरुपयोग की पहचान, स्वचालित ट्रैफ़िक पर दर-सीमा और खातों की सुरक्षा।",
          "ऐसे समग्र उपयोग पैटर्न के आधार पर सामग्री की गुणवत्ता सुधारना जो आपकी पहचान नहीं करते।",
        ],
      },
      {
        id: "consent",
        heading: "सहमति और वह हम कैसे लेते हैं",
        paragraphs: [
          "ऊपर वर्णित व्यक्तिगत डेटा के लिए हम आपकी सहमति पर निर्भर हैं। DPDP अधिनियम (धारा 6) के अनुसार सहमति स्वतंत्र, विशिष्ट, सूचित, बिना शर्त और असंदिग्ध होनी चाहिए, किसी स्पष्ट सकारात्मक क्रिया से दी गई — इसीलिए हमारे फ़ॉर्म अलग, अनचिह्नित चेकबॉक्स रखते हैं, और जब परामर्शों के लिए जन्म विवरण जोड़े जाएँगे तो वे पूर्व-चिह्नित बॉक्स की जगह अपना स्पष्ट सहमति बॉक्स रखेंगे।",
          'आप किसी भी समय <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> पर लिखकर सहमति वापस ले सकते हैं — सहमति देना जितना सरल है, वापस लेना भी उतना ही। वापसी पर हम युक्तियुक्त समय में आपके डेटा की प्रोसेसिंग रोक देते हैं (और अपने सेवा-प्रदाताओं को भी वही करने का निर्देश देते हैं), केवल वही रखते हैं जो कोई अन्य कानून माँगता है या सुरक्षा अभिलेखों के लिए चाहिए।',
          "आप लगभग पूरी साइट — चार्ट, पंचांग, मुहूर्त, कैलकुलेटर, ब्लॉग — बिना कोई व्यक्तिगत डेटा दिए भी देख सकते हैं।",
        ],
      },
      {
        id: "sharing",
        heading: "डेटा हम किसके साथ साझा करते हैं",
        paragraphs: [
          "हम आपका व्यक्तिगत डेटा कभी बेचते या किराए पर नहीं देते। केवल वहीं साझा करते हैं जहाँ काम को आवश्यकता हो, इनके साथ:",
        ],
        bullets: [
          "<strong>हमारे अवसंरचना-प्रदाता, अनुबंध के अंतर्गत:</strong> Supabase (डेटाबेस और प्रमाणीकरण), Cloudflare (वेबसाइट वितरण, सुरक्षा और DDoS संरक्षण), और Google Places API (जन्म स्थान टाइप करते समय शहर-नाम सुझाव — Google को केवल वही अक्षर मिलते हैं जो आप उस फ़ील्ड में टाइप करते हैं)।",
          "<strong>आपके ज्योतिषी या पुजारी:</strong> आपके परामर्श या पूजा की तैयारी और आयोजन के लिए आवश्यक बुकिंग विवरण — बुकिंग में जो है उससे आगे कुछ नहीं।",
          "<strong>Google Analytics 4:</strong> गुमनाम उपयोग-घटनाएँ, केवल तभी जब आपने विश्लेषण स्वीकार किया हो।",
          "<strong>कानूनी प्रकटीकरण:</strong> जहाँ कानून या न्यायालय या सरकारी प्राधिकरण का विधिसम्मत आदेश प्रकटीकरण अपेक्षित करे।",
        ],
      },
      {
        id: "where-data-lives",
        heading: "आपका डेटा कहाँ रहता है",
        paragraphs: [
          "आपका डेटा Supabase के प्रबंधित क्लाउड डेटाबेस में संग्रहीत होता है और Cloudflare के वैश्विक नेटवर्क से परोसा जाता है, जिसमें भारत के बाहर प्रोसेसिंग हो सकती है। DPDP अधिनियम ऐसे सीमा-पार स्थानांतरण की अनुमति देता है, केंद्र सरकार द्वारा प्रतिबंधित देशों को छोड़; ऐसे किसी प्रतिबंध की अधिसूचना होने पर हम उसका सम्मान करेंगे।",
        ],
      },
      {
        id: "retention",
        heading: "हम इसे कितने समय तक रखते हैं",
        bullets: [
          "<strong>परामर्श और पूजा अनुरोध:</strong> अनुरोध बंद होने के बाद 24 मास तक, फिर मिटा दिया जाता है (कानून माँगे तो उससे अधिक)।",
          "<strong>न्यूज़लेटर सदस्यताएँ:</strong> जब तक आप सदस्यता नहीं रद्द करते।",
          "<strong>सुरक्षा और सर्वर लॉग:</strong> हमारी होस्टिंग प्लेटफ़ॉर्म पर अल्प-अवधि के परिचालन लॉग; यदि कभी लंबा संरक्षण आवश्यक हो, हम पहले यहीं उसे लिखेंगे।",
          "<strong>टूल-विवरण (कुंडली, कैलकुलेटर, मिलान):</strong> बिल्कुल संग्रहीत नहीं।",
          "<strong>पंचांग और खगोलीय कैश:</strong> ये तिथि और शहर से कुंजित गणित परिणाम हैं — इनमें कोई व्यक्तिगत डेटा नहीं है।",
        ],
        note: [
          "जब आप हमसे अपना डेटा मिटाने को कहते हैं, या सहमति वापस लेते हैं, तो जहाँ कोई कानून रखने को नहीं कहता वहाँ हम उसे और जल्दी मिटा देते हैं।",
        ],
      },
      {
        id: "security",
        heading: "आपका डेटा हम कैसे सुरक्षित रखते हैं",
        paragraphs: [
          "आज व्योतिष पर लागू सुरक्षा सावधानियाँ (DPDP अधिनियम, धारा 8(5); DPDP नियम, नियम 6):",
        ],
        bullets: [
          "प्रत्येक डेटाबेस तालिका पर Row Level Security सक्रिय है; डेटाबेस सर्विस की केवल सर्वर पर रहती है, आपके ब्राउज़र तक कभी नहीं जाती।",
          "सारा ट्रैफ़िक HTTPS/TLS से एन्क्रिप्टेड रूप में संचारित होता है।",
          "हमारी होस्टिंग प्लेटफ़ॉर्म (Cloudflare) पर न्यूनतम-विशेषाधिकार पहुँच नियंत्रण और पहुँच लॉगिंग।",
          "फ़ॉर्म पर दर-सीमा और दुर्भावनापूर्ण ट्रैफ़िक के विरुद्ध Cloudflare एज-संरक्षण।",
          "हम कार्ड या भुगतान डेटा एकत्र नहीं करते — इस चरण में भुगतान सक्रिय नहीं हैं।",
        ],
        note: [
          "यदि कभी कोई व्यक्तिगत डेटा उल्लंघन आपको प्रभावित करे, हम बिना विलंब आपको सूचित करेंगे — क्या हुआ, संभावित प्रभाव, हम कौन-से कदम उठा रहे हैं और हम तक कैसे पहुँचें — और DPDP नियम के नियम 7 अनुसार 72 घंटों में उल्लंघन की रिपोर्ट भारत डेटा संरक्षण बोर्ड को देंगे।",
        ],
      },
      {
        id: "your-rights",
        heading: "DPDP अधिनियम के अंतर्गत आपके अधिकार",
        bullets: [
          "<strong>पहुँच (धारा 11):</strong> अपने व्यक्तिगत डेटा का सारांश, हम उसे कैसे प्रोसेस करते हैं और किसके साथ साझा किया है, माँग सकते हैं।",
          "<strong>सुधार, पूर्णता, अद्यतन और मिटाना (धारा 12):</strong> अशुद्ध डेटा ठीक करवाएँ या मिटवाएँ, विधिसम्मत संरक्षण-आवश्यकताओं के अधीन।",
          "<strong>सहमति वापसी (धारा 6(4)):</strong> किसी भी समय, उतनी ही आसानी से जितनी आपने दी थी।",
          "<strong>नामांकन (धारा 14):</strong> यदि आप स्वयं असमर्थ हों या आपकी मृत्यु हो जाए, तो किसी अन्य व्यक्ति को आपके अधिकारों का प्रयोग करने हेतु नामित कर सकते हैं।",
          "<strong>शिकायत निवारण (धारा 13):</strong> पहले हमसे शिकायत करें; संतुष्ट न हों तो भारत डेटा संरक्षण बोर्ड के पास जाएँ।",
        ],
        note: [
          'कोई भी अधिकार प्रयोग करने के लिए <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a> पर उसी ईमेल पते से लिखें जो आपने हमारे साथ उपयोग किया था (या अपना बुकिंग संदर्भ साथ दें)। कार्य करने से पहले हम आपकी पहचान सत्यापित करते हैं — जिस डेटा से आपको जोड़ न सकें उस पर हम अनुरोध नहीं चलाते।',
        ],
      },
      {
        id: "children",
        heading: "बालक",
        paragraphs: [
          "DPDP अधिनियम के अनुसार 18 वर्ष से कम आयु का प्रत्येक व्यक्ति बालक है। हम बालक के माता-पिता या विधिक संरक्षक की सत्यापन-योग्य सहमति के बिना, जानते हुए, बालक का व्यक्तिगत डेटा प्रोसेस नहीं करते। यदि कोई बुकिंग या फ़ॉर्म सबमिशन व्यक्ति को बालक दर्शाए, हम सत्यापन-योग्य अभिभावक सहमति माँगेंगे — या डेटा मिटा देंगे। हम बालकों को लक्षित विज्ञापन से कभी ट्रैक या निर्देशित नहीं करते।",
        ],
      },
      {
        id: "grievance",
        heading: "शिकायत संपर्क",
        paragraphs: [
          '<strong>शिकायत अधिकारी, Vyotish</strong> — ईमेल: <a href="mailto:vyotish@gmail.com">vyotish@gmail.com</a>।',
          'हर शिकायत को आते ही स्वीकार करते हैं और <strong>30 दिनों</strong> के भीतर उत्तर देते हैं। किसी भी स्थिति में उत्तर-अवधि 90 दिनों से अधिक नहीं होगी — DPDP नियम (नियम 14) के अंतर्गत अनुमत अधिकतम प्रकाशित अवधि। यह संपर्क उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 के अंतर्गत उपभोक्ता शिकायतें भी संभालता है — सेवा-संबंधी विषयों के लिए हमारा <a href="/hi/refund">रिफ़ंड और रद्दीकरण</a> पृष्ठ देखें।',
          "हमारे उत्तर से संतुष्ट न होने पर आप DPDP अधिनियम के अंतर्गत स्थापित <strong>भारत डेटा संरक्षण बोर्ड</strong> के पास जा सकते हैं, वह परिचालित होने के बाद।",
        ],
      },
      {
        id: "changes",
        heading: "इस नीति में परिवर्तन",
        paragraphs: [
          "इस नीति का हर संशोधन हम परिवर्तन की तिथि के साथ इसी पृष्ठ पर प्रकाशित करते हैं। यदि कोई परिवर्तन आपके पहले दिए डेटा के उपयोग को ठोस रूप से प्रभावित करे, तो जहाँ DPDP अधिनियम अपेक्षित करे हम आपकी नई सहमति लेंगे।",
        ],
      },
    ],
  },
};
