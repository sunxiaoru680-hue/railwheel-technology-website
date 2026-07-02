import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const siteUrl = "https://zysadvisory.com";
const company = "ZYS Advisory";
const legalName = "ZYS International Business Advisory";
const contact = {
  email: "info@zysadvisory.com",
  phone: "+86 18055161721",
  address: "Shanghai, China",
  areaServed: "Worldwide"
};

const nav = [
  ["Home", "/"],
  ["Services", "/services/"],
  ["China Advisory", "/services/china-company-registration/"],
  ["Blog", "/blog/"],
  ["Case Studies", "/case-studies/"],
  ["Contact", "/contact/"]
];

const primaryKeywords = [
  "China Company Registration",
  "Register Company in China",
  "China Tax Consultant",
  "China Accounting Service",
  "Foreign Investment in China",
  "Business Advisory China",
  "WFOE Registration China",
  "Hong Kong Company Registration",
  "Singapore Company Registration",
  "Dubai Company Registration",
  "US LLC Formation",
  "China Payroll Service",
  "China Audit Service",
  "China Visa Service",
  "China Business License",
  "International Business Advisory"
];

const serviceGroups = [
  ["Market Entry", "Company setup, licensing and expansion structures"],
  ["Accounting & Tax", "Compliance, tax filing, bookkeeping and audit readiness"],
  ["HR & Immigration", "Payroll, employment, work permits and visas"],
  ["Corporate Services", "Ongoing governance, banking, nominee and document services"]
];

const services = [
  ["China Company Registration", "china-company-registration", "Register Company in China", "Set up a compliant China entity with name pre-check, business scope planning, license application and post-registration guidance.", "Market Entry"],
  ["WFOE Registration China", "wfoe-registration-china", "WFOE Registration China", "Establish a Wholly Foreign-Owned Enterprise in China with structure planning, registered capital advice and local compliance support.", "Market Entry"],
  ["Representative Office China", "representative-office-china", "China Representative Office Registration", "Register a China representative office for liaison, market research and non-revenue activities.", "Market Entry"],
  ["Joint Venture China", "joint-venture-china", "China Joint Venture Advisory", "Plan equity joint ventures and cooperative structures with governance, contract and regulatory coordination.", "Market Entry"],
  ["Hong Kong Company Registration", "hong-kong-company-registration", "Hong Kong Company Registration", "Register a Hong Kong company for international trade, holding structures, banking and cross-border operations.", "Market Entry"],
  ["Singapore Company Registration", "singapore-company-registration", "Singapore Company Registration", "Set up a Singapore company with director, secretary, filing and tax registration guidance.", "Market Entry"],
  ["Dubai Company Registration", "dubai-company-registration", "Dubai Company Registration", "Compare Dubai mainland, free zone and offshore structures for regional headquarters and trading businesses.", "Market Entry"],
  ["US LLC Formation", "us-llc-formation", "US LLC Formation", "Form a US LLC with state selection, EIN coordination and banking-ready documentation support.", "Market Entry"],
  ["UK Company Registration", "uk-company-registration", "UK Company Registration", "Register a UK limited company for international business, e-commerce and investment structures.", "Market Entry"],
  ["Offshore Company Registration", "offshore-company-registration", "Offshore Company Registration", "Evaluate offshore company structures for holding, trading, IP, tax and risk management needs.", "Market Entry"],
  ["China Business License", "china-business-license", "China Business License Application", "Apply for or update China business licenses, operating scopes and registration records.", "Market Entry"],
  ["China ICP Filing", "china-icp-filing", "China ICP Filing Service", "Prepare China ICP filing support for websites, e-commerce and internet-facing business operations.", "Market Entry"],
  ["China Import Export License", "china-import-export-license", "China Import Export License", "Apply for China import-export rights, customs registration and foreign trade operator records.", "Market Entry"],
  ["China Food Business License", "china-food-business-license", "China Food Business License", "Support licensing for food trading, catering, packaged products and related regulated business activities.", "Market Entry"],
  ["China Trademark Registration", "china-trademark-registration", "China Trademark Registration", "Protect brands in China with trademark search, filing coordination and renewal reminders.", "Corporate Services"],
  ["China Accounting Service", "china-accounting-service", "China Accounting Service", "Monthly bookkeeping, voucher review, management reporting and accounting compliance for foreign-invested companies.", "Accounting & Tax"],
  ["China Tax Consultant", "china-tax-consultant", "China Tax Consultant", "China tax advisory for VAT, CIT, withholding tax, transfer pricing and cross-border transactions.", "Accounting & Tax"],
  ["China VAT Filing", "china-vat-filing", "China VAT Filing Service", "Manage VAT filing, invoice compliance, fapiao process review and tax bureau communication.", "Accounting & Tax"],
  ["China Corporate Income Tax", "china-corporate-income-tax", "China Corporate Income Tax Filing", "Annual CIT filing, tax adjustment review and compliance calendar management.", "Accounting & Tax"],
  ["China Annual Audit", "china-annual-audit", "China Annual Audit Service", "Coordinate annual audit, tax reconciliation and statutory reporting for China companies.", "Accounting & Tax"],
  ["China Payroll Service", "china-payroll-service", "China Payroll Service", "Monthly payroll calculation, IIT filing, social insurance and housing fund coordination for China teams.", "HR & Immigration"],
  ["China Employer of Record", "china-employer-of-record", "China Employer of Record", "Hire talent in China without a local entity through compliant employer of record support.", "HR & Immigration"],
  ["China Work Permit", "china-work-permit", "China Work Permit Service", "Support foreign employee work permit, notification letter and residence permit processes.", "HR & Immigration"],
  ["China Visa Service", "china-visa-service", "China Visa Service", "Business visa, work visa and family visa document planning for international executives and employees.", "HR & Immigration"],
  ["China HR Compliance", "china-hr-compliance", "China HR Compliance Advisory", "Employment contracts, handbook review, termination support and HR compliance advisory.", "HR & Immigration"],
  ["Company Secretary Service", "company-secretary-service", "Company Secretary Service", "Ongoing governance, filings, registers and resolution support for international company structures.", "Corporate Services"],
  ["Corporate Bank Account Opening", "corporate-bank-account-opening", "Corporate Bank Account Opening", "Prepare company profiles, KYC documents and banking packages for account opening conversations.", "Corporate Services"],
  ["Registered Address Service", "registered-address-service", "Registered Address Service", "Registered address and mail handling solutions for China, Hong Kong and international entities.", "Corporate Services"],
  ["Nominee Director Service", "nominee-director-service", "Nominee Director Service", "Nominee and local director arrangements where legally available and commercially appropriate.", "Corporate Services"],
  ["Document Legalization", "document-legalization", "Document Legalization Service", "Notarization, legalization, apostille and embassy document coordination for cross-border filings.", "Corporate Services"],
  ["Foreign Investment Advisory China", "foreign-investment-advisory-china", "Foreign Investment in China", "Market entry advisory for foreign investors assessing China setup, compliance, tax and operating risks.", "Market Entry"],
  ["Business Advisory China", "business-advisory-china", "Business Advisory China", "Practical business advisory for market entry, restructuring, compliance, finance operations and growth in China.", "Corporate Services"],
  ["China Due Diligence", "china-due-diligence", "China Due Diligence Service", "Company verification, supplier checks, registration records and counterparty due diligence for China transactions.", "Corporate Services"],
  ["M&A Advisory China", "ma-advisory-china", "M&A Advisory China", "Support transaction readiness, due diligence coordination and post-deal operational planning in China.", "Corporate Services"],
  ["Cross-border Tax Advisory", "cross-border-tax-advisory", "Cross-border Tax Advisory", "Plan cross-border transactions, withholding tax, service fees, royalties and holding-company structures.", "Accounting & Tax"],
  ["Transfer Pricing China", "transfer-pricing-china", "China Transfer Pricing Advisory", "Transfer pricing documentation, related-party transaction review and tax-risk communication.", "Accounting & Tax"]
].map(([title, slug, keyword, description, group]) => ({ title, slug, keyword, description, group }));

const blogCategories = [
  "China Company Registration",
  "Tax & Accounting",
  "Payroll & HR",
  "Visas & Immigration",
  "International Expansion",
  "Licensing & Compliance"
];

const blogKeywords = [
  "China Company Registration", "Register Company in China", "WFOE Registration China", "China Business License", "Foreign Investment in China",
  "China Tax Consultant", "China Accounting Service", "China VAT Filing", "China Payroll Service", "China Annual Audit",
  "Hong Kong Company Registration", "Singapore Company Registration", "Dubai Company Registration", "US LLC Formation", "Offshore Company Registration",
  "China Work Permit", "China Visa Service", "China Employer of Record", "China Import Export License", "China ICP Filing"
];

const blogAngles = [
  "Step-by-Step Guide", "Cost and Timeline", "Compliance Checklist", "Common Mistakes", "Documents Required",
  "Tax Considerations", "Best Structure for Foreign Investors", "Practical Buyer Guide", "2026 Planning Guide", "FAQ for International Founders"
];

const posts = Array.from({ length: 100 }, (_, index) => {
  const keyword = blogKeywords[index % blogKeywords.length];
  const angle = blogAngles[Math.floor(index / blogKeywords.length) % blogAngles.length];
  const category = blogCategories[index % blogCategories.length];
  const title = `${keyword}: ${angle}`;
  const slug = `${keyword.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${angle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  return {
    title,
    slug,
    keyword,
    category,
    date: `2026-${String(1 + Math.floor(index / 9)).padStart(2, "0")}-${String(1 + (index % 27)).padStart(2, "0")}`,
    description: `Draft guide for international companies researching ${keyword}, including compliance points, documents, timeline, tax considerations and advisory next steps.`
  };
});

const testimonials = [
  "ZYS helped us compare China, Hong Kong and Singapore structures before committing to our Asia expansion.",
  "The team explained tax, accounting and payroll obligations clearly and gave us a practical compliance calendar.",
  "We needed fast document preparation for entity setup and banking. ZYS gave us a clear checklist and kept the process moving."
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function slugToUrl(slug) {
  return `/services/${slug}/`;
}

function logo() {
  return `<span class="brand-mark">ZYS</span>`;
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

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": company,
    "legalName": legalName,
    "url": siteUrl,
    "logo": `${siteUrl}/assets/zys-advisory-hero.webp`,
    "email": contact.email,
    "telephone": contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Shanghai",
      "addressCountry": "CN"
    },
    "areaServed": contact.areaServed,
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": contact.email,
      "telephone": contact.phone,
      "availableLanguage": ["English", "Chinese"]
    }]
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company,
    "url": siteUrl,
    "image": `${siteUrl}/assets/zys-advisory-hero.webp`,
    "email": contact.email,
    "telephone": contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shanghai",
      "addressLocality": "Shanghai",
      "addressCountry": "CN"
    },
    "areaServed": contact.areaServed,
    "priceRange": "$$"
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": company,
    "url": siteUrl,
    "publisher": { "@type": "Organization", "name": company },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/blog/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

function faqSchema(service) {
  const name = service?.title || "international business advisory services";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How long does ${name} usually take?`,
        "acceptedAnswer": { "@type": "Answer", "text": "Timing depends on the jurisdiction, document readiness and regulatory review. ZYS provides a project checklist and timeline after reviewing your business activity and shareholder structure." }
      },
      {
        "@type": "Question",
        "name": `What documents are needed for ${name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": "Typical documents include shareholder identification, corporate documents, business activity details, registered address information and compliance forms. Requirements vary by jurisdiction and service type." }
      },
      {
        "@type": "Question",
        "name": "Can ZYS support accounting, tax and payroll after setup?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. ZYS supports post-incorporation accounting, tax filing, payroll, audit coordination, licensing and ongoing corporate compliance for international businesses." }
      }
    ]
  };
}

function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": { "@type": "Organization", "name": company, "url": siteUrl },
    "areaServed": "Worldwide",
    "serviceType": service.keyword,
    "url": `${siteUrl}${slugToUrl(service.slug)}`
  };
}

function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Organization", "name": company },
    "publisher": { "@type": "Organization", "name": company },
    "mainEntityOfPage": `${siteUrl}/blog/${post.slug}/`
  };
}

function layout({ title, description, pagePath, active = "", body, schemas = [], type = "website" }) {
  const canonical = `${siteUrl}${pagePath}`;
  const allSchemas = [organizationSchema(), localBusinessSchema(), websiteSchema(), ...schemas];
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
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${company}">
  <meta property="og:image" content="${siteUrl}/assets/zys-advisory-hero.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${siteUrl}/assets/zys-advisory-hero.webp">
  <link rel="preload" href="/assets/zys-advisory-hero.webp" as="image" type="image/webp" fetchpriority="high">
  <link rel="stylesheet" href="/styles.css">
  ${allSchemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n  ")}
</head>
<body>
  <header class="site-header">
    <div class="topbar"><div class="container">International Business Advisory | China Company Registration | Tax | Accounting | Payroll | Visa</div></div>
    <div class="container nav">
      <a class="brand" href="/">${logo()}<span><strong>ZYS Advisory</strong><small>International Business Advisory Services</small></span></a>
      <nav>${nav.map(([label, href]) => `<a class="${active === label ? "active" : ""}" href="${href}">${label}</a>`).join("")}</nav>
      <a class="btn btn-primary" href="/contact/">Get Consultation</a>
    </div>
  </header>
  <main>${body}</main>
  ${footer()}
</body>
</html>`;
}

function footer() {
  return `<footer class="footer"><div class="container footer-grid">
    <div><div class="brand">${logo()}<span><strong>ZYS Advisory</strong><small>Business Advisory China</small></span></div><p>World-class advisory support for company registration, tax, accounting, payroll, visa, licensing and international expansion.</p></div>
    <div><strong>Core Services</strong>${services.slice(0, 8).map((service) => `<a href="${slugToUrl(service.slug)}">${service.title}</a>`).join("")}</div>
    <div><strong>Insights</strong><a href="/blog/">Blog</a><a href="/case-studies/">Case Studies</a><a href="/services/">All Services</a><a href="/contact/">Contact</a></div>
    <div><strong>Contact</strong><a href="mailto:${contact.email}">${contact.email}</a><a href="tel:${contact.phone.replace(/\s/g, "")}">${contact.phone}</a><span>${contact.address}</span></div>
  </div><div class="container copyright">Copyright ${new Date().getFullYear()} ${company}. All rights reserved.</div></footer>`;
}

function pageHero(title, desc, crumb = title) {
  return `<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / ${esc(crumb)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div></section>`;
}

function ctaBlock(title = "Ready to expand internationally?") {
  return `<section class="cta"><div class="container cta-grid"><div><span class="eyebrow">Talk to ZYS Advisory</span><h2>${title}</h2><p>Share your target jurisdiction, business activity, shareholders and timeline. We will recommend a practical setup, tax and compliance roadmap.</p></div><a class="btn btn-light" href="/contact/">Book a Consultation</a></div></section>`;
}

function serviceCards(items = services) {
  return `<div class="card-grid">${items.map((service) => `<article class="card"><span class="tag">${service.group}</span><h3>${service.title}</h3><p>${service.description}</p><a href="${slugToUrl(service.slug)}">Explore ${service.title}</a></article>`).join("")}</div>`;
}

function servicePage(service) {
  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 4);
  return `${pageHero(service.title, service.description)}
  <section><div class="container service-layout">
    <article class="article">
      <span class="eyebrow">${service.keyword}</span>
      <h2>${service.title} for international companies</h2>
      <p>ZYS Advisory helps founders, investors and finance teams handle ${service.keyword} with clear project management, document preparation and compliance planning. Our work is designed for overseas clients who need practical guidance before entering China, Hong Kong, Singapore, Dubai, the United States or other international markets.</p>
      <p>Every engagement starts with business activity review, shareholder structure, tax considerations, banking needs, licensing requirements and post-setup obligations. This approach helps avoid common delays in company registration, accounting, tax, payroll, visa and licensing projects.</p>
      <h2>What is included</h2>
      <ul><li>Initial advisory call and regulatory roadmap</li><li>Document checklist and timeline planning</li><li>Entity, tax, accounting and compliance coordination</li><li>Post-registration support for banking, payroll, tax and reporting</li></ul>
      <h2>Why clients choose ZYS</h2>
      <p>Clients choose ZYS for cross-border business advisory, China company registration, foreign investment in China, China tax consultant support and international expansion coordination. We focus on practical execution rather than generic advice.</p>
      <div class="testimonial"><strong>Client feedback</strong><p>${testimonials[services.indexOf(service) % testimonials.length]}</p></div>
      <div class="case-box"><strong>Example case study</strong><p>An overseas trading company needed a compliant structure, tax registration, accounting process and import-export planning. ZYS prepared a phased setup plan and coordinated registration, compliance calendar and post-incorporation handover.</p></div>
      <h2>Frequently asked questions</h2>
      <details open><summary>How do we start?</summary><p>Send your target market, business activity, shareholder information and expected launch timeline. ZYS will provide a document checklist and action plan.</p></details>
      <details><summary>Can ZYS support after registration?</summary><p>Yes. We support accounting, tax, payroll, audit, annual filings, license updates, visa and compliance maintenance.</p></details>
      <details><summary>Is this suitable for foreign investors?</summary><p>Yes. The service is designed for foreign investors, founders and international companies entering or operating in China and other jurisdictions.</p></details>
      <div class="internal-links">${related.map((item) => `<a href="${slugToUrl(item.slug)}">${item.title}</a>`).join("")}<a href="/services/">All Services</a><a href="/contact/">Contact ZYS</a></div>
    </article>
    <aside class="sidebar"><h3>Request a proposal</h3><p>Tell us your jurisdiction, business model and required timeline.</p><a class="btn btn-primary" href="/contact/">Send Inquiry</a><div class="mini-list"><strong>Related keywords</strong><span>${service.keyword}</span><span>Business Advisory China</span><span>Foreign Investment in China</span><span>International Business Advisory</span></div></aside>
  </div></section>${ctaBlock(`Need help with ${service.title}?`)}`;
}

function blogCard(post) {
  return `<article class="card"><span class="tag">${post.category}</span><h3>${post.title}</h3><p>${post.description}</p><a href="/blog/${post.slug}/">Read draft</a></article>`;
}

const pages = [];
function addPage(filePath, html) {
  pages.push({ filePath, html });
}

addPage("index.html", layout({
  title: "ZYS Advisory | China Company Registration, Tax & Business Advisory",
  description: "ZYS Advisory provides China company registration, WFOE setup, tax, accounting, payroll, audit, visa, licensing and international business advisory services.",
  pagePath: "/",
  active: "Home",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }]), faqSchema()],
  body: `<section class="hero"><img src="/assets/zys-advisory-hero.webp" alt="International business advisory consultants for China company registration and tax planning" title="International business advisory services" fetchpriority="high" width="1672" height="941"><div class="container hero-content"><span class="eyebrow">International Business Advisory Services</span><h1>China Company Registration, Tax, Accounting and Global Expansion Advisory</h1><p>ZYS Advisory helps international founders, investors and companies register businesses, enter China, manage tax and accounting, hire teams, secure visas and stay compliant across key global jurisdictions.</p><div class="hero-actions"><a class="btn btn-primary" href="/services/china-company-registration/">Register Company in China</a><a class="btn btn-light" href="/contact/">Book Consultation</a></div></div></section>
  <section><div class="container section-head"><div><span class="eyebrow">High-value services</span><h2>Business advisory for market entry, compliance and growth.</h2></div><p>From WFOE registration and Hong Kong company setup to China tax consultant support, payroll, audit, visa and licensing, ZYS builds the operating foundation for international companies.</p></div><div class="container">${serviceCards(services.slice(0, 12))}</div></section>
  <section class="band"><div class="container split"><div><span class="eyebrow">Why ZYS Advisory</span><h2>Practical execution for foreign investment in China and global company formation.</h2><p>Our advisory process covers structure selection, business scope, licensing, accounting, China tax, payroll, banking preparation, compliance calendars and ongoing governance.</p><div class="metric-grid"><span><strong>30+</strong>Service pages</span><span><strong>100</strong>SEO blog drafts</span><span><strong>Global</strong>Client support</span></div></div><div class="case-box"><strong>Typical client outcome</strong><p>A foreign investor compares China WFOE, Hong Kong, Singapore and Dubai structures, then receives a registration roadmap, tax filing plan, payroll process and banking preparation checklist.</p></div></div></section>
  <section><div class="container section-head"><div><span class="eyebrow">SEO insights</span><h2>Latest business advisory guides.</h2></div><a class="btn btn-primary" href="/blog/">View Blog</a></div><div class="container card-grid">${posts.slice(0, 6).map(blogCard).join("")}</div></section>${ctaBlock()}`
}));

addPage("services/index.html", layout({
  title: "Business Advisory Services | China Company Registration, Tax, Payroll",
  description: "Explore 30+ ZYS Advisory services including China company registration, WFOE, Hong Kong, Singapore, Dubai, US LLC, accounting, tax, payroll, audit, visa and licensing.",
  pagePath: "/services/",
  active: "Services",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services/" }]), faqSchema()],
  body: `${pageHero("International Business Advisory Services", "Company registration, tax, accounting, payroll, audit, visa, licensing and compliance support for international companies.", "Services")}<section><div class="container">${serviceGroups.map(([name, desc]) => `<div class="group-block"><div class="section-head"><div><span class="eyebrow">${name}</span><h2>${desc}</h2></div></div>${serviceCards(services.filter((service) => service.group === name))}</div>`).join("")}</div></section>${ctaBlock()}`
}));

for (const service of services) {
  addPage(`services/${service.slug}/index.html`, layout({
    title: `${service.title} | ${service.keyword} | ZYS Advisory`,
    description: `${service.description} ZYS supports international clients with business advisory, tax, accounting and compliance execution.`,
    pagePath: slugToUrl(service.slug),
    active: "Services",
    schemas: [serviceSchema(service), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services/" }, { name: service.title, url: slugToUrl(service.slug) }]), faqSchema(service)],
    body: servicePage(service)
  }));
}

addPage("blog/index.html", layout({
  title: "Business Advisory Blog | China Company Registration, Tax & Compliance",
  description: "Read 100 SEO-optimized draft articles about China company registration, WFOE setup, accounting, tax, payroll, visa, licensing and global expansion.",
  pagePath: "/blog/",
  active: "Blog",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog/" }])],
  body: `${pageHero("Business Advisory Blog", "Draft insights for international founders, investors and finance teams researching China and global business setup.", "Blog")}<section><div class="container category-row">${blogCategories.map((cat) => `<a href="#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${cat}</a>`).join("")}</div><div class="container card-grid">${posts.map(blogCard).join("")}</div></section>`
}));

for (const post of posts) {
  addPage(`blog/${post.slug}/index.html`, layout({
    title: `${post.title} | ZYS Advisory`,
    description: post.description,
    pagePath: `/blog/${post.slug}/`,
    active: "Blog",
    type: "article",
    schemas: [articleSchema(post), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog/" }, { name: post.title, url: `/blog/${post.slug}/` }])],
    body: `${pageHero(post.title, post.description, post.title)}<section><div class="container article"><span class="tag">${post.category}</span><p><strong>Target keyword:</strong> ${post.keyword}</p><h2>Overview</h2><p>This draft is prepared for international business owners researching ${post.keyword}. It explains the commercial context, compliance priorities, document planning and practical next steps before engaging an advisor.</p><h2>Key considerations</h2><ul><li>Confirm the correct legal structure and operating jurisdiction.</li><li>Review tax, accounting, payroll and reporting obligations before launch.</li><li>Prepare shareholder, director, business activity and address documents early.</li><li>Plan banking, invoicing, licensing and annual compliance requirements.</li></ul><h2>How ZYS Advisory can help</h2><p>ZYS supports China company registration, WFOE setup, Hong Kong company registration, Singapore company registration, Dubai company registration, US LLC formation, China accounting service, China tax consultant work, payroll, audit, visa and licensing projects.</p><div class="internal-links"><a href="/services/">View Services</a><a href="/services/china-company-registration/">China Company Registration</a><a href="/services/china-tax-consultant/">China Tax Consultant</a><a href="/contact/">Contact ZYS</a></div></div></section>${ctaBlock("Need a tailored advisory roadmap?")}`
  }));
}

addPage("case-studies/index.html", layout({
  title: "International Business Advisory Case Studies | ZYS Advisory",
  description: "Explore sample case studies for China company registration, tax, accounting, payroll, visa and international expansion advisory projects.",
  pagePath: "/case-studies/",
  active: "Case Studies",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Case Studies", url: "/case-studies/" }])],
  body: `${pageHero("Case Studies", "Example advisory scenarios for international companies entering China and global markets.", "Case Studies")}<section><div class="container card-grid">${["China WFOE setup for B2B services","Hong Kong trading company with China tax planning","Payroll and work permit support for a China team","Dubai and Singapore structure comparison","US LLC formation for international e-commerce","China import-export license planning"].map((title) => `<article class="card"><span class="tag">Case Study</span><h3>${title}</h3><p>ZYS mapped the registration path, compliance risks, tax considerations and operational next steps for an international client.</p><a href="/contact/">Discuss a similar project</a></article>`).join("")}</div></section>${ctaBlock()}`
}));

addPage("contact/index.html", layout({
  title: "Contact ZYS Advisory | China Company Registration & Tax Consultant",
  description: "Contact ZYS Advisory for China company registration, WFOE setup, China tax consultant, accounting, payroll, visa, licensing and international business advisory support.",
  pagePath: "/contact/",
  active: "Contact",
  schemas: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact/" }]), faqSchema()],
  body: `${pageHero("Contact ZYS Advisory", "Request a proposal for company registration, tax, accounting, payroll, visa, licensing or international expansion support.", "Contact")}<section><div class="container contact-grid"><div><h2>Tell us about your project</h2><p>ZYS supports international clients researching China Company Registration, Register Company in China, China Tax Consultant, China Accounting Service, Foreign Investment in China and Business Advisory China services.</p><div class="contact-list"><p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p><p><strong>Phone:</strong> <a href="tel:${contact.phone.replace(/\s/g, "")}">${contact.phone}</a></p><p><strong>Address:</strong> ${contact.address}</p></div></div><form class="form" action="mailto:${contact.email}" method="post" enctype="text/plain"><input name="name" placeholder="Your name" required><input name="email" type="email" placeholder="Email address" required><select name="service">${services.slice(0, 20).map((service) => `<option>${service.title}</option>`).join("")}</select><textarea name="message" placeholder="Tell us your target jurisdiction, business activity, shareholders and timeline."></textarea><button class="btn btn-primary" type="submit">Send Inquiry</button></form></div></section>`
}));

async function writeAssets() {
  await mkdir("dist/assets", { recursive: true });
  await copyFile("src/styles.css", "dist/styles.css");
  if (existsSync("assets/zys-advisory-hero.webp")) {
    await copyFile("assets/zys-advisory-hero.webp", "dist/assets/zys-advisory-hero.webp");
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
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Built ${pages.length} pages into dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
