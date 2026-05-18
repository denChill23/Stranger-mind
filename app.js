
(function () {
  "use strict";

  // 1. ФУНКЦИЯ ДЛЯ ТЕКСТА (превращает \n\n в абзацы)
  function formatBodyHtml(text) {
    if (!text) return "";
    return text
      .split("\n\n")
      .map(function (p) {
        return "<p>" + p.replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  // 2. ФУНКЦИЯ ДЛЯ ССЫЛКИ НА ДЕМО
  function setupDemoDownload() {
    var config = window.SITE_CONFIG;
    var link = document.getElementById("demo-download-link");
    var hint = document.getElementById("demo-config-hint");
    var container = document.querySelector(".intro-card__demo");

    if (!link || !config) return;

    if (config.demoZipUrl && config.demoZipUrl.trim() !== "") {
      link.href = config.demoZipUrl;
      if (hint) hint.hidden = true; // Скрываем подсказку
      if (container) container.style.display = "block"; // Показываем блок
    } else {
      // Если ссылки нет — скрываем весь блок, чтобы не путать игрока
      if (container) container.style.display = "none";
    }
  }

  // 3. ФУНКЦИЯ ДЛЯ СОЦСЕТЕЙ
  function renderSocial() {
    var config = window.SITE_CONFIG;
    var list = document.getElementById("social-list");
    if (!list || !config || !Array.isArray(config.social)) return;

    list.innerHTML = "";
    config.social.forEach(function (item) {
      if (item.href && item.href.trim() !== "") {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        a.target = "_blank";
        a.className = "social-link";
        li.appendChild(a);
        list.appendChild(li);
      }
    });
  }

  // 4. ФУНКЦИЯ ГАЛЕРЕИ (та самая, со стрелочками и точками)
  function attachGallery(root, paths) {
    var valid = paths.filter(function (p) { return !!p; });
    if (valid.length === 0) return false;

    var idx = 0;
    var multi = valid.length > 1;
    var img = document.createElement("img");
    img.className = "post__gallery-image";
    root.appendChild(img);

    if (multi) {
      var prevBtn = document.createElement("button");
      prevBtn.className = "post__gallery-nav post__gallery-nav--prev";
      prevBtn.innerHTML = "&#10094;"; // Стрелочка влево
      
      var nextBtn = document.createElement("button");
      nextBtn.className = "post__gallery-nav post__gallery-nav--next";
      nextBtn.innerHTML = "&#10095;"; // Стрелочка вправо

      root.appendChild(prevBtn);
      root.appendChild(nextBtn);

      var dotsWrap = document.createElement("div");
      dotsWrap.className = "post__gallery-dots";
      valid.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.className = "post__gallery-dot" + (i === 0 ? " is-active" : "");
        dot.addEventListener("click", function () {
          idx = i;
          update();
        });
        dotsWrap.appendChild(dot);
      });
      root.appendChild(dotsWrap);

      prevBtn.addEventListener("click", function () {
        idx = (idx - 1 + valid.length) % valid.length;
        update();
      });
      nextBtn.addEventListener("click", function () {
        idx = (idx + 1) % valid.length;
        update();
      });
    }

    function update() {
      img.src = valid[idx];
      if (multi && dotsWrap) {
        var dots = dotsWrap.querySelectorAll(".post__gallery-dot");
        dots.forEach(function (d, i) {
          d.classList.toggle("is-active", i === idx);
        });
      }
    }

    update();
    return true;
  }

  // 5. ОСНОВНАЯ ФУНКЦИЯ РЕНДЕРА ПОСТОВ
  function renderPosts() {
    var root = document.getElementById("posts-root");
    var empty = document.getElementById("posts-empty");
    if (!root) return;

    var posts = Array.isArray(window.POSTS) ? window.POSTS : [];
    root.innerHTML = "";

    if (posts.length === 0) {
      if (empty) empty.style.display = "block";
      return;
    }

    if (empty) empty.style.display = "none";

    posts.forEach(function (post) {
      var article = document.createElement("article");
      article.className = "post";

      var meta = document.createElement("p");
      meta.className = "post__meta";
      meta.textContent = post.date ? String(post.date) : "";

      var title = document.createElement("h2");
      title.className = "post__title";
      title.textContent = post.title || "Untitled";

      var grid = document.createElement("div");
      grid.className = "post__grid";

      var mediaCol = document.createElement("div");
      mediaCol.className = "post__media";

      var mainWrap = document.createElement("div");
      mainWrap.className = "post__main-photo";
      if (post.mainImage) {
        var mainImg = document.createElement("img");
        mainImg.src = post.mainImage;
        mainWrap.appendChild(mainImg);
      }

      mediaCol.appendChild(mainWrap);

      var galleryPaths = Array.isArray(post.gallery) ? post.gallery : [];
      var galleryMount = document.createElement("div");
      galleryMount.className = "post__gallery-inner";
      var hasGallery = attachGallery(galleryMount, galleryPaths);

      if (hasGallery) {
        var galleryShell = document.createElement("div");
        galleryShell.className = "post__gallery";
        var galleryLabel = document.createElement("p");
        galleryLabel.className = "post__gallery-label";
        galleryLabel.textContent = "Gallery";
        galleryShell.appendChild(galleryLabel);
        galleryShell.appendChild(galleryMount);
        mediaCol.appendChild(galleryShell);
      }

      var bodyCol = document.createElement("div");
      bodyCol.className = "post__body-col";
      var body = document.createElement("div");
      body.className = "post__body";
      body.innerHTML = formatBodyHtml(post.body || "");
      bodyCol.appendChild(body);

      grid.appendChild(mediaCol);
      grid.appendChild(bodyCol);

      if (meta.textContent) article.appendChild(meta);
      article.appendChild(title);
      article.appendChild(grid);

      root.appendChild(article);
    });
  }

  // ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ
  document.addEventListener("DOMContentLoaded", function () {
    setupDemoDownload();
    renderSocial();
    renderPosts();
  });
})();
