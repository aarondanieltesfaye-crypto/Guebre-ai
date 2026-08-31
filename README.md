# Guebre-ai

Guebre-ai is a user-friendly assistant and news platform.

This project is a clean, responsive single-page application for school news, announcements, and a prototype AI chat assistant powered by Google Gemini Flash.

## Features

- Responsive layout that works on phones, tablets, and desktops
- Navigation header with the Guebre-ai title
- AI chat prototype for helpful, school-appropriate questions
- Actualités section for school news and announcements
- French-flag color theme: bleu `#002395`, blanc `#FFFFFF`, rouge `#ED2939`
- Ready for free hosting on GitHub Pages

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and sections |
| `styles.css` | Theme, layout, and responsive styles |
| `app.js` | Chat UI, articles rendering, and Gemini API calls |
| `config.js` | Placeholder for your Gemini API key |
| `.gitignore` | Standard ignore rules for local files |

## Add your Gemini API key (local testing)

1. Open `config.js`.
2. Replace `YOUR_API_KEY_HERE` with your free Gemini API key.
3. Keep that key private. Do not commit a real key to a public repository.

The key is read from `window.GUEBRE_CONFIG.GEMINI_API_KEY` in `app.js`.

If the placeholder is still present, the chat box will show a helpful message instead of calling the API.

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**.
5. Click **Save**.

After a minute or two, the site will be available at:

`https://aarondanieltesfaye-crypto.github.io/Guebre-ai/`

## Local preview

Open `index.html` in a browser, or serve the folder with any static file server. All asset paths are relative so the page works both locally and on GitHub Pages.

## Note about API keys

This is a client-side prototype. A browser-exposed key is only for personal testing. For a public production site, move the Gemini call to a backend or serverless function so the key stays secret.
