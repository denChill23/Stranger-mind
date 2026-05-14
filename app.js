/**
 * Renders posts from posts.js and wires demo download + footer links.
 */
(function () {
  "use strict";

  var MOBILE_MQ = window.matchMedia("(max-width: 768px)");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatBodyHtml(body) {
    if (!body) return "";
    return body
      .split(/\n\n+/)
      .map(function (p) {
        return "<p>" + escapeHtml(p.trim()).replace(/\n/g, "<br />") + "</p>";
      })
      .join("");
  }

  function isGalleryItem(path) {
    if (!path || typeof path !== "string") return false;
    var lower = path.toLowerCase();
    return /\.(png|jpe?g|gif)$/.test(lower);
  }

  function setupDemoDownload() {
    var link = document.getElementById("demo-download-link");
    var hint = document.getElementById("demo-config-hint");
    if (!link) return;

    var cfg = window.SITE_CONFIG || {};
    var url = (cfg.demoZipUrl || "").trim();

    function apply() {
      var mobile = MOBILE_MQ.matches;
      link.classList.remove("is-disabled");

      if (!url) {
        link.href = "#";
        link.classList.add("is-disabled");
        link.removeAttribute("download");
        if (hint) hint.hidden = false;
        return;
      }

      if (hint) hint.hidden = true;

      if (mobile) {
        link.removeAttribute("href");
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.removeAttribute("download");
      } else {
        link.href = url;
        link.removeAttribute("aria-disabled");
        link.setAttribute("download", "");
      }
    }

    apply();
    if (typeof MOBILE_MQ.addEventListener === "function") {
      MOBILE_MQ.addEventListener("change", apply);
    } else if (typeof MOBILE_MQ.addListener === "function") {
      MOBILE_MQ.addListener(apply);
    }
  }

  function renderSocial() {
    var root = document.getElementById("social-list");
    if (!root) return;

    var cfg = window.SITE_CONFIG || {};
    var items = Array.isArray(cfg.social) ? cfg.social : [];
    root.innerHTML = "";

    items.forEach(function (item) {
      var li = document.createElement("li");
      var href = (item.href || "").trim();
      if (href) {
        var a = document.createElement("a");
        a.href = href;
        a.textContent = item.label || href;
        a.rel = "noopener noreferrer";
        a.target = "_blank";
        li.appendChild(a);
      } else {
        li.className = "is-placeholder";
        var span = document.createElement("span");
        span.textContent = (item.label || "Link") + " — add URL in js/posts.js";
        li.appendChild(span);
      }
      root.appendChild(li);
    });
  }

  function attachGallery(root, paths) {
    var valid = paths.filter(isGalleryItem);
    if (valid.length === 0) {
      root.innerHTML = "";
      return false;
    }

    var multi = valid.length > 1;
    var idx = 0;

    var frame = document.createElement("div");
    frame.className = "post__gallery-frame";
    var img = document.createElement("img");
    img.alt = "Gallery image";
    frame.appendChild(img);

    root.appendChild(frame);

    var prevBtn;
    var nextBtn;
    var dotsWrap;

    if (multi) {
      prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "post__gallery-nav post__gallery-nav--prev";
      prevBtn.setAttribute("aria-label", "Previous image");
      prevBtn.textContent = "‹";

      nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "post__gallery-nav post__gallery-nav--next";
      nextBtn.setAttribute("aria-label", "Next image");
      nextBtn.textContent = "›";

      root.insertBefore(prevBtn, frame);
      root.appendChild(nextBtn);

      dotsWrap = document.createElement("div");
      dotsWrap.className = "post__gallery-dots";
      valid.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "post__gallery-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Go to image " + (i + 1));
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

  function renderPosts() {
    var root = document.getElementById("posts-root");
    var empty = document.getElementById("posts-empty");
    if (!root) return;

    var posts = Array.isArray(window.POSTS) ? window.POSTS : [];
    root.innerHTML = "";

    if (posts.length === 0) {
      if (empty) empty.style.display = "";
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
        mainImg.alt = post.title ? "Main image for " + post.title : "Main post image";
        mainWrap.appendChild(mainImg);
      } else {
        var ph = document.createElement("p");
        ph.className = "post__placeholder";
        ph.textContent = "Add mainImage (.png) in posts.js";
        mainWrap.appendChild(ph);
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

  document.addEventListener("DOMContentLoaded", function () {
    setupDemoDownload();
    renderSocial();
    renderPosts();
  });
})();
