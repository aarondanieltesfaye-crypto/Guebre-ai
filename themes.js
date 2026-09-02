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

  function menuEl() { return document.getElementById("settings-menu"); }
  function toggleEl() { return document.getElementById("settings-toggle"); }
  function isOpen() {
    var menu = menuEl();
    return !!(menu && menu.classList.contains("is-open"));
  }
  function setOpen(open) {
    var menu = menuEl();
    var toggle = toggleEl();
    if (!menu || !toggle) return;
    menu.classList.toggle("is-open", open);
    if (open) menu.removeAttribute("hidden");
    else menu.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  window.guebreToggleSettings = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setOpen(!isOpen());
  };

  function applyThemeLabels() {
    var pack = LABELS[currentLang()];
    var etText = document.querySelector("#ethiopia-toggle [data-i18n='themeEthiopia']");
    var darkText = document.querySelector("#dark-toggle [data-i18n='themeDark']");
    var remarks = document.querySelector("[data-i18n='remarks']");
    var settingsBtn = toggleEl();
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
    var wrap = document.querySelector(".settings-wrap");
    if (etBtn && !etBtn.getAttribute("data-bound")) {
      etBtn.setAttribute("data-bound", "1");
      etBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        palette = palette === "et" ? "fr" : "et";
        applyTheme();
      });
    }
    if (darkBtn && !darkBtn.getAttribute("data-bound")) {
      darkBtn.setAttribute("data-bound", "1");
      darkBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        mode = mode === "dark" ? "light" : "dark";
        applyTheme();
      });
    }
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(applyThemeLabels, 0);
      });
    });
    document.addEventListener("click", function (e) {
      if (wrap && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    applyTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
