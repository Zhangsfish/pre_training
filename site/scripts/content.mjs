import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const projectOrder = ['kin', 'spps', 'qq-lingxi', 'pet'];
export const siteFields = ['name', 'romanized_name', 'email', 'github', 'education'];
const resumeFields = [...siteFields, 'birth_year_month', 'phone'];
const supplementaryIds = ['teaching', 'natural-product', 'quickmap'];
const requiredLinks = ['email', 'github-profile', 'kin-repo', 'qq-lingxi-repo', 'notion-organic-synthesis', 'notion-organic-chemistry'];
const json = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const sha256 = (file) => createHash('sha256').update(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n')).digest('hex');
function reviewedHistoricalPet(c,currentHash,data) {
  if(!fs.existsSync(path.join(root,'delivery/maintenance/english-portfolio/pet-public-copy-freeze.json')))return false;
  const policy=json('delivery/maintenance/english-portfolio/pet-public-copy-freeze.json');
  return c.source_path===policy.source_path && policy.claim_ids.includes(c.id)
    && c.source_blob_sha===policy.public_copy_source_blob_sha
    && currentHash===policy.current_source_blob_sha
    && createHash('sha256').update(JSON.stringify(data.claims.filter(claim=>policy.claim_ids.includes(claim.id)))).digest('hex')===policy.pet_claims_sha256
    && JSON.stringify(data.claims)===JSON.stringify(json('publication/claims.json').claims)
    && sha256('publication/projects/pet.md')===policy.pet_public_page_sha256;
}

export function readProject(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid project frontmatter: ${path.basename(file)}`);
  return { ...JSON.parse(match[1]), body: match[2].trim() };
}

export function loadContent() {
  return {
    profile: json('publication/profile.json'),
    home: json('publication/home.json'),
    claims: json('publication/claims.json').claims,
    links: json('site/LINKS.json').links,
    assets: json('site/assets-manifest.json').assets,
    teachingWorks: json('publication/teaching-works.json'),
    teachingWorksEn: json('publication/en/teaching-works.json'),
    projects: fs.readdirSync(path.join(root, 'publication/projects')).filter(f => f.endsWith('.md'))
      .map(f => readProject(path.join(root, 'publication/projects', f))),
  };
}

export function validate(data, { mode = 'review', sourceRoot = root } = {}) {
  const errors = [];
  const warnings = [];
  const fail = (message) => errors.push(message);
  const require = (condition, message) => { if (!condition) fail(message); };
  const index = (items, kind) => {
    const map = new Map();
    for (const item of items) {
      require(typeof item.id === 'string' && item.id.length > 0, `${kind}: missing id`);
      require(!map.has(item.id), `${kind}: duplicate id ${item.id}`);
      map.set(item.id, item);
    }
    return map;
  };
  const claims = index(data.claims, 'claim');
  const projects = index(data.projects, 'project');
  const links = index(data.links, 'link');
  const assets = index(data.assets, 'asset');
  require(['review', 'production'].includes(mode), 'Unknown build mode');
  const source = (file, label) => {
    if (typeof file !== 'string' || !/^(PROFILE\.md|experience\/[\w-]+\.md)$/.test(file)) {
      fail(`${label}: invalid source_path`); return null;
    }
    const full = path.join(sourceRoot, file);
    if (!fs.existsSync(full)) { fail(`${label}: missing source ${file}`); return null; }
    return fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
  };
  for (const c of data.claims) {
    require(['user_confirmed', 'artifact_observed', 'analysis'].includes(c.basis), `${c.id}: invalid basis`);
    require(['confirmed', 'approximate', 'unknown'].includes(c.certainty), `${c.id}: invalid certainty`);
    require(['draft', 'approved', 'excluded'].includes(c.publication), `${c.id}: invalid publication`);
    require(typeof c.text === 'string' && c.text.length > 0, `${c.id}: missing text`);
    require(Array.isArray(c.allowed_contexts) && c.allowed_contexts.every(x => ['site', 'resume'].includes(x)), `${c.id}: invalid contexts`);
    require(/^\d{4}-\d{2}-\d{2}$/.test(c.as_of), `${c.id}: invalid as_of`);
    require(/^[a-f0-9]{40}$/.test(c.source_blob_sha), `${c.id}: invalid source blob SHA`);
    const text = source(c.source_path, c.id);
    if (text) {
      const headings = [...text.matchAll(/^#{1,6} (.+)$/gm)].map(m => m[1].trim());
      require(headings.includes(c.source_heading), `${c.id}: missing source heading`);
      const hash = createHash('sha1').update(`blob ${Buffer.byteLength(text)}\0`).update(text).digest('hex');
      if (hash !== c.source_blob_sha && !reviewedHistoricalPet(c,hash,data)) warnings.push(`${c.id}: source_blob_sha drift; planner must review affected claim`);
    }
  }
  source(data.profile.source_path, 'profile');
  require(JSON.stringify(data.home.project_order) === JSON.stringify(projectOrder), 'home: fixed project order only; excluded or unknown project');
  require(data.home.teaching_id === 'teaching', 'home: missing teaching');
  for (const id of [...projectOrder, ...supplementaryIds]) require(projects.has(id), `Missing project ${id}`);
  for (const context of ['site', 'resume']) {
    const list = data.profile.allowlists[context];
    const allowed = context === 'site' ? siteFields : resumeFields;
    require(Array.isArray(list) && new Set(list).size === list.length && list.every(k => allowed.includes(k) && k in data.profile.fields), `profile: invalid ${context} allowlist`);
  }
  require(Object.keys(data.profile.fields).every(k => resumeFields.includes(k)), 'profile: unsupported private field');
  const refs = (ids, label) => {
    require(Array.isArray(ids) && ids.length > 0, `${label}: missing claim references`);
    for (const id of ids ?? []) {
      const c = claims.get(id);
      if (!c) { fail(`${label}: missing claim ${id}`); continue; }
      require(c.certainty !== 'unknown', `${label}: unknown claim cannot be presented as an outcome (${id})`);
      require(c.publication !== 'excluded', `${label}: excluded claim ${id}`);
      require(c.allowed_contexts.includes('site'), `${label}: claim not allowed on site ${id}`);
      if (mode === 'production') require(c.publication === 'approved', `${label}: unapproved claim ${id}`);
    }
  };
  const publication = (item, label) => {
    require(['draft', 'approved'].includes(item.publication), `${label}: required content excluded or invalid`);
    if (mode === 'production') require(item.publication === 'approved', `${label}: unapproved content`);
  };
  const linkRefs = (ids, label) => {
    require(Array.isArray(ids), `${label}: link_ids required`);
    for (const id of ids ?? []) require(links.has(id), `${label}: missing link ${id}`);
  };
  publication(data.profile, 'profile');
  publication(data.home, 'home');
  refs(data.profile.claim_ids, 'profile');
  for (const edu of data.profile.fields.education) refs(edu.claim_ids, 'education');
  refs(data.home.hero.claim_ids, 'hero');
  linkRefs(data.home.link_ids, 'home');
  for (const item of data.home.methods) {
    refs(item.claim_ids, 'method');
    require(projectOrder.includes(item.project_id), 'method: invalid project');
  }
  for (const item of data.home.personal ?? []) refs(item.claim_ids, 'personal');
  require(data.home.personal?.length === 3, 'home: three personal statements required');
  require(JSON.stringify(data.home.more_projects) === JSON.stringify(['teaching','pet','natural-product']), 'home: supplementary project order');
  for (const p of data.projects) {
    require([...projectOrder, ...supplementaryIds].includes(p.id), `Excluded or unsupported project ${p.id}`);
    publication(p, p.id);
    refs(p.claim_ids, p.id);
    linkRefs(p.link_ids, p.id);
    for (const key of ['title', 'status_label', 'summary', 'ownership', 'result', 'boundary', 'body']) require(typeof p[key] === 'string' && p[key].length > 0, `${p.id}: missing ${key}`);
    require(p.period === null || typeof p.period === 'string', `${p.id}: invalid period`);
    require(Array.isArray(p.media_ids), `${p.id}: media_ids required`);
    for (const id of p.media_ids ?? []) {
      const a = assets.get(id);
      require(a?.publication === 'approved' && a?.availability === 'codex_ready' && !!a?.path, `${p.id}: unavailable or unapproved media ${id}`);
    }
  }
  for (const id of requiredLinks) require(links.has(id), `Missing required link ${id}`);
  require(projects.get('qq-lingxi')?.link_ids.includes('qq-lingxi-repo'), 'QQ repository must be visible');
  for (const id of ['notion-organic-synthesis', 'notion-organic-chemistry']) require(projects.get('teaching')?.link_ids.includes(id), 'Both teaching links must be visible');
  publication(data.teachingWorks, 'teaching works');
  require(data.teachingWorks?.schema_version === 1, 'teaching works: invalid schema');
  require(typeof data.teachingWorks?.intro === 'string' && data.teachingWorks.intro.length > 0, 'teaching works: missing intro');
  const teachingWorks = index(data.teachingWorks?.works ?? [], 'teaching work');
  require(JSON.stringify([...teachingWorks.keys()]) === JSON.stringify([
    'exam-organic-synthesis-i', 'exam-organic-synthesis-ii', 'lecture-mhat', 'lecture-kishi',
  ]), 'teaching works: four reviewed items in fixed order required');
  for (const work of teachingWorks.values()) {
    refs(work.claim_ids, `teaching work ${work.id}`);
    for (const key of ['kind','title','subtitle','contribution','summary','status'])
      require(typeof work[key] === 'string' && work[key].length > 0, `${work.id}: missing ${key}`);
    require(Array.isArray(work.preview_asset_ids), `${work.id}: preview list required`);
    require(new Set(work.preview_asset_ids).size === work.preview_asset_ids.length, `${work.id}: duplicate preview page`);
    const exam = work.id.startsWith('exam-');
    if (exam) require(work.download_asset_id === null, `${work.id}: original exam download forbidden`);
    else require(work.preview_asset_ids?.length === 0, `${work.id}: lecture preview not in current scope`);
    for (const assetId of work.preview_asset_ids ?? []) {
      const asset = assets.get(assetId);
      require(exam && asset?.publication === 'approved' && asset?.availability === 'codex_ready'
        && asset?.type === 'image' && asset?.public_review === 'irreversible_blur_verified'
        && /^media\/teaching\/[\w-]+\.jpe?g$/.test(asset?.path ?? ''),
      `${work.id}: preview must be approved blurred JPEG`);
    }
    if (work.download_asset_id !== null) {
      const asset = assets.get(work.download_asset_id);
      require(!exam && asset?.publication === 'approved' && asset?.availability === 'codex_ready'
        && asset?.type === 'document' && asset?.public_review === 'identifiers_and_notes_removed'
        && /^downloads\/teaching\/[\w-]+\.pdf$/.test(asset?.path ?? ''),
      `${work.id}: lecture download must be an approved reviewed PDF`);
    }
  }
  publication(data.teachingWorksEn, 'English teaching works');
  require(data.teachingWorksEn?.schema_version === 1, 'English teaching works: invalid schema');
  require(typeof data.teachingWorksEn?.intro === 'string' && data.teachingWorksEn.intro.length > 0, 'English teaching works: missing intro');
  const teachingWorksEn = index(data.teachingWorksEn?.works ?? [], 'English teaching work');
  require(JSON.stringify([...teachingWorksEn.keys()]) === JSON.stringify([...teachingWorks.keys()]), 'English teaching works: item order differs');
  for (const work of teachingWorks.values()) {
    const translated = teachingWorksEn.get(work.id);
    if (!translated) continue;
    for (const key of ['kind','title','subtitle','contribution','summary','status'])
      require(typeof translated[key] === 'string' && translated[key].length > 0, `English ${work.id}: missing ${key}`);
    require(JSON.stringify(translated.preview_asset_ids) === JSON.stringify(work.preview_asset_ids)
      && translated.download_asset_id === work.download_asset_id
      && JSON.stringify(translated.claim_ids) === JSON.stringify(work.claim_ids), `English ${work.id}: asset or claim mismatch`);
  }
  for (const link of data.links) {
    try { require(['https:', 'mailto:'].includes(new URL(link.url).protocol), `${link.id}: unsafe URL`); }
    catch { fail(`${link.id}: invalid URL`); }
  }
  for (const a of data.assets) {
    require(/^[a-f0-9]{64}$/.test(a.source_sha256), `${a.id}: invalid original hash`);
    if (a.publication !== 'approved') require(a.path === null && a.derived_sha256 === null && a.integration === 'not_used', `${a.id}: pending media must not be integrated`);
    if (a.path !== null) {
      require(/^(?:media\/[\w./-]+|downloads\/teaching\/[\w-]+\.pdf)$/.test(a.path) && !a.path.includes('..'), `${a.id}: invalid media or teaching PDF path`);
      const file = path.join(sourceRoot, 'site/public', a.path);
      require(fs.existsSync(file), `${a.id}: missing media file`);
      if (fs.existsSync(file)) require(createHash('sha256').update(fs.readFileSync(file)).digest('hex') === a.derived_sha256, `${a.id}: media hash mismatch`);
    }
  }
  return { errors, warnings };
}

// Only the following display fields reach HTML. No whole source/review object spreads.
/** @returns {import('../src/types.js').PublicView} */
export function publicView(data) {
  const pickLink = id => {
    const x = data.links.find(l => l.id === id);
    return { id: x.id, label: x.label, url: x.url, verification: x.verification };
  };
  const fields = Object.fromEntries(data.profile.allowlists.site.map(k => [k, data.profile.fields[k]]));
  const displayProject = id => {
    const p = data.projects.find(p => p.id === id);
    return { id:p.id,title:p.title,status:p.status_label,period:p.period,summary:p.summary,
      ownership:p.ownership,result:p.result,boundary:p.boundary,links:p.link_ids.map(pickLink) };
  };
  return {
    profile: { name: fields.name, romanized_name: fields.romanized_name, email: fields.email,
      education: fields.education.map(e => ({ school: e.school, program: e.program, period: e.period })) },
    hero: { title: data.home.hero.title, eyebrow: data.home.hero.eyebrow, intro: data.home.hero.intro },
    projects: [...data.home.project_order, ...supplementaryIds].map(displayProject),
    personal: data.home.personal.map(p => ({ title:p.title, text:p.text })),
    moreProjects: data.home.more_projects.map(displayProject),
    methods: data.home.methods.map(m => ({ text: m.text, project_id: m.project_id })),
    links: data.home.link_ids.map(pickLink),
  };
}

export function assertValid(mode = 'review') {
  const data = loadContent();
  const { errors, warnings } = validate(data, { mode });
  warnings.forEach(w => console.warn(`WARNING: ${w}`));
  if (errors.length) throw new Error(`Content gate rejected ${mode}:\n${errors.join('\n')}`);
  return data;
}
