(function () {
  var READY = {
    fr: "Assistant prêt.",
    en: "Assistant ready.",
    am: "ረዳቱ ዕግጁ ነው።"
  };
  var ABOUT = {
    fr: {
      title: "À propos de Guebre-ai",
      lead: "Guebre-ai est l'assistant du Lycée Guebre-Mariam, établissement du réseau AEFE. Le lycée compte environ 1 800 élèves, de la maternelle à la terminale, dont environ 70 % d'Éthiopiens, parmi une cinquantaine de nationalités.",
      items: [
        "Il répond à partir des documents de l'école — calendrier, actualités, qui contacter — et cite la source. S'il n'a pas le document, il oriente vers la vie scolaire au lieu d'inventer.",
        "Pont trilingue pour les familles : le lycée fonctionne en français. L'assistant peut expliquer une information officielle en français, en anglais ou en amharique.",
        "Les actualités donnent une raison d'ouvrir le site même sans question, et chaque annonce validée devient une source que l'assistant peut citer.",
        "Version actuelle : documents officiels et annonces. Pas de notes individuelles, pas de rédaction de devoirs."
      ]
    },
    en: {
      title: "About Guebre-ai",
      lead: "Guebre-ai is the assistant of Lycée Guebre-Mariam, an AEFE school. The campus has about 1,800 students from preschool to terminale, roughly 70% Ethiopian, across some fifty nationalities.",
      items: [
        "It answers from school documents — calendar, news, who to ask — and cites the source. If it has no document, it sends you to vie scolaire instead of guessing.",
        "A trilingual bridge for families: the school runs in French. The assistant can explain official information in French, English, or Amharic.",
        "News gives people a reason to open the site even without a question, and each approved post becomes a source the assistant can cite.",
        "Current version: official documents and announcements. No individual grades, no homework writing."
      ]
    },
    am: {
      title: "ስለ Guebre-ai",
      lead: "Guebre-ai የሊሴ ግብረ ማርያም ረዳት ነው። ትምህርት ቤት አዊ አድስ 1,800 ተማሪዎች አሉት። እንደ ጠርተኛ አማርኛ ናቸው።",
      items: [
        "ከትምህርት ቤት ሰነዶች ይመልሳል እና ምንጩን ይጠቅሳል። ሰነድ ከለለው ወደ ትምህርት ሕይወት ይለካል።",
        "ለቤተሰብ ዳልሳ እንገ ማጅኛ። ትምህርት ቤት በፈረንሳይኛ ይሰራል። ረዳቱ በፈረንሳይኛ፣ በእንግሊዝኛ ወይም በአማርኛ ይገልጻል።",
        "ዘና ጥያቄ በሌለ ጠያቄ ግቤ ገጽ የሚከፍት ምክንያ ነው።",
        "የአሁኑ ስሪት። የትምህርት ቤት ሰነዶች እና ማስታወቂያዎች። የግል ውጤቶች እና የቤት ስራ አይጠፋመም።"
      ]
    }
  };

  function lang() {
    var value = localStorage.getItem("guebre-lang") || "fr";
    return ABOUT[value] ? value : "fr";
  }

  function renderAbout() {
    var pack = ABOUT[lang()];
    var title = document.querySelector("#about h2");
    var lead = document.getElementById("about-lead");
    var list = document.getElementById("about-list");
    if (title) title.textContent = pack.title;
    if (lead) lead.textContent = pack.lead;
    if (!list) return;
    list.innerHTML = "";
    pack.items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
  }

  function cleanStatus() {
    var el = document.getElementById("api-status");
    if (!el) return;
    var text = el.textContent || "";
    if (/API|clé API|api key|server/i.test(text)) {
      el.textContent = READY[lang()];
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAbout();
    cleanStatus();
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () {
          renderAbout();
          cleanStatus();
        }, 0);
      });
    });
    var status = document.getElementById("api-status");
    if (status && window.MutationObserver) {
      new MutationObserver(cleanStatus).observe(status, { childList: true, characterData: true, subtree: true });
    }
  });
})();
