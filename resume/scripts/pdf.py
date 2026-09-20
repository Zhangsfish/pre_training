"""Normalize generated PDF metadata, then verify selectable text and link annotations."""
import argparse, json, hashlib
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, ByteStringObject
p=argparse.ArgumentParser()
p.add_argument('action',choices=['normalize','check'])
p.add_argument('pdf')
p.add_argument('--expected')
p.add_argument('--date')
a=p.parse_args()
file=Path(a.pdf)
if a.action=='normalize':
    reader=PdfReader(file)
    writer=PdfWriter(clone_from=reader)
    date='D:'+a.date.replace('-','')+'000000Z'
    writer.add_metadata({'/CreationDate':date,'/ModDate':date,'/Producer':'pre_training resume exporter','/Creator':'ReportLab'})
    from pypdf.generic import TextStringObject
    for page in writer.pages:
        for annotation in page.get('/Annots', []):
            obj=annotation.get_object()
            action=obj.get('/A')
            if action and str(action.get('/URI', '')).startswith('https://resume.invalid/'):
                action.update({TextStringObject('/URI'): TextStringObject('../'+str(action['/URI']).split('https://resume.invalid/',1)[1])})
    writer._ID=ArrayObject([ByteStringObject(b'pretraining-R04--')]*2)
    with file.open('wb') as f: writer.write(f)
else:
    reader=PdfReader(file)
    assert len(reader.pages)==1, f'{len(reader.pages)} pages, expected 1'
    page=reader.pages[0]
    assert abs(float(page.mediabox.width)-595.28)<2 and abs(float(page.mediabox.height)-841.89)<2
    text=page.extract_text(extraction_mode='plain')
    compact=lambda x: ''.join(x.split())
    expected=json.loads(Path(a.expected).read_text(encoding='utf-8-sig'))
    normalized=compact(text)
    cursor=0
    for fragment in expected['ordered_text']:
        at=normalized.find(compact(fragment),cursor)
        assert at>=0, f'Missing or reordered PDF text: {fragment}'
        cursor=at+len(compact(fragment))
    assert not any(x in text for x in ['\ufffd','\u25a0','TODO','source_path','claim_ids'])
    uris=[]
    for annotation in page.get('/Annots',[]):
        obj=annotation.get_object()
        if obj.get('/A') and obj['/A'].get('/URI'): uris.append(str(obj['/A']['/URI']))
    for uri in expected['links']: assert uri in uris, f'Missing PDF link {uri}'
    file.with_suffix('.txt').write_text(text,encoding='utf-8')
    result={'pages':1,'a4':True,'text_order_verified':True,'replacement_characters':False,'links':uris,'text_sha256':hashlib.sha256(text.encode()).hexdigest(),'pdf_sha256':hashlib.sha256(file.read_bytes()).hexdigest()}
    file.with_suffix('.check.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False))
