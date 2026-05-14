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
    demoZipUrl: "",

    /** Footer links — use full URLs in href. */
    social: [
      { label: "Twitter / X", href: "" },
      { label: "Discord", href: "" },
      { label: "YouTube", href: "" },
      { label: "itch.io", href: "" },
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
