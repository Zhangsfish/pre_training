import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { reviewRoutes, visualReview } from '../review/routes.mjs';
test('production injects zero candidate routes',()=>{
 const routes=[];
 visualReview(false).hooks['astro:config:setup']({injectRoute:r=>routes.push(r)});
 assert.deepEqual(routes,[]);
});
test('review registers exactly three local prerendered candidates',()=>{
 const routes=reviewRoutes(true);
 assert.deepEqual(routes.map(r=>r.pattern),['/review/a/','/review/b/','/review/c/']);
 assert.ok(routes.every(r=>r.prerender && fs.existsSync(r.entrypoint)));
});
