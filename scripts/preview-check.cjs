const { chromium } = require('/Users/xiaorusun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
(async () => {
  await fs.mkdir('tmp/site-preview', { recursive: true });
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const { locales, corePaths } = await import('./localized-pages.js');
  const routes = ['/', '/about/', '/manufacturing-capability/', '/downloads/', ...Object.keys(locales).flatMap(code => corePaths.map(base => `/${code}${base}`)), '/news/railway-gangway-export-packing-receiving/'];
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(`http://localhost:3001${route}`);
      await page.locator('main img').evaluateAll(async images => { for (const image of images) { image.loading = 'eager'; await image.decode(); } });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (overflow) throw new Error(`Horizontal overflow: ${route} at ${width}`);
      if (await page.locator('h1').count() !== 1) throw new Error(`H1: ${route}`);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.screenshot({ path: `tmp/site-preview/${route.replace(/\//g, '-') || 'home'}-${width}.png`, fullPage: true });
    }
    await page.close();
  }
  await browser.close();
  console.log('Desktop/mobile preview checks passed: images, overflow and headings.');
})().catch(error => { console.error(error); process.exitCode = 1; });
