import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const requiredPaths = [
  "index.html",
  "assets/profile-pic-dark.png",
  "assets/profile-pic-light.png",
  "assets/dsa-certificate.png",
  "documents/ram-chandra-gupta-resume.pdf",
  "documents/ram-chandra-gupta-resume.html",
  "documents/cloud-computing-certificate.pdf",
  "documents/skillcraft-ml-certificate.pdf",
  "src/data/portfolioData.js",
  "src/scripts/app.js",
  "src/styles/main.css",
  "src/components/sections/heroSection.js",
  "src/components/sections/projectsSection.js",
  "src/components/sections/skillsSection.js",
  "src/components/sections/certificationsSection.js",
  "serve-local.js",
  "README.md",
];

async function smokeCheck() {
  const missingPaths = requiredPaths.filter(relativePath => {
    return !fs.existsSync(path.join(projectRoot, relativePath));
  });
  assert.deepEqual(missingPaths, [], `Missing required files: ${missingPaths.join(", ")}`);

  const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
  assert.match(indexHtml, /<main id="app"><\/main>/, "index.html is missing the app mount point.");
  assert.match(indexHtml, /<footer[^>]+class="site-footer"/, "index.html is missing the footer.");
  assert.match(indexHtml, /<script type="module" src="\/src\/scripts\/app\.js"><\/script>/);

  const { portfolioData } = await import("../src/data/portfolioData.js");
  const { renderHeroSection } = await import("../src/components/sections/heroSection.js");
  const { renderAboutSection } = await import("../src/components/sections/aboutSection.js");
  const { renderExperienceSection } = await import("../src/components/sections/experienceSection.js");
  const { renderEducationSection } = await import("../src/components/sections/educationSection.js");
  const { renderProjectsSection } = await import("../src/components/sections/projectsSection.js");
  const { renderResearchFocusSection } = await import("../src/components/sections/researchFocusSection.js");
  const { renderCertificationsSection } = await import("../src/components/sections/certificationsSection.js");
  const { renderFooter } = await import("../src/components/footer.js");

  const hero = renderHeroSection(portfolioData.hero);
  assert.ok(hero.includes(portfolioData.hero.name), "Hero should display the portfolio owner's name.");
  assert.ok(hero.includes(portfolioData.hero.valueProposition), "Hero should display the value proposition.");
  portfolioData.hero.highlights.forEach(item => {
    assert.ok(hero.includes(item.value) && hero.includes(item.label), `Hero is missing ${item.label}.`);
  });

  const about = renderAboutSection(portfolioData.about);
  portfolioData.about.metrics.forEach(item => {
    assert.ok(about.includes(item.value) && about.includes(item.label), `About is missing ${item.label}.`);
  });

  portfolioData.experience.forEach(role => {
    if (role.href) {
      assert.ok(renderExperienceSection([role]).includes(`href="${role.href}"`), `Experience link is missing for ${role.company}.`);
    }
  });

  const projects = renderProjectsSection(portfolioData.projects);
  portfolioData.projects.forEach((project, index) => {
    if (project.href) {
      assert.ok(projects.includes(project.href), `Project link is missing for ${project.title}.`);
    }
    if (project.liveHref) {
      assert.ok(projects.includes(project.liveHref), `Live project link is missing for ${project.title}.`);
    }
    assert.ok(projects.includes(String(index + 1).padStart(2, "0")), `Project number is missing for ${project.title}.`);
  });

  const agenticCertificate = portfolioData.certifications.find(item => item.title === "Agentic AI Hackathon");
  assert.ok(agenticCertificate?.href.includes("drive.google.com/file/"), "Agentic AI certificate should link to its specific Drive file.");
  assert.ok(portfolioData.education.some(item => item.institution === "St. Thomas English School"), "High school should be included.");

  const certifications = renderCertificationsSection(portfolioData.certifications);
  portfolioData.certifications.forEach(certificate => {
    assert.ok(certifications.includes(certificate.title), `Certificate is missing: ${certificate.title}.`);
    if (certificate.href) {
      assert.ok(certifications.includes(certificate.href), `Certificate proof link is missing: ${certificate.title}.`);
      if (certificate.href.startsWith("/")) {
        const proofPath = certificate.href.replace(/^\//, "").replaceAll("%20", " ");
        assert.ok(fs.existsSync(path.join(projectRoot, proofPath)), `Certificate proof file is missing: ${proofPath}.`);
      }
    }
  });

  const researchFocus = renderResearchFocusSection(portfolioData.researchFocus);
  assert.ok(researchFocus.includes(portfolioData.researchFocus[0].title), "Research focus should render portfolio data.");

  const footer = renderFooter(portfolioData);
  assert.ok(footer.includes(portfolioData.contact.email), "Footer should include the contact email.");
  assert.ok(footer.includes(portfolioData.hero.name), "Footer should include the portfolio owner's name.");

  const education = renderEducationSection(portfolioData.education);
  portfolioData.education.forEach(item => {
    assert.ok(education.includes(item.degree) && education.includes(item.institution), `Education entry is missing: ${item.degree}.`);
  });
  assert.equal(education.includes("CGPA"), false, "Education should not display CGPA.");
  assert.equal(education.includes("%"), false, "Education should not display percentage scores.");

  const { renderSkillsSection } = await import("../src/components/sections/skillsSection.js");
  const { renderAchievementsSection } = await import("../src/components/sections/achievementsSection.js");
  const { renderContactSection } = await import("../src/components/sections/contactSection.js");
  const renderedSections = [
    hero,
    about,
    renderExperienceSection(portfolioData.experience),
    education,
    projects,
    researchFocus,
    renderSkillsSection(portfolioData.skills),
    renderAchievementsSection(portfolioData.achievements),
    certifications,
    renderContactSection(portfolioData.contact),
  ];
  const ids = [...indexHtml.matchAll(/\bid="([^"]+)"/g), ...renderedSections.join("\n").matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], "Rendered page contains duplicate element IDs.");

  const localAssets = new Set();
  for (const html of [indexHtml, ...renderedSections]) {
    for (const match of html.matchAll(/\b(?:href|src)="(\/[^"]+)"/g)) {
      localAssets.add(decodeURIComponent(match[1]).replace(/^\//, ""));
    }
  }
  for (const asset of localAssets) {
    assert.ok(fs.existsSync(path.join(projectRoot, asset)), `Linked local asset is missing: ${asset}`);
  }

  console.log(`Smoke check passed: portfolio content, unique IDs, and ${localAssets.size} local asset links are valid.`);
}

smokeCheck().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
