import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from '../../../acceptance/node_modules/playwright/index.mjs';

const base='https://zhang-shuo-portfolio.vercel.app';
const root=path.resolve(new URL('../../..',import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/,m=>m.slice(1)));
const output=path.join(root,'delivery/audits/R06/attempt-02');
fs.mkdirSync(output,{recursive:true});
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'pre-training-r06-chrome-'));
const pdfInventory=JSON.parse(fs.readFileSync(path.join(root,'delivery/audits/R05/attempt-01/pdf-inventory.json'),'utf8'));
const pdf=pdfInventory.find(item=>item.variant==='general-zh');
const links=JSON.parse(fs.readFileSync(path.join(root,'site/LINKS.json'),'utf8')).links;
const requiredExternal=['qq-lingxi-repo','notion-organic-synthesis','notion-organic-chemistry'].map(id=>links.find(link=>link.id===id));
const routes=[['home','/'],['kin','/work/kin/'],['spps','/work/spps/'],['qq-lingxi','/work/qq-lingxi/'],['pet','/work/pet/'],['resume','/resume/'],['404','/r06-not-found/']];
const expectedPdfHash='9584697754adb1d5b7b67f85e3bfb458ca4c50bafb6ba8820babc685a158034e';
const evidence={
  checked_at:new Date().toISOString(),base_url:base,method:'Fresh temporary Chrome profile; no saved cookies or login; HTTPS errors not ignored',routes:[],resources:[],mobile:[],downloads:[],pdf_links:[],external:[]
};

const context=await chromium.launchPersistentContext(profile,{headless:true,channel:'chrome',viewport:{width:1440,height:1000},ignoreDefaultArgs:['--disable-extensions']});
try{
  evidence.browser=context.browser().version();
  const page=context.pages()[0]||await context.newPage();
  const sameOriginResponses=[];
  page.on('response',response=>{if(response.url().startsWith(base))sameOriginResponses.push({url:response.url(),status:response.status(),resource_type:response.request().resourceType(),content_type:response.headers()['content-type']||null});});
  for(const [name,route] of routes){
    await page.setViewportSize({width:1440,height:1000});
    const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:45000});
    const expectedStatus=name==='404'?404:200;
    assert.equal(response.status(),expectedStatus,`${route} status`);
    assert.equal(new URL(page.url()).protocol,'https:');
    assert.ok((await page.locator('h1').innerText()).trim().length>0,`${route} has h1`);
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href').catch(()=>null);
    if(name==='404'){
      assert.equal(canonical,null);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, follow');
    }else{
      assert.equal(canonical,base+route);
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),base+route);
    }
    const scroll=await page.evaluate(()=>({width:innerWidth,scroll_width:document.documentElement.scrollWidth,text_length:document.body.innerText.length}));
    assert.equal(scroll.scroll_width,scroll.width,`${route} desktop overflow`);
    await page.screenshot({path:path.join(output,`${name}-production-1440.png`),fullPage:true});
    evidence.routes.push({route,status:response.status(),final_url:page.url(),canonical,headers:{content_type:response.headers()['content-type']||null,strict_transport_security:response.headers()['strict-transport-security']||null},...scroll,result:'pass'});

    await page.setViewportSize({width:375,height:812});
    const mobileResponse=await page.goto(base+route,{waitUntil:'networkidle',timeout:45000});
    assert.equal(mobileResponse.status(),expectedStatus);
    const mobile=await page.evaluate(()=>({width:innerWidth,scroll_width:document.documentElement.scrollWidth,text_length:document.body.innerText.length}));
    assert.equal(mobile.scroll_width,mobile.width,`${route} mobile overflow`);
    await page.screenshot({path:path.join(output,`${name}-production-375.png`),fullPage:true});
    evidence.mobile.push({route,status:mobileResponse.status(),...mobile,screenshot:`${name}-production-375.png`,result:'pass'});
  }

  const robots=await context.request.get(base+'/robots.txt');assert.equal(robots.status(),200);assert.match(await robots.text(),new RegExp(`Sitemap: ${base.replaceAll('.','\\.')}\\/sitemap\\.xml`));
  const sitemap=await context.request.get(base+'/sitemap.xml');assert.equal(sitemap.status(),200);const sitemapText=await sitemap.text();assert.ok(!sitemapText.includes('404'));for(const [,route] of routes.slice(0,6))assert.ok(sitemapText.includes(`<loc>${base}${route}</loc>`));
  const pdfResponse=await context.request.get(base+'/downloads/zhang-shuo-resume.pdf');assert.equal(pdfResponse.status(),200);assert.match(pdfResponse.headers()['content-type']||'',/application\/pdf/);const pdfBytes=Buffer.from(await pdfResponse.body());assert.equal(createHash('sha256').update(pdfBytes).digest('hex'),expectedPdfHash);
  evidence.resources=[...new Map(sameOriginResponses.map(item=>[`${item.url}|${item.resource_type}`,item])).values()];
  for(const item of evidence.resources)assert.ok(item.status<400||item.url.endsWith('/r06-not-found/'),`Resource failure ${item.url}: ${item.status}`);
  evidence.resources.push({url:base+'/robots.txt',status:robots.status(),resource_type:'document',content_type:robots.headers()['content-type']||null},{url:base+'/sitemap.xml',status:sitemap.status(),resource_type:'document',content_type:sitemap.headers()['content-type']||null},{url:base+'/downloads/zhang-shuo-resume.pdf',status:pdfResponse.status(),resource_type:'document',content_type:pdfResponse.headers()['content-type']||null,sha256:expectedPdfHash});

  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/resume/');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('a[download][href="/downloads/zhang-shuo-resume.pdf"]').click()]);
  const downloaded=path.join(output,'downloaded-general-resume.pdf');await download.saveAs(downloaded);
  const downloadedHash=createHash('sha256').update(fs.readFileSync(downloaded)).digest('hex');assert.equal(downloadedHash,expectedPdfHash);
  evidence.downloads.push({source:base+'/resume/',suggested_filename:download.suggestedFilename(),bytes:fs.statSync(downloaded).size,sha256:downloadedHash,result:'pass'});

  async function openReader(){
    await page.goto(base+'/downloads/zhang-shuo-resume.pdf');
    let viewer;
    for(let i=0;i<120;i++){viewer=page.frames().find(frame=>frame.url().startsWith('chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/'));if(viewer)break;await page.waitForTimeout(100);}
    assert.ok(viewer,'Chrome native PDF viewer frame');
    await viewer.waitForFunction(()=>{try{return document.querySelector('pdf-viewer').viewport.getPageScreenRect(0).width>0;}catch{return false;}},{timeout:30000});
    return viewer;
  }
  async function clickPdfAnnotation(viewer,annotation){
    const geometry=await viewer.evaluate(()=>{const viewer=document.querySelector('pdf-viewer');return {rect:viewer.viewport.getPageScreenRect(0),size:viewer.viewport.size};});
    const [x1,y1,x2,y2]=annotation.rect,rect=geometry.rect;
    const point={x:1440-geometry.size.width+rect.x+(x1+x2)/2/pdf.width*rect.width,y:1000-geometry.size.height+rect.y+(pdf.height-(y1+y2)/2)/pdf.height*rect.height};
    await page.mouse.click(point.x,point.y);
    return {geometry,point};
  }
  let viewer=await openReader();
  await page.screenshot({path:path.join(output,'pdf-production-native-reader.png')});
  for(const annotation of pdf.annotations.filter(item=>item.uri.startsWith('../'))){
    const expected=new URL(annotation.uri,base+'/downloads/zhang-shuo-resume.pdf').href;
    const clicked=await clickPdfAnnotation(viewer,annotation);
    await page.waitForURL(expected,{timeout:30000});
    const response=await context.request.get(expected);assert.equal(response.status(),200);
    assert.ok(await page.locator('h1').isVisible());
    const name=new URL(expected).pathname.split('/').filter(Boolean).pop();
    await page.screenshot({path:path.join(output,`pdf-production-click-${name}.png`)});
    evidence.pdf_links.push({uri:annotation.uri,expected,actual:page.url(),status:response.status(),...clicked,result:'pass'});
    viewer=await openReader();
  }

  for(const link of requiredExternal){
    assert.ok(link);
    const externalPage=await context.newPage();
    let response,error=null;
    try{response=await externalPage.goto(link.url,{waitUntil:'domcontentloaded',timeout:45000});await externalPage.waitForFunction(()=>document.body.innerText.length>500,null,{timeout:20000});}catch(cause){error=cause.message.split('\n')[0];}
    const text=await externalPage.locator('body').innerText().catch(()=>''),title=await externalPage.title().catch(()=>''),status=response?.status()??null;
    const meaningful=link.id==='qq-lingxi-repo'?text.includes('Zhangsfish')&&text.includes('qq-lingxi-agent-platform'):/Organic|有机/.test(text)&&/Course|课程|实验|Chemistry|Synthesis/.test(text);
    const privateMarker=/This page is private|This content does not exist|You do not have access/.test(text);
    assert.equal(status,200,`${link.id} status`);assert.equal(error,null,`${link.id} load`);assert.ok(meaningful,`${link.id} content markers`);assert.equal(privateMarker,false,`${link.id} public access`);
    const screenshot=`external-production-${link.id}.png`;await externalPage.screenshot({path:path.join(output,screenshot)});
    evidence.external.push({id:link.id,url:link.url,final_url:externalPage.url(),status,title,visible_text_length:text.length,screenshot,result:'anonymous_content_verified'});
    await externalPage.close();
  }
  evidence.checked_completed_at=new Date().toISOString();
  fs.writeFileSync(path.join(output,'production-browser.json'),JSON.stringify(evidence,null,2)+'\n');
  console.log(`PASS ${evidence.routes.length} routes, ${evidence.mobile.length} mobile pages, ${evidence.pdf_links.length} production PDF links, ${evidence.external.length} public external links`);
}finally{
  await context.close();
}
