import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { componentArticles, componentArticleSources } from "./component-articles.js";

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
const mobilityProducts = [
  ["railway-gangway", "Railway Gangway"],
  ["railway-gangway-bellows", "Railway Gangway Bellows"],
  ["inter-car-connection", "Inter-Car Connection"],
  ["bus-articulated-bellows", "Bus Articulated Bellows"],
  ["flexible-vehicle-bellows", "Flexible Vehicle Bellows"],
  ["passenger-boarding-bridge", "Passenger Boarding Bridge"]
];
const home = await readFile("dist/index.html", "utf8");
if (!home.includes('<script src="/hero-slideshow.js" defer></script>')) throw new Error("Missing homepage slideshow script");
await stat("dist/hero-slideshow.js");
for (const file of ["catalog-forged-wheels-hero.webp", "factory-cnc.webp"]) await stat(`dist/catalog/images/${file}`);
const catalog = await readFile("dist/products/index.html", "utf8");
const imageSitemap = await readFile("dist/image-sitemap.xml", "utf8");
for (const [slug, title] of mobilityProducts) {
  const image = `/assets/home-products/${slug}-illustration.webp`;
  await stat(`dist${image}`);
  for (const html of [home, catalog]) {
    if (!html.includes(image) || !html.includes(`/products/${slug}/`)) throw new Error(`Missing product card: ${slug}`);
  }
  const detail = await readFile(`dist/products/${slug}/index.html`, "utf8");
  if (!detail.includes(image) || !detail.includes(`<option selected>${title}</option>`)) throw new Error(`Missing image or selected inquiry product: ${slug}`);
  if (!imageSitemap.includes(image)) throw new Error(`Missing image sitemap entry: ${slug}`);
}
const applicationImages = files.filter((file) => file.startsWith("dist/assets/gangway-applications/") && file.endsWith(".webp"));
if (applicationImages.length !== 6) throw new Error("Expected six supplied gangway application photos");
for (const slug of ["railway-gangway", "railway-gangway-bellows", "inter-car-connection", "gangways"]) {
  const detail = await readFile(`dist/products/${slug}/index.html`, "utf8");
  for (const image of applicationImages) {
    if (!detail.includes(image.slice(4))) throw new Error(`Missing application photo in ${slug}: ${image}`);
  }
}
for (const slug of ["bus-articulated-bellows", "flexible-vehicle-bellows", "passenger-boarding-bridge"]) {
  const detail = await readFile(`dist/products/${slug}/index.html`, "utf8");
  if (detail.includes('/assets/gangway-applications/')) throw new Error(`Railway reference photos must not be presented as ${slug}`);
}
const additionalComponents = [
  ["railway-springs", "railway-spring-studio.webp", "Railway Spring"],
  ["railway-bearing-adapters", "railway-bearing-adapter-studio.webp", "Railway Bearing Adapter"],
  ["railway-friction-wedges", "railway-friction-wedge-studio.webp", "Railway Friction Wedge"]
];
const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const [slug, image, title] of additionalComponents) {
  await stat(`dist/assets/home-products/${image}`);
  const route = `/products/${slug}/`;
  const detail = await readFile(`dist${route}index.html`, "utf8");
  for (const html of [home, catalog]) {
    if (!html.includes(route) || !html.includes(image)) throw new Error(`Missing new component: ${slug}`);
  }
  if (!sitemap.includes(route) || !imageSitemap.includes(image)) throw new Error(`Missing sitemap entry: ${slug}`);
  if (!detail.includes(`<option selected>${title}</option>`)) throw new Error(`Missing selected inquiry option: ${slug}`);
  if ((detail.match(/<h1[ >]/g) || []).length !== 1) throw new Error(`Invalid H1 count: ${slug}`);
  for (const match of detail.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  if (detail.includes('schema.org/InStock')) throw new Error(`Unconfirmed stock claim: ${slug}`);
}
for (const image of ["railway-brake-shoe-studio.webp", "railway-hose-studio.webp", "railway-coupler-studio.webp", "railway-carbon-brush-studio.webp", "railway-gangway-studio.webp"]) {
  await stat(`dist/assets/home-products/${image}`);
  if (!home.includes(image) || !catalog.includes(image)) throw new Error(`Missing studio product image: ${image}`);
}
if (home.includes('/assets/home-products/railway-gangway.webp')) throw new Error("Homepage gangway product card must not use the old interior photograph");
console.log(`Checked ${htmlFiles.length} HTML pages, sitemap, image sitemap, robots.txt, QR assets and WebP product images.`);
if (componentArticles.length !== 20) throw new Error("Expected exactly 20 new technical articles");
const articleSlugs = new Set();
const articleTitles = new Set();
const paragraphs = new Set();
const newsIndex = await readFile("dist/news/index.html", "utf8");
for (const article of componentArticles) {
  if (articleSlugs.has(article.slug) || articleTitles.has(article.title)) throw new Error(`Duplicate article identity: ${article.slug}`);
  articleSlugs.add(article.slug);
  articleTitles.add(article.title);
  if (article.sections.length !== 6 || article.table.length < 4 || article.faqs.length < 2) throw new Error(`Incomplete technical article: ${article.slug}`);
  const text = [...article.sections.flat(), article.scenario, ...article.table.flat(), ...article.faqs.flat()].join(" ");
  if (text.split(/\s+/).length < 500) throw new Error(`Insufficient article depth: ${article.slug}`);
  for (const [, paragraph] of article.sections) {
    if (paragraphs.has(paragraph)) throw new Error(`Repeated article paragraph: ${article.slug}`);
    paragraphs.add(paragraph);
  }
  for (const source of article.sources) if (!componentArticleSources[source]) throw new Error(`Unknown reference: ${source}`);
  const route = `/news/${article.slug}/`;
  const html = await readFile(`dist${route}index.html`, "utf8");
  if ((html.match(/<h1[ >]/g) || []).length !== 1) throw new Error(`Invalid article H1: ${article.slug}`);
  if (!newsIndex.includes(route) || !sitemap.includes(route) || !imageSitemap.includes(route)) throw new Error(`Missing article discovery link: ${article.slug}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
  const articleSchema = schemas.find((schema) => schema["@type"] === "Article");
  if (faq?.mainEntity.length !== article.faqs.length || articleSchema?.datePublished !== "2026-11-14") throw new Error(`Incorrect article schema: ${article.slug}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    await stat(`dist${target}${target.endsWith("/") ? "index.html" : ""}`);
  }
}
console.log("Verified 20 unique technical articles, content structure, FAQ/Article schema, references and all local links.");
for (const route of ["about", "manufacturing-capability"]) {
  const html = await readFile(`dist/${route}/index.html`, "utf8");
  if (html.includes('class="visual-panel"')) throw new Error(`Unfilled visual placeholder: ${route}`);
  for (const image of ["workshop-visit.webp", "metrology-review.webp", "technical-meeting.webp"]) {
    if (!html.includes(`/assets/company/${image}`)) throw new Error(`Missing company reference photo: ${route}/${image}`);
    await stat(`dist/assets/company/${image}`);
  }
  if (route === "about" && html.includes("Brand identity</h3>")) throw new Error("Outdated About placeholder content");
}
const checkedImages = new Set();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const source = match[1];
    if (/^(https?:|data:)/.test(source)) continue;
    const target = source.startsWith("/") ? path.join("dist", source.split(/[?#]/)[0]) : path.resolve(path.dirname(file), source.split(/[?#]/)[0]);
    if (!checkedImages.has(target)) { await stat(target); checkedImages.add(target); }
  }
}
console.log(`Checked all local image references across ${htmlFiles.length} pages and company-photo sections.`);
