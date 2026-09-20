import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {ids,loadVariant,render,inputHash,root,sha,publicPath,readJson} from './model.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const args=process.argv.slice(2),option=k=>args.includes(k)?args[args.indexOf(k)+1]:null;
const targets=option('--variant-file')?[readJson(path.resolve(option('--variant-file')))]:option('--variant')?[loadVariant(option('--variant'))]:ids.map(loadVariant);
if(args.includes('--publish')){assert.equal(targets.length,1);assert.equal(targets[0].id,'general-zh');assert.ok(!option('--variant-file'),'Publish only the checked-in general baseline');}
const buildDate=option('--date')||(args.includes('--verify-published')?readJson(path.join(root,'publication/resume-manifest.json')).date:new Date().toISOString().slice(0,10));
assert.match(buildDate,/^\d{4}-\d{2}-\d{2}$/);
const exportsDir=path.join(root,'resume/exports');fs.mkdirSync(exportsDir,{recursive:true});
const python=process.env.RESUME_PYTHON||'python';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
try {for(const v of targets){
 const {html,md,display:d}=render(v);const stem=path.join(exportsDir,`zhang-shuo_${v.id}_${buildDate.replaceAll('-','')}`);
 fs.writeFileSync(stem+'.html',html);fs.writeFileSync(stem+'.md',md);
 const page=await browser.newPage();await page.setContent(html.replace('<head>','<head><base href="https://resume.invalid/downloads/">'));
 await page.evaluate(()=>document.fonts.ready);await page.emulateMedia({media:'print'});
 const layout=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,min_font:Math.min(...[...document.querySelectorAll('p,li')].map(e=>parseFloat(getComputedStyle(e).fontSize))),text:document.body.innerText}));assert.ok(layout.min_font>=10*96/72);
 await page.pdf({path:stem+'.pdf',format:'A4',preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});await page.close();
 execFileSync(python,[path.join(root,'resume/scripts/pdf.py'),'normalize',stem+'.pdf','--date',buildDate]);
 const expected={ordered_text:[d.name,`${d.birth} · ${d.phone} · ${d.email}`,'教育背景',...d.education.flatMap(x=>[x.school,`${x.program} · ${x.period}`,...(x.detail?[x.detail]:[])]),'项目与实践',...d.projects.flatMap(p=>[p.title,...(p.period?[p.period]:[]),p.status,...p.links.map(l=>l.label),...p.bullets])],links:d.projects.flatMap(p=>[p.pdf_href,...p.links.map(l=>l.url)])};
 fs.writeFileSync(stem+'.expected.json',JSON.stringify(expected,null,2)+'\n');
 fs.writeFileSync(stem+'.build.json',JSON.stringify({variant:v.id,input_sha256:inputHash(v),pdf_sha256:sha(fs.readFileSync(stem+'.pdf')),layout,browser:browser.version()},null,2)+'\n');
 if(args.includes('--publish')){assert.equal(v.id,'general-zh');assert.equal(v.public_export,true);fs.mkdirSync(path.join(root,'site/public/downloads'),{recursive:true});fs.copyFileSync(stem+'.pdf',path.join(root,'site/public',publicPath));fs.writeFileSync(path.join(root,'publication/resume-manifest.json'),JSON.stringify({schema_version:1,variant:v.id,href:'/'+publicPath,date:buildDate,sha256:sha(fs.readFileSync(stem+'.pdf')),input_sha256:inputHash(v),authorization:'delivery/prompts/R04_RESUMES.md',reviewer_decision:'pending'},null,2)+'\n');}
 if(args.includes('--verify-published')&&v.id==='general-zh'){const m=readJson(path.join(root,'publication/resume-manifest.json'));assert.equal(m.sha256,sha(fs.readFileSync(stem+'.pdf')),'Published PDF differs from fresh build');assert.equal(m.input_sha256,inputHash(v));}
 fs.writeFileSync(path.join(exportsDir,v.id+'.latest.json'),JSON.stringify({stem:path.basename(stem),date:buildDate})+'\n');
 console.log(`BUILT ${v.id}: ${path.relative(root,stem)}.{html,md,pdf} (10.5pt; A4 14mm margins)`);
}}finally{await browser.close();}
