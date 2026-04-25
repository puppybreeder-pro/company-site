import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright';

const repoRoot = path.resolve(process.cwd(), '..');
const leadMagnetDir = path.join(repoRoot, 'docs', 'lead-magnets');
const templatePath = path.join(leadMagnetDir, 'templates', 'lead-magnet.html');
const cssPath = path.join(leadMagnetDir, 'templates', 'lead-magnet.css');
const outputDir = path.join(leadMagnetDir, 'dist');
const defaultInputRelativePath = '7-must-haves-professional-breeder-website.md';

function resolveInputPath() {
  const cliArg = process.argv[2];
  if (!cliArg) {
    return path.join(leadMagnetDir, defaultInputRelativePath);
  }

  return path.isAbsolute(cliArg)
    ? cliArg
    : path.resolve(process.cwd(), cliArg);
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function applyTitleAndSubtitle(markdownSource) {
  const lines = markdownSource.split('\n');
  const title = lines[0]?.replace(/^#\s+/, '').trim() ?? '';
  const subtitle = lines[2]?.replace(/^##\s+/, '').trim() ?? '';

  // Remove title/subtitle block from rendered body so it is handled by template.
  const bodyMarkdown = lines.slice(6).join('\n');

  return { title, subtitle, bodyMarkdown };
}

async function buildPdf() {
  await mkdir(outputDir, { recursive: true });
  const inputPath = resolveInputPath();
  const inputBaseName = path.parse(inputPath).name;
  const outputPdfPath = path.join(outputDir, `${inputBaseName}.pdf`);
  const outputPreviewPath = path.join(outputDir, `${inputBaseName}.preview.html`);

  const [markdownSource, template, css] = await Promise.all([
    readFile(inputPath, 'utf8'),
    readFile(templatePath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  const { title, subtitle, bodyMarkdown } = applyTitleAndSubtitle(markdownSource);
  const bodyHtml = md.render(bodyMarkdown);

  const html = template
    .replaceAll('{{TITLE}}', title)
    .replaceAll('{{SUBTITLE}}', subtitle)
    .replace('{{STYLE}}', css)
    .replace('{{CONTENT}}', bodyHtml)
    .replace('{{DATE}}', new Date().toISOString().slice(0, 10));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: outputPdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.65in',
      right: '0.65in',
      bottom: '0.7in',
      left: '0.65in',
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="width:100%;font-size:9px;padding:0 0.65in;color:#5b6070;font-family:Arial,sans-serif;display:flex;justify-content:space-between;">' +
      '<span>PuppyBreeder.PRO</span>' +
      '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span>' +
      '</div>',
  });

  await browser.close();
  await writeFile(outputPreviewPath, html, 'utf8');

  console.log(`PDF generated: ${outputPdfPath}`);
  console.log(`HTML preview generated: ${outputPreviewPath}`);
}

buildPdf().catch((error) => {
  console.error('Lead magnet PDF build failed.');
  console.error(error);
  process.exit(1);
});
