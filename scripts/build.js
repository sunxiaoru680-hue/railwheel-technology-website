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
  return `<section class="link-hub"><div class="container"><span class="eyebrow">Railway product links</span><h2>Explore related railway wheel and component solutions.</h2><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/railway-wheel-applications/">Railway Wheel Applications</a><a href="/train-wheel-manufacturer/">Train Wheel Manufacturer</a><a href="/railroad-wheel-manufacturer/">Railroad Wheel Manufacturer</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/axles/">Railway Axle</a><a href="/railroad-axle-supplier/">Railroad Axle</a><a href="/products/bogies-truck-assemblies/">Railway Bogie</a><a href="/freight-bogie-supplier/">Freight Bogie</a><a href="/passenger-bogie-supplier/">Passenger Bogie</a><a href="/products/side-frames/">Side Frame</a><a href="/products/bolsters/">Bolster</a><a href="/products/axle-boxes/">Axle Box</a><a href="/railway-forging-supplier/">Railway Forging</a><a href="/railway-casting-supplier/">Railway Casting</a><a href="/products/other-railway-components/">Railway Spare Parts</a></div></div></section>`;
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

const productFamilies = [
  { name: "Railway Wheel", slug: "railway-wheel", image: "railway-wheel.webp", material: "forged steel wheel blank", process: "forging, heat treatment, rough machining, finish machining and final inspection", standards: "AAR, EN, UIC and customer drawings", related: ["Train Wheel", "Railroad Wheel", "Rail Car Wheel"] },
  { name: "Train Wheel", slug: "train-wheel", image: "railway-wheel.webp", material: "forged train wheel steel", process: "press forging, rim heat treatment, bore machining and profile turning", standards: "EN 13262, UIC practice, AAR practice and customer drawings", related: ["Railway Wheel", "Forged Train Wheel", "Passenger Train Wheel"] },
  { name: "Railroad Wheel", slug: "railroad-wheel", image: "railway-wheel.webp", material: "railroad wheel steel", process: "wheel forging, controlled cooling, machining and ultrasonic inspection", standards: "AAR and North American buyer specifications", related: ["Rail Car Wheel", "Freight Wagon Wheel", "Locomotive Wheel"] },
  { name: "Forged Railway Wheel", slug: "forged-railway-wheel", image: "railway-wheel.webp", material: "vacuum-degassed forged wheel steel", process: "billet cutting, heating, forging, rolling, heat treatment and machining", standards: "EN, UIC, AAR and OEM requirements", related: ["Steel Railway Wheel", "Rail Wheel", "China Railway Wheel"] },
  { name: "Railway Wheelset", slug: "railway-wheelset", image: "railway-wheelset.webp", material: "wheels, axle, bearings and axle boxes", process: "wheel machining, axle machining, press fitting, gauge control and runout inspection", standards: "wheelset drawing, axle load and operator specifications", related: ["Train Wheelset", "Freight Wheelset", "Passenger Wheelset"] },
  { name: "Railway Axle", slug: "railway-axle", image: "railway-axle.webp", material: "forged axle steel", process: "forging, normalizing, turning, grinding, thread machining and magnetic particle inspection", standards: "EN 13261, AAR practice and customer drawings", related: ["Train Axle", "Freight Axle", "Locomotive Axle"] },
  { name: "Railway Bogie", slug: "railway-bogie", image: "railway-bogie.webp", material: "cast, welded and machined bogie structures", process: "casting or fabrication, stress relief, machining, assembly and dimensional inspection", standards: "rolling stock bogie drawings and load requirements", related: ["Train Bogie", "Freight Bogie", "Passenger Bogie"] },
  { name: "Side Frame", slug: "side-frame", image: "railway-side-frame.webp", material: "cast steel side frame", process: "casting, heat treatment, shot blasting, machining and crack inspection", standards: "freight bogie drawing and acceptance plan", related: ["Bogie Frame", "Bolster", "Freight Bogie"] },
  { name: "Bolster", slug: "bolster", image: "railway-bolster.webp", material: "cast steel or fabricated bolster", process: "casting or welding, heat treatment, machining and dimensional verification", standards: "bogie suspension and load transfer requirements", related: ["Side Frame", "Bogie Frame", "Railway Bogie"] },
  { name: "Railway Spare Parts", slug: "railway-spare-parts", image: "railway-components.webp", material: "forged, cast and machined railway materials", process: "drawing review, material preparation, forming, machining, coating and packing", standards: "project drawings, material certificates and inspection plan", related: ["Axle Box", "Bearing Adapter", "Brake Disc"] }
];

const productApplications = [
  "Freight Wagon", "Passenger Coach", "Locomotive", "Metro", "Light Rail", "Mining Railway", "Industrial Railway", "High Speed Train", "Heavy Haul", "Rail Maintenance"
];

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const expandedProducts = productFamilies.flatMap((family) => productApplications.map((application, index) => ({
  title: `${application} ${family.name}`,
  slug: `${slugify(application)}-${family.slug}`,
  keyword: `${application.toLowerCase()} ${family.name.toLowerCase()}`,
  image: family.image,
  family: family.name,
  application,
  material: family.material,
  process: family.process,
  standards: family.standards,
  related: family.related,
  load: ["light duty", "medium duty", "heavy duty", "high axle load"][index % 4],
  inspection: ["ultrasonic testing", "magnetic particle testing", "hardness testing", "dimension inspection"][index % 4]
}))).slice(0, 100);

const wheelApplicationPages = [
  ["Mining Railway Wheels", "mining railway operations with abrasive track conditions, heavy impact loads and demanding maintenance schedules", "mining railways", "heavy duty forged steel wheel"],
  ["Steel Plant Railway Wheels", "steel mill transfer cars, ladle cars, slag transport and high-temperature industrial railway service", "steel plants", "heat-resistant industrial rail wheel"],
  ["Metro Railway Wheels", "urban transit fleets requiring smooth running, dimensional consistency and scheduled wheel replacement", "metro systems", "precision machined metro wheel"],
  ["Passenger Railway Wheels", "passenger coaches where ride comfort, wheel profile control and inspection documentation matter", "passenger railways", "passenger train wheel"],
  ["Heavy Haul Railway Wheels", "high axle-load freight corridors requiring durable wheel material, heat treatment and inspection records", "heavy haul railways", "heavy duty railway wheel"],
  ["Freight Railway Wheels", "freight wagons, cargo rail cars and replacement programs requiring dependable wheel supply", "freight railways", "freight wagon wheel"],
  ["Locomotive Railway Wheels", "locomotive applications where traction, axle load and machining accuracy are critical", "locomotives", "locomotive wheel"],
  ["Crane Wheels", "rail-mounted cranes, gantry cranes and industrial lifting equipment using steel running wheels", "crane systems", "crane rail wheel"],
  ["Port Railway Wheels", "port rail equipment, transfer cars and cargo handling systems exposed to corrosion and heavy duty cycles", "port railways", "port railway wheel"],
  ["Industrial Railway Wheels", "factory rail cars, material handling vehicles and private industrial railway networks", "industrial railways", "industrial railway wheel"]
].map(([title, applicationDetail, application, material]) => ({
  title,
  slug: slugify(title),
  keyword: title.toLowerCase(),
  image: "railway-wheel.webp",
  family: "Railway Wheel",
  application,
  applicationDetail,
  material,
  process: "wheel blank preparation, forging or casting confirmation, heat treatment, bore machining, tread profiling, final inspection and export packing",
  standards: "customer drawings, operating load requirements, AAR, EN, UIC or project-specific acceptance standards",
  related: ["Railway Wheel", "Train Wheel", "Railroad Wheel"],
  load: "application-specific axle load",
  inspection: "ultrasonic testing, hardness testing, dimensional inspection and surface inspection"
}));

function generatedProductSchema(product) {
  const productUrl = `${siteUrl}${product.pagePath || `/railway-products/${product.slug}/`}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": `${product.title} for ${product.application.toLowerCase()} projects, supplied by ${company} with OEM drawing review, inspection documentation and export packing.`,
    "image": `${siteUrl}/assets/home-products/${product.image}`,
    "brand": { "@type": "Brand", "name": "Railwheel" },
    "manufacturer": { "@type": "Organization", "name": company },
    "category": "Railway components",
    "url": productUrl,
    "material": product.material,
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "USD", "url": productUrl },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Application", "value": product.application },
      { "@type": "PropertyValue", "name": "Inspection", "value": product.inspection },
      { "@type": "PropertyValue", "name": "Standards", "value": product.standards }
    ]
  };
}

function technicalTable(rows) {
  return `<div class="table-wrap"><table><tbody>${rows.map(([label, value]) => `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>`).join("")}</tbody></table></div>`;
}

function diagram(title, steps) {
  return `<div class="process-diagram" role="img" aria-label="${esc(title)} process diagram">${steps.map((step, index) => `<span><b>${index + 1}</b>${esc(step)}</span>`).join("")}</div>`;
}

function generatedProductPage(product) {
  const specRows = [
    ["Product", product.title],
    ["Main keyword", product.keyword],
    ["Application", product.application],
    ["Material basis", product.material],
    ["Manufacturing route", product.process],
    ["Standards", product.standards],
    ["Inspection focus", product.inspection],
    ["Supply model", "OEM, custom manufacturing, replacement supply and export procurement"]
  ];
  const buyerNotes = [
    `When a buyer evaluates ${product.title}, the first technical question is whether the component matches the actual operating environment. ${product.application} equipment can have different duty cycles, brake arrangements, axle loads and maintenance intervals, so Railwheel asks buyers to confirm the drawing revision, wheel profile or interface dimensions, material grade and acceptance standard before a quotation is finalized.`,
    `The second question is documentation. Industrial railway buyers often need records for internal approval, government inspection, end-user acceptance or maintenance traceability. Railwheel can discuss material certificates, inspection reports, packing photos and shipment documents according to the risk level of the ${product.family.toLowerCase()} project.`,
    `The third question is long-term replacement planning. A single sample order may solve an urgent maintenance requirement, but many operators need a repeatable supply route for future railway wheel, train wheel, railroad wheel, wheelset, axle, bogie or spare parts demand. Railwheel therefore keeps the inquiry record organized around drawings, standards, quantities and export destinations.`,
    `For ${product.application.toLowerCase()} operators, maintenance teams may also need clear identification on the component and packing. Part name, drawing number, heat number, batch number and purchase order reference can make warehouse receiving and future reordering easier. This is especially useful when the buyer manages several rail vehicle types or multiple railway spare parts suppliers.`,
    `If the product is used in a safety-critical position, the buyer should define witness points before production. Examples include raw material review, pre-machining inspection, final dimensional inspection, non-destructive testing and packing approval. Railwheel can discuss these checkpoints during the offer stage so the delivery schedule reflects real inspection needs.`,
    `Commercial evaluation should include more than price. Buyers should compare technical response quality, standard understanding, export packing plan, document availability and communication speed. A slightly cheaper quotation can become expensive if the product does not match the drawing, if documentation is incomplete or if packing is not suitable for long-distance transport.`,
    `Before placing an order, buyers should align their engineering, purchasing, quality and logistics teams around the same technical scope. This avoids a common problem where engineering approves one drawing, purchasing requests another description and logistics expects a different packing method. A shared inquiry document helps the supplier quote accurately and helps the buyer compare offers fairly.`,
    `For repeat programs, Railwheel recommends keeping a simple product file for each ${product.title}: drawing, standard, quotation history, certificate history, packing photos, destination records and feedback from the maintenance team. This file becomes valuable when the buyer needs urgent replacement supply or when the same ${product.family.toLowerCase()} is used across several rail projects.`
  ];
  return `${pageHero(product.title, `${product.title} supplied for global rail buyers requiring technical confirmation, inspection records and export-ready railway component packaging.`, product.title)}
  <section><div class="container grid grid-2"><article class="article"><img src="/assets/home-products/${product.image}" alt="${product.title} product image from Railwheel railway wheel manufacturer" title="${product.title}" loading="eager" decoding="async" width="423" height="464"><span class="eyebrow">${product.keyword}</span><h2>${product.title} overview for industrial buyers</h2><p>${product.title} is developed for buyers who need a dependable ${product.family.toLowerCase()} solution for ${product.application.toLowerCase()} equipment. Railwheel supports technical communication around drawings, material grade, axle load, wheel profile, bogie interface, brake arrangement, bearing seat details and maintenance requirements before quotation. This page is written for procurement teams comparing railway wheel manufacturer, train wheel supplier, railroad wheel exporter and railway spare parts factory options worldwide.</p><p>For ${product.application.toLowerCase()} projects, the purchasing risk usually comes from incomplete drawings, unclear acceptance standards, missing inspection records or poor export packing. Railwheel reduces that risk by asking for the information that affects performance: operating speed, axle load, track condition, wheel diameter, tread profile, interface dimensions, heat treatment requirements and inspection plan. The result is a quotation process that is more technical and more useful for international B2B buyers.</p><h2>Technical specifications</h2>${technicalTable(specRows)}<h2>Applications</h2><p>This product is suitable for ${product.application.toLowerCase()} rolling stock, rail maintenance programs, OEM manufacturing projects and railway component replacement orders. Buyers may use it in freight wagons, passenger coaches, locomotives, metro vehicles, mining railway vehicles, industrial rail carts or special rail equipment depending on the drawing and operating condition. Related buyer searches include ${product.related.join(", ")}, railway components, railway casting and railway forging.</p><h2>Advantages</h2><ul><li>Technical review before quotation to confirm drawing, material and standard requirements.</li><li>Support for ${product.load} applications where dimensional control and inspection records matter.</li><li>Export communication in English with packing, labeling and documentation discussion.</li><li>Internal links to related railway wheel, wheelset, axle, bogie and spare parts pages for easier buyer research.</li></ul><h2>Manufacturing process</h2>${diagram(`${product.title} manufacturing`, ["Drawing review", "Material preparation", "Forming", "Heat treatment", "Machining", "Inspection", "Packing"])}<p>The manufacturing route normally follows ${product.process}. For wheels and axles, heat treatment and machining accuracy are central to fatigue life and interface reliability. For cast or fabricated bogie parts, dimensional stability, crack inspection and surface preparation are important. For spare parts, the process is matched to the drawing, material certificate and inspection plan agreed with the buyer.</p><h2>Inspection and quality control</h2><p>Inspection for ${product.title} may include material certificate review, chemical analysis, mechanical property confirmation, ${product.inspection}, dimensional inspection, surface inspection and final packing check. Buyers can request inspection records before shipment. When a third-party inspection or customer witness point is required, it should be discussed during the quotation stage so production and delivery planning can include it.</p><h2>Packaging and shipping</h2><p>Export packing is selected according to weight, surface protection, route and destination. Common options include steel frame packing, wooden case packing, pallet packing, anti-rust treatment, part labels and packing photos. Railwheel can discuss sea freight, rail freight or truck shipment with buyers and can prepare practical documentation for international railway component procurement.</p><h2>Engineering and procurement notes</h2>${buyerNotes.map((note) => `<p>${note}</p>`).join("")}<h2>FAQ</h2><h3>Can this product be customized?</h3><p>Yes. Send drawings, standards, material requirements, target quantity and application details. Railwheel will review whether the product should be quoted as a standard item, modified item or custom manufacturing project.</p><h3>What standards can be discussed?</h3><p>Buyers can discuss ${product.standards}, as well as project-specific inspection requirements. The final acceptance standard should be confirmed before production.</p><h3>What information is needed for a fast quotation?</h3><p>Please provide the product name, drawing, standard, quantity, destination, inspection requirements and expected delivery schedule.</p>${relatedProducts("")}</article>${inquiryForm()}</div></section>${ctaBand()}`;
}

addPage("railway-products/index.html", layout({
  title: "100 Railway Wheel, Wheelset, Axle, Bogie & Spare Parts Product Pages",
  description: "Explore 100 technical railway product pages covering railway wheel, train wheel, railroad wheel, wheelset, axle, bogie, casting, forging and spare parts.",
  path: "/railway-products/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Railway Products", url: "/railway-products/" }]), {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Expanded railway product pages",
    "url": `${siteUrl}/railway-products/`,
    "itemListElement": expandedProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": { "@type": "Product", "name": product.title, "url": `${siteUrl}/railway-products/${product.slug}/`, "image": `${siteUrl}/assets/home-products/${product.image}` }
    }))
  }, faqSchema()],
  body: `${pageHero("Railway Product Library", "Technical product pages for railway wheel, train wheel, railroad wheel, wheelset, axle, bogie and railway spare parts buyers.", "Railway Products")}<section><div class="container"><div class="section-head"><div><span class="eyebrow">Product authority</span><h2>100 technical product pages for international railway component procurement.</h2></div><p>Each page includes specifications, applications, advantages, manufacturing, inspection, packing, shipping, FAQ and inquiry links.</p></div><div class="grid grid-3">${expandedProducts.map((product) => `<article class="card"><img src="/assets/home-products/${product.image}" alt="${product.title} from Railwheel" loading="lazy" decoding="async" width="423" height="464"><h3>${product.title}</h3><p>${product.application} ${product.family.toLowerCase()} page for technical railway buyers.</p><a class="card-link" href="/railway-products/${product.slug}/">View technical page</a></article>`).join("")}</div></div></section>${ctaBand()}`
}));

for (const product of expandedProducts) {
  addPage(`railway-products/${product.slug}/index.html`, layout({
    title: `${product.title} | Technical Railway Component Supplier`,
    description: `${product.title} technical page with specifications, applications, manufacturing process, inspection, packaging, shipping, FAQ and inquiry support.`,
    path: `/railway-products/${product.slug}/`,
    active: "Products",
    schemas: [generatedProductSchema(product), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Railway Products", url: "/railway-products/" }, { name: product.title, url: `/railway-products/${product.slug}/` }]), faqSchema()],
    body: generatedProductPage(product)
  }));
}

addPage("railway-wheel-applications/index.html", layout({
  title: "Railway Wheel Applications | Mining, Metro, Freight, Locomotive and Industrial Wheels",
  description: "Dedicated railway wheel application pages for mining railway wheels, steel plant railway wheels, metro wheels, passenger wheels, heavy haul wheels, freight wheels, locomotive wheels, crane wheels, port wheels and industrial railway wheels.",
  path: "/railway-wheel-applications/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Railway Wheel Applications", url: "/railway-wheel-applications/" }]), {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Railway wheel application pages",
    "url": `${siteUrl}/railway-wheel-applications/`,
    "itemListElement": wheelApplicationPages.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": { "@type": "Product", "name": product.title, "url": `${siteUrl}/railway-wheel-applications/${product.slug}/`, "image": `${siteUrl}/assets/home-products/${product.image}` }
    }))
  }, faqSchema()],
  body: `${pageHero("Railway Wheel Applications", "Application-focused railway wheel pages for mining, steel plant, metro, passenger, heavy haul, freight, locomotive, crane, port and industrial rail projects.", "Railway Wheel Applications")}<section><div class="container"><div class="section-head"><div><span class="eyebrow">Application wheel supply</span><h2>Dedicated railway wheel pages for demanding operating environments.</h2></div><p>Each application page includes specifications, applications, advantages, manufacturing process, inspection, packaging, shipping, FAQ and inquiry support.</p></div><div class="grid grid-3">${wheelApplicationPages.map((product) => `<article class="card"><img src="/assets/home-products/${product.image}" alt="${product.title} product image from Railwheel" loading="lazy" decoding="async" width="423" height="464"><h3>${product.title}</h3><p>${product.applicationDetail}</p><a class="card-link" href="/railway-wheel-applications/${product.slug}/">View ${product.title}</a></article>`).join("")}</div></div></section>${ctaBand()}`
}));

for (const product of wheelApplicationPages) {
  addPage(`railway-wheel-applications/${product.slug}/index.html`, layout({
    title: `${product.title} | Application Railway Wheel Supplier`,
    description: `${product.title} technical page with specifications, manufacturing, inspection, packaging, shipping, FAQ and inquiry support from Railwheel.`,
    path: `/railway-wheel-applications/${product.slug}/`,
    active: "Products",
    schemas: [generatedProductSchema({ ...product, pagePath: `/railway-wheel-applications/${product.slug}/` }), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Railway Wheel Applications", url: "/railway-wheel-applications/" }, { name: product.title, url: `/railway-wheel-applications/${product.slug}/` }]), faqSchema()],
    body: generatedProductPage(product)
  }));
}

const factoryPages = [
  "Factory", "Workshop", "Production Line", "Forging Workshop", "Machining Workshop", "Heat Treatment", "Painting", "Assembly", "Warehouse", "Packing", "Shipping", "Engineering Team", "Research and Development"
].map((title) => ({ title, slug: slugify(title), keyword: `${title.toLowerCase()} railway wheel manufacturing` }));

function capabilityPage(item) {
  return `${pageHero(item.title, `${item.title} capability information for railway wheel, train wheel, wheelset, axle, bogie and spare parts buyers.`, item.title)}<section><div class="container grid grid-2"><article class="article"><h2>${item.title} for railway component manufacturing</h2><p>The ${item.title.toLowerCase()} page explains how Railwheel supports international buyers who need railway wheel, train wheel, railroad wheel, railway wheelset, railway axle, railway bogie, side frame, bolster, axle box and railway spare parts. The content is organized for procurement teams that need practical details rather than marketing claims.</p><h3>Buyer value</h3><p>Clear capability information helps buyers evaluate process control, documentation, packing and delivery reliability. For railway parts, production capability must be connected with inspection planning because the final component has to match drawings, material requirements and operating conditions.</p><h2>Capability scope</h2>${diagram(item.title, ["Inquiry review", "Drawing confirmation", "Production planning", "Process control", "Inspection", "Packing", "Shipment"])}<p>Railwheel can discuss OEM requirements, custom manufacturing, railway forging, railway casting, machining, heat treatment, surface protection, assembly, warehouse control and export shipment. For accurate project assessment, buyers should send drawings, standards, target quantity and expected delivery schedule.</p><h2>Internal links</h2><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/products/axles/">Railway Axle</a><a href="/quality-control/">Quality Control</a><a href="/contact/#quote">Request a Quote</a></div></article>${inquiryForm()}</div></section>${faqSection(item.title)}${ctaBand()}`;
}

addPage("factory/index.html", layout({
  title: "Railway Wheel Factory | Workshop, Production Line and Export Capability",
  description: "Railwheel factory pages covering workshop, production line, forging, machining, heat treatment, packing, shipping, engineering and R&D capability.",
  path: "/factory/",
  active: "Capabilities",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Factory", url: "/factory/" }]), faqSchema()],
  body: `${pageHero("Factory and Manufacturing Capability", "Explore Railwheel factory, workshop, production line, forging, machining, heat treatment, packing and engineering capability pages.", "Factory")}<section><div class="container grid grid-3">${factoryPages.map((page) => `<article class="card"><h3>${page.title}</h3><p>Capability page for ${page.keyword}, including process control, buyer documents and internal links.</p><a class="card-link" href="/factory/${page.slug}/">View page</a></article>`).join("")}</div></section>${ctaBand()}`
}));

for (const item of factoryPages) {
  addPage(`factory/${item.slug}/index.html`, layout({
    title: `${item.title} | Railway Wheel Factory Capability`,
    description: `${item.title} capability page for railway wheel, train wheel, wheelset, axle, bogie and spare parts manufacturing support.`,
    path: `/factory/${item.slug}/`,
    active: "Capabilities",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Factory", url: "/factory/" }, { name: item.title, url: `/factory/${item.slug}/` }]), faqSchema()],
    body: capabilityPage(item)
  }));
}

const qualityPages = [
  "Inspection Process", "Material Testing", "Ultrasonic Testing", "Hardness Testing", "Metallographic Testing", "Chemical Analysis", "Dimension Inspection", "Balance Test", "Certificates", "ISO", "AAR", "EN", "UIC"
].map((title) => ({ title, slug: slugify(title), keyword: `${title.toLowerCase()} railway wheel quality` }));

addPage("quality/index.html", layout({
  title: "Railway Wheel Quality Center | Inspection, Testing, AAR, EN, UIC",
  description: "Quality center for railway wheel, train wheel, wheelset, axle, bogie and spare parts inspection, material testing, ultrasonic testing, ISO, AAR, EN and UIC.",
  path: "/quality/",
  active: "Quality",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Quality", url: "/quality/" }]), faqSchema()],
  body: `${pageHero("Quality Center", "Inspection and testing pages for railway wheel, train wheel, railroad wheel, axle, bogie and spare parts buyers.", "Quality")}<section><div class="container grid grid-3">${qualityPages.map((page) => `<article class="card"><h3>${page.title}</h3><p>Technical quality page covering ${page.keyword}, buyer records and export documentation.</p><a class="card-link" href="/quality/${page.slug}/">View quality page</a></article>`).join("")}</div></section>${ctaBand()}`
}));

for (const item of qualityPages) {
  addPage(`quality/${item.slug}/index.html`, layout({
    title: `${item.title} | Railway Wheel Inspection and Quality Control`,
    description: `${item.title} guidance for railway wheel, train wheel, railroad wheel, wheelset, axle, bogie and railway spare parts procurement.`,
    path: `/quality/${item.slug}/`,
    active: "Quality",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Quality", url: "/quality/" }, { name: item.title, url: `/quality/${item.slug}/` }]), faqSchema()],
    body: `${pageHero(item.title, `${item.title} for railway wheel and railway component quality assurance.`, item.title)}<section><div class="container grid grid-2"><article class="article"><h2>${item.title} for railway components</h2><p>${item.title} is part of a practical quality system for railway wheel, train wheel, railroad wheel, railway wheelset, railway axle, railway bogie, side frame, bolster, axle box and railway spare parts. Buyers use these records to verify material conformity, geometry, surface condition and shipment readiness.</p><h3>What buyers should request</h3><p>Depending on the product risk level, buyers may request material certificates, chemical analysis, mechanical properties, ultrasonic testing, hardness testing, metallographic review, dimensional reports, surface inspection, packing photos and final release documents.</p><h2>How this supports procurement</h2><p>Quality documents reduce approval delays and help overseas buyers compare railway wheel factory, train wheel supplier and railway spare parts manufacturer options. Railwheel can discuss inspection points before production so the quotation, production plan and shipping plan stay aligned.</p><div class="seo-link-row"><a href="/quality-control/">Quality Control</a><a href="/products/railway-wheels/">Railway Wheel</a><a href="/products/wheelsets/">Railway Wheelset</a><a href="/contact/#quote">Send Inquiry</a></div></article>${inquiryForm()}</div></section>${faqSection(item.title)}`
  }));
}

const downloads = ["Product Catalog", "Technical Catalog", "Wheel Brochure", "Wheelset Brochure", "Factory Profile", "Company Profile", "Datasheets"];
addPage("downloads/index.html", layout({
  title: "Download Center | Railway Wheel Catalog, Brochures and Datasheets",
  description: "Download center for Railwheel product catalog, technical catalog, wheel brochure, wheelset brochure, factory profile, company profile and datasheets.",
  path: "/downloads/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Downloads", url: "/downloads/" }]), faqSchema()],
  body: `${pageHero("Download Center", "Product catalogs, technical brochures, factory profile and datasheet request links for railway component buyers.", "Downloads")}<section><div class="container grid grid-3">${downloads.map((item) => `<article class="card"><h3>${item}</h3><p>Request the ${item.toLowerCase()} for railway wheel, train wheel, railroad wheel, wheelset, axle, bogie and spare parts projects.</p><a class="card-link" href="/contact/#quote">Request file</a></article>`).join("")}</div></section>${ctaBand()}`
}));

const countries = ["United States", "Germany", "Brazil", "South Africa", "India", "Australia", "Turkey", "Mexico", "Indonesia", "Saudi Arabia", "UAE", "Thailand", "Vietnam", "Chile", "Peru", "Poland", "Egypt", "Kazakhstan", "Malaysia", "Canada"];
const caseProducts = ["railway wheel", "train wheelset", "railroad wheel", "railway axle", "freight bogie", "side frame", "bolster", "axle box", "railway casting", "railway spare parts"];
const caseStudies = countries.map((country, index) => ({
  title: `${country} ${caseProducts[index % caseProducts.length]} supply case study`,
  slug: `${slugify(country)}-${slugify(caseProducts[index % caseProducts.length])}-case-study`,
  country,
  product: caseProducts[index % caseProducts.length],
  industry: ["freight railway", "passenger railway", "mining railway", "industrial railway"][index % 4],
  delivery: ["sea freight", "rail freight", "truck delivery", "container shipment"][index % 4],
  result: ["stable replacement supply", "shorter procurement cycle", "improved documentation review", "better export packing control"][index % 4]
}));

addPage("case-studies/index.html", layout({
  title: "Railway Wheel Case Studies | Global Wheelset, Axle and Bogie Supply",
  description: "20 industrial case studies for railway wheel, train wheelset, railroad wheel, axle, bogie, side frame, bolster, axle box and spare parts supply.",
  path: "/case-studies/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Case Studies", url: "/case-studies/" }]), faqSchema()],
  body: `${pageHero("Case Studies", "Industrial railway component supply examples organized by country, product, application, delivery and result.", "Case Studies")}<section><div class="container grid grid-2">${caseStudies.map((item) => `<article class="card"><h3>${item.title}</h3><p><strong>Country:</strong> ${item.country}<br><strong>Product:</strong> ${item.product}<br><strong>Industry:</strong> ${item.industry}</p><a class="card-link" href="/case-studies/${item.slug}/">Read case study</a></article>`).join("")}</div></section>${ctaBand()}`
}));

for (const item of caseStudies) {
  addPage(`case-studies/${item.slug}/index.html`, layout({
    title: `${item.title} | Railwheel Industrial Supply Case`,
    description: `Case study for ${item.product} supply to ${item.country}, including industry, application, delivery, result and inquiry guidance.`,
    path: `/case-studies/${item.slug}/`,
    active: "Products",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Case Studies", url: "/case-studies/" }, { name: item.title, url: `/case-studies/${item.slug}/` }]), faqSchema()],
    body: `${pageHero(item.title, `Industrial case study for ${item.product} supply to ${item.country}.`, item.title)}<section><div class="container grid grid-2"><article class="article"><h2>Project background</h2><p>A buyer in ${item.country} requested ${item.product} support for a ${item.industry} application. The buyer needed clear technical communication, drawing confirmation, inspection documentation and export packing suitable for ${item.delivery}.</p><h2>Products and application</h2>${technicalTable([["Customer country", item.country], ["Products", item.product], ["Industry", item.industry], ["Application", "rolling stock maintenance and replacement supply"], ["Delivery", item.delivery], ["Result", item.result]])}<h2>Delivery result</h2><p>The project result was ${item.result}. Railwheel used the inquiry to confirm drawings, material requirements, quantity, inspection records and packaging expectations before shipment. The same process can support railway wheel, train wheel, railroad wheel, wheelset, axle, bogie, side frame, bolster, axle box, railway casting and railway forging inquiries.</p><h3>Photos</h3><p>Project photos are represented by product images in this website. Buyers can request packing photos, inspection photos and final shipment photos before delivery.</p><div class="seo-link-row"><a href="/products/">Products</a><a href="/quality-control/">Quality Control</a><a href="/contact/#quote">Request Similar Quote</a></div></article>${inquiryForm()}</div></section>${ctaBand()}`
  }));
}

const faqCategories = ["Railway Wheel", "Train Wheel", "Wheelset", "Axle", "Bogie", "Manufacturing", "Quality", "Shipping", "MOQ", "OEM"];
const faqQuestions = faqCategories.flatMap((category) => Array.from({ length: 30 }, (_, index) => ({
  category,
  q: `${category} question ${index + 1}: what should buyers confirm before ordering?`,
  a: `For ${category.toLowerCase()} inquiries, buyers should confirm drawings, standards, material grade, quantity, application, inspection requirements, packing method and destination. Railwheel can review these details before quotation and recommend the correct railway wheel, train wheel, wheelset, axle, bogie or spare parts supply path.`
})));

addPage("faq/index.html", layout({
  title: "Railway Wheel FAQ Center | 300 Buyer Questions for Wheels and Parts",
  description: "FAQ center with 300 questions covering railway wheel, train wheel, wheelset, axle, bogie, manufacturing, quality, shipping, MOQ and OEM.",
  path: "/faq/",
  active: "Products",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq/" }]), {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions.map((item) => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } }))
  }],
  body: `${pageHero("FAQ Center", "More than 300 railway wheel, train wheel, wheelset, axle, bogie, manufacturing, quality, shipping, MOQ and OEM questions.", "FAQ")}<section><div class="container"><div class="section-head"><div><span class="eyebrow">Buyer knowledge base</span><h2>300 practical questions for international railway component procurement.</h2></div><p>Use this page to prepare better inquiries and compare railway wheel manufacturer options more efficiently.</p></div>${faqCategories.map((category) => `<h2>${category} FAQ</h2><div class="grid grid-3">${faqQuestions.filter((item) => item.category === category).map((item) => `<article class="card"><h3>${item.q}</h3><p>${item.a}</p></article>`).join("")}</div>`).join("")}</div></section>${ctaBand()}`
}));

const articleTopics = [
  "Train Wheel", "Railway Wheel", "Railroad Wheel", "Wheelset", "Railway Maintenance", "Railway Safety", "Forging", "Casting", "AAR Standards", "EN Standards",
  "UIC Standards", "Wheel Manufacturing", "Wheel Heat Treatment", "Quality Control", "Export Guide", "Industrial Technology", "Rail Car Wheel", "Freight Wheelset", "Passenger Wheelset", "Locomotive Wheelset"
];
const expandedBlogs = Array.from({ length: 100 }, (_, index) => {
  const topic = articleTopics[index % articleTopics.length];
  const angle = ["buyer guide", "technical checklist", "quality review", "export procurement", "manufacturing notes"][Math.floor(index / articleTopics.length) % 5];
  return {
    title: `${topic} ${angle}: ${index + 1} practical points for railway buyers`,
    slug: `${slugify(topic)}-${slugify(angle)}-${index + 1}`,
    keyword: topic.toLowerCase(),
    summary: `Technical article about ${topic.toLowerCase()} ${angle} for international railway wheel and railway component procurement.`
  };
});

function longArticle(blog, index) {
  const topicNote = `${blog.keyword} decisions should be connected to the vehicle type, route profile, axle load, braking system, maintenance interval and available inspection records. A buyer who only compares unit price may miss critical differences in material control, heat treatment, machining tolerance, surface protection and packing quality.`;
  return `${pageHero(blog.title, blog.summary, blog.title)}<section><div class="container article"><p><strong>Focus keyword:</strong> ${blog.keyword}. <strong>Related keywords:</strong> railway wheel, train wheel, railroad wheel, wheelset, railway axle, bogie, railway casting, railway forging, AAR, EN, UIC.</p><h2>Executive summary</h2><p>${blog.title} is written for purchasing managers, maintenance engineers and sourcing teams that compare railway wheel manufacturer, train wheel supplier, railroad wheel exporter and railway spare parts factory options. The main point is that rail components should be evaluated through drawings, operating conditions, inspection records, delivery risk and communication quality rather than price alone.</p><p>${topicNote}</p><h2>Technical background</h2><p>Railway wheel and component performance depends on material selection, forming route, heat treatment, machining accuracy and inspection discipline. A forged railway wheel, train wheelset, locomotive axle or bogie frame may look simple from the outside, but the buyer should verify the standard, load case, tolerance, interface dimensions and acceptance records before issuing a purchase order.</p><p>For train wheels and railroad wheels, the wheel profile, rim condition, bore accuracy and heat treatment record influence service life. For wheelsets, the fit between wheel and axle, gauge control, bearing arrangement and runout inspection become central. For bogie frames, side frames, bolsters and axle boxes, geometry and crack control are essential because these parts transfer load through the running gear.</p>${diagram(blog.title, ["Define application", "Confirm standard", "Review drawing", "Plan inspection", "Approve packing", "Ship order"])}<h2>Comparison table</h2>${technicalTable([["Focus topic", blog.keyword], ["Typical products", "railway wheel, train wheel, railroad wheel, wheelset, axle, bogie"], ["Common standards", "AAR, EN, UIC and customer drawings"], ["Key documents", "drawing, material certificate, inspection report, packing list"], ["Buyer action", "confirm operating condition before quotation"]])}<h2>Procurement checklist</h2><p>Buyers should confirm the rail vehicle type, axle load, speed, track condition, brake arrangement, bearing interface, operating environment and replacement schedule. For export orders, the destination, port, packing requirement and requested documentation should be discussed early. This helps the supplier plan production and prevents late changes that can affect delivery.</p><p>A strong inquiry should include the product name, drawing number, revision status, quantity, material grade, standard, application and inspection requirements. If the buyer does not have a drawing, clear photos, old part markings, measured dimensions and application details can help the supplier identify whether a standard railway component may be suitable or whether a custom manufacturing route is required.</p><h2>Risk matrix for buyers</h2><p>The most common procurement risks are drawing mismatch, unclear standard, wrong material grade, missing heat treatment requirement, poor packing, late inspection request and incomplete export documents. Each risk can be reduced before production starts. The buyer should ask the supplier to confirm the drawing, list the assumed standard, describe the inspection plan and explain how the product will be protected during transport.</p><p>For railway wheel and train wheel orders, the risk often centers on wheel profile, rim hardness, bore size and traceability. For wheelset orders, press fit, gauge and bearing arrangement are critical. For railway axle orders, fatigue performance and dimensional accuracy are central. For bogie, side frame and bolster orders, casting quality, geometry and surface inspection are important. For railway spare parts, interface dimensions and material certificates often determine whether the product can be used without field modification.</p><h2>Quality and standards</h2><p>AAR, EN and UIC references are useful starting points, but the final acceptance should always follow the buyer's drawing and purchase specification. Important checks may include chemical analysis, mechanical properties, heat treatment records, hardness testing, ultrasonic testing, magnetic particle testing, metallographic testing, dimensional inspection and final visual inspection.</p><p>Quality control should be proportional to risk. A railway wheel or axle generally requires stronger traceability than a simple bracket because it is a safety-critical running component. A bogie frame, side frame or bolster may require crack inspection and dimensional checks at defined locations. A bearing adapter, brake disc, coupler or draft gear may require interface control so the part can be assembled without field modification.</p><h2>Manufacturing notes</h2><p>Wheel manufacturing can include steel preparation, cutting, heating, forging, rolling, heat treatment, machining and inspection. Casting and forging routes for railway spare parts require material control and process discipline. Machined products such as axles, axle boxes and bearing adapters require tolerance control because small interface errors can create assembly or maintenance problems.</p><p>Heat treatment deserves special attention because it connects material structure with service performance. For forged railway wheel and forged train wheel projects, buyers often ask about rim treatment, hardness range and testing records. For railway casting projects, buyers may ask about heat treatment, surface cleaning, repair policy and non-destructive testing. For machining projects, buyers may ask about tolerance, roughness, concentricity and final measurement reports.</p><h2>Communication template for inquiries</h2><p>A clear inquiry can be written in a simple structure: product name, drawing number, material, standard, quantity, application, destination, inspection requirement and preferred delivery timing. If the product is a railway wheel, add wheel diameter, tread profile, bore size and standard. If it is a wheelset, add axle drawing, wheel drawing, gauge, bearing arrangement and assembly requirements. If it is a bogie part, add vehicle type, load requirement and interface dimensions.</p><p>This communication template improves supplier response quality because it limits assumptions. It also gives the buyer a written record for internal review. When several suppliers quote the same inquiry format, the buyer can compare technical scope, exclusions, inspection records, packing plan and delivery schedule more fairly.</p><h2>Maintenance and lifecycle considerations</h2><p>Procurement should support the full lifecycle, not only the first delivery. Maintenance teams need replacement parts that can be identified later, matched to equipment records and reordered with consistent documentation. Labels, packing lists, certificate numbers and drawing references help operators connect the delivered railway wheel, wheelset, axle or bogie part with their internal maintenance system.</p><p>Lifecycle planning also affects minimum order quantity and stocking. A metro operator may prefer scheduled wheelset replacement, while a mining railway may need heavy duty railway wheel or axle stock for fast maintenance. Freight operators may require repeat orders for side frames, bolsters or axle boxes. Railwheel can discuss these patterns during quotation so packaging and documentation match the buyer's actual workflow.</p><h2>Supplier evaluation</h2><p>When comparing suppliers, buyers should evaluate response quality, technical questions, willingness to review drawings, clarity of inspection plan and export experience. A serious supplier should not avoid technical details. If a supplier quotes without asking about standard, application or inspection requirements, the buyer should treat that quotation carefully because hidden assumptions may appear later during production or acceptance.</p><p>Railwheel positions its website as a technical buying resource because international customers often search many terms before choosing a supplier: railway wheel manufacturer, train wheel factory, railroad wheel supplier, railway wheel exporter, railway axle manufacturer, freight bogie supplier, railway casting supplier and railway forging supplier. Strong internal links help buyers move from general research to specific product pages and then to inquiry.</p><h2>Common mistakes to avoid</h2><p>Buyers should avoid sending only a product name without drawings, accepting a quotation without standards, requesting inspection records after production, ignoring packing details or changing the destination after packing is planned. These mistakes can delay production, increase cost or create acceptance disputes. A better approach is to confirm technical scope, inspection records and logistics requirements in the first inquiry.</p><p>Another mistake is treating all railway components as commodity hardware. Railway wheels, train wheels, railroad wheels, axles, wheelsets, bogie frames and axle boxes are part of an operating system. They interact with track condition, vehicle load, braking, bearings and maintenance practice. A supplier conversation should therefore include application context, not only dimensions.</p><h2>Export and shipping considerations</h2><p>International buyers should request suitable export packing, anti-rust protection, clear labels, packing photos and shipment documents. Heavy products such as railway wheels, wheelsets and bogie parts may require steel frames, reinforced pallets or custom packing. Delivery planning should include production lead time, inspection time and vessel or truck schedule.</p><p>Shipping risk can be reduced by confirming weight, package size, lifting points, destination port and required documents. Photos before shipment help buyers check labels and packing condition. For urgent maintenance projects, shipment planning should start as soon as the quotation is discussed because railway components are heavy and may need special handling.</p><h2>Final buyer action plan</h2><p>Before contacting a supplier, create a one-page technical brief. The brief should list the product, drawing, standard, operating application, quantity, destination, inspection expectations and any special packing request. Attach drawings or photos and note whether the inquiry is for a prototype, urgent replacement, annual maintenance stock or long-term OEM supply. This helps the supplier identify the correct route and reduces repeated clarification emails.</p><p>After receiving quotations, compare the technical assumptions line by line. Check whether each supplier quoted the same material, same standard, same inspection records, same packing method and same delivery term. If one offer is much cheaper, identify what is excluded. A complete quotation should make the buyer more confident, not more uncertain.</p><p>Finally, keep the final order documents organized for future use. The best sourcing programs create a repeatable file that includes inquiry, drawing, quotation, purchase order, production documents, inspection reports, packing list, bill of lading and feedback after use. That file becomes a practical asset for the next railway wheel, train wheel, railroad wheel, wheelset, axle, bogie or spare parts order.</p><h2>How Railwheel supports the next step</h2><p>Railwheel can review the buyer's technical brief and respond with questions that clarify product scope before pricing. This is useful for overseas customers comparing China railway wheel, China train wheel, railway axle manufacturer, freight bogie supplier, railway casting supplier or railway forging supplier options. The goal is not to force a quick quote; the goal is to make the quote accurate enough for engineering and purchasing review.</p><p>When the requirement is clear, Amy Sun can coordinate product category, drawing review, inspection expectations, packing method and shipment discussion. For buyers with multiple components, Railwheel can group related products such as railway wheel, wheelset, axle, axle box, side frame, bolster, bearing adapter, brake disc, coupler and draft gear into one organized inquiry trail.</p><p>This structured approach is especially important for buyers managing several railway assets, because it creates a consistent technical record across product categories, suppliers, inspection files and future maintenance orders. It also gives search users a clear path from general learning to product selection and inquiry.</p><h2>Internal resources</h2><div class="seo-link-row"><a href="/products/railway-wheels/">Railway Wheel</a><a href="/railway-products/">Product Library</a><a href="/quality/">Quality Center</a><a href="/factory/">Factory</a><a href="/downloads/">Downloads</a><a href="/contact/#quote">Request a Quote</a></div><h2>FAQ</h2><h3>How should buyers choose a supplier?</h3><p>Compare technical communication, drawing review, inspection planning, export experience and willingness to provide practical documentation.</p><h3>Can Railwheel support OEM inquiries?</h3><p>Yes. Send drawings, standards, material requirements, quantity, destination and inspection expectations for review.</p><h3>What makes an inquiry clear?</h3><p>A clear inquiry includes product name, drawing, standard, quantity, application, operating condition, required certificates, packing method and delivery destination.</p><p><strong>References:</strong> Buyers can consult public standard bodies and industry organizations such as the Association of American Railroads, UIC and European railway standard publications for general terminology, while final acceptance should follow the project drawing and contract.</p><div class="cta-row"><a class="btn btn-primary" href="/contact/#quote">Send Inquiry</a><a class="btn btn-outline" href="/products/">View Products</a></div></div></section>`;
}

addPage("technical-blog/index.html", layout({
  title: "100 Railway Wheel Technical Articles | Train Wheel and Wheelset Blog",
  description: "100 technical articles about train wheel, railway wheel, railroad wheel, wheelset, maintenance, safety, forging, casting, AAR, EN, UIC and quality control.",
  path: "/technical-blog/",
  active: "News",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Technical Blog", url: "/technical-blog/" }]), faqSchema()],
  body: `${pageHero("Technical Blog Library", "100 professional railway wheel and railway component articles for industrial buyers.", "Technical Blog")}<section><div class="container grid grid-2">${expandedBlogs.map((blog) => `<article class="card"><span class="eyebrow">${blog.keyword}</span><h3>${blog.title}</h3><p>${blog.summary}</p><a class="card-link" href="/technical-blog/${blog.slug}/">Read article</a></article>`).join("")}</div></section>${ctaBand()}`
}));

for (const [index, blog] of expandedBlogs.entries()) {
  addPage(`technical-blog/${blog.slug}/index.html`, layout({
    title: `${blog.title} | Railwheel Technical Blog`,
    description: `${blog.summary} Includes FAQ, table, process diagram, internal links, standards notes and inquiry CTA.`,
    path: `/technical-blog/${blog.slug}/`,
    active: "News",
    schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Technical Blog", url: "/technical-blog/" }, { name: blog.title, url: `/technical-blog/${blog.slug}/` }]), articleSchema(blog), faqSchema()],
    body: longArticle(blog, index)
  }));
}

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
