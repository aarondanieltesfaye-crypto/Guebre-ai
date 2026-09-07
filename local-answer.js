/**
 * On-device answers from the school directory and calendar.
 * Used when the remote AI is unavailable, and to attach email options.
 */
(function (root) {
  "use strict";

  var CALENDAR = [
    { q: /pre[- ]?rentree|teachers return|መምህራን/i, a: {
      fr: "Prérentrée des enseignants : mardi 1er septembre 2026. Source : calendrier scolaire LGM 2026-2027.",
      en: "Teachers return on Tuesday 1 September 2026. Source: LGM school calendar 2026-2027.",
      am: "መምህራን ማክሰኞ ሴፕቴምበር 1 ቀን 2026 ይመለሳሉ። ምንጭ፦ የLGM የዘመን ሰሌዳ 2026-2027።"
    }},
    { q: /rentree|first day|back to school|ትምህርት መቼ ይጀምራል|ተማሪዎች መቼ/i, a: {
      fr: "Rentrée des élèves : mercredi 2 septembre 2026. Source : calendrier scolaire LGM 2026-2027.",
      en: "Students return on Wednesday 2 September 2026. Source: LGM school calendar 2026-2027.",
      am: "ተማሪዎች ረቡዕ ሴፕቴምበር 2 ቀን 2026 ይመለሳሉ። ምንጭ፦ የLGM የዘመን ሰሌዳ 2026-2027።"
    }},
    { q: /meskel|fete de la croix|መስቀል/i, a: {
      fr: "Meskel (Fête de la Croix) : le lycée est fermé le 27 septembre 2026. Source : calendrier scolaire LGM 2026-2027.",
      en: "Meskel (Feast of the Cross): school is closed on 27 September 2026. Source: LGM school calendar 2026-2027.",
      am: "መስቀል፦ ትምህርት ቤቱ መስከረም 27 ቀን 2026 ይዘጋል። ምንጭ፦ የLGM የዘመን ሰሌዳ 2026-2027።"
    }},
    { q: /nouvel an|addis amet|enkutatash|ethiopian new year|እንቁጣጣሽ|አዲስ አመት/i, a: {
      fr: "Nouvel An éthiopien (Addis Amet) : le lycée est fermé le 11 septembre 2026. Source : calendrier scolaire LGM 2026-2027.",
      en: "Ethiopian New Year (Addis Amet): school is closed on 11 September 2026. Source: LGM school calendar 2026-2027.",
      am: "እንቁጣጣሽ (አዲስ አመት)፦ ትምህርት ቤቱ መስከረም 11 ቀን 2026 ይዘጋል። ምንጭ፦ የLGM የዘመን ሰሌዳ 2026-2027።"
    }},
    { q: /irrecha|irreecha/i, a: {
      fr: "Irrecha : fermeture le 4 octobre 2026. Source : calendrier scolaire LGM 2026-2027.",
      en: "Irrecha: school closed on 4 October 2026. Source: LGM school calendar 2026-2027.",
      am: "ኢሬቻ፦ ጥቅምት 4 ቀን 2026 ይዘጋል።"
    }},
    { q: /gena|noel orthodoxe|orthodox christmas/i, a: {
      fr: "Noël orthodoxe (Gena) : fermeture le 7 janvier 2027. Source : calendrier scolaire LGM 2026-2027.",
      en: "Orthodox Christmas (Gena): school closed on 7 January 2027. Source: LGM school calendar 2026-2027.",
      am: "ገና፦ ጥር 7 ቀን 2027 ይዘጋል።"
    }},
    { q: /timkat/i, a: {
      fr: "Timkat : fermeture le 19 janvier 2027. Source : calendrier scolaire LGM 2026-2027.",
      en: "Timkat: school closed on 19 January 2027. Source: LGM school calendar 2026-2027.",
      am: "ጥምቀት፦ ጥር 19 ቀን 2027 ይዘጋል።"
    }}
  ];

  function langOf(obj, lang) {
    return (obj && (obj[lang] || obj.fr)) || "";
  }

  function formatContact(c, lang) {
    var role = langOf(c.role, lang);
    var lines = [];
    if (lang === "en") {
      lines.push(c.name + " — " + role);
      if (c.email) lines.push("Email: " + c.email);
      if (c.emailAlt) lines.push("Also: " + c.emailAlt);
      if (c.phone) lines.push("Phone: " + c.phone + (c.phoneAlt ? " / " + c.phoneAlt : ""));
    } else if (lang === "am") {
      lines.push(c.name + " — " + role);
      if (c.email) lines.push("ኢሜይል፦ " + c.email);
      if (c.emailAlt) lines.push("እንዲሁም፦ " + c.emailAlt);
      if (c.phone) lines.push("ስልክ፦ " + c.phone + (c.phoneAlt ? " / " + c.phoneAlt : ""));
    } else {
      lines.push(c.name + " — " + role);
      if (c.email) lines.push("Email : " + c.email);
      if (c.emailAlt) lines.push("Aussi : " + c.emailAlt);
      if (c.phone) lines.push("Tél : " + c.phone + (c.phoneAlt ? " / " + c.phoneAlt : ""));
    }
    return lines.join("\n");
  }

  function intro(lang, n) {
    if (lang === "en") {
      return n === 1
        ? "Here is the person to contact (source: official LGM contact page):"
        : "Here are the people to contact (source: official LGM contact page):";
    }
    if (lang === "am") {
      return "እነዚህን ያነጋግሩ (ምንጭ፦ የLGM የመገኛ ገጽ)፦";
    }
    return n === 1
      ? "Voici la personne à contacter (source : page Contact officielle du LGM) :"
      : "Voici les personnes à contacter (source : page Contact officielle du LGM) :";
  }

  function noneMsg(lang) {
    if (lang === "en") {
      return "I do not have an official document for that. Write to school life: vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org or call the switchboard on 01 11 55 16 03.";
    }
    if (lang === "am") {
      return "ለዚህ ይፋዊ ሰነድ የለኝም። የትምህርት ሕይወትን ይጻፉ፦ vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org ወይም 01 11 55 16 03 ይደውሉ።";
    }
    return "Je n'ai pas de document officiel pour cela. Écrivez à la vie scolaire : vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org ou téléphonez au standard : 01 11 55 16 03.";
  }

  function isContactIntent(text) {
    return /contact|email|e-mail|mail|écrire|ecrire|contacter|qui (dois|devrais|peut|faut)|who (should|do|can|to)|vie scolaire|infirmerie|absence|retard|orientation|facture|paiement|informatique|dsi|proviseur|secretaire|secrétariat|@|ኢሜይል|ማን/i.test(text || "");
  }

  function answer(prompt, lang) {
    lang = lang === "en" || lang === "am" ? lang : "fr";
    var text = String(prompt || "").trim();
    if (!text) return "";

    if (/^(bonjour|salut|hello|hi|hey|ሰላም)\b/i.test(text) && text.length < 24) {
      if (lang === "en") return "Hello. I am Guebre-ai, the Lycée Guebre-Mariam assistant. Ask about the calendar, school life, or who to email.";
      if (lang === "am") return "ሰላም። እኔ Guebre-ai ነኝ። ስለ የዘመን ሰሌዳ፣ የትምህርት ሕይወት ወይም ማንን ኢሜይል ማድረግ እንደሚችሉ ይጠይቁ።";
      return "Bonjour. Je suis Guebre-ai, l'assistant du Lycée Guebre-Mariam. Posez une question sur le calendrier, la vie scolaire, ou à qui écrire.";
    }

    for (var i = 0; i < CALENDAR.length; i += 1) {
      if (CALENDAR[i].q.test(text)) return langOf(CALENDAR[i].a, lang);
    }

    var dir = root.GUEBRE_DIRECTORY;
    if (dir && typeof dir.search === "function") {
      var hits = dir.search(text, 4);
      if (hits.length && isContactIntent(text)) {
        var body = hits.map(function (c) { return formatContact(c, lang); }).join("\n\n");
        return intro(lang, hits.length) + "\n\n" + body;
      }
      if (hits.length && hits[0] && (dir.search(text, 1).length)) {
        // strong name/service match even without "contact" wording
        var strong = dir.search(text, 3);
        if (strong.length) {
          return intro(lang, strong.length) + "\n\n" + strong.map(function (c) { return formatContact(c, lang); }).join("\n\n");
        }
      }
    }
    return noneMsg(lang);
  }

  root.GUEBRE_LOCAL = {
    answer: answer,
    formatContact: formatContact,
    isContactIntent: isContactIntent
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
