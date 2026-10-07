export {};
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector<HTMLDialogElement>('#media-dialog')!;
const content = dialog.querySelector<HTMLDivElement>('.dialog-content')!;
const title = dialog.querySelector<HTMLHeadingElement>('#media-title')!;
let opener: HTMLElement | null = null;
const players = [...document.querySelectorAll<HTMLVideoElement>('[data-preview]')];
const visible = new Set<HTMLVideoElement>();
const blocked = new Set<HTMLVideoElement>();
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll<HTMLImageElement>('[data-slide]')];
 const counter=carousel.querySelector<HTMLElement>('[data-count]')!;
 const caption=carousel.querySelector<HTMLElement>('[data-caption]')!;
 const zoom=carousel.querySelector<HTMLButtonElement>('[data-zoom]')!;
 let index=0;
 const show=(next:number)=>{
  index=(next+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.hidden=i!==index);
  counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  caption.textContent=slides[index].alt.split('：').at(-1)||'';
  zoom.dataset.zoom=slides[index].getAttribute('src')!;
  zoom.dataset.title=slides[index].alt;
 };
 carousel.querySelector('[data-prev]')?.addEventListener('click',()=>show(index-1));
 carousel.querySelector('[data-next]')?.addEventListener('click',()=>show(index+1));
});
document.querySelectorAll<HTMLElement>('[data-app-film-group]').forEach(group=>{
 const video=group.querySelector<HTMLVideoElement>('[data-app-film]')!;
 const source=video.querySelector<HTMLSourceElement>('source')!;
 const buttons=[...group.querySelectorAll<HTMLButtonElement>('[data-app-film-language]')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
  if(button.getAttribute('aria-pressed')==='true')return;
  video.pause();
  source.src=button.dataset.src!;
  video.setAttribute('aria-label',`${group.dataset.name} ${button.textContent?.trim()}宣传片`);
  video.load();
  buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 }));
});
function sync(v:HTMLVideoElement) {
 const button=v.closest('.media-experience')!.querySelector<HTMLButtonElement>('.preview-toggle')!;
 const play=visible.has(v)&&!blocked.has(v)&&!reduced.matches&&!document.hidden&&!dialog.open;
 if(play){if(!v.getAttribute('src'))v.src='/media/'+v.dataset.preview;v.play().then(()=>{v.classList.add('playing');button.textContent='暂停预览 Ⅱ';button.setAttribute('aria-label','暂停预览');button.setAttribute('aria-pressed','false');}).catch(()=>{v.classList.remove('playing');button.textContent='播放预览 ▶';button.setAttribute('aria-label','播放预览');});}
 else{v.pause();button.textContent='播放预览 ▶';button.setAttribute('aria-label','播放预览');button.setAttribute('aria-pressed','true');}
}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target as HTMLVideoElement;e.isIntersecting?visible.add(v):visible.delete(v);sync(v);}),{threshold:.35});
players.forEach(v=>observer.observe(v));
reduced.addEventListener('change',()=>players.forEach(sync));
document.addEventListener('visibilitychange',()=>players.forEach(sync));
document.querySelectorAll<HTMLElement>('.media-experience').forEach(ex=>{
 const v=ex.querySelector<HTMLVideoElement>('video');
 ex.querySelector('.preview-toggle')?.addEventListener('click',()=>{
  if(!v)return;
  if(!v.paused){blocked.add(v);sync(v);}else{blocked.delete(v);if(!v.src)v.src='/media/'+v.dataset.preview;v.play().then(()=>{v.classList.add('playing');const b=ex.querySelector('.preview-toggle')!;b.textContent='暂停预览 Ⅱ';b.setAttribute('aria-label','暂停预览');b.setAttribute('aria-pressed','false');}).catch(()=>{});}
 });
 ex.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach(b=>b.addEventListener('click',()=>{
  if(v){blocked.add(v);sync(v);v.classList.remove('playing');}
  const img=ex.querySelector<HTMLImageElement>('.cover,.machine-cover')!;img.src=b.dataset.scene!;img.alt=b.textContent?.trim()||'作品画面';
  ex.querySelectorAll('[data-scene]').forEach(s=>s.setAttribute('aria-pressed',String(s===b)));
  (ex.querySelector('[data-zoom]') as HTMLElement).dataset.zoom=b.dataset.scene;
 }));
});
function open(el:HTMLElement,kind:'film'|'zoom'){
 opener=el;title.textContent=el.dataset.title||'作品预览';content.replaceChildren();
 if(kind==='film'){const video=document.createElement('video');video.src=el.dataset.film!;video.controls=true;video.playsInline=true;video.autoplay=true;video.preload='metadata';video.setAttribute('aria-label',title.textContent);content.append(video);}
 else{const img=document.createElement('img');img.src=el.dataset.zoom!;img.alt=title.textContent;content.append(img);}
 dialog.showModal();document.body.classList.add('modal-open');players.forEach(sync);
}
document.querySelectorAll<HTMLElement>('[data-film]').forEach(b=>b.addEventListener('click',()=>open(b,'film')));
document.querySelectorAll<HTMLElement>('[data-zoom]').forEach(b=>b.addEventListener('click',()=>open(b,'zoom')));
dialog.querySelector('.close-dialog')!.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{const video=content.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load();}content.replaceChildren();document.body.classList.remove('modal-open');players.forEach(sync);opener?.focus();});
