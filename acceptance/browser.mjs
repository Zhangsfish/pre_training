import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {root,loadContent} from '../site/scripts/content.mjs';
import {serve} from './server.mjs';

const output=path.resolve(process.argv[2]);fs.mkdirSync(output,{recursive:true});
const scratch=path.join(root,'delivery/audits/R05/tmp');fs.mkdirSync(scratch,{recursive:true});
const ext=fs.mkdtempSync(path.join(scratch,'zoom-extension-'));
fs.writeFileSync(path.join(ext,'manifest.json'),JSON.stringify({manifest_version:3,name:'Local acceptance zoom only',version:'1.0',permissions:['tabs'],background:{service_worker:'worker.js'}}));
fs.writeFileSync(path.join(ext,'worker.js'),'chrome.runtime.onInstalled.addListener(()=>{});');
const pdfs=JSON.parse(fs.readFileSync(path.join(output,'pdf-inventory.json'),'utf8'));
const fixtures=Object.fromEntries(pdfs.filter(p=>p.variant!=='general-zh').map(p=>{const latest=JSON.parse(fs.readFileSync(path.join(root,`resume/exports/${p.variant}.latest.json`),'utf8'));return [`downloads/acceptance-${p.variant}.pdf`,path.join(root,'resume/exports',latest.stem+'.pdf')];}));
const host=await serve(fixtures);
const context=await chromium.launchPersistentContext(fs.mkdtempSync(path.join(scratch,'chrome-')),{headless:true,channel:'chrome',viewport:{width:1440,height:1000},ignoreDefaultArgs:['--disable-extensions'],args:['--enable-unsafe-extension-debugging']});
const evidence={checked_at:new Date().toISOString(),browser:context.browser().version(),zoom_method:'Chrome tabs.setZoom(2) in isolated profile; getZoom + innerWidth measured; no CSS scale or deviceScaleFactor substitution',zoom:[],keyboard:[],motion:[],contacts:[],pdf_reader:[]};
const routes=[['home','/'],...['kin','spps','qq-lingxi','pet'].map(id=>[id,`/work/${id}/`]),['resume','/resume/'],['404','/missing/']];
try{
 const cdp=await context.browser().newBrowserCDPSession();await cdp.send('Extensions.loadUnpacked',{path:ext});
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 const page=await context.newPage();
 async function zoom(factor){return worker.evaluate(async({url,factor})=>{const [tab]=await chrome.tabs.query({url:url+'/*'});await chrome.tabs.setZoom(tab.id,factor);return chrome.tabs.getZoom(tab.id);},{url:host.base,factor});}
 for(const [name,route] of routes){
  await page.setViewportSize({width:1440,height:1000});await page.goto(host.base+route);assert.equal(await zoom(2),2);
  await page.waitForFunction(()=>innerWidth===720);await page.evaluate(()=>document.fonts.ready);
  const layout=await page.evaluate(()=>({inner_width:innerWidth,scroll_width:document.documentElement.scrollWidth,dpr:devicePixelRatio,main:document.querySelector('main').innerText.length}));
  assert.equal(layout.scroll_width,layout.inner_width);assert.ok(layout.main>30);
  const clipped=await page.locator('main a,h1,h2,h3,p,li').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1);}).map(n=>n.tagName+':'+n.textContent.slice(0,50)));
  // Full-page clipping in Playwright uses CSS dimensions, which crop Chrome's
  // native browser-zoom output. Capture the actual compositor viewport instead.
  assert.deepEqual(clipped,[]);
  const screenshot=await (await context.newCDPSession(page)).send('Page.captureScreenshot',{format:'png',fromSurface:true});
  const png=Buffer.from(screenshot.data,'base64');assert.equal(png.readUInt32BE(16),1440);assert.equal(png.readUInt32BE(20),1000);
  fs.writeFileSync(path.join(output,`${name}-zoom200.png`),png);
  evidence.zoom.push({route,factor:2,physical_viewport:{width:1440,height:1000},screenshot:'Native compositor viewport, 1440x1000 PNG; entire document also checked for overflow',...layout,result:'pass'});
  await zoom(1);await page.setViewportSize({width:320,height:812});await page.goto(host.base+route);
  await page.screenshot({path:path.join(output,`${name}-320.png`),fullPage:true});
  const links=await page.locator('a[href]').count(),visited=[];
  for(let i=0;i<links;i++){
   await page.keyboard.press('Tab');const active=page.locator(':focus');assert.equal(await active.evaluate(e=>e.tagName),'A');
   const state=await active.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {href:e.getAttribute('href'),label:e.textContent.trim(),outline:s.outlineStyle,outline_width:s.outlineWidth,visible:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.left>=0&&r.right<=innerWidth+1};});
   assert.ok(state.visible);assert.notEqual(state.outline,'none');assert.notEqual(state.outline_width,'0px');visited.push(state);
  }
  assert.equal(new Set(visited.map(v=>v.href+'|'+v.label)).size,await page.locator('a[href]').evaluateAll(ns=>new Set(ns.map(n=>n.getAttribute('href')+'|'+n.textContent.trim())).size));
  evidence.keyboard.push({route,links,tab_order:visited,result:'pass'});
  await page.emulateMedia({reducedMotion:'reduce'});
  const motion=await page.evaluate(()=>({preference:matchMedia('(prefers-reduced-motion: reduce)').matches,animations:document.getAnimations().length,smooth:[...document.querySelectorAll('*')].some(e=>getComputedStyle(e).scrollBehavior==='smooth')}));
  assert.equal(motion.preference,true);assert.equal(motion.animations,0);assert.equal(motion.smooth,false);evidence.motion.push({route,...motion});
  for(const link of await page.locator('a[href^="mailto:"]').evaluateAll(ns=>ns.map(n=>({label:n.textContent.trim(),href:n.getAttribute('href')})))){assert.equal(link.href,loadContent().links.find(l=>l.id==='email').url);evidence.contacts.push({route,...link});}
 }
 await page.setViewportSize({width:1440,height:1000});
 const pdf=JSON.parse(fs.readFileSync(path.join(output,'pdf-inventory.json'),'utf8')).find(p=>p.variant==='general-zh');
 async function reader(url){
  await page.goto(url);
  let viewer;for(let i=0;i<100;i++){viewer=page.frames().find(f=>f.url().startsWith('chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/'));if(viewer)break;await page.waitForTimeout(100);}
  assert.ok(viewer,'Real Chrome PDF viewer frame');await viewer.waitForFunction(()=>{try{return document.querySelector('pdf-viewer').viewport.getPageScreenRect(0).width>0;}catch{return false;}});
  return viewer;
 }
 async function clickAnnotation(viewer,annotation,document=pdf){
  const geometry=await viewer.evaluate(()=>{const v=document.querySelector('pdf-viewer');return {rect:v.viewport.getPageScreenRect(0),size:v.viewport.size};});
  const [x1,y1,x2,y2]=annotation.rect,r=geometry.rect;
  const point={x:1440-geometry.size.width+r.x+(x1+x2)/2/document.width*r.width,y:1000-geometry.size.height+r.y+(document.height-(y1+y2)/2)/document.height*r.height};
  await page.mouse.click(point.x,point.y);return {geometry,point};
 }
 for(const document of pdfs) for(const annotation of document.annotations.filter(a=>a.uri.startsWith('../'))){
  const pdfURL=host.base+'/downloads/'+(document.variant==='general-zh'?'zhang-shuo-resume.pdf':`acceptance-${document.variant}.pdf`);
  const viewer=await reader(pdfURL);
  await page.screenshot({path:path.join(output,`pdf-native-reader-${document.variant}.png`)});
  const clicked=await clickAnnotation(viewer,annotation,document);const expected=new URL(annotation.uri,pdfURL).href;
  await page.waitForURL(expected);assert.ok(await page.locator('h1').isVisible());
  evidence.pdf_reader.push({variant:document.variant,local_fixture:document.variant!=='general-zh',uri:annotation.uri,actual:new URL(page.url()).pathname+new URL(page.url()).hash,expected:new URL(expected).pathname+new URL(expected).hash,...clicked,result:'online_relative_link_pass'});
  await page.screenshot({path:path.join(output,`pdf-click-${new URL(expected).pathname.split('/')[2]||'teaching'}.png`)});
 }
 // The downloaded file is intentionally separate from the website directory tree.
 await page.goto(host.base+'/resume/');const [download]=await Promise.all([page.waitForEvent('download'),page.locator('a[download]').click()]);
 const offline=path.join(scratch,'downloaded-resume.pdf');await download.saveAs(offline);
 const viewer=await reader(pathToFileURL(offline).href);const annotation=pdf.annotations.find(a=>a.uri.startsWith('../'));
 const clicked=await clickAnnotation(viewer,annotation);await page.waitForTimeout(700);
 const offlineURL=page.url();assert.ok(!offlineURL.startsWith(host.base));
 await page.screenshot({path:path.join(output,'pdf-offline-click.png')});
 evidence.pdf_reader.push({uri:annotation.uri,actual:offlineURL.replaceAll(root,'<checkout>').replaceAll(pathToFileURL(root).href,'file:///<checkout>'),...clicked,result:'offline_relative_link_unavailable',limitation:'Downloaded standalone PDF has no site base or sibling work pages. Do not promise offline project links; choose real absolute site URLs only after R06 domain approval.'});
 fs.writeFileSync(path.join(output,'acceptance-browser.json'),JSON.stringify(evidence,null,2)+'\n');
 console.log('PASS actual 200% Chrome zoom (7 pages), 320px keyboard traversal, reduced motion, contacts and native PDF online link clicks; offline limitation recorded');
}finally{await context.close();await host.close();}
