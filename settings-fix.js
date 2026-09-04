(function () {
  function menu() { return document.getElementById("settings-menu"); }
  function button() { return document.getElementById("settings-toggle"); }
  function isOpen() {
    var el = menu();
    return !!(el && el.classList.contains("is-open"));
  }
  function place() {
    var el = menu();
    var btn = button();
    if (!el || !btn) return;
    var box = btn.getBoundingClientRect();
    el.style.position = "fixed";
    el.style.top = Math.round(box.bottom + 8) + "px";
    el.style.right = Math.round(window.innerWidth - box.right) + "px";
    el.style.left = "auto";
    el.style.zIndex = "9999";
  }
  function setOpen(open) {
    var el = menu();
    var btn = button();
    if (!el || !btn) return;
    el.classList.toggle("is-open", open);
    el.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) place();
  }
  window.guebreToggleSettings = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
    setOpen(!isOpen());
  };
  document.addEventListener("click", function (event) {
    var btn = button();
    var wrap = document.querySelector(".settings-wrap");
    var target = event.target;
    if (btn && (target === btn || (btn.contains && btn.contains(target)))) {
      window.guebreToggleSettings(event);
      return;
    }
    if (wrap && wrap.contains(target)) return;
    setOpen(false);
  }, true);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", function () {
    if (isOpen()) place();
  });
})();
