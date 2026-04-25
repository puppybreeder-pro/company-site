# Lead Magnet PDF Build

This directory contains Markdown lead magnets and reusable PDF template assets.

## What this gives you

- Convert any lead-magnet Markdown file into a branded PDF.
- Keep writing in Markdown while controlling final visual design with HTML/CSS.
- Use one consistent command from `frontend-astro`.

## One-time setup

1. Install app dependencies (if not already installed):
   - from `frontend-astro`, run `npm install`
2. Install Playwright Chromium (required for PDF rendering):
   - from `frontend-astro`, run `npx playwright install chromium`

After this, you can generate PDFs anytime with one command.

## Build commands

From `frontend-astro`:

- Build default file:
  - `npm run build:leadmagnet-pdf`
- Build specific file:
  - `npm run build:leadmagnet-pdf -- ../docs/lead-magnets/your-file.md`

Naming convention is automatic:

- `your-file.md` -> `your-file.pdf`

## Inputs and outputs

- Input markdown:
  - default: `docs/lead-magnets/7-must-haves-professional-breeder-website.md`
  - optional CLI arg: absolute path or path relative to `frontend-astro`
- Template: `docs/lead-magnets/templates/lead-magnet.html`
- Styles: `docs/lead-magnets/templates/lead-magnet.css`
- PDF output: `docs/lead-magnets/dist/<input-file-name>.pdf`
- HTML preview: `docs/lead-magnets/dist/<input-file-name>.preview.html`

## Authoring rules for Markdown

- Keep the first two headings in the Markdown file:
  - `# Free Guide · No Sales Pitch`
  - `## The 7 Must-Haves for a Professional Breeder Website`
- The build script uses those two headings for the cover title and subtitle.
- Content after that is rendered as the PDF body.

## Styling guide (how to customize the look)

Primary style file:

- `docs/lead-magnets/templates/lead-magnet.css`

Main template structure:

- `docs/lead-magnets/templates/lead-magnet.html`

### Most common design tweaks

- **Brand colors**
  - Update CSS variables in `:root`:
    - `--primary`, `--ink`, `--muted`, `--bg-soft`
- **Typography**
  - Body font is controlled in `html, body { font-family: ... }`
  - Heading sizes:
    - `h1` controls cover title size
    - `.content h2` controls section headings
    - `.content h3` controls subsection headings
- **Spacing / readability**
  - Adjust:
    - `.content { font-size: ... }`
    - `.content p { margin: ... }`
    - `.content ul` and `.content li`
- **Page breaks**
  - Manual section break rules are in:
    - `.content h2:nth-of-type(...) { break-before: page; }`
  - Change these if you want different sections to start on new pages.
- **Margins / paper setup**
  - Edit PDF settings in:
    - `frontend-astro/scripts/build-lead-magnet-pdf.mjs`
  - Look for:
    - `format: 'Letter'`
    - `margin: { ... }`
- **Footer text and page numbers**
  - Edit `footerTemplate` in the same script.
  - Current footer shows `PuppyBreeder.PRO` and page numbering.

## Recommended styling workflow

1. Run a build for your Markdown file.
2. Open `docs/lead-magnets/dist/<name>.preview.html` in a browser for quick visual checks.
3. Adjust CSS in `templates/lead-magnet.css`.
4. Re-run build and review final `dist/<name>.pdf`.

This loop is the fastest way to dial in a polished design.

## Troubleshooting

- **Error: Chromium not found**
  - Run `npx playwright install chromium` from `frontend-astro`.
- **File not found error**
  - Confirm your path after `--` is valid and points to a `.md` file.
- **Styles not updating**
  - Re-run the build command; output is static and must be regenerated.
- **Unexpected cover title/subtitle**
  - Confirm the first two headings in the Markdown are correct.
