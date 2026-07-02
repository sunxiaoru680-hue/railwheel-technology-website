import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const port = Number(process.env.PORT || 3001);
const root = path.resolve("dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const host = "127.0.0.1";

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  let filePath = path.join(root, decodeURIComponent(url.pathname));
  if (url.pathname.endsWith("/")) filePath = path.join(filePath, "index.html");
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) filePath = path.join(root, "404.html");
  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, host, () => {
  console.log(`ZYS Advisory site preview: http://localhost:${port}/`);
});
