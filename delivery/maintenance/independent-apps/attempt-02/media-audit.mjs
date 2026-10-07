import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const dir=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(dir,'../../../..');
const ffmpeg=process.env.FFMPEG||'E:/video_to_md/readable-transcript/resource/bin/ffmpeg.exe';
const ffprobe=process.env.FFPROBE||'E:/video_to_md/readable-transcript/resource/bin/ffprobe.exe';
const configs=[
 {name:'lecture-film-zh',source:'lecture-zh-latest',duration:20.4,repo:'lecture-asset',commit:'862532409a43fa7e3e224cdd00cc296130b719d4',path:'marketing/video/v2/review/director-r3-caption-male/director-cut-zh-workbuddy-720.mp4'},
 {name:'lecture-film-en',source:'lecture-en-latest',duration:20.4,repo:'lecture-asset',commit:'862532409a43fa7e3e224cdd00cc296130b719d4',path:'marketing/video/v2/review/director-r3-caption-male/director-cut-en-chatgpt-720.mp4'},
 {name:'everwhile-film-en',source:'everwhile-en-latest',duration:18,repo:'Elapse',commit:'34bc5e808d79c03b7a8cb0e74200b51ce99ca4ad',path:'marketing/video/everwhile-v1/review/director-r2/EVERWHILE_R2_EN_720.mp4'}
];
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const results=configs.map(config=>{
 const file=path.join(root,'site/public/media',config.name+'.mp4');
 const source=path.resolve(dir,'../tmp',config.source+'.mp4');
 const probe=spawnSync(ffprobe,['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8'});
 assert.equal(probe.status,0);const metadata=JSON.parse(probe.stdout);
 const video=metadata.streams.find(s=>s.codec_type==='video');
 assert.equal(video.width,720);assert.equal(video.height,1280);assert.equal(video.avg_frame_rate,'30/1');
 assert.ok(Math.abs(Number(metadata.format.duration)-config.duration)<.1);
 const decode=spawnSync(ffmpeg,['-v','error','-i',file,'-f','null','-'],{encoding:'utf8'});
 assert.equal(decode.status,0);assert.equal(decode.stderr,'');
 return {...config,source_url:`https://github.com/Zhangsfish/${config.repo}/blob/${config.commit}/${config.path}`,source_sha256:hash(source),derived_sha256:hash(file),bytes:fs.statSync(file).size,width:video.width,height:video.height,fps:video.avg_frame_rate,full_audio_video_decode:'pass',transform:config.repo==='lecture-asset'?'20.4s; fade video/audio 19.6–20.4s; exclude QR/download end card':'complete 18s; no timing/copy changes',encoding:'H.264 CRF28, preset medium, 720×1280/30fps, yuv420p, AAC96k, faststart'};
});
fs.writeFileSync(path.join(dir,'media-provenance.json'),JSON.stringify({checked_at:new Date().toISOString(),results},null,2)+'\n');
console.log('PASS: all three web films fully decoded; exact source/derivative hashes recorded');
