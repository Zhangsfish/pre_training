import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const dir=path.dirname(fileURLToPath(import.meta.url));
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:4321';
const prefix=base.startsWith('https:')?'production':'local';
const output=path.join(dir,'screenshots');fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
try{
 for(const width of [375,1366]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();await page.goto(base,{waitUntil:'load'});
  await page.screenshot({path:path.join(output,`${prefix}-home-${width}.png`)});
  const lecture=page.locator('.app-lecture-asset');
  await lecture.getByRole('button',{name:'English',exact:true}).click();
  for(const [id,time] of [['lecture-asset',10],['everwhile',10]]){
   const section=page.locator('.app-'+id),video=section.locator('[data-app-film]');
   await video.evaluate(async(v,time)=>{v.muted=true;await v.play();v.pause();await new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});v.currentTime=time;});},time);
   await section.screenshot({path:path.join(output,`${prefix}-${id}-${width}.png`)});
  }
  await context.close();
 }
}finally{await browser.close()}
console.log(`PASS: ${prefix} desktop/mobile homepage and both app panels captured`);
