import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {loadVariant,validateVariant,root} from './model.mjs';
export function selectJD(jd){
 assert.ok(jd.source&&jd.acquired_at&&jd.text,'JD text/source/date required');assert.ok(jd.requirements.length>0&&jd.requirements.length<=5);
 assert.ok(jd.requirements.every(r=>['must-have','preferable'].includes(r.priority)&&r.text));
 const text=jd.requirements.map(r=>r.text).join(' ');
 // Transparent routing rules, not a match score or a claim of hiring eligibility.
 const preset=/消费者|品牌|用户研究|需求洞察/.test(text)?'brand-insight-zh':/Agent|AI产品|智能体/.test(text)?'ai-product-zh':'product-commercial-zh';
 const v=loadVariant(preset);v.id=jd.id;assert.match(v.id,/^[a-z0-9-]+$/);v.target_label=jd.label;v.public_export=false;
 v.selection_rationale={...v.selection_rationale,jd_source:jd.source,acquired_at:jd.acquired_at,requirements:jd.requirements,limitations:'按显式需求词选取 baseline；不是匹配分或资格认定。真实投递需人工核对原始JD、取舍与缺口。'};
 validateVariant(v);return v;
}
if(process.argv.includes('--jd')){const file=path.resolve(process.argv[process.argv.indexOf('--jd')+1]);const jd=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));const v=selectJD(jd);const out=path.join(root,'resume/exports',v.id);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'variant.json'),JSON.stringify(v,null,2)+'\n');fs.writeFileSync(path.join(out,'MATCH.md'),`# ${jd.label}\n\n${v.selection_rationale.included}\n\n${v.selection_rationale.excluded}\n\n${v.selection_rationale.limitations}\n`);console.log(path.join(out,'variant.json'));}
