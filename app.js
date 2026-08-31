(function () {
  "use strict";

  var PLACEHOLDER_KEY = "YOUR_API_KEY_HERE";
  var config = window.GUEBRE_CONFIG || {};
  var apiKey = (config.GEMINI_API_KEY || "").trim();
  var model = config.GEMINI_MODEL || "gemini-2.5-flash";

  var chatLog = document.getElementById("chat-log");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");
  var statusText = document.getElementById("api-status");
  var statusDot = document.getElementById("api-status-dot");
  var articlesFeed = document.getElementById("articles-feed");

  var articles = [
    {
      tag: "Annonce",
      title: "Bienvenue pour le nouveau trimestre scolaire",
      date: "31 août 2026",
      body: "Les cours reprennent cette semaine. Veuillez vérifier votre emploi du temps et apporter les livres requis dès le premier jour."
    },
    {
      tag: "Actualités",
      title: "Horaires de la bibliothèque prolongés",
      date: "28 août 2026",
      body: "La bibliothèque de l'école restera ouverte jusqu'à 17h30 du lundi au jeudi afin que les élèves puissent terminer leurs devoirs dans un espace calme."
    },
    {
      tag: "Clubs",
      title: "Première réunion du club de sciences",
      date: "2 septembre 2026",
      body: "Rejoignez le club de sciences en salle B12 après les cours. Les nouveaux membres sont les bienvenus. Aucune expérience requise, seulement de la curiosité."
    },
    {
      tag: "Communauté",
      title: "Soirée d'information pour les familles",
      date: "5 septembre 2026",
      body: "Les parents et tuteurs sont invités à une soirée d'information sur les programmes scolaires, le sport et les services de soutien."
    }
  ];

  function hasValidKey() {
    return Boolean(apiKey) && apiKey !== PLACEHOLDER_KEY;
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

  function missingKeyMessage() {
    return (
      "Pour tester l'assistant, ouvrez config.js et remplacez YOUR_API_KEY_HERE par votre clé API Gemini gratuite. " +
      "Gardez la clé réelle privée et ne la publiez pas dans ce dépôt public."
    );
  }

  async function askGemini(prompt) {
    var endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) +
      ":generateContent?key=" +
      encodeURIComponent(apiKey);

    var payload = {
      systemInstruction: {
        parts: [
          {
            text:
              "Tu es Guebre-ai, un assistant scolaire amical et une aide aux actualités. " +
              "Donne des réponses claires, bienveillantes et adaptées à l'âge des élèves. Utilise un langage adapté aux étudiants. " +
              "Si une question ne porte pas sur l'école, l'apprentissage ou des connaissances générales, réponds quand même de façon utile et brève. " +
              "Réponds toujours en français."
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    };

    var response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    var data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Le service Gemini a renvoyé une réponse illisible.");
    }

    if (!response.ok) {
      var apiMessage =
        (data && data.error && data.error.message) ||
        "La requête Gemini a échoué (" + response.status + ").";
      throw new Error(apiMessage);
    }

    var text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts
        .map(function (part) {
          return part.text || "";
        })
        .join("\n")
        .trim();

    if (!text) {
      throw new Error("Gemini n'a renvoyé aucun texte. Essayez une autre question.");
    }

    return text;
  }

  async function onSubmit(event) {
    event.preventDefault();
    var prompt = chatInput.value.trim();
    if (!prompt) {
      return;
    }

    addMessage("user", prompt);
    chatInput.value = "";

    if (!hasValidKey()) {
      addMessage("system", missingKeyMessage());
      setStatus("missing", "Clé API manquante. Ajoutez-la dans config.js pour activer le chat.");
      return;
    }

    sendButton.disabled = true;
    var thinking = addMessage("assistant", "Réflexion en cours…");

    try {
      var answer = await askGemini(prompt);
      thinking.querySelector("div").textContent = answer;
    } catch (error) {
      thinking.className = "message system";
      thinking.querySelector(".label").textContent = "Avis";
      thinking.querySelector("div").textContent =
        error && error.message
          ? error.message
          : "Une erreur s'est produite lors de la connexion à Gemini.";
      setStatus("error", "La dernière requête a échoué. Vérifiez votre clé et réessayez.");
    } finally {
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  renderArticles();

  if (hasValidKey()) {
    setStatus("ready", "Gemini Flash est configuré. Vous pouvez commencer une conversation.");
    addMessage(
      "assistant",
      "Bonjour. Je suis Guebre-ai. Posez-moi des questions sur les actualités scolaires, des conseils d'étude ou un sujet que vous aimeriez voir expliqué clairement."
    );
  } else {
    setStatus("missing", "Aucune clé API pour le moment. Ajoutez votre clé Gemini dans config.js.");
    addMessage("system", missingKeyMessage());
  }

  chatForm.addEventListener("submit", onSubmit);
})();
