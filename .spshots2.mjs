import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = '/tmp/panel-shots2';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errors = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=1'],
});

async function shot(name, { width = 1440, height = 900, theme = 'dark', rm = false, zoom = false, mobile = false }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: rm ? 'reduce' : 'no-preference' },
    { name: 'prefers-color-scheme', value: theme },
  ]);
  await page.evaluateOnNewDocument((t) => {
    localStorage.setItem('mc-theme', t);
  }, theme);
  page.on('console', (m) => m.type() === 'error' && errors.push(`${name}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${name}: PAGEERROR ${e.message}`));
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  const st = await page.$('#stack .sp');
  const bb = await st.boundingBox();
  await page.evaluate((y) => window.scrollTo(0, y), bb.y - 140);
  await sleep(mobile ? 2200 : 1400); // fine entrata adesivi
  // hover sulla riga frontend
  if (!mobile) {
    const row = await page.$('#stack .cr');
    const rb = await row.boundingBox();
    await page.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2);
    await sleep(450);
  }
  if (zoom) {
    const el = await page.$('#stack .sp');
    const clip = await el.boundingBox();
    await page.screenshot({ path: `${OUT}/${name}.png`, clip, scale: 2 });
  } else {
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }
  await page.close();
}

await shot('dark-hover', { theme: 'dark' });
await shot('light-hover', { theme: 'light' });
await shot('dark-rest', { theme: 'dark', zoom: true });
await shot('mobile', { width: 390, height: 844, theme: 'dark', mobile: true });
await shot('mobile-after-entry', { width: 390, height: 844, theme: 'dark', mobile: true });
await shot('reduced-hover', { theme: 'dark', rm: true });
await shot('sheet-2x', { theme: 'light', zoom: true });

// verifica dim/lift dopo hover
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(() => localStorage.setItem('mc-theme', 'dark'));
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  const st = await page.$('#stack .sp');
  const bb = await st.boundingBox();
  await page.evaluate((y) => window.scrollTo(0, y), bb.y - 140);
  await sleep(1400);
  const row = await page.$('#stack .cr');
  const rb = await row.boundingBox();
  await page.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2);
  await sleep(450);
  const res = await page.evaluate(() => {
    const stks = [...document.querySelectorAll('#stack .stk')];
    return {
      dimmed: stks.filter((s) => s.dataset.dim === 'true').length,
      lifted: stks.filter((s) => s.dataset.lift === 'true').length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log('dim/lift:', JSON.stringify(res));
  await page.close();
}

await browser.close();
console.log('errors:', errors.length ? errors : 'none');
