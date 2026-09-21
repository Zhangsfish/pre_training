"""Deterministic A4 PDF from the same display model as the website and Markdown.

Requires reportlab and pypdf. Embeds the checked-in OFL Noto Sans SC subset.
"""
import json, sys
from pathlib import Path
from html import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm

data = json.load(open(sys.argv[1], encoding="utf-8"))
font_path = Path(__file__).resolve().parents[1] / "templates/NotoSansSC-resume.ttf"
font = "ResumeCJK"
registered = TTFont(font, str(font_path))
pdfmetrics.registerFont(registered)
font_check_text = json.dumps(data, ensure_ascii=False).replace("⁶", "6").replace("⁸", "8")
missing = sorted({ch for ch in font_check_text
                  if not ch.isspace() and ord(ch) not in registered.face.charWidths})
if missing:
    raise ValueError("Regenerate the resume font subset; missing glyphs: " + "".join(missing))
c = canvas.Canvas(sys.argv[2], pagesize=A4, invariant=1, pageCompression=1)
c.setTitle(data["name"] + " - 简历")
c.setAuthor(data["name"])
width, height = A4
left, y = 14 * mm, height - 14 * mm
usable = width - 28 * mm

def line(text, size=10.5, leading=14.5, after=3, indent=0):
    global y
    style = ParagraphStyle("line", fontName=font, fontSize=size, leading=leading,
                           wordWrap="CJK", textColor="#202020")
    p = Paragraph(text, style)
    _, h = p.wrap(usable - indent, height)
    if y - h < 14 * mm:
        raise ValueError("Resume exceeds one A4 page; shorten copy, do not shrink type.")
    p.drawOn(c, left + indent, y - h)
    y -= h + after

def heading(text):
    global y
    y -= 7
    line(escape(text), size=12, leading=16, after=4)
    c.setStrokeColorRGB(.55, .55, .55)
    c.setLineWidth(.4)
    c.line(left, y + 1, width - left, y + 1)
    y -= 4

def link(label, url):
    return '<link href="' + escape(url, quote=True) + '">' + escape(label) + '</link>'

def scientific(text):
    return escape(text).replace("⁶⁸Ga", "<super>68</super>Ga")

line(escape(data["name"]), size=22, leading=26, after=5)
line(escape(" · ".join([data["birth"], data["phone"], data["email"]])), after=3)
heading("教育背景")
for edu in data["education"]:
    line(escape(edu["school"]), size=11, after=1)
    line(escape(edu["program"] + " · " + edu["period"]), after=1)
    if edu["detail"]:
        line(escape(edu["detail"]), after=2)
heading("项目与实践")
for project in data["projects"]:
    line(link(project["title"], project["pdf_href"]) +
         (" · " + escape(project["period"]) if project["period"] else ""),
         size=11, leading=15, after=2)
    line(escape(project["status"]) +
         "".join(" · " + link(item["label"], item["url"]) for item in project["links"]),
         size=10.5, leading=14, after=3)
    for bullet in project["bullets"]:
        line("• " + scientific(bullet), after=3, indent=3)
    y -= 4
c.showPage()
c.save()
print(json.dumps({"font": font, "min_font": 14, "bottom_y": y,
                  "embedded_font": bool(font_path), "engine": "ReportLab"}))
