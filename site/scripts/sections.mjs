// Only approved headings, paragraphs and plain lists. Astro escapes all text.
/** @returns {{heading:string,blocks:({kind:'list',items:string[]}|{kind:'paragraph',text:string})[]}[]} */
export function caseSections(_id, body) {
  const sections=[];
  for(const part of body.trim().split(/^## /m).filter(Boolean)) {
    const [heading,...lines]=part.split(/\r?\n/);
    const blocks=lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean).map(text=>text.startsWith('- ')?{kind:'list',items:text.split('\n').map(s=>s.replace(/^- /,''))}:{kind:'paragraph',text});
    sections.push({heading:heading.trim(),blocks});
  }
  return sections;
}
