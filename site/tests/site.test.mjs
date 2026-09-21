import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {loadContent} from '../scripts/content.mjs';
import {caseSections} from '../scripts/sections.mjs';
import {auditDist,pages} from '../scripts/audit-dist.mjs';
function writeRequiredFiles(dir){
 for(const file of pages){fs.mkdirSync(path.dirname(path.join(dir,file)),{recursive:true});fs.writeFileSync(path.join(dir,file),'<h1>Title</h1>');}
 fs.writeFileSync(path.join(dir,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://zhang-shuo-portfolio.vercel.app/sitemap.xml\n');
 fs.writeFileSync(path.join(dir,'sitemap.xml'),'<?xml version="1.0"?><urlset>'+['/','/work/kin/','/work/spps/','/work/qq-lingxi/','/work/pet/','/work/teaching/','/work/natural-product/','/resume/'].map(route=>`<url><loc>https://zhang-shuo-portfolio.vercel.app${route}</loc></url>`).join('')+'</urlset>');
 fs.writeFileSync(path.join(dir,'favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg"></svg>');
}
test('case sections preserve every approved sentence, without introducing body facts',()=>{
 for(const p of loadContent().projects) {
   const sections=caseSections(p.id,p.body);
   const original=p.body.replace(/^## .+$/gm,'').replace(/^- /gm,'').split(/\r?\n/).filter(s=>s.trim()).join('');
   const rendered=sections.flatMap(s=>s.blocks.flatMap(b=>b.items||[b.text])).join('');
   const sentences=s=>s.split('。').filter(Boolean).sort();
   assert.deepEqual(sentences(rendered),sentences(original),p.id);
 }
});
test('KIN preserves the missed-call problem, state explanation, market scenario and ownership',()=>{
 const p=loadContent().projects.find(p=>p.id==='kin'),s=caseSections(p.id,p.body);
 assert.match(s[0].blocks[0].text,/电话没接通/);
 assert.match(s[1].blocks[0].text,/Now、Today 和 Data/);
 const market=JSON.stringify(s[3]);
 assert.match(market,/2.85亿/);
 assert.match(market,/仅10%/);
 assert.match(market,/2850万/);
 assert.match(market,/1.17亿MAU/);
 assert.doesNotMatch(market,/7130万|1\.43亿DAU|不能直接排名/);
 assert.match(p.ownership,/负责问题判断/);
});
for(const mutation of ['rogue-media','candidate-route','private-field','broken-link','broken-fragment','fake-pdf']) test(`dist gate rejects ${mutation}`,()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pre-training-r03-'));
 try {
   writeRequiredFiles(dir);
   assert.equal(auditDist(dir,loadContent(),{requireResume:false}).result,'pass');
   if(mutation==='rogue-media') fs.writeFileSync(path.join(dir,'unapproved.png'),'not-approved');
   if(mutation==='candidate-route') fs.appendFileSync(path.join(dir,'index.html'),'<div class="review-bar">候选</div>');
   if(mutation==='private-field') fs.appendFileSync(path.join(dir,'index.html'),loadContent().profile.fields.phone);
   if(mutation==='broken-link') fs.appendFileSync(path.join(dir,'index.html'),'<a href="/missing/">Link</a>');
   if(mutation==='fake-pdf') fs.appendFileSync(path.join(dir,'index.html'),'<a href="/resume.pdf">PDF</a>');
   if(mutation==='broken-fragment') fs.appendFileSync(path.join(dir,'index.html'),'<a href="/#missing-teaching">Teaching</a>');
   assert.throws(()=>auditDist(dir,loadContent(),{requireResume:false}));
 } finally {
   assert.equal(path.dirname(path.resolve(dir)),path.resolve(os.tmpdir()));
   assert.ok(path.basename(dir).startsWith('pre-training-r03-'));
   fs.rmSync(dir,{recursive:true,force:true});
 }
});
for(const mutation of ['tampered-pdf','unregistered-variant','resume-contact-in-case']) test(`R04 output rejects ${mutation}`,()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pre-training-r04-'));
 try {
  writeRequiredFiles(dir);
  fs.mkdirSync(path.join(dir,'downloads'));
  const pdf='downloads/zhang-shuo-resume.pdf';fs.copyFileSync(new URL('../public/'+pdf,import.meta.url),path.join(dir,pdf));
  fs.appendFileSync(path.join(dir,'resume/index.html'),loadContent().profile.fields.phone);
  assert.equal(auditDist(dir).result,'pass');
  if(mutation==='tampered-pdf')fs.appendFileSync(path.join(dir,pdf),'tampered');
  if(mutation==='unregistered-variant')fs.copyFileSync(path.join(dir,pdf),path.join(dir,'downloads/ai-product.pdf'));
  if(mutation==='resume-contact-in-case')fs.appendFileSync(path.join(dir,'work/kin/index.html'),loadContent().profile.fields.phone);
  assert.throws(()=>auditDist(dir));
 }finally{assert.equal(path.dirname(path.resolve(dir)),path.resolve(os.tmpdir()));assert.ok(path.basename(dir).startsWith('pre-training-r04-'));fs.rmSync(dir,{recursive:true,force:true});}
});
