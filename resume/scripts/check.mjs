import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {ids,root,sha,loadVariant,inputHash,readJson} from './model.mjs';
const args=process.argv.slice(2),option=k=>args.includes(k)?args[args.indexOf(k)+1]:null;
const targets=option('--variant-file')?[readJson(path.resolve(option('--variant-file')))]:option('--variant')?[loadVariant(option('--variant'))]:ids.map(loadVariant);
for(const v of targets){const latest=readJson(path.join(root,'resume/exports',v.id+'.latest.json'));assert.match(latest.stem,/^zhang-shuo_[a-z0-9-]+_\d{8}$/);const stem=path.join(root,'resume/exports',latest.stem);
 const meta=readJson(stem+'.build.json');assert.equal(meta.input_sha256,inputHash(v));assert.equal(meta.pdf_sha256,sha(fs.readFileSync(stem+'.pdf')));
 console.log(execFileSync(process.env.RESUME_PYTHON||'python',[path.join(root,'resume/scripts/pdf.py'),'check',stem+'.pdf','--expected',stem+'.expected.json'],{encoding:'utf8'}).trim());
 execFileSync(process.env.PDFTOPPM||'pdftoppm',['-png','-r','120','-singlefile',stem+'.pdf',stem]);
 assert.ok(fs.statSync(stem+'.png').size>10000);console.log(`RENDERED ${v.id}: one A4 page, selectable Chinese, ordered text, clickable annotations`);
}
