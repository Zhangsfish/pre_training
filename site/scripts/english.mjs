import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {readProject} from './content.mjs';
import {caseSections} from './sections.mjs';

// Astro bundles this module into dist/.prerender, so import.meta.url is not a stable project root.
const root=[process.env.PRETRAINING_ROOT,process.cwd(),path.dirname(process.cwd())]
  .filter(Boolean).find(candidate=>fs.existsSync(path.join(candidate,'publication/en/ui.md')));
if(!root)throw new Error('English publication source directory not found');
const directory=path.join(root,'publication/en');
const digest=file=>createHash('sha256').update(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')).digest('hex');
function readDocument(name,expectedSource){
  const document=readProject(path.join(directory,name));
  if(document.source_path!==expectedSource)throw new Error(`English source path mismatch: ${name}`);
  if(document.source_sha256!==digest(path.join(root,expectedSource)))throw new Error(`English source changed: ${name}`);
  return document;
}
export const englishHome=()=>readDocument('home.md','publication/home.json');
export const englishProfile=()=>readDocument('profile.md','publication/profile.json');
export const englishGallery=()=>readDocument('gallery.md','publication/gallery.json');
export const englishApps=()=>readDocument('apps-showcase.md','publication/apps-showcase.json');
export const englishResume=()=>readDocument('resume.md','resume/variants/general-zh.json');
export function englishUi(){
  const document=readProject(path.join(directory,'ui.md'));
  const expected=['site/src/layouts/BaseLayout.astro','site/src/pages/index.astro','site/src/pages/work/[slug].astro','site/src/pages/resume/index.astro','site/src/pages/404.astro','site/src/components/AppFilm.astro','site/src/components/AppCarousel.astro','site/src/components/MediaExperience.astro','site/src/components/GalleryRuntime.astro','site/src/scripts/gallery.ts'];
  if(JSON.stringify(document.source_paths)!==JSON.stringify(expected))throw new Error('English UI source index is incomplete');
  return document;
}
export function englishCases(chineseCases){
  return chineseCases.map(project=>{
    const english=readDocument(`projects/${project.id}.md`,`publication/projects/${project.id}.md`);
    if(english.id!==project.id)throw new Error(`English case ID mismatch: ${project.id}`);
    const sections=caseSections(project.id,english.body);
    if(sections.length!==project.sections.length)throw new Error(`English case section count mismatch: ${project.id}`);
    return {...project,title:english.title,status:english.status_label,period:english.period,summary:english.summary,ownership:english.ownership,result:english.result,boundary:english.boundary,sections};
  });
}
export function overlayGallery(chinese){
  const english=englishGallery();
  if(english.projects.length!==chinese.projects.length)throw new Error('English gallery project count mismatch');
  return {...chinese,title:english.title,intro:english.intro,projects:chinese.projects.map((project,i)=>{
    const translation=english.projects[i];
    if(project.id!==translation.id||project.scenes.length!==translation.scenes.length)throw new Error(`English gallery mismatch: ${project.id}`);
    return {...project,name:translation.name,label:translation.label,caption:translation.caption,scenes:project.scenes.map((scene,index)=>({...scene,label:translation.scenes[index]}))};
  })};
}
export function overlayApps(chinese){
  const english=englishApps();
  if(english.apps.length!==chinese.apps.length)throw new Error('English app count mismatch');
  return {...chinese,apps:chinese.apps.map((app,i)=>{
    const translation=english.apps[i];
    if(app.id!==translation.id||app.slides.length!==translation.slides.length)throw new Error(`English app mismatch: ${app.id}`);
    return {...app,name:translation.name,label:translation.label,tagline:translation.tagline,status:translation.status,scenario:translation.scenario,product:translation.product,film_note:translation.film_note,image_note:translation.image_note,slides:app.slides.map((slide,index)=>({...slide,label:translation.slides[index]}))};
  })};
}
