import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const requiredSnippets = [
  "<title>",
  "name=\"description\"",
  "rel=\"canonical\"",
  "property=\"og:title\"",
  "name=\"twitter:card\"",
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
if (htmlFiles.length < 130) throw new Error(`Expected at least 130 HTML pages, found ${htmlFiles.length}`);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const snippet of requiredSnippets) {
    if (!html.includes(snippet)) throw new Error(`${file} is missing ${snippet}`);
  }
  if (html.includes("<img") && !html.includes("alt=\"")) throw new Error(`${file} has an image without alt text`);
}
for (const required of ["dist/sitemap.xml", "dist/robots.txt", "dist/assets/zys-advisory-hero.webp"]) {
  await stat(required);
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
if (!sitemap.includes("/services/china-company-registration/")) throw new Error("Sitemap missing China Company Registration page");
if (!sitemap.includes("/blog/")) throw new Error("Sitemap missing blog pages");
console.log(`Checked ${htmlFiles.length} HTML pages, sitemap, robots.txt, schema tags and hero asset.`);
