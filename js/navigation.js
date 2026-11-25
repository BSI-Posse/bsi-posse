(function () {
  "use strict";

  var navbar = document.querySelector("[data-navbar]");
  if (!navbar) return;

  var toggle = navbar.querySelector("[data-nav-toggle]");
  var panel = navbar.querySelector("[data-nav-panel]");
  var DESKTOP = "(min-width: 900px)";

  function setMenu(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
    panel.classList.toggle("is-open", open);
  }

  function isOpen() {
    return toggle && toggle.getAttribute("aria-expanded") === "true";
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setMenu(!isOpen());
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (isOpen() && !navbar.contains(event.target)) setMenu(false);
    });

    window.matchMedia(DESKTOP).addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var links = Array.prototype.slice.call(
    document.querySelectorAll('.navbar__link[href^="#"]')
  );

  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      return section ? { id: id, section: section, link: link } : null;
    })
    .filter(Boolean);

  var indicator = navbar.querySelector(".navbar__nav > .navbar__indicator");
  var desktopNav = indicator ? indicator.parentElement : null;
  var activeLink = null;

  function placeIndicator(link) {
    if (!indicator || !link || !desktopNav || link.parentElement !== desktopNav)
      return;
    indicator.style.width = link.offsetWidth + "px";
    indicator.style.transform = "translate(" + link.offsetLeft + "px, -50%)";
    indicator.style.opacity = "1";
  }

  function setActive(id) {
    links.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
        if (link.parentElement === desktopNav) activeLink = link;
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (activeLink) placeIndicator(activeLink);
  }

  if (desktopNav) {

    links.forEach(function (link) {
      if (link.parentElement !== desktopNav) return;
      link.addEventListener("mouseenter", function () {
        placeIndicator(link);
      });
    });

    desktopNav.addEventListener("mouseleave", function () {
      if (activeLink) placeIndicator(activeLink);
    });

    window.addEventListener(
      "resize",
      function () {
        if (activeLink) placeIndicator(activeLink);
      },
      { passive: true }
    );

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (activeLink) placeIndicator(activeLink);
      });
    }
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = new Set();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        if (visible.size) setActive(Array.from(visible).pop());
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  }

  var cssSmooth =
    "scrollBehavior" in document.documentElement.style &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (!cssSmooth) {
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "auto", block: "start" });
      history.pushState(null, "", id);
    });
  }
})();
