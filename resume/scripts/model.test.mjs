import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {ids,loadVariant,validateVariant,root,readJson} from './model.mjs';
import {selectJD} from './select-jd.mjs';
for(const id of ids)test(`${id}: approved claims, snapshots, ownership and limits`,()=>validateVariant(loadVariant(id)));
test('JD fixtures change selection/order while homepage remains identical to accepted R07',()=>{
 const a=selectJD(readJson(new URL('../fixtures/product-commercial.json',import.meta.url))),b=selectJD(readJson(new URL('../fixtures/consumer-insight.json',import.meta.url)));
 assert.notDeepEqual(a.experience_order,b.experience_order);assert.notDeepEqual(a.selected_claim_ids,b.selected_claim_ids);assert.equal(a.experience_order[0],'spps');assert.equal(b.experience_order[0],'kin');assert.equal(a.public_export,false);assert.equal(b.public_export,false);
 for(const f of ['site/src/pages/index.astro','publication/home.json'])assert.equal(fs.readFileSync(root+f,'utf8').replace(/\r\n/g,'\n'),execFileSync('git',['show','223dd0f0a920de05ba8648f25a0a463ece26b9e8:'+f],{cwd:root,encoding:'utf8'}).replace(/\r\n/g,'\n'));
});
for(const mutation of ['unknown-claim','status-inflation','stale-source','public-variant'])test(`reject ${mutation}`,()=>{
 const v=loadVariant('brand-insight-zh');if(mutation==='unknown-claim')v.selected_claim_ids.push('invented.sales');if(mutation==='status-inflation')v.bullets.kin[0].text+='已发表';if(mutation==='stale-source')v.source_snapshot['publication/claims.json']='0'.repeat(64);if(mutation==='public-variant')v.public_export=true;assert.throws(()=>validateVariant(v));
});
