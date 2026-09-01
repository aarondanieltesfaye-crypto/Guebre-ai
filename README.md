# Guebre-ai

Guebre-ai est un assistant convivial et une plateforme d'actualités.

Les visiteurs n'entrent **jamais** de clé API. La clé reste dans une variable d'environnement sur le serveur.

La clé fournie commence par `gsk_`. C'est le format des clés **Groq** (souvent confondu avec Grok). Le backend appelle donc l'API Groq : `https://api.groq.com/openai/v1/chat/completions`.

## Pourquoi pas GitHub Pages seul ?

GitHub Pages n'héberge que des fichiers statiques. Une clé placée dans `config.js` serait visible par tout le monde, et GitHub bloque la publication des secrets. Il faut un petit backend.

## Mise en ligne recommandée (Netlify, gratuit)

1. Allez sur [https://app.netlify.com](https://app.netlify.com) et connectez-vous avec GitHub.
2. Cliquez sur **Add new site** → **Import an existing project**.
3. Choisissez le dépôt `Guebre-ai`.
4. Laissez les réglages par défaut (`netlify.toml` est déjà dans le projet).
5. Avant ou juste après le déploiement : **Site configuration** → **Environment variables** → ajoutez :
   - Nom : `GROQ_API_KEY`
   - Valeur : votre clé Groq (`gsk_...`)
6. Redéployez le site.

Le chat appellera `/.netlify/functions/chat`. Les visiteurs parlent à Guebre-ai sans voir la clé.

Alternative : importez le même dépôt sur [Vercel](https://vercel.com) et ajoutez la même variable `GROQ_API_KEY`.

## Test en local

```bash
cp .env.example .env
# Placez GROQ_API_KEY dans votre terminal, sans la commiter
export GROQ_API_KEY="votre_cle"
npm install
npm start
```

Ouvrez `http://localhost:3000`.

## Fichiers importants

| Fichier | Rôle |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Site public, sans clé |
| `server/chat-core.js` | Logique d'appel Groq |
| `netlify/functions/chat.js` | Backend Netlify |
| `api/chat.js` | Backend Vercel |
| `server.js` | Backend local / Render |
| `.env.example` | Modele de variable, sans vraie clé |

## Securite

- Ne commitez jamais la clé dans le dépôt.
- Si une clé a été collée dans un chat ou une capture, recréez-la dans la console Groq puis mettez uniquement la nouvelle valeur dans Netlify/Vercel.
