# Guebre-ai

Guebre-ai est un assistant convivial et une plateforme d'actualités.

Ce projet est une application monopage claire et responsive, destinée aux actualités scolaires, aux annonces et à un prototype d'assistant IA alimenté par DeepSeek. Toute l'interface est en français.

## Fonctionnalités

- Mise en page responsive pour téléphone, tablette et ordinateur
- En-tête de navigation avec le titre Guebre-ai
- Prototype de discussion IA via l'API DeepSeek
- Saisie de la clé API dans le navigateur (sans la publier sur GitHub)
- Section Actualités pour les nouvelles et les annonces de l'école
- Thème aux couleurs du drapeau français : bleu `#002395`, blanc `#FFFFFF`, rouge `#ED2939`
- Prêt pour un hébergement gratuit sur GitHub Pages

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et sections |
| `styles.css` | Thème, mise en page et styles responsive |
| `app.js` | Interface de discussion, articles et appels à l'API DeepSeek |
| `config.js` | Réglages du modèle DeepSeek |
| `.gitignore` | Fichiers locaux à ne pas versionner |

## Activer DeepSeek

GitHub refuse de publier une vraie clé API dans un dépôt public. Pour utiliser l'assistant :

1. Ouvrez le site.
2. Collez votre clé DeepSeek dans le champ au-dessus du chat.
3. Cliquez sur **Enregistrer**.

La clé reste uniquement dans votre navigateur (`localStorage`). Elle n'est pas envoyée vers GitHub.

Le modèle utilisé est `deepseek-chat`, via `https://api.deepseek.com/chat/completions`.

## Activer GitHub Pages

1. Ouvrez le dépôt sur GitHub.
2. Allez dans **Settings** → **Pages**.
3. Sous **Build and deployment**, choisissez **Deploy from a branch**.
4. Sélectionnez la branche **main** et le dossier **/ (root)**.
5. Cliquez sur **Save**.

Site : `https://aarondanieltesfaye-crypto.github.io/Guebre-ai/`

## Note sur les clés API

Ne publiez jamais une clé dans `config.js` sur un dépôt public. Pour un vrai site, déplacez l'appel DeepSeek vers un serveur afin de garder la clé secrète.
