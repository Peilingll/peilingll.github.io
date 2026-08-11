#!/usr/bin/env python3
"""
Single Project PDF Generator
Generates one PDF per project with a clean, professional blue theme.
"""

import re
import sys
from pathlib import Path
from datetime import datetime

import yaml
import markdown

try:
    from xhtml2pdf import pisa
except ImportError:
    print("Error: xhtml2pdf not installed. Run: pip install xhtml2pdf")
    sys.exit(1)

# Configuration
BASE_DIR = Path(__file__).parent.parent
CONTENT_DIR = BASE_DIR / "content" / "projects"
STATIC_DIR = BASE_DIR / "static"
OUTPUT_DIR = BASE_DIR / "output"


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    try:
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2].strip()
        return frontmatter or {}, body
    except yaml.YAMLError:
        return {}, content


def fix_image_paths(html: str, static_dir: Path) -> str:
    """Convert relative image paths to absolute file paths."""
    def replace_src(match):
        attr = match.group(1)
        path = match.group(2)
        if path.startswith(('http://', 'https://', 'file://', 'data:')):
            return match.group(0)
        clean_path = path.lstrip('/')
        abs_path = static_dir / clean_path
        if abs_path.exists():
            abs_path_str = str(abs_path).replace('\\', '/')
            return f'{attr}="{abs_path_str}"'
        return match.group(0)

    html = re.sub(r'(src)="(/[^"]+)"', replace_src, html)
    return html


def markdown_to_html(markdown_content: str) -> str:
    """Convert markdown to HTML."""
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'md_in_html'])
    return md.convert(markdown_content)


CSS_TEMPLATE = '''
@page {
    size: A4;
    margin: 1.5cm 2cm;
}

body {
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    color: #000;
    margin: 0;
    padding: 0;
}

/* Header */
.header {
    border-bottom: 2px solid #3070b3;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.title {
    font-size: 14pt;
    font-weight: 600;
    color: #3070b3;
    margin: 0;
    line-height: 1.3;
}

/* Meta info */
.meta {
    margin: 10px 0 15px 0;
    font-size: 9pt;
    color: #000;
}

.meta-row {
    margin-bottom: 2px;
}

.meta-label {
    font-weight: 600;
}

/* Content */
.content h2 {
    font-size: 11pt;
    color: #3070b3;
    margin: 15px 0 8px 0;
    font-weight: 600;
}

.content h3 {
    font-size: 10pt;
    color: #000;
    margin: 12px 0 6px 0;
    font-weight: 600;
}

.content p {
    margin: 6px 0;
    text-align: justify;
}

.content img {
    max-width: 60%;
    height: auto;
    display: block;
    margin: 10px auto;
}

.content em {
    color: #333;
    font-size: 8pt;
}

.content ul, .content ol {
    margin: 6px 0;
    padding-left: 18px;
}

.content li {
    margin-bottom: 3px;
}

.content table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 8pt;
}

.content th {
    background: #3070b3;
    color: white;
    padding: 6px;
    text-align: left;
}

.content td {
    padding: 5px 6px;
    border-bottom: 1px solid #ddd;
}

/* Footer */
.footer {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    font-size: 8pt;
    color: #333;
}

.footer a {
    color: #3070b3;
}
'''


def generate_project_html(frontmatter: dict, content_html: str, project_num: int) -> str:
    """Generate HTML for a single project."""
    title = frontmatter.get('title', f'Project {project_num}')
    unit = frontmatter.get('unit', '')
    supervised = frontmatter.get('supervised', '')
    contributors = frontmatter.get('Contributors', '')

    meta_rows = []
    if unit:
        meta_rows.append(f'<div class="meta-row"><span class="meta-label">Institution:</span> {unit}</div>')
    if supervised:
        meta_rows.append(f'<div class="meta-row"><span class="meta-label">Supervisor:</span> {supervised}</div>')
    if contributors:
        meta_rows.append(f'<div class="meta-row"><span class="meta-label">Contributors:</span> {contributors}</div>')

    meta_html = '\n'.join(meta_rows)

    return f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>{CSS_TEMPLATE}</style>
</head>
<body>
    <div class="header">
        <h1 class="title">{project_num:02d} {title}</h1>
    </div>

    <div class="meta">
        {meta_html}
    </div>

    <div class="content">
        {content_html}
    </div>

    <div class="footer">
        <a href="https://peilingsung.com/">https://peilingsung.com/</a>
    </div>
</body>
</html>
'''


def convert_html_to_pdf(html_content: str, output_path: Path) -> bool:
    """Convert HTML to PDF."""
    with open(output_path, "w+b") as pdf_file:
        pisa_status = pisa.CreatePDF(html_content, dest=pdf_file, encoding='utf-8')
    return pisa_status.err == 0


def generate_single_project(project_num: int):
    """Generate PDF for a single project."""
    file_path = CONTENT_DIR / f"project{project_num}.md"

    if not file_path.exists():
        print(f"Error: {file_path} not found")
        return False

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Read and process
    content = file_path.read_text(encoding='utf-8')
    frontmatter, body = parse_frontmatter(content)
    html_content = markdown_to_html(body)
    html_content = fix_image_paths(html_content, STATIC_DIR)

    # Generate HTML
    full_html = generate_project_html(frontmatter, html_content, project_num)
    full_html = fix_image_paths(full_html, STATIC_DIR)

    # Save HTML preview
    html_path = OUTPUT_DIR / f"project{project_num}_preview.html"
    html_path.write_text(full_html, encoding='utf-8')

    # Generate PDF
    pdf_path = OUTPUT_DIR / f"Project_{project_num:02d}.pdf"
    success = convert_html_to_pdf(full_html, pdf_path)

    print(f"Generated: {pdf_path}")
    print(f"Preview:   {html_path}")

    return success


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_single_project.py <project_number>")
        print("Example: python generate_single_project.py 1")
        sys.exit(1)

    project_num = int(sys.argv[1])
    generate_single_project(project_num)
