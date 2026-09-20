// Only approved headings, paragraphs and plain lists. Astro escapes all text.
/** @returns {{heading:string,blocks:({kind:'list',items:string[]}|{kind:'paragraph',text:string})[]}[]} */
export function caseSections(id, body) {
  const sections=[];
  for(const part of body.trim().split(/^## /m).filter(Boolean)) {
    const [heading,...lines]=part.split(/\r?\n/);
    const blocks=lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean).map(text=>text.startsWith('- ')?{kind:'list',items:text.split('\n').map(s=>s.replace(/^- /,''))}:{kind:'paragraph',text});
    sections.push({heading:heading.trim(),blocks});
  }
  if(id!=='kin') return sections;
  const [observation,proposal,ownership]=sections;
  const sentences=proposal.blocks[0].text.match(/[^。]+。/g);
  if(!sentences||sentences.length!==3) throw new Error('KIN copy structure changed; review the section mapping');
  return [
    {heading:'我的观察',blocks:[observation.blocks[0]]},
    {heading:'三个原始判断',blocks:[observation.blocks[1]]},
    {heading:'从判断到方案',blocks:[{kind:'paragraph',text:sentences[0]}]},
    {heading:'先验证，再投入',blocks:[{kind:'paragraph',text:sentences[2]}]},
    {heading:'后续研究检查',blocks:[{kind:'paragraph',text:sentences[1]}]},ownership,
  ];
}
