// Run against the real Astro preview, not a SPA fallback server.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:4321';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const results=[];
try{
 for(const width of [375,1366]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/work/qq-lingxi/','/work/spps/','/work/kin/','/work/pet/','/resume/']){
   const r=await page.goto(base+route,{waitUntil:'load'});assert.equal(r.status(),200);assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));results.push({width,route,status:200});
  }
  await page.goto(base+'/');assert.ok(await page.locator('[data-preview]').evaluateAll(vs=>vs.every(v=>!v.getAttribute('src'))),'Reduced motion must not auto-download previews');
  await page.getByRole('button',{name:'02 找到共同体',exact:true}).click();assert.equal(await page.getByRole('button',{name:'02 找到共同体',exact:true}).getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:'放大QQ 灵犀画面',exact:true}).click();assert.ok(await page.locator('dialog').evaluate(d=>d.open));await page.keyboard.press('Escape');assert.ok(!(await page.locator('dialog').evaluate(d=>d.open)));
  for(const name of ['观看完整演示 2:52','观看设备运行视频','观看概念短片 0:50']){
   await page.getByRole('button',{name,exact:true}).click();await page.waitForFunction(()=>{const v=document.querySelector('dialog video');return v&&v.readyState>=2&&v.videoWidth>0});assert.ok(await page.locator('dialog video').evaluate(v=>v.duration>0&&!v.error));await page.getByRole('button',{name:'关闭预览',exact:true}).click();
  }
  assert.deepEqual(errors,[]);await ctx.close();
 }
 const ctx=await browser.newContext();const page=await ctx.newPage();const r=await page.goto(base+'/this-page-does-not-exist/');assert.equal(r.status(),404);
 const pdf=await ctx.request.get(base+'/downloads/zhang-shuo-resume.pdf');assert.equal(pdf.status(),200);const expected=JSON.parse(fs.readFileSync(new URL('../../publication/resume-manifest.json',import.meta.url))).sha256;assert.equal(createHash('sha256').update(await pdf.body()).digest('hex'),expected);await ctx.close();
 console.log(JSON.stringify({results,media:'decoded',modal:'pass',reduced_motion:'pass',pdf:'hash matched',not_found:404},null,2));
}finally{await browser.close()}
