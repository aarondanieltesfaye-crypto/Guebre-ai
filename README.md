# Guebre-ai

Guebre-ai est un assistant convivial et une plateforme d'actualités du Lycée Guebre-Mariam.

Site en ligne : [https://guebre-ai.netlify.app](https://guebre-ai.netlify.app)

Dernière mise à jour : 4 septembre 2026 — quota 7 questions / jour, menu Paramètres.

Les visiteurs n'entrent **jamais** de clé API. La clé Groq est stockée uniquement comme variable d'environnement Netlify (`GROQ_API_KEY`).

## Comment ça marche

- Le site public est servi par Netlify.
- Le chat envoie la question à `/.netlify/functions/chat`.
- Cette fonction serveur appelle Groq avec la clé cachée.
- Le visiteur reçoit seulement la réponse.

## Fichiers importants

| Fichier | Rôle |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Site public, sans clé |
| `server/chat-core.js` | Logique d'appel Groq |
| `netlify/functions/chat.js` | Backend Netlify |
| `api/chat.js` | Backend Vercel |
| `server.js` | Backend local |
| `.env.example` | Modele de variable, sans vraie clé |
