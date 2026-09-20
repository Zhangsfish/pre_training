"""Build the small, embeddable resume font from upstream Noto Sans SC (OFL).

Usage: python resume/scripts/prepare-font.py /path/to/NotoSansSC[wght].ttf
This is an explicit maintenance step, never a network fetch during site build.
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parents[2]
text = "".join(p.read_text(encoding="utf-8") for folder in
               ["resume/variants", "publication"] for p in (root / folder).rglob("*.json"))
text += (root / "resume/scripts/model.mjs").read_text(encoding="utf-8")
text += (root / "site/LINKS.json").read_text(encoding="utf-8")
text += "".join(p.read_text(encoding="utf-8") for p in (root / "publication/projects").glob("*.md"))
text += "教育背景项目与实践• ·—–|()（）"
font = TTFont(sys.argv[1])
if "fvar" in font:
    font = instantiateVariableFont(font, {"wght": 400}, inplace=True)
options = subset.Options()
options.name_IDs = ["*"]
options.name_legacy = True
options.name_languages = ["*"]
worker = subset.Subsetter(options=options)
worker.populate(unicodes=set(range(32, 127)) | {ord(ch) for ch in text})
worker.subset(font)
out = root / "resume/templates/NotoSansSC-resume.ttf"
font.save(out)
print(f"Prepared {out.name}: {out.stat().st_size} bytes")
