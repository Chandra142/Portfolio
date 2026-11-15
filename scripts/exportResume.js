import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const sourcePath = path.join(projectRoot, "documents", "ram-chandra-gupta-resume.html");
const outputPath = path.join(projectRoot, "documents", "ram-chandra-gupta-resume.pdf");
const temporaryPdfPath = path.join(projectRoot, "documents", ".resume-export.pdf");
const browserCandidates = [
  process.env.CHROME_PATH,
  process.env.CHROME_BIN,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browserPath = browserCandidates.find(candidate => fs.existsSync(candidate));

if (!browserPath) {
  throw new Error("Chrome or Edge is required. Set CHROME_PATH to the browser executable.");
}

const profilePath = fs.mkdtempSync(path.join(os.tmpdir(), "ram-resume-export-"));
try {
  const result = spawnSync(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profilePath}`,
    "--no-pdf-header-footer",
    `--print-to-pdf=${temporaryPdfPath}`,
    pathToFileURL(sourcePath).href,
  ], { encoding: "utf8", timeout: 60000, windowsHide: true });

  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || "Browser PDF export failed.");
  }
  const pdf = fs.readFileSync(temporaryPdfPath);
  const pageCount = pdf.toString("latin1").split("/Type /Page").length - pdf.toString("latin1").split("/Type /Pages").length;
  if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) || pageCount < 1) {
    throw new Error("The browser did not produce a valid PDF.");
  }
  fs.renameSync(temporaryPdfPath, outputPath);
  console.log(`Resume generated: documents/ram-chandra-gupta-resume.pdf (${pageCount} page${pageCount === 1 ? "" : "s"}, ${pdf.length} bytes).`);
} finally {
  fs.rmSync(temporaryPdfPath, { force: true });
  fs.rmSync(profilePath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
