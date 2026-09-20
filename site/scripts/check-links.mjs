import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {loadContent,root} from './content.mjs';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const output=path.resolve(root,process.argv[2]||'delivery/audits/R03/attempt-01');
fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
const results=[];
try {
 for(const link of loadContent().links.filter(l=>l.url.startsWith('https:'))) {
   const context=await browser.newContext({viewport:{width:1280,height:900},locale:'en-US'}),page=await context.newPage();
   let status=null,error=null;
   try {status=(await page.goto(link.url,{waitUntil:'domcontentloaded',timeout:20000}))?.status();await page.waitForFunction(()=>document.body.innerText.length>500,{},{timeout:10000});} catch(e){error=String(e.message).split('\n')[0];}
   const text=await page.locator('body').innerText().catch(()=>''),title=await page.title().catch(()=>'');
   const course=link.id.startsWith('notion-');
   const content=course?/Organic|有机/.test(text)&&/Course|课程|实验|Chemistry|Synthesis/.test(text):text.includes('Zhangsfish')&&(link.id==='github-profile'||text.includes(new URL(link.url).pathname.split('/').pop()));
   const verified=status===200&&!error&&content&&!/This page is private|This content does not exist|You do not have access/.test(text);
   const result={id:link.id,url:link.url,checked_at:new Date().toISOString(),http_status:status,title,final_url:page.url(),verification:verified?'anonymous_content_verified':'unconfirmed',error,visible_text_length:text.length};
   results.push(result);console.log(JSON.stringify(result));await context.close();
 }
 fs.writeFileSync(path.join(output,'external-links.json'),JSON.stringify({browser:browser.version(),network:'Local Windows network; fresh anonymous Chrome contexts; no stored cookies',method:'Wait for meaningful rendered content; record markers/status only, no course text copied',results},null,2)+'\n');
} finally {await browser.close();}
