const { corsHeaders, handleChatRequest } = require("../../server/chat-core");

exports.handler = async function (event) {
  var headers = Object.assign({ "Content-Type": "application/json" }, corsHeaders());

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: headers,
      body: JSON.stringify({ error: "Utilisez POST." })
    };
  }

  var result = await handleChatRequest(event.body, process.env.GROQ_API_KEY);
  return {
    statusCode: result.status,
    headers: headers,
    body: JSON.stringify(result.body)
  };
};
