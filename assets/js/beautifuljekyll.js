// Dean Attali / Beautiful Jekyll 2023

let BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    BeautifulJekyllJS.initTheme();
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();
    BeautifulJekyllJS.initToc();
    BeautifulJekyllJS.initCopyButtons();
    BeautifulJekyllJS.initCategoryToggles();
  },

  initTheme : function() {
    const storageKey = "beautifuljekyll-theme";
    const root = document.documentElement;
    const toggle = document.querySelector("[data-theme-toggle]");
    const icon = toggle ? toggle.querySelector("[data-theme-toggle-icon]") : null;
    const text = toggle ? toggle.querySelector("[data-theme-toggle-text]") : null;
    const prefersDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    const getStoredTheme = () => {
      try {
        return window.localStorage.getItem(storageKey);
      } catch (err) {
        return null;
      }
    };

    const setStoredTheme = (theme) => {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (err) {
        /* noop */
      }
    };

    const applyTheme = (theme, persist) => {
      const nextTheme = theme === "dark" ? "dark" : "light";
      root.setAttribute("data-theme", nextTheme);
      if (persist) {
        setStoredTheme(nextTheme);
      }
      if (toggle) {
        toggle.setAttribute(
          "aria-label",
          nextTheme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"
        );
        toggle.setAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
      }
      if (icon) {
        icon.classList.toggle("fa-sun", nextTheme === "dark");
        icon.classList.toggle("fa-moon", nextTheme !== "dark");
      }
      if (text) {
        text.textContent = nextTheme === "dark" ? "ライト" : "ダーク";
      }
    };

    const storedTheme = getStoredTheme();
    const initialTheme =
      storedTheme ||
      root.getAttribute("data-theme") ||
      (prefersDark && prefersDark.matches ? "dark" : "light");

    applyTheme(initialTheme, false);

    if (toggle) {
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    }

    if (prefersDark) {
      const handlePreferenceChange = (event) => {
        if (getStoredTheme() !== null) {
          return;
        }
        applyTheme(event.matches ? "dark" : "light", false);
      };

      if (typeof prefersDark.addEventListener === "function") {
        prefersDark.addEventListener("change", handlePreferenceChange);
      } else if (typeof prefersDark.addListener === "function") {
        prefersDark.addListener(handlePreferenceChange);
      }
    }
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      const imgInfo = BeautifulJekyllJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      const getNextImg = function() {
        const imgInfo = BeautifulJekyllJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    const src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  },

  initCategoryToggles : function() {
    const toggles = document.querySelectorAll("[data-category-toggle]");
    if (!toggles.length) {
      return;
    }

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const group = toggle.closest(".category-group");
        if (!group) {
          return;
        }
        const isCollapsed = group.classList.toggle("is-collapsed");
        toggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
      });
    });
  },

  initToc : function() {
    const tocContainer = document.querySelector("[data-post-toc]");
    const tocList = tocContainer ? tocContainer.querySelector("[data-post-toc-list]") : null;
    const postContent = document.querySelector(".blog-post");

    if (!tocContainer || !tocList || !postContent) {
      return;
    }

    const headings = Array.from(postContent.querySelectorAll("h1, h2, h3"));
    if (!headings.length) {
      return;
    }

    const tocEntries = [];
    const usedIds = new Set();

    headings.forEach((heading, index) => {
      const text = heading.textContent.trim();
      if (!text) {
        return;
      }

      const level = Math.min(parseInt(heading.tagName.replace("H", ""), 10) || 1, 3);

      let id = heading.getAttribute("id");
      if (id) {
        if (usedIds.has(id)) {
          id = null;
        } else {
          usedIds.add(id);
        }
      }

      if (!id) {
        const baseSlug = BeautifulJekyllJS.slugify(text) || `section-${index + 1}`;
        id = baseSlug;
        let counter = 2;
        while (usedIds.has(id)) {
          id = `${baseSlug}-${counter++}`;
        }
        heading.id = id;
        usedIds.add(id);
      }

      tocEntries.push({
        id,
        text,
        level,
      });
    });

    if (!tocEntries.length) {
      return;
    }

    tocList.innerHTML = "";

    tocEntries.forEach((entry) => {
      const item = document.createElement("li");
      item.className = `post-toc__item post-toc__item--level-${entry.level}`;

      const link = document.createElement("a");
      link.className = "post-toc__link";
      link.setAttribute("href", `#${entry.id}`);
      link.textContent = entry.text;

      item.appendChild(link);
      tocList.appendChild(item);
    });

    tocContainer.hidden = false;
  },

  initCopyButtons : function() {
    if (typeof document === "undefined") {
      return;
    }

    const codeBlocks = document.querySelectorAll("pre > code");
    if (!codeBlocks.length) {
      return;
    }

    const supportsClipboardApi =
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function";

    const copyText = async (text) => {
      if (supportsClipboardApi) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (error) {
          /* fall back to execCommand */
        }
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);

      const selection = document.getSelection();
      const selected =
        selection && selection.rangeCount > 0
          ? selection.getRangeAt(0)
          : null;
      textarea.select();
      let result = false;
      try {
        result = document.execCommand("copy");
      } catch (error) {
        result = false;
      }
      document.body.removeChild(textarea);

      if (selected && selection) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }

      return result;
    };

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.closest("pre");
      if (!pre) {
        return;
      }

      const container =
        codeBlock.closest("figure.highlight") ||
        codeBlock.closest(".highlight") ||
        pre;

      if (!container || container.classList.contains("code-copy-ready")) {
        return;
      }

      container.classList.add("code-copy-ready");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.setAttribute("aria-label", "コマンドをコピー");
      button.textContent = "コピー";

      const setButtonState = (state) => {
        if (state === "copied") {
          button.classList.add("code-copy-button--copied");
          button.textContent = "コピーしました";
        } else if (state === "error") {
          button.classList.add("code-copy-button--error");
          button.textContent = "コピーできませんでした";
        } else {
          button.classList.remove("code-copy-button--copied", "code-copy-button--error");
          button.textContent = "コピー";
        }
      };

      button.addEventListener("click", async () => {
        setButtonState("working");
        const succeeded = await copyText(codeBlock.innerText.trimEnd());
        setButtonState(succeeded ? "copied" : "error");
        if (succeeded) {
          setTimeout(() => setButtonState("ready"), 2000);
        } else {
          setTimeout(() => setButtonState("ready"), 3000);
        }
      });

      container.appendChild(button);
    });
  },

  slugify : function(text) {
    if (text === null || typeof text === "undefined") {
      return "";
    }

    let result = String(text).trim();

    if (typeof result.normalize === "function") {
      result = result.normalize("NFKD");
    }

    return result
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}\s\-ぁ-んァ-ヶ一-龥々ー]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);
