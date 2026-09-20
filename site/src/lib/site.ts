import { getCollection } from 'astro:content';
import { publicView } from '../../scripts/content.mjs';
import profile from '../../../publication/profile.json';
import home from '../../../publication/home.json';
import registry from '../../LINKS.json';
import claims from '../../../publication/claims.json';
import { caseSections } from '../../scripts/sections.mjs';
export const names: Record<string,string> = {kin:'KIN',spps:'SPPS','qq-lingxi':'QQ 灵犀',pet:'PET',teaching:'教学与传承','natural-product':'天然产物全合成'};
export async function siteContent() {
  const entries = await getCollection('projects');
  const view = publicView({profile,home,links:registry.links,projects:entries.map(e=>e.data)});
  const cases = view.projects.map(p=>({...p,sections:caseSections(p.id,entries.find(e=>e.data.id===p.id)!.body!)}));
  const education=claims.claims.find(c=>c.id==='profile.jlu')!;
  if(education.publication!=='approved'||!education.allowed_contexts.includes('site')) throw new Error('Education claim is not approved');
  return {...view,cases,teaching:view.projects.find(p=>p.id==='teaching')!,educationDetail:education.text};
}
