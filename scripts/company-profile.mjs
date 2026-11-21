import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const root = process.cwd();
const runtime = process.env.RAILWHEEL_RUNTIME || "/Users/xiaorusun/.cache/codex-runtimes/codex-primary-runtime/dependencies";
const modules = path.join(runtime, "node/node_modules");
process.env.RUNTIME_NODE_MODULES = modules;
const require = createRequire(path.join(modules, "package.json"));
const sharp = require("sharp");
const { Presentation, PresentationFile } = await import(pathToFileURL(path.join(modules, "@oai/artifact-tool/dist/artifact_tool.mjs")));
const skill = process.env.PRESENTATIONS_SKILL || "/Users/xiaorusun/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11217/skills/presentations";
const { finalizePresentation } = await import(pathToFileURL(path.join(skill, "container_tools/artifact_tool_utils.mjs")));
const work = path.join(root, "tmp/company-profile");
const output = path.join(root, "output/company-profile");
await fs.mkdir(work, { recursive: true });
await fs.mkdir(output, { recursive: true });
const blue = "#115D93", navy = "#071D30", ink = "#102D42", muted = "#536773", light = "#E9F0F5";
const company = "Ma'anshan Railwheel Industrial Technology Co., Ltd.";

function rect(slide, x, y, w, h, color) {
  return slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: w, height: h }, fill: color, line: { fill: "none", width: 0 } });
}
function text(slide, value, x, y, w, h, size = 24, color = ink, bold = false) {
  const shape = slide.shapes.add({ geometry: "textbox", position: { left: x, top: y, width: w, height: h }, fill: "none", line: { fill: "none", width: 0 } });
  shape.text = value;
  shape.text.style = { fontFamily: "Arial", fontSize: size, color, bold, verticalAlignment: "top" };
  return shape;
}
async function image(slide, file, x, y, w, h, fit = "contain") {
  const data = await sharp(path.join(root, file)).resize({ width: 1600, withoutEnlargement: true }).png().toBuffer();
  slide.images.add({ blob: data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), contentType: "image/png", alt: path.basename(file), fit, position: { left: x, top: y, width: w, height: h } });
}
function base(deck, title, number) {
  const s = deck.slides.add();
  s.background.fill = "#FFFFFF";
  rect(s, 0, 0, 1280, 12, blue);
  text(s, "RAILWHEEL", 60, 34, 300, 36, 22, blue, true);
  text(s, title, 60, 100, 1150, 100, 44, ink, true);
  rect(s, 60, 650, 1160, 1, light);
  text(s, "railwheelchina.com  |  amy@railwheel.com", 60, 666, 1000, 26, 15, muted);
  text(s, String(number).padStart(2, "0"), 1170, 666, 50, 26, 15, muted);
  s.speakerNotes.text = "Source: company name, contact and product scope supplied by the user. Images are existing Railwheel assets. Generated product and process illustrations are labeled on-slide. No factory ownership, certification, capacity or completed customer project is asserted.";
  return s;
}
async function cover(deck) {
  const s = deck.slides.add(); s.background.fill = navy;
  await image(s, "assets/railwheel-logo-new.png", 60, 42, 300, 100);
  text(s, "Railwheel", 60, 205, 1100, 95, 72, "#FFFFFF", true);
  text(s, "Railway wheels & rolling stock components", 60, 310, 1120, 75, 38, "#FFFFFF", true);
  text(s, company, 60, 425, 1020, 75, 28, "#FFFFFF");
  rect(s, 60, 535, 100, 5, "#19A9DB");
  text(s, "China-based supply. Technical review. International export support.", 60, 565, 1100, 65, 24, "#D6E6EF");
  text(s, "COMPANY PROFILE  |  NOVEMBER 2026", 60, 666, 1100, 26, 16, "#AAC7D9");
  return s;
}
async function productSlide(deck, title, number, entries, note) {
  const s = base(deck, title, number);
  for (const [i, [name, file, copy]] of entries.entries()) {
    const x = 60 + i * 395;
    rect(s, x, 215, 370, 240, "#F0F3F5");
    await image(s, file, x, 215, 370, 240);
    text(s, name, x, 472, 370, 48, 27, ink, true);
    text(s, copy, x, 529, 360, 95, 21, muted);
  }
  text(s, note || "AI-generated product illustrations. Configuration and availability require project review.", 60, 625, 1160, 22, 13, muted);
}
async function profile(short = false) {
  const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  await cover(deck);
  let s = base(deck, "A supply partner for international rail projects", 2);
  text(s, "Based in Ma'anshan, Anhui, China", 60, 216, 1100, 45, 30, blue, true);
  text(s, "Railwheel supports rolling stock manufacturers, operators and maintenance buyers with railway wheels, wheelsets, axles, bogie parts and related components.", 60, 285, 1110, 100, 30);
  text(s, "We coordinate drawing review, manufacturing and sourcing requirements, inspection documentation and export preparation. The production facility, supply responsibilities and applicable approvals are confirmed for each order.", 60, 421, 1100, 125, 26, muted);
  text(s, "Applications: freight wagons, passenger coaches, metro, locomotives, mining and industrial railways.", 60, 570, 1100, 55, 24, blue);
  if (short) {
    await productSlide(deck, "Core products and passenger connections", 3, [
      ["Wheels & wheelsets", "assets/home-products/railway-wheel.webp", "Train wheels, railroad wheels, axles and assembled wheelset inquiries."],
      ["Bogie components", "assets/home-products/railway-bogie.webp", "Bogies, side frames, bolsters, springs, axle boxes and bearing components."],
      ["Gangways & brake parts", "assets/home-products/railway-gangway-illustration.webp", "Inter-car connections, bellows, brake hoses, brake shoes and coupler inquiries."]
    ]);
  } else {
    await productSlide(deck, "Railway wheels, wheelsets & axles", 3, [
      ["Railway wheels", "assets/home-products/railway-wheel.webp", "Forged and steel wheel inquiries to controlled material, profile and inspection requirements."],
      ["Railway wheelsets", "assets/home-products/railway-wheelset.webp", "Define assembly scope, wheel-seat fits, bearing interfaces and required records."],
      ["Railway axles", "assets/home-products/railway-axle.webp", "Drawing-based supply with journal, wheel-seat, material and examination requirements."]
    ]);
    await productSlide(deck, "Bogie structures & suspension components", 4, [
      ["Railway bogies", "assets/home-products/railway-bogie.webp", "Freight and passenger applications subject to interface and engineering review."],
      ["Side frames & bolsters", "assets/home-products/railway-bolster.webp", "Confirm drawings, casting scope, material requirements and acceptance criteria."],
      ["Suspension springs", "assets/home-products/railway-spring-studio.webp", "Specify load-deflection points, geometry, fatigue requirements and group identity."]
    ]);
    await productSlide(deck, "Braking, connection & spare parts", 5, [
      ["Brake hose assemblies", "assets/home-products/railway-hose-studio.webp", "Define coupling heads, fittings, hose length, pressure and environment."],
      ["Coupler components", "assets/home-products/railway-coupler.webp", "Vehicle-specific interfaces and approved connection-system scope."],
      ["Railway spare parts", "assets/home-products/railway-components.webp", "Axle boxes, bearing housings, forgings and castings by technical inquiry."]
    ]);
    s = base(deck, "Passenger gangways & flexible connections", 6);
    await image(s, "assets/gangway-applications/railway-gangway-interior-passage.webp", 60, 210, 440, 385, "cover");
    text(s, "Railway gangways, bellows and inter-car passage components", 540, 216, 660, 85, 30, ink, true);
    text(s, "Review car-end drawings, relative movement, floor transitions, mounting interfaces and required fire evidence before quotation.", 540, 324, 650, 100, 26);
    text(s, "Related inquiry scope includes articulated bus bellows, flexible vehicle bellows and passenger boarding bridge interfaces, subject to technical feasibility.", 540, 457, 650, 115, 24, muted);
    text(s, "Supplied partner application reference; not evidence of a Railwheel delivery or owned facility.", 60, 620, 1160, 22, 13, muted);
    s = base(deck, "Drawing-based manufacturing & supply review", 7);
    const steps = [["01", "Define", "Drawing revision, vehicle application, materials and exact standard editions."], ["02", "Review", "Supply boundary, manufacturing route, interfaces and declared deviations."], ["03", "Confirm", "Inspection scope, documents, packing and commercial delivery conditions."], ["04", "Coordinate", "Order clarification, agreed records and export communication."]];
    steps.forEach(([num, label, copy], i) => { const y = 215 + i * 98; text(s, num, 60, y, 65, 45, 32, blue, true); text(s, label, 150, y, 200, 45, 29, ink, true); text(s, copy, 380, y, 820, 70, 24, muted); });
    s = base(deck, "Quality requirements defined for each order", 8);
    const quality = [["Material & traceability", "Confirm identification, material records and the required manufacturing documentation."], ["Dimensions & interfaces", "Link inspection results to the accepted drawing revision and applicable assembly scope."], ["Testing & acceptance", "Agree examination methods, coverage, criteria and reporting before order release."], ["Standards & approvals", "AAR, EN or UIC requirements apply only where specified and supported by project evidence."]];
    quality.forEach(([heading, copy], i) => { const y = 214 + i * 100; text(s, heading, 60, y, 410, 45, 28, blue, true); text(s, copy, 500, y, 690, 74, 24); });
    s = base(deck, "Export preparation & international buyer support", 9);
    text(s, "One organized technical inquiry", 60, 220, 1100, 45, 31, blue, true);
    text(s, "Share the part drawing and revision, quantity, application, required documents, delivery destination and target schedule. Multiple component requirements can be organized within one inquiry trail.", 60, 292, 1110, 110, 28);
    text(s, "Packing & shipment review", 60, 438, 1100, 45, 31, blue, true);
    text(s, "Agree protection of machined surfaces, package identity, handling requirements and shipment documents. Lead time, minimum order quantity, inspection and delivery terms are confirmed in the quotation and contract.", 60, 507, 1110, 110, 26, muted);
  }
  s = base(deck, "Discuss your next railway component requirement", short ? 4 : 10);
  text(s, "Amy Sun", 60, 220, 760, 65, 44, blue, true);
  text(s, "Sales Manager", 60, 290, 760, 40, 24, muted);
  text(s, "Email: amy@railwheel.com\nWhatsApp / WeChat: +86 17755518921\nMa'anshan City, Anhui Province, China\nWebsite: https://www.railwheelchina.com", 60, 360, 790, 185, 26);
  await image(s, "assets/whatsapp-qr.png", 970, 235, 220, 220);
  text(s, "WhatsApp", 990, 470, 200, 35, 23, ink, true);
  text(s, "Send drawings, quantity, technical requirements and destination for review.", 60, 580, 1120, 55, 25, blue);
  const stem = short ? "railwheel-company-profile-short" : "railwheel-company-profile";
  await (await PresentationFile.exportPptx(deck)).save(path.join(work, `${stem}-draft.pptx`));
  if (!existsSync(path.join(output, `${stem}.pptx`))) {
  await finalizePresentation({ workspaceDir: root, candidatePath: path.join(work, `${stem}-draft.pptx`), finalPath: path.join(output, `${stem}.pptx`), pythonExecutable: path.join(runtime, "python/bin/python3"), integrityValidatorPath: path.join(skill, "container_tools/inspect_presentation_package_integrity.py"), layoutValidatorPath: path.join(skill, "container_tools/inspect_presentation_layout_geometry.py"), layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"], fontPolicy: { basis: "design", families: ["Arial"] }, verifyArtifactToolImport: true, receiptPath: path.join(work, `${stem}-validation.json`) });
  }
  for (const [i, slide] of deck.slides.items.entries()) {
    const png = await deck.export({ slide, format: "png", scale: 1 });
    await fs.writeFile(path.join(work, `${stem}-${i + 1}.png`), new Uint8Array(await png.arrayBuffer()));
  }
  execFileSync(path.join(runtime, "python/bin/python3"), [path.join(root, "scripts/profile-pdf.py"), work, output, stem, String(deck.slides.items.length)]);
  console.log(`Exported ${stem}: ${deck.slides.items.length} pages`);
}
await profile();
await profile(true);
