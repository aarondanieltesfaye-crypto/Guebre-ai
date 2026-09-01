const { corsHeaders, handleChatRequest } = require("../server/chat-core");

module.exports = async function (req, res) {
  var headers = corsHeaders();
  Object.keys(headers).forEach(function (name) {
    res.setHeader(name, headers[name]);
  });

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Utilisez POST." }));
    return;
  }

  var chunks = [];
  if (req.body) {
    var result = await handleChatRequest(
      typeof req.body === "string" ? req.body : JSON.stringify(req.body),
      process.env.GROQ_API_KEY
    );
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
    return;
  }

  req.on("data", function (chunk) {
    chunks.push(chunk);
  });
  req.on("end", async function () {
    var result = await handleChatRequest(Buffer.concat(chunks).toString("utf8"), process.env.GROQ_API_KEY);
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
  });
};
