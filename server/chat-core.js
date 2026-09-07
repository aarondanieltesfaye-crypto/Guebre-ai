const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.1-8b-instant";
const FALLBACK_MODELS = [
  "llama-3.1-8b-instant",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile"
];

const corpus = require("../knowledge/lgm-corpus");

function buildSystemPrompt(uiLang) {
  var docs = corpus
    .map(function (doc) {
      return (
        "### " +
        doc.title +
        "\nDate : " +
        doc.date +
        "\nPropriétaire : " +
        doc.owner +
        "\n" +
        doc.text
      );
    })
    .join("\n\n");

  var ui =
    uiLang === "en"
      ? "The website language is English. Prefer English unless the latest user message is clearly in another language."
      : uiLang === "am"
        ? "The website language is Amharic. Prefer Amharic unless the latest user message is clearly in another language."
        : "The website language is French. Prefer French unless the latest user message is clearly in another language.";

  return (
    "You are Guebre-ai, the school assistant for Lycée Guebre-Mariam (LGM) in Addis Ababa.\n" +
    ui +
    "\nLANGUAGE RULE (highest priority): Answer in the same language as the user's latest message. " +
    "English question → English answer. French → French. Amharic → Amharic. " +
    "If the message mixes languages, use the main language of that question.\n" +
    "EMAIL RULE: When the user asks who to contact, who to email, or mentions a school service " +
    "(vie scolaire, absences, infirmerie, facture, orientation, informatique, direction, primaire…), " +
    "ALWAYS list 1 to 3 matching people from the official directory with their exact email address. " +
    "Never invent an email, phone number, or name. If several people could help, give options.\n" +
    "SCHOOL FACTS: For LGM dates, holidays, rules, who-to-ask, or school news, use ONLY the source documents below. " +
    "Cite the document title. If the answer is not in those documents, say you do not have an official document and give the vie scolaire email. Do not guess a date.\n" +
    "GENERAL CHAT: Greetings and ordinary explanations are allowed without a school source.\n" +
    "SAFETY: Be kind and age-appropriate. Do not write homework, essays, or exam answers. Never invent grades, attendance, or discipline records.\n\n" +
    "SOURCE DOCUMENTS:\n" +
    docs
  );
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}

function resolveModel() {
  var requested = (process.env.GROQ_MODEL || DEFAULT_MODEL).trim();
  return requested || DEFAULT_MODEL;
}

function extractText(data) {
  var message = data && data.choices && data.choices[0] && data.choices[0].message;
  if (!message) return "";
  var content = message.content;
  if (Array.isArray(content)) {
    content = content
      .map(function (part) {
        if (typeof part === "string") return part;
        return (part && (part.text || part.content)) || "";
      })
      .join("\n");
  }
  var text = content && String(content).trim();
  if (text) return text;
  if (message.reasoning && String(message.reasoning).trim()) {
    return String(message.reasoning).trim();
  }
  return "";
}

function modelList() {
  var first = resolveModel();
  var list = [first];
  FALLBACK_MODELS.forEach(function (name) {
    if (list.indexOf(name) === -1) list.push(name);
  });
  return list;
}

function normalizeMessages(input) {
  if (!Array.isArray(input)) {
    return [];
  }
  return input
    .filter(function (item) {
      return item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string";
    })
    .map(function (item) {
      return {
        role: item.role,
        content: item.content.trim().slice(0, 4000)
      };
    })
    .filter(function (item) {
      return item.content.length > 0;
    })
    .slice(-12);
}

async function callGroq(apiKey, model, history, uiLang) {
  var response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: model,
      temperature: 0.3,
      max_tokens: 1024,
      messages: [{ role: "system", content: buildSystemPrompt(uiLang) }].concat(history)
    })
  });

  var data;
  try {
    data = await response.json();
  } catch (error) {
    return { ok: false, status: 502, error: "Groq a renvoyé une réponse illisible." };
  }

  if (!response.ok) {
    var apiMessage =
      (data && data.error && data.error.message) ||
      "La requete Groq a echoue (" + response.status + ").";
    return { ok: false, status: response.status, error: apiMessage };
  }

  var text = extractText(data);
  if (!text) {
    return { ok: false, status: 502, error: "Groq n'a renvoyé aucun texte." };
  }

  return { ok: true, text: text };
}

async function handleChatRequest(rawBody, apiKey) {
  if (!apiKey) {
    return {
      status: 500,
      body: {
        error: "La clé Groq n'est pas configurée sur le serveur. Ajoutez GROQ_API_KEY dans les variables d'environnement."
      }
    };
  }

  var parsed;
  try {
    parsed = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : rawBody || {};
  } catch (error) {
    return { status: 400, body: { error: "Requete JSON invalide." } };
  }

  var history = normalizeMessages(parsed.messages);
  if (!history.length) {
    return { status: 400, body: { error: "Ajoutez au moins un message." } };
  }

  var uiLang = parsed.language === "en" || parsed.language === "am" || parsed.language === "fr" ? parsed.language : "fr";
  var models = modelList();
  var result = { ok: false, status: 502, error: "Aucun modèle disponible." };
  try {
    for (var i = 0; i < models.length; i += 1) {
      result = await callGroq(apiKey, models[i], history, uiLang);
      if (result.ok) break;
    }
  } catch (error) {
    return { status: 502, body: { error: "Impossible de joindre Groq pour le moment." } };
  }

  if (!result.ok) {
    return { status: result.status || 502, body: { error: result.error } };
  }

  return { status: 200, body: { reply: result.text } };
}

module.exports = {
  corsHeaders: corsHeaders,
  handleChatRequest: handleChatRequest
};
