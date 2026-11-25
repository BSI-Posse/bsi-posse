(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var docs = document.querySelectorAll("[data-document]");
  if (docs.length && location.protocol !== "file:") {
    docs.forEach(function (card) {
      var url = card.getAttribute("data-document");
      fetch(url, { method: "HEAD", cache: "no-store" })
        .then(function (response) {
          if (!response.ok) return;
          var actions = card.querySelector("[data-doc-actions]");
          var pending = card.querySelector("[data-doc-pending]");
          if (actions) actions.hidden = false;
          if (pending) pending.hidden = true;
        })
        .catch(function () {

        });
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");
  var canReveal =
    "IntersectionObserver" in window && revealItems.length && !reduceMotion;

  if (canReveal) {
    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {

      var rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });
  }
})();
