import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = (process.env.PORTFOLIO_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE });

try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion });
    const page = await context.newPage();
    const events = [];
    page.on('response', (response) => {
      if (response.url().includes('/media/')) events.push({ kind: 'response', status: response.status(), url: response.url() });
    });
    page.on('requestfailed', (request) => {
      if (request.url().includes('/media/')) events.push({ kind: 'failed', error: request.failure()?.errorText, url: request.url() });
    });
    await page.goto(base + '/', { waitUntil: 'load' });
    const opener = page.getByRole('button', { name: '观看完整演示 2:52', exact: true });
    await opener.click();
    await page.waitForTimeout(30000);
    const video = await page.locator('dialog video').evaluate((element) => ({
      src: element.currentSrc,
      readyState: element.readyState,
      networkState: element.networkState,
      videoWidth: element.videoWidth,
      duration: element.duration,
      currentTime: element.currentTime,
      paused: element.paused,
      error: element.error ? { code: element.error.code, message: element.error.message } : null,
    }));
    console.log(JSON.stringify({ reducedMotion, video, events }, null, 2));
    await context.close();
  }
} finally {
  await browser.close();
}
