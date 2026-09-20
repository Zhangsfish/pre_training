import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {auditDist} from '../../../site/scripts/audit-dist.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const dist=path.join(root,'site/dist');
const output=path.join(root,'delivery/audits/R06/attempt-02/dist-resource-manifest.json');
const base='https://zhang-shuo-portfolio.vercel.app';
const audit=auditDist(dist);
const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
const resources=[];
for(const relativePath of [...audit.files].sort()){
  const local=fs.readFileSync(path.join(dist,relativePath));
  const response=await fetch(`${base}/${relativePath}`,{redirect:'follow'});
  assert.equal(response.status,200,relativePath);
  const remote=Buffer.from(await response.arrayBuffer());
  assert.equal(sha256(remote),sha256(local),`${relativePath} remote hash`);
  resources.push({path:relativePath,bytes:local.length,sha256:sha256(local),url:`${base}/${relativePath}`,final_url:response.url,http_status:response.status,content_type:response.headers.get('content-type'),remote_exact_match:true});
}
const result={checked_at:new Date().toISOString(),base_url:base,result:'pass',files:resources.length,total_bytes:audit.total_bytes,client_js_bytes:audit.client_js_bytes,approved_media:audit.approved_media,resources};
fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
console.log(`PASS ${resources.length} deployed resources exactly match audited dist (${audit.total_bytes} bytes)`);
