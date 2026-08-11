#!/usr/bin/env python3
"""
Convert print-ready markdown to PDF.
Usage: python md_to_pdf.py <project_number>
"""

import re
import sys
from pathlib import Path
import markdown

try:
    from xhtml2pdf import pisa
except ImportError:
    print("Error: pip install xhtml2pdf")
    sys.exit(1)

BASE_DIR = Path(__file__).parent.parent
STATIC_DIR = BASE_DIR / "static"
MD_DIR = BASE_DIR / "output" / "md"
OUTPUT_DIR = BASE_DIR / "output"

CSS = '''
@page {
    size: A4;
    margin: 2cm;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9pt;
    line-height: 1.4;
    color: #000;
}

h1 {
    font-size: 13pt;
    font-weight: bold;
    color: #3070b3;
    margin: 0 0 8px 0;
    padding-bottom: 6px;
    border-bottom: 2px solid #3070b3;
}

h2 {
    font-size: 10pt;
    font-weight: bold;
    color: #3070b3;
    margin: 10px 0 5px 0;
}

h3 {
    font-size: 9pt;
    font-weight: bold;
    color: #000;
    margin: 8px 0 4px 0;
}

p {
    margin: 4px 0;
    text-align: justify;
}

strong {
    font-weight: bold;
}

em {
    font-style: italic;
    font-size: 8pt;
    color: #333;
    display: block;
    text-align: center;
    margin: 4px 0 10px 0;
}

center {
    text-align: center;
    margin: 8px 0;
}

img {
    max-width: 35%;
    height: auto;
    display: block;
    margin: 5px auto;
}

p img {
    max-width: 35%;
    display: inline-block;
}

ul, ol {
    margin: 4px 0;
    padding-left: 18px;
}

li {
    margin-bottom: 2px;
}

hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 12px 0;
}

a {
    color: #3070b3;
    text-decoration: none;
}

table {
    margin: 8px auto;
    border-collapse: collapse;
}

td {
    padding: 0 5px;
    border: none;
}
'''


def fix_image_paths(html: str) -> str:
    """Convert relative image paths to absolute."""
    def replace_src(match):
        path = match.group(1)
        if path.startswith(('http://', 'https://', 'file://')):
            return match.group(0)
        clean_path = path.lstrip('/')
        abs_path = STATIC_DIR / clean_path
        if abs_path.exists():
            return f'src="{str(abs_path).replace(chr(92), "/")}"'
        return match.group(0)
    return re.sub(r'src="(/[^"]+)"', replace_src, html)


def md_to_pdf(project_num: int):
    md_file = MD_DIR / f"project{project_num}_print.md"

    if not md_file.exists():
        print(f"Error: {md_file} not found")
        return False

    # Read markdown
    content = md_file.read_text(encoding='utf-8')

    # Convert to HTML
    md = markdown.Markdown(extensions=['tables', 'md_in_html'])
    html_content = md.convert(content)

    # Fix image paths
    html_content = fix_image_paths(html_content)

    # Build full HTML
    full_html = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>{CSS}</style>
</head>
<body>
{html_content}
</body>
</html>'''

    # Generate PDF
    pdf_path = OUTPUT_DIR / f"Project_{project_num:02d}.pdf"
    with open(pdf_path, "w+b") as f:
        pisa.CreatePDF(full_html, dest=f, encoding='utf-8')

    print(f"Generated: {pdf_path}")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python md_to_pdf.py <project_number>")
        sys.exit(1)
    md_to_pdf(int(sys.argv[1]))
