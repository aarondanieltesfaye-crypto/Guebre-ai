<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Guebre-ai est un assistant convivial et une plateforme d'actualités.">
  <title>Guebre-ai — Assistant et Actualités</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Aller au contenu</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#top" aria-label="Accueil Guebre-ai">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-name">Guebre-ai</span>
      </a>
      <nav class="main-nav" aria-label="Principal">
        <a href="#assistant">Assistant</a>
        <a href="#actualites">Actualités</a>
        <a href="#about">À propos</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <div class="container">
        <p class="eyebrow">Assistant et plateforme d'actualités</p>
        <h1>Des réponses claires. Des nouvelles scolaires fraîches.</h1>
        <p class="lede">Guebre-ai aide les élèves et les familles à trouver des annonces, à lire des articles et à poser des questions à un assistant IA amical pour un soutien scolaire.</p>
      </div>
    </section>

    <section class="assistant-section" id="assistant">
      <div class="container">
        <div class="section-heading">
          <h2>Assistant IA</h2>
          <p>Posez une question sur la vie scolaire, des idées de devoirs ou les dernières annonces.</p>
        </div>

        <div class="chat-card" role="region" aria-label="Discussion Guebre-ai">
          <div class="chat-toolbar">
            <span class="status-dot" id="api-status-dot" aria-hidden="true"></span>
            <p id="api-status" class="api-status">Vérification de la configuration de l'API…</p>
          </div>

          <div id="chat-log" class="chat-log" aria-live="polite"></div>

          <form id="chat-form" class="chat-form">
            <label class="sr-only" for="chat-input">Votre question</label>
            <textarea id="chat-input" name="message" rows="2" maxlength="2000" placeholder="Tapez votre question ici…" required></textarea>
            <button type="submit" id="send-button" class="btn-primary">Envoyer</button>
          </form>
        </div>
      </div>
    </section>

    <section class="news-section" id="actualites">
      <div class="container">
        <div class="section-heading">
          <h2>Actualités</h2>
          <p>Nouvelles scolaires, annonces et articles.</p>
        </div>
        <div id="articles-feed" class="articles-grid"></div>
      </div>
    </section>

    <section class="about-section" id="about">
      <div class="container about-card">
        <h2>À propos de Guebre-ai</h2>
        <p>Guebre-ai est un assistant convivial et une plateforme d'actualités. Cette première version est un prototype statique pouvant être hébergé gratuitement sur GitHub Pages.</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Guebre-ai. Conçu comme une base ouverte pour les actualités scolaires et des réponses utiles.</p>
    </div>
  </footer>

  <script src="config.js"></script>
  <script src="app.js"></script>
</body>
</html>
