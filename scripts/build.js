import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const siteUrl = "https://www.railwheel.com";
const company = "Ma'anshan Railwheel Industrial Technology Co., Ltd.";
const contact = {
  name: "Amy Sun",
  phone: "+86 17755518921",
  email: "amy@railwheel.com",
  whatsapp: "8617755518921"
};

const nav = [
  ["Home", "/"],
  ["About Us", "/about/"],
  ["Products", "/products/"],
  ["Quality Control", "/quality-control/"],
  ["Manufacturing Capability", "/manufacturing-capability/"],
  ["Applications", "/applications/"],
  ["News / Blog", "/news/"],
  ["Contact Us", "/contact/"]
];

const products = [
  ["Railway Wheels", "railway-wheels", "railway wheel manufacturer", "Forged and rolled railway wheels for freight wagons, passenger coaches, locomotives and transit systems."],
  ["Wheelsets", "wheelsets", "railway wheelset supplier", "Complete wheelset assemblies with wheels, axles, bearings and axle boxes prepared for project requirements."],
  ["Bogies / Truck Assemblies", "bogies-truck-assemblies", "railway bogie parts", "Bogie frames, truck assemblies and related running gear components for railway rolling stock."],
  ["Side Frames", "side-frames", "railway side frame supplier", "Cast and fabricated side frames designed for dependable load transfer and long service life."],
  ["Bolsters", "bolsters", "railway bolster manufacturer", "Bolsters for freight bogies and rail vehicle suspension systems."],
  ["Axles", "axles", "train axle supplier", "Railway axles manufactured for high fatigue resistance, precise geometry and strict inspection."],
  ["Axle Boxes", "axle-boxes", "railway axle box supplier", "Axle boxes and housings for reliable wheelset bearing protection and guided rotation."],
  ["Bearings", "bearings", "railway bearing supplier", "Railway bearings selected for rolling stock reliability, load capacity and maintenance planning."],
  ["Bearing Housings", "bearing-housings", "railway bearing housing supplier", "Bearing housings for rail wheelsets, axle boxes and bogie systems."],
  ["Other Railway Components", "other-railway-components", "railway components China", "Custom railway components and spare parts sourced for freight, passenger and industrial rail projects."]
].map(([title, slug, keyword, description]) => ({ title, slug, keyword, description }));

const targetPages = [
  ["Railway Wheel Manufacturer", "railway-wheel-manufacturer", "railway wheel manufacturer"],
  ["Railway Wheel Supplier", "railway-wheel-supplier", "railway wheel supplier"],
  ["Train Wheel Manufacturer", "train-wheel-manufacturer", "train wheel manufacturer"],
  ["Railway Wheelset Supplier", "railway-wheelset-supplier", "railway wheelset supplier"],
  ["Railway Bogie Parts", "railway-bogie-parts", "railway bogie parts"],
  ["Railway Axle Box Supplier", "railway-axle-box-supplier", "railway axle box supplier"],
  ["Railway Components China", "railway-components-china", "railway components China"]
].map(([title, slug, keyword]) => ({ title, slug, keyword }));

const blogs = [
  ["How to Choose a Railway Wheel Manufacturer for Global Projects", "choose-railway-wheel-manufacturer", "railway wheel manufacturer", "Buyer criteria for evaluating wheel production, standards, inspection records and export support."],
  ["Railway Wheelsets: Key Components, Inspection Points and Procurement Tips", "railway-wheelsets-procurement-guide", "railway wheelset supplier", "A practical overview of wheelset assemblies, axles, bearings, axle boxes and quality documentation."],
  ["What Makes a Reliable Train Wheel for Freight and Passenger Rolling Stock", "reliable-train-wheel-freight-passenger", "train wheel manufacturer", "Material, heat treatment, machining tolerance and testing factors that influence rail wheel life."],
  ["Railway Bogie Parts Explained: Frames, Bolsters, Side Frames and Bearings", "railway-bogie-parts-explained", "railway bogie parts", "How core bogie parts work together to support stable, safe and maintainable rolling stock."],
  ["Axle Boxes in Railway Wheelsets: Function, Materials and Supplier Checks", "railway-axle-box-supplier-checks", "railway axle box supplier", "Axle box selection guidance for bearing protection, sealing, inspection and project compatibility."],
  ["Quality Control for Railway Wheels: From Raw Material to Final Inspection", "quality-control-railway-wheels", "railway wheel quality control", "Inspection stages that help control wheel geometry, hardness, ultrasonic integrity and traceability."],
  ["Railway Bearings and Bearing Housings: Why Fit and Protection Matter", "railway-bearings-bearing-housings", "railway bearing housing supplier", "Guidance on bearing seating, housing machining, lubrication paths and maintenance planning."],
  ["Buying Railway Components from China: Documentation Buyers Should Request", "buying-railway-components-china", "railway components China", "Export procurement documents, drawings, material certificates and inspection reports to request."],
  ["Side Frames and Bolsters for Freight Bogies: Buyer Checklist", "side-frames-bolsters-buyer-checklist", "railway side frames bolsters", "A focused checklist for sourcing side frames and bolsters for wagon bogie maintenance or production."],
  ["Reducing Railway Component Procurement Risk with Technical Communication", "reduce-railway-component-procurement-risk", "railway component supplier", "How clear drawings, standards, test plans and packing requirements reduce sourcing risk."]
].map(([title, slug, keyword, summary]) => ({ title, slug, keyword, summary }));

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function logo() {
  return `<svg class="brand-mark" viewBox="0 0 64 64" role="img" aria-label="Railwheel logo">
    <defs><linearGradient id="rwg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#18a0d8"/><stop offset="1" stop-color="#0b2744"/></linearGradient></defs>
    <rect width="64" height="64" rx="10" fill="#071a2f"/>
    <circle cx="32" cy="32" r="20" fill="none" stroke="url(#rwg)" stroke-width="7"/>
    <circle cx="32" cy="32" r="6" fill="#ffffff"/>
    <path d="M8 47h48M12 53h40M16 41l32-18" stroke="#d9e8f5" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": siteUrl + item.url
    }))
  };
}

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": company,
    "url": siteUrl,
    "logo": `${siteUrl}/assets/logo.svg`,
    "email": contact.email,
    "telephone": contact.phone,
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "sales",
      "name": contact.name,
      "telephone": contact.phone,
      "email": contact.email,
      "availableLanguage": ["English", "Chinese"]
    }],
    "sameAs": [`https://wa.me/${contact.whatsapp}`]
  };
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "Railwheel" },
    "manufacturer": { "@type": "Organization", "name": company },
    "category": "Railway components",
    "url": `${siteUrl}/products/${product.slug}/`
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What railway components does Railwheel supply?",
        "acceptedAnswer": { "@type": "Answer", "text": "Railwheel supplies railway wheels, wheelsets, bogies, side frames, bolsters, axles, axle boxes, bearings, bearing housings and other rail components." }
      },
      {
        "@type": "Question",
        "name": "Can Railwheel support export projects?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The sales team supports English communication, drawings, technical confirmation, inspection documentation and international inquiry handling." }
      },
      {
        "@type": "Question",
        "name": "How can buyers request a quotation?",
        "acceptedAnswer": { "@type": "Answer", "text": "Buyers can contact Amy Sun by email, phone, WhatsApp or WeChat and share drawings, standards, quantity and destination requirements." }
      }
    ]
  };
}

function layout({ title, description, path: pagePath, body, active = "", schemas = [] }) {
  const canonical = `${siteUrl}${pagePath}`;
  const allSchemas = [orgSchema(), ...schemas];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Railwheel Industrial Technology">
  <meta property="og:image" content="${siteUrl}/assets/og-railwheel.svg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/styles.css" as="style">
  <link rel="stylesheet" href="/styles.css">
  ${allSchemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n  ")}
</head>
<body>
  <div class="topbar"><div class="container"><span>Railway wheels, wheelsets, bogies and railway components</span><span>${contact.name} | WhatsApp / WeChat: ${contact.phone} | ${contact.email}</span></div></div>
  <header class="header">
    <div class="container nav">
      <a class="brand" href="/" aria-label="Railwheel home">${logo()}<span><strong>Railwheel</strong><span>Industrial Technology</span></span></a>
      <nav class="menu" aria-label="Main navigation">${nav.map(([label, href]) => `<a class="${active === label ? "active" : ""}" href="${href}">${label}</a>`).join("")}</nav>
      <div class="nav-actions"><a class="btn btn-outline" href="/contact/">Send Inquiry</a><a class="btn btn-primary" href="/contact/#quote">Request a Quote</a></div>
    </div>
  </header>
  <main>${body}</main>
  ${footer()}
  ${floatingContact()}
</body>
</html>`;
}

function footer() {
  return `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div><div class="brand">${logo()}<span><strong>Railwheel</strong><span>Industrial Technology</span></span></div><p>Premium B2B supplier for railway wheels, wheelsets, bogies, axles, axle boxes, bearings and related railway components.</p></div>
      <div><strong>Products</strong>${products.slice(0,5).map((p) => `<a href="/products/${p.slug}/">${p.title}</a>`).join("")}</div>
      <div><strong>Company</strong>${nav.slice(1,7).map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>
      <div><strong>Contact</strong><a href="tel:+8617755518921">${contact.phone}</a><a href="mailto:${contact.email}">${contact.email}</a><a href="https://wa.me/${contact.whatsapp}">WhatsApp Amy Sun</a></div>
    </div>
    <div class="copyright">Copyright ${new Date().getFullYear()} ${company}. All rights reserved.</div>
  </div>
</footer>`;
}

function floatingContact() {
  return `<div class="floating-contact" aria-label="Floating contact widgets">
  <div class="float-item"><a class="float-btn float-whatsapp" href="https://wa.me/${contact.whatsapp}" aria-label="Contact Amy Sun on WhatsApp">WA</a><div class="float-card"><img src="/assets/whatsapp-qr.png" alt="WhatsApp QR code for Amy Sun at Railwheel" loading="lazy"><strong>WhatsApp</strong><span>Scan or tap to contact Amy Sun.</span></div></div>
  <div class="float-item"><button class="float-btn float-wechat" aria-label="Show WeChat QR code">WC</button><div class="float-card"><img src="/assets/wechat-qr.png" alt="WeChat QR code for Amy Sun at Railwheel" loading="lazy"><strong>WeChat</strong><span>Scan to add Amy Sun.</span></div></div>
</div>`;
}

function pageHero(title, desc, crumb) {
  return `<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / ${esc(crumb || title)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div></section>`;
}

function productCards(items = products) {
  return `<div class="grid grid-3">${items.map((p) => `<article class="card"><div class="icon">RW</div><h3>${p.title}</h3><p>${p.description}</p><a class="card-link" href="/products/${p.slug}/">View ${p.title}</a></article>`).join("")}</div>`;
}

function ctaBand() {
  return `<section class="dark-band"><div class="container section-head"><div><span class="eyebrow">Global inquiry support</span><h2>Send drawings, standards and quantity for a focused railway component quotation.</h2></div><div class="cta-row"><a class="btn btn-light" href="/contact/#quote">Request a Quote</a><a class="btn btn-outline" style="background:transparent;color:white;border-color:rgba(255,255,255,.35)" href="mailto:${contact.email}">Contact Supplier</a></div></div></section>`;
}

function inquiryForm() {
  return `<form class="form" id="quote" action="mailto:${contact.email}" method="post" enctype="text/plain">
  <h3>Send Inquiry</h3>
  <input name="name" placeholder="Your name" aria-label="Your name" required>
  <input name="company" placeholder="Company name" aria-label="Company name">
  <input name="email" type="email" placeholder="Email address" aria-label="Email address" required>
  <select name="product" aria-label="Product category">${products.map((p) => `<option>${p.title}</option>`).join("")}</select>
  <textarea name="message" placeholder="Tell us the component, drawing standard, quantity and destination." aria-label="Inquiry details"></textarea>
  <button class="btn btn-primary" type="submit">Send Inquiry</button>
</form>`;
}

const pages = [];
function addPage(filePath, html) { pages.push({ filePath, html }); }

addPage("index.html", layout({
  title: "Railway Wheel Manufacturer & Railway Components Supplier | Railwheel",
  description: `${company} supplies railway wheels, wheelsets, bogies, axles, axle boxes, bearings and railway components from China.`,
  path: "/",
  active: "Home",
  schemas: [faqSchema()],
  body: `<section class="hero"><div class="container hero-content"><span class="eyebrow">Ma'anshan Railwheel Industrial Technology Co., Ltd.</span><h1>Railway wheels, wheelsets and bogie components for demanding rail projects.</h1><p>Railwheel supports global buyers with railway wheels, wheelsets, bogies, side frames, bolsters, axles, axle boxes, bearings, bearing housings and related railway components.</p><div class="hero-actions"><a class="btn btn-primary" href="/contact/#quote">Request a Quote</a><a class="btn btn-light" href="/products/">View Products</a></div></div></section>
  <div class="trust-strip"><div class="container trust-grid"><div class="trust-item"><strong>10+</strong><span>Major product categories</span></div><div class="trust-item"><strong>B2B</strong><span>Industrial procurement focus</span></div><div class="trust-item"><strong>QC</strong><span>Material and dimensional inspection</span></div><div class="trust-item"><strong>Export</strong><span>English sales support</span></div></div></div>
  <section><div class="container"><div class="section-head"><div><span class="eyebrow">Product scope</span><h2>Core railway components for rolling stock manufacturing and maintenance.</h2></div><p>Source compatible components with technical communication, documentation support and responsive inquiry handling.</p></div>${productCards()}</div></section>
  <section class="band"><div class="container grid grid-2"><div><span class="eyebrow">Manufacturing capability</span><h2>Built for precision, traceability and stable supply.</h2><p class="muted">Railwheel focuses on railway component procurement where drawings, standards, heat treatment, machining tolerances and inspection records matter.</p><ul class="spec-list"><li>Forging, casting, machining and assembly coordination</li><li>Dimensional inspection and material documentation</li><li>Packaging and export communication for overseas buyers</li></ul></div><div class="visual-panel" role="img" aria-label="Industrial railway wheel manufacturing visual"></div></div></section>
  ${ctaBand()}`
}));

addPage("about/index.html", layout({
  title: `About Railwheel | ${company}`,
  description: "Learn about Railwheel, a professional railway wheels, wheelsets, bogies and railway components supplier serving global B2B buyers.",
  path: "/about/",
  active: "About Us",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About Us", url: "/about/" }])],
  body: `${pageHero("About Ma'anshan Railwheel Industrial Technology Co., Ltd.", "A focused railway component supplier supporting professional procurement for wheels, wheelsets, bogies and related rail parts.", "About Us")}
  <section><div class="container grid grid-2"><div><h2>Professional rail component supply</h2><p class="muted">Railwheel serves industrial buyers who need dependable railway wheels, wheelsets, bogie parts and running gear components with clear communication and practical documentation.</p><p class="muted">The company works with project drawings, technical standards, inspection expectations and export requirements so buyers can move from inquiry to quotation with fewer delays.</p></div><div class="card"><h3>Brand identity</h3><p>The Railwheel identity combines a railway wheel, rail track and steel-blue industrial palette to communicate motion, precision and heavy-duty engineering.</p><ul class="spec-list"><li>Blue: trust, engineering and international trade</li><li>White: clarity and documentation</li><li>Steel: manufacturing strength and durability</li></ul></div></div></section>${ctaBand()}`
}));

addPage("products/index.html", layout({
  title: "Railway Wheels, Wheelsets, Bogies & Components | Railwheel Products",
  description: "Browse railway wheels, wheelsets, bogies, side frames, bolsters, axles, axle boxes, bearings and bearing housings from Railwheel.",
  path: "/products/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }])],
  body: `${pageHero("Railway Components Product Categories", "Railwheel supplies complete categories for rolling stock manufacturing, maintenance and rail component procurement.", "Products")}<section><div class="container">${productCards()}</div></section>${ctaBand()}`
}));

for (const product of products) {
  addPage(`products/${product.slug}/index.html`, layout({
    title: `${product.title} | ${product.keyword} | Railwheel`,
    description: `${product.description} Contact Railwheel for ${product.keyword} inquiries, drawings and export quotations.`,
    path: `/products/${product.slug}/`,
    active: "Products",
    schemas: [productSchema(product), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }, { name: product.title, url: `/products/${product.slug}/` }]), faqSchema()],
    body: `${pageHero(product.title, product.description, product.title)}
    <section><div class="container grid grid-2"><article class="article"><span class="eyebrow">${product.keyword}</span><h2>Supply focus</h2><p>${product.description} Railwheel supports buyers with technical confirmation, drawings review, material and inspection documentation, packaging discussion and international inquiry follow-up.</p><h2>Typical inquiry information</h2><ul><li>Drawing number, applicable standard and material grade</li><li>Quantity, destination port and delivery schedule</li><li>Inspection, certificate and packing requirements</li><li>Application: freight wagon, passenger coach, locomotive, metro or industrial rail</li></ul><h2>Why contact Railwheel</h2><p>Buyers receive focused communication from Amy Sun and a supplier team familiar with railway component sourcing, quality control and export documentation.</p></article>${inquiryForm()}</div></section>${ctaBand()}`
  }));
}

for (const target of targetPages) {
  addPage(`${target.slug}/index.html`, layout({
    title: `${target.title} | Railwheel Railway Components China`,
    description: `Railwheel is a professional ${target.keyword} for railway wheels, wheelsets, bogie parts, axle boxes and related components. Contact Amy Sun for quotations.`,
    path: `/${target.slug}/`,
    active: "Products",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: target.title, url: `/${target.slug}/` }]), faqSchema()],
    body: `${pageHero(target.title, `SEO-focused supply page for buyers searching for ${target.keyword}.`, target.title)}
    <section><div class="container grid grid-2"><article class="article"><h2>${target.title} for B2B rail procurement</h2><p>Railwheel helps global buyers source railway components from China with clear technical communication, practical export support and attention to documentation. The product scope includes railway wheels, wheelsets, bogies, side frames, bolsters, axles, axle boxes, bearings and bearing housings.</p><p>For accurate quotation, send drawings, standards, material requirements, target quantity, destination and inspection expectations. Amy Sun will coordinate the inquiry and provide supplier communication in English.</p><ul><li>Technical confirmation based on drawings and standards</li><li>Quotation support for freight, passenger, locomotive and industrial rail applications</li><li>Quality documentation and packaging discussion for export orders</li></ul></article>${inquiryForm()}</div></section>${ctaBand()}`
  }));
}

addPage("quality-control/index.html", layout({
  title: "Railway Component Quality Control | Railwheel",
  description: "Railwheel quality control covers material review, machining tolerance, dimensional inspection, NDT coordination and documentation for railway components.",
  path: "/quality-control/",
  active: "Quality Control",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Quality Control", url: "/quality-control/" }]), faqSchema()],
  body: `${pageHero("Quality Control", "Inspection-focused railway component supply for buyers who need confidence in materials, dimensions and documentation.", "Quality Control")}<section><div class="container grid grid-4">${["Material Traceability","Heat Treatment Review","Dimensional Inspection","Final Documentation"].map((x) => `<div class="card"><div class="icon">QC</div><h3>${x}</h3><p>Railwheel coordinates practical quality checks and records according to buyer requirements and component type.</p></div>`).join("")}</div></section>${ctaBand()}`
}));

addPage("manufacturing-capability/index.html", layout({
  title: "Railway Manufacturing Capability | Wheels, Axles, Bogie Parts",
  description: "Railwheel coordinates railway component manufacturing capability including forging, casting, machining, assembly and inspection support.",
  path: "/manufacturing-capability/",
  active: "Manufacturing Capability",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Manufacturing Capability", url: "/manufacturing-capability/" }])],
  body: `${pageHero("Manufacturing Capability", "Capability support for forged, cast, machined and assembled railway components.", "Manufacturing Capability")}<section><div class="container grid grid-2"><div class="visual-panel" role="img" aria-label="Railway manufacturing capability illustration"></div><div><h2>From component drawings to export-ready supply</h2><p class="muted">Railwheel coordinates manufacturing and sourcing channels for railway wheels, axles, side frames, bolsters, axle boxes, bearing housings and assembled wheelsets.</p><ul class="spec-list"><li>Forging and heat treatment coordination</li><li>Casting and machining for bogie parts</li><li>Assembly support for wheelsets and truck assemblies</li><li>Packing, labeling and shipment communication</li></ul></div></div></section>${ctaBand()}`
}));

addPage("applications/index.html", layout({
  title: "Railway Component Applications | Freight, Passenger, Metro, Industrial Rail",
  description: "Railwheel railway wheels, wheelsets, bogies and components support freight wagons, passenger coaches, locomotives, metro vehicles and industrial rail systems.",
  path: "/applications/",
  active: "Applications",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Applications", url: "/applications/" }])],
  body: `${pageHero("Applications", "Railway components for freight, passenger, locomotive, metro and industrial rail applications.", "Applications")}<section><div class="container grid grid-3">${["Freight Wagons","Passenger Coaches","Locomotives","Metro & Transit","Industrial Rail","Maintenance Projects"].map((x) => `<div class="card"><div class="icon">RA</div><h3>${x}</h3><p>Railwheel supplies wheels, wheelsets and related components according to project standards, drawings and operating requirements.</p></div>`).join("")}</div></section>${ctaBand()}`
}));

addPage("news/index.html", layout({
  title: "Railway Wheels & Components Blog | Railwheel News",
  description: "Read Railwheel articles about railway wheels, wheelsets, bogies, axle boxes, bearings, quality control and component procurement from China.",
  path: "/news/",
  active: "News / Blog",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "News / Blog", url: "/news/" }])],
  body: `${pageHero("News / Blog", "SEO articles and procurement guides for railway wheels and components.", "News / Blog")}<section><div class="container grid grid-2">${blogs.map((b) => `<article class="card"><span class="eyebrow">${b.keyword}</span><h3>${b.title}</h3><p>${b.summary}</p><a class="card-link" href="/news/${b.slug}/">Read article</a></article>`).join("")}</div></section>`
}));

for (const blog of blogs) {
  addPage(`news/${blog.slug}/index.html`, layout({
    title: `${blog.title} | Railwheel Blog`,
    description: blog.summary,
    path: `/news/${blog.slug}/`,
    active: "News / Blog",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "News / Blog", url: "/news/" }, { name: blog.title, url: `/news/${blog.slug}/` }])],
    body: `${pageHero(blog.title, blog.summary, blog.title)}<section><div class="container article"><p><strong>Keyword focus:</strong> ${blog.keyword}</p><p>Railway component procurement depends on more than a unit price. Buyers should confirm drawings, applicable standards, material grades, heat treatment, machining tolerance, inspection records, packing requirements and delivery expectations before final supplier selection.</p><h2>Technical confirmation comes first</h2><p>For wheels, wheelsets, axles, bogies, side frames, bolsters, axle boxes, bearings and bearing housings, the most useful inquiry starts with drawings or sample references. Standards and operating conditions help the supplier confirm whether the component should be quoted as an existing item, modified design or custom production.</p><h2>Quality records reduce sourcing risk</h2><p>Material certificates, dimensional reports, hardness records, ultrasonic or magnetic particle inspection and final packing photos can help buyers align internal approval steps. The exact record package should match the component risk level and the buyer's project requirements.</p><h2>Communication checklist</h2><ul><li>Share product name, drawing, standard and target quantity.</li><li>Confirm application, operating environment and replacement schedule.</li><li>Request inspection documentation before shipment when required.</li><li>Clarify packing, labeling, destination and preferred shipment timing.</li></ul><p>Contact Amy Sun at Railwheel for a focused quotation on railway wheels, wheelsets, bogie parts and related railway components.</p><div class="cta-row"><a class="btn btn-primary" href="/contact/#quote">Request a Quote</a><a class="btn btn-outline" href="/products/">View Products</a></div></div></section>`
  }));
}

addPage("contact/index.html", layout({
  title: "Contact Railwheel | Request Railway Wheel & Component Quote",
  description: "Contact Amy Sun at Railwheel by email, phone, WhatsApp or WeChat to request a quotation for railway wheels, wheelsets, bogies and components.",
  path: "/contact/",
  active: "Contact Us",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact Us", url: "/contact/" }]), faqSchema()],
  body: `${pageHero("Contact Railwheel", "Send an inquiry for railway wheels, wheelsets, bogies, axle boxes, bearings and related railway components.", "Contact Us")}<section><div class="container grid grid-2"><div><h2>Contact Supplier</h2><div class="contact-method"><div class="icon">A</div><div><strong>${contact.name}</strong><p class="muted">Sales contact for global railway component inquiries.</p></div></div><div class="contact-method"><div class="icon">T</div><div><strong>Tel / WhatsApp / WeChat</strong><p><a href="tel:+8617755518921">${contact.phone}</a></p></div></div><div class="contact-method"><div class="icon">E</div><div><strong>Email</strong><p><a href="mailto:${contact.email}">${contact.email}</a></p></div></div><div class="qr-grid"><div class="qr-card"><img src="/assets/whatsapp-qr.png" alt="WhatsApp QR code for Amy Sun railway component sales contact" loading="lazy"><strong>WhatsApp QR</strong></div><div class="qr-card"><img src="/assets/wechat-qr.png" alt="WeChat QR code for Amy Sun railway component sales contact" loading="lazy"><strong>WeChat QR</strong></div></div></div>${inquiryForm()}</div></section>`
}));

async function writeAssets() {
  await mkdir("dist/assets", { recursive: true });
  await copyFile("src/styles.css", "dist/styles.css");
  for (const file of ["whatsapp-qr.png", "wechat-qr.png"]) {
    if (existsSync(path.join("assets", file))) await copyFile(path.join("assets", file), path.join("dist/assets", file));
  }
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#071a2f"/><circle cx="32" cy="32" r="20" fill="none" stroke="#18a0d8" stroke-width="7"/><circle cx="32" cy="32" r="6" fill="#fff"/><path d="M8 47h48M12 53h40M16 41l32-18" stroke="#d9e8f5" stroke-width="3" stroke-linecap="round"/></svg>`;
  await writeFile("dist/assets/favicon.svg", favicon);
  await writeFile("dist/assets/logo.svg", favicon);
  await writeFile("dist/assets/og-railwheel.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#071a2f"/><circle cx="880" cy="315" r="160" fill="none" stroke="#18a0d8" stroke-width="48"/><circle cx="880" cy="315" r="48" fill="#fff"/><path d="M120 480h960M160 540h880M220 430L980 210" stroke="#d9e8f5" stroke-width="22" stroke-linecap="round"/><text x="100" y="180" fill="#fff" font-family="Arial" font-size="72" font-weight="700">Railwheel</text><text x="104" y="250" fill="#d9e8f5" font-family="Arial" font-size="34">Railway wheels, wheelsets and components</text></svg>`);
}

async function main() {
  await rm("dist", { recursive: true, force: true });
  await writeAssets();
  for (const page of pages) {
    const output = path.join("dist", page.filePath);
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, page.html);
  }
  const urls = pages.map((page) => {
    const loc = page.filePath === "index.html" ? `${siteUrl}/` : `${siteUrl}/${page.filePath.replace(/index\.html$/, "")}`;
    return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${page.filePath === "index.html" ? "1.0" : "0.8"}</priority></url>`;
  }).join("\n");
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Built ${pages.length} pages into dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
