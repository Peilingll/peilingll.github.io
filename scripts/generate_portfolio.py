#!/usr/bin/env python3
"""
Portfolio PDF Generator
Converts Hugo project markdown files to a professional PDF portfolio.
Uses Python markdown library for Markdown→HTML conversion and xhtml2pdf for PDF generation.
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime
from io import BytesIO

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
CSS_FILE = Path(__file__).parent / "portfolio.css"

# Output files
OUTPUT_PDF = OUTPUT_DIR / "Portfolio_SONG_PEI_LING.pdf"
OUTPUT_HTML = OUTPUT_DIR / "portfolio_temp.html"


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
    except yaml.YAMLError as e:
        print(f"Warning: Failed to parse frontmatter: {e}")
        return {}, content


def fix_image_paths(html: str, static_dir: Path) -> str:
    """Convert relative image paths to absolute file paths."""
    def replace_src(match):
        attr = match.group(1)  # src or href
        path = match.group(2)

        if path.startswith(('http://', 'https://', 'file://', 'data:')):
            return match.group(0)

        # Remove leading slash and construct absolute path
        clean_path = path.lstrip('/')
        abs_path = static_dir / clean_path

        if abs_path.exists():
            # Use forward slashes for path
            abs_path_str = str(abs_path).replace('\\', '/')
            return f'{attr}="{abs_path_str}"'
        else:
            print(f"Warning: Image not found: {abs_path}")
            return match.group(0)

    # Fix src and href attributes
    html = re.sub(r'(src)="(/[^"]+)"', replace_src, html)
    html = re.sub(r'(href)="(/images/[^"]+)"', replace_src, html)

    return html


def remove_iframes(html: str) -> str:
    """Remove iframe elements and add note about external PDFs."""
    # Replace iframes with a note
    iframe_pattern = r'<iframe[^>]*src="([^"]*)"[^>]*>.*?</iframe>'

    def replace_iframe(match):
        src = match.group(1)
        return f'<p class="iframe-note"><em>[External content: {src}]</em></p>'

    return re.sub(iframe_pattern, replace_iframe, html, flags=re.DOTALL | re.IGNORECASE)


def markdown_to_html(markdown_content: str) -> str:
    """Convert markdown to HTML using Python markdown library."""
    md = markdown.Markdown(
        extensions=[
            'tables',
            'fenced_code',
            'codehilite',
            'toc',
            'md_in_html',
        ],
        extension_configs={
            'codehilite': {'css_class': 'highlight'},
        }
    )
    return md.convert(markdown_content)


def get_project_files() -> list[Path]:
    """Get all project markdown files sorted by name."""
    files = list(CONTENT_DIR.glob("project*.md"))
    # Sort by project number
    def sort_key(p):
        match = re.search(r'project(\d+)', p.stem)
        return int(match.group(1)) if match else 0
    return sorted(files, key=sort_key)


def generate_cover_page() -> str:
    """Generate cover page HTML."""
    return f'''
    <div class="cover-page">
        <div class="cover-content">
            <h1 class="cover-title">Portfolio</h1>
            <div class="cover-divider"></div>
            <h2 class="cover-author">SONG PEI-LING</h2>
            <p class="cover-subtitle">M.Sc. Geodesy and Geoinformation</p>
            <p class="cover-subtitle">Technical University of Munich</p>
            <p class="cover-date">{datetime.now().strftime("%B %Y")}</p>
        </div>
    </div>
    '''


def generate_toc(projects: list[dict]) -> str:
    """Generate table of contents HTML."""
    toc_items = ""
    for i, proj in enumerate(projects, 1):
        title = proj.get('title', f'Project {i}')
        subtitle = proj.get('subtitle', '')
        toc_items += f'''
        <div class="toc-item">
            <span class="toc-number">{i:02d}</span>
            <div class="toc-text">
                <span class="toc-title">{title}</span>
                <span class="toc-subtitle">{subtitle}</span>
            </div>
        </div>
        '''

    return f'''
    <div class="toc-page">
        <h1 class="toc-header">Contents</h1>
        <div class="toc-list">
            {toc_items}
        </div>
    </div>
    '''


def generate_project_page(frontmatter: dict, html_content: str, project_num: int) -> str:
    """Generate a single project page HTML."""
    title = frontmatter.get('title', f'Project {project_num}')
    subtitle = frontmatter.get('subtitle', '')
    unit = frontmatter.get('unit', '')
    supervised = frontmatter.get('supervised', '')
    contributors = frontmatter.get('Contributors', '')
    date = frontmatter.get('date', '')
    tags = frontmatter.get('tags', [])

    # Format date if it's a date object
    if hasattr(date, 'strftime'):
        date = date.strftime('%Y-%m')
    elif date:
        date = str(date)[:7]  # Get YYYY-MM

    # Generate tags HTML
    tags_html = ''
    if tags:
        tag_list = ', '.join(tags) if isinstance(tags, list) else str(tags)
        tags_html = f'<div class="project-tags">{tag_list}</div>'

    # Generate metadata HTML
    meta_items = []
    if unit:
        meta_items.append(f'<div class="meta-item"><strong>Institution:</strong> {unit}</div>')
    if supervised:
        meta_items.append(f'<div class="meta-item"><strong>Supervised by:</strong> {supervised}</div>')
    if contributors:
        meta_items.append(f'<div class="meta-item"><strong>Contributors:</strong> {contributors}</div>')

    meta_html = '\n'.join(meta_items)

    return f'''
    <div class="project-page">
        <div class="project-header">
            <div class="project-number">{project_num:02d}</div>
            <h1 class="project-title">{title}</h1>
            <p class="project-subtitle">{subtitle}</p>
            {tags_html}
            <div class="project-meta">
                {meta_html}
            </div>
        </div>
        <div class="project-content">
            {html_content}
        </div>
    </div>
    '''


def get_css_content() -> str:
    """Read CSS file and return contents optimized for xhtml2pdf."""
    # Read the CSS file
    if CSS_FILE.exists():
        css = CSS_FILE.read_text(encoding='utf-8')
    else:
        css = ""

    # Add xhtml2pdf specific styles
    xhtml2pdf_css = '''
    /* xhtml2pdf specific styles */
    @page {
        size: A4;
        margin: 2cm 2cm;
        @frame footer {
            -pdf-frame-content: footerContent;
            bottom: 0.5cm;
            margin-left: 2cm;
            margin-right: 2cm;
            height: 1cm;
        }
    }

    body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 10pt;
        line-height: 1.5;
        color: #333;
    }

    /* Cover page */
    .cover-page {
        page-break-after: always;
        text-align: center;
        padding-top: 200px;
        background-color: #1a1a2e;
        color: white;
        height: 100%;
        margin: -2cm;
        padding: 2cm;
        padding-top: 250px;
    }

    .cover-title {
        font-size: 48pt;
        font-weight: 300;
        letter-spacing: 5px;
        margin-bottom: 30px;
        color: white;
    }

    .cover-divider {
        width: 100px;
        height: 3px;
        background-color: #e94560;
        margin: 30px auto;
    }

    .cover-author {
        font-size: 24pt;
        font-weight: 400;
        letter-spacing: 3px;
        margin-bottom: 15px;
        color: white;
    }

    .cover-subtitle {
        font-size: 12pt;
        font-weight: 300;
        margin: 8px 0;
        color: #cccccc;
    }

    .cover-date {
        font-size: 11pt;
        margin-top: 60px;
        color: #999999;
    }

    /* Table of contents */
    .toc-page {
        page-break-after: always;
        padding: 20px 0;
    }

    .toc-header {
        font-size: 28pt;
        font-weight: 300;
        color: #1a1a2e;
        letter-spacing: 3px;
        margin-bottom: 40px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e94560;
    }

    .toc-item {
        margin-bottom: 15px;
        padding: 10px 0;
        border-bottom: 1px solid #eeeeee;
    }

    .toc-number {
        font-size: 14pt;
        font-weight: 600;
        color: #e94560;
        display: inline-block;
        width: 40px;
        vertical-align: top;
    }

    .toc-text {
        display: inline-block;
        width: 85%;
    }

    .toc-title {
        font-size: 11pt;
        font-weight: 500;
        color: #333333;
        display: block;
    }

    .toc-subtitle {
        font-size: 9pt;
        color: #666666;
        display: block;
        margin-top: 3px;
    }

    /* Project pages */
    .project-page {
        page-break-before: always;
    }

    .project-header {
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e94560;
    }

    .project-number {
        font-size: 36pt;
        font-weight: 700;
        color: #e94560;
        opacity: 0.3;
    }

    .project-title {
        font-size: 18pt;
        font-weight: 600;
        color: #1a1a2e;
        margin: 5px 0 10px 0;
        line-height: 1.3;
    }

    .project-subtitle {
        font-size: 11pt;
        font-weight: 400;
        color: #666666;
        font-style: italic;
        margin: 0 0 10px 0;
    }

    .project-tags {
        font-size: 8pt;
        color: #888888;
        margin-bottom: 15px;
    }

    .project-meta {
        background-color: #f8f9fa;
        padding: 12px;
        font-size: 9pt;
    }

    .meta-item {
        margin-bottom: 5px;
    }

    .meta-item strong {
        color: #1a1a2e;
    }

    /* Content styles */
    .project-content h2 {
        font-size: 14pt;
        font-weight: 600;
        color: #1a1a2e;
        margin-top: 25px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #dddddd;
    }

    .project-content h3 {
        font-size: 12pt;
        font-weight: 600;
        color: #333333;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .project-content h4 {
        font-size: 11pt;
        font-weight: 600;
        color: #444444;
        margin-top: 15px;
        margin-bottom: 8px;
    }

    .project-content p {
        margin: 10px 0;
        text-align: justify;
    }

    .project-content img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 15px auto;
    }

    .project-content em {
        font-style: italic;
        color: #666666;
    }

    /* Tables */
    .project-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
        font-size: 9pt;
    }

    .project-content th {
        background-color: #1a1a2e;
        color: white;
        padding: 10px;
        text-align: left;
        font-weight: 500;
    }

    .project-content td {
        padding: 8px 10px;
        border-bottom: 1px solid #dddddd;
    }

    /* Code */
    .project-content code {
        font-family: Courier, monospace;
        font-size: 9pt;
        background-color: #f4f4f4;
        padding: 2px 5px;
    }

    .project-content pre {
        background-color: #282c34;
        color: #abb2bf;
        padding: 12px;
        font-size: 8pt;
        line-height: 1.4;
        overflow-x: auto;
    }

    /* Lists */
    .project-content ul, .project-content ol {
        margin: 10px 0;
        padding-left: 25px;
    }

    .project-content li {
        margin-bottom: 5px;
    }

    /* Blockquote */
    .project-content blockquote {
        border-left: 3px solid #e94560;
        margin: 15px 0;
        padding: 10px 15px;
        background-color: #f8f9fa;
        font-style: italic;
    }

    /* References */
    .reference-item {
        font-size: 8pt;
        line-height: 1.4;
        text-align: justify;
    }

    /* Iframe note */
    .iframe-note {
        background-color: #fff3cd;
        border: 1px solid #ffc107;
        padding: 10px;
        text-align: center;
        font-size: 9pt;
    }

    /* Strong text */
    strong {
        font-weight: 600;
        color: #1a1a2e;
    }
    '''

    return xhtml2pdf_css


def generate_full_html(projects_html: list[str], projects_data: list[dict]) -> str:
    """Generate the complete HTML document."""
    cover = generate_cover_page()
    toc = generate_toc(projects_data)
    projects = '\n'.join(projects_html)
    css = get_css_content()

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Portfolio - Song Pei-Ling</title>
    <style>
    {css}
    </style>
</head>
<body>
    {cover}
    {toc}
    {projects}
    <div id="footerContent">
        <p style="text-align: center; font-size: 9pt; color: #666;">Portfolio - Song Pei-Ling</p>
    </div>
</body>
</html>
'''


def convert_html_to_pdf(html_content: str, output_path: Path) -> bool:
    """Convert HTML to PDF using xhtml2pdf."""
    with open(output_path, "w+b") as pdf_file:
        pisa_status = pisa.CreatePDF(
            html_content,
            dest=pdf_file,
            encoding='utf-8'
        )
    return pisa_status.err == 0


def main():
    """Main function to generate the portfolio PDF."""
    print("=" * 50)
    print("Portfolio PDF Generator")
    print("=" * 50)

    # Check dependencies
    print("\n[1/5] Checking dependencies...")

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Get project files
    print("\n[2/5] Reading project files...")
    project_files = get_project_files()
    print(f"Found {len(project_files)} projects")

    # Process each project
    print("\n[3/5] Processing projects...")
    projects_html = []
    projects_data = []

    for i, file_path in enumerate(project_files, 1):
        print(f"  Processing: {file_path.name}")

        # Read and parse markdown
        content = file_path.read_text(encoding='utf-8')
        frontmatter, body = parse_frontmatter(content)

        # Convert markdown to HTML
        html_content = markdown_to_html(body)

        # Fix image paths
        html_content = fix_image_paths(html_content, STATIC_DIR)

        # Remove iframes
        html_content = remove_iframes(html_content)

        # Generate project page
        project_html = generate_project_page(frontmatter, html_content, i)
        projects_html.append(project_html)
        projects_data.append(frontmatter)

    # Generate full HTML document
    print("\n[4/5] Generating HTML...")
    full_html = generate_full_html(projects_html, projects_data)

    # Fix image paths in the full document (for cover, etc.)
    full_html = fix_image_paths(full_html, STATIC_DIR)

    # Save HTML for preview
    OUTPUT_HTML.write_text(full_html, encoding='utf-8')
    print(f"  HTML saved: {OUTPUT_HTML}")

    # Generate PDF
    print("\n[5/5] Generating PDF...")
    try:
        success = convert_html_to_pdf(full_html, OUTPUT_PDF)
        if success:
            print(f"  PDF saved: {OUTPUT_PDF}")
        else:
            print("  Warning: PDF generation completed with some errors")
            print(f"  PDF saved: {OUTPUT_PDF}")
    except Exception as e:
        print(f"Error generating PDF: {e}")
        print("You can still view the HTML file for preview.")
        return 1

    print("\n" + "=" * 50)
    print("Portfolio generation complete!")
    print(f"PDF: {OUTPUT_PDF}")
    print(f"HTML Preview: {OUTPUT_HTML}")
    print("=" * 50)

    return 0


if __name__ == "__main__":
    sys.exit(main())
