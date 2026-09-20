"""Inspect regenerated PDFs; publish hashes/checks/renders, never private exports."""
import hashlib
import json
import shutil
import sys
from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parent.parent
out = Path(sys.argv[1]).resolve()
out.mkdir(parents=True, exist_ok=True)
result = []
for variant in ['general-zh', 'product-commercial-zh', 'brand-insight-zh', 'ai-product-zh']:
    latest = json.loads((root / f'resume/exports/{variant}.latest.json').read_text())
    stem = root / 'resume/exports' / latest['stem']
    check = json.loads(stem.with_suffix('.check.json').read_text(encoding='utf-8-sig'))
    previous = json.loads((root / f'delivery/audits/R04/attempt-01/pdf-{variant}-check.json').read_text(encoding='utf-8-sig'))
    assert check['text_sha256'] == previous['text_sha256'], f'{variant}: text changed since accepted R04'
    reader = PdfReader(stem.with_suffix('.pdf'))
    assert len(reader.pages) == 1 and not reader.is_encrypted
    catalog = reader.trailer['/Root']
    assert not any(k in catalog for k in ['/OpenAction', '/AA', '/AcroForm'])
    assert not reader.attachments
    names = catalog.get('/Names', {})
    if hasattr(names, 'get_object'):
        names = names.get_object()
    assert '/JavaScript' not in names
    page = reader.pages[0]
    assert '/AA' not in page
    annotations = []
    for ref in page.get('/Annots', []):
        obj = ref.get_object()
        assert obj['/Subtype'] == '/Link' and '/AA' not in obj
        action = obj['/A']
        assert action['/S'] == '/URI'
        uri = str(action['/URI'])
        assert uri.startswith(('../work/', '../#teaching', 'https://github.com/', 'https://jlu-taq-chem.notion.site/'))
        annotations.append({'uri': uri, 'rect': [float(n) for n in obj['/Rect']]})
    metadata = {str(k): str(v) for k, v in reader.metadata.items()}
    assert not any(s in json.dumps(metadata) for s in ['file:', 'Users/', 'Users\\', 'resume.invalid'])
    font_results = []
    for ref in page['/Resources']['/Font'].values():
        font = ref.get_object()
        for face in font.get('/DescendantFonts', [font]):
            face = face.get_object()
            descriptor = face.get('/FontDescriptor')
            assert descriptor is not None
            descriptor = descriptor.get_object()
            assert any(k in descriptor for k in ['/FontFile', '/FontFile2', '/FontFile3'])
            font_results.append(str(descriptor['/FontName']))
    for extension in ['png', 'check.json']:
        source = Path(str(stem) + '.' + extension)
        target = out / f'pdf-{variant}.{extension}'
        if extension == 'check.json':
            target.write_bytes((json.dumps(check, ensure_ascii=False, indent=2)+'\n').encode())
        else:
            shutil.copyfile(source, target)
    result.append({'variant': variant, 'check': check, 'r04_text_stable': True,
                   'width': float(page.mediabox.width), 'height': float(page.mediabox.height),
                   'annotations': annotations, 'metadata': metadata, 'embedded_fonts': font_results,
                   'attachments': 0, 'javascript_or_launch_actions': 0,
                   'render_sha256': hashlib.sha256(stem.with_suffix('.png').read_bytes()).hexdigest()})
(out / 'pdf-inventory.json').write_bytes((json.dumps(result, ensure_ascii=False, indent=2)+'\n').encode())
print('PASS four freshly extracted, rendered, embedded-font PDFs; text stable against accepted R04; no attachments or active actions')
