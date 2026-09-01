# Documents LGM pour Guebre-ai

Guebre-ai n'est **pas entraîné** comme un nouveau cerveau. Il lit un corpus fixe, puis répond en citant la source. C'est plus sûr pour une école, moins cher, et plus facile à corriger.

## Comment ajouter un document (calendrier, circulaire, menu, etc.)

1. Obtenez l'accord écrit de la direction (une page suffit : quels documents, qui valide, qui peut arrêter le projet).
2. Utilisez seulement des documents **publics ou semi-publics** de l'établissement. Jamais les notes, l'assiduité ou le dossier d'un élève.
3. Copiez le texte utile (dates, règles, horaires) dans `knowledge/lgm-corpus.js`.
4. Remplissez `title`, `date`, `owner`, `text`.
5. Envoyez le fichier sur GitHub. Netlify republie le site. L'assistant peut alors citer ce document.

Un PDF image (comme le calendrier) doit d'abord être relu à la main. Une date fausse est pire que pas de réponse.

## Format

```js
{
  id: "circulaire-sortie-12-sept",
  title: "Circulaire sortie scolaire",
  date: "2026-09-05",
  owner: "Vie scolaire",
  text: "Texte officiel recopié..."
}
```
