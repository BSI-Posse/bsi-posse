(function () {
  "use strict";

  var accordions = document.querySelectorAll("[data-accordion]");
  if (!accordions.length) return;

  accordions.forEach(function (accordion) {
    accordion.classList.add("js-accordion");

    var triggers = accordion.querySelectorAll(".accordion__trigger");

    triggers.forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      var item = trigger.closest(".accordion__item");
      var open = trigger.getAttribute("aria-expanded") === "true";

      item.classList.toggle("is-open", open);
      panel.inert = !open;

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var nextState = !expanded;

        trigger.setAttribute("aria-expanded", String(nextState));
        item.classList.toggle("is-open", nextState);

        if ("inert" in panel) panel.inert = !nextState;

        if (!nextState) {
          var rect = trigger.getBoundingClientRect();
          if (rect.top < 0) trigger.scrollIntoView({ block: "nearest" });
        }
      });
    });
  });
})();
