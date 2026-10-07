import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const task=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const root=path.resolve(task,'../../..');
const directory=path.join(root,'site/dist');
const manifestPath=path.join(task,'dist-manifest.json');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');

if(process.argv[2]==='local'){
 const files=[];
 function visit(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())visit(file);
  else{const bytes=fs.readFileSync(file);files.push({path:path.relative(directory,file).replaceAll('\\','/'),bytes:bytes.length,sha256:sha(bytes)});}
 }}
 visit(directory);files.sort((a,b)=>a.path.localeCompare(b.path));
 const result={files,total_bytes:files.reduce((n,f)=>n+f.bytes,0)};
 fs.writeFileSync(manifestPath,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({files:files.length,total_bytes:result.total_bytes}));
}else if(process.argv[2]==='remote'){
 const origin=process.argv[3];if(!/^https:\/\/[^/]+$/.test(origin||''))throw new Error('Pass HTTPS origin without trailing slash');
 const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
 const results=[];
 for(const file of manifest.files){
  const response=await fetch(origin+'/'+file.path+'?audit='+Date.now(),{cache:'no-store'});
  const bytes=Buffer.from(await response.arrayBuffer());
  results.push({path:file.path,status:response.status,bytes:bytes.length,sha256:sha(bytes),match:response.status===200&&bytes.length===file.bytes&&sha(bytes)===file.sha256});
 }
 const report={checked_at:new Date().toISOString(),origin,expected_files:manifest.files.length,matched:results.filter(r=>r.match).length,results};
 fs.writeFileSync(path.join(task,'production-resource-audit.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({origin,matched:report.matched,expected_files:report.expected_files}));
 if(report.matched!==report.expected_files)process.exitCode=1;
}else throw new Error('Use local or remote <HTTPS origin>');
