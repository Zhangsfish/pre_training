import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const dir=path.dirname(fileURLToPath(import.meta.url));
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:4321';
const prefix=base.startsWith('https:')?'production':'local';
const output=path.join(dir,'screenshots');fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
const results=[];
try{
 for(const width of [320,375,768,1024,1170,1200,1366,1920]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  assert.equal((await page.goto(base,{waitUntil:'load'})).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const boxes=await page.locator('.apps-grid > .app-showcase').evaluateAll(nodes=>nodes.map(node=>{
   const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};
  }));
  assert.equal(boxes.length,2);
  const sameRow=Math.abs(boxes[0].y-boxes[1].y)<1;
  assert.equal(sameRow,width>=1200,`Wrong app wrapping at ${width}px`);
  if(sameRow)assert.ok(boxes[1].x>=boxes[0].x+boxes[0].width);
  else assert.ok(boxes[1].y>=boxes[0].bottom);
  assert.ok(await page.locator('.app-showcase').evaluateAll(nodes=>nodes.every(node=>{
   const card=node.getBoundingClientRect();
   return [...node.querySelectorAll('video,.app-carousel-image,.app-film-languages,.app-carousel-controls')].every(el=>{
    const r=el.getBoundingClientRect();return r.left>=card.left-1&&r.right<=card.right+1;
   });
  })));
  assert.equal(await page.getByRole('heading',{name:/推广计划|推广构想/}).count(),0);
  assert.ok(!(await page.locator('.apps-grid').textContent()).includes('推广构想'));
  assert.ok((await page.locator('.app-lecture-asset .app-narrative').textContent()).includes('OCR 索引、AI 阅读说明和 JPG 原图'));
  assert.ok((await page.locator('.app-everwhile .app-narrative').textContent()).includes('刷视频、看小说时'));
  assert.deepEqual(errors,[]);
  results.push({width,layout:sameRow?'two projects in one row':'two project rows',boxes,page_errors:errors,overflow:false});
  if([375,768,1366].includes(width)){
   await page.screenshot({path:path.join(output,`${prefix}-home-${width}.png`)});
   for(const video of await page.locator('.apps-grid [data-app-film]').all()){
    await video.evaluate(async v=>{v.muted=true;await v.play();v.pause();await new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});v.currentTime=10;});});
   }
   await page.locator('.apps-grid').screenshot({path:path.join(output,`${prefix}-apps-${width}.png`)});
   assert.deepEqual(errors,[]);
  }
  await context.close();
 }
}finally{await browser.close()}
fs.writeFileSync(path.join(dir,`${prefix}-layout.json`),JSON.stringify({checked_at:new Date().toISOString(),base,results},null,2)+'\n');
console.log(`PASS: ${prefix} 8 viewport layouts, compact desktop row, wrapping, approved copy and no marketing section`);
