(function () {
  "use strict";

  var config = window.GUEBRE_CONFIG || {};
  var chatLog = document.getElementById("chat-log");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");
  var statusText = document.getElementById("api-status");
  var statusDot = document.getElementById("api-status-dot");
  var articlesFeed = document.getElementById("articles-feed");

  var conversation = [];

  var articles = [
    {
      tag: "Rentrée",
      title: "Rentrée des élèves le mercredi 2 septembre 2026",
      date: "Calendrier LGM 2026-2027",
      body: "La prérentrée des enseignants a lieu le mardi 1er septembre. Les élèves reprennent le mercredi 2 septembre 2026."
    },
    {
      tag: "Jour férié",
      title: "Nouvel An éthiopien (Addis Amet)",
      date: "11 septembre 2026",
      body: "Le lycée est fermé le 11 septembre 2026 pour le Nouvel An éthiopien, selon le calendrier scolaire officiel."
    },
    {
      tag: "Jour férié",
      title: "Fête de la Croix (Meskel)",
      date: "27 septembre 2026",
      body: "Fermeture le 27 septembre 2026 pour Meskel. Source : calendrier scolaire Lycée Guebre-Mariam 2026-2027."
    },
    {
      tag: "Communauté",
      title: "Guebre-ai répond à partir des documents de l'école",
      date: "1er septembre 2026",
      body: "L'assistant cite le calendrier et d'autres textes officiels. S'il n'a pas la source, il vous oriente vers la vie scolaire."
    }
  ];

  function chatUrl() {
    if (config.CHAT_API_URL) {
      return config.CHAT_API_URL;
    }
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
    if (role === "user") {
      label.textContent = "Vous";
    } else if (role === "assistant") {
      label.textContent = "Guebre-ai";
    } else {
      label.textContent = "Avis";
    }

    var body = document.createElement("div");
    body.textContent = text;
    bubble.appendChild(label);
    bubble.appendChild(body);
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
  }

  function renderArticles() {
    articlesFeed.innerHTML = "";
    articles.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "article-card";
      card.innerHTML =
        '<span class="tag"></span>' +
        "<h3></h3>" +
        '<p class="meta"></p>' +
        "<p></p>";
      card.querySelector(".tag").textContent = item.tag;
      card.querySelector("h3").textContent = item.title;
      card.querySelector(".meta").textContent = item.date;
      card.querySelectorAll("p")[1].textContent = item.body;
      articlesFeed.appendChild(card);
    });
  }

  function backendHint() {
    var host = window.location.hostname;
    if (host.indexOf("github.io") !== -1) {
      return "Publiez ce projet sur Netlify pour activer l'assistant.";
    }
    return "L'assistant parle à un serveur interne. Aucune clé n'est demandée aux visiteurs.";
  }

  async function askBackend(prompt) {
    conversation.push({ role: "user", content: prompt });

    var response = await fetch(chatUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation })
    });

    var data;
    try {
      data = await response.json();
    } catch (error) {
      conversation.pop();
      throw new Error("Le serveur a renvoyé une réponse illisible.");
    }

    if (!response.ok) {
      conversation.pop();
      throw new Error((data && data.error) || "La requête a échoué (" + response.status + ").");
    }

    if (!data || !data.reply) {
      conversation.pop();
      throw new Error("Le serveur n'a renvoyé aucun texte.");
    }

    conversation.push({ role: "assistant", content: data.reply });
    return data.reply;
  }

  async function onSubmit(event) {
    event.preventDefault();
    var prompt = chatInput.value.trim();
    if (!prompt) {
      return;
    }

    addMessage("user", prompt);
    chatInput.value = "";
    sendButton.disabled = true;
    var thinking = addMessage("assistant", "…");

    try {
      var answer = await askBackend(prompt);
      thinking.querySelector("div").textContent = answer;
      setStatus("ready", "Assistant prêt. La clé API reste sur le serveur.");
    } catch (error) {
      thinking.className = "message system";
      thinking.querySelector(".label").textContent = "Avis";
      var message = error && error.message ? error.message : "Une erreur s'est produite.";
      if (/Failed to fetch|NetworkError|404|Not Found/i.test(message)) {
        message = backendHint();
      }
      thinking.querySelector("div").textContent = message;
      setStatus("error", "Le serveur d'assistant n'a pas répondu.");
    } finally {
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  renderArticles();
  addMessage(
    "assistant",
    "Bonjour — hello. Je suis Guebre-ai. Posez une question en français, en anglais ou en amharique. J'ai le calendrier scolaire LGM 2026-2027."
  );

  if (window.location.hostname.indexOf("github.io") !== -1) {
    setStatus("missing", "Hébergez le site sur Netlify pour activer l'assistant.");
  } else {
    setStatus("ready", "Assistant prêt. La clé API reste sur le serveur.");
  }

  chatForm.addEventListener("submit", onSubmit);
})();
