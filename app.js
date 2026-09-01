(function () {
  "use strict";

  var DAILY_LIMIT = 15;
  var LANG_KEY = "guebre-lang";
  var config = window.GUEBRE_CONFIG || {};
  var lang = localStorage.getItem(LANG_KEY) || "fr";
  if (lang !== "fr" && lang !== "en" && lang !== "am") lang = "fr";

  var I18N = {
    fr: {
      skip: "Aller au contenu",
      navAssistant: "Assistant",
      navNews: "Actualités",
      navAbout: "À propos",
      eyebrow: "Lycée Guebre-Mariam",
      heroTitle: "Des réponses claires. Des actualités a jour.",
      heroLede: "Guebre-ai aide les élèves et les familles a poser des questions et a lire les annonces de l'école.",
      usageKicker: "Quota quotidien",
      assistantTitle: "Assistant IA",
      assistantIntro: "Posez une question sur la vie scolaire ou le calendrier.",
      yourQuestion: "Votre question",
      send: "Envoyer",
      clearChat: "Nouvelle discussion",
      newsTitle: "Actualités",
      newsIntro: "Annonces et activités de l'école.",
      aboutTitle: "À propos de Guebre-ai",
      aboutBody: "Guebre-ai est l'assistant du Lycée Guebre-Mariam. Il cite les documents de l'école. La clé API reste sur le serveur.",
      footer: "2026 Guebre-ai — Lycée Guebre-Mariam",
      close: "Fermer",
      more: "En savoir plus",
      hello: "Bonjour. Je suis Guebre-ai. Posez une question en francais, en anglais ou en amharique.",
      placeholder: "Tapez votre question ici...",
      ready: "Assistant prêt. La clé API reste sur le serveur.",
      thinking: "Réflexion en cours...",
      limitReached: "Quota atteint pour aujourd'hui. Revenez demain.",
      youLabel: "Vous",
      chips: ["Quand est Meskel ?", "Quand est la rentrée ?", "Qui contacter a la vie scolaire ?"]
    },
    en: {
      skip: "Skip to content",
      navAssistant: "Assistant",
      navNews: "News",
      navAbout: "About",
      eyebrow: "Lycée Guebre-Mariam",
      heroTitle: "Clear answers. School news that stays current.",
      heroLede: "Guebre-ai helps students and families ask questions and read school announcements.",
      usageKicker: "Daily allowance",
      assistantTitle: "AI assistant",
      assistantIntro: "Ask about school life or the calendar.",
      yourQuestion: "Your question",
      send: "Send",
      clearChat: "New chat",
      newsTitle: "News",
      newsIntro: "School announcements and activities.",
      aboutTitle: "About Guebre-ai",
      aboutBody: "Guebre-ai is the Lycée Guebre-Mariam assistant. It cites school documents. The API key stays on the server.",
      footer: "2026 Guebre-ai — Lycée Guebre-Mariam",
      close: "Close",
      more: "Learn more",
      hello: "Hello. I am Guebre-ai. Ask in French, English, or Amharic.",
      placeholder: "Type your question here...",
      ready: "Assistant ready. The API key stays on the server.",
      thinking: "Thinking...",
      limitReached: "Daily limit reached. Please come back tomorrow.",
      youLabel: "You",
      chips: ["When is Meskel?", "When is the first day of school?", "Who should I ask at vie scolaire?"]
    },
    am: {
      skip: "ወደ ይዘት ይሂዱ",
      navAssistant: "ረዳት",
      navNews: "ዜና",
      navAbout: "ስለ",
      eyebrow: "ሊሴ ግብረ ማርያም",
      heroTitle: "ግልጽ መልሶች። የተማሪያ ዜና።",
      heroLede: "Guebre-ai ለተማሪዎች እና ለቤተሰብ ጥያቄ ለመጠየቅ እና የትምህርት ቤት ማስታወቂያ ለማንበብ ይረዳል።",
      usageKicker: "የዕለት ገደብ",
      assistantTitle: "የአይ ረዳት",
      assistantIntro: "ስለ የትምህርት ቤት ሕይወት ወይም ስለ የዘመን ሰሌዳ ጥያቄ ይጠይቁ።",
      yourQuestion: "ጥያቄዎ",
      send: "ላክ",
      clearChat: "አዲስ ውይይት",
      newsTitle: "ዜና",
      newsIntro: "የትምህርት ቤት ማስታወቂያዎች እና ተግባራት።",
      aboutTitle: "ስለ Guebre-ai",
      aboutBody: "Guebre-ai የሊሴ ግብረ ማርያም ረዳት ነው። የትምህርት ቤቱን ሰነዶች ይጠቅሳል።",
      footer: "2026 Guebre-ai — ሊሴ ግብረ ማርያም",
      close: "ዝጋ",
      more: "ተጨማሪ ይወቁ",
      hello: "ሰላም። እኔ Guebre-ai ነኝ። በፈረንሰይኛ፣ በእንግሊዝኛ ወይም በአማርኛ ይጠይቁ።",
      placeholder: "ጥያቄዎን እዚህ ይጻፉ...",
      ready: "ረዳቱ ዝግጁነው።",
      thinking: "እያሰበል...",
      limitReached: "የዛሬ ገደብ ደርሷል። ነገ ይመለሱ።",
      youLabel: "እርስዎ",
      chips: ["መስቀል መቼ ነው?", "ትምህርት መቼ ይጀምራል?", "የትምህርት ሕይወትን ማን እጠይቃለሁ?"]
    }
  };

  var ARTICLES = [
    {
      tag: { fr: "Rentrée", en: "Back to school", am: "መጀመሪያ" },
      title: {
        fr: "Rentrée des élèves le 2 septembre 2026",
        en: "Students return on 2 September 2026",
        am: "ተማሪዎች መስከረም 2 ሴፕቴምበር 2026 ይመለሳሉ"
      },
      date: { fr: "Calendrier LGM 2026-2027", en: "LGM calendar 2026-2027", am: "የLGM የዘመን ሰሌዳ 2026-2027" },
      summary: {
        fr: "La prerentrée des enseignants est le mardi 1er septembre. Les élèves reprennent le mercredi 2 septembre 2026.",
        en: "Teachers return on Tuesday 1 September. Students return on Wednesday 2 September 2026.",
        am: "መምህራን ማክሰኞ ሴፕቴምበር 1 ይመለሳሉ። ተማሪዎች ረቡዕ ሴፕቴምበር 2 ይመለሳሉ።"
      },
      more: {
        fr: "Source : calendrier scolaire officiel du Lycée Guebre-Mariam 2026-2027. Août 2026 reste en vacances.",
        en: "Source: official Lycée Guebre-Mariam calendar 2026-2027. August 2026 is still holiday.",
        am: "ምንጭ፦ የሊሴ ግብረ ማርያም የዘመን ሰሌዳ 2026-2027።"
      }
    },
    {
      tag: { fr: "Jour férié", en: "Holiday", am: "የእረፍት ቀን" },
      title: { fr: "Nouvel An éthiopien (Addis Amet)", en: "Ethiopian New Year (Addis Amet)", am: "አዲስ አመት (እንቁጣጣሽ)" },
      date: { fr: "11 septembre 2026", en: "11 September 2026", am: "መስከረም 11 ሴፕቴምበር 2026" },
      summary: {
        fr: "Le lycee est fermé le 11 septembre 2026 pour le Nouvel An éthiopien.",
        en: "The school is closed on 11 September 2026 for Ethiopian New Year.",
        am: "በመስከረም 11 ሴፕቴምበር 2026 ሊሴው ለአዲሱ አመት ይዘጋል።"
      },
      more: {
        fr: "Jour férié inscrit sur le calendrier scolaire LGM 2026-2027. Ce n'est pas un jour de cours.",
        en: "Listed as a public holiday on the LGM 2026-2027 school calendar. Not a class day.",
        am: "በየLGM 2026-2027 የዘመን ሰሌዳ ላይ የእረፍት ቀን ነው።"
      }
    },
    {
      tag: { fr: "Activite", en: "Activity", am: "ተግባር" },
      title: { fr: "Fête de la Croix (Meskel)", en: "Feast of the Cross (Meskel)", am: "የመስቀል በዓል (መስቀል)" },
      date: { fr: "27 septembre 2026", en: "27 September 2026", am: "መስከረም 27 ሴፕቴምበር 2026" },
      summary: {
        fr: "Fermeture le 27 septembre 2026 pour Meskel.",
        en: "School closed on 27 September 2026 for Meskel.",
        am: "በመስቀል በዓል ሊሴው መስከረም 27 ሴፕቴምበር 2026 ይዘጋል።"
      },
      more: {
        fr: "Meskel est un jour férié national. Source : calendrier scolaire Lycée Guebre-Mariam 2026-2027.",
        en: "Meskel is a national holiday. Source: Lycée Guebre-Mariam 2026-2027 calendar.",
        am: "መስቀል የሀገር የእረፍት ቀን ነው። ምንጭ፦ የLGM 2026-2027 የዘመን ሰሌዳ።"
      }
    },
    {
      tag: { fr: "Communauté", en: "Community", am: "ማህበረት" },
      title: {
        fr: "Guebre-ai cite les documents de l'école",
        en: "Guebre-ai cites school documents",
        am: "Guebre-ai የትምህርት ቤቱን ሰነዶች ይጠቅሳል"
      },
      date: { fr: "1er septembre 2026", en: "1 September 2026", am: "መስከረም 1 ሴፕቴምበር 2026" },
      summary: {
        fr: "S'il n'a pas la source, l'assistant vous oriente vers la vie scolaire.",
        en: "If it has no source, the assistant sends you to vie scolaire.",
        am: "ምንጭ ከሌለው ረዳቱ ወደ የትምህርት ሕይወት ይልኮታል።"
      },
      more: {
        fr: "V1 : calendrier, qui contacter, actualités. Pas de notes individuelles, pas de rédaction de devoirs.",
        en: "V1: calendar, who-to-ask map, news. No individual grades, no homework writing.",
        am: "V1፦ የዘመን ሰሌዳ፣ ማን ማነጋገር፣ ዜና። የግል ተማሪ ውጤቶች የሉም።"
      }
    }
  ];

  var chatLog = document.getElementById("chat-log");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");
  var statusText = document.getElementById("api-status");
  var statusDot = document.getElementById("api-status-dot");
  var articlesFeed = document.getElementById("articles-feed");
  var conversation = [];

  function t() { return I18N[lang]; }
  function pick(obj) { return obj[lang] || obj.fr; }

  function usageKey() {
    var d = new Date();
    return "guebre-usage-" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  function usedCount() { return Number(localStorage.getItem(usageKey()) || 0); }
  function remaining() { return Math.max(0, DAILY_LIMIT - usedCount()); }
  function bumpUsage() { localStorage.setItem(usageKey(), String(usedCount() + 1)); }

  function renderUsage() {
    var left = remaining();
    var card = document.querySelector(".usage-card");
    document.getElementById("usage-left").textContent = String(left);
    document.getElementById("usage-max").textContent = String(DAILY_LIMIT);
    document.getElementById("usage-fill").style.width = (left / DAILY_LIMIT) * 100 + "%";
    document.getElementById("usage-en").textContent =
      left === 1 ? "1 question left today" : left + " questions left today";
    document.getElementById("usage-fr").textContent =
      left === 1 ? "1 question restante aujourd'hui" : left + " questions restantes aujourd'hui";
    card.classList.toggle("is-low", left > 0 && left <= 5);
    card.classList.toggle("is-empty", left === 0);
    sendButton.disabled = left === 0;
    if (left === 0) chatInput.placeholder = t().limitReached;
  }

  function applyLang() {
    document.documentElement.lang = lang === "am" ? "am" : lang;
    var dict = t();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    chatInput.placeholder = remaining() === 0 ? dict.limitReached : dict.placeholder;
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    renderChips();
    renderArticles();
    setStatus("ready", dict.ready);
    renderUsage();
  }

  function renderChips() {
    var wrap = document.getElementById("quick-chips");
    wrap.innerHTML = "";
    t().chips.forEach(function (label) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.addEventListener("click", function () {
        chatInput.value = label;
        chatInput.focus();
      });
      wrap.appendChild(b);
    });
  }

  function renderArticles() {
    articlesFeed.innerHTML = "";
    ARTICLES.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "article-card";
      var more = document.createElement("button");
      more.type = "button";
      more.className = "more-btn";
      more.textContent = t().more;
      more.addEventListener("click", function () { openModal(item); });
      card.innerHTML = '<span class="tag"></span><h3></h3><p class="meta"></p><p class="summary"></p>';
      card.querySelector(".tag").textContent = pick(item.tag);
      card.querySelector("h3").textContent = pick(item.title);
      card.querySelector(".meta").textContent = pick(item.date);
      card.querySelector(".summary").textContent = pick(item.summary);
      card.appendChild(more);
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
  function closeModal() {
    document.getElementById("article-modal").hidden = true;
  }

  function chatUrl() {
    if (config.CHAT_API_URL) return config.CHAT_API_URL;
    var host = window.location.hostname;
    if (host.indexOf("netlify.app") !== -1 || host.indexOf("netlify.com") !== -1) {
      return "/.netlify/functions/chat";
    }
    return "/api/chat";
  }

  function setStatus(kind, message) {
    statusText.textContent = message;
    statusDot.className = "status-dot " + kind;
  }

  function addMessage(role, text) {
    var bubble = document.createElement("div");
    bubble.className = "message " + role;
    var label = document.createElement("span");
    label.className = "label";
    label.textContent = role === "user" ? t().youLabel : role === "assistant" ? "Guebre-ai" : "Avis";
    var body = document.createElement("div");
    body.textContent = text;
    bubble.appendChild(label);
    bubble.appendChild(body);
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
  }

  function resetChat() {
    conversation = [];
    chatLog.innerHTML = "";
    addMessage("assistant", t().hello);
  }

  async function askBackend(prompt) {
    conversation.push({ role: "user", content: prompt });
    var response = await fetch(chatUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation, language: lang })
    });
    var data;
    try { data = await response.json(); }
    catch (e) {
      conversation.pop();
      throw new Error("Server error");
    }
    if (!response.ok) {
      conversation.pop();
      throw new Error((data && data.error) || "Request failed");
    }
    if (!data || !data.reply) {
      conversation.pop();
      throw new Error("Empty reply");
    }
    conversation.push({ role: "assistant", content: data.reply });
    return data.reply;
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (remaining() <= 0) {
      addMessage("system", t().limitReached);
      renderUsage();
      return;
    }
    var prompt = chatInput.value.trim();
    if (!prompt) return;
    addMessage("user", prompt);
    chatInput.value = "";
    sendButton.disabled = true;
    var thinking = addMessage("assistant", t().thinking);
    try {
      var answer = await askBackend(prompt);
      bumpUsage();
      thinking.querySelector("div").textContent = answer;
      setStatus("ready", t().ready);
    } catch (error) {
      thinking.className = "message system";
      thinking.querySelector(".label").textContent = "Avis";
      thinking.querySelector("div").textContent = error.message || "Error";
      setStatus("error", t().ready);
    } finally {
      renderUsage();
      sendButton.disabled = remaining() === 0;
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
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  chatForm.addEventListener("submit", onSubmit);
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  applyLang();
  resetChat();
})();
