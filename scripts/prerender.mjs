import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { renderApp, renderHead, absoluteUrl, isPlaceholderUrl } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const assets = await fs.readdir(path.join(dist, 'assets'));
const preloadFonts = assets
  .filter((file) => /^space-grotesk-latin-wght-normal.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join('');

const templatePath = path.join(dist, 'index.html');
const template = await fs.readFile(templatePath, 'utf8');
const html = template.replace('<!--app-head-->', preloadFonts + renderHead()).replace('<!--app-html-->', renderApp());

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${absoluteUrl('/')}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;

await Promise.all([
  fs.writeFile(templatePath, html),
  fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap),
  fs.writeFile(path.join(dist, 'robots.txt'), robots),
]);
await fs.rm(ssrDir, { recursive: true, force: true });

console.log('Pre-rendering completato: index.html, sitemap.xml, robots.txt');
if (isPlaceholderUrl) {
  console.warn('\x1b[33mATTENZIONE: VITE_SITE_URL non impostata, URL canonici e sitemap puntano a localhost.\x1b[0m');
}
