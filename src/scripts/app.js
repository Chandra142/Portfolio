import { portfolioData } from "../data/portfolioData.js";
import { renderFooter } from "../components/footer.js";
import { renderAboutSection } from "../components/sections/aboutSection.js";
import { renderAchievementsSection } from "../components/sections/achievementsSection.js";
import { typedWords } from "../config/siteConfig.js";
import { renderContactSection } from "../components/sections/contactSection.js";
import { renderEducationSection } from "../components/sections/educationSection.js";
import { renderCertificationsSection } from "../components/sections/certificationsSection.js";
import { renderExperienceSection } from "../components/sections/experienceSection.js";
import { renderHeroSection } from "../components/sections/heroSection.js";
import { renderProjectsSection } from "../components/sections/projectsSection.js";
import { renderResearchFocusSection } from "../components/sections/researchFocusSection.js";
import { renderSkillsSection } from "../components/sections/skillsSection.js";
import { initContactForm } from "./modules/contactForm.js";
import { initNavigation } from "./modules/navigation.js";
import { initNeuralNetwork } from "./modules/neuralNetwork.js";
import { initThemeToggle } from "./modules/themeManager.js";
import { initTypedTitle } from "./modules/typedTitle.js";
import { initVisualEffects } from "./modules/visualEffects.js";

function renderPortfolio() {
  const appRoot = document.getElementById("app");
  const footer = document.querySelector(".site-footer");
  appRoot.innerHTML = [
    renderHeroSection(portfolioData.hero),
    renderAboutSection(portfolioData.about),
    renderExperienceSection(portfolioData.experience),
    renderEducationSection(portfolioData.education),
    renderProjectsSection(portfolioData.projects),
    renderResearchFocusSection(portfolioData.researchFocus),
    renderSkillsSection(portfolioData.skills),
    renderAchievementsSection(portfolioData.achievements),
    renderCertificationsSection(portfolioData.certifications),
    renderContactSection(portfolioData.contact)
  ].join("\n");
  footer.innerHTML = renderFooter(portfolioData);
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
