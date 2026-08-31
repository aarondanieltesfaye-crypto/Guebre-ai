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
      tag: "Announcement",
      title: "Welcome to the new school term",
      date: "31 August 2026",
      body: "Classes resume this week. Please check your timetable and bring the required books on the first day."
    },
    {
      tag: "Actualités",
      title: "Library hours extended",
      date: "28 August 2026",
      body: "The school library will stay open until 17:30 from Monday to Thursday so students can finish homework in a quiet space."
    },
    {
      tag: "Clubs",
      title: "Science club first meeting",
      date: "2 September 2026",
      body: "Join the science club in Room B12 after school. New members are welcome. No experience needed, only curiosity."
    },
    {
      tag: "Community",
      title: "Family information evening",
      date: "5 September 2026",
      body: "Parents and guardians are invited to an information evening about school programs, sports, and support services."
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
      label.textContent = "You";
    } else if (role === "assistant") {
      label.textContent = "Guebre-ai";
    } else {
      label.textContent = "Notice";
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
      "To test the assistant, open config.js and replace YOUR_API_KEY_HERE with your free Gemini API key. " +
      "Keep the real key private and do not publish it in this public repository."
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
              "You are Guebre-ai, a friendly school assistant and news helper. " +
              "Give clear, kind, age-appropriate answers. Keep language suitable for students. " +
              "If a question is not about school, learning, or general knowledge, still answer helpfully and briefly."
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
      throw new Error("The Gemini service returned an unreadable response.");
    }

    if (!response.ok) {
      var apiMessage =
        (data && data.error && data.error.message) ||
        "Gemini request failed (" + response.status + ").";
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
      throw new Error("Gemini did not return any text. Try another question.");
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
      setStatus("missing", "API key missing. Add it in config.js to enable chat.");
      return;
    }

    sendButton.disabled = true;
    var thinking = addMessage("assistant", "Thinking…");

    try {
      var answer = await askGemini(prompt);
      thinking.querySelector("div").textContent = answer;
    } catch (error) {
      thinking.className = "message system";
      thinking.querySelector(".label").textContent = "Notice";
      thinking.querySelector("div").textContent =
        error && error.message
          ? error.message
          : "Something went wrong while contacting Gemini.";
      setStatus("error", "The last request did not succeed. Check your key and try again.");
    } finally {
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  renderArticles();

  if (hasValidKey()) {
    setStatus("ready", "Gemini Flash is configured. You can start a conversation.");
    addMessage(
      "assistant",
      "Hello. I am Guebre-ai. Ask me about school news, study tips, or a topic you want explained clearly."
    );
  } else {
    setStatus("missing", "No API key yet. Add your Gemini key in config.js.");
    addMessage("system", missingKeyMessage());
  }

  chatForm.addEventListener("submit", onSubmit);
})();
