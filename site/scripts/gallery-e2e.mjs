// Run against the real Astro preview, not a SPA fallback server.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:4321';
const output=process.env.GALLERY_EVIDENCE_DIR?path.resolve(process.env.GALLERY_EVIDENCE_DIR):null;
if(output)fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const results=[];
try{
 for(const width of [375,1366]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/work/qq-lingxi/','/work/spps/','/work/kin/','/work/pet/','/work/teaching/','/work/natural-product/','/resume/']){
   const r=await page.goto(base+route,{waitUntil:'load'});assert.equal(r.status(),200);assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));results.push({width,route,status:200});
   if(output){const name=route==='/'?'home':route.split('/').filter(Boolean).join('-');await page.screenshot({path:path.join(output,`${name}-${width}.png`),fullPage:true});}
  }
  await page.goto(base+'/');
  for(const id of ['work','about','teaching','pet','natural-product','contact'])assert.equal(await page.locator('#'+id).count(),1);
  assert.deepEqual(await page.locator('#work > .work-section').evaluateAll(nodes=>nodes.map(n=>n.classList.contains('app-showcase')?n.classList.contains('app-lecture-asset')?'lecture-asset':'everwhile':n.className.split('work-')[2])),['lecture-asset','everwhile','qq-lingxi','spps','kin']);
  for(const [name,total] of [['Lecture Asset',6],['Everwhile',4]]){
   const carousel=page.locator(`[data-carousel][aria-label="${name}宣传截图"]`);
   assert.equal(await carousel.locator('[data-slide]:visible').count(),1);
   await carousel.getByRole('button',{name:`${name}下一张宣传截图`}).click();
   assert.equal(await carousel.locator('[data-count]').textContent(),`02 / ${String(total).padStart(2,'0')}`);
   await carousel.getByRole('button',{name:`放大${name}宣传截图`}).click();
   assert.ok(await page.locator('dialog').evaluate(d=>d.open));
   await page.keyboard.press('Escape');
   assert.ok(!(await page.locator('dialog').evaluate(d=>d.open)));
  }
  const lecture=page.locator('.app-lecture-asset');
  const lectureVideo=lecture.locator('[data-app-film]');
  assert.equal(await lectureVideo.getAttribute('preload'),'none');
  assert.equal(await lecture.locator('[aria-pressed=true]').textContent(),'中文');
  async function decode(video,selector,duration){
   await video.evaluate(v=>{v.muted=true;return v.play()});
   await page.waitForFunction(selector=>{const v=document.querySelector(selector);return v&&v.readyState>=2&&v.currentTime>.1&&v.videoWidth>0},selector);
   assert.ok(await video.evaluate((v,d)=>Math.abs(v.duration-d)<.1&&v.videoWidth===720&&!v.error,duration));
   await video.evaluate(v=>v.pause());
  }
  await decode(lectureVideo,'.app-lecture-asset [data-app-film]',20.4);
  const english=lecture.getByRole('button',{name:'English',exact:true});
  await english.focus();await page.keyboard.press('Enter');
  assert.equal(await english.getAttribute('aria-pressed'),'true');
  assert.ok(await lectureVideo.evaluate(v=>v.paused&&v.currentTime===0));
  await decode(lectureVideo,'.app-lecture-asset [data-app-film]',20.4);
  assert.ok((await lectureVideo.evaluate(v=>v.currentSrc)).endsWith('/lecture-film-en.mp4'));
  if(output)await page.screenshot({path:path.join(output,`lecture-english-${width}.png`),fullPage:true});
  await lecture.getByRole('button',{name:'中文',exact:true}).click();
  await decode(lectureVideo,'.app-lecture-asset [data-app-film]',20.4);
  assert.ok((await lectureVideo.evaluate(v=>v.currentSrc)).endsWith('/lecture-film-zh.mp4'));
  const everwhile=page.locator('.app-everwhile');
  assert.equal(await everwhile.locator('[data-app-film-language]').count(),0);
  await decode(everwhile.locator('[data-app-film]'),'.app-everwhile [data-app-film]',18);
  assert.ok((await everwhile.locator('[data-app-film]').evaluate(v=>v.currentSrc)).endsWith('/everwhile-film-en.mp4'));
  if(output)await page.screenshot({path:path.join(output,`everwhile-english-${width}.png`),fullPage:true});
  assert.equal(await page.getByRole('link',{name:/App Store.*下载/}).count(),0);
  assert.ok(await page.locator('[data-preview]').evaluateAll(vs=>vs.every(v=>!v.getAttribute('src'))),'Reduced motion must not auto-download previews');
  await page.getByRole('button',{name:'02 找到共同体',exact:true}).click();assert.equal(await page.getByRole('button',{name:'02 找到共同体',exact:true}).getAttribute('aria-pressed'),'true');
  const zoom=page.getByRole('button',{name:'放大QQ 灵犀画面',exact:true});await zoom.click();assert.ok(await page.locator('dialog').evaluate(d=>d.open));if(output)await page.screenshot({path:path.join(output,`qq-zoom-${width}.png`)});await page.keyboard.press('Escape');assert.ok(!(await page.locator('dialog').evaluate(d=>d.open)));assert.ok(await zoom.evaluate(el=>document.activeElement===el));
  for(const name of ['观看完整演示 2:52','观看设备运行视频','观看概念短片 0:50']){
   const opener=page.getByRole('button',{name,exact:true});await opener.click();await page.waitForFunction(()=>{const v=document.querySelector('dialog video');return v&&v.readyState>=2&&v.videoWidth>0});assert.ok(await page.locator('dialog video').evaluate(v=>v.duration>0&&!v.error));if(output&&width===1366)await page.screenshot({path:path.join(output,`film-${name.replace(/[^\p{L}\p{N}]+/gu,'-')}.png`)});await page.getByRole('button',{name:'关闭预览',exact:true}).click();assert.ok(await opener.evaluate(el=>document.activeElement===el));
  }
  assert.deepEqual(errors,[]);await ctx.close();
 }
 const ctx=await browser.newContext();const page=await ctx.newPage();const r=await page.goto(base+'/this-page-does-not-exist/');assert.equal(r.status(),404);
 const pdf=await ctx.request.get(base+'/downloads/zhang-shuo-resume.pdf');assert.equal(pdf.status(),200);const expected=JSON.parse(fs.readFileSync(new URL('../../publication/resume-manifest.json',import.meta.url))).sha256;assert.equal(createHash('sha256').update(await pdf.body()).digest('hex'),expected);await ctx.close();
 console.log(JSON.stringify({results,media:'decoded: Lecture zh/en, Everwhile en, QQ, SPPS, KIN',language_switch:'keyboard/pass; pauses and resets playback',modal:'pass',reduced_motion:'pass',pdf:'hash matched',not_found:404},null,2));
}finally{await browser.close()}
