// Static regression only. Does not replace browser, media or viewport checks.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=route=>fs.readFileSync(new URL('../dist/'+route,import.meta.url),'utf8');
const home=html('index.html');
assert.deepEqual([...home.matchAll(/class="work-section work-([^"]+)"/g)].map(m=>m[1]),['qq-lingxi','spps','kin']);
for(const id of ['work','about','teaching','pet','natural-product','contact'])assert.ok(home.includes('id="'+id+'"'));
for(const slug of ['teaching','pet','natural-product'])assert.ok(home.includes('href="/work/'+slug+'/"'));
const checks={
  kin:['电话没接','Now、Today 和 Data','2.85亿','2850万','1.17亿MAU','999元','ChatGPT'],
  spps:['2名机械、1名加工和1名电控','27个','150万','88%','约10个氨基酸'],
  'qq-lingxi':['长期人格画像','当前需求画像','累计约10天','智能连接层','ChatGPT'],
  teaching:['19名','5名','91个','教材','传承'],
  pet:['0.5','68分钟','4小时','第一作者','拟投','2项'],
  'natural-product':['前两步','100g','约5人','约10名']
};
for(const [slug,phrases] of Object.entries(checks)){
  const page=html('work/'+slug+'/index.html');
  for(const phrase of phrases)assert.ok(page.includes(phrase),slug+': missing '+phrase);
  assert.ok(!page.includes('Codex'),slug+': old public tool label');
  assert.ok(!page.includes('研究经历与进展收录于简历'),slug+': obsolete placeholder');
}
const pet=html('work/pet/index.html');
assert.match(pet,/<sup>68<\/sup>Ga/,'pet: 68Ga must use semantic superscript');
assert.ok(!pet.includes('⁶⁸Ga'),'pet: Unicode fake superscript must not appear');
assert.ok(!pet.includes('^68Ga'),'pet: caret notation must not appear');
console.log('PASS: three media works, six cases, personal section, supplementary anchors and final fact signals');
