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
