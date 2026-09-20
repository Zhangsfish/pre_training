import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = (process.env.PORTFOLIO_URL || 'https://zhang-shuo-portfolio.vercel.app').replace(/\/$/, '');
const chrome = process.env.CHROME_EXECUTABLE;
const repoRoot = path.resolve(import.meta.dirname, '../../..');
const distRoot = path.join(repoRoot, 'site', 'dist');
const links = JSON.parse(fs.readFileSync(path.join(repoRoot, 'site', 'LINKS.json'), 'utf8')).links;
const outDir = path.resolve(process.env.PRODUCTION_EVIDENCE_DIR || path.join(import.meta.dirname, 'attempt-02', 'production-browser'));
fs.mkdirSync(outDir, { recursive: true });

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const cleanName = (value) => value.replace(/^\/+|\/+$/g, '').replaceAll('/', '-') || 'home';
const browser = await chromium.launch({ headless: true, ...(chrome ? { executablePath: chrome } : {}) });
const report = {
  base,
  checked_at: new Date().toISOString(),
  browser: 'Chromium incognito contexts; no persistent profile or stored cookies',
  routes: [],
  interactions: {},
  distribution: {},
  external_links: [],
};

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await desktop.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const route of ['/', '/work/qq-lingxi/', '/work/spps/', '/work/kin/', '/work/pet/', '/resume/']) {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator('h1').count(), 1, `${route} has one h1`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} has no horizontal overflow`);
    await page.screenshot({ path: path.join(outDir, `${cleanName(route)}-1440.png`), fullPage: true });
    report.routes.push({ route, width: 1440, status: 200, title: await page.title(), h1: await page.locator('h1').innerText() });
  }

  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '02 找到共同体', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: '02 找到共同体', exact: true }).getAttribute('aria-pressed'), 'true');
  const zoomOpener = page.getByRole('button', { name: '放大QQ 灵犀画面', exact: true });
  await zoomOpener.click();
  assert.ok(await page.locator('dialog').evaluate((dialog) => dialog.open));
  await page.screenshot({ path: path.join(outDir, 'qq-zoom-1440.png') });
  await page.keyboard.press('Escape');
  assert.ok(!(await page.locator('dialog').evaluate((dialog) => dialog.open)));
  assert.ok(await zoomOpener.evaluate((element) => document.activeElement === element));
  report.interactions.scene_switch = 'pass';
  report.interactions.zoom_escape_focus_return = 'pass';

  const films = [
    ['观看完整演示 2:52', 172],
    ['观看设备运行视频', 19],
    ['观看概念短片 0:50', 49],
  ];
  report.interactions.films = [];
  for (const [name, minimumDuration] of films) {
    const opener = page.getByRole('button', { name, exact: true });
    await opener.click();
    await page.waitForFunction(() => {
      const video = document.querySelector('dialog video');
      return video && video.readyState >= 2 && video.videoWidth > 0;
    });
    const video = page.locator('dialog video');
    const initial = await video.evaluate((element) => ({ duration: element.duration, time: element.currentTime, error: element.error?.message || null }));
    assert.ok(initial.duration >= minimumDuration && !initial.error, `${name} decoded`);
    await video.evaluate((element) => element.play());
    await page.waitForTimeout(1200);
    const laterTime = await video.evaluate((element) => element.currentTime);
    assert.ok(laterTime > initial.time, `${name} advances`);
    await page.screenshot({ path: path.join(outDir, `film-${report.interactions.films.length + 1}-1440.png`) });
    await page.getByRole('button', { name: '关闭预览', exact: true }).click();
    assert.ok(await opener.evaluate((element) => document.activeElement === element));
    report.interactions.films.push({ name, duration: initial.duration, advanced_from: initial.time, advanced_to: laterTime, close_focus_return: true });
  }
  assert.deepEqual(pageErrors, []);
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobile.newPage();
  for (const route of ['/', '/work/qq-lingxi/', '/work/spps/', '/work/kin/', '/work/pet/', '/resume/']) {
    const response = await mobilePage.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, `mobile ${route}`);
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(scrollWidth <= 375, `mobile ${route} no overflow`);
    await mobilePage.screenshot({ path: path.join(outDir, `${cleanName(route)}-375.png`), fullPage: true });
    report.routes.push({ route, width: 375, status: 200, scroll_width: scrollWidth });
  }
  await mobile.close();

  const reduced = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base + '/', { waitUntil: 'networkidle' });
  assert.ok(await reducedPage.locator('[data-preview]').evaluateAll((videos) => videos.every((video) => !video.getAttribute('src'))));
  report.interactions.reduced_motion_preview_download = 'suppressed';
  await reduced.close();

  const requestContext = await browser.newContext();
  const request = requestContext.request;
  const homeResponse = await request.get(base + '/');
  assert.equal(homeResponse.status(), 200);
  assert.ok(homeResponse.headers()['strict-transport-security'], 'HSTS header present');
  report.distribution.https = base.startsWith('https://');
  report.distribution.hsts = homeResponse.headers()['strict-transport-security'];

  const files = fs.readdirSync(distRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
  const verifiedFiles = [];
  for (const file of files) {
    const relative = path.relative(distRoot, file).replaceAll('\\', '/');
    let urlPath;
    if (relative === 'index.html') urlPath = '/';
    else if (relative.endsWith('/index.html')) urlPath = '/' + relative.slice(0, -'index.html'.length);
    else urlPath = '/' + relative;
    const response = await request.get(base + urlPath);
    assert.equal(response.status(), 200, `${relative} status`);
    const body = await response.body();
    assert.equal(sha256(body), sha256(fs.readFileSync(file)), `${relative} hash`);
    verifiedFiles.push({ path: relative, bytes: body.length, sha256: sha256(body) });
  }
  report.distribution.files = verifiedFiles;
  report.distribution.file_count = verifiedFiles.length;
  report.distribution.total_bytes = verifiedFiles.reduce((sum, file) => sum + file.bytes, 0);

  const missing = await request.get(base + '/this-route-must-not-exist-r07/');
  assert.equal(missing.status(), 404);
  assert.equal(sha256(await missing.body()), sha256(fs.readFileSync(path.join(distRoot, '404.html'))));
  report.distribution.not_found = { status: 404, body_hash_matches_dist: true };
  const missingPage = await requestContext.newPage();
  const missingPageResponse = await missingPage.goto(base + '/this-route-must-not-exist-r07/', { waitUntil: 'networkidle' });
  assert.equal(missingPageResponse.status(), 404);
  await missingPage.screenshot({ path: path.join(outDir, '404-1440.png'), fullPage: true });
  await missingPage.close();

  const pdf = await request.get(base + '/downloads/zhang-shuo-resume.pdf');
  assert.equal(pdf.status(), 200);
  report.distribution.pdf = { status: 200, bytes: (await pdf.body()).length, sha256: sha256(await pdf.body()) };

  const externalIds = ['qq-lingxi-demo', 'qq-lingxi-repo', 'notion-organic-synthesis', 'notion-organic-chemistry'];
  for (const id of externalIds) {
    const item = links.find((link) => link.id === id);
    assert.ok(item, id);
    const sourceRoute = id.startsWith('notion-') ? '/resume/' : '/work/qq-lingxi/';
    const sourcePage = await requestContext.newPage();
    const sourceResponse = await sourcePage.goto(base + sourceRoute, { waitUntil: 'networkidle' });
    assert.equal(sourceResponse.status(), 200);
    const sourceLink = sourcePage.locator(`a[href="${item.url}"]`).first();
    assert.ok(await sourceLink.isVisible(), `${id} is visible on ${sourceRoute}`);
    await sourcePage.close();
    const externalPage = await requestContext.newPage();
    let response;
    let error = null;
    try {
      response = await externalPage.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await externalPage.waitForTimeout(id.startsWith('notion-') ? 8000 : 2000);
    } catch (caught) {
      error = caught.message;
    }
    await externalPage.screenshot({ path: path.join(outDir, `external-${id}.png`), fullPage: true }).catch(() => {});
    const entry = {
      id,
      requested_url: item.url,
      status: response?.status() ?? null,
      final_url: externalPage.url(),
      title: await externalPage.title().catch(() => ''),
      body_text_length: await externalPage.locator('body').innerText().then((text) => text.trim().length).catch(() => 0),
      error,
      required: item.required,
      source_route: sourceRoute,
      source_link_visible: true,
    };
    if (item.required) {
      assert.equal(error, null, `${id} loads`);
      assert.ok(entry.status >= 200 && entry.status < 400, `${id} status`);
      assert.ok(entry.body_text_length > 20 || entry.title.length > 5, `${id} rendered content`);
    }
    report.external_links.push(entry);
    await externalPage.close();
  }
  await requestContext.close();

  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
