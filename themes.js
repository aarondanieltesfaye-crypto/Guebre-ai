(function () {
  var PALETTE_KEY = "guebre-palette";
  var MODE_KEY = "guebre-mode";
  var palette = localStorage.getItem(PALETTE_KEY) === "et" ? "et" : "fr";
  var mode = localStorage.getItem(MODE_KEY) === "dark" ? "dark" : "light";

  function applyTheme() {
    document.documentElement.setAttribute("data-palette", palette);
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem(PALETTE_KEY, palette);
    localStorage.setItem(MODE_KEY, mode);
    var etBtn = document.getElementById("ethiopia-toggle");
    var darkBtn = document.getElementById("dark-toggle");
    if (etBtn) etBtn.setAttribute("aria-pressed", palette === "et" ? "true" : "false");
    if (darkBtn) darkBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
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
    applyTheme();
  });
})();
