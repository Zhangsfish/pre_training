import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { loadContent, validate, publicView, root } from '../scripts/content.mjs';

const fresh = () => structuredClone(loadContent());
const rejects = (mutate, expected) => {
  const d = fresh(); mutate(d);
  assert.match(validate(d).errors.join('\n'), expected);
};

test('draft source set passes local review without source drift', () => {
  assert.deepEqual(validate(fresh()), {errors:[], warnings:[]});
});
test('missing claim fails closed', () => rejects(d => d.claims.shift(), /missing claim profile.identity/));
test('unknown cannot become an outcome', () => rejects(d => {
  const c = d.claims.find(c => c.id === 'pet.status'); c.certainty = 'unknown'; c.text = '已获得 2 项成果';
}, /unknown claim cannot be presented as an outcome/));
test('excluded project cannot enter default home', () => rejects(d => {
  d.projects.push({...d.projects[0], id:'excluded-example', publication:'excluded'});
  d.home.project_order.push('excluded-example');
}, /excluded or unknown project/));
test('draft is blocked from production', () => assert.match(validate(fresh(), {mode:'production'}).errors.join('\n'), /unapproved content/));
test('approving document shells does not approve their underlying claims', () => {
  const d=fresh(); d.profile.publication=d.home.publication='approved';
  d.projects.forEach(p=>p.publication='approved');
  assert.match(validate(d,{mode:'production'}).errors.join('\n'), /unapproved claim/);
});
test('approved synthetic in-memory copy passes gate without changing real drafts', () => {
  const d=fresh(); d.profile.publication=d.home.publication='approved';
  [...d.projects,...d.claims].forEach(p=>p.publication='approved');
  assert.deepEqual(validate(d,{mode:'production'}).errors, []);
  assert.equal(loadContent().profile.publication,'draft');
});
test('duplicate identifiers rejected', () => rejects(d => d.claims.push(d.claims[0]), /duplicate id/));
test('nonexistent source rejected', () => rejects(d => d.claims[0].source_path='experience/nonexistent.md', /missing source/));
test('wrong source heading rejected', () => rejects(d => d.claims[0].source_heading='missing heading', /missing source heading/));
test('source drift requests targeted review rather than silently updating it', () => {
  const d=fresh(); d.claims[0].source_blob_sha='0'.repeat(40);
  const result=validate(d);
  assert.equal(result.errors.length,0); assert.match(result.warnings[0],/profile.identity.*drift/);
  assert.equal(d.claims[0].source_blob_sha,'0'.repeat(40));
});
for (const id of ['qq-lingxi-repo','notion-organic-synthesis','notion-organic-chemistry']) {
  test(`required external link ${id} must exist`, () => rejects(d => d.links=d.links.filter(l=>l.id!==id), /Missing required link/));
}
test('course links must also appear in teaching, not only registry', () => rejects(d => d.projects.find(p=>p.id==='teaching').link_ids=[], /Both teaching links must be visible/));
test('private resume fields cannot leak through site allowlist', () => rejects(d => {
  d.profile.fields.phone='TEST-PHONE'; d.profile.allowlists.site.push('phone');
}, /invalid site allowlist/));
test('explicit projection omits source metadata and phone', () => {
  const d=fresh(); d.profile.fields.phone='TEST-PHONE'; d.profile.allowlists.resume.push('phone');
  const output=JSON.stringify(publicView(d));
  for(const forbidden of ['TEST-PHONE','source_blob_sha','source_path','claim_ids','permission_note','private_archive']) assert.ok(!output.includes(forbidden));
});
test('pending media cannot be referenced', () => rejects(d => d.projects[0].media_ids=['spps-original-1'], /unavailable or unapproved media/));
test('pending original cannot be assigned public path', () => rejects(d => d.assets[0].path='media/does-not-exist.jpg', /pending media must not be integrated/));
test('excluded and resume-only claims cannot render', () => {
  rejects(d=>d.claims[0].publication='excluded',/excluded claim/);
  rejects(d=>d.claims[0].allowed_contexts=['resume'],/claim not allowed on site/);
});
test('production command ignores inherited review env and exits nonzero before output', () => {
  const result=spawnSync(process.execPath,['scripts/build.mjs','production'], {
    cwd: new URL('../',import.meta.url),encoding:'utf8',env:{...process.env,PRETRAINING_REVIEW:'1'},
  });
  assert.notEqual(result.status,0); assert.match(result.stderr,/Content gate rejected production/);
  assert.ok(!fs.existsSync(`${root}/site/dist/index.html`));
});
