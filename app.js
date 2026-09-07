(function () {
  "use strict";
  var LANG_KEY = "guebre-lang";
  var config = window.GUEBRE_CONFIG || {};
  var directory = window.GUEBRE_DIRECTORY || { contacts: [], search: function () { return []; }, pickLang: function (o) { return (o && o.fr) || ""; } };
  var localAi = window.GUEBRE_LOCAL || { answer: function () { return ""; }, formatContact: function () { return ""; }, isContactIntent: function () { return false; } };
  var lang = localStorage.getItem(LANG_KEY) || "fr";
  if (lang !== "fr" && lang !== "en" && lang !== "am") lang = "fr";

  var I18N = {
    fr: {
      skip: "Aller au contenu", navAssistant: "Assistant", navNews: "Actualités", navAbout: "À propos",
      settings: "Paramètres", themeEthiopia: "Éthiopie", themeDark: "Sombre", remarks: "Remarques",
      eyebrow: "Lycée Guebre-Mariam",
      heroTitle: "Des réponses claires. Des actualités à jour.",
      heroLede: "Guebre-ai aide les élèves et les familles à poser des questions et à lire les annonces de l'école.",
      assistantTitle: "Assistant IA",
      assistantIntro: "Posez une question sur la vie scolaire, le calendrier, ou à qui écrire.",
      yourQuestion: "Votre question", send: "Envoyer", clearChat: "Nouvelle discussion",
      newsTitle: "Actualités", newsIntro: "Annonces et activités de l'école.",
      aboutTitle: "À propos de Guebre-ai",
      aboutBody: "Guebre-ai est l'assistant du Lycée Guebre-Mariam. Il cite les documents de l'école.",
      footer: "© 2026 Guebre-ai — Lycée Guebre-Mariam", close: "Fermer", more: "En savoir plus",
      hello: "Bonjour. Je suis Guebre-ai. Posez une question en français, en anglais ou en amharique — calendrier, vie scolaire, ou à qui envoyer un email.",
      placeholder: "Tapez votre question ici... (un nom ou un service affichera des emails)",
      ready: "Assistant prêt.", thinking: "Réflexion en cours...",
      youLabel: "Vous",
      chips: ["Quand est Meskel ?", "Qui contacter pour une absence ?", "Email de l'infirmerie ?"],
      mailTitle: "Envoyer une remarque",
      mailName: "Votre nom", mailNameHint: "Le vôtre — élève, parent ou membre du personnel",
      mailEmail: "Votre adresse email", mailEmailHint: "La vôtre, pour que l'école puisse vous répondre",
      mailTo: "À qui envoyer ?", mailToHint: "Tapez un nom, un service ou un rôle — des emails vous seront proposés",
      mailToField: "Destinataire",
      mailMessage: "Votre message", mailMessageHint: "Décrivez votre remarque. Des contacts peuvent apparaître selon ce que vous écrivez.",
      mailSend: "Envoyer", mailThanks: "Merci pour votre email",
      mailTitleField: "Titre", mailDateField: "Date", mailWrittenBy: "Écrit par",
      mailHi: "Bonjour,", mailThanksDear: "Bonjour",
      mailThanksBody: "Merci de nous avoir contactés ! Votre logiciel de messagerie s'ouvre avec le destinataire choisi. Si rien ne s'ouvre, copiez l'email affiché ci-dessus.",
      mailCheers: "Bien à vous,", mailRole: "Assistant du Lycée Guebre-Mariam", mailSubject: "Remarques Guebre-ai",
      suggestEmails: "Emails possibles", pickContact: "Choisir", noEmail: "Pas d'email listé — utilisez le téléphone.",
      localNote: "Réponse à partir de l'annuaire et du calendrier de l'école."
    },
    en: {
      skip: "Skip to content", navAssistant: "Assistant", navNews: "News", navAbout: "About",
      settings: "Settings", themeEthiopia: "Ethiopia", themeDark: "Dark", remarks: "Remarks",
      eyebrow: "Lycée Guebre-Mariam",
      heroTitle: "Clear answers. School news that stays current.",
      heroLede: "Guebre-ai helps students and families ask questions and read school announcements.",
      assistantTitle: "AI assistant",
      assistantIntro: "Ask about school life, the calendar, or who to email.",
      yourQuestion: "Your question", send: "Send", clearChat: "New chat",
      newsTitle: "News", newsIntro: "School announcements and activities.",
      aboutTitle: "About Guebre-ai",
      aboutBody: "Guebre-ai is the Lycée Guebre-Mariam assistant. It cites school documents.",
      footer: "© 2026 Guebre-ai — Lycée Guebre-Mariam", close: "Close", more: "Learn more",
      hello: "Hello. I am Guebre-ai. Ask in French, English, or Amharic — calendar, school life, or who to email.",
      placeholder: "Type your question here... (a name or service will show emails)",
      ready: "Assistant ready.", thinking: "Thinking...",
      youLabel: "You",
      chips: ["When is Meskel?", "Who do I email about an absence?", "Nurse's office email?"],
      mailTitle: "Send a remark",
      mailName: "Your name", mailNameHint: "Yours — student, parent, or staff",
      mailEmail: "Your email address", mailEmailHint: "Yours, so the school can reply to you",
      mailTo: "Who should receive this?", mailToHint: "Type a name, service, or role — email options will appear",
      mailToField: "Recipient",
      mailMessage: "Your message", mailMessageHint: "Describe your remark. Matching contacts may appear as you type.",
      mailSend: "Send", mailThanks: "Thank you for your email",
      mailTitleField: "Title", mailDateField: "Date", mailWrittenBy: "Written by",
      mailHi: "Hi,", mailThanksDear: "Dear",
      mailThanksBody: "Thank you for contacting us! Your email app should open with the chosen recipient. If nothing opens, copy the address shown above.",
      mailCheers: "Cheers,", mailRole: "Lycée Guebre-Mariam assistant", mailSubject: "Guebre-ai remarks",
      suggestEmails: "Possible emails", pickContact: "Choose", noEmail: "No email listed — please use the phone number.",
      localNote: "Answer from the school directory and calendar."
    },
    am: {
      skip: "ወደ ይዝት ይሂዱ", navAssistant: "ረዳት", navNews: "ዜና", navAbout: "ስለ",
      settings: "ቅንብሮች", themeEthiopia: "ኢትዮጵያ", themeDark: "ጨለማ", remarks: "አስተያየቶች",
      eyebrow: "ሊሴ ግብረ ማርያም",
      heroTitle: "ግልጽ መልሶች። የተማሪ ዜና።",
      heroLede: "Guebre-ai ለተማሪዎች እና ለቤተሰብ ጥያቄ ለመጠየቅ እና የትምህርት ቤት ማስታወቂያ ለማንበብ ይረዳል።",
      assistantTitle: "የአይ ረዳት",
      assistantIntro: "ስለ የትምህርት ቤት ህይወት፣ የዘመን ሰሌዳ ወይም ማንን መጻፍ እንደሚችሉ ይጠይቁ።",
      yourQuestion: "ጥያቄዎ", send: "ላክ", clearChat: "አዲስ ውይይት",
      newsTitle: "ዜና", newsIntro: "የትምህርት ቤት ማስታወቂያዎች እና ተግባራት።",
      aboutTitle: "ስለ Guebre-ai",
      aboutBody: "Guebre-ai የሊሴ ግብረ ማርያም ረዳት ነው። የትምህርት ቤቱን ሰነዶች ይጠቅሳል።",
      footer: "© 2026 Guebre-ai — ሊሴ ግብረ ማርያም", close: "ዝጋ", more: "ተጨማሪ ይወቁ",
      hello: "ሰላም። እኔ Guebre-ai ነኝ። በፈረንሰይኛ፣ በእንግሊዝኛ ወይም በአማርኛ ይጠይቁ።",
      placeholder: "ጥያቄዎን እዚህ ይጻፉ... (ስም ወይም ክፍል ኢሜይሎችን ያሳያል)",
      ready: "ረዳቱ ዝግጁ ነው።", thinking: "እያሰበ ነው...",
      youLabel: "እርሶዎ",
      chips: ["መስቀል መቼ ነው?", "መቅረት ለማሳወቅ ማንን ልጻፍ?", "የነርስ ኢሜይል?"],
      mailTitle: "አስተያየት ይላኩ",
      mailName: "የእርስዎ ስም", mailNameHint: "የእርስዎ — ተማሪ፣ ወላጅ ወይም ሠራተኛ",
      mailEmail: "የእርስዎ ኢሜይል", mailEmailHint: "የእርስዎ፣ ትምህርት ቤቱ ሊመልስልዎ",
      mailTo: "ለማን ይላክ?", mailToHint: "ስም፣ ክፍል ወይም ሚና ይጻፉ — ኢሜይሎች ይታያሉ",
      mailToField: "ተቀባይ",
      mailMessage: "መልእክትዎ", mailMessageHint: "አስተያየትዎን ይግለጹ። በሚጽፉበት ጊዜ ተመሳሳይ ሰዎች ሊታዩ ይችላሉ።",
      mailSend: "ላክ", mailThanks: "ስለ ኢሜይልዎ እናመሰግናለን",
      mailTitleField: "ርዕስ", mailDateField: "ቀን", mailWrittenBy: "የጻፈው",
      mailHi: "ሰላም፣", mailThanksDear: "ውድ",
      mailThanksBody: "ስላገኙን እናመሰግናለን! የኢሜይል መተግበሪያዎ ከተመረጠው ተቀባይ ጋር ይከፈታል።",
      mailCheers: "ከሰላምታ ጋር፣", mailRole: "የሊሴ ግብረ ማርያም ረዳት", mailSubject: "የGuebre-ai አስተያየቶች",
      suggestEmails: "ሊሆኑ የሚችሉ ኢሜይሎች", pickContact: "ምረጥ", noEmail: "ኢሜይል የለም — ስልኩን ይጠቀሙ።",
      localNote: "መልሱ ከትምህርት ቤቱ አማራጭ ዝርዝር እና የዘመን ሰሌዳ ነው።"
    }
  };

  var ILLUSTRATIONS = {
    backToSchool: '<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M60 100 C90 78 150 78 200 92 C250 78 310 78 340 100" /><path d="M200 92 L200 40" stroke-dasharray="4 6" stroke-width="1.6"/><path d="M60 100 L60 46 C90 30 150 30 200 40" /><path d="M340 100 L340 46 C310 30 250 30 200 40" /><line x1="232" y1="54" x2="302" y2="28" stroke="#c9863a" stroke-width="4"/><circle cx="300" cy="27" r="4.5" fill="#c9863a" stroke="none"/></svg>',
    enkutatash: '<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M150 128 C150 92 160 72 170 55" /><path d="M200 128 C205 86 210 60 210 38" /><path d="M250 128 C245 92 240 66 235 50" /></g><g fill="#f4c94a" stroke="#caa22f" stroke-width="1.4"><circle cx="170" cy="46" r="15"/><circle cx="210" cy="29" r="17"/><circle cx="235" cy="41" r="14"/></g><g fill="#fff7df"><circle cx="170" cy="46" r="5.5"/><circle cx="210" cy="29" r="6.5"/><circle cx="235" cy="41" r="5.5"/></g></svg>',
    meskel: '<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M138 122 L200 38 L262 122 Z" /><path d="M158 122 L200 60 L242 122 Z" /></g><g stroke="#c24141" stroke-width="3.2" stroke-linecap="round"><line x1="200" y1="28" x2="200" y2="4" /><line x1="189" y1="13" x2="211" y2="13" /></g><path d="M180 120 C185 100 195 95 200 76 C205 95 215 100 220 120 Z" fill="#e8975a" opacity="0.88"/></svg>'
  };

  var ARTICLES = [
    { tag: { fr: "Rentrée", en: "Back to school", am: "መጀመሪያ" },
      illustration: ILLUSTRATIONS.backToSchool,
      title: { fr: "Rentrée des élèves le 2 septembre 2026", en: "Students return on 2 September 2026", am: "ተማሪዎች መስከረም 2 ሴፕቴምበር 2026 ይመለሳሉ" },
      date: { fr: "Calendrier LGM 2026-2027", en: "LGM calendar 2026-2027", am: "የLGM የዘመን ሰሌዳ 2026-2027" },
      summary: { fr: "La prérentrée des enseignants est le mardi 1er septembre. Les élèves reprennent le mercredi 2 septembre 2026.", en: "Teachers return on Tuesday 1 September. Students return on Wednesday 2 September 2026.", am: "መምህራን ማክሰኞ ሴፕቴምበር 1 ይመለሳሉ። ተማሪዎች ረቡዕ ሴፕቴምበር 2 ይመለሳሉ።" },
      more: { fr: "Source : calendrier scolaire officiel du Lycée Guebre-Mariam 2026-2027. Août 2026 reste en vacances.", en: "Source: official Lycée Guebre-Mariam calendar 2026-2027. August 2026 is still holiday.", am: "ምንጭ፦ የሊሴ ግብረ ማርያም የዘመን ሰሌዳ 2026-2027።" } },
    { tag: { fr: "Jour férié", en: "Holiday", am: "የእረፍት ቀን" },
      illustration: ILLUSTRATIONS.enkutatash,
      title: { fr: "Nouvel An éthiopien (Addis Amet)", en: "Ethiopian New Year (Addis Amet)", am: "አዲስ አመት (እንቁጣጣሽ)" },
      date: { fr: "11 septembre 2026", en: "11 September 2026", am: "መስከረም 11 ሴፕቴምበር 2026" },
      summary: { fr: "Le lycée est fermé le 11 septembre 2026 pour le Nouvel An éthiopien.", en: "The school is closed on 11 September 2026 for Ethiopian New Year.", am: "በመስከረም 11 ሴፕቴምበር 2026 ሊሴው ለአዲሱ አመት ይዘጋል።" },
      more: { fr: "Jour férié inscrit sur le calendrier scolaire LGM 2026-2027. Ce n'est pas un jour de cours.", en: "Listed as a public holiday on the LGM 2026-2027 school calendar. Not a class day.", am: "በየLGM 2026-2027 የዘመን ሰሌዳ ላይ የእረፍት ቀን ነው።" } },
    { tag: { fr: "Activité", en: "Activity", am: "ተግባር" },
      illustration: ILLUSTRATIONS.meskel,
      title: { fr: "Fête de la Croix (Meskel)", en: "Feast of the Cross (Meskel)", am: "የመስቀል በዓል (መስቀል)" },
      date: { fr: "27 septembre 2026", en: "27 September 2026", am: "መስከረም 27 ሴፕቴምበር 2026" },
      summary: { fr: "Fermeture le 27 septembre 2026 pour Meskel.", en: "School closed on 27 September 2026 for Meskel.", am: "በመስቀል በዓል ሊሴው መስከረም 27 ሴፕቴምበር 2026 ይዘጋል።" },
      more: { fr: "Meskel est un jour férié national. Source : calendrier scolaire Lycée Guebre-Mariam 2026-2027.", en: "Meskel is a national holiday. Source: Lycée Guebre-Mariam 2026-2027 calendar.", am: "መስቀል የሀገር የእረፍት ቀን ነው። ምንጭ፦ የLGM 2026-2027 የዘመን ሰሌዳ።" } },
    { tag: { fr: "Communauté", en: "Community", am: "ማህበረት" },
      title: { fr: "Guebre-ai cite les documents de l'école", en: "Guebre-ai cites school documents", am: "Guebre-ai የትምህርት ቤቱን ሰነዶች ይጠቅሳል" },
      date: { fr: "1er septembre 2026", en: "1 September 2026", am: "መስከረም 1 ሴፕቴምበር 2026" },
      summary: { fr: "S'il n'a pas la source, l'assistant vous oriente vers la vie scolaire, avec l'email officiel.", en: "If it has no source, the assistant sends you to vie scolaire, with the official email.", am: "ምንጭ ከሌለው ረዳቱ ወደ የትምህርት ህይወት ከኢሜይል ጋር ይልኮታል።" },
      more: { fr: "V1 : calendrier, qui contacter (emails officiels), actualités. Pas de notes individuelles, pas de rédaction de devoirs.", en: "V1: calendar, who-to-email map, news. No individual grades, no homework writing.", am: "V1፦ የዘመን ሰሌዳ፣ ማን ማነጋገር፣ ዜና። የግል ተማሪ ውጤቶች የሉም።" } }
  ];

  var chatLog = document.getElementById("chat-log");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");
  var statusText = document.getElementById("api-status");
  var statusDot = document.getElementById("api-status-dot");
  var articlesFeed = document.getElementById("articles-feed");
  var conversation = [];
  var pickedTo = null;

  function t() { return I18N[lang]; }
  function pick(obj) { return obj[lang] || obj.fr; }

  function applyLang() {
    document.documentElement.lang = lang === "am" ? "am" : lang;
    var dict = t();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    if (chatInput) chatInput.placeholder = dict.placeholder;
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    var nameInput = document.getElementById("mail-name");
    var emailInput = document.getElementById("mail-email");
    var toInput = document.getElementById("mail-to");
    if (nameInput) nameInput.placeholder = lang === "en" ? "e.g. Aaron Tesfaye" : lang === "am" ? "ምሳ. Aaron Tesfaye" : "ex. Aaron Tesfaye";
    if (emailInput) emailInput.placeholder = lang === "en" ? "e.g. parent@email.com" : "ex. parent@email.com";
    if (toInput) toInput.placeholder = lang === "en" ? "e.g. school life, nurse, billing…" : lang === "am" ? "ምሳ. የትምህርት ሕይወት፣ ነርስ…" : "ex. vie scolaire, infirmerie, DAF…";
    renderChips();
    renderArticles();
    setStatus("ready", dict.ready);
  }

  function renderChips() {
    var wrap = document.getElementById("quick-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    t().chips.forEach(function (label) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.addEventListener("click", function () { chatInput.value = label; chatInput.focus(); refreshSuggestions(chatInput, document.getElementById("chat-suggest"), "chat"); });
      wrap.appendChild(b);
    });
  }

  function renderArticles() {
    if (!articlesFeed) return;
    articlesFeed.innerHTML = "";
    ARTICLES.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "article-card";
      if (item.illustration) {
        var media = document.createElement("div");
        media.className = "article-media";
        media.innerHTML = item.illustration;
        card.appendChild(media);
      }
      var body = document.createElement("div");
      body.className = "article-body";
      var more = document.createElement("button");
      more.type = "button";
      more.className = "more-btn";
      more.textContent = t().more;
      more.addEventListener("click", function () { openModal(item); });
      body.innerHTML = '<span class="tag"></span><h3></h3><p class="meta"></p><p class="summary"></p>';
      body.querySelector(".tag").textContent = pick(item.tag);
      body.querySelector("h3").textContent = pick(item.title);
      body.querySelector(".meta").textContent = pick(item.date);
      body.querySelector(".summary").textContent = pick(item.summary);
      body.appendChild(more);
      card.appendChild(body);
      articlesFeed.appendChild(card);
    });
  }

  function openModal(item) {
    var modal = document.getElementById("article-modal");
    document.getElementById("modal-tag").textContent = pick(item.tag);
    document.getElementById("modal-title").textContent = pick(item.title);
    document.getElementById("modal-date").textContent = pick(item.date);
    document.getElementById("modal-body").textContent = pick(item.summary) + "\n\n" + pick(item.more);
    modal.hidden = false;
  }
  function closeModal() { document.getElementById("article-modal").hidden = true; }

  function chatUrl() {
    if (config.CHAT_API_URL) return config.CHAT_API_URL;
    var host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "/api/chat";
    if (host.indexOf("vercel.app") !== -1) return "/api/chat";
    return "/api/chat";
  }
  function chatUrls() {
    if (config.CHAT_API_URL) return [config.CHAT_API_URL];
    var host = window.location.hostname;
    if (host.indexOf("github.io") !== -1) return [];
    return ["/api/chat"];
  }
  function setStatus(kind, message) {
    if (statusText) statusText.textContent = message;
    if (statusDot) statusDot.className = "status-dot " + kind;
  }

  function linkify(el, text) {
    el.textContent = "";
    var re = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/ig;
    var last = 0;
    var match;
    while ((match = re.exec(text))) {
      if (match.index > last) el.appendChild(document.createTextNode(text.slice(last, match.index)));
      var a = document.createElement("a");
      a.href = "mailto:" + match[1];
      a.textContent = match[1];
      a.className = "mail-link";
      el.appendChild(a);
      last = match.index + match[0].length;
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  function addMessage(role, text, opts) {
    opts = opts || {};
    var bubble = document.createElement("div");
    bubble.className = "message " + role;
    var label = document.createElement("span");
    label.className = "label";
    label.textContent = role === "user" ? t().youLabel : role === "assistant" ? "Guebre-ai" : "Avis";
    var body = document.createElement("div");
    if (opts.linkify) linkify(body, text);
    else body.textContent = text;
    bubble.appendChild(label);
    bubble.appendChild(body);
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
  }

  function addContactCards(hits) {
    if (!hits || !hits.length) return;
    var wrap = document.createElement("div");
    wrap.className = "message assistant contact-row";
    var label = document.createElement("span");
    label.className = "label";
    label.textContent = t().suggestEmails;
    wrap.appendChild(label);
    hits.forEach(function (c) {
      wrap.appendChild(contactCard(c, function () {
        openRemarks(null, c);
      }));
    });
    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function contactCard(c, onPick) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "contact-card";
    var role = directory.pickLang(c.role, lang);
    var html = "<strong></strong><span class='contact-role'></span>";
    if (c.email) html += "<span class='contact-email'></span>";
    else html += "<span class='contact-email dim'></span>";
    if (c.phone) html += "<span class='contact-phone'></span>";
    card.innerHTML = html;
    card.querySelector("strong").textContent = c.name;
    card.querySelector(".contact-role").textContent = role;
    var em = card.querySelector(".contact-email");
    em.textContent = c.email || t().noEmail;
    if (c.phone) card.querySelector(".contact-phone").textContent = c.phone + (c.phoneAlt ? " · " + c.phoneAlt : "");
    card.addEventListener("click", function (e) {
      e.preventDefault();
      if (onPick) onPick(c);
    });
    return card;
  }

  function renderSuggestBox(box, query, onPick) {
    if (!box) return;
    var hits = directory.search(query, 5);
    if (!hits.length) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.innerHTML = "";
    hits.forEach(function (c) {
      box.appendChild(contactCard(c, function (picked) {
        box.hidden = true;
        onPick(picked);
      }));
    });
    box.hidden = false;
  }

  function refreshSuggestions(input, box, mode) {
    var q = (input && input.value) || "";
    renderSuggestBox(box, q, function (c) {
      if (mode === "to" || mode === "message") pickRecipient(c);
      else if (mode === "chat") {
        if (c.email) {
          chatInput.value = (lang === "en" ? "Who should I email about: " : lang === "am" ? "ስለዚህ ማንን ልጻፍ፦ " : "À qui écrire pour : ") + c.name;
          chatInput.focus();
        }
        addContactCards([c]);
      }
    });
  }

  function pickRecipient(c) {
    pickedTo = c;
    var toInput = document.getElementById("mail-to");
    var hidden = document.getElementById("mail-to-email");
    var picked = document.getElementById("mail-to-picked");
    var toBox = document.getElementById("mail-to-suggest");
    var msgBox = document.getElementById("mail-msg-suggest");
    if (toInput) toInput.value = c.name;
    if (hidden) hidden.value = c.email || "";
    if (picked) {
      picked.hidden = false;
      picked.textContent = c.name + (c.email ? " · " + c.email : "") + (c.phone ? " · " + c.phone : "");
    }
    if (toBox) { toBox.hidden = true; toBox.innerHTML = ""; }
    if (msgBox) { msgBox.hidden = true; msgBox.innerHTML = ""; }
  }

  function resetChat() {
    conversation = [];
    chatLog.innerHTML = "";
    addMessage("assistant", t().hello);
  }

  async function askBackend(prompt) {
    conversation.push({ role: "user", content: prompt });
    var urls = chatUrls();
    if (!urls.length) {
      var localOnly = localAi.answer(prompt, lang);
      conversation.push({ role: "assistant", content: localOnly });
      return { reply: localOnly, local: true };
    }
    var lastError = new Error("Server error");
    for (var i = 0; i < urls.length; i += 1) {
      try {
        var response = await fetch(urls[i], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: conversation, language: lang })
        });
        var data;
        try { data = await response.json(); }
        catch (e) { lastError = new Error("Server error"); continue; }
        if (!response.ok) { lastError = new Error((data && data.error) || "Request failed"); continue; }
        if (!data || !data.reply) { lastError = new Error("Empty reply"); continue; }
        conversation.push({ role: "assistant", content: data.reply });
        return { reply: data.reply, local: false };
      } catch (error) {
        lastError = error;
      }
    }
    var local = localAi.answer(prompt, lang);
    if (local) {
      conversation.push({ role: "assistant", content: local });
      return { reply: local, local: true };
    }
    conversation.pop();
    throw lastError;
  }

  async function onSubmit(event) {
    event.preventDefault();
    var prompt = chatInput.value.trim();
    if (!prompt) return;
    var suggest = document.getElementById("chat-suggest");
    if (suggest) { suggest.hidden = true; suggest.innerHTML = ""; }
    addMessage("user", prompt);
    chatInput.value = "";
    sendButton.disabled = true;
    var thinking = addMessage("assistant", t().thinking);
    try {
      var result = await askBackend(prompt);
      thinking.querySelector("div").textContent = "";
      linkify(thinking.querySelector("div"), result.reply);
      if (result.local) setStatus("ready", t().localNote);
      else setStatus("ready", t().ready);
      var hits = directory.search(prompt, 3);
      if (hits.length && (localAi.isContactIntent(prompt) || /@/.test(result.reply))) {
        addContactCards(hits);
      }
    } catch (error) {
      var fallback = localAi.answer(prompt, lang);
      if (fallback) {
        thinking.className = "message assistant";
        thinking.querySelector(".label").textContent = "Guebre-ai";
        linkify(thinking.querySelector("div"), fallback);
        setStatus("ready", t().localNote);
        var hits2 = directory.search(prompt, 3);
        if (hits2.length) addContactCards(hits2);
      } else {
        thinking.className = "message system";
        thinking.querySelector(".label").textContent = "Avis";
        thinking.querySelector("div").textContent = error.message || "Error";
        setStatus("error", t().ready);
      }
    } finally {
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lang = btn.getAttribute("data-set-lang");
      localStorage.setItem(LANG_KEY, lang);
      applyLang();
      resetChat();
    });
  });
  document.getElementById("clear-chat").addEventListener("click", resetChat);
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("article-modal").addEventListener("click", function (e) {
    if (e.target.id === "article-modal") closeModal();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeModal(); closeRemarks(); } });
  chatForm.addEventListener("submit", onSubmit);
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); }
  });
  chatInput.addEventListener("input", function () {
    refreshSuggestions(chatInput, document.getElementById("chat-suggest"), "chat");
  });

  var remarksModal = document.getElementById("remarks-modal");
  var remarksForm = document.getElementById("remarks-form");
  var remarksOpen = document.getElementById("remarks-open");
  var remarksClose = document.getElementById("remarks-close");
  var mailCompose = document.getElementById("mail-compose");
  var mailThanks = document.getElementById("mail-thanks");
  var remarksEmail = (config.REMARKS_EMAIL || "aarondanieltesfaye@gmail.com");
  var mailToInput = document.getElementById("mail-to");
  var mailMessage = document.getElementById("mail-message");

  function openRemarks(event, contact) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var menu = document.getElementById("settings-menu");
    var gear = document.getElementById("settings-toggle");
    if (menu) menu.classList.remove("is-open");
    if (gear) gear.setAttribute("aria-expanded", "false");
    if (!remarksModal) return;
    if (mailCompose) mailCompose.hidden = false;
    if (mailThanks) mailThanks.hidden = true;
    if (remarksForm) remarksForm.reset();
    pickedTo = null;
    var picked = document.getElementById("mail-to-picked");
    if (picked) { picked.hidden = true; picked.textContent = ""; }
    remarksModal.hidden = false;
    if (contact) pickRecipient(contact);
    setTimeout(function () {
      var focusEl = contact ? document.getElementById("mail-name") : mailToInput;
      if (focusEl) focusEl.focus();
    }, 30);
  }
  function closeRemarks() {
    if (remarksModal) remarksModal.hidden = true;
  }
  function two(n) { return (n < 10 ? "0" : "") + n; }

  function launchMailto(to, subject, body) {
    var href = "mailto:" + encodeURIComponent(to) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    var a = document.createElement("a");
    a.href = href;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function showRemarksThanks(name, email, message, toContact) {
    var dict = t();
    var now = new Date();
    var stamp = now.getFullYear() + "." + two(now.getMonth() + 1) + "." + two(now.getDate()) +
      "  " + two(now.getHours()) + ":" + two(now.getMinutes());
    var dest = toContact
      ? toContact.name + (toContact.email ? " · " + toContact.email : "")
      : remarksEmail;
    if (document.getElementById("mail-preview-title")) document.getElementById("mail-preview-title").textContent = dict.mailSubject;
    if (document.getElementById("mail-preview-date")) document.getElementById("mail-preview-date").textContent = stamp;
    if (document.getElementById("mail-preview-from")) document.getElementById("mail-preview-from").textContent = name + " · " + email;
    if (document.getElementById("mail-preview-to")) document.getElementById("mail-preview-to").textContent = dest;
    if (document.getElementById("mail-preview-hi")) document.getElementById("mail-preview-hi").textContent = dict.mailHi;
    if (document.getElementById("mail-preview-body")) document.getElementById("mail-preview-body").textContent = message;
    if (document.getElementById("mail-thanks-dear")) document.getElementById("mail-thanks-dear").textContent = dict.mailThanksDear + " " + name + ",";
    if (document.getElementById("mail-thanks-cheers")) document.getElementById("mail-thanks-cheers").textContent = dict.mailCheers;
    if (mailCompose) mailCompose.hidden = true;
    if (mailThanks) mailThanks.hidden = false;
  }

  if (remarksOpen) remarksOpen.addEventListener("click", function (e) { openRemarks(e); });
  if (remarksClose) remarksClose.addEventListener("click", closeRemarks);
  if (remarksModal) remarksModal.addEventListener("click", function (e) {
    if (e.target.id === "remarks-modal") closeRemarks();
  });
  if (mailToInput) {
    mailToInput.addEventListener("input", function () {
      pickedTo = null;
      var hidden = document.getElementById("mail-to-email");
      var picked = document.getElementById("mail-to-picked");
      if (hidden) hidden.value = "";
      if (picked) { picked.hidden = true; picked.textContent = ""; }
      refreshSuggestions(mailToInput, document.getElementById("mail-to-suggest"), "to");
    });
    mailToInput.addEventListener("focus", function () {
      refreshSuggestions(mailToInput, document.getElementById("mail-to-suggest"), "to");
    });
  }
  if (mailMessage) {
    mailMessage.addEventListener("input", function () {
      refreshSuggestions(mailMessage, document.getElementById("mail-msg-suggest"), "message");
    });
  }
  if (remarksForm) remarksForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = ((document.getElementById("mail-name") || {}).value || "").trim();
    var email = ((document.getElementById("mail-email") || {}).value || "").trim();
    var message = ((document.getElementById("mail-message") || {}).value || "").trim();
    var typedTo = ((document.getElementById("mail-to") || {}).value || "").trim();
    if (!name || !email || !message) return;
    var toContact = pickedTo;
    if (!toContact && typedTo) {
      var looksEmail = /@/.test(typedTo);
      var hits = directory.search(typedTo, 1);
      if (looksEmail) toContact = { name: typedTo, email: typedTo };
      else if (hits.length) toContact = hits[0];
    }
    var toAddr = (toContact && toContact.email) || remarksEmail;
    var dict = t();
    var subject = dict.mailSubject + (toContact && toContact.name ? " — " + toContact.name : "");
    var body =
      (lang === "en" ? "From: " : "De : ") + name + " <" + email + ">\n" +
      (toContact ? (lang === "en" ? "To: " : "À : ") + toContact.name + "\n" : "") +
      "\n" + message;
    var sendBtn = document.getElementById("mail-send");
    if (sendBtn) sendBtn.disabled = true;
    launchMailto(toAddr, subject, body);
    if (sendBtn) sendBtn.disabled = false;
    showRemarksThanks(name, email, message, toContact || { name: toAddr, email: toAddr });
  });

  applyLang();
  resetChat();
})();
