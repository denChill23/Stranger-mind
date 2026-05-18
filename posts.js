/**
 * Site configuration and posts for "Stranger mind" dev diary.
 * Edit this file and push to GitHub — no HTML copying needed.
 *
 * GitHub Pages: keep images and the ZIP under this site folder using relative paths
 * (e.g. assets/posts/01/main.png, downloads/demo.zip).
 *
 * Publishing posts:
 * 1. Add image files to the repo (e.g. assets/posts/my-post/).
 * 2. Append an object to POSTS with date, title, mainImage (.png), optional gallery
 *    (.png / .jpg / .jpeg / .gif), and body text. Use \n\n between paragraphs in body.
 *
 * Demo ZIP:
 * 1. Upload the ZIP into the repo (e.g. downloads/stranger-mind-demo.zip).
 * 2. Set demoZipUrl to that path, e.g. "downloads/stranger-mind-demo.zip".
 *
 * Social links:
 * Fill in href for each entry in social (full URL, e.g. "https://twitter.com/yourname").
 * Leave href "" to show a placeholder until you add the link.
 */
(function () {
  "use strict";

  /** @type {{ demoZipUrl: string, social: { label: string, href: string }[] }} */
  window.SITE_CONFIG = {
    /** Relative path to the demo ZIP from the site root (empty string = link disabled). */
    demoZipUrl: "https://github.com/denChill23/Stranger-mind/releases/download/Game/UnityCrashHandler64.zip",

    /** Footer links — use full URLs in href. */
    social: [
      { label: "Telegram (only for russian users)", href: "https://t.me/justChillDen" },
      { label: "Discord", href: "https://discord.gg/66Henk8EUm" }
    ],
  };

  /**
   * Posts (newest first recommended).
   * Every object in this array is shown on the page — add new posts to the list; do not
   * replace the whole array with a single entry or older posts will disappear from the site.
   *
   * Fields:
   *   date      — shown as-is (e.g. "2026-05-14" or "May 14, 2026")
   *   title
   *   mainImage — one .png path (hero image)
   *   gallery   — optional; .png, .jpg, .jpeg, .gif; arrows and dots only if more than one
   *   body      — use \n\n between paragraphs
   *
   * Starts empty — add entries like the commented example.
   */
  window.POSTS = [
    {
      date: "May 18, 2026", // Дата, которую увидят люди
      title: "My First Devlog: Stranger Mind is Born!", // Заголовок поста
      mainImage: "assets/posts/001/Screenshot_77.png", // Путь к главной картинке
      gallery: [
        "assets/posts/001/Stranger_mind__demo_version__FBzh9AyktR-_online-video-cutter.com_.gif", // Доп. картинки (если есть)
        "assets/posts/001/Stranger_mind__demo_version__4gS6hOlmpk-_online-video-cutter.com_.gif",
      ],
      body: 
        "Finally, I've started the development diary for my game 'Stranger Mind'.\n\n" +
        "Today I fixed all the bugs on the website and added the first download link for the demo. " +
        "Next steps: polishing the player movement and adding the first puzzle."
    },
    // {
    //   date: "2026-05-14",
    //   title: "First playable area",
    //   mainImage: "assets/posts/001/main.png",
    //   gallery: [
    //     "assets/posts/001/extra-1.jpg",
    //     "assets/posts/001/extra-2.gif",
    //   ],
    //   body:
    //     "Blocked out the first cave section and tested the stranger's hints.\n\n" +
    //     "Next: polish lighting and add one more puzzle using the second dimension.",
    // },
  ];
})();
