import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT_DIR = "/Users/xiaorusun/Documents/railwheel-technology-website/public/catalog";
const IMG_DIR = path.join(OUT_DIR, "images");
const PPTX_OUT = path.join(OUT_DIR, "catalog.pptx");

const W = 1280;
const H = 720;
const C = {
  navy: "#061A2F",
  ink: "#102236",
  blue: "#0E4D82",
  cyan: "#18A0D8",
  pale: "#F4F8FB",
  steel: "#5B6876",
  line: "#DCE6F0",
  white: "#FFFFFF",
  darkGlass: "rgba(6,26,47,0.72)",
  softGlass: "rgba(6,26,47,0.48)",
};

const contact = {
  company: "Ma'anshan Railwheel Industrial Technology Co., Ltd.",
  website: "www.railwheel.com",
  email: "amy@railwheel.com",
  whatsapp: "+86 17755518921",
};

const img = {
  logo: "railwheel-logo.png",
  cover: "catalog-forged-wheels-hero.webp",
  company: "railway-wheel-manufacturing.webp",
  why: "catalog-components-hero.webp",
  global: "catalog-global-business.webp",
  factory: "catalog-home-hero-alt.webp",
  capacity: "factory-warehouse.webp",
  process: "factory-forging.webp",
  rolling: "factory-rolling.webp",
  heat: "factory-heat-treatment.webp",
  cnc: "factory-cnc.webp",
  inspection: "factory-inspection.webp",
  loading: "factory-container-loading.webp",
  wheel: "railway-wheel.webp",
  wheelsetHero: "catalog-wheelset-hero.webp",
  axle: "railway-axle.webp",
  bogie: "railway-bogie.webp",
  sideFrame: "product-side-frames-alt.webp",
  bolster: "product-bolsters-alt.webp",
  bearingHousing: "railway-axle-box.webp",
  brakeCoupler: "catalog-brake-disc-coupler.webp",
  coupler: "product-other-parts-alt.webp",
  fasteners: "catalog-fasteners-bearing-parts.webp",
  forgings: "product-railway-wheels-alt.webp",
  castings: "catalog-side-frame-bolster.webp",
  freight: "application-freight-wagon.webp",
  passenger: "application-passenger-coach.webp",
  metro: "application-metro.webp",
  locomotive: "application-locomotive.webp",
  oem: "product-wheelsets-alt.webp",
  standards: "certificates-quality-documents.webp",
  material: "product-axles-alt.webp",
  equipment: "railway-components.webp",
  packaging: "railway-bolster.webp",
  shipping: "railway-wheelset.webp",
  miningCase: "case-mining-railway.webp",
  portCase: "case-port-railway.webp",
  deliveryCase: "case-project-meeting.webp",
  visitFactory: "customer-visit-factory.webp",
  visitReview: "product-bogies-alt.webp",
  certs: "certificates-quality-documents.webp",
  certDocs: "product-axle-boxes-alt.webp",
  faq: "railway-side-frame.webp",
  back: "railway-wheel-manufacturing.jpg",
};

async function blob(name) {
  return await fs.readFile(path.join(IMG_DIR, name));
}

function imgType(name) {
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  return "image/webp";
}

function box(slide, x, y, w, h, fill = C.white, line = "none", radius = 0) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
  });
}

function circle(slide, x, y, size, fill = C.cyan, line = "none") {
  return slide.shapes.add({
    geometry: "ellipse",
    position: { left: x, top: y, width: size, height: size },
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
  });
}

function text(slide, value, x, y, w, h, style = {}) {
  const t = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  t.text = value;
  t.text.style = {
    fontSize: style.fontSize || 18,
    bold: !!style.bold,
    color: style.color || C.ink,
    alignment: style.alignment || "left",
  };
  return t;
}

async function image(slide, name, x, y, w, h, alt, fit = "cover") {
  slide.images.add({
    blob: await blob(name),
    contentType: imgType(name),
    alt,
    fit,
    position: { left: x, top: y, width: w, height: h },
  });
}

async function logo(slide, x = 56, y = 30, w = 190, h = 54) {
  await image(slide, img.logo, x, y, w, h, "Railwheel logo", "contain");
}

function icon(slide, label, x, y, symbol = "QC") {
  circle(slide, x, y, 42, C.cyan);
  text(slide, symbol, x, y + 10, 42, 18, { fontSize: 10, bold: true, color: C.white, alignment: "center" });
  text(slide, label, x + 56, y + 8, 210, 24, { fontSize: 17, bold: true, color: C.navy });
}

function footer(slide, n) {
  box(slide, 0, 684, W, 36, C.navy);
  text(slide, contact.website, 54, 695, 240, 16, { fontSize: 11, bold: true, color: C.white });
  text(slide, "Railway Wheels | Wheelsets | Axles | Bogies | Railway Spare Parts", 382, 695, 520, 16, { fontSize: 11, color: "#DCEAF6", alignment: "center" });
  text(slide, String(n).padStart(2, "0"), 1172, 695, 52, 16, { fontSize: 11, bold: true, color: C.white, alignment: "right" });
}

async function header(slide, eyebrow, title, n) {
  box(slide, 0, 0, W, 92, C.white);
  box(slide, 0, 91, W, 1, C.line);
  await logo(slide, 48, 24, 176, 50);
  text(slide, eyebrow.toUpperCase(), 280, 28, 390, 16, { fontSize: 10, bold: true, color: C.cyan });
  text(slide, title, 280, 48, 720, 30, { fontSize: 25, bold: true, color: C.navy });
  text(slide, "PREMIUM INDUSTRIAL CATALOG", 970, 40, 235, 20, { fontSize: 11, bold: true, color: C.steel, alignment: "right" });
  footer(slide, n);
}

function bullets(slide, items, x, y, w, gap = 32, color = C.ink) {
  items.forEach((item, i) => {
    circle(slide, x, y + i * gap + 5, 8, C.cyan);
    text(slide, item, x + 18, y + i * gap - 1, w - 18, 24, { fontSize: 15, color });
  });
}

async function cover(pres) {
  const s = pres.slides.add();
  s.background.fill = C.navy;
  await image(s, img.cover, 0, 0, W, H, "Premium forged railway wheel manufacturing hero image");
  box(s, 0, 0, W, H, "rgba(6,26,47,0.58)");
  box(s, 0, 0, 560, H, C.darkGlass);
  await logo(s, 70, 58, 230, 66);
  text(s, "INTERNATIONAL RAILWAY COMPONENTS CATALOG", 72, 178, 410, 24, { fontSize: 13, bold: true, color: C.cyan });
  text(s, "Railway Wheels & Components", 70, 232, 445, 128, { fontSize: 52, bold: true, color: C.white });
  text(s, "Forged railway wheels, train wheels, railroad wheels, railway wheelsets, axles, bogies and rolling stock components for global industrial buyers.", 74, 390, 420, 116, { fontSize: 20, color: "#DCEAF6" });
  icon(s, "OEM Manufacturing", 78, 552, "OEM");
  icon(s, "Global Supply", 78, 610, "EX");
  text(s, contact.website, 980, 632, 220, 22, { fontSize: 17, bold: true, color: C.white, alignment: "right" });
}

async function visualPage(pres, n, eyebrow, title, lead, imageName, items = []) {
  const s = pres.slides.add();
  s.background.fill = C.white;
  await header(s, eyebrow, title, n);
  await image(s, imageName, 54, 132, 580, 486, title);
  box(s, 682, 132, 470, 82, C.pale, C.line, 8);
  text(s, lead, 704, 154, 430, 40, { fontSize: 20, bold: true, color: C.navy });
  items.forEach((item, i) => {
    const y = 250 + i * 84;
    box(s, 682, y, 470, 62, C.white, C.line, 8);
    circle(s, 704, y + 14, 34, C.cyan);
    text(s, item.code, 704, y + 24, 34, 12, { fontSize: 8, bold: true, color: C.white, alignment: "center" });
    text(s, item.title, 754, y + 12, 250, 22, { fontSize: 17, bold: true, color: C.navy });
    text(s, item.copy, 754, y + 36, 340, 18, { fontSize: 11, color: C.steel });
  });
}

async function fullHero(pres, n, eyebrow, title, lead, imageName, tags = []) {
  const s = pres.slides.add();
  s.background.fill = C.navy;
  await image(s, imageName, 0, 0, W, H, title);
  box(s, 0, 0, W, H, "rgba(6,26,47,0.46)");
  box(s, 0, 0, 610, H, C.darkGlass);
  await logo(s, 64, 44, 190, 54);
  text(s, eyebrow.toUpperCase(), 70, 150, 360, 20, { fontSize: 12, bold: true, color: C.cyan });
  text(s, title, 68, 202, 470, 134, { fontSize: 50, bold: true, color: C.white });
  text(s, lead, 72, 370, 438, 100, { fontSize: 20, color: "#DCEAF6" });
  tags.forEach((tag, i) => {
    box(s, 72 + (i % 2) * 220, 524 + Math.floor(i / 2) * 58, 188, 38, "rgba(255,255,255,0.12)", "rgba(255,255,255,0.20)", 8);
    text(s, tag, 88 + (i % 2) * 220, 535 + Math.floor(i / 2) * 58, 156, 14, { fontSize: 12, bold: true, color: C.white, alignment: "center" });
  });
  footer(s, n);
}

function productContent(name) {
  return {
    overview: `${name} supplied for rolling stock manufacturers, railway operators, maintenance workshops and industrial buyers requiring dependable railway spare parts.`,
    advantages: ["Drawing-based confirmation", "OEM and customized manufacturing support", "Export packing and documentation"],
    features: ["Material and dimensional control", "Machined interfaces according to project drawings", "Surface protection for long-distance shipment"],
    applications: ["Freight wagons", "Passenger coaches", "Metro vehicles", "Locomotives", "Mining and industrial railways"],
    standards: "UIC, AAR, EN and customer-specific requirements can be discussed according to drawings and contracts.",
  };
}

async function productPage(pres, n, name, imageName, featureLabel = "Rolling Stock Component") {
  const s = pres.slides.add();
  s.background.fill = C.white;
  await image(s, imageName, 0, 0, W, 320, `${name} full-width product image`);
  box(s, 0, 0, W, 320, "rgba(6,26,47,0.24)");
  box(s, 0, 0, W, 96, "rgba(6,26,47,0.72)");
  await logo(s, 48, 24, 172, 48);
  text(s, featureLabel.toUpperCase(), 280, 30, 360, 18, { fontSize: 11, bold: true, color: C.cyan });
  text(s, name, 280, 50, 760, 34, { fontSize: 30, bold: true, color: C.white });
  const c = productContent(name);
  text(s, "Product Overview", 68, 354, 250, 26, { fontSize: 21, bold: true, color: C.navy });
  text(s, c.overview, 68, 390, 482, 72, { fontSize: 15, color: C.steel });
  text(s, "Advantages", 620, 354, 210, 26, { fontSize: 21, bold: true, color: C.navy });
  bullets(s, c.advantages, 620, 392, 470, 30);
  text(s, "Technical Features", 68, 506, 250, 26, { fontSize: 21, bold: true, color: C.navy });
  bullets(s, c.features, 68, 542, 480, 28);
  text(s, "Applications & Standards", 620, 506, 300, 26, { fontSize: 21, bold: true, color: C.navy });
  text(s, c.applications.join(" / "), 620, 542, 500, 28, { fontSize: 14, bold: true, color: C.ink });
  text(s, c.standards, 620, 582, 500, 36, { fontSize: 13, color: C.steel });
  footer(s, n);
}

async function casePage(pres, n, title, imageName, details) {
  const s = pres.slides.add();
  s.background.fill = C.white;
  await header(s, "Project case", title, n);
  await image(s, imageName, 54, 126, 560, 500, `${title} project case image`);
  box(s, 654, 126, 500, 500, C.pale, C.line, 8);
  text(s, details.lead, 686, 160, 430, 70, { fontSize: 27, bold: true, color: C.navy });
  const rows = [
    ["Country", details.country],
    ["Products", details.products],
    ["Industry", details.industry],
    ["Application", details.application],
    ["Delivery", details.delivery],
    ["Result", details.result],
  ];
  rows.forEach(([label, value], i) => {
    text(s, label, 686, 266 + i * 47, 120, 18, { fontSize: 12, bold: true, color: C.cyan });
    text(s, value, 812, 262 + i * 47, 290, 24, { fontSize: 15, color: C.ink });
  });
}

async function finalPage(pres) {
  const s = pres.slides.add();
  s.background.fill = C.navy;
  await image(s, img.back, 0, 0, W, H, "Railway wheel factory background");
  box(s, 0, 0, W, H, "rgba(6,26,47,0.78)");
  await logo(s, 76, 70, 230, 66);
  text(s, "Build Your Next Railway Component Supply Program", 80, 218, 680, 116, { fontSize: 48, bold: true, color: C.white });
  text(s, "Send drawings, standards, quantities and destination to receive a focused quotation for railway wheels, train wheels, railroad wheels, wheelsets, axles, bogies and rolling stock components.", 84, 366, 650, 92, { fontSize: 20, color: "#DCEAF6" });
  box(s, 82, 520, 470, 96, "rgba(255,255,255,0.12)", "rgba(255,255,255,0.18)", 8);
  text(s, contact.company, 108, 540, 420, 20, { fontSize: 17, bold: true, color: C.white });
  text(s, `Website: ${contact.website}\nEmail: ${contact.email}\nWhatsApp / WeChat: ${contact.whatsapp}`, 108, 566, 390, 52, { fontSize: 15, color: "#DCEAF6" });
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const pres = Presentation.create({ slideSize: { width: W, height: H } });

  await cover(pres);
  await visualPage(pres, 2, "Company profile", "Focused Railway Component Supplier", "Railwheel supplies railway wheels, train wheels, railroad wheels, wheelsets, axles, bogies and railway spare parts for international buyers.", img.company, [
    { code: "RW", title: "Railway Wheel Focus", copy: "Forged wheels and heavy-duty train wheel supply." },
    { code: "OEM", title: "Custom Projects", copy: "Support for drawings, samples and technical requirements." },
    { code: "EX", title: "Export Coordination", copy: "Packing, documents and shipment planning." },
    { code: "QA", title: "Quality Mindset", copy: "Inspection records and traceability discussion." },
  ]);
  await visualPage(pres, 3, "Company strengths", "Why Choose Railwheel", "A premium sourcing partner for railway wheel, wheelset, axle, bogie and rolling stock component procurement.", img.why, [
    { code: "01", title: "Technical Communication", copy: "Clear drawing review before quotation." },
    { code: "02", title: "Industrial Network", copy: "Manufacturing routes for forged, cast and machined parts." },
    { code: "03", title: "Quality Records", copy: "Material certificates and inspection reports on request." },
    { code: "04", title: "Global Service", copy: "Direct English support from inquiry to shipment." },
  ]);
  await fullHero(pres, 4, "Worldwide market", "Global Railway Supply", "Railwheel supports overseas railway operators, OEMs, maintenance contractors and industrial railway buyers across freight, passenger, metro, mining and port applications.", img.global, ["Freight Wagons", "Passenger Coaches", "Metro", "Locomotives"]);
  await visualPage(pres, 5, "Factory overview", "Industrial Manufacturing Capability", "A coordinated manufacturing base for railway forgings, railway castings, machined parts, wheelsets and bogie components.", img.factory, [
    { code: "FG", title: "Forging", copy: "Steel forming route for railway wheels and axles." },
    { code: "MC", title: "Machining", copy: "CNC finishing for functional interfaces." },
    { code: "HT", title: "Heat Treatment", copy: "Process planning for wheel and axle performance." },
    { code: "AS", title: "Assembly", copy: "Wheelset and component package coordination." },
  ]);
  await visualPage(pres, 6, "Production capacity", "Capacity for Export Programs", "Production planning is organized around drawings, standards, batch size, inspection expectations and global shipping schedule.", img.capacity, [
    { code: "01", title: "Batch Supply", copy: "Wheels, axles, wheelsets and bogie parts." },
    { code: "02", title: "Multi-product Orders", copy: "Grouped supply for rolling stock projects." },
    { code: "03", title: "Packing Readiness", copy: "Heavy-duty export packing for long-distance transport." },
    { code: "04", title: "Repeat Orders", copy: "Reference records for long-term supply." },
  ]);
  await fullHero(pres, 7, "Manufacturing process", "Forging & Forming", "Controlled production connects material preparation, forging, rolling, heat treatment, machining, inspection, packing and shipment.", img.process, ["Material", "Forging", "Heat Treatment", "Inspection"]);
  await fullHero(pres, 8, "Workshop", "Rolling Process", "Wheel rolling and forming operations create the geometry foundation for forged railway wheels, train wheels and railroad wheels.", img.rolling, ["Wheel Blank", "Rolling Mill", "Profile Control", "Traceability"]);
  await fullHero(pres, 9, "Workshop", "Heat Treatment", "Heat treatment planning supports hardness, structure and service performance for steel railway wheels and heavy-duty components.", img.heat, ["Furnace", "Quenching", "Hardness", "Records"]);
  await fullHero(pres, 10, "Workshop", "CNC Machining", "Precision machining supports axle seats, bores, interfaces and finished dimensions for wheels, axles and machined railway components.", img.cnc, ["CNC", "Tolerance", "Surface", "Interface"]);
  await fullHero(pres, 11, "Quality", "Inspection & Testing", "Inspection activities may include dimensional control, hardness checks, ultrasonic testing, chemical analysis and visual inspection.", img.inspection, ["UT", "Hardness", "Dimensions", "Reports"]);
  await fullHero(pres, 12, "Logistics", "Container Loading", "Export packing and container loading are planned to protect heavy railway wheels, wheelsets, axles and spare parts during international transport.", img.loading, ["Steel Frame", "Anti-rust", "Labels", "Shipment"]);

  const productSlides = [
    [13, "Railway Wheels", img.wheel, "Forged Railway Wheel"],
    [14, "Railway Wheelsets", img.wheelsetHero, "Wheelset Assembly"],
    [15, "Railway Axles", img.axle, "Forged Railway Axle"],
    [16, "Railway Bogies", img.bogie, "Railway Bogie"],
    [17, "Side Frames", img.sideFrame, "Bogie Casting"],
    [18, "Bolsters", img.bolster, "Bogie Casting"],
    [19, "Bearing Housing", img.bearingHousing, "Machined Component"],
    [20, "Brake Disc", img.brakeCoupler, "Brake Component"],
    [21, "Coupler", img.coupler, "Rolling Stock Component"],
    [22, "Railway Fasteners", img.fasteners, "Railway Spare Parts"],
    [23, "Railway Forgings", img.forgings, "Forged Components"],
    [24, "Railway Castings", img.castings, "Cast Components"],
    [25, "Freight Wagon Parts", img.freight, "Freight Railway Application"],
    [26, "Passenger Coach Parts", img.passenger, "Passenger Railway Application"],
    [27, "Metro Components", img.metro, "Urban Rail Application"],
    [28, "Locomotive Parts", img.locomotive, "Heavy Rail Application"],
  ];
  for (const [n, name, imageName, featureLabel] of productSlides) {
    await productPage(pres, n, name, imageName, featureLabel);
  }

  await visualPage(pres, 29, "OEM manufacturing", "Custom Railway Component Programs", "Railwheel supports OEM manufacturing for railway wheel, train wheel, wheelset, axle, bogie and spare part projects based on drawings and technical requirements.", img.oem, [
    { code: "DWG", title: "Drawing Review", copy: "Confirm material, geometry, tolerance and inspection scope." },
    { code: "STD", title: "Standards", copy: "Discuss UIC, AAR, EN and customer specifications." },
    { code: "QA", title: "Inspection Plan", copy: "Prepare practical records for buyer review." },
    { code: "EX", title: "Export Package", copy: "Packing, marking, photos and shipment documents." },
  ]);
  await visualPage(pres, 30, "Technical standards", "UIC, AAR, EN & Customer Specifications", "International railway buyers often combine public standards with project drawings and contract acceptance requirements.", img.standards, [
    { code: "UIC", title: "UIC References", copy: "International railway terminology and practices." },
    { code: "AAR", title: "AAR Requirements", copy: "North American railroad wheel and component context." },
    { code: "EN", title: "European Standards", copy: "Wheel, axle and wheelset project references." },
    { code: "OEM", title: "Customer Drawings", copy: "Final acceptance follows buyer documentation." },
  ]);
  await visualPage(pres, 31, "Material", "Steel, Forging & Casting Control", "Material selection is matched to axle load, speed, route profile, operating environment and inspection requirements.", img.material, [
    { code: "ST", title: "Steel Selection", copy: "Material grade aligned with application." },
    { code: "FG", title: "Forged Parts", copy: "Railway wheels, train wheels and axles." },
    { code: "CS", title: "Cast Parts", copy: "Side frames, bolsters and bogie components." },
    { code: "SP", title: "Surface Protection", copy: "Anti-rust and coating options." },
  ]);
  await visualPage(pres, 32, "Inspection equipment", "Testing & Documentation", "Industrial buyers can request inspection documentation for material, dimensions, surface condition and packing release.", img.equipment, [
    { code: "UT", title: "Ultrasonic Testing", copy: "Internal integrity checks where required." },
    { code: "HD", title: "Hardness Testing", copy: "Heat treatment and rim condition review." },
    { code: "DM", title: "Dimension Inspection", copy: "Critical interface and tolerance confirmation." },
    { code: "RP", title: "Reports", copy: "Document package according to buyer needs." },
  ]);
  await visualPage(pres, 33, "Packaging", "Heavy-duty Export Packing", "Railway wheels, wheelsets, axles and bogie parts require stable packing, anti-rust protection, labels and lifting considerations.", img.packaging, [
    { code: "FR", title: "Steel Frames", copy: "For heavy wheels, axles and assemblies." },
    { code: "CS", title: "Cases", copy: "Wooden cases for machined spare parts." },
    { code: "AR", title: "Anti-rust", copy: "Protection for ocean freight and storage." },
    { code: "PH", title: "Packing Photos", copy: "Visual records before shipment." },
  ]);
  await visualPage(pres, 34, "Shipping", "International Delivery Support", "Railwheel coordinates shipment discussion for sea freight, port delivery, package size, weight and document preparation.", img.shipping, [
    { code: "SEA", title: "Sea Freight", copy: "Container shipment for global buyers." },
    { code: "TRK", title: "Truck Transfer", copy: "Domestic logistics and port delivery." },
    { code: "DOC", title: "Documents", copy: "Invoice, packing list and shipment data." },
    { code: "SCH", title: "Schedule", copy: "Delivery planning aligned with inspection." },
  ]);

  await casePage(pres, 35, "Mining Railway Wheel Supply", img.miningCase, {
    lead: "Heavy-duty wheel and wheelset support for harsh industrial railway conditions.",
    country: "Overseas mining market",
    products: "Heavy haul railway wheels, axles and wheelsets",
    industry: "Mining railway",
    application: "Ore wagons and maintenance replacement",
    delivery: "Export packed by batch",
    result: "Stronger procurement visibility and repeat inquiry basis",
  });
  await casePage(pres, 36, "Port Railway & Crane Wheel Project", img.portCase, {
    lead: "Railway wheel and crane wheel sourcing for port logistics and industrial transport.",
    country: "International port market",
    products: "Port railway wheels, crane wheels and spare parts",
    industry: "Port and logistics",
    application: "Container terminal rail movement",
    delivery: "Container loading with packing photos",
    result: "Consolidated shipment of heavy rail components",
  });
  await casePage(pres, 37, "Railway Wheelset Project Review", img.deliveryCase, {
    lead: "Technical coordination before quotation improves drawing accuracy and delivery planning.",
    country: "Global OEM buyer",
    products: "Railway wheelsets, train wheels and axles",
    industry: "Rolling stock manufacturing",
    application: "OEM and maintenance supply",
    delivery: "Drawing-based production schedule",
    result: "Clear technical scope before purchase order",
  });
  await visualPage(pres, 38, "Customer visits", "Factory Visit & Technical Meetings", "Customer visits help international buyers review production flow, quality expectations, packing plans and long-term railway component supply programs.", img.visitFactory, [
    { code: "ME", title: "Engineering Discussion", copy: "Review drawings, standards and applications." },
    { code: "WK", title: "Workshop Visit", copy: "Confirm manufacturing and inspection flow." },
    { code: "QA", title: "Quality Review", copy: "Discuss test records and document scope." },
    { code: "SP", title: "Supply Planning", copy: "Coordinate repeat order and delivery schedule." },
  ]);
  await visualPage(pres, 39, "Customer visits", "Application Review with Buyers", "Railwheel supports product selection for freight wagon, passenger coach, metro, locomotive, mining and industrial railway applications.", img.visitReview, [
    { code: "FR", title: "Freight Applications", copy: "Wheels, wheelsets and bogie components." },
    { code: "MT", title: "Metro Applications", copy: "Passenger railway wheel and axle projects." },
    { code: "IN", title: "Industrial Rail", copy: "Mining, port and steel plant rail systems." },
    { code: "OEM", title: "Custom Supply", copy: "Drawing-based railway spare parts." },
  ]);
  await visualPage(pres, 40, "Certificates", "Quality Certificates & Compliance", "Certificate pages support buyer approval, internal project review and export release for railway wheels and rolling stock components.", img.certDocs, [
    { code: "MAT", title: "Material Certificates", copy: "Heat number, grade and traceability details." },
    { code: "INS", title: "Inspection Reports", copy: "Dimensional, visual and test records." },
    { code: "STD", title: "Standard References", copy: "UIC, AAR, EN and customer specifications." },
    { code: "EXP", title: "Export Documents", copy: "Packing, labels and shipment records." },
  ]);
  await visualPage(pres, 41, "FAQ & service", "Buyer FAQ and After-sales Support", "Railwheel keeps communication practical: send drawings, standards, quantity and destination to receive focused technical feedback and quotation.", img.faq, [
    { code: "Q1", title: "Can you customize?", copy: "Yes, based on drawings, samples or standards." },
    { code: "Q2", title: "What products?", copy: "Railway wheels, wheelsets, axles, bogies and spare parts." },
    { code: "Q3", title: "What documents?", copy: "Material certificates and inspection records as required." },
    { code: "Q4", title: "How to quote?", copy: "Send drawing, quantity, application and destination." },
  ]);
  await finalPage(pres);

  const pptx = await PresentationFile.exportPptx(pres);
  await pptx.save(PPTX_OUT);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
