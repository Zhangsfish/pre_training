import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { loadContent, publicView, root } from '../scripts/content.mjs';
const require=createRequire(import.meta.url);
const { chromium }=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const outputIndex=process.argv.indexOf('--output');
const output=outputIndex>=0 ? path.resolve(root,process.argv[outputIndex+1]) : path.join(root,'delivery/audits/R02/attempt-01');
fs.mkdirSync(output,{recursive:true});
const view=publicView(loadContent());
const expected={name:view.profile.name,romanized:view.profile.romanized_name,email:view.profile.email,'hero-title':view.hero.title,'hero-eyebrow':view.hero.eyebrow,'hero-intro':view.hero.intro};
for(const p of view.projects.filter(p=>['kin','spps'].includes(p.id)))for(const key of ['title','status','summary','ownership','result','boundary'])expected[`${p.id}-${key}`]=p[key];
const teaching=view.projects.find(p=>p.id==='teaching');
for(const key of ['title','summary','boundary'])expected[`teaching-${key}`]=teaching[key];
const privateValues=['phone','birth_year_month',loadContent().profile.fields.phone,loadContent().profile.fields.birth_year_month,'source_path','source_blob_sha','claim_ids','permission_note','private_archive'];
const normalize=object=>Object.fromEntries(Object.entries(object).sort(([a],[b])=>a.localeCompare(b)));

// Serve only completed output, never source trees or the repository root.
async function serve(directory) {
  const server=http.createServer((req,res)=>{
    let relative;
    try { relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1); }
    catch {res.writeHead(400).end();return;}
    const file=path.resolve(directory,relative+(relative.endsWith('/')||!relative?'index.html':''));
    if(!file.startsWith(path.resolve(directory)+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) {res.writeHead(404).end('Not found');return;}
    const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(fs.readFileSync(file));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  return {server,base:`http://127.0.0.1:${server.address().port}`};
}
const productionRoot=path.join(root,'site/dist');
const reviewRoot=path.join(root,'site/.review-dist');
assert.ok(fs.existsSync(path.join(productionRoot,'index.html')),'Run production build first');
for(const id of ['a','b','c'])assert.ok(fs.existsSync(path.join(reviewRoot,`review/${id}/index.html`)),'Run review:build first');
const productionFiles=fs.readdirSync(productionRoot,{recursive:true}).filter(f=>fs.statSync(path.join(productionRoot,f)).isFile());
for(const file of productionFiles){
  assert.ok(!file.split(/[\\/]/).includes('review'),'Candidate path in production');
  const bytes=fs.readFileSync(path.join(productionRoot,file));
  for(const marker of [...privateValues,'/review/a','/review/b','/review/c','direction-a','direction-b','direction-c','视觉提案'])assert.ok(!bytes.includes(Buffer.from(marker)),`Production leak: ${file}`);
}
console.log(`PASS production isolation: ${productionFiles.length} files, no candidate routes/styles/content or private fields`);
const review=await serve(reviewRoot),production=await serve(productionRoot);
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
const evidence={checked_at:new Date().toISOString(),browser:browser.version(),playwright:require(path.join(process.env.PLAYWRIGHT_MODULE || 'playwright','package.json')).version,production_files:productionFiles,checks:[],screenshots:[],content_sha256:createHash('sha256').update(JSON.stringify(normalize(expected))).digest('hex')};
try {
  for(const id of ['a','b','c'])for(const width of [1440,768,375,320])for(const js of [true,false]){
    const height=width===1440?1000:812;
    const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,javaScriptEnabled:js,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[],foreignRequests=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>{if(!r.url().startsWith(review.base))foreignRequests.push(r.url());});
    const response=await page.goto(`${review.base}/review/${id}/`,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('script').count(),0);
    const fields=await page.locator('[data-copy]').evaluateAll(nodes=>Object.fromEntries(nodes.map(n=>[n.dataset.copy,n.textContent])));
    assert.deepEqual(normalize(fields),normalize(expected),'Each direction must use the same approved fields verbatim');
    const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
    assert.ok(geometry.scroll<=geometry.width,`${id}: overflow at ${width}`);
    for(const selector of ['.name','h1','.intro-text','.primary']){
      const rect=await page.locator(selector).boundingBox();
      assert.ok(rect && rect.y>=0 && rect.y+rect.height<=height,`${id}: ${selector} must fit first fold at ${width}`);
    }
    assert.deepEqual(await page.locator('[data-project]').evaluateAll(nodes=>nodes.map(n=>n.dataset.project)),['kin','spps']);
    for(const p of view.projects.filter(p=>['kin','teaching'].includes(p.id)))for(const l of p.links){
      assert.ok(await page.locator(`a[href="${l.url}"]`).isVisible());
    }
    assert.equal(await page.locator('img,video,iframe').count(),0,'No unapproved or fabricated media');
    assert.ok(await page.getByText('实拍素材整理中',{exact:true}).isVisible());
    assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.filter(n=>!document.getElementById(n.getAttribute('href').slice(1))).map(n=>n.getAttribute('href'))),[]);
    const body=await page.content();for(const value of privateValues)assert.ok(!body.includes(value),'Private field leaked in review');
    const layout=await page.evaluate(()=>{
      const b=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)};};
      return {hero:b('.hero'),kin:b('#kin'),spps:b('#spps'),media:b('.media-placeholder'),project_display:getComputedStyle(document.querySelector('.project-list')).display};
    });
    if(js && [1440,375].includes(width)) {
      const filename=`${id}-${width}.png`;await page.screenshot({path:path.join(output,filename),fullPage:false});
      evidence.screenshots.push({path:filename,viewport:{width,height},full_page:false,sha256:createHash('sha256').update(fs.readFileSync(path.join(output,filename))).digest('hex')});
    }
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(),'跳到正文');
    assert.notEqual(await page.locator(':focus').evaluate(n=>getComputedStyle(n).outlineStyle),'none');
    await page.locator('.primary').click();assert.equal(new URL(page.url()).hash,'#work');
    await page.locator('.actions a[href="#teaching"]').click();assert.equal(new URL(page.url()).hash,'#teaching');
    const next=id==='c'?'a':String.fromCharCode(id.charCodeAt(0)+1);
    await page.locator(`.review-bar a[href="/review/${next}/"]`).click();
    assert.equal(await page.locator('body').getAttribute('data-direction'),next);
    assert.deepEqual(errors,[]);assert.deepEqual(foreignRequests,[]);
    evidence.checks.push({direction:id,viewport:{width,height},javascript:js,layout,result:'pass'});
    console.log(`PASS ${id.toUpperCase()} ${width}x${height} JS=${js}: source parity, first fold, links, keyboard, media label, no overflow/errors/external requests`);
    await context.close();
  }
  // Distinct desktop composition is measured, not inferred from different colors.
  const layouts=Object.fromEntries(evidence.checks.filter(c=>c.viewport.width===1440&&c.javascript).map(c=>[c.direction,c.layout]));
  assert.equal(layouts.a.kin.y,layouts.a.spps.y,'A must use parallel project columns');
  assert.ok(layouts.b.spps.y>layouts.b.kin.y+layouts.b.kin.height,'B must stack exhibition panels');
  assert.ok(layouts.b.media.height>layouts.c.media.height*3,'B must dedicate substantially more space to media than C');
  assert.ok(layouts.c.hero.x>layouts.a.hero.x+100,'C must use a notebook side margin');
  const prodPage=await browser.newPage();
  assert.equal((await prodPage.goto(production.base+'/')).status(),200);
  for(const id of ['a','b','c'])assert.equal((await prodPage.goto(`${production.base}/review/${id}/`)).status(),404);
  console.log('PASS structurally distinct A/B/C; production root readable and all candidate URLs return 404');
  await prodPage.close();
  fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify(evidence,null,2)+'\n');
} finally {
  await browser.close();await Promise.all([review.server,production.server].map(s=>new Promise(resolve=>s.close(resolve))));
}
