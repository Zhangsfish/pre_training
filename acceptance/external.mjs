import fs from 'node:fs';
import path from 'node:path';
import {chromium} from 'playwright';
import {loadContent} from '../site/scripts/content.mjs';
const output=path.resolve(process.argv[2]);
const browser=await chromium.launch({headless:true,channel:'chrome'}),results=[];
try{for(const link of loadContent().links.filter(l=>l.url.startsWith('https:'))){
 const context=await browser.newContext({viewport:{width:1280,height:900},locale:'en-US'}),page=await context.newPage();
 let status=null,error=null;
 try{status=(await page.goto(link.url,{waitUntil:'domcontentloaded',timeout:30000}))?.status();await page.waitForFunction(()=>document.body.innerText.length>500,null,{timeout:15000});}catch(e){error=e.message.split('\n')[0];}
 const text=await page.locator('body').innerText().catch(()=>''),title=await page.title().catch(()=>'');
 const course=link.id.startsWith('notion-');
 const meaningful=course?/Organic|有机/.test(text)&&/Course|课程|实验|Chemistry|Synthesis/.test(text):text.includes('Zhangsfish')&&(link.id==='github-profile'||text.includes(new URL(link.url).pathname.split('/').pop()));
 const verified=status===200&&!error&&meaningful&&!/This page is private|This content does not exist|You do not have access/.test(text);
 const result={id:link.id,url:link.url,http_status:status,title,final_url:page.url(),checked_at:new Date().toISOString(),verification:verified?'anonymous_content_verified':'unconfirmed',error,screenshot:`external-${link.id}.png`,visible_text_length:text.length};
 await page.screenshot({path:path.join(output,result.screenshot)});results.push(result);console.log(JSON.stringify(result));await context.close();
}fs.writeFileSync(path.join(output,'external-links.json'),JSON.stringify({browser:browser.version(),method:'Anonymous real Chrome GET; fresh contexts without stored login; rendered body markers and viewport screenshots; not merely HEAD status',results},null,2)+'\n');}finally{await browser.close();}
