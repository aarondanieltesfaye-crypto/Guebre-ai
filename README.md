# Guebre-ai

Guebre-ai est un assistant convivial et une plateforme d'actualités.

Ce projet est une application monopage claire et responsive, destinée aux actualités scolaires, aux annonces et à un prototype d'assistant IA alimenté par Google Gemini Flash. Toute l'interface est en français.

## Fonctionnalités

- Mise en page responsive pour téléphone, tablette et ordinateur
- En-tête de navigation avec le titre Guebre-ai
- Prototype de discussion IA pour des questions utiles et adaptées au milieu scolaire
- Section Actualités pour les nouvelles et les annonces de l'école
- Thème aux couleurs du drapeau français : bleu `#002395`, blanc `#FFFFFF`, rouge `#ED2939`
- Prêt pour un hébergement gratuit sur GitHub Pages

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et sections |
| `styles.css` | Thème, mise en page et styles responsive |
| `app.js` | Interface de discussion, articles et appels à l'API Gemini |
| `config.js` | Emplacement de votre clé API Gemini |
| `.gitignore` | Fichiers locaux à ne pas versionner |

## Ajouter votre clé API Gemini (test local)

1. Ouvrez `config.js`.
2. Remplacez `YOUR_API_KEY_HERE` par votre clé API Gemini gratuite.
3. Gardez cette clé privée. Ne la publiez pas dans un dépôt public.

La clé est lue depuis `window.GUEBRE_CONFIG.GEMINI_API_KEY` dans `app.js`.

Si le texte de remplacement est encore présent, la zone de discussion affiche un message d'aide au lieu d'appeler l'API.

## Activer GitHub Pages

1. Ouvrez le dépôt sur GitHub.
2. Allez dans **Settings** → **Pages**.
3. Sous **Build and deployment**, choisissez **Deploy from a branch**.
4. Sélectionnez la branche **main** et le dossier **/ (root)**.
5. Cliquez sur **Save**.

Après une ou deux minutes, le site sera disponible à l'adresse :

`https://aarondanieltesfaye-crypto.github.io/Guebre-ai/`

## Aperçu local

Ouvrez `index.html` dans un navigateur, ou servez le dossier avec n'importe quel serveur de fichiers statiques. Tous les chemins sont relatifs, donc la page fonctionne en local et sur GitHub Pages.

## Note sur les clés API

Ceci est un prototype côté navigateur. Une clé visible dans le navigateur sert uniquement aux tests personnels. Pour un site public, déplacez l'appel Gemini vers un serveur afin de garder la clé secrète.
