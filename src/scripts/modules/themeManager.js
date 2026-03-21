import { themeIcons } from "../../config/siteConfig.js";
import { qs } from "../../utils/dom.js";

function isDarkTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function updateThemeAssets(isDarkMode) {
  const knob = qs("#themeKnob");
  const darkPhoto = qs("#photo-dark");
  const lightPhoto = qs("#photo-light");
  const darkLogo = qs("#logo-dark");
  const lightLogo = qs("#logo-light");

  if (knob) {
    knob.textContent = isDarkMode ? themeIcons.dark : themeIcons.light;
  }

  if (darkPhoto) {
    darkPhoto.style.display = isDarkMode ? "block" : "none";
  }

  if (lightPhoto) {
    lightPhoto.style.display = isDarkMode ? "none" : "block";
  }

  if (darkLogo) {
    darkLogo.style.display = isDarkMode ? "block" : "none";
  }

  if (lightLogo) {
    lightLogo.style.display = isDarkMode ? "none" : "block";
  }
}

export function initThemeToggle() {
  const themeButton = qs("#themeBtn");

  updateThemeAssets(isDarkTheme());

  if (!themeButton) {
    return;
  }

  themeButton.addEventListener("click", () => {
    const html = document.documentElement;
    const nextTheme = isDarkTheme() ? "light" : "dark";
    html.setAttribute("data-theme", nextTheme);
    updateThemeAssets(nextTheme === "dark");
  });
}
