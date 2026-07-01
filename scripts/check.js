import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const requiredSnippets = [
  "<title>",
  "name=\"description\"",
  "rel=\"canonical\"",
  "property=\"og:title\"",
  "application/ld+json"
];

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const info = await stat(full);
    if (info.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk("dist");
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 25) throw new Error(`Expected at least 25 HTML pages, found ${htmlFiles.length}`);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const snippet of requiredSnippets) {
    if (!html.includes(snippet)) throw new Error(`${file} is missing ${snippet}`);
  }
  if (!html.includes("alt=\"")) throw new Error(`${file} is missing image alt text`);
}
for (const required of ["dist/sitemap.xml", "dist/image-sitemap.xml", "dist/robots.txt", "dist/assets/whatsapp-qr.png", "dist/assets/wechat-qr.png", "dist/assets/railway-wheel-manufacturing.webp"]) {
  await stat(required);
}
const webpProductImages = files.filter((file) => file.startsWith("dist/assets/home-products/") && file.endsWith(".webp"));
if (webpProductImages.length < 8) throw new Error(`Expected at least 8 WebP product images, found ${webpProductImages.length}`);
console.log(`Checked ${htmlFiles.length} HTML pages, sitemap, image sitemap, robots.txt, QR assets and WebP product images.`);
