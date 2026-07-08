import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const siteUrl = "https://www.railwheel.com";
const company = "Ma'anshan Railwheel Industrial Technology Co., Ltd.";
const contact = {
  name: "Amy Sun",
  phone: "+86 17755518921",
  email: "amy@railwheel.com",
  whatsapp: "8617755518921",
  address: "Ma'anshan City, Anhui Province, China"
};

const primaryKeywords = [
  "Railway Wheels",
  "Railway Wheel",
  "Railway Wheel Manufacturer",
  "Railway Wheel Supplier",
  "Railway Wheel Exporter",
  "Railway Wheelset",
  "Railway Wheelsets",
  "Railway Bogie",
  "Railway Side Frame",
  "Railway Bolster",
  "Railway Axle",
  "Railway Axle Box",
  "Railway Components",
  "Railroad Axle",
  "Freight Bogie",
  "Passenger Bogie",
  "Side Frame",
  "Bolster",
  "Axle Box",
  "Railway Forging",
  "Railway Casting",
  "Railway Spare Parts",
  "Train Wheel",
  "Train Wheels",
  "Railroad Wheel",
  "Railroad Wheels",
  "Rail Car Wheels",
  "Freight Wagon Wheels",
  "Locomotive Wheel",
  "Passenger Train Wheel",
  "Forged Railway Wheel",
  "UIC Railway Wheel",
  "AAR Railway Wheel",
  "EN Railway Wheel",
  "Railway Wheel Supplier China"
];

const nav = [
  ["Home", "/"],
  ["About Us", "/about/"],
  ["Products", "/products/"],
  ["Quality", "/quality-control/"],
  ["Capabilities", "/manufacturing-capability/"],
  ["News", "/news/"],
  ["Contact Us", "/contact/"]
];

const products = [
  {
    title: "Railway Wheel",
    slug: "railway-wheels",
    keyword: "railway wheel manufacturer",
    image: "railway-wheel.webp",
    aliases: "train wheel, train wheels, railroad wheel, railroad wheels, rail car wheels, freight wagon wheels, locomotive wheel, passenger train wheel",
    metaTitle: "Railway Wheel Manufacturer China | Train Wheel & Railroad Wheel Supplier",
    description: "Forged railway wheel and steel railway wheel supply for freight wagons, passenger coaches, metro vehicles, locomotives, mining railways and industrial railways.",
    metaDescription: "Source forged railway wheel, train wheel, railroad wheel, rail car wheels and freight wagon wheels from Railwheel China with OEM, UIC, AAR and EN support."
  },
  {
    title: "Railway Wheelset",
    slug: "wheelsets",
    keyword: "railway wheelset supplier",
    image: "railway-wheelset.webp",
    aliases: "wheelset, train wheelset, train wheelsets, railroad wheelset, railroad wheelsets, wheelset assemblies",
    metaTitle: "Railway Wheelset Supplier | Train Wheelset & Railroad Wheelset",
    description: "Complete railway wheelset assemblies with railway wheels, axles, bearings and axle boxes for OEM projects, maintenance programs and export supply.",
    metaDescription: "Buy railway wheelset, train wheelset and railroad wheelset assemblies from Railwheel, including wheels, railway axles, bearings and axle boxes."
  },
  {
    title: "Railway Bogie",
    slug: "bogies-truck-assemblies",
    keyword: "railway bogie parts",
    image: "railway-bogie.webp",
    aliases: "railway bogie, train bogie, railroad bogie, freight bogie, passenger bogie, truck assemblies",
    metaTitle: "Railway Bogie Parts | Freight Bogie & Passenger Bogie Supplier",
    description: "Railway bogie and truck assembly supply for rolling stock manufacturers, operators and spare parts buyers requiring stable running gear performance.",
    metaDescription: "Railwheel supplies railway bogie parts, freight bogie, passenger bogie, train bogie and railroad bogie components for global rolling stock projects."
  },
  {
    title: "Railway Side Frame",
    slug: "side-frames",
    keyword: "railway side frame supplier",
    image: "railway-side-frame.webp",
    aliases: "side frame, railway side frame, bogie side frame, freight bogie side frame",
    metaTitle: "Railway Side Frame Supplier | Bogie Side Frame for Freight Wagons",
    description: "Railway side frame supply for bogies and freight wagon running gear, supported with drawing review, material confirmation and inspection documentation.",
    metaDescription: "Source railway side frame, bogie side frame and freight wagon side frame components from Railwheel with OEM drawing review and export documentation."
  },
  {
    title: "Railway Bolster",
    slug: "bolsters",
    keyword: "railway bolster manufacturer",
    image: "railway-bolster.webp",
    aliases: "bolster, railway bolster, bogie bolster, freight bogie bolster",
    metaTitle: "Railway Bolster Manufacturer | Bogie Bolster & Spare Parts",
    description: "Railway bolster supply for bogie suspension systems, freight wagons and railway spare parts programs requiring dependable load transfer.",
    metaDescription: "Railwheel supplies railway bolster, bogie bolster and freight wagon bolster components for OEM and railway spare parts procurement."
  },
  {
    title: "Railway Axle",
    slug: "axles",
    keyword: "railway axle supplier",
    image: "railway-axle.webp",
    aliases: "railway axle, train axle, railroad axle, wheelset axle, forged axle",
    metaTitle: "Railway Axle Supplier | Train Axle & Railroad Axle Manufacturer",
    description: "Railway axle supply for wheelset assemblies with dimensional accuracy, fatigue resistance and international inspection support.",
    metaDescription: "Railwheel supplies railway axle, train axle, railroad axle and wheelset axle products for rolling stock manufacturers and railway maintenance buyers."
  },
  {
    title: "Railway Axle Box",
    slug: "axle-boxes",
    keyword: "railway axle box supplier",
    image: "railway-axle-box.webp",
    aliases: "axle box, railway axle box, train axle box, railroad axle box, axle box housing",
    metaTitle: "Railway Axle Box Supplier | Train & Railroad Axle Box Housing",
    description: "Railway axle box and housing supply for bearing protection, wheelset guidance and long-service railway maintenance applications.",
    metaDescription: "Buy railway axle box, train axle box, railroad axle box and axle box housing components from Railwheel for wheelset and bogie systems."
  },
  {
    title: "Railway Bearing",
    slug: "bearings",
    keyword: "railway bearing supplier",
    image: "railway-components.webp",
    aliases: "railway rolling stock bearings, wheelset bearings",
    metaTitle: "Railway Bearing Supplier | Wheelset Bearing for Axle Boxes",
    description: "Railway bearing supply for wheelsets, axle boxes and bogie systems where load capacity, reliability and maintenance planning matter.",
    metaDescription: "Railway bearing and wheelset bearing sourcing support for axle boxes, bogies and rolling stock maintenance programs."
  },
  {
    title: "Railway Bearing Housing",
    slug: "bearing-housings",
    keyword: "railway bearing housing supplier",
    image: "railway-components.webp",
    aliases: "railway bearing housing, bearing seats",
    metaTitle: "Railway Bearing Housing Supplier | Axle Box Bearing Seats",
    description: "Railway bearing housing and related machined part supply for axle box systems, wheelsets and bogie applications.",
    metaDescription: "Railwheel supplies railway bearing housing, bearing seats and machined railway components for axle box and wheelset applications."
  },
  {
    title: "Railway Spare Parts",
    slug: "other-railway-components",
    keyword: "railway components China",
    image: "railway-components.webp",
    aliases: "railway spare parts, railway parts, railway components, railway forging, railway casting, train parts, railroad components",
    metaTitle: "Railway Spare Parts Manufacturer | Railway Forging & Casting China",
    description: "Railway spare parts, railway forging, railway casting and railway components for OEM, custom manufacturing and replacement programs.",
    metaDescription: "Railwheel supplies railway spare parts, railway forging, railway casting and custom railway components for global operators and manufacturers."
  }
];

const targetPages = [
  ["Railway Wheel Manufacturer", "railway-wheel-manufacturer", "railway wheel manufacturer"],
  ["Railway Wheel Supplier", "railway-wheel-supplier", "railway wheel supplier"],
  ["Railway Wheel Exporter", "railway-wheel-exporter", "railway wheel exporter"],
  ["Railway Wheel Supplier China", "railway-wheel-supplier-china", "railway wheel supplier China"],
  ["Railway Wheel Manufacturer in China", "railway-wheel-manufacturer-in-china", "railway wheel manufacturer in China"],
  ["Chinese Railway Wheel Factory", "chinese-railway-wheel-factory", "Chinese railway wheel factory"],
  ["Train Wheel Manufacturer", "train-wheel-manufacturer", "train wheel manufacturer"],
  ["Train Wheel Supplier", "train-wheel-supplier", "train wheel supplier"],
  ["Train Wheel Factory", "train-wheel-factory", "train wheel factory"],
  ["Railroad Wheel Manufacturer", "railroad-wheel-manufacturer", "railroad wheel manufacturer"],
  ["Railroad Wheel Supplier", "railroad-wheel-supplier", "railroad wheel supplier"],
  ["Railway Wheelset Supplier", "railway-wheelset-supplier", "railway wheelset supplier"],
  ["Railway Wheelset Manufacturer", "railway-wheelset-manufacturer", "railway wheelset manufacturer"],
  ["Railway Bogie Parts", "railway-bogie-parts", "railway bogie parts"],
  ["Railway Axle Box Supplier", "railway-axle-box-supplier", "railway axle box supplier"],
  ["Railway Components China", "railway-components-china", "railway components China"],
  ["Railway Spare Parts Manufacturer", "railway-spare-parts-manufacturer", "railway spare parts manufacturer"],
  ["Railroad Axle Supplier", "railroad-axle-supplier", "railroad axle supplier"],
  ["Freight Bogie Supplier", "freight-bogie-supplier", "freight bogie supplier"],
  ["Passenger Bogie Supplier", "passenger-bogie-supplier", "passenger bogie supplier"],
  ["Side Frame Supplier", "side-frame-supplier", "side frame supplier"],
  ["Bolster Supplier", "bolster-supplier", "bolster supplier"],
  ["Axle Box Supplier", "axle-box-supplier", "axle box supplier"],
  ["Railway Forging Supplier", "railway-forging-supplier", "railway forging supplier"],
  ["Railway Casting Supplier", "railway-casting-supplier", "railway casting supplier"],
  ["OEM Railway Wheel", "oem-railway-wheel", "OEM railway wheel"],
  ["Custom Railway Wheel", "custom-railway-wheel", "custom railway wheel"],
  ["Heavy Duty Railway Wheel", "heavy-duty-railway-wheel", "heavy duty railway wheel"]
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
  return `<img class="brand-logo" src="/assets/railwheel-logo-new.png" alt="Railwheel railway wheel and railway components logo" width="372" height="116" decoding="async">`;
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
    "logo": `${siteUrl}/assets/railwheel-logo-new.png`,
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
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ma'anshan City",
      "addressRegion": "Anhui Province",
      "addressCountry": "CN"
    },
    "sameAs": [`https://wa.me/${contact.whatsapp}`]
  };
}

function manufacturerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "additionalType": "https://schema.org/Manufacturer",
    "name": company,
    "url": siteUrl,
    "logo": `${siteUrl}/assets/railwheel-logo-new.png`,
    "email": contact.email,
    "telephone": contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ma'anshan City",
      "addressRegion": "Anhui Province",
      "addressCountry": "CN"
    },
    "makesOffer": products.map((product) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": product.title,
        "url": `${siteUrl}/products/${product.slug}/`
      }
    }))
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company,
    "image": `${siteUrl}/assets/railwheel-logo-new.png`,
    "url": siteUrl,
    "email": contact.email,
    "telephone": contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ma'anshan City",
      "addressLocality": "Ma'anshan City",
      "addressRegion": "Anhui Province",
      "addressCountry": "CN"
    },
    "areaServed": "Worldwide"
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Railwheel Industrial Technology",
    "url": siteUrl,
    "publisher": { "@type": "Organization", "name": company },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "alternateName": product.aliases.split(",").map((item) => item.trim()),
    "description": product.metaDescription || product.description,
    "image": `${siteUrl}/assets/home-products/${product.image}`,
    "brand": { "@type": "Brand", "name": "Railwheel" },
    "manufacturer": { "@type": "Organization", "name": company },
    "category": "Railway components",
    "url": `${siteUrl}/products/${product.slug}/`,
    "material": "Forged steel, cast steel or project-specified railway materials",
    "areaServed": "Worldwide",
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product.slug}/`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "seller": { "@type": "Organization", "name": company }
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Primary keyword", "value": product.keyword },
      { "@type": "PropertyValue", "name": "Applications", "value": "Freight wagons, passenger coaches, metro, locomotives, mining railways and industrial railways" },
      { "@type": "PropertyValue", "name": "Supply model", "value": "OEM, custom manufacturing and export supply" }
    ]
  };
}

function itemListSchema(items, name, pagePath) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "url": `${siteUrl}${pagePath}`,
    "itemListElement": items.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "url": `${siteUrl}/products/${product.slug}/`,
        "image": `${siteUrl}/assets/home-products/${product.image}`,
        "description": product.description
      }
    }))
  };
}

function articleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.summary,
    "image": `${siteUrl}/assets/railway-wheel-manufacturing.webp`,
    "author": { "@type": "Organization", "name": company },
    "publisher": { "@type": "Organization", "name": company, "logo": { "@type": "ImageObject", "url": `${siteUrl}/assets/railwheel-logo-new.png` } },
    "mainEntityOfPage": `${siteUrl}/news/${blog.slug}/`
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

function faqSection(topic = "railway wheels and components") {
  return `<section class="faq-section"><div class="container"><div class="section-head"><div><span class="eyebrow">Buyer FAQ</span><h2>Frequently asked questions about ${esc(topic)}.</h2></div><p>These answers help overseas procurement teams prepare a clear inquiry and shorten the quotation process.</p></div><div class="grid grid-3"><article class="card"><h3>What products can Railwheel supply?</h3><p>Railwheel supplies railway wheel, train wheel, railroad wheel, wheelset, railway axle, railroad axle, railway bogie, freight bogie, passenger bogie, side frame, bolster, axle box, railway forging, railway casting and railway spare parts.</p></article><article class="card"><h3>Can products be customized?</h3><p>Yes. Buyers can send drawings, samples, standards, material grades and operating requirements for OEM railway wheel, custom railway axle, bogie parts and railway spare parts quotations.</p></article><article class="card"><h3>What information is needed for a quote?</h3><p>Please share product name, drawing or standard, quantity, destination, application, inspection requirements and expected delivery timing.</p></article></div></div></section>`;
}

function internalLinkHub() {
  return `<section class="link-hub"><div class="container"><span class="eyebrow">Railway product links</span><h2>Explore related railway wheel and component solutions.</h2><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/train-wheel-manufacturer/">Train Wheel Manufacturer</a><a href="/railroad-wheel-manufacturer/">Railroad Wheel Manufacturer</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/axles/">Railway Axle</a><a href="/railroad-axle-supplier/">Railroad Axle</a><a href="/products/bogies-truck-assemblies/">Railway Bogie</a><a href="/freight-bogie-supplier/">Freight Bogie</a><a href="/passenger-bogie-supplier/">Passenger Bogie</a><a href="/products/side-frames/">Side Frame</a><a href="/products/bolsters/">Bolster</a><a href="/products/axle-boxes/">Axle Box</a><a href="/railway-forging-supplier/">Railway Forging</a><a href="/railway-casting-supplier/">Railway Casting</a><a href="/products/other-railway-components/">Railway Spare Parts</a></div></div></section>`;
}

function layout({ title, description, path: pagePath, body, active = "", schemas = [], preloadHero = false }) {
  const canonical = `${siteUrl}${pagePath}`;
  const allSchemas = [orgSchema(), manufacturerSchema(), localBusinessSchema(), websiteSchema(), ...schemas];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(primaryKeywords.join(", "))}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Railwheel Industrial Technology">
  <meta property="og:image" content="${siteUrl}/assets/home-hero-railway-wheel-manufacturing.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${siteUrl}/assets/home-hero-railway-wheel-manufacturing.jpg">
  <link rel="icon" href="/assets/railwheel-logo-new.png" type="image/png">
  ${preloadHero ? `<link rel="preload" href="/assets/railway-wheel-manufacturing.webp" as="image" type="image/webp" fetchpriority="high">` : ""}
  <link rel="preload" href="/styles.css" as="style">
  <link rel="stylesheet" href="/styles.css">
  ${allSchemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n  ")}
</head>
<body>
  <div class="topbar"><div class="container"><span>Railway wheels, wheelsets, bogies and railway components</span><span>WhatsApp: ${contact.phone} &nbsp;|&nbsp; WeChat: ${contact.phone} &nbsp;|&nbsp; Email: ${contact.email}</span></div></div>
  <header class="header">
    <div class="container nav">
      <a class="brand" href="/" aria-label="Railwheel home">${logo()}<span><strong>Railwheel</strong><span>${company}</span></span></a>
      <nav class="menu" aria-label="Main navigation">${nav.map(([label, href]) => `<a class="${active === label ? "active" : ""}" href="${href}">${label}</a>`).join("")}</nav>
      <div class="nav-actions"><a class="btn btn-primary" href="/contact/#quote">Send Inquiry</a></div>
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
  <div class="float-item"><a class="float-btn float-whatsapp" href="https://wa.me/${contact.whatsapp}" aria-label="Contact Amy Sun on WhatsApp">WA</a><div class="float-card"><img src="/assets/whatsapp-qr.png" alt="WhatsApp QR code for Amy Sun at Railwheel railway wheel supplier" loading="lazy" decoding="async" width="282" height="280"><strong>WhatsApp</strong><span>Scan or tap to contact Amy Sun.</span></div></div>
  <div class="float-item"><button class="float-btn float-wechat" aria-label="Show WeChat QR code">WC</button><div class="float-card"><img src="/assets/wechat-qr.png" alt="WeChat QR code for Amy Sun at Railwheel railway components supplier" loading="lazy" decoding="async" width="730" height="744"><strong>WeChat</strong><span>Scan to add Amy Sun.</span></div></div>
</div>`;
}

function pageHero(title, desc, crumb) {
  return `<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / ${esc(crumb || title)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div></section>`;
}

function productCards(items = products) {
  return `<div class="grid grid-3">${items.map((p) => `<article class="card product-list-card"><img src="/assets/home-products/${p.image}" alt="${p.title} supplier for ${p.aliases}" title="${p.title}" loading="lazy" decoding="async" width="423" height="464"><h3>${p.title}</h3><p>${p.description}</p><a class="card-link" href="/products/${p.slug}/">View ${p.title}</a></article>`).join("")}</div>`;
}

const homeProducts = [
  ["Railway Wheel", "railway-wheels", "railway-wheel.webp"],
  ["Railway Wheelset", "wheelsets", "railway-wheelset.webp"],
  ["Railway Bogie", "bogies-truck-assemblies", "railway-bogie.webp"],
  ["Railway Side Frame", "side-frames", "railway-side-frame.webp"],
  ["Railway Bolster", "bolsters", "railway-bolster.webp"],
  ["Railway Axle", "axles", "railway-axle.webp"],
  ["Railway Axle Box", "axle-boxes", "railway-axle-box.webp"],
  ["Railway Spare Parts", "other-railway-components", "railway-components.webp"]
].map(([title, slug, image]) => ({ title, slug, image }));

function homeProductCards() {
  return `<div class="home-product-track">${homeProducts.map((p) => `<a class="home-product-card" href="/products/${p.slug}/"><span class="home-product-image"><img src="/assets/home-products/${p.image}" alt="${p.title} product image for train wheel railroad wheel and railway component procurement" title="${p.title}" loading="lazy" decoding="async" width="423" height="464"></span><strong>${p.title}</strong></a>`).join("")}</div>`;
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

function relatedProducts(currentSlug) {
  const related = products.filter((product) => product.slug !== currentSlug).slice(0, 6);
  return `<div class="related-products"><h3>Related Railway Components</h3><div class="seo-link-row">${related.map((product) => `<a href="/products/${product.slug}/">${product.title}</a>`).join("")}<a href="/quality-control/">Quality Control</a><a href="/manufacturing-capability/">Manufacturing Capabilities</a><a href="/contact/">Contact Supplier</a></div></div>`;
}

function targetPageContent(target) {
  const lower = target.keyword.toLowerCase();
  const isWheel = lower.includes("wheel") && !lower.includes("wheelset");
  const isWheelset = lower.includes("wheelset");
  const isBogie = lower.includes("bogie");
  const isAxle = lower.includes("axle");
  const isCasting = lower.includes("casting");
  const isForging = lower.includes("forging");
  const focusProduct = isWheelset ? products[1] : isBogie ? products[2] : isAxle ? products[5] : isCasting || isForging ? products[9] : isWheel ? products[0] : products[9];
  const focusLinks = isWheel
    ? `<a href="/products/railway-wheels/">Railway Wheel</a><a href="/train-wheel-manufacturer/">Train Wheel Manufacturer</a><a href="/railroad-wheel-manufacturer/">Railroad Wheel Manufacturer</a><a href="/products/wheelsets/">Railway Wheelset</a>`
    : isWheelset
      ? `<a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/railway-wheels/">Railway Wheel</a><a href="/products/axles/">Railway Axle</a><a href="/products/axle-boxes/">Railway Axle Box</a>`
      : isBogie
        ? `<a href="/products/bogies-truck-assemblies/">Railway Bogie</a><a href="/freight-bogie-supplier/">Freight Bogie</a><a href="/passenger-bogie-supplier/">Passenger Bogie</a><a href="/products/side-frames/">Side Frame</a><a href="/products/bolsters/">Bolster</a>`
        : isAxle
          ? `<a href="/products/axles/">Railway Axle</a><a href="/railroad-axle-supplier/">Railroad Axle</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/axle-boxes/">Axle Box</a>`
          : `<a href="/products/other-railway-components/">Railway Spare Parts</a><a href="/railway-forging-supplier/">Railway Forging</a><a href="/railway-casting-supplier/">Railway Casting</a><a href="/products/bogies-truck-assemblies/">Railway Bogie Parts</a>`;
  return `${pageHero(target.title, `Supply information for buyers searching for ${target.keyword}, railway wheel, train wheel, railroad wheel and railway spare parts from China.`, target.title)}
    <section><div class="container grid grid-2"><article class="article"><h2>${target.title} for worldwide rail procurement</h2><p>${company} helps global buyers source ${target.keyword}, railway wheel, train wheel, railroad wheel, railway wheelset and railway components from China with clear English communication and export documentation.</p><p>The related supply scope includes ${focusProduct.aliases}, forged railway wheel, steel railway wheel, railway axle, railroad axle, railway bogie, side frame, bolster, axle box, railway forging, railway casting and railway spare parts.</p><h3>Procurement advantages</h3><ul><li>Technical confirmation based on drawings, samples, UIC, AAR, EN or project standards</li><li>OEM and custom manufacturing support for rolling stock manufacturers and maintenance buyers</li><li>Quotation support for freight wagons, passenger coaches, metro, locomotives, mining railways and industrial railways</li><li>Inspection documentation, packing discussion and export communication for international orders</li></ul><h2>How to request a quote</h2><p>For accurate pricing, send drawings, material requirements, target quantity, destination, application and inspection expectations. Amy Sun will coordinate the inquiry and confirm whether the product should be quoted as a standard component, modified design or custom production.</p><div class="seo-link-row">${focusLinks}<a href="/quality-control/">Quality Control</a><a href="/contact/">Send Inquiry</a></div>${relatedProducts(focusProduct.slug)}</article>${inquiryForm()}</div></section>${faqSection(target.title)}${ctaBand()}`;
}

const pages = [];
function addPage(filePath, html) { pages.push({ filePath, html }); }

addPage("index.html", layout({
  title: "Railway Wheel Manufacturer China | Train Wheel, Railroad Wheel & Wheelset Supplier",
  description: "Ma'anshan Railwheel supplies railway wheel, train wheel, railroad wheel, wheelset, railway axle, bogie, side frame, bolster, axle box and spare parts worldwide.",
  path: "/",
  active: "Home",
  preloadHero: true,
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }]), itemListSchema(products, "Railwheel railway wheel and railway component products", "/"), faqSchema()],
  body: `<section class="home-hero"><div class="home-hero-bg"><img src="/assets/railway-wheel-manufacturing.webp" alt="Railway wheel manufacturer workshop producing forged train wheel railroad wheel and wheelset components" title="Railway wheel manufacturing workshop" fetchpriority="high" decoding="async" width="1800" height="1013"></div><div class="container home-hero-content"><span class="eyebrow">Railway Wheel Manufacturer & Exporter China</span><h1>Your Trusted Partner in Railway Wheels & Components</h1><p>Railwheel supplies railway wheel, train wheel, railroad wheel, wheelset, railway axle, railroad axle, railway bogie, freight bogie, passenger bogie, side frame, bolster, axle box and railway spare parts worldwide for OEM and customized manufacturing projects.</p><div class="home-points"><span><b>QC</b>International Standards</span><span><b>OEM</b>Custom Manufacturing</span><span><b>EX</b>Global Export Supply</span><span><b>SP</b>Railway Spare Parts</span></div><div class="hero-actions"><a class="btn btn-primary" href="/products/">View Our Products</a><a class="btn btn-light" href="/contact/">Contact Us</a></div></div></section>
  <section class="home-products"><div class="container"><div class="section-head"><div><span class="eyebrow">Our Products</span><h2>Railway wheel, train wheelset, railroad bogie and railway spare parts for global buyers.</h2></div><p>As a railway wheel supplier in China, Railwheel supports forged railway wheel, steel railway wheel, UIC railway wheel, AAR railway wheel, EN railway wheel, railway forging and railway casting inquiries for freight wagons, passenger coaches, metro, locomotives, mining railways and industrial railways.</p></div>${homeProductCards()}<div class="seo-link-row"><a href="/railway-wheel-manufacturer/">Railway Wheel Manufacturer</a><a href="/train-wheel-manufacturer/">Train Wheel Manufacturer</a><a href="/railroad-wheel-manufacturer/">Railroad Wheel Manufacturer</a><a href="/railway-wheel-supplier-china/">Railway Wheel Supplier China</a><a href="/railroad-axle-supplier/">Railroad Axle Supplier</a><a href="/freight-bogie-supplier/">Freight Bogie Supplier</a></div></div></section>
  <section class="band home-why"><div class="container"><div class="section-head"><div><span class="eyebrow">Why Choose Railwheel</span><h2>Reliable railway component supply for international rolling stock projects.</h2></div><p>Railwheel helps overseas customers source railway wheelsets, railway bogies, railway axle boxes and custom railway wheel components with clear technical communication and export documentation.</p></div><div class="grid grid-4"><article class="card advantage-card"><div class="icon">QC</div><h3>Strict Quality Control</h3><p>Material review, dimensional checks, heat treatment records and inspection documents support UIC, AAR, EN and project-specific requirements.</p></article><article class="card advantage-card"><div class="icon">AE</div><h3>Advanced Equipment</h3><p>Manufacturing and machining resources support railway wheels, forged train wheels, railway axles, railway wheelsets and precision bogie parts.</p></article><article class="card advantage-card"><div class="icon">OEM</div><h3>OEM & Custom Solutions</h3><p>Send drawings, standards or samples for OEM railway wheel, custom railway wheel, heavy duty railway wheel and railway spare parts manufacturing.</p></article><article class="card advantage-card"><div class="icon">WW</div><h3>Worldwide Experience</h3><p>We supply railway components worldwide for freight wagons, passenger coaches, metro vehicles, locomotives, mining railways and industrial railways.</p></article></div><div class="seo-link-row"><a href="/about/">About Railwheel</a><a href="/quality-control/">Quality Control</a><a href="/manufacturing-capability/">Manufacturing Capabilities</a><a href="/contact/">Contact Supplier</a></div></div></section>
  <section class="home-contact"><div class="container home-contact-grid"><div><span class="eyebrow">Contact Us</span><h2>Send your railway component inquiry to Railwheel.</h2><div class="contact-panel"><p><strong>Amy Sun</strong> (Sales Manager)</p><p><strong>WhatsApp / WeChat:</strong> <a href="tel:+8617755518921">${contact.phone}</a></p><p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p><p><strong>Address:</strong> Ma'anshan City, Anhui Province, China</p></div><div class="cta-row"><a class="btn btn-primary" href="/contact/#quote">Send Inquiry</a><a class="btn btn-outline" href="https://wa.me/${contact.whatsapp}">WhatsApp</a></div></div><div class="home-qr-panel"><div class="qr-card"><img src="/assets/whatsapp-qr.png" alt="WhatsApp QR Code for Amy Sun Railwheel railway wheel supplier" loading="lazy" decoding="async" width="282" height="280"><strong>WhatsApp</strong></div><div class="qr-card"><img src="/assets/wechat-qr.png" alt="WeChat QR Code for Amy Sun Railwheel railway components supplier" loading="lazy" decoding="async" width="730" height="744"><strong>WeChat</strong></div></div></div></section>
  ${faqSection("railway wheel, train wheel and railroad wheel sourcing")}
  <div class="home-bottom-bar"><div class="container"><span>Reliable Quality</span><span>Competitive Price</span><span>On-time Delivery</span><span>Professional Support</span></div></div>`
}));

addPage("about/index.html", layout({
  title: `About Railwheel | Railway Wheel, Train Wheel & Railway Components Manufacturer`,
  description: "Learn about Ma'anshan Railwheel, a China railway wheel, train wheel, railroad wheel, wheelset, bogie, axle box and spare parts supplier for global buyers.",
  path: "/about/",
  active: "About Us",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About Us", url: "/about/" }]), faqSchema()],
  body: `${pageHero("About Ma'anshan Railwheel Industrial Technology Co., Ltd.", "A focused railway wheel manufacturer, exporter and railway components supplier serving global B2B procurement.", "About Us")}
  <section><div class="container grid grid-2"><div><h2>Professional rail component supply</h2><p class="muted">Railwheel serves industrial buyers who need dependable railway wheel, train wheel, railroad wheel, railway wheelset, railway bogie, freight bogie, passenger bogie, railway axle, railroad axle and railway spare parts with clear communication and practical documentation.</p><p class="muted">The company works with project drawings, OEM specifications, UIC, AAR, EN and customer standards, inspection expectations and export requirements so buyers can move from inquiry to quotation with fewer delays.</p><h3>International B2B focus</h3><p class="muted">Our content, quotation process and contact channels are structured for overseas buyers comparing railway wheel manufacturer, train wheel supplier, railroad wheel supplier and railway components China options.</p><div class="seo-link-row"><a href="/products/">Products</a><a href="/quality-control/">Quality Control</a><a href="/manufacturing-capability/">Capabilities</a><a href="/contact/">Contact Us</a></div></div><div class="card"><h3>Brand identity</h3><p>The Railwheel identity combines a railway wheel, rail track and steel-blue industrial palette to communicate motion, precision and heavy-duty engineering.</p><ul class="spec-list"><li>Railway wheel manufacturer in China</li><li>Train wheel and railroad wheel supplier</li><li>Railway forging and railway casting support</li><li>Railway components exporter for worldwide buyers</li></ul></div></div></section>${internalLinkHub()}${faqSection("Railwheel company and export supply")}${ctaBand()}`
}));

addPage("products/index.html", layout({
  title: "Railway Wheel, Wheelset, Bogie, Axle Box & Spare Parts Supplier China",
  description: "Browse Railwheel products: railway wheel, train wheel, railroad wheel, wheelset, railway axle, bogie, side frame, bolster, axle box, forging and casting parts.",
  path: "/products/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }]), itemListSchema(products, "Railway wheel and railway spare parts categories", "/products/"), faqSchema()],
  body: `${pageHero("Railway Components Product Categories", "Railwheel supplies railway wheel, railway wheelset, railway bogie, railway axle, axle box, side frame, bolster and railway spare parts for rolling stock manufacturing, maintenance and export procurement.", "Products")}<section><div class="container"><div class="article"><h2>Railway product range for international B2B buyers</h2><p>Our product range supports freight wagon wheels, rail car wheels, locomotive wheels, passenger train wheels, train wheelsets, railroad wheelsets, train bogies, railroad bogies, freight bogies and passenger bogies. OEM and customized manufacturing inquiries are welcome.</p><h3>Technical supply scope</h3><p>Buyers can request railway forging, railway casting, machined railway components and assembled wheelset parts according to drawings, UIC, AAR, EN or project-specific standards.</p></div>${productCards()}<div class="seo-link-row"><a href="/railway-wheel-exporter/">Railway Wheel Exporter</a><a href="/oem-railway-wheel/">OEM Railway Wheel</a><a href="/custom-railway-wheel/">Custom Railway Wheel</a><a href="/railway-spare-parts-manufacturer/">Railway Spare Parts Manufacturer</a><a href="/railway-forging-supplier/">Railway Forging Supplier</a><a href="/railway-casting-supplier/">Railway Casting Supplier</a></div></div></section>${faqSection("railway product categories")}${ctaBand()}`
}));

for (const product of products) {
  addPage(`products/${product.slug}/index.html`, layout({
    title: `${product.metaTitle} | Railwheel`,
    description: product.metaDescription,
    path: `/products/${product.slug}/`,
    active: "Products",
    schemas: [productSchema(product), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }, { name: product.title, url: `/products/${product.slug}/` }]), faqSchema()],
    body: `${pageHero(product.title, product.description, product.title)}
    <section><div class="container grid grid-2"><article class="article"><img src="/assets/home-products/${product.image}" alt="${product.title} from railway wheel supplier China for ${product.aliases}" title="${product.title}" loading="eager" decoding="async" width="423" height="464"><span class="eyebrow">${product.keyword}</span><h2>${product.title} for international rail projects</h2><p>${product.description} Railwheel supplies products worldwide for buyers searching for railway wheel, train wheel, railroad wheel, railway wheelset, railway bogie, railway axle, axle box and railway components from China.</p><p>Our team supports OEM railway wheel, custom railway wheel, heavy duty railway wheel, railway forging, railway casting and railway spare parts manufacturer inquiries with drawing review, material confirmation, export packing and inspection documentation.</p><h2>Applications and standards</h2><p>Typical applications include freight wagons, passenger coaches, metro vehicles, locomotives, mining railways and industrial railways. For wheel projects, buyers can discuss forged railway wheel, steel railway wheel, UIC railway wheel, AAR railway wheel and EN railway wheel requirements.</p><h3>Common buyer keywords</h3><p>This page supports procurement searches for ${product.aliases}, ${product.keyword}, railway components China and railway spare parts supplier inquiries.</p><h2>Typical inquiry information</h2><ul><li>Drawing number, applicable standard and material grade</li><li>Quantity, destination port and delivery schedule</li><li>Inspection, certificate and packing requirements</li><li>Application: freight wagon, passenger coach, locomotive, metro, mining railway or industrial railway</li></ul><h2>Why contact Railwheel</h2><p>Buyers receive focused communication from Amy Sun and a supplier team familiar with railway component sourcing, quality control and export documentation for global B2B customers.</p>${relatedProducts(product.slug)}</article>${inquiryForm()}</div></section>${faqSection(product.title)}${ctaBand()}`
  }));
}

for (const target of targetPages) {
  addPage(`${target.slug}/index.html`, layout({
    title: `${target.title} China | Railway Wheel, Train Wheel & Spare Parts`,
    description: `Railwheel supports ${target.keyword}, railway wheel, train wheel, railroad wheel, railway wheelset, bogie, axle box and railway spare parts inquiries worldwide.`,
    path: `/${target.slug}/`,
    active: "Products",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: target.title, url: `/${target.slug}/` }]), faqSchema()],
    body: targetPageContent(target)
  }));
}

addPage("quality-control/index.html", layout({
  title: "Railway Wheel Quality Control | UIC AAR EN Train Wheel & Axle Inspection",
  description: "Railwheel quality control supports railway wheel, train wheel, railroad wheel, wheelset, axle, bogie, axle box and spare parts with inspection documentation.",
  path: "/quality-control/",
  active: "Quality",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Quality Control", url: "/quality-control/" }]), faqSchema()],
  body: `${pageHero("Quality Control", "Inspection-focused railway wheel and railway component supply for buyers who need confidence in materials, dimensions and documentation.", "Quality Control")}<section><div class="container"><div class="article"><h2>Railway wheel inspection and documentation support</h2><p>Railwheel supports quality documentation for forged railway wheel, steel railway wheel, train wheel, railroad wheel, railway wheelset, railway axle, railroad axle, railway axle box, railway bogie parts, railway forging and railway casting products. Buyers can discuss UIC railway wheel, AAR railway wheel, EN railway wheel and project-specific inspection requirements.</p><h3>Common inspection records</h3><p>Depending on the component and project, records may include material certificates, heat treatment review, dimensional inspection, hardness checks, ultrasonic testing, magnetic particle inspection, packing photos and final shipment documentation.</p><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/axles/">Railway Axle</a><a href="/manufacturing-capability/">Manufacturing Capabilities</a><a href="/contact/">Send Inquiry</a></div></div><div class="grid grid-4">${["Material Traceability","Heat Treatment Review","Dimensional Inspection","Final Documentation"].map((x) => `<div class="card"><div class="icon">QC</div><h3>${x}</h3><p>Railwheel coordinates practical quality checks and records according to buyer requirements and component type.</p></div>`).join("")}</div></div></section>${faqSection("railway wheel quality control")}${ctaBand()}`
}));

addPage("manufacturing-capability/index.html", layout({
  title: "Railway Wheel Manufacturing Capability | OEM Train Wheel, Forging & Casting",
  description: "Railwheel supports railway wheel, train wheel, railroad wheel, wheelset, railway axle, bogie, forging, casting and spare parts manufacturing inquiries.",
  path: "/manufacturing-capability/",
  active: "Capabilities",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Manufacturing Capability", url: "/manufacturing-capability/" }]), faqSchema()],
  body: `${pageHero("Manufacturing Capability", "Capability support for forged, cast, machined and assembled railway components.", "Manufacturing Capability")}<section><div class="container grid grid-2"><div class="visual-panel" role="img" aria-label="Railway wheel manufacturing capability illustration"></div><div><h2>From component drawings to export-ready supply</h2><p class="muted">Railwheel coordinates manufacturing and sourcing channels for railway wheel, train wheel, railroad wheel, railway axle, railroad axle, railway side frame, railway bolster, railway axle box and assembled railway wheelset projects.</p><h3>Manufacturing categories</h3><ul class="spec-list"><li>Forged railway wheel and steel railway wheel supply support</li><li>OEM railway wheel and custom railway wheel manufacturing inquiries</li><li>Railway forging, railway casting and machining for railway bogie parts</li><li>Packing, labeling and shipment communication for worldwide export</li></ul><div class="seo-link-row"><a href="/train-wheel-factory/">Train Wheel Factory</a><a href="/chinese-railway-wheel-factory/">Chinese Railway Wheel Factory</a><a href="/heavy-duty-railway-wheel/">Heavy Duty Railway Wheel</a><a href="/railway-forging-supplier/">Railway Forging</a><a href="/railway-casting-supplier/">Railway Casting</a></div></div></div></section>${faqSection("railway wheel manufacturing capability")}${ctaBand()}`
}));

addPage("applications/index.html", layout({
  title: "Railway Wheel Applications | Freight Wagon, Passenger, Metro & Locomotive",
  description: "Railwheel railway wheel, train wheel, railroad wheel, wheelset, bogie, axle, axle box and spare parts support freight, passenger, metro and mining railways.",
  path: "/applications/",
  active: "Applications",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Applications", url: "/applications/" }]), faqSchema()],
  body: `${pageHero("Applications", "Railway components for freight, passenger, locomotive, metro, mining railway and industrial railway applications.", "Applications")}<section><div class="container"><div class="article"><h2>Rolling stock applications for Railwheel products</h2><p>Railwheel supplies railway wheel, train wheel, railroad wheel, railway wheelset, railway axle, railroad axle, railway bogie, freight bogie, passenger bogie, side frame, bolster, axle box and railway spare parts according to project standards, drawings and operating requirements.</p><h3>Product selection by operating condition</h3><p>Freight wagon wheels, passenger train wheel products, locomotive wheel components and metro wheelsets may require different material, heat treatment, machining tolerance and inspection documentation.</p></div><div class="grid grid-3">${["Freight Wagons","Passenger Coaches","Metro","Locomotives","Mining Railways","Industrial Railways"].map((x) => `<div class="card"><div class="icon">RA</div><h3>${x}</h3><p>Railwheel supplies railway wheels, railway wheelsets, railway bogies and related components according to project standards, drawings and operating requirements.</p></div>`).join("")}</div></div></section>${internalLinkHub()}${faqSection("railway wheel applications")}${ctaBand()}`
}));

addPage("news/index.html", layout({
  title: "Railway Wheel Blog | Train Wheel, Railroad Wheel & Railway Parts Guides",
  description: "Read Railwheel SEO guides about railway wheel, train wheel, railroad wheel, wheelset, bogie, axle box, railway forging, casting and spare parts.",
  path: "/news/",
  active: "News",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "News / Blog", url: "/news/" }]), faqSchema()],
  body: `${pageHero("News / Blog", "SEO articles and procurement guides for railway wheels and components.", "News / Blog")}<section><div class="container"><div class="section-head"><div><span class="eyebrow">Procurement insights</span><h2>Railway wheel, train wheel and railway components buying guides.</h2></div><p>Use these articles to prepare technical inquiries for global railway component sourcing.</p></div><div class="grid grid-2">${blogs.map((b) => `<article class="card"><span class="eyebrow">${b.keyword}</span><h3>${b.title}</h3><p>${b.summary}</p><a class="card-link" href="/news/${b.slug}/">Read article</a></article>`).join("")}</div></div></section>${internalLinkHub()}`
}));

for (const blog of blogs) {
  addPage(`news/${blog.slug}/index.html`, layout({
    title: `${blog.title} | Railway Wheel Supplier Insights`,
    description: `${blog.summary} Includes railway wheel, train wheel, railroad wheel and railway components procurement guidance.`,
    path: `/news/${blog.slug}/`,
    active: "News",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "News / Blog", url: "/news/" }, { name: blog.title, url: `/news/${blog.slug}/` }]), articleSchema(blog), faqSchema()],
    body: `${pageHero(blog.title, blog.summary, blog.title)}<section><div class="container article"><p><strong>Keyword focus:</strong> ${blog.keyword}</p><p>Railway component procurement depends on more than a unit price. Buyers should confirm drawings, applicable standards, material grades, heat treatment, machining tolerance, inspection records, packing requirements and delivery expectations before final supplier selection.</p><h2>Technical confirmation comes first</h2><p>For railway wheel, train wheel, railroad wheel, wheelset, railway axle, railroad axle, railway bogie, side frame, bolster, axle box, bearings and bearing housings, the most useful inquiry starts with drawings or sample references. Standards and operating conditions help the supplier confirm whether the component should be quoted as an existing item, modified design or custom production.</p><h3>Buyer documents to prepare</h3><p>Prepare drawing numbers, old part photos, project standard, rolling stock application, destination and any required third-party inspection request before asking for a quotation.</p><h2>Quality records reduce sourcing risk</h2><p>Material certificates, dimensional reports, hardness records, ultrasonic or magnetic particle inspection and final packing photos can help buyers align internal approval steps. The exact record package should match the component risk level and the buyer's project requirements.</p><h2>Communication checklist</h2><ul><li>Share product name, drawing, standard and target quantity.</li><li>Confirm application, operating environment and replacement schedule.</li><li>Request inspection documentation before shipment when required.</li><li>Clarify packing, labeling, destination and preferred shipment timing.</li></ul><p>Contact Amy Sun at Railwheel for a focused quotation on railway wheels, wheelsets, bogie parts and related railway components.</p><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/bogies-truck-assemblies/">Railway Bogie</a><a href="/products/axles/">Railway Axle</a><a href="/contact/#quote">Request a Quote</a></div></div></section>${faqSection(blog.keyword)}`
  }));
}

addPage("contact/index.html", layout({
  title: "Contact Railway Wheel Supplier China | Train Wheel & Railway Parts Quote",
  description: "Contact Amy Sun for railway wheel, train wheel, railroad wheel, wheelset, railway axle, bogie, side frame, bolster, axle box and spare parts quotes.",
  path: "/contact/",
  active: "Contact Us",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact Us", url: "/contact/" }]), faqSchema()],
  body: `${pageHero("Contact Railwheel", "Send an inquiry for railway wheel, train wheel, railroad wheel, railway wheelset, bogie, axle box and related railway components.", "Contact Us")}<section><div class="container grid grid-2"><div><h2>Contact Supplier</h2><p class="muted">Use this page to request a quote for railway wheel, train wheel, railroad wheel, wheelset, railway axle, railroad axle, railway bogie, freight bogie, passenger bogie, side frame, bolster, axle box, railway forging, railway casting and railway spare parts.</p><h3>Sales contact</h3><div class="contact-method"><div class="icon">A</div><div><strong>${contact.name}</strong><p class="muted">Sales Manager for global railway wheel and railway component inquiries.</p></div></div><div class="contact-method"><div class="icon">T</div><div><strong>Tel / WhatsApp / WeChat</strong><p><a href="tel:+8617755518921">${contact.phone}</a></p></div></div><div class="contact-method"><div class="icon">E</div><div><strong>Email</strong><p><a href="mailto:${contact.email}">${contact.email}</a></p></div></div><div class="contact-method"><div class="icon">CN</div><div><strong>Address</strong><p>${contact.address}</p></div></div><div class="qr-grid"><div class="qr-card"><img src="/assets/whatsapp-qr.png" alt="WhatsApp QR code for railway wheel supplier Amy Sun" title="WhatsApp railway wheel supplier" loading="lazy" decoding="async" width="282" height="280"><strong>WhatsApp QR</strong></div><div class="qr-card"><img src="/assets/wechat-qr.png" alt="WeChat QR code for railway component supplier Amy Sun" title="WeChat railway component supplier" loading="lazy" decoding="async" width="730" height="744"><strong>WeChat QR</strong></div></div></div>${inquiryForm()}</div></section>${internalLinkHub()}${faqSection("railway component quotations")}`
}));

async function writeAssets() {
  await mkdir("dist/assets", { recursive: true });
  await copyFile("src/styles.css", "dist/styles.css");
  await mkdir("dist/assets/home-products", { recursive: true });
  for (const file of ["whatsapp-qr.png", "wechat-qr.png", "railwheel-logo-new.png"]) {
    if (existsSync(path.join("assets", file))) await copyFile(path.join("assets", file), path.join("dist/assets", file));
  }
  for (const file of ["railway-wheel-manufacturing.webp", "home-hero-railway-wheel-manufacturing.jpg"]) {
    if (existsSync(path.join("assets", file))) await copyFile(path.join("assets", file), path.join("dist/assets", file));
  }
  for (const product of homeProducts) {
    const file = path.join("home-products", product.image);
    if (existsSync(path.join("assets", file))) await copyFile(path.join("assets", file), path.join("dist/assets", file));
  }
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
  const imageUrls = [
    {
      loc: `${siteUrl}/`,
      images: [
        ["railway-wheel-manufacturing.webp", "Railway wheel manufacturer workshop producing train wheels and railroad wheels"],
        ...homeProducts.map((product) => [`home-products/${product.image}`, `${product.title} product image for railway component buyers`])
      ]
    },
    ...products.map((product) => ({
      loc: `${siteUrl}/products/${product.slug}/`,
      images: [[`home-products/${product.image}`, `${product.title} from Railwheel railway component supplier`]]
    }))
  ].map((page) => `  <url>\n    <loc>${page.loc}</loc>\n${page.images.map(([src, caption]) => `    <image:image><image:loc>${siteUrl}/assets/${src}</image:loc><image:caption>${esc(caption)}</image:caption><image:title>${esc(caption)}</image:title></image:image>`).join("\n")}\n  </url>`).join("\n");
  await writeFile("dist/image-sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageUrls}\n</urlset>\n`);
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/image-sitemap.xml\n`);
  console.log(`Built ${pages.length} pages into dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
