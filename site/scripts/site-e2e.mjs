import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {loadContent,publicView,root} from './content.mjs';
import {caseSections} from './sections.mjs';
import {display,loadVariant,readJson,publicPath} from '../../resume/scripts/model.mjs';
import {auditDist} from './audit-dist.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const outputArg=process.argv.indexOf('--output');
const output=path.resolve(root,outputArg>=0?process.argv[outputArg+1]:'delivery/audits/R04/attempt-01');
fs.mkdirSync(output,{recursive:true});
const directory=path.join(root,'site/dist');
const audit=auditDist(directory);
const data=loadContent(),view=publicView(data);
const routes=[['home','/'],...data.home.project_order.map(id=>[id,`/work/${id}/`]),['resume','/resume/'],['404','/not-a-real-page/']];
const server=http.createServer((req,res)=>{
 let relative;
 try {relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1);} catch {res.writeHead(400).end();return;}
 const file=path.resolve(directory,relative+(!relative||relative.endsWith('/')?'index.html':''));
 if(!file.startsWith(path.resolve(directory)+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(fs.readFileSync(path.join(directory,'404.html')));return;}
 res.writeHead(200,{'Content-Type':file.endsWith('.pdf')?'application/pdf':file.endsWith('.css')?'text/css':'text/html; charset=utf-8'}).end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
const evidence={checked_at:new Date().toISOString(),browser:browser.version(),playwright:require(path.join(process.env.PLAYWRIGHT_MODULE||'playwright','package.json')).version,audit,checks:[],screenshots:[],navigation:[],local_links:[]};
async function capture(page,name,width,fullPage=true){
 const filename=`${name}-${width}.png`;
 await page.screenshot({path:path.join(output,filename),fullPage});
 evidence.screenshots.push({path:filename,viewport:{width,height:width===1440?1000:812},full_page:fullPage,sha256:createHash('sha256').update(fs.readFileSync(path.join(output,filename))).digest('hex')});
}
const localLinks=new Set();
try {
 for(const [name,route] of routes) for(const width of [1440,768,375,320]) for(const js of [true,false]) {
   const context=await browser.newContext({viewport:{width,height:width===1440?1000:812},deviceScaleFactor:1,javaScriptEnabled:js,reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[],external=[],responses=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});
   page.on('response',r=>responses.push({url:r.url(),status:r.status()}));
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),name==='404'?404:200);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('script,iframe,img,video').count(),0,'No client script or unapproved media');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name} overflow ${width}`);
   const text=await page.locator('main').innerText();
   assert.ok(!/review-bar|direction-[abc]|claim_ids|source_path|source_blob_sha/.test(await page.content()));
   if(name!=='resume')for(const field of ['phone','birth_year_month'])assert.ok(!text.includes(data.profile.fields[field]));
   const links=await page.locator('a').evaluateAll(nodes=>nodes.map(a=>({href:a.getAttribute('href'),visible:!!(a.getBoundingClientRect().width&&a.getBoundingClientRect().height),label:a.textContent.trim()})));
   for(const l of links) {assert.ok(l.label);assert.ok(l.visible||l.href==='#main');if(l.href.startsWith('/')||l.href.startsWith('#'))localLinks.add(new URL(l.href,base+route).href);}
   assert.equal(await page.locator('a[download],a[href$=".pdf"]').count(),name==='resume'?1:0);
   if(name==='home') {
     assert.deepEqual(await page.locator('[data-section]').evaluateAll(nodes=>nodes.map(n=>n.dataset.section)),['S1','S2','S3','S4','S5','S6']);
     assert.deepEqual(await page.locator('#work article').evaluateAll(nodes=>nodes.map(n=>n.id)),data.home.project_order);
     for(const p of view.projects.filter(p=>p.id!=='teaching'))for(const key of ['title','status','ownership','result','boundary'])assert.ok(text.includes(p[key]),`${p.id} ${key}`);
     for(const id of ['qq-lingxi-repo','notion-organic-synthesis','notion-organic-chemistry'])assert.ok(await page.locator(`a[href="${data.links.find(l=>l.id===id).url}"]`).isVisible());
     for(const selector of ['.name','#headline','.hero .intro','.primary']){const b=await page.locator(selector).boundingBox();assert.ok(b&&b.y>=0&&b.y+b.height<=(width===1440?1000:812),`${selector} firstfold ${width}`);}
     assert.ok(text.includes('2027届'));assert.ok(text.includes('仓库匿名访问暂不可用'));
   } else if(data.home.project_order.includes(name)) {
     const p=data.projects.find(p=>p.id===name);
     for(const key of ['title','status_label','summary','ownership','result','boundary']) assert.ok(text.includes(p[key]),`${name}: ${key}`);
     const blocks=caseSections(name,p.body).flatMap(s=>s.blocks.flatMap(b=>b.items||[b.text]));
     for(const block of blocks)assert.ok(text.includes(block),`${name} approved body missing`);
     if(name==='kin') {assert.ok(text.indexOf('H2：')<text.indexOf('爱牵挂'));assert.ok(text.indexOf('普通的一天')<text.indexOf('爱牵挂'));assert.ok(text.includes('仓库匿名访问暂不可用'));}
     if(name==='spps')assert.ok(await page.getByText('实拍素材整理中',{exact:true}).isVisible());
     if(name==='qq-lingxi')assert.ok(await page.locator(`a[href="${data.links.find(l=>l.id==='qq-lingxi-repo').url}"]`).isVisible());
   } else if(name==='resume'){
     const d=display(loadVariant('general-zh'));assert.ok(text.includes(d.phone));assert.ok(text.includes(d.birth));
     for(const p of d.projects)for(const b of p.bullets)assert.ok(text.includes(b));
     assert.deepEqual(await page.locator('[data-project]').evaluateAll(ns=>ns.map(n=>n.dataset.project)),['kin','spps','qq-lingxi','pet']);
     assert.equal(await page.locator('a[download]').getAttribute('href'),'/'+publicPath);
     const [download]=await Promise.all([page.waitForEvent('download'),page.locator('a[download]').click()]);
     const file=await download.path();assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex'),readJson(path.join(root,'publication/resume-manifest.json')).sha256);
   }
   if(js&&width!==320){await capture(page,name,width);if(name==='home')await capture(page,'home-firstfold',width,false);}
   await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'跳到正文');
   assert.notEqual(await page.locator(':focus').evaluate(n=>getComputedStyle(n).outlineStyle),'none');
   await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
   assert.equal(await page.locator(':focus').getAttribute('id'),'main');
   if(name==='home'){await page.locator('.primary').click();assert.equal(new URL(page.url()).hash,'#work');}
   if(data.home.project_order.includes(name)){await page.locator('.toc a').last().click();assert.match(new URL(page.url()).hash,/^#part-/);}
   assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
   assert.ok(responses.every(r=>r.status<400||(name==='404'&&r.url===base+route)),'No broken resource');
   evidence.checks.push({page:name,viewport:{width,height:width===1440?1000:812},javascript:js,result:'pass'});
   console.log(`PASS ${name} ${width}px JS=${js}: content, layout, links, focus, privacy, zero runtime/external requests`);
   await context.close();
 }
 // Traverse every internal href including cross-page fragments with a real browser.
 const page=await browser.newPage();
 for(const href of localLinks){if(new URL(href).pathname==='/'+publicPath){const r=await page.request.get(href);assert.equal(r.status(),200);assert.match(r.headers()['content-type'],/application\/pdf/);evidence.local_links.push('/'+publicPath);continue;}await page.goto('about:blank');const url=new URL(href);const response=await page.goto(href);assert.equal(response.status(),url.pathname==='/not-a-real-page/'?404:200);if(url.hash)assert.ok(await page.locator(`[id="${url.hash.slice(1)}"]`).count());evidence.local_links.push(url.pathname+url.hash);}
 for(const route of ['/review/a/','/review/b/','/review/c/'])assert.equal((await page.goto(base+route)).status(),404);
 for(const [name,route] of routes.filter(([n])=>!['home','404'].includes(n))){await page.goto(base);await page.locator(name==='resume'?'.hero a[href="/resume/"]':`#${name} .detail-link`).click();assert.equal(new URL(page.url()).pathname,route);await page.locator('.name').click();assert.equal(new URL(page.url()).pathname,'/');evidence.navigation.push({from:'/',to:route,back:'/',result:'pass'});}
 await page.goto(base+'/no-such-page/');await page.getByRole('link',{name:'返回首页 ↗',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/');
 evidence.navigation.push({from:'404',to:'/',result:'pass'});
 fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify(evidence,null,2)+'\n');
 console.log(`PASS ${evidence.checks.length} configurations, ${localLinks.size} local hrefs, navigation round trips and retired candidate URLs`);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
