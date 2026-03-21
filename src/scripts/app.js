import { portfolioData } from "../data/portfolioData.js";
import { renderAboutSection } from "../components/sections/aboutSection.js";
import { renderAchievementsSection } from "../components/sections/achievementsSection.js";
import { typedWords } from "../config/siteConfig.js";
import { renderContactSection } from "../components/sections/contactSection.js";
import { renderCertificationsSection } from "../components/sections/certificationsSection.js";
import { renderExperienceSection } from "../components/sections/experienceSection.js";
import { renderHeroSection } from "../components/sections/heroSection.js";
import { renderProjectsSection } from "../components/sections/projectsSection.js";
import { renderSkillsSection } from "../components/sections/skillsSection.js";
import { initContactForm } from "./modules/contactForm.js";
import { initNavigation } from "./modules/navigation.js";
import { initNeuralNetwork } from "./modules/neuralNetwork.js";
import { initThemeToggle } from "./modules/themeManager.js";
import { initTypedTitle } from "./modules/typedTitle.js";
import { initVisualEffects } from "./modules/visualEffects.js";

function renderPortfolio() {
  const appRoot = document.getElementById("app");
  appRoot.innerHTML = [
    renderHeroSection(portfolioData.hero),
    renderAboutSection(portfolioData.about),
    renderExperienceSection(portfolioData.experience),
    renderProjectsSection(portfolioData.projects),
    renderSkillsSection(portfolioData.skills),
    renderAchievementsSection(portfolioData.achievements),
    renderCertificationsSection(portfolioData.certifications),
    renderContactSection(portfolioData.contact)
  ].join("\n");
}

async function bootstrap() {
  renderPortfolio();
  initThemeToggle();
  initTypedTitle(typedWords);
  initNeuralNetwork();
  initVisualEffects();
  initNavigation();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", () => {
  bootstrap().catch(error => {
    console.error("Failed to bootstrap portfolio", error);
  });
});
