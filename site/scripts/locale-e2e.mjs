import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:4338';
const evidence=process.env.LOCALE_EVIDENCE_DIR?path.resolve(process.env.LOCALE_EVIDENCE_DIR):null;
if(evidence)fs.mkdirSync(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const routes=['/','/work/kin/','/work/spps/','/work/qq-lingxi/','/work/pet/','/work/teaching/','/work/natural-product/','/resume/'];
const results=[];
try{
  for(const width of [320,375,768,1024,1366,1440]){
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();
    const inspect=async(route,locale)=>{
      const response=await page.goto(base+route,{waitUntil:'load'});
      assert.equal(response.status(),200,route);
      assert.equal(await page.locator('html').getAttribute('lang'),locale==='en'?'en':'zh-CN');
      assert.equal(await page.locator('h1').count(),1,route);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Horizontal overflow at ${width} ${route}`);
      const counterpart=locale==='en'?route.replace(/^\/en/,'')||'/':'/en'+route;
      const switcher=page.locator('.language-switch');
      assert.equal(await switcher.locator(`a[href="${counterpart}"]`).count(),1,`Language counterpart for ${route}`);
      assert.equal(await page.locator(`link[rel="canonical"]`).getAttribute('href'),`https://zhang-shuo-portfolio.vercel.app${route}`);
      for(const [lang,target] of [['zh-CN',locale==='en'?counterpart:route],['en',locale==='en'?route:counterpart]])
        assert.equal(await page.locator(`link[rel="alternate"][hreflang="${lang}"]`).getAttribute('href'),`https://zhang-shuo-portfolio.vercel.app${target}`);
      if(locale==='en'){
        const text=await page.locator('body').innerText();
        const remainder=text.replaceAll('张朔','').replaceAll('中文','');
        assert.ok(!/[一-鿿]/.test(remainder),`Untranslated visible Chinese on ${route}`);
      }
      results.push({width,route,locale,status:200,overflow:false});
    };
    for(const route of width===375||width===1366?routes:['/']){
      await inspect(route,'zh');
      await inspect('/en'+route,'en');
    }
    if(evidence&&[375,1366].includes(width)){
      await page.goto(base+'/en/');
      await page.screenshot({path:path.join(evidence,`home-en-${width}.png`),fullPage:true});
    }
    await ctx.close();
  }
  const ctx=await browser.newContext({viewport:{width:375,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(base+'/en/work/pet/');
  assert.match(await page.locator('.case-story').innerText(),/intended for submission/);
  assert.ok(!(await page.locator('.case-story').innerText()).includes('在投'));
  await page.getByRole('navigation',{name:'Language'}).getByRole('link',{name:'中文'}).click();
  assert.equal(new URL(page.url()).pathname,'/work/pet/');
  await page.getByRole('navigation',{name:'语言'}).getByRole('link',{name:'English'}).click();
  assert.equal(new URL(page.url()).pathname,'/en/work/pet/');
  await page.goto(base+'/en/');
  assert.equal(await page.locator('.image-language-note').count(),2);
  assert.match(await page.locator('.image-language-note').first().innerText(),/Chinese interface/);
  const carousel=page.locator('.app-lecture-asset [data-carousel]');
  await carousel.getByRole('button',{name:/Next promotional screenshot/}).click();
  assert.equal(await carousel.locator('[data-count]').innerText(),'02 / 06');
  assert.match(await carousel.locator('[data-caption]').innerText(),/Select photos/);
  const zoom=carousel.getByRole('button',{name:/Enlarge/});
  await zoom.click();assert.ok(await page.locator('dialog').evaluate(d=>d.open));
  await page.keyboard.press('Escape');assert.ok(!(await page.locator('dialog').evaluate(d=>d.open)));
  assert.ok(await zoom.evaluate(el=>document.activeElement===el));
  const englishFilm=page.locator('.app-lecture-asset [data-app-film-language]').filter({hasText:'English'});
  await englishFilm.click();
  assert.equal(await englishFilm.getAttribute('aria-pressed'),'true');
  assert.match(await page.locator('.app-lecture-asset [data-app-film]').getAttribute('aria-label'),/English promo film/);
  const pdf=await ctx.request.get(base+'/downloads/zhang-shuo-resume.pdf');
  assert.equal(pdf.status(),200);
  const manifest=JSON.parse(fs.readFileSync(new URL('../../publication/resume-manifest.json',import.meta.url)));
  assert.equal(createHash('sha256').update(await pdf.body()).digest('hex'),manifest.sha256);
  await page.goto(base+'/en/resume/');
  assert.match(await page.locator('a[href="/downloads/zhang-shuo-resume.pdf"]').innerText(),/Chinese résumé/);
  await page.goto(base+'/en/404/');
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.match(await page.locator('h1').innerText(),/no page/);
  await ctx.close();
  console.log(JSON.stringify({result:'pass',checks:results.length,language_pairs:'pass',translation:'pass',media_controls:'pass',pdf_hash:'pass',english_404_page:'pass'},null,2));
}finally{await browser.close();}
