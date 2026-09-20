import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {root} from '../site/scripts/content.mjs';
export async function serve(pdfFixtures={}){
 const directory=path.resolve(root,'site/dist'),requests=[];
 const server=http.createServer((req,res)=>{
  const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1);
  // Explicit local-only PDF fixtures: never copy non-general variants into dist.
  if(Object.hasOwn(pdfFixtures,relative)){requests.push({path:'/'+relative,status:200,fixture:true});res.writeHead(200,{'Content-Type':'application/pdf'}).end(fs.readFileSync(pdfFixtures[relative]));return;}
  const file=path.resolve(directory,relative+(!relative||relative.endsWith('/')?'index.html':''));
  const exists=file.startsWith(directory+path.sep)&&fs.existsSync(file)&&fs.statSync(file).isFile();
  const status=exists?200:404;requests.push({path:'/'+relative,status});
  res.writeHead(status,{'Content-Type':exists&&file.endsWith('.pdf')?'application/pdf':exists&&file.endsWith('.css')?'text/css':'text/html; charset=utf-8'});
  res.end(fs.readFileSync(exists?file:path.join(directory,'404.html')));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 return {base:`http://127.0.0.1:${server.address().port}`,requests,close:()=>new Promise(resolve=>server.close(resolve))};
}
