(function () {
  var PALETTE_KEY = "guebre-palette";
  var MODE_KEY = "guebre-mode";
  var LANG_KEY = "guebre-lang";
  var palette = localStorage.getItem(PALETTE_KEY) === "et" ? "et" : "fr";
  var mode = localStorage.getItem(MODE_KEY) === "dark" ? "dark" : "light";

  var LABELS = {
    fr: { et: "Éthiopie", dark: "Sombre" },
    en: { et: "Ethiopia", dark: "Dark" },
    am: { et: "ኢትዮጵያ", dark: "ጨለማ" }
  };

  function currentLang() {
    var lang = localStorage.getItem(LANG_KEY) || "fr";
    return LABELS[lang] ? lang : "fr";
  }

  function applyThemeLabels() {
    var pack = LABELS[currentLang()];
    var etText = document.querySelector("#ethiopia-toggle [data-i18n='themeEthiopia']");
    var darkText = document.querySelector("#dark-toggle [data-i18n='themeDark']");
    if (etText) etText.textContent = pack.et;
    if (darkText) darkText.textContent = pack.dark;
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-palette", palette);
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem(PALETTE_KEY, palette);
    localStorage.setItem(MODE_KEY, mode);
    var etBtn = document.getElementById("ethiopia-toggle");
    var darkBtn = document.getElementById("dark-toggle");
    if (etBtn) etBtn.setAttribute("aria-pressed", palette === "et" ? "true" : "false");
    if (darkBtn) darkBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    applyThemeLabels();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var etBtn = document.getElementById("ethiopia-toggle");
    var darkBtn = document.getElementById("dark-toggle");
    if (etBtn) {
      etBtn.addEventListener("click", function () {
        palette = palette === "et" ? "fr" : "et";
        applyTheme();
      });
    }
    if (darkBtn) {
      darkBtn.addEventListener("click", function () {
        mode = mode === "dark" ? "light" : "dark";
        applyTheme();
      });
    }
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(applyThemeLabels, 0);
      });
    });
    applyTheme();
  });
})();
