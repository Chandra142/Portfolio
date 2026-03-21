const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const requiredPaths = [
  "public/index.html",
  "public/assets/profile-pic-dark.png",
  "public/assets/profile-pic-light.png",
  "public/documents/ram-chandra-gupta-resume.pdf",
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

const missingPaths = requiredPaths.filter(relativePath => {
  return !fs.existsSync(path.join(projectRoot, relativePath));
});

if (missingPaths.length) {
  console.error("Missing required files:\n" + missingPaths.join("\n"));
  process.exit(1);
}

const indexHtml = fs.readFileSync(path.join(projectRoot, "public/index.html"), "utf8");
const appScript = fs.readFileSync(path.join(projectRoot, "src/scripts/app.js"), "utf8");

if (!indexHtml.includes('id="app"')) {
  console.error("public/index.html is missing the app mount point.");
  process.exit(1);
}

if (!appScript.includes("renderPortfolio()")) {
  console.error("src/scripts/app.js does not bootstrap section rendering.");
  process.exit(1);
}

console.log("Smoke check passed.");
