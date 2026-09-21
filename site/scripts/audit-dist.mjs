import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadContent,root} from './content.mjs';
import {readJson,inputHash,loadVariant,publicPath} from '../../resume/scripts/model.mjs';
export const pages=['index.html','work/kin/index.html','work/spps/index.html','work/qq-lingxi/index.html','work/pet/index.html','work/teaching/index.html','work/natural-product/index.html','resume/index.html','404.html'];
export const publicFiles=['robots.txt','sitemap.xml','favicon.svg'];
const productionOrigin='https://zhang-shuo-portfolio.vercel.app';
export function auditDist(directory,data=loadContent(),{requireResume=true}={}) {
 const manifest=readJson(path.join(root,'publication/resume-manifest.json'));
 assert.equal(manifest.href,readJson(path.join(root,'site/LINKS.json')).public_resume.href);
 assert.equal(manifest.variant,'general-zh');assert.equal(manifest.href,'/'+publicPath);assert.equal(manifest.input_sha256,inputHash(loadVariant('general-zh')),'Stale public resume');
 const files=fs.readdirSync(directory,{recursive:true}).filter(f=>fs.statSync(path.join(directory,f)).isFile()).map(f=>f.replaceAll('\\','/'));
 const assets=data.assets.filter(a=>a.publication==='approved'&&a.availability==='codex_ready'&&a.path);
 const forbidden=['source_path','source_blob_sha','claim_ids','permission_note','private_archive','birth_year_month','phone','review-bar','review-note','direction-a','direction-b','direction-c','/review/','experience/','delivery/audits',...data.assets.map(a=>a.source_filename)];
 for(const page of pages) assert.ok(files.includes(page),`Missing page ${page}`);
 for(const file of publicFiles) assert.ok(files.includes(file),`Missing public file ${file}`);
 if(requireResume)assert.ok(files.includes(publicPath),'Missing public resume PDF');
 let total=0;
 for(const file of files) {
   const bytes=fs.readFileSync(path.join(directory,file));total+=bytes.length;
   assert.ok(file===publicPath||pages.includes(file)||publicFiles.includes(file)||/^_astro\/[\w.-]+\.(css|js)$/.test(file)||assets.some(a=>a.path===file),`Unapproved output file: ${file}`);
   if(/\.(html|css|js)$/.test(file)) {
     const text=bytes.toString('utf8');
     if(file!=='resume/index.html')for(const key of ['phone','birth_year_month'])assert.ok(!text.includes(data.profile.fields[key]),`Resume-only field outside resume: ${file}`);
     for(const marker of forbidden) assert.ok(!text.includes(marker),`Private/candidate marker in ${file}`);
     assert.ok(!/<iframe\b|@import|https?:\/\/[^\s"')]+\.(?:woff|ttf)/i.test(text),`Unexpected embed/font: ${file}`);
     if(file.endsWith('.html')) for(const script of text.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) { assert.ok(!script[2].trim(),'Inline script rejected'); assert.match(script[1],/src="\/_astro\/[\w.-]+\.js"/,'Only built local gallery scripts'); }
     if(file.endsWith('.js')) assert.ok(!/https?:|fetch\(|XMLHttpRequest|WebSocket|eval\(/.test(text),'Gallery JS must stay local');
     if(file.endsWith('.html')) {
       assert.equal((text.match(/<h1\b/g)||[]).length,1,`Single h1: ${file}`);
       for(const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
         const value=match[1].replaceAll('&amp;','&');
         if(value.startsWith('https:')||value.startsWith('mailto:')) assert.ok(value.startsWith(productionOrigin+'/')||data.links.some(l=>l.url===value),`Unregistered external link: ${file}`);
         else if(!value.startsWith('#')) {
           assert.ok(value.startsWith('/'),`Unexpected relative URL: ${file}`);
           const target=value.split('#')[0].slice(1);
           assert.ok(files.includes(!target||target.endsWith('/')?target+'index.html':target),`Broken local URL ${value} in ${file}`);
         }
         if(value.includes('#') && (value.startsWith('/') || value.startsWith('#'))) {
           const [route,fragment]=value.split('#');
           if(fragment) {
             const target=route ? route.slice(1) : file;
             const targetFile=!target||target.endsWith('/')?target+'index.html':target;
             const targetHtml=fs.readFileSync(path.join(directory,targetFile),'utf8');
             assert.ok(targetHtml.includes('id="'+fragment+'"'),`Broken local fragment ${value} in ${file}`);
           }
         }
         if(/\.pdf(?:$|[?#])/i.test(value))assert.equal(value,manifest.href,'Only the registered general PDF is public');
       }
     }
   } else if(file==='robots.txt'){
     const text=bytes.toString('utf8');assert.match(text,/User-agent: \*/);assert.match(text,new RegExp(`Sitemap: ${productionOrigin.replaceAll('.','\\.')}\\/sitemap\\.xml`));
   } else if(file==='sitemap.xml'){
     const text=bytes.toString('utf8');assert.match(text,/^<\?xml/);assert.ok(!text.includes('404'), '404 must not appear in sitemap');
     for(const route of ['/','/work/kin/','/work/spps/','/work/qq-lingxi/','/work/pet/','/work/teaching/','/work/natural-product/','/resume/']) assert.ok(text.includes(`<loc>${productionOrigin}${route}</loc>`),`Missing sitemap route ${route}`);
   } else if(file==='favicon.svg'){
     const text=bytes.toString('utf8');assert.match(text,/^<svg\b/);assert.ok(bytes.length<2048,'Favicon must stay lightweight');
   } else if(file===publicPath){
     assert.ok(bytes.subarray(0,5).toString()==='%PDF-');assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.sha256,'Public resume hash mismatch');
   } else {
     const a=assets.find(a=>a.path===file);
     assert.equal(createHash('sha256').update(bytes).digest('hex'),a.derived_sha256,'Approved media hash');
   }
 }
 // Full films load only after an explicit user action; originals never ship.
 assert.ok(total<=32*1024*1024,'Published gallery exceeds 32MB total budget');
 const jsBytes=files.filter(f=>f.endsWith('.js')).reduce((n,f)=>n+fs.statSync(path.join(directory,f)).size,0);
 assert.ok(jsBytes<20000,'Gallery runtime exceeds 20KB');
 return {files,total_bytes:total,client_js_bytes:jsBytes,approved_media:assets.length,result:'pass'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) console.log(JSON.stringify(auditDist(path.join(root,'site/dist')),null,2));
