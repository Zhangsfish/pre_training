import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4340';
const output = path.resolve(process.env.TEACHING_EVIDENCE_DIR || '../delivery/maintenance/teaching-artifacts/review');
const assets = JSON.parse(fs.readFileSync(new URL('../assets-manifest.json', import.meta.url), 'utf8')).assets;
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE ? { executablePath: process.env.CHROME_EXECUTABLE } : {}),
});

const screenshots = [];
try {
  for (const [width, label] of [[1366, 'desktop'], [375, 'mobile']]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const [route, locale] of [['/work/teaching/', 'zh'], ['/en/work/teaching/', 'en']]) {
      const response = await page.goto(base + route, { waitUntil: 'load' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.teaching-work').count(), 4);
      assert.equal(await page.locator('.teaching-preview-scroll').count(), 2);
      assert.equal(await page.locator('.teaching-work').nth(0).locator('.teaching-preview-page').count(), 21);
      assert.equal(await page.locator('.teaching-work').nth(1).locator('.teaching-preview-page').count(), 18);
      assert.equal(await page.locator('.teaching-preview-page img').count(), 39);
      await page.waitForFunction(() => [...document.querySelectorAll('.teaching-preview-page img')]
        .every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.locator('.teaching-download').count(), 2);
      assert.deepEqual(await page.locator('.teaching-download').evaluateAll(links => links.map(link => new URL(link.href).pathname).sort()), [
        '/downloads/teaching/kishi-reviewed.pdf', '/downloads/teaching/mhat-reviewed.pdf',
      ]);
      const html = await page.content();
      assert.ok(!/href="[^"]+\.(?:docx|pptx)/i.test(html), 'Original teaching file linked in HTML');
      assert.ok(!/href="[^"]*(?:exam|end_term)[^"]*\.pdf/i.test(html), 'Exam PDF linked in HTML');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal page overflow at ${width} ${route}`);
      const scroll = page.locator('.teaching-preview-scroll').first();
      const scrolled = await scroll.evaluate(element => {
        element.scrollLeft = element.scrollWidth;
        return { left: element.scrollLeft, width: element.clientWidth, full: element.scrollWidth };
      });
      assert.ok(scrolled.full > scrolled.width && scrolled.left > 0, `Page preview browser cannot scroll at ${width} ${route}`);
      await page.locator('.teaching-preview-scroll').evaluateAll(elements => elements.forEach(element => { element.scrollLeft = 0; }));
      await page.evaluate(() => document.fonts.ready);
      const screenshot = path.join(output, `teaching-${locale}-${label}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      screenshots.push(screenshot);
      const sectionScreenshot = path.join(output, `teaching-${locale}-${label}-section.png`);
      await page.locator('.teaching-portfolio').screenshot({ path: sectionScreenshot });
      screenshots.push(sectionScreenshot);
    }
    await context.close();
  }
  const context = await browser.newContext();
  for (const href of ['/downloads/teaching/kishi-reviewed.pdf', '/downloads/teaching/mhat-reviewed.pdf']) {
    const response = await context.request.get(base + href);
    assert.equal(response.status(), 200, href);
    const body = await response.body();
    const asset = assets.find(item => item.path === href.slice(1));
    assert.ok(asset, `Missing manifest asset ${href}`);
    assert.equal(createHash('sha256').update(body).digest('hex'), asset.derived_sha256, href);
  }
  for (const filename of ['organic_synthesis_lab_i_page_01.jpg', 'organic_synthesis_lab_ii_page_18.jpg']) {
    const href = `/media/teaching/${filename}`;
    const response = await context.request.get(base + href);
    assert.equal(response.status(), 200, href);
    const asset = assets.find(item => item.path === href.slice(1));
    assert.equal(createHash('sha256').update(await response.body()).digest('hex'), asset.derived_sha256, href);
  }
  await context.close();
  console.log(JSON.stringify({ result: 'pass', screenshots, works: 4, preview_pages: 39, reviewed_pdfs: 2 }, null, 2));
} finally {
  await browser.close();
}
