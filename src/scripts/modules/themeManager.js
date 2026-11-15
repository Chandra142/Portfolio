import { themeIcons } from "../../config/siteConfig.js";
import { qs } from "../../utils/dom.js";

const themeStorageKey = "portfolio-theme";

function isDarkTheme() {
  return document.documentElement.getAttribute("data-theme") !== "light";
}

function getInitialTheme() {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function initThemeToggle() {
  const themeButton = qs("#themeBtn");
  const profilePhoto = qs("#profile-photo");
  const photoPlaceholder = qs("#ph-fb");

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.setAttribute("data-theme", theme);
    themeButton?.style.setProperty("color-scheme", theme);

    const knob = qs("#themeKnob");
    if (knob) {
      knob.textContent = dark ? themeIcons.dark : themeIcons.light;
    }

    if (profilePhoto) {
      const source = dark ? profilePhoto.dataset.darkSrc : profilePhoto.dataset.lightSrc;
      if (source && profilePhoto.getAttribute("src") !== source) {
        profilePhoto.src = source;
      }
    }

    if (themeButton) {
      const label = `Switch to ${dark ? "light" : "dark"} theme`;
      themeButton.setAttribute("aria-label", label);
      themeButton.setAttribute("title", label);
    }
  }

  if (profilePhoto && photoPlaceholder) {
    profilePhoto.addEventListener("load", () => {
      profilePhoto.style.display = "block";
      photoPlaceholder.hidden = true;
    });
    profilePhoto.addEventListener("error", () => {
      profilePhoto.style.display = "none";
      photoPlaceholder.hidden = false;
    });
    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
      profilePhoto.style.display = "none";
      photoPlaceholder.hidden = false;
    }
  }

  applyTheme(getInitialTheme());

  themeButton?.addEventListener("click", () => {
    const nextTheme = isDarkTheme() ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  });
}
