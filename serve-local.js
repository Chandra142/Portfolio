const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 8000;
const rootDirectory = __dirname;
const defaultDocument = path.join(rootDirectory, "public", "index.html");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function resolveRequestPath(urlPath) {
  if (urlPath === "/") {
    return defaultDocument;
  }

  const relativePath = urlPath.replace(/^\/+/, "");
  const directPath = path.join(rootDirectory, relativePath);
  
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  const publicPath = path.join(rootDirectory, "public", relativePath);
  return publicPath;
}

http
  .createServer((request, response) => {
    const urlPath = decodeURIComponent((request.url || "/").split("?")[0]);
    const filePath = resolveRequestPath(urlPath);

    if (!filePath.startsWith(rootDirectory)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const extension = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[extension] || "application/octet-stream";
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Serving portfolio from ${defaultDocument} at http://${host}:${port}`);
  });
