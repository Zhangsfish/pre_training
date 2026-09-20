import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {loadContent,root,validate} from '../../site/scripts/content.mjs';
export {root};
export const ids=['general-zh','product-commercial-zh','brand-insight-zh','ai-product-zh'];
export const publicPath='downloads/zhang-shuo-resume.pdf';
export const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
export const canonical=file=>fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n').replace(/^\uFEFF/,'');
export const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const names={kin:'KIN | 家庭日常连接产品方案',spps:'SPPS | 智能化流动多肽合成仪','qq-lingxi':'QQ 灵犀 | AI 产品原型',pet:'PET | 科研实践',teaching:'有机化学实验 II | 课程助教'};
export function loadVariant(id){assert.ok(ids.includes(id),'Unsupported baseline');return readJson(path.join(root,`resume/variants/${id}.json`));}
export function validateVariant(v,data=loadContent()){
 const result=validate(data,{mode:'production'});assert.deepEqual(result.errors,[]);assert.deepEqual(result.warnings,[],'Source drift requires planner review');
 assert.match(v.id,/^[a-z0-9-]+$/);assert.equal(v.locale,'zh-CN');assert.ok(ids.includes(v.preset));assert.equal(v.approved_for_export,true);
 assert.deepEqual(v.section_order,['education','projects']);assert.ok(v.experience_order.length>=2&&v.experience_order.length<=4);assert.equal(new Set(v.experience_order).size,v.experience_order.length);
 assert.ok(!v.public_export||v.id==='general-zh','Only general may be public');
 for(const [file,hash] of Object.entries(v.source_snapshot)){assert.ok(/^(publication\/(?:claims\.json|profile\.json|projects\/[\w-]+\.md)|site\/LINKS\.json)$/.test(file));assert.equal(sha(canonical(path.join(root,file))),hash,`Stale snapshot ${file}`);}
 for(const file of ['publication/claims.json','publication/profile.json','site/LINKS.json',...v.experience_order.map(id=>`publication/projects/${id}.md`)])assert.ok(v.source_snapshot[file],'Missing source snapshot');
 const claims=new Map(data.claims.map(c=>[c.id,c]));
 for(const id of v.selected_claim_ids){const c=claims.get(id);assert.ok(c&&c.publication==='approved'&&c.allowed_contexts.includes('resume')&&c.certainty!=='unknown',`Illegal claim ${id}`);}
 assert.equal(new Set(v.selected_claim_ids).size,v.selected_claim_ids.length);
 const used=new Set(['profile.identity','profile.pku','profile.jlu']);
 for(const id of v.experience_order){assert.ok(Object.hasOwn(names,id));assert.ok(Array.isArray(v.bullets[id])&&v.bullets[id].length);if(id==='spps')used.add('spps.period');
  for(const b of v.bullets[id]){assert.ok(typeof b.text==='string'&&b.text.length>5);assert.ok(b.claim_ids.length);for(const ref of b.claim_ids){assert.ok(v.selected_claim_ids.includes(ref));used.add(ref);}assert.ok(!/[<>]|TODO|source_path|claim_ids|95%|90%|获奖冠军|已发表|已投稿|已录用/.test(b.text),'Unsafe resume expression');}
 }
 assert.deepEqual([...used].sort(),[...v.selected_claim_ids].sort(),'Unused or missing claim references');
 const text=id=>(v.bullets[id]||[]).map(b=>b.text).join('');
 if(v.experience_order.includes('kin')){assert.match(text('kin'),/父母/);assert.match(text('kin'),/Watch|腕表/);assert.match(text('kin'),/情景/);assert.match(text('kin'),/ChatGPT/);}
 if(v.experience_order.includes('spps')){assert.match(text('spps'),/高层.*脚本/);assert.match(text('spps'),/低层.*协作者/);assert.match(text('spps'),/交接/);}
 if(v.experience_order.includes('qq-lingxi')){assert.match(text('qq-lingxi'),/ChatGPT/);assert.match(text('qq-lingxi'),/复赛/);}
 if(v.experience_order.includes('pet')){assert.match(text('pet'),/第一作者论文初稿/);assert.match(text('pet'),/拟投JMC/);assert.match(text('pet'),/已有主要设备/);assert.match(text('pet'),/预计.*专利申请/);}
 return data;
}
/** @param {any} v @param {Pick<ReturnType<typeof loadContent>, 'profile'|'claims'|'projects'|'links'>} data */
export function display(v,data=validateVariant(v)){
 const f=Object.fromEntries(data.profile.allowlists.resume.map(k=>[k,data.profile.fields[k]]));
 const education=f.education.map(e=>({school:e.school,program:e.program,period:e.period,detail:e.school==='吉林大学'?data.claims.find(c=>c.id==='profile.jlu').text.split('；')[1]:''}));
 // Use the already deployed domain so links also work in a downloaded standalone PDF.
 const projects=v.experience_order.map(id=>({id,title:names[id],status:data.projects.find(p=>p.id===id).status_label,period:data.projects.find(p=>p.id===id).period,local_href:`/work/${id}/`,pdf_href:`https://zhang-shuo-portfolio.vercel.app/work/${id}/`,links:data.projects.find(p=>p.id===id).link_ids.filter(id=>id!=='kin-repo').map(id=>data.links.find(l=>l.id===id)),bullets:v.bullets[id].map(b=>b.text)}));
 return {name:f.name,birth:f.birth_year_month,phone:f.phone,email:f.email,education,projects};
}
export function render(v){
 const d=display(v),e=escape;
 const contact=`${d.birth} · ${d.phone} · ${d.email}`;
 const edu=d.education.map(x=>`<article><h3>${e(x.school)}</h3><p>${e(x.program)} · ${e(x.period)}</p>${x.detail?'<p>'+e(x.detail)+'</p>':''}</article>`).join('');
 const projects=d.projects.map(p=>`<article><h3><a href="${e(p.pdf_href)}">${e(p.title)}</a>${p.period?' · '+e(p.period):''}</h3><p class="status">${e(p.status)}${p.links.map(l=>` · <a href="${e(l.url)}">${e(l.label)}</a>`).join('')}</p><ul>${p.bullets.map(b=>`<li>${e(b)}</li>`).join('')}</ul></article>`).join('');
 const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${e(d.name)} - 简历</title><style>${canonical(path.join(root,'resume/templates/print.css'))}</style></head><body><header><h1>${e(d.name)}</h1><p>${e(contact)}</p></header><main><section><h2>教育背景</h2>${edu}</section><section><h2>项目与实践</h2>${projects}</section></main></body></html>`;
 const md=`# ${d.name}\n\n${contact}\n\n## 教育背景\n\n${d.education.map(x=>`### ${x.school}\n\n${x.program} · ${x.period}${x.detail?'\n\n'+x.detail:''}`).join('\n\n')}\n\n## 项目与实践\n\n${d.projects.map(p=>`### [${p.title}](${p.local_href})${p.period?' · '+p.period:''}\n\n${p.status}\n\n${p.bullets.map(b=>'- '+b).join('\n')}${p.links.length?'\n\n'+p.links.map(l=>`[${l.label}](${l.url})`).join(' · '):''}`).join('\n\n')}\n`;
 return {html,md,display:d};
}
export function inputHash(v){return sha(JSON.stringify({variant:v,template:canonical(path.join(root,'resume/templates/print.css')),model:canonical(path.join(root,'resume/scripts/model.mjs')),exporter:canonical(path.join(root,'resume/scripts/build.mjs')),pdf:canonical(path.join(root,'resume/scripts/pdf.py')),reportlab:canonical(path.join(root,'resume/scripts/reportlab-export.py')),font:sha(fs.readFileSync(path.join(root,'resume/templates/NotoSansSC-resume.ttf')))}));}
