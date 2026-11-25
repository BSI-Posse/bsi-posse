(function () {
  "use strict";

  var PROJECTS = [

  ];

  var grid = document.querySelector("[data-projects-grid]");
  var empty = document.querySelector("[data-projects-empty]");
  if (!grid) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function render(project) {
    var article = el("article", "card material-card");

    var head = el("div", "material-card__head");
    var titleWrap = el("div");
    if (project.category) {
      titleWrap.appendChild(el("span", "badge badge--soft", project.category));
    }
    var h3 = el("h3", null, project.title || "Projeto sem título");
    h3.style.marginTop = project.category ? ".6rem" : "0";
    titleWrap.appendChild(h3);
    head.appendChild(titleWrap);
    article.appendChild(head);

    if (project.description) {
      var p = el("p", null, project.description);
      p.style.marginTop = ".5rem";
      article.appendChild(p);
    }

    if (project.image) {
      var img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title || "Imagem do projeto";
      img.loading = "lazy";
      img.width = 640;
      img.height = 360;
      img.style.cssText =
        "width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:8px;margin-top:.75rem";
      article.appendChild(img);
    }

    if (project.team) {
      var team = el("p", "contact-card__note", "Equipe: " + project.team);
      team.style.marginTop = ".75rem";
      article.appendChild(team);
    }

    if (Array.isArray(project.techs) && project.techs.length) {
      var list = el("ul", "pill-list");
      project.techs.forEach(function (tech) {
        list.appendChild(el("li", "pill", tech));
      });
      article.appendChild(list);
    }

    if (project.link) {
      var actions = el("div", "material-card__actions");
      actions.style.marginTop = ".75rem";
      var a = document.createElement("a");
      a.className = "btn btn--primary btn--small";
      a.href = project.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = project.linkLabel || "Acesse o projeto";
      actions.appendChild(a);
      article.appendChild(actions);
    }

    return article;
  }

  if (!PROJECTS.length) {

    grid.removeAttribute("data-reveal");
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  PROJECTS.forEach(function (project) {
    grid.appendChild(render(project));
  });
})();
