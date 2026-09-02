(function () {
  var btn = document.getElementById("settings-toggle");
  if (btn && btn.parentNode) {
    var fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener("click", function (event) {
      if (window.guebreToggleSettings) window.guebreToggleSettings(event);
    });
  }
})();
