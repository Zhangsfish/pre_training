import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadContent,root} from './content.mjs';
import {readJson,inputHash,loadVariant,publicPath} from '../../resume/scripts/model.mjs';
export const pages=['index.html','work/kin/index.html','work/spps/index.html','work/qq-lingxi/index.html','work/pet/index.html','resume/index.html','404.html'];
export function auditDist(directory,data=loadContent(),{requireResume=true}={}) {
 const manifest=readJson(path.join(root,'publication/resume-manifest.json'));
 assert.equal(manifest.href,readJson(path.join(root,'site/LINKS.json')).public_resume.href);
 assert.equal(manifest.variant,'general-zh');assert.equal(manifest.href,'/'+publicPath);assert.equal(manifest.input_sha256,inputHash(loadVariant('general-zh')),'Stale public resume');
 const files=fs.readdirSync(directory,{recursive:true}).filter(f=>fs.statSync(path.join(directory,f)).isFile()).map(f=>f.replaceAll('\\','/'));
 const assets=data.assets.filter(a=>a.publication==='approved'&&a.availability==='codex_ready'&&a.path);
 const forbidden=['source_path','source_blob_sha','claim_ids','permission_note','private_archive','birth_year_month','phone','review-bar','review-note','direction-a','direction-b','direction-c','/review/','experience/','delivery/audits',...data.assets.map(a=>a.source_filename)];
 for(const page of pages) assert.ok(files.includes(page),`Missing page ${page}`);
 if(requireResume)assert.ok(files.includes(publicPath),'Missing public resume PDF');
 let total=0;
 for(const file of files) {
   const bytes=fs.readFileSync(path.join(directory,file));total+=bytes.length;
   assert.ok(file===publicPath||pages.includes(file)||/^_astro\/[\w.-]+\.css$/.test(file)||assets.some(a=>a.path===file),`Unapproved output file: ${file}`);
   if(/\.(html|css)$/.test(file)) {
     const text=bytes.toString('utf8');
     if(file!=='resume/index.html')for(const key of ['phone','birth_year_month'])assert.ok(!text.includes(data.profile.fields[key]),`Resume-only field outside resume: ${file}`);
     for(const marker of forbidden) assert.ok(!text.includes(marker),`Private/candidate marker in ${file}`);
     assert.ok(!/<script\b|<iframe\b|@import|https?:\/\/[^\s"')]+\.(?:woff|ttf)/i.test(text),`Unexpected runtime/embed/font: ${file}`);
     if(file.endsWith('.html')) {
       assert.equal((text.match(/<h1\b/g)||[]).length,1,`Single h1: ${file}`);
       for(const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
         const value=match[1].replaceAll('&amp;','&');
         if(value.startsWith('https:')||value.startsWith('mailto:')) assert.ok(data.links.some(l=>l.url===value),`Unregistered external link: ${file}`);
         else if(!value.startsWith('#')) {
           assert.ok(value.startsWith('/'),`Unexpected relative URL: ${file}`);
           const target=value.split('#')[0].slice(1);
           assert.ok(files.includes(!target||target.endsWith('/')?target+'index.html':target),`Broken local URL ${value} in ${file}`);
         }
         if(/\.pdf(?:$|[?#])/i.test(value))assert.equal(value,manifest.href,'Only the registered general PDF is public');
       }
     }
   } else if(file===publicPath){
     assert.ok(bytes.subarray(0,5).toString()==='%PDF-');assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.sha256,'Public resume hash mismatch');
   } else {
     const a=assets.find(a=>a.path===file);
     assert.equal(createHash('sha256').update(bytes).digest('hex'),a.derived_sha256,'Approved media hash');
   }
 }
 // The whole text-only site fits below the homepage's initial resource budget.
 assert.ok(total<=1024*1024,'Text-only site exceeds 1MB budget');
 return {files,total_bytes:total,client_js_bytes:0,approved_media:assets.length,result:'pass'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) console.log(JSON.stringify(auditDist(path.join(root,'site/dist')),null,2));
