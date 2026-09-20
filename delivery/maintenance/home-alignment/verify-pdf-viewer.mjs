import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = (process.env.PORTFOLIO_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const output = path.resolve(process.env.PDF_EVIDENCE_DIR);
const inventory = JSON.parse(fs.readFileSync(process.env.PDF_INVENTORY, 'utf8'));
fs.mkdirSync(output, { recursive: true });
const profile = fs.mkdtempSync(path.join(output, 'chrome-profile-'));
const context = await chromium.launchPersistentContext(profile, {
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE,
  viewport: { width: 1440, height: 1000 },
});
const page = context.pages()[0] || await context.newPage();
const results = [];

async function getViewer() {
  await page.goto(base + '/downloads/zhang-shuo-resume.pdf');
  let viewer;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    viewer = page.frames().find((frame) => frame.url().startsWith('chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/'));
    if (viewer) break;
    await page.waitForTimeout(100);
  }
  assert.ok(viewer, 'Chrome native PDF viewer frame');
  await viewer.waitForFunction(() => {
    try { return document.querySelector('pdf-viewer').viewport.getPageScreenRect(0).width > 0; }
    catch { return false; }
  });
  return viewer;
}

async function clickAnnotation(viewer, annotation) {
  const geometry = await viewer.evaluate(() => {
    const pdfViewer = document.querySelector('pdf-viewer');
    return { rect: pdfViewer.viewport.getPageScreenRect(0), size: pdfViewer.viewport.size };
  });
  const [x1, y1, x2, y2] = annotation.rect;
  const point = {
    x: 1440 - geometry.size.width + geometry.rect.x + (x1 + x2) / 2 / inventory.width * geometry.rect.width,
    y: 1000 - geometry.size.height + geometry.rect.y + (inventory.height - (y1 + y2) / 2) / inventory.height * geometry.rect.height,
  };
  await page.mouse.click(point.x, point.y);
  return point;
}

try {
  const checked = inventory.annotations.filter((item) =>
    item.uri.startsWith('https://zhang-shuo-portfolio.vercel.app/work/')
    || item.uri === 'https://kin-portfolio-taupe.vercel.app/'
    || item.uri === 'https://github.com/Zhangsfish/qq-lingxi-agent-platform');
  assert.ok(checked.length >= 6);
  for (const [index, annotation] of checked.entries()) {
    const viewer = await getViewer();
    if (index === 0) await page.screenshot({ path: path.join(output, 'pdf-native-reader.png') });
    const point = await clickAnnotation(viewer, annotation);
    await page.waitForURL(annotation.uri, { timeout: 45000 });
    const response = await context.request.get(annotation.uri, { failOnStatusCode: false });
    assert.equal(response.status(), 200, annotation.uri);
    results.push({ uri: annotation.uri, final_url: page.url(), status: response.status(), click_point: point, result: 'native_viewer_click_pass' });
  }
  fs.writeFileSync(path.join(output, 'pdf-viewer-results.json'), JSON.stringify({ browser: context.browser().version(), checked_at: new Date().toISOString(), results }, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await context.close();
  fs.rmSync(profile, { recursive: true, force: true });
}
