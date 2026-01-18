
export type Language = 'fr' | 'en' | 'ar';

export const translations = {
  fr: {
    navbar: {
      init: "INITIALISER",
      sim: "Simulation",
      expertise: "Expertise",
      ranks: "Progression",
      faq: "FAQ",
      beta: "BÊTA"
    },
    hero: {
      badge: "Moteur IA // EN LIGNE",
      headline: "L'erreur simulée est",
      headline_highlight: "une chance d'apprendre.",
      subtext: "Le premier simulateur de médecine d'urgence haute fidélité propulsé par l'IA générative. Diagnostiquez, traitez et stabilisez des patients virtuels en temps réel.",
      btn_start: "LANCER SIMULATION",
      btn_initializing: "CONNEXION...",
      btn_tutorial: "VOIR DÉMO",
      social_proof: "Étudiants en médecine & internes formés",
      mode_title: "Mode de Simulation",
      cat_title: "Catégorie de Scénario"
    },
    modes: {
      geste: "Geste de Secours",
      ambulance: "Ambulance / SMUR",
      dechocage: "Déchocage / Réa"
    },
    categories: {
      medical: "Urgence Médicale",
      surgical: "Chirurgicale",
      pediatric: "Pédiatrique"
    },
    monitor: {
      live: "MONITEUR EN DIRECT",
      standby: "EN ATTENTE",
      waiting: "Initialisation du patient virtuel..."
    },
    features: {
      problem_title: "LE PROBLÈME",
      problem_text: "Les manuels ne crient pas de douleur. Les QCM ne font pas d'arrêt cardiaque.",
      solution_title: "LA SOLUTION",
      solution_text: "Doctiplay introduit le stress, la pression du temps et l'incertitude dans votre formation—sans risque pour les patients réels.",
      f1_title: "Physiologie Temps Réel",
      f1_desc: "Les constantes réagissent dynamiquement à vos médicaments et interventions. Pas de chemins scriptés—que de la physiologie pure.",
      f2_title: "Diagnostic Caché",
      f2_desc: "Le patient n'arrive pas avec une étiquette. Utilisez le dossier, l'examen et les labos pour découvrir la vérité.",
      f3_title: "Interaction Vocale",
      f3_desc: "Parlez à votre patient avec notre interface vocale avancée. Faites l'anamnèse. Appelez un spécialiste. Contrôle vocal totalement immersif.",
      f4_title: "Débriefing Détaillé",
      f4_desc: "Chaque seconde est analysée. Obtenez un score granulaire sur le Diagnostic, la Prise en charge et la Sécurité."
    },
    gamification: {
      title: "Progression & Rangs",
      subtitle: "De l'étudiant au chef de clinique",
      rank_student: "Externe",
      rank_intern: "Interne",
      rank_pro: "Praticien",
      badges_title: "Succès Déverrouillables",
      b1: "Sauveur de Vie",
      b2: "Diagnosticien",
      b3: "Maître du Sang-Froid"
    },
    testimonials: {
      badge: "Excellence Académique",
      title: "Approuvé par les Institutions",
      t1: "Le réalisme de la détérioration du patient est inégalé. Cela a forcé mes étudiants à réfléchir rapidement plutôt que de réciter des manuels.",
      t1_author: "Dr. Sarah L.",
      t1_role: "Instructrice Clinique",
      t2: "Enfin un outil qui se concentre sur le raisonnement clinique. Le rapport m'a aidé à comprendre exactement où mon diagnostic était faux.",
      t2_author: "James M.",
      t2_role: "Étudiant (4e année)",
      t3: "Nous avons implémenté Doctiplay pour notre résidence. Les scores de sécurité ont augmenté de 40%.",
      t3_author: "Elena R.",
      t3_role: "Simulation Director"
    },
    faq: {
      badge: "Support & Informations",
      question_fallback: "Question non définie",
      title: "FAQs",
      q1: "Comment la physiologie du patient est-elle simulée ?",
      a1: "Nous utilisons un moteur pharmacodynamique assisté par IA et physiologique qui réagit en temps réel à vos actions (médicaments, oxygène, massages).",
      q2: "Quels types de cas cliniques sont disponibles ?",
      a2: "La bibliothèque couvre les urgences cardiovasculaires, respiratoires, traumatologiques et pédiatriques, du cas simple au choc complexe.",
      q3: "Ce simulateur remplace-t-il les mannequins de simulation ?",
      a3: "Il complète la simulation physique en offrant un entraînement cognitif et décisionnel illimité, accessible partout et à tout moment.",
      q4: "Les protocoles médicaux sont-ils à jour ?",
      a4: "Oui, nos scénarios sont basés sur les dernières recommandations internationales (ERC, AHA, SFMU) et sont régulièrement révisés par des experts.",
      q5: "How are errors handled in the simulation ?",
      a5: "Le patient se détériore de manière réaliste selon vos erreurs, permettant un apprentissage par l'échec sécurisé, suivi d'un débriefing constructif.",
      q6: "Peut-on utiliser Doctiplay pour des examens (ECOS) ?",
      a6: "Absolument. Le système de scoring objectif permet d'évaluer les compétences de raisonnement clinique de manière standardisée.",
      q7: "L'interaction avec le patient est-elle réaliste ?",
      a7: "Grâce au contrôle vocal, vous parlez directement au patient pour l'anamnèse, créant une immersion bien plus forte qu'un simple clic.",
      q8: "Est-il possible de greffer ses propres scénarios ?",
      a8: "Les institutions partenaires ont accès à un éditeur permettant de concevoir des cas spécifiques à leurs besoins pédagogiques.",
      q9: "Comment la progression des étudiants est-elle suivie ?",
      a9: "Un tableau de bord détaillé permet aux enseignants de suivre l'évolution des scores, d'identifier les lacunes et d'adapter leurs cours.",
      q10: "Quels sont les prérequis techniques ?",
      a10: "Une simple connexion internet et un navigateur moderne suffisent. L'application est optimisée pour PC, tablettes et smartphones."
    },
    partnership: {
      badge: "Collaboration Académique",
      title: "Réseau de Confiance",
      subtitle: "Collaboration avec les meilleures institutions pour garantir l'excellence.",
      cta: "Devenir Partenaire"
    },
    imageGen: {
      title: "Générateur de Cas",
      subtitle: "Créez des visuels médicaux haute-fidélité pour vos scénarios de simulation.",
      promptPlaceholder: "Décrivez la scène (ex: Salle d'urgence, patient polytraumatisé...)",
      sizeLabel: "Résolution & Qualité",
      billingNote: "Nécessite une clé API payante.",
      loading: "Génération...",
      generateBtn: "Générer l'image",
      error: "Erreur lors de la génération. Vérifiez votre clé API."
    },
    footer: {
      tagline: "Réinventer la formation médicale critique à travers l'IA. Maîtrisez le stress, sauvez des vies.",
      contact_label: "Nous contacter",
      contact_action: "EMAIL SUPPORT",
      partnership_label: "Collaboration",
      partnership_action: "PARTENARIATS STRATÉGIQUES",
      disclaimer: "AVIS DE NON-RESPONSABILITÉ MÉDICALE : Cette application est un outil éducatif destiné uniquement aux professionnels de santé et étudiants. Elle ne constitue pas un avis médical et ne doit pas être utilisée pour le diagnostic ou le traitement de patients réels.",
      links: "Liens Rapides",
      privacy: "Confidentialité",
      contact: "Contact",
      copyright: "© 2025 Doctiplay. Tous droits réservés.",
      oath_title: "Serment d'Hippocrate & Éthique",
      oath_principles: [
        "D’abord, ne pas nuire (Primum non nocere)",
        "Agir pour le bien du patient (Bienfaisance)",
        "Respect de la personne et de son autonomie",
        "Équité et justice dans les soins",
        "Secret professionnel et confidentialité absolue"
      ]
    },
    prompt: {
      system: "Vous êtes le système d'exploitation d'un moniteur médical de haute technologie. Générez une séquence de journaux réalistes et à haute tension pour un patient dans un état critique (par exemple, arrêt cardiaque, traumatisme ou choc septique). Sortez UNIQUEMENT les journaux. Pas de formatage markdown. Un journal par ligne. Format : '>> [HH:MM:SS] [CATÉGORIE] Message'. Utilisez le jargon médical technique en FRANÇAIS. Faites dégrader rapidement les constantes vitales."
    },
    hero_extended: {
      subtext_full: "Doctiplay transforme la formation critique en expériences immersives de haute-fidélité. Maîtrisez l'imprévisible, sans aucun risque patient.",
      btn_command: "COMMANDER L'IA",
      btn_start_now: "LANCER MAINTENANT",
      debrief: {
        title: "Debriefing IA",
        subtitle: "Analyse en temps réel des performances cliniques.",
        items: [
          "Sécurité et priorisation",
          "Raisonnement du diagnostique",
          "Prise en charge",
          "Communication et chronologie des gestes"
        ]
      },
      sensor: {
        label: "Capteur Bio-Actif",
        status: "SpO2 OPTIMAL"
      }
    },
    features_extended: {
      badge: "Innovation Clinique",
      main_title: "L'Expertise Doctiplay",
      main_desc: "Une technologie de pointe pour simuler chaque nuance de la médecine d'urgence.",
      toggle: {
        show: "En savoir plus",
        hide: "Masquer"
      }
    },
    gamification_extended: {
      system_badge: "Système de Carrière",
      description: "Gagnez de l'expérience, montez en grade et débloquez des distinctions prestigieuses.",
      rank_current: "ACTUEL",
      gallery_btn: "VOIR GALERIE",
      gallery_modal: {
        title: "Collection de Succès",
        subtitle: "Votre palmarès de distinctions cliniques Doctiplay.",
        footer: "Plus de succès à venir lors de la prochaine mise à jour."
      },
      badges: {
        subtitle: "Gagnez des succès spécifiques pour booster votre score clinique",
        desc_zip: "RCR Réussie 100%",
        desc_filesearch: "5 Diagnostics Parfaits",
        desc_shield: "Maîtrise du Stress",
        expert_reanim: "Expert Réanimateur",
        desc_expert_reanim: "10 arrêts cardiaques stabilisés",
        oeil_lynx: "Oeil de Lynx",
        desc_oeil_lynx: "Détection d'une pathologie rare",
        vitesse_eclair: "Vitesse Éclair",
        desc_vitesse_eclair: "Intervention en moins de 60s",
        maitre_orateur: "Maître Orateur",
        desc_maitre_orateur: "Communication équipe parfaite",
        major_promo: "Major de Promo",
        desc_major_promo: "Score de 100/100 au débriefing",
        precision_chir: "Précision Chirurgicale",
        desc_precision_chir: "Gestes invasifs sans erreur"
      }
    },
    monitor_extended: {
      system_log_label: "Sortie du Journal Système"
    },
    partnership_drawer: {
      title: "Partenariat Stratégique",
      success_title: "Message Envoyé",
      success_message: "Merci pour votre intérêt. Notre équipe stratégique vous contactera sous peu.",
      header_badge: "Collaboration Core v1.0",
      labels: {
        name: "Nom Complet",
        email: "Email Professionnel",
        institution: "Institution / Organisation",
        role: "Fonction / Rôle",
        message: "Votre Message"
      },
      placeholders: {
        name: "Jean Dupont",
        email: "contact@institution.com",
        institution: "Faculté de Médecine...",
        role: "Directeur de Simulation...",
        message: "Parlez-nous de votre projet de collaboration..."
      },
      btn_submit: "Initialiser Contact",
      footer: "Doctiplay Strategic Division // © 2025"
    },
    contact_drawer: {
      title: "Contact Support",
      success_title: "Message Envoyé",
      success_message: "Notre équipe de support a bien reçu votre demande.",
      header_badge: "Support System v1.0",
      labels: {
        name: "Nom Complet",
        email: "Email de Contact",
        message: "Comment pouvons-nous aider ?"
      },
      placeholders: {
        name: "Jean Dupont",
        email: "jean@exemple.com",
        message: "Décrivez votre problème ou question..."
      },
      btn_submit: "Envoyer Message",
      footer: "Doctiplay Support Team // © 2025"
    }
  },
  en: {
    navbar: {
      init: "INITIALIZE",
      sim: "Simulation",
      expertise: "Expertise",
      ranks: "Ranks",
      faq: "FAQ",
      beta: "BETA"
    },
    hero: {
      badge: "AI Engine // ONLINE",
      headline: "Bridge the Gap Between",
      headline_highlight: "Theory & Reality.",
      subtext: "The first high-fidelity emergency medicine simulator powered by Generative AI. Diagnose, treat, and stabilize virtual patients in real-time.",
      btn_start: "START SIMULATION",
      btn_initializing: "CONNECTING...",
      btn_tutorial: "VIEW DEMO",
      social_proof: "Medical students & residents trained",
      mode_title: "Simulation Mode",
      cat_title: "Scenario Category"
    },
    modes: {
      geste: "Emergency Gestures",
      ambulance: "Ambulance / EMS",
      dechocage: "Resuscitation / ER"
    },
    categories: {
      medical: "Medical Emergency",
      surgical: "Surgical",
      pediatric: "Pediatric"
    },
    monitor: {
      live: "LIVE MONITOR",
      standby: "STANDBY",
      waiting: "Initializing virtual patient..."
    },
    features: {
      problem_title: "THE PROBLEM",
      problem_text: "Textbooks don't scream in pain. Multiple choice questions don't flatline.",
      solution_title: "THE SOLUTION",
      solution_text: "Doctiplay introduces stress, time pressure, and uncertainty into your training—without the risk to real patients.",
      f1_title: "Real-Time Physiology",
      f1_desc: "Vitals react dynamically to your drugs and interventions. No scripted paths—pure physiology.",
      f2_title: "Hidden Diagnosis",
      f2_desc: "The patient doesn't come with a label. Use the chart, exam, and labs to uncover the truth.",
      f3_title: "Voice Interaction",
      f3_desc: "Talk to your patient with our advanced voice AI. Take a history. Call a specialist. Fully immersive voice control.",
      f4_title: "Detailed Debriefing",
      f4_desc: "Every second is analyzed. Get a granular score on Diagnostics, Management, and Safety."
    },
    gamification: {
      title: "Progression & Ranks",
      subtitle: "From Student to Attending",
      rank_student: "Student",
      rank_intern: "Resident",
      rank_pro: "Attending",
      badges_title: "Unlockable Badges",
      b1: "Life Saver",
      b2: "Diagnostician",
      b3: "Ice in Veins"
    },
    testimonials: {
      badge: "Academic Excellence",
      title: "Trusted by Institutions",
      t1: "The realism of the patient deterioration is unmatched. It forced my students to think on their feet rather than just recite textbook answers.",
      t1_author: "Dr. Sarah L.",
      t1_role: "Clinical Instructor",
      t2: "Finally a tool that focuses on clinical reasoning. The feedback report helped me understand exactly where my diagnosis went wrong.",
      t2_author: "James M.",
      t2_role: "Med Student (Year 4)",
      t3: "We implemented Doctiplay for our nursing residency. The safety scores have improved by 40% in just two months.",
      t3_author: "Elena R.",
      t3_role: "Simulation Director"
    },
    faq: {
      badge: "Support & Info",
      question_fallback: "Undefined Question",
      title: "FAQs",
      q1: "How is patient physiology simulated?",
      a1: "We use a pharmacodynamic and physiological engine that reacts in real-time to your actions (medications, oxygen, compressions).",
      q2: "What types of clinical cases are available?",
      a2: "The library covers cardiovascular, respiratory, trauma, and pediatric emergencies, from simple cases to complex shock.",
      q3: "Does this replace simulation mannequins?",
      a3: "It complements physical simulation by offering unlimited cognitive and decisional training, accessible anywhere, anytime.",
      q4: "Are medical protocols up to date?",
      a4: "Yes, our scenarios are based on the latest international guidelines (ERC, AHA, SFMU) and are regularly reviewed by experts.",
      q5: "How are errors handled in the simulation?",
      a5: "The patient deteriorates realistically based on your mistakes, allowing for safe learning through failure, followed by constructive debriefing.",
      q6: "Can Doctiplay be used for exams (OSCEs)?",
      a6: "Absolutely. The objective scoring system allows for standardized assessment of clinical reasoning skills.",
      q7: "Is interaction with the patient realistic?",
      a7: "Thanks to voice control, you speak directly to the patient for history taking, creating much stronger immersion than simple clicking.",
      q8: "Can I create my own scenarios?",
      a8: "Partner institutions have access to an editor to design specific cases for their pedagogical needs.",
      q9: "How is student progress tracked?",
      a9: "A detailed dashboard allows instructors to track score evolution, identify gaps, and adapt their teaching.",
      q10: "What are the technical requirements?",
      a10: "A simple internet connection and a modern browser are enough. The app is optimized for PCs, tablets, and smartphones."
    },
    partnership: {
      badge: "Academic Collaboration",
      title: "Trusted Network",
      subtitle: "Collaborating with top institutions to ensure excellence.",
      cta: "Become a Partner"
    },
    imageGen: {
      title: "Case Generator",
      subtitle: "Create high-fidelity medical visuals for your simulation scenarios.",
      promptPlaceholder: "Describe the scene (e.g., ER room, polytrauma patient...)",
      sizeLabel: "Resolution & Quality",
      billingNote: "Requires a paid API key.",
      loading: "Generating...",
      generateBtn: "Generate Image",
      error: "Error during generation. Check your API key."
    },
    footer: {
      tagline: "Reinventing critical medical training through AI. Master stress, save lives.",
      contact_label: "Contact Us",
      contact_action: "EMAIL SUPPORT",
      partnership_label: "Collaboration",
      partnership_action: "STRATEGIC PARTNERSHIPS",
      disclaimer: "MEDICAL DISCLAIMER: This application is an educational tool intended for healthcare professionals and students only. It does not constitute medical advice and must not be used for the diagnosis or treatment of real patients.",
      links: "Quick Links",
      privacy: "Confidentiality",
      contact: "Contact",
      copyright: "© 2025 Doctiplay. All rights reserved.",
      oath_title: "Hippocratic Oath & Ethics",
      oath_principles: [
        "First, do no harm (Primum non nocere)",
        "Act in the best interest of the patient (Beneficence)",
        "Respect for autonomy and personhood",
        "Justice and fairness in care",
        "Professional secrecy and absolute confidentiality"
      ]
    },
    prompt: {
      system: "You are the operating system of a high-tech medical monitor. Generate a sequence of realistic, high-tension logs for a patient in critical condition (e.g., cardiac arrest, trauma, or septic shock). Output ONLY the logs. No markdown formatting. One log per line. Format: '>> [HH:MM:SS] [CATEGORY] Message'. Use technical medical jargon in ENGLISH. Make vitals degrade rapidly."
    },
    hero_extended: {
      subtext_full: "Doctiplay transforms critical training into high-fidelity immersive experiences. Master the unpredictable, without any patient risk.",
      btn_command: "ORDER AI",
      btn_start_now: "LAUNCH NOW",
      debrief: {
        title: "AI Debriefing",
        subtitle: "Real-time analysis of clinical performance.",
        items: [
          "Safety and Prioritization",
          "Diagnostic Reasoning",
          "Management",
          "Communication and Gesture Timing"
        ]
      },
      sensor: {
        label: "Bio-Active Sensor",
        status: "OPTIMAL SpO2"
      }
    },
    features_extended: {
      badge: "Clinical Innovation",
      main_title: "The Doctiplay Expertise",
      main_desc: "Cutting-edge technology to simulate every nuance of emergency medicine.",
      toggle: {
        show: "Learn More",
        hide: "Hide"
      }
    },
    gamification_extended: {
      system_badge: "Career System",
      description: "Gain experience, rank up, and unlock prestigious distinctions.",
      rank_current: "CURRENT",
      gallery_btn: "VIEW GALLERY",
      gallery_modal: {
        title: "Achievement Collection",
        subtitle: "Your list of Doctiplay clinical distinctions.",
        footer: "More achievements coming in the next update."
      },
      badges: {
        subtitle: "Earn specific achievements to boost your clinical score",
        desc_zip: "Successful CPR 100%",
        desc_filesearch: "5 Perfect Diagnoses",
        desc_shield: "Stress Mastery",
        expert_reanim: "Resuscitation Expert",
        desc_expert_reanim: "10 stabilized cardiac arrests",
        oeil_lynx: "Eagle Eye",
        desc_oeil_lynx: "Rare pathology detection",
        vitesse_eclair: "Lightning Speed",
        desc_vitesse_eclair: "Intervention in under 60s",
        maitre_orateur: "Master Orator",
        desc_maitre_orateur: "Perfect team communication",
        major_promo: "Valedictorian",
        desc_major_promo: "100/100 debriefing score",
        precision_chir: "Surgical Precision",
        desc_precision_chir: "Error-free invasive procedures"
      }
    },
    monitor_extended: {
      system_log_label: "System Log Output"
    },
    partnership_drawer: {
      title: "Strategic Partnership",
      success_title: "Message Sent",
      success_message: "Thank you for your interest. Our strategic team will contact you shortly.",
      header_badge: "Collaboration Core v1.0",
      labels: {
        name: "Full Name",
        email: "Professional Email",
        institution: "Institution / Organization",
        role: "Title / Role",
        message: "Your Message"
      },
      placeholders: {
        name: "John Doe",
        email: "contact@institution.com",
        institution: "Medical School...",
        role: "Simulation Director...",
        message: "Tell us about your collaboration project..."
      },
      btn_submit: "Initiate Contact",
      footer: "Doctiplay Strategic Division // © 2025"
    },
    contact_drawer: {
      title: "Contact Support",
      success_title: "Message Sent",
      success_message: "Our support team has received your request.",
      header_badge: "Support System v1.0",
      labels: {
        name: "Full Name",
        email: "Contact Email",
        message: "How can we help?"
      },
      placeholders: {
        name: "John Doe",
        email: "john@example.com",
        message: "Describe your issue or question..."
      },
      btn_submit: "Send Message",
      footer: "Doctiplay Support Team // © 2025"
    }
  },
  ar: {
    navbar: {
      init: "تهيئة",
      sim: "محاكاة",
      expertise: "خبرة",
      ranks: "رتب",
      faq: "الأسئلة الشائعة",
      beta: "تجريبي"
    },
    hero: {
      badge: "محرك الذكاء الاصطناعي // متصل",
      headline: "سد الفجوة بين",
      headline_highlight: "النظرية والواقع.",
      subtext: "أول محاكي لطب الطوارئ عالي الدقة مدعوم بالذكاء الاصطناعي التوليدي. قم بالتشخيص والعلاج وتحقيق الاستقرار للمرضى الافتراضيين في الوقت الفعلي.",
      btn_start: "بدء المحاكاة",
      btn_initializing: "جاري الاتصال...",
      btn_tutorial: "عرض تجريبي",
      social_proof: "طالب طب ومقيم تم تدريبهم",
      mode_title: "وضع المحاكاة",
      cat_title: "فئة السيناريو"
    },
    modes: {
      geste: "الإسعافات الأولية",
      ambulance: "سيارة إسف",
      dechocage: "غرفة الإنعاش"
    },
    categories: {
      medical: "طوارئ طبية",
      surgical: "جراحية",
      pediatric: "طب الأطفال"
    },
    monitor: {
      live: "مراقبة حية",
      standby: "استعداد",
      waiting: "جاري تهيئة المريض الافتراضي..."
    },
    features: {
      problem_title: "المشكلة",
      problem_text: "الكتب المدرسية لا تصرخ من الألم. أسئلة الاختيار من متعدد لا تتوقف قلوبها.",
      solution_title: "الحل",
      solution_text: "Doctiplay يقدم التوتر وضغط الوقت وعدم اليقين في تدريبك—دون المخاطرة بالمرضى الحقيقيين.",
      f1_title: "فسيولوجيا في الوقت الحقيقي",
      f1_desc: "تتفاعل العلامات الحيوية ديناميكيًا avec أدويتك وتدخلاتك. لا مسارات مكتوبة مسبقًا—فسيولوجيا بحتة.",
      f2_title: "تشخيص مخفي",
      f2_desc: "المريض لا يأتي بملصق. استخدم المخطط والفحص والمختبرات لكشف الحقيقة.",
      f3_title: "التفاعل الصوتي",
      f3_desc: "تحدث إلى مريضك باستخدام الذكاء الاصطناعي الصوتي المتقدم لدينا. خذ التاريخ المرضي. اتصل بأخصائي. تحكم صوتي غامر بالكامل.",
      f4_title: "استخلاص معلومات مفصل",
      f4_desc: "يتم تحليل كل ثانية. احصل على درجة دقيقة حول التشخيص والإدارة السلامة."
    },
    gamification: {
      title: "التقدم والرتب",
      subtitle: "من طالب إلى استشاري",
      rank_student: "طالب",
      rank_intern: "مقيم",
      rank_pro: "استشاري",
      badges_title: "أوسمة قابلة للفتح",
      b1: "منقذ الحياة",
      b2: "المشخص",
      b3: "أعصاب فولاذية"
    },
    testimonials: {
      badge: "التميز الأكاديمي",
      title: "محل ثقة المؤسسات",
      t1: "واقعية تدهور حالة المريض لا مثيل لها. أجبرت طلابي على التفكير بسرعة بدلاً من مجرد تسميع الكتب.",
      t1_author: "د. سارة ل.",
      t1_role: "مدربة سريرية",
      t2: "أخيرًا أداة تركز على التفكير السريري. ساعدني التقرير في فهم أين أخطأ تشخيصي بالضبط.",
      t2_author: "جيمس م.",
      t2_role: "طالب طب (سنة 4)",
      t3: "طبقنا Doctiplay في إقامة التمريض لدينا. تحسنت درجات السلامة بنسبة 40% في شهرين فقط.",
      t3_author: "إيلينا ر.",
      t3_role: "مديرة المحاكاة"
    },
    faq: {
      badge: "الدعم والمعلومات",
      question_fallback: "سؤال غير محدد",
      title: "الأسئلة الشائعة",
      q1: "كيف يتم محاكاة فسيولوجيا المريض؟",
      a1: "نحن نستخدم محركًا دوائيًا وفسيولوجيًا يتفاعل في الوقت الفعلي مع أفعالك (الأدوية، الأكسجين، التدليك).",
      q2: "ما هي أنواع الحالات السريرية المتاحة؟",
      a2: "تغطي المكتبة حالات الطوارئ القلبية الوعائية والتنفسية والإصابات وطب الأطفال، من الحالات البسيطة إلى الصدمات المعقدة.",
      q3: "هل يحل هذا المحاكي محل دمى المحاكاة؟",
      a3: "إنه يكمل المحاكاة البدنية من خلال توفير تدريب إدراكي واتخاذ قرار غير محدود، متاح في أي مكان وفي أي وقت.",
      q4: "هل البروتوكولات الطبية محدثة؟",
      a4: "نعم، تعتمد سيناريوهاتنا على أحدث التوصيات الدولية (ERC, AHA, SFMU) ويتم مراجعتها بانتظام من قبل خبراء.",
      q5: "كيف يتم التعامل مع الأخطاء في المحاكاة؟",
      a5: "تتدهور حالة المريض بشكل واقعي بناءً على أخطائك، مما يسمح بالتعلم الآمن من خلال الفشل، متبوعًا بجلسة استخلاص معلومات بناءة.",
      q6: "هل يمكن استخدام Doctiplay للامتحانات (ECOS)؟",
      a6: "بالتأكيد. يسمح نظام التقييم الموضوعي بتقييم مهارات التقرار السريري بطريقة موحدة.",
      q7: "هل التفاعل مع المريض واقعي؟",
      a7: "بفضل التحكم الصوتي، تتحدث مباشرة إلى المريض لأخذ التاريخ المرضي، مما يخلق انغماساً أقوى بكثير من مجرد النقر.",
      q8: "هل من الممكن إنشاء سيناريوهات خاصة بي؟",
      a8: "المؤسسات الشريكة لديها وصول إلى محرر يسمح بتصميم حالات خاصة باحتياجاتهم التربوية.",
      q9: "كيف يتم تتبع تقدم الطلاب؟",
      a9: "تتيح لوحة تحكم مفصلة للمعلمين تتبع تطور الدرجات وتحديد الفجوات وتكييف دروسهم.",
      q10: "ما هي المتطلبات التقنية؟",
      a10: "يكفي وجود اتصال بسيط بالإنترنت ومتصفح حديث. التطبيق محسّن لأجهزة الكمبيوتر والأجهزة اللوحية والهواتف الذكية."
    },
    partnership: {
      badge: "التعاون الأكاديمي",
      title: "شبكة موثوقة",
      subtitle: "التعاون مع أفضل المؤسسات لضمان التميز.",
      cta: "كن شريكاً"
    },
    imageGen: {
      title: "مولد الحالات",
      subtitle: "إنشاء صور طبية عالية الدقة لسيناريوهات المحاكاة الخاصة بك.",
      promptPlaceholder: "صِف المشهد (مثلاً: غرفة الطوارئ، مريض مصاب...)",
      sizeLabel: "الدقة والجودة",
      billingNote: "يتطلب مفتاح API مدفوع.",
      loading: "جاري الإنشاء...",
      generateBtn: "إنشاء صورة",
      error: "خطأ أثناء الإنشاء."
    },
    footer: {
      tagline: "إعادة ابتكار التدريب الطبي الحرج من خلال الذكاء الاصطناعي. تحكم في التوتر، أنقذ الأرواح.",
      contact_label: "اتصل بنا",
      contact_action: "دعم البريد الإلكتروني",
      partnership_label: "تعاون",
      partnership_action: "شراكات استراتيجية",
      disclaimer: "إخلاء مسؤولية طبي: هذا التطبيق هو أداة تعليمية مخصصة لمتخصصي الرعاية الصحية والطلاب فقط. ولا يشكل نصيحة طبية ويجب عدم استخدامه لتشخيص أو علاج المرضى الحقيقيين.",
      links: "روابط سريعة",
      privacy: "الخصوصية",
      contact: "اتصل بنا",
      copyright: "© 2025 Doctiplay. جميع الحقوق محفوظة.",
      oath_title: "قسم أبقراط والأخلاق",
      oath_principles: [
        "أولاً، لا تسبب ضرراً (Primum non nocere)",
        "العمل لمصلحة المريض (الإحسان)",
        "احترام استقلالية الشخص وكرامته",
        "المساواة والعدالة في الرعاية",
        "السر المهني والسرية المطلقة"
      ]
    },
    prompt: {
      system: "أنت نظام تشغيل شاشة طبية عالية التقنية. قم بإنشاء سلسلة من السجلات الواقعية وعالية التوتر لمريض في حالة حرجة (مثل السكتة القلبية أو الصدمة أو الصدمة الإنتانية). أخرج السجلات فقط. لا تنسيق ماركداون. سجل واحد في كل سطر. التنسيق: '>> [HH:MM:SS] [الفئة] الرسالة'. استخدم المصطلحات الطبية التقنية باللغة العربية. اجعل العلامات الحيوية تتدهور بسرعة."
    },
    hero_extended: {
      subtext_full: "Doctiplay تحول التدريب الحرج إلى تجارب غامرة عالية الدقة. أتقن ما لا يمكن التنبؤ به، دون أي مخاطرة بالمريض.",
      btn_command: "اطلب الذكاء الاصطناعي",
      btn_start_now: "ابدأ الآن",
      debrief: {
        title: "تحليل الذكاء الاصطناعي",
        subtitle: "تحليل في الوقت الفعلي للأداء السريري.",
        items: [
          "السلامة وتحديد الأولويات",
          "الاستدلال التشخيصي",
          "الإدارة",
          "التواصل وتوقيت الإجراءات"
        ]
      },
      sensor: {
        label: "مستشعر حيوي نشط",
        status: "SpO2 مثالي"
      }
    },
    features_extended: {
      badge: "ابتكار سريري",
      main_title: "خبرة Doctiplay",
      main_desc: "تكنولوجيا متطورة لمحاكاة كل فارق بسيط في طب الطوارئ.",
      toggle: {
        show: "اقرأ المزيد",
        hide: "إخفاء"
      }
    },
    gamification_extended: {
      system_badge: "نظام المسار المهني",
      description: "اكتسب الخبرة، وارتق في الرتب، وافتح تميزات مرموقة.",
      rank_current: "الحالي",
      gallery_btn: "عرض المعرض",
      gallery_modal: {
        title: "مجموعة الإنجازات",
        subtitle: "قائمة أوسمة Doctiplay السريرية الخاصة بك.",
        footer: "المزيد من الإنجازات قادمة في التحديث القادم."
      },
      badges: {
        subtitle: "اكسب إنجازات محددة لتعزيز درجاتك السريرية",
        desc_zip: "إنعاش قلبي رئوي ناجح 100%",
        desc_filesearch: "5 تشخيصات مثالية",
        desc_shield: "إتقان الضغط النفسي",
        expert_reanim: "خبير إنعاش",
        desc_expert_reanim: "10 حالات توقف قلبي مستقرة",
        oeil_lynx: "عين الصقر",
        desc_oeil_lynx: "اكتشاف علم أمراض نادر",
        vitesse_eclair: "سرعة البرق",
        desc_vitesse_eclair: "تدخل في أقل من 60 ثانية",
        maitre_orateur: "خطيب بارع",
        desc_maitre_orateur: "تواصل فريق مثالي",
        major_promo: "الأول على الدفعة",
        desc_major_promo: "درجة 100/100 في استخلاص المعلومات",
        precision_chir: "دقة جراحية",
        desc_precision_chir: "إجراءات جراحية خالية من الأخطاء"
      }
    },
    monitor_extended: {
      system_log_label: "مخرجات سجل النظام"
    },
    partnership_drawer: {
      title: "شراكة إستراتيجية",
      success_title: "تم الإرسال بنجاح",
      success_message: "شكراً لاهتمامكم. سيتواصل معكم فريقنا قريباً.",
      header_badge: "Collaboration Core v1.0",
      labels: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني المهني",
        institution: "المؤسسة / المنظمة",
        role: "المسمى الوظيفي / الدور",
        message: "رسالتك"
      },
      placeholders: {
        name: "أحمد محمد",
        email: "contact@institution.com",
        institution: "كلية الطب...",
        role: "مدير المحاكاة...",
        message: "أخبرنا عن مشروع التعاون الخاص بك..."
      },
      btn_submit: "بدء الاتصال",
      footer: "Doctiplay Strategic Division // © 2025"
    },
    contact_drawer: {
      title: "اتصل بالدعم",
      success_title: "تم الإرسال بنجاح",
      success_message: "تلقى فريق الدعم لدينا طلبك.",
      header_badge: "Support System v1.0",
      labels: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        message: "كيف يمكننا المساعدة؟"
      },
      placeholders: {
        name: "أحمد محمد",
        email: "ahmed@example.com",
        message: "صِف مشكلتك أو سؤالك..."
      },
      btn_submit: "إرسال الرسالة",
      footer: "Doctiplay Support Team // © 2025"
    }
  }
};

