import { getCollection } from 'astro:content';
import type {PublicView,DisplayProject} from '../types';
import { publicView } from '../../scripts/content.mjs';
import profile from '../../../publication/profile.json';
import home from '../../../publication/home.json';
import registry from '../../LINKS.json';
import claims from '../../../publication/claims.json';
import { caseSections } from '../../scripts/sections.mjs';
import {englishCases,englishHome,englishProfile,englishUi} from '../../scripts/english.mjs';
export const names: Record<string,string> = {kin:'KIN',spps:'SPPS','qq-lingxi':'QQ 灵犀',pet:'PET',teaching:'教学与传承','natural-product':'天然产物全合成'};
export type CaseProject=DisplayProject & {sections:ReturnType<typeof caseSections>};
export type SiteView=PublicView & {cases:CaseProject[];teaching:DisplayProject;educationDetail:string};
export async function siteContent(locale:'zh'|'en'='zh'):Promise<SiteView> {
  const entries = await getCollection('projects');
  const view = publicView({profile,home,links:registry.links,projects:entries.map(e=>e.data)});
  const cases = view.projects.map(p=>({...p,sections:caseSections(p.id,entries.find(e=>e.data.id===p.id)!.body!)}));
  const education=claims.claims.find(c=>c.id==='profile.jlu')!;
  if(education.publication!=='approved'||!education.allowed_contexts.includes('site')) throw new Error('Education claim is not approved');
  if(locale==='zh')return {...view,cases,teaching:view.projects.find(p=>p.id==='teaching')!,educationDetail:education.text};
  const translated=englishCases(cases) as CaseProject[];
  const englishHomeCopy=englishHome();
  const englishEducation=englishProfile().education;
  const ui=englishUi();
  if(englishHomeCopy.personal.length!==view.personal.length||englishEducation.length!==view.profile.education.length)throw new Error('English home/profile count mismatch');
  const byId=new Map(translated.map(p=>[p.id,p]));
  const translateLink=(link:typeof view.links[number])=>({...link,label:(ui.links as Record<string,string>)[link.id]??link.label});
  const englishView:PublicView={...view,
    profile:{...view.profile,education:view.profile.education.map((item,i)=>({...item,...englishEducation[i]}))},
    hero:{...view.hero,title:englishHomeCopy.hero.title,eyebrow:englishHomeCopy.hero.eyebrow,intro:englishHomeCopy.hero.intro},
    personal:view.personal.map((item,i)=>({...item,...englishHomeCopy.personal[i]})),
    projects:translated.map(p=>({...p,links:p.links.map(translateLink)})),
    moreProjects:view.moreProjects.map(p=>byId.get(p.id)!),
    links:view.links.map(translateLink),
  };
  return {...englishView,cases:translated.map(p=>({...p,links:p.links.map(translateLink)})),teaching:byId.get('teaching')!,educationDetail:education.text};
}
