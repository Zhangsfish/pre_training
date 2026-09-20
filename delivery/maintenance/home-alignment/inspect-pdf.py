"""Inspect the published general PDF without modifying it."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from pypdf import PdfReader


source = Path(sys.argv[1]).resolve()
target = Path(sys.argv[2]).resolve()
reader = PdfReader(source)
assert len(reader.pages) == 1 and not reader.is_encrypted
page = reader.pages[0]
text = page.extract_text()
assert text and "张朔" in text and "�" not in text
annotations = []
for reference in page.get("/Annots", []):
    annotation = reference.get_object()
    assert annotation["/Subtype"] == "/Link"
    action = annotation["/A"]
    assert action["/S"] == "/URI"
    annotations.append(
        {
            "uri": str(action["/URI"]),
            "rect": [float(value) for value in annotation["/Rect"]],
        }
    )
assert annotations
result = {
    "path": source.name,
    "pages": 1,
    "width": float(page.mediabox.width),
    "height": float(page.mediabox.height),
    "selectable_text": True,
    "replacement_characters": False,
    "text_length": len(text),
    "sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
    "annotations": annotations,
}
target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(result, ensure_ascii=False))
