import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const browserCandidates = [
  process.env.CHROME_PATH,
  process.env.CHROME_BIN,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browserPath = browserCandidates.find(candidate => fs.existsSync(candidate));
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function stopProcess(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  await new Promise(resolve => {
    child.once("exit", resolve);
    child.kill();
    setTimeout(resolve, 3000).unref();
  });
}

async function getFreePort() {
  const probe = net.createServer();
  probe.listen(0, "127.0.0.1");
  await new Promise(resolve => probe.once("listening", resolve));
  const { port } = probe.address();
  await new Promise(resolve => probe.close(resolve));
  return port;
}

if (!browserPath) {
  throw new Error("Chrome or Edge is required. Set CHROME_PATH to the browser executable.");
}

const profilePath = fs.mkdtempSync(path.join(os.tmpdir(), "ram-portfolio-browser-"));
const server = spawn(process.execPath, ["serve-local.js"], {
  cwd: projectRoot,
  env: { ...process.env, PORT: "0" },
  stdio: ["ignore", "pipe", "pipe"],
});
const browser = spawn(browserPath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-extensions",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=${profilePath}`,
  `--remote-debugging-port=${await getFreePort()}`,
  "about:blank",
], { stdio: "ignore" });
let socket;

try {
  const origin = await new Promise((resolve, reject) => {
    let output = "";
    server.stdout.on("data", chunk => {
      output += chunk.toString();
      const match = output.match(/Serving portfolio at (http:\/\/[^\s]+)/);
      if (match) resolve(match[1]);
    });
    server.stderr.on("data", chunk => process.stderr.write(chunk));
    server.once("error", reject);
    server.once("exit", code => reject(new Error(`Local server exited with code ${code}.`)));
  });
  const debugAddress = browser.spawnargs.find(argument => argument.startsWith("--remote-debugging-port=")).split("=")[1];
  let page;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${debugAddress}/json/list`)).json();
      page = pages.find(candidate => candidate.type === "page");
      if (page) break;
    } catch {
      // The browser debugging socket may not be ready yet.
    }
    await delay(100);
  }
  assert.ok(page, "No browser page was available.");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const errors = [];
  const failedRequests = [];
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const task = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) task.reject(new Error(message.error.message));
      else task.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    } else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      errors.push(message.params.entry.text);
    } else if (message.method === "Network.loadingFailed") {
      failedRequests.push(message.params.errorText);
    }
  });

  function send(method, params = {}) {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }

  async function waitFor(expression, timeout = 5000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await evaluate(expression)) return;
      await delay(100);
    }
    throw new Error(`Timed out waiting for: ${expression}`);
  }

  async function screenshot(filename) {
    if (!process.env.PORTFOLIO_SCREENSHOT_DIR) return;
    fs.mkdirSync(process.env.PORTFOLIO_SCREENSHOT_DIR, { recursive: true });
    await waitFor(`getComputedStyle(document.querySelector(".hero-left")).opacity === "1"`);
    await waitFor(`document.querySelector("#profile-photo").naturalWidth > 0`);
    await delay(100);
    const image = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(process.env.PORTFOLIO_SCREENSHOT_DIR, filename), Buffer.from(image.data, "base64"));
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Network.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${origin}/` });
  await waitFor(`document.querySelector(".hero-identity")?.textContent === "Ram Chandra Gupta"`);

  const desktop = await evaluate(`(() => {
    const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
    return {
      sections: [...document.querySelectorAll('main section')].map(node => node.id),
      experiences: document.querySelectorAll('.exp-wrap').length,
      projects: document.querySelectorAll('.proj-card').length,
      education: document.querySelectorAll('.education-card').length,
      certifications: document.querySelectorAll('.certification-card').length,
      projectLinks: document.querySelectorAll('.project-links a').length,
      focusItems: document.querySelectorAll('.hero-focus-item').length,
      networkAligned: (() => {
        const lines = [...document.querySelectorAll('.network-link')];
        const nodes = [...document.querySelectorAll('.network-node')];
        const endpointsMatch = (x, y) => nodes.some(node => Number(node.getAttribute('cx')) === Number(x) && Number(node.getAttribute('cy')) === Number(y));
        return lines.length > 0 && lines.every(line => endpointsMatch(line.getAttribute('x1'), line.getAttribute('y1')) && endpointsMatch(line.getAttribute('x2'), line.getAttribute('y2')));
      })(),
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      overflow: document.documentElement.scrollWidth > innerWidth,
      footerLinks: document.querySelectorAll('.site-footer a').length,
      profileLoaded: document.querySelector('#profile-photo').naturalWidth > 0,
    };
  })()`);
  assert.deepEqual(desktop.sections, ["hero", "about", "experience", "education", "projects", "research-focus", "skills", "achievements", "certifications", "contact"]);
  assert.equal(desktop.experiences, 2);
  assert.equal(desktop.projects, 4);
  assert.equal(desktop.education, 3);
  assert.equal(desktop.certifications, 5);
  assert.equal(desktop.projectLinks, 5);
  assert.equal(desktop.focusItems, 3);
  assert.equal(desktop.networkAligned, true);
  assert.deepEqual(desktop.duplicateIds, []);
  assert.equal(desktop.overflow, false);
  assert.ok(desktop.footerLinks >= 9);
  await waitFor(`document.querySelector("#profile-photo").naturalWidth > 0`);

  const firstWord = await evaluate(`(async () => (await import("/src/config/siteConfig.js")).typedWords[0])()`);
  await waitFor(`document.querySelector("#typed-title").textContent === ${JSON.stringify(firstWord)}`);
  await delay(1000);
  assert.equal(await evaluate(`document.querySelector("#typed-title").textContent`), firstWord, "Completed titles should pause before deleting.");

  const initialTheme = await evaluate(`document.documentElement.dataset.theme`);
  await evaluate(`document.querySelector("#themeBtn").click()`);
  const nextTheme = initialTheme === "dark" ? "light" : "dark";
  assert.equal(await evaluate(`localStorage.getItem("portfolio-theme")`), nextTheme);
  assert.ok((await evaluate(`document.querySelector("#profile-photo").src`)).includes(`profile-pic-${nextTheme}.png`));
  await send("Page.reload");
  await waitFor(`document.querySelector(".hero-identity")`);
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), nextTheme);
  if (nextTheme !== "dark") await evaluate(`document.querySelector("#themeBtn").click()`);
  await evaluate(`window.scrollTo({ top: 0, behavior: "instant" })`);
  await screenshot("desktop.png");
  await evaluate(`document.querySelector("#about").scrollIntoView({ behavior: "instant", block: "start" })`);
  await delay(750);
  await screenshot("about.png");
  await evaluate(`document.querySelector("#projects").scrollIntoView({ behavior: "instant", block: "start" })`);
  await delay(750);
  await screenshot("projects.png");
  await evaluate(`document.querySelector("#education").scrollIntoView({ behavior: "instant", block: "center" })`);
  await delay(750);
  await screenshot("education.png");
  await evaluate(`document.querySelector("#certifications").scrollIntoView({ behavior: "instant", block: "start" })`);
  await delay(750);
  await screenshot("certifications.png");
  await evaluate(`window.scrollTo({ top: 0, behavior: "instant" })`);

  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await delay(200);
  await evaluate(`window.scrollTo({ top: 0, behavior: "instant" }); document.querySelector("#hamBtn").click()`);
  const mobile = await evaluate(`({
    expanded: document.querySelector("#hamBtn").getAttribute("aria-expanded"),
    open: document.querySelector("#mobNav").classList.contains("open"),
    overflow: document.documentElement.scrollWidth > innerWidth,
    canvasRatio: document.querySelector("#nn-canvas").width / document.querySelector("#nn-canvas").clientWidth,
  })`);
  assert.equal(mobile.expanded, "true");
  assert.equal(mobile.open, true);
  assert.equal(mobile.overflow, false);
  assert.equal(mobile.canvasRatio, 2);
  await evaluate(`document.querySelector('#mobNav a[href="#projects"]').click()`);
  assert.equal(await evaluate(`document.querySelector("#mobNav").getAttribute("aria-hidden")`), "true");
  await evaluate(`window.scrollTo({ top: 0, behavior: "instant" })`);
  await screenshot("mobile.png");

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await evaluate(`window.scrollTo({ top: 0, behavior: "instant" })`);
  await delay(150);
  assert.equal(await evaluate(`document.querySelector("#typed-title").textContent`), firstWord);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector(".fade-up")).opacity`), "1");
  assert.equal(await evaluate(`getComputedStyle(document.querySelector(".network-link")).animationName`), "none");

  const resumeResponse = await fetch(`${origin}/documents/ram-chandra-gupta-resume.pdf`);
  const resume = Buffer.from(await resumeResponse.arrayBuffer());
  assert.equal(resumeResponse.status, 200);
  assert.match(resumeResponse.headers.get("content-type"), /application\/pdf/);
  assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
  assert.ok(resume.length > 50000);
  assert.equal((await fetch(`${origin}/missing-asset.js`)).status, 404);
  assert.deepEqual(errors, []);
  assert.deepEqual(failedRequests.filter(message => !message.includes("ABORTED")), []);
  console.log(JSON.stringify({ result: "Browser checks passed", desktop, mobile, themePersistence: "passed", reducedMotion: "passed", typedTitle: "passed", resumeBytes: resume.length, runtimeErrors: errors }, null, 2));
} finally {
  socket?.close();
  await Promise.all([stopProcess(browser), stopProcess(server)]);
  fs.rmSync(profilePath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
