/**
 * Official / semi-official LGM documents the assistant may cite.
 * Add a new object here after the school allows the document.
 * Never put grades, attendance, or individual student records.
 */
var directory = require("../contacts");

module.exports = [
  {
    id: "calendrier-2026-2027",
    title: "Calendrier scolaire Lycée Guebre-Mariam 2026-2027",
    date: "2026-2027",
    owner: "Lycée Guebre-Mariam",
    text:
      "École : Lycée Guebre-Mariam (LGM), Addis-Abeba.\n" +
      "Année scolaire : 2026-2027.\n" +
      "Légende : c = jour de cours ; v = vacances ; Férié = jour férié ; PRE = prérentrée des enseignants ; RE = rentrée des élèves.\n" +
      "Prérentrée des enseignants (PRE) : mardi 1er septembre 2026.\n" +
      "Rentrée des élèves (RE) : mercredi 2 septembre 2026.\n" +
      "Jours fériés / fermetures notées sur le calendrier officiel :\n" +
      "- 11 septembre 2026 : Nouvel An éthiopien (Addis Amet)\n" +
      "- 27 septembre 2026 : Fête de la Croix (Meskel)\n" +
      "- 4 octobre 2026 : Irrecha\n" +
      "- 7 janvier 2027 : Noël orthodoxe (Gena)\n" +
      "- 19 janvier 2027 : Timkat\n" +
      "- 20 janvier 2027 : Saint Mickael\n" +
      "- 2 mars 2027 : Bataille d'Adwa\n" +
      "- 10 mars 2027 : Aïd al-Fitr (fête mobile)\n" +
      "- 30 avril 2027 : Vendredi Saint (Siklet)\n" +
      "- 1er mai 2027 : Fête des Travailleurs\n" +
      "- 2 mai 2027 : Pâques orthodoxe (Fasika)\n" +
      "- 5 mai 2027 : Fête des Patriotes\n" +
      "- 17 mai 2027 : Aïd al-Arafa (fête mobile)\n" +
      "- 28 mai 2027 : Chute du Derg.\n" +
      "Août 2026 est en vacances avant la rentrée.\n" +
      "Pour les semaines de congés complètes non listées ici, dire de consulter le PDF officiel du calendrier ou la vie scolaire. Ne pas inventer d'autres dates."
  },
  {
    id: "annuaire-officiel-contact",
    title: "Annuaire officiel LGM — page Contact (guebre-mariam.org/contact)",
    date: "2026-09",
    owner: "Lycée Guebre-Mariam",
    text:
      "Source unique pour les emails : la page Contact du lycée, https://www.guebre-mariam.org/contact/\n" +
      "Adresse : Churchill Avenue, Addis-Abeba 1496. Standard : 01 11 55 16 03 / +251 11 155 1603.\n" +
      "Quand un élève, un parent ou un membre du personnel demande à qui écrire, DONNER l'email exact ci-dessous. Ne jamais inventer un email.\n" +
      "Proposer 1 à 3 options selon le sujet, avec le nom, le rôle et l'adresse email.\n\n" +
      directory.formatDirectory() +
      "\n\nRappels utiles :\n" +
      "- Absence / retard au collège-lycée : vie.scolaire.secondaire.addisabeba.lgm@mlfmonde.org (Mme Myriam Tesfaye) — tél 01 11 55 21 73.\n" +
      "- Absence / retard en élémentaire : tél 09 53 97 23 64, ou dinknesh.geletu@mlfmonde.org / vie.scolaire.primaire.addisabeba.lgm@mlfmonde.org.\n" +
      "- Infirmerie / PAI santé : infirmerie.addisabeba.lgm@mlfmonde.org — tél 01 11 11 44 04.\n" +
      "- Factures et paiements : facturation.addisabeba.lgm@mlfmonde.org (M. Fitsum Getachew).\n" +
      "- Orientation (études en France, spécialités) : gilles.depaux@mlfmonde.org.\n" +
      "- Informatique : dsi.addisabeba.lgm@mlfmonde.org (M. Wondwossen Assefa).\n" +
      "- Communication parents / événements : laila.said@mlfmonde.org.\n" +
      "- Direction : secretariat.proviseur.addisabeba.lgm@mlfmonde.org."
  },
  {
    id: "regles-produit",
    title: "Règles Guebre-ai V1",
    date: "2026-09-01",
    owner: "Guebre-ai",
    text:
      "Guebre-ai sert les élèves et familles du Lycée Guebre-Mariam.\n" +
      "Ne jamais inventer notes, absences ou sanctions d'un élève.\n" +
      "Ne pas rédiger les devoirs, dissertations ou copies d'examen. Expliquer une notion est possible.\n" +
      "Ne pas publier de visages d'élèves sans autorisation droit à l'image.\n" +
      "Toujours donner l'email officiel quand on oriente vers une personne du lycée."
  }
];
