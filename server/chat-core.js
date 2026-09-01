const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.1-8b-instant";

const SYSTEM_PROMPT =
  "Tu es Guebre-ai, un assistant scolaire amical et une aide aux actualités. " +
  "Donne des réponses claires, bienveillantes et adaptées aux élèves. " +
  "Utilise un langage simple et respectueux. " +
  "Si une question ne porte pas sur l'école, l'apprentissage ou des connaissances générales, réponds quand même de façon utile et brève. " +
  "Réponds toujours en français.";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
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

  var model = process.env.GROQ_MODEL || DEFAULT_MODEL;
  var response;
  try {
    response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: model,
        temperature: 0.7,
        messages: [{ role: "system", content: SYSTEM_PROMPT }].concat(history)
      })
    });
  } catch (error) {
    return { status: 502, body: { error: "Impossible de joindre Groq pour le moment." } };
  }

  var data;
  try {
    data = await response.json();
  } catch (error) {
    return { status: 502, body: { error: "Groq a renvoyé une réponse illisible." } };
  }

  if (!response.ok) {
    var apiMessage =
      (data && data.error && data.error.message) ||
      "La requete Groq a echoue (" + response.status + ").";
    return { status: response.status, body: { error: apiMessage } };
  }

  var text =
    data &&
    data.choices &&
    data.choices[0] &&
    data.choices[0].message &&
    data.choices[0].message.content;

  if (!text || !String(text).trim()) {
    return { status: 502, body: { error: "Groq n'a renvoyé aucun texte." } };
  }

  return { status: 200, body: { reply: String(text).trim() } };
}

module.exports = {
  corsHeaders: corsHeaders,
  handleChatRequest: handleChatRequest
};
