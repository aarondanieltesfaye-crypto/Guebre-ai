(function () {
  "use strict";

  var STORAGE_KEY = "guebre_deepseek_api_key";
  var PLACEHOLDER_KEY = "YOUR_API_KEY_HERE";
  var config = window.GUEBRE_CONFIG || {};
  var model = config.DEEPSEEK_MODEL || "deepseek-chat";
  var endpoint = config.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";

  var SYSTEM_PROMPT =
    "Tu es Guebre-ai, un assistant scolaire amical et une aide aux actualités. " +
    "Donne des réponses claires, bienveillantes et adaptées aux élèves. " +
    "Utilise un langage simple et respectueux. " +
    "Si une question ne porte pas sur l'école, l'apprentissage ou des connaissances générales, réponds quand même de façon utile et brève. " +
    "Réponds toujours en français.";

  var chatLog = document.getElementById("chat-log");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var sendButton = document.getElementById("send-button");
  var statusText = document.getElementById("api-status");
  var statusDot = document.getElementById("api-status-dot");
  var articlesFeed = document.getElementById("articles-feed");
  var keyForm = document.getElementById("key-form");
  var keyInput = document.getElementById("api-key-input");

  var conversation = [{ role: "system", content: SYSTEM_PROMPT }];
  var greeted = false;

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

  function readStoredKey() {
    try {
      return (window.localStorage.getItem(STORAGE_KEY) || "").trim();
    } catch (error) {
      return "";
    }
  }

  function writeStoredKey(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // Le navigateur peut bloquer localStorage en navigation privée.
    }
  }

  function getApiKey() {
    var stored = readStoredKey();
    if (isUsableKey(stored)) {
      return stored;
    }
    var fromConfig = (config.DEEPSEEK_API_KEY || "").trim();
    if (isUsableKey(fromConfig)) {
      return fromConfig;
    }
    return "";
  }

  function isUsableKey(value) {
    return Boolean(value) && value !== PLACEHOLDER_KEY && value.indexOf("sk-") === 0;
  }

  function hasValidKey() {
    return isUsableKey(getApiKey());
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
      "Pour activer l'assistant DeepSeek, collez votre clé API dans le champ ci-dessus puis cliquez sur Enregistrer. " +
      "La clé reste dans votre navigateur et n'est pas publiée sur GitHub."
    );
  }

  function refreshKeyUi() {
    if (hasValidKey()) {
      keyForm.classList.add("is-configured");
      keyInput.value = "";
      keyInput.placeholder = "Clé DeepSeek enregistrée dans ce navigateur";
      setStatus("ready", "DeepSeek est configuré. Vous pouvez commencer une conversation.");
      if (!greeted) {
        addMessage(
          "assistant",
          "Bonjour. Je suis Guebre-ai, propulsé par DeepSeek. Posez-moi des questions sur les actualités scolaires, des conseils d'étude ou un sujet que vous aimeriez voir expliqué clairement."
        );
        greeted = true;
      }
    } else {
      keyForm.classList.remove("is-configured");
      setStatus("missing", "Collez votre clé API DeepSeek pour activer l'assistant.");
    }
  }

  async function askDeepSeek(prompt) {
    conversation.push({ role: "user", content: prompt });

    var response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getApiKey()
      },
      body: JSON.stringify({
        model: model,
        messages: conversation,
        temperature: 0.7
      })
    });

    var data;
    try {
      data = await response.json();
    } catch (error) {
      conversation.pop();
      throw new Error("Le service DeepSeek a renvoyé une réponse illisible.");
    }

    if (!response.ok) {
      conversation.pop();
      var apiMessage =
        (data && data.error && (data.error.message || data.error)) ||
        "La requête DeepSeek a échoué (" + response.status + ").";
      if (typeof apiMessage !== "string") {
        apiMessage = "La requête DeepSeek a échoué (" + response.status + ").";
      }
      throw new Error(apiMessage);
    }

    var text =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;

    if (!text || !String(text).trim()) {
      conversation.pop();
      throw new Error("DeepSeek n'a renvoyé aucun texte. Essayez une autre question.");
    }

    text = String(text).trim();
    conversation.push({ role: "assistant", content: text });
    return text;
  }

  function onSaveKey(event) {
    event.preventDefault();
    var value = (keyInput.value || "").trim();
    if (!isUsableKey(value)) {
      addMessage(
        "system",
        "Cette clé ne semble pas valide. Une clé DeepSeek commence généralement par sk-."
      );
      setStatus("missing", "Clé invalide. Vérifiez-la puis réessayez.");
      return;
    }
    writeStoredKey(value);
    keyInput.value = "";
    addMessage("system", "Clé DeepSeek enregistrée dans ce navigateur. Vous pouvez poser une question.");
    refreshKeyUi();
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
      setStatus("missing", "Clé API manquante. Enregistrez-la pour activer le chat.");
      return;
    }

    sendButton.disabled = true;
    var thinking = addMessage("assistant", "Réflexion en cours…");

    try {
      var answer = await askDeepSeek(prompt);
      thinking.querySelector("div").textContent = answer;
    } catch (error) {
      thinking.className = "message system";
      thinking.querySelector(".label").textContent = "Avis";
      var message =
        error && error.message
          ? error.message
          : "Une erreur s'est produite lors de la connexion à DeepSeek.";
      if (/Failed to fetch|NetworkError|CORS/i.test(message)) {
        message =
          "Le navigateur a bloqué l'appel à DeepSeek (souvent à cause du CORS). " +
          "Vérifiez la clé et votre connexion. Si le blocage continue, l'API devra être appelée via un petit serveur.";
      }
      thinking.querySelector("div").textContent = message;
      setStatus("error", "La dernière requête a échoué. Vérifiez votre clé et réessayez.");
    } finally {
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  renderArticles();

  if (!hasValidKey()) {
    addMessage("system", missingKeyMessage());
  }
  refreshKeyUi();

  keyForm.addEventListener("submit", onSaveKey);
  chatForm.addEventListener("submit", onSubmit);
})();
