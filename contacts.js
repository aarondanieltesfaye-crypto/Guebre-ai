/**
 * Official LGM contact directory, from
 * https://www.guebre-mariam.org/contact/
 * Do not invent emails. Update this file when the school page changes.
 */
(function (root) {
  "use strict";

  var CONTACTS = [
    {
      id: "standard",
      name: "Standard / Accueil",
      email: "",
      phone: "01 11 55 16 03",
      phoneAlt: "+251 11 155 1603",
      group: { fr: "Accueil", en: "Front desk", am: "መቀበያ" },
      role: {
        fr: "Téléphone du standard — Churchill Avenue, B.P. 1496, Addis-Abeba",
        en: "School switchboard — Churchill Avenue, P.O. Box 1496, Addis Ababa",
        am: "የትምህርት ቤት ስልክ — ቸርችል አቬኑ፣ ፒ.ኦ. ቦክስ 1496፣ አዲስ አበባ"
      },
      keywords: "standard accueil telephone switchboard phone front desk Churchill"
    },
    {
      id: "proviseur",
      name: "M. Joseph PALMERI",
      email: "secretariat.proviseur.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Direction", en: "Leadership", am: "አመራር" },
      role: {
        fr: "Proviseur",
        en: "Principal (Proviseur)",
        am: "ዋና ርዕሰ መምህር (Proviseur)"
      },
      keywords: "proviseur principal headmaster direction palmeri joseph directeur"
    },
    {
      id: "assistante-proviseur",
      name: "Mme Andrianina Randranto",
      email: "secretariat.proviseur.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Direction", en: "Leadership", am: "አመራር" },
      role: {
        fr: "Assistante du Proviseur",
        en: "Principal's assistant",
        am: "የርዕሰ መምህሩ ረዳት"
      },
      keywords: "andrianina randranto assistante secretariat proviseur secretary principal"
    },
    {
      id: "laila-said",
      name: "Mme Laïla Saïd",
      email: "laila.said@mlfmonde.org",
      phone: "",
      group: { fr: "Direction", en: "Leadership", am: "አመራር" },
      role: {
        fr: "Adjointe au proviseur — communication avec les parents, les autorités éthiopiennes et l'évènementiel",
        en: "Deputy principal for parent communication, Ethiopian authorities, and events",
        am: "ምክትል ርዕሰ መምህር — ከወላጆች፣ ከኢትዮጵያ ባለሥልጣናት እና ዝግጅቶች ጋር ግንኙነት"
      },
      keywords: "laila said communication parents evenementiel events autorites ethiopiennes deputee adjointe"
    },
    {
      id: "daf",
      name: "Mme Rose CONSTANS",
      email: "secretariat.daf.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Directrice Administrative et Financière (DAF)",
        en: "Administrative and Financial Director (DAF)",
        am: "የአስተዳደርና የፋይናንስ ዳይሬክተር (DAF)"
      },
      keywords: "daf constans rose administrative financiere finance administration intendance"
    },
    {
      id: "compta",
      name: "M. Yoftahay Woldegiorgis",
      email: "yoftahay.woldegiorgis@mlfmonde.org",
      phone: "09 54 07 60 71",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Service comptabilité budgétaire",
        en: "Budget accounting",
        am: "የበጀት ሒሳብ"
      },
      keywords: "yoftahay woldegiorgis comptabilite budget accounting facture paiement"
    },
    {
      id: "caisse",
      name: "M. Fitsum Getachew",
      email: "facturation.addisabeba.lgm@mlfmonde.org",
      phone: "09 43 09 09 92",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Caisse — facturation et paiements",
        en: "Cashier — billing and payments",
        am: "ገንዘብ ያዥ — ሂሳብ እና ክፍያ"
      },
      keywords: "fitsum getachew caisse facturation paiement billing tuition fees cantine mensuel ecolage"
    },
    {
      id: "rh",
      name: "Mme Nathalie Bresson",
      email: "nathalie.bresson@mlfmonde.org",
      phone: "",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Responsable ressources humaines",
        en: "Head of human resources",
        am: "የሰው ኃይል ኃላፊ"
      },
      keywords: "nathalie bresson rh ressources humaines human resources emploi recrutement"
    },
    {
      id: "paye",
      name: "M. Anteneh Zewdie",
      email: "anteneh.zewdie@mlfmonde.org",
      phone: "09 43 09 09 93",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Gestionnaire paye",
        en: "Payroll manager",
        am: "የደመወዝ ኃላፊ"
      },
      keywords: "anteneh zewdie paye payroll salaire"
    },
    {
      id: "assistante-daf",
      name: "Mme Yguebachal Kassa",
      email: "secretariat.daf.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Administration et finances", en: "Admin and finance", am: "አስተዳደርና ፋይናንስ" },
      role: {
        fr: "Assistante administrative de la DAF",
        en: "DAF administrative assistant",
        am: "የDAF አስተዳደራዊ ረዳት"
      },
      keywords: "yguebachal kassa secretariat daf assistante administrative"
    },
    {
      id: "proviseure-adjointe",
      name: "Mme Sandrine DUBOIS",
      email: "secretariat.proviseuradjoint.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Second degré (collège et lycée)", en: "Secondary (collège and lycée)", am: "ሁለተኛ ደረጃ" },
      role: {
        fr: "Proviseure adjointe (collège et lycée)",
        en: "Deputy principal (middle and high school)",
        am: "ምክትል ርዕሰ መምህር (ኮሌጅ እና ሊሴ)"
      },
      keywords: "sandrine dubois proviseure adjointe deputy college lycee secondaire"
    },
    {
      id: "solomon",
      name: "M. Solomon Werkneh",
      email: "secretariat.proviseuradjoint.addisabeba.lgm@mlfmonde.org",
      phone: "",
      group: { fr: "Second degré (collège et lycée)", en: "Secondary (collège and lycée)", am: "ሁለተኛ ደረጃ" },
      role: {
        fr: "Assistant du proviseur adjoint — accueil parents, administration collège/lycée, suivi PAP et PAI, demandes de bourses, traduction et courriers",
        en: "Deputy principal's assistant — parent reception, collège/lycée admin, PAP and PAI follow-up, scholarship requests, translation and mail",
        am: "የምክትል ርዕሰ መምህሩ ረዳት — ወላጆችን መቀበል፣ አስተዳደር፣ PAP/PAI፣ ስኮላርሺፕ"
      },
      keywords: "solomon werkneh bourse scholarship pap pai translation courrier accueil parents administration"
    },
    {
      id: "cpe",
      name: "CPE — Vie scolaire collège et lycée",
      email: "vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org",
      phone: "01 11 55 21 73",
      group: { fr: "Vie scolaire", en: "School life", am: "የትምህርት ሕይወት" },
      role: {
        fr: "Conseillers Principaux d'Éducation (CPE) — vie scolaire du collège et du lycée",
        en: "School-life advisors (CPE) for collège and lycée",
        am: "የትምህርት ሕይወት አማካሪዎች (CPE)"
      },
      keywords: "cpe vie scolaire secondary secondaire absence retard objet trouve daily life school life conseiller"
    },
    {
      id: "tamrat-bekele",
      name: "M. Tamrat Bekele",
      email: "tamrat.bekele@mlfmonde.org",
      phone: "",
      group: { fr: "Vie scolaire", en: "School life", am: "የትምህርት ሕይወት" },
      role: {
        fr: "Vie scolaire — suivi des élèves, admissions au lycée, examens nationaux (8e grade), élections des délégués, emploi du temps de l'équipe",
        en: "School life — student follow-up, lycée admissions, national exams (grade 8), class-delegate elections, team timetable",
        am: "የትምህርት ሕይወት — የተማሪ ክትትል፣ የሊሴ መግቢያ፣ የ8ኛ ክፍል ፈተናዎች"
      },
      keywords: "tamrat bekele admissions lycee examen 8e grade delegues election emploi du temps"
    },
    {
      id: "mersehe",
      name: "M. Mersehe Amdeberhan",
      email: "mersehe.amdeberhan@mlfmonde.org",
      phone: "",
      group: { fr: "Vie scolaire", en: "School life", am: "የትምህርት ሕይወት" },
      role: {
        fr: "Vie scolaire — inscriptions BAC et DNB, Pronote, prévention des discriminations, de l'incivilité, de la violence et du harcèlement",
        en: "School life — BAC and DNB registration, Pronote, prevention of discrimination, incivility, violence and bullying",
        am: "የትምህርት ሕይወት — BAC/DNB፣ Pronote፣ በደል እና ትንኮሳ መከላከል"
      },
      keywords: "mersehe amdeberhan bac dnb pronote harcelement bullying violence discrimination notes bulletin"
    },
    {
      id: "myriam",
      name: "Mme Myriam Tesfaye",
      email: "vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org",
      phone: "01 11 55 21 73",
      group: { fr: "Vie scolaire", en: "School life", am: "የትምህርት ሕይወት" },
      role: {
        fr: "Secrétariat vie scolaire collège et lycée — accueil élèves et parents, absences, EXEAT, certificat de scolarité",
        en: "Collège and lycée school-life office — student and parent reception, absences, EXEAT, school certificates",
        am: "የኮሌጅ/ሊሴ የትምህርት ሕይወት ፀሐፊ — መቅረት፣ EXEAT፣ የትምህርት ማረጋገጫ"
      },
      keywords: "myriam tesfaye secretariat absence retard exeat certificat scolarite accueil eleves parents"
    },
    {
      id: "orientation",
      name: "M. Gilles Depaux",
      email: "gilles.depaux@mlfmonde.org",
      phone: "",
      group: { fr: "Orientation", en: "Guidance", am: "አቅጣጫ" },
      role: {
        fr: "Service orientation et information — études en France, choix de spécialités, conseils individuels, événements d'orientation",
        en: "Guidance office — studies in France, specialty choices, individual advice, orientation events",
        am: "የአቅጣጫ አገልግሎት — በፈረንሳይ ትምህርት፣ ስፔሻሊቲ ምርጫ"
      },
      keywords: "gilles depaux orientation etudes france specialite parcoursup guidance university"
    },
    {
      id: "directrice-primaire",
      name: "Mme Caroline DEWEVER",
      email: "secretariat.directeurprimaire.addisabeba.lgm@mlfmonde.org",
      phone: "01 11 55 21 29",
      group: { fr: "Premier degré (maternelle et élémentaire)", en: "Primary (kindergarten and elementary)", am: "የመጀመሪያ ደረጃ" },
      role: {
        fr: "Directrice de l'école primaire",
        en: "Primary school director",
        am: "የመጀመሪያ ደረጃ ዳይሬክተር"
      },
      keywords: "caroline dewever directrice primaire elementary primary ecole"
    },
    {
      id: "narimane",
      name: "Mme Narimane Bayou",
      email: "secretariat.directeurprimaire.addisabeba.lgm@mlfmonde.org",
      phone: "01 11 55 21 29",
      phoneAlt: "09 30 07 89 26",
      group: { fr: "Premier degré (maternelle et élémentaire)", en: "Primary (kindergarten and elementary)", am: "የመጀመሪያ ደረጃ" },
      role: {
        fr: "Secrétariat de l'école primaire",
        en: "Primary school secretariat",
        am: "የመጀመሪያ ደረጃ ፀሐፊ"
      },
      keywords: "narimane bayou secretariat primaire primary kindergarten maternelle"
    },
    {
      id: "temesgen",
      name: "M. Temesgen Belda",
      email: "vie.scolaire.maternelle.addisabeba.lgm@mlfmonde.org",
      phone: "09 48 05 82 48",
      group: { fr: "Premier degré (maternelle et élémentaire)", en: "Primary (kindergarten and elementary)", am: "የመጀመሪያ ደረጃ" },
      role: {
        fr: "Responsable administratif de la vie scolaire de l'école maternelle",
        en: "Kindergarten school-life administrator",
        am: "የመዋለ ሕጻናት የትምህርት ሕይወት ኃላፊ"
      },
      keywords: "temesgen belda maternelle kindergarten preschool petite moyenne grande section"
    },
    {
      id: "dinkenesh",
      name: "Mme Dinkenesh Geletu",
      email: "dinknesh.geletu@mlfmonde.org",
      phone: "09 65 20 62 04",
      phoneAlt: "09 53 97 23 64",
      emailAlt: "vie.scolaire.primaire.addisabeba.lgm@mlfmonde.org",
      group: { fr: "Premier degré (maternelle et élémentaire)", en: "Primary (kindergarten and elementary)", am: "የመጀመሪያ ደረጃ" },
      role: {
        fr: "Responsable administrative de la vie scolaire de l'école élémentaire. Pour signaler une absence ou un retard : 09 53 97 23 64",
        en: "Elementary school-life administrator. To report an absence or late arrival: 09 53 97 23 64",
        am: "የአንደኛ ደረጃ የትምህርት ሕይወት ኃላፊ። መቅረት ወይም መዘግየት ለማሳወቅ፦ 09 53 97 23 64"
      },
      keywords: "dinkenesh dinknesh geletu elementaire elementary primaire absence retard 09 53 97 23 64"
    },
    {
      id: "infirmerie",
      name: "Infirmerie — Mme Wongel Solomon, Mme Rebecca Zerihun, Mme Lydia Lelessa",
      email: "infirmerie.addisabeba.lgm@mlfmonde.org",
      phone: "01 11 11 44 04",
      group: { fr: "Santé", en: "Health", am: "ጤና" },
      role: {
        fr: "Infirmières de la Cité scolaire. Mme Wongel Solomon suit les PAI (plans d'accompagnement individualisés)",
        en: "School nurses. Ms Wongel Solomon follows PAI (individual care plans)",
        am: "የትምህርት ቤት ነርሶች። ወ/ሮ ወንገል ሰለሞን PAI ይከታተላሉ"
      },
      keywords: "infirmerie infirmiere sante health nurse maladie blessure pai wongel solomon rebecca zerihun lydia lelessa medecin"
    },
    {
      id: "dsi",
      name: "M. Wondwossen Assefa",
      email: "dsi.addisabeba.lgm@mlfmonde.org",
      phone: "09 53 97 23 65",
      group: { fr: "Informatique", en: "IT", am: "ኢንፎርሜሽን" },
      role: {
        fr: "Responsable du service informatique (DSI). Techniciens : Mme Selamawit Mezmur et M. Tamrat",
        en: "Head of IT (DSI). Technicians: Ms Selamawit Mezmur and Mr Tamrat",
        am: "የኢንፎርሜሽን ኃላፊ (DSI)። ቴክኒሻኖች፦ ወ/ሮ ሰላማዊት መዝሙር እና አቶ ታምራት"
      },
      keywords: "wondwossen assefa dsi informatique it wifi ordinateur password mot de passe computer selamawit mezmur tamrat technicien"
    }
  ];

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9@.\u1200-\u137f\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function haystack(c) {
    return norm(
      [c.name, c.email, c.emailAlt, c.phone, c.phoneAlt, c.keywords,
        c.role.fr, c.role.en, c.role.am, c.group.fr, c.group.en, c.group.am].join(" ")
    );
  }

  function searchContacts(query, limit) {
    var q = norm(query);
    if (!q || q.length < 2) return [];
    var parts = q.split(" ").filter(function (p) { return p.length > 1; });
    if (!parts.length) parts = [q];
    var scored = CONTACTS.map(function (c) {
      var h = haystack(c);
      var score = 0;
      parts.forEach(function (p) {
        if (h.indexOf(p) !== -1) score += 3;
        if (norm(c.name).indexOf(p) !== -1) score += 4;
        if (norm(c.email).indexOf(p) !== -1) score += 5;
      });
      if (q.length >= 3 && h.indexOf(q) !== -1) score += 6;
      return { c: c, score: score };
    }).filter(function (x) { return x.score > 0; });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, limit || 6).map(function (x) { return x.c; });
  }

  function pickLang(obj, lang) {
    if (!obj) return "";
    return obj[lang] || obj.fr || "";
  }

  function formatDirectory() {
    return CONTACTS.map(function (c) {
      var line = "- " + c.name + " — " + c.role.fr;
      if (c.email) line += " | email: " + c.email;
      if (c.emailAlt) line += " (aussi " + c.emailAlt + ")";
      if (c.phone) line += " | tél: " + c.phone;
      if (c.phoneAlt) line += " / " + c.phoneAlt;
      return line;
    }).join("\n");
  }

  var api = {
    contacts: CONTACTS,
    search: searchContacts,
    pickLang: pickLang,
    formatDirectory: formatDirectory
  };

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.GUEBRE_DIRECTORY = api;
  root.GUEBRE_CONTACTS = CONTACTS;
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
