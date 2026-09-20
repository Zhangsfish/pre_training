import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(import.meta.dirname, '../../..');
const distRoot = path.join(root, 'site', 'dist');
const base = (process.env.PORTFOLIO_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const output = path.resolve(process.env.FINAL_EVIDENCE_DIR || path.join(import.meta.dirname, 'attempt-02', 'browser-final'));
const verifyDist = process.env.VERIFY_DIST === '1';
const links = JSON.parse(fs.readFileSync(path.join(root, 'site', 'LINKS.json'), 'utf8')).links;
const linkById = (id) => links.find((item) => item.id === id);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const routes = ['/', '/work/qq-lingxi/', '/work/spps/', '/work/kin/', '/work/pet/', '/work/teaching/', '/work/natural-product/', '/resume/'];
const caseChecks = {
  '/work/qq-lingxi/': ['累计约10天', 'ChatGPT', '两轮集中迭代'],
  '/work/spps/': ['约150万元', '低约88%', '减少约97%', '2名机械', '1名加工', '1名电控'],
  '/work/kin/': ['Now', 'Today', 'Data', '状态消费', '2.85亿', '5亿'],
  '/work/pet/': ['“0.5”补到“1”', '68分钟', '约4小时', '4,000元', '第一作者论文初稿', '预计形成2项专利申请'],
  '/work/teaching/': ['19名', '5名', '约8个', '3条', '91个', '教材', '第四学期'],
  '/work/natural-product/': ['2022.09–2023.11', '约100g', '约5人', '约10名'],
};

fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE });
const report = {
  base,
  checked_at: new Date().toISOString(),
  browser: browser.version(),
  authentication: 'fresh anonymous browser contexts; no persistent profile',
  routes: [],
  interactions: {},
  external: [],
  distribution: {},
};

async function warmLazyContent(page) {
  const lazyImages = page.locator('img[loading="lazy"]');
  for (let index = 0; index < await lazyImages.count(); index += 1) {
    const image = lazyImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.complete && element.naturalWidth > 0
      ? true
      : new Promise((resolve) => element.addEventListener('load', () => resolve(true), { once: true })));
  }
  const previews = page.locator('[data-preview]');
  for (let index = 0; index < await previews.count(); index += 1) {
    await previews.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
}

try {
  for (const width of [375, 1366]) {
    const context = await browser.newContext({ viewport: { width, height: width === 375 ? 812 : 900 } });
    let page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${width} ${route}`);
      assert.equal(await page.locator('h1').count(), 1, `${route} has one h1`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${route} has no overflow`);
      const body = await page.locator('body').textContent();
      assert.ok(!body.includes('Codex'), `${route} has no public Codex label`);
      assert.ok(!body.includes('研究经历与进展收录于简历'), `${route} has no stale PET placeholder`);
      for (const marker of caseChecks[route] || []) assert.ok(body.includes(marker), `${route} includes ${marker}`);
      await warmLazyContent(page);
      const filename = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
      await page.screenshot({ path: path.join(output, `${filename}-${width}.png`), fullPage: true });
      report.routes.push({ width, route, status: 200, title: await page.title(), scroll_width: await page.evaluate(() => document.documentElement.scrollWidth) });
    }

    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const firstWorkTop = await page.locator('.work-section').first().evaluate((element) => element.getBoundingClientRect().top);
    assert.ok(firstWorkTop < (width === 375 ? 500 : 450), `first work is visible quickly at ${width}`);
    assert.deepEqual(await page.locator('.work-section').evaluateAll((nodes) => nodes.map((node) => node.className.split('work-')[2])), ['qq-lingxi', 'spps', 'kin']);
    for (const id of ['work', 'about', 'teaching', 'pet', 'natural-product', 'contact']) assert.equal(await page.locator(`#${id}`).count(), 1, `${id} reachable`);

    if (width === 1366) {
      await page.close();
      page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      const scene = page.getByRole('button', { name: '02 找到共同体', exact: true });
      await scene.focus();
      await page.keyboard.press('Enter');
      assert.equal(await scene.getAttribute('aria-pressed'), 'true');
      const zoom = page.getByRole('button', { name: '放大QQ 灵犀画面', exact: true });
      await zoom.focus();
      await page.keyboard.press('Enter');
      assert.ok(await page.locator('dialog').evaluate((dialog) => dialog.open));
      await page.keyboard.press('Escape');
      assert.ok(!(await page.locator('dialog').evaluate((dialog) => dialog.open)));
      assert.ok(await zoom.evaluate((element) => document.activeElement === element));
      report.interactions.keyboard_scene_zoom_escape_focus = 'pass';

      report.interactions.primary_films = [];
      for (const name of ['观看完整演示 2:52', '观看设备运行视频', '观看概念短片 0:50']) {
        console.log(`verifying primary film: ${name}`);
        const opener = page.getByRole('button', { name, exact: true });
        await opener.click();
        assert.ok(await page.locator('dialog').evaluate((dialog) => dialog.open));
        const video = page.locator('dialog video');
        await page.waitForFunction(() => {
          const video = document.querySelector('dialog video');
          return video && video.readyState >= 2 && video.videoWidth > 0;
        }, {}, { timeout: 120000 });
        await video.evaluate((element) => element.play());
        const before = await video.evaluate((element) => element.currentTime);
        await page.waitForTimeout(900);
        const after = await video.evaluate((element) => element.currentTime);
        assert.ok(after > before, `${name} advances`);
        await page.getByRole('button', { name: '关闭预览', exact: true }).click();
        assert.ok(await opener.evaluate((element) => document.activeElement === element));
        report.interactions.primary_films.push({ name, before, after, focus_return: true });
      }

      await page.goto(base + '/work/spps/', { waitUntil: 'networkidle' });
      const directSpps = page.locator('video[aria-label="设备运行视频"]');
      await directSpps.scrollIntoViewIfNeeded();
      await directSpps.evaluate(async (video) => { video.muted = true; await video.play(); });
      await page.waitForTimeout(700);
      assert.ok(await directSpps.evaluate((video) => video.readyState >= 2 && video.videoWidth > 0 && video.currentTime > 0));
      const secondSpps = page.getByRole('button', { name: /另一段运行实拍/ });
      await secondSpps.click();
      await page.waitForFunction(() => {
        const video = document.querySelector('dialog video');
        return video && video.readyState >= 2 && video.videoWidth > 0;
      }, {}, { timeout: 120000 });
      assert.ok((await page.locator('dialog video').getAttribute('src')).includes('spps-monitor.mp4'));
      await page.keyboard.press('Escape');
      assert.ok(await secondSpps.evaluate((element) => document.activeElement === element));
      report.interactions.spps_two_films = 'decoded';

      await page.goto(base + '/work/kin/', { waitUntil: 'networkidle' });
      assert.ok(await page.locator('details.case-deeper').evaluate((details) => details.open));
      assert.ok(await page.locator(`a[href="${linkById('kin-demo').url}"]`).isVisible());
      report.interactions.kin_market_open_and_demo_visible = true;

      await page.goto(base + '/work/qq-lingxi/', { waitUntil: 'networkidle' });
      assert.ok(await page.getByRole('link', { name: /独立 Demo（需访问权限）/ }).isVisible());
      report.interactions.qq_access_notice_visible = true;

      await page.goto(base + '/work/teaching/', { waitUntil: 'networkidle' });
      for (const id of ['notion-organic-synthesis', 'notion-organic-chemistry']) assert.ok(await page.locator(`a[href="${linkById(id).url}"]`).isVisible(), `${id} visible`);
      report.interactions.notion_links_visible = true;

      await page.goto(base + '/work/spps/', { waitUntil: 'networkidle' });
      const more = page.locator('details.case-deeper');
      assert.ok(!(await more.evaluate((details) => details.open)));
      const summary = more.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.ok(await more.evaluate((details) => details.open));
      report.interactions.details_keyboard_toggle = 'pass';
    }
    assert.deepEqual(errors, []);
    await context.close();
  }

  const reduced = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base + '/', { waitUntil: 'networkidle' });
  assert.ok(await reducedPage.locator('[data-preview]').evaluateAll((videos) => videos.every((video) => !video.getAttribute('src'))));
  report.interactions.reduced_motion_preview_download = 'suppressed';
  await reduced.close();

  const anonymous = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const notFoundPage = await anonymous.newPage();
  const notFoundResponse = await notFoundPage.goto(base + '/maintenance-final-not-found/', { waitUntil: 'networkidle' });
  assert.equal(notFoundResponse.status(), 404);
  await notFoundPage.screenshot({ path: path.join(output, '404-1366.png'), fullPage: true });
  report.distribution.not_found = 404;

  const pdfResponse = await anonymous.request.get(base + '/downloads/zhang-shuo-resume.pdf');
  assert.equal(pdfResponse.status(), 200);
  const pdfBytes = await pdfResponse.body();
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'publication', 'resume-manifest.json'), 'utf8'));
  assert.equal(sha256(pdfBytes), manifest.sha256);
  report.distribution.pdf = { status: 200, bytes: pdfBytes.length, sha256: sha256(pdfBytes) };

  for (const id of ['kin-demo', 'qq-lingxi-repo', 'notion-organic-synthesis', 'notion-organic-chemistry']) {
    const item = linkById(id);
    const page = await anonymous.newPage();
    let response = null;
    let error = null;
    try {
      response = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(id.startsWith('notion-') ? 7000 : 2000);
    } catch (caught) {
      error = caught.message;
    }
    const entry = {
      id,
      requested_url: item.url,
      status: response?.status() ?? null,
      final_url: page.url(),
      title: await page.title().catch(() => ''),
      visible_text_length: await page.locator('body').innerText().then((text) => text.trim().length).catch(() => 0),
      error,
    };
    assert.equal(entry.error, null, `${id} browser load`);
    assert.equal(entry.status, 200, `${id} status`);
    assert.ok(entry.visible_text_length > 100, `${id} meaningful visible content`);
    report.external.push(entry);
    await page.close();
  }
  const qqDemo = linkById('qq-lingxi-demo');
  const qqDemoResponse = await anonymous.request.get(qqDemo.url, { failOnStatusCode: false });
  assert.equal(qqDemoResponse.status(), 401);
  report.external.push({ id: 'qq-lingxi-demo', requested_url: qqDemo.url, status: 401, result: 'Basic Auth remains; no bypass attempted' });

  if (verifyDist) {
    const verified = [];
    for (const entry of fs.readdirSync(distRoot, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile())) {
      const file = path.join(entry.parentPath, entry.name);
      const relative = path.relative(distRoot, file).replaceAll('\\', '/');
      let urlPath = '/' + relative;
      if (relative === 'index.html') urlPath = '/';
      else if (relative.endsWith('/index.html')) urlPath = '/' + relative.slice(0, -'index.html'.length);
      const response = await anonymous.request.get(base + urlPath);
      assert.equal(response.status(), 200, `${relative} status`);
      const remote = await response.body();
      assert.equal(sha256(remote), sha256(fs.readFileSync(file)), `${relative} hash`);
      verified.push({ path: relative, bytes: remote.length, sha256: sha256(remote) });
    }
    report.distribution.remote_files = verified;
    report.distribution.remote_file_count = verified.length;
    report.distribution.remote_total_bytes = verified.reduce((sum, item) => sum + item.bytes, 0);
  }
  await anonymous.close();

  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
