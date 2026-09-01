const path = require("path");
const express = require("express");
const { handleChatRequest } = require("./server/chat-core");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "32kb" }));
app.use(express.static(__dirname));

app.options("/api/chat", function (req, res) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  });
  res.status(204).end();
});

app.post("/api/chat", async function (req, res) {
  var result = await handleChatRequest(req.body, process.env.GROQ_API_KEY);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(result.status).json(result.body);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, function () {
  console.log("Guebre-ai est pret sur http://localhost:" + port);
});
