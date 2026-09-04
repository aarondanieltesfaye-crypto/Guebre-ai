(function () {
  var PALETTE_KEY = "guebre-palette";
  var MODE_KEY = "guebre-mode";
  var LANG_KEY = "guebre-lang";
  var palette = localStorage.getItem(PALETTE_KEY) === "et" ? "et" : "fr";
  var mode = localStorage.getItem(MODE_KEY) === "dark" ? "dark" : "light";
  var LABELS = {
    fr: { et: "Éthiopie", dark: "Sombre", settings: "Paramètres", remarks: "Remarques" },
    en: { et: "Ethiopia", dark: "Dark", settings: "Settings", remarks: "Remarks" },
    am: { et: "ኢትዮጵያ", dark: "ጨለማ", settings: "ቅንብሮች", remarks: "አስተያየቶች" }
  };
  function currentLang() {
    var lang = localStorage.getItem(LANG_KEY) || "fr";
    return LABELS[lang] ? lang : "fr";
  }
  function applyThemeLabels() {
    var pack = LABELS[currentLang()];
    var etText = document.querySelector("#ethiopia-toggle [data-i18n='themeEthiopia']");
    var darkText = document.querySelector("#dark-toggle [data-i18n='themeDark']");
    var remarks = document.querySelector("[data-i18n='remarks']");
    var settingsBtn = document.getElementById("settings-toggle");
    if (etText) etText.textContent = pack.et;
    if (darkText) darkText.textContent = pack.dark;
    if (remarks) remarks.textContent = pack.remarks;
    if (settingsBtn) settingsBtn.setAttribute("aria-label", pack.settings);
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
  function bind() {
    var etBtn = document.getElementById("ethiopia-toggle");
    var darkBtn = document.getElementById("dark-toggle");
    if (etBtn && !etBtn.getAttribute("data-bound")) {
      etBtn.setAttribute("data-bound", "1");
      etBtn.addEventListener("click", function () {
        palette = palette === "et" ? "fr" : "et";
        applyTheme();
      });
    }
    if (darkBtn && !darkBtn.getAttribute("data-bound")) {
      darkBtn.setAttribute("data-bound", "1");
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
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
