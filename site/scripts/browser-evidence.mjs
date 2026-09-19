// Reuse an installed Playwright library and Chrome; no downloads or authenticated profile.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { loadContent, root } from './content.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const output = path.resolve(process.argv[3] || path.join(root,'delivery/audits/R01/attempt-01'));
fs.mkdirSync(output,{recursive:true});
const browser = await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,headless:true});
console.log(`Browser: ${browser.version()}; anonymous fresh contexts; checked_at=${new Date().toISOString()}`);
try {
  if (process.argv[2] === 'links') {
    const results=[];
    for (const id of ['qq-lingxi-repo','notion-organic-synthesis','notion-organic-chemistry']) {
      const link=loadContent().links.find(l=>l.id===id);
      const context=await browser.newContext({viewport:{width:1280,height:900},locale:'en-US'});
      const page=await context.newPage();
      let status=null,error=null;
      try {
        const response=await page.goto(link.url,{waitUntil:'domcontentloaded',timeout:35000});
        status=response?.status() ?? null;
        // Wait for meaningful content or an access/login message, not HTTP status alone.
        await page.waitForFunction(() => document.body.innerText.trim().length>500,{},{timeout:15000}).catch(()=>{});
      } catch(e) { error=String(e.message).split('\n')[0]; }
      const body=await page.locator('body').innerText().catch(()=>'');
      const title=await page.title().catch(()=>'');
      // Conservative classification; human reviews the actual screenshot/text below.
      const repositoryVisible=id==='qq-lingxi-repo' && body.includes('qq-lingxi-agent-platform') && /README|Latest commit|Folders and files/.test(body);
      const courseVisible=id!=='qq-lingxi-repo' && /Organic|有机/.test(body) && /实验|课程|Experiment|Laboratory|Synthesis|Chemistry/.test(body) && body.length>500 && !/You do not have access|This page is private|This content does not exist/.test(body);
      const verification=!error && status===200 && (repositoryVisible || courseVisible) ? 'anonymous_content_verified' : 'unconfirmed';
      const result={id,url:link.url,final_url:page.url(),checked_at:new Date().toISOString(),http_status:status,title,verification,error,
        visible_content_markers:['Folders and files','README','Course Description','Syllabus','Course Schedule'].filter(marker=>body.includes(marker)),
        visible_text_length:body.length,method:'Fresh browser context; waited for rendered body; checked meaningful repository/course content, not HTTP 200 alone'};
      results.push(result); console.log(JSON.stringify(result));
      await context.close();
    }
    fs.writeFileSync(path.join(output,'external-links.json'),JSON.stringify({network:'Local Windows network; unauthenticated browser, no stored cookies',browser:browser.version(),results},null,2)+'\n');
  } else {
    const base='http://127.0.0.1:4321/';
    for (const width of [1440,768,375,320]) {
      const context=await browser.newContext({viewport:{width,height:width===1440?1000:812},deviceScaleFactor:1,reducedMotion:'reduce'});
      const page=await context.newPage();
      const errors=[]; page.on('pageerror',e=>errors.push(e.message));
      const response=await page.goto(base,{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      await page.evaluate(()=>document.fonts.ready);
      assert.equal(await page.locator('h1').count(),1);
      assert.match(await page.locator('body').innerText(),/内容待审/);
      assert.deepEqual(await page.locator('#work article').evaluateAll(nodes=>nodes.map(n=>n.id)),['kin','spps','qq-lingxi','pet']);
      assert.equal(await page.locator('script').count(),0,'No client runtime is required');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
      const badAnchors=await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.filter(n=>!document.getElementById(n.getAttribute('href').slice(1))).map(n=>n.getAttribute('href')));
      assert.deepEqual(badAnchors,[]);
      for(const id of ['qq-lingxi-repo','notion-organic-synthesis','notion-organic-chemistry']) {
        const {url}=loadContent().links.find(l=>l.id===id);
        const anchor=page.locator(`a[href="${url}"]`);
        assert.equal(await anchor.count(),1);
        assert.ok(await anchor.isVisible());
      }
      await page.getByRole('link',{name:'查看项目 ↓'}).click();
      assert.equal(new URL(page.url()).hash,'#work');
      await page.getByRole('link',{name:'通用简历 · 待整理'}).click();
      assert.equal(new URL(page.url()).hash,'#resume-status');
      assert.ok(await page.locator('#resume-status').isVisible());
      await page.goto(base,{waitUntil:'networkidle'});
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').innerText(),'跳到正文');
      await page.keyboard.press('Tab');
      await page.evaluate(()=>{document.activeElement.blur();scrollTo(0,0);});
      if([1440,375].includes(width)) await page.screenshot({path:path.join(output,`home-${width}.png`),fullPage:true});
      assert.deepEqual(errors,[]);
      console.log(`PASS ${width}px: fixed order, visible required links, project/resume actions, valid anchors, keyboard access, no overflow, no client JS/page errors`);
      await context.close();
    }
    const html=fs.readFileSync(path.join(root,'site/.review-dist/index.html'),'utf8');
    for(const forbidden of ['source_path','source_blob_sha','claim_ids','permission_note','private_archive','2002-01-13','18604097805']) assert.ok(!html.includes(forbidden),`Unexpected output: ${forbidden}`);
    console.log('PASS output excludes source/claim metadata, private fields and raw media registry');
  }
} finally { await browser.close(); }
