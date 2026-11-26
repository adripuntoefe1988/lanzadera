// Revisión automática de una web construida: móvil y ordenador, errores, desbordes y capturas.
// Necesita Playwright (npm i -D playwright && npx playwright install chromium).
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
import { createRequire } from 'node:module';
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch { console.log('Para revisar instala Playwright: npm i -D playwright && npx playwright install chromium'); process.exit(0); }
const raiz = path.join(RAIZ, 'dist');
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(raiz, p); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.end(fs.readFileSync(f)); }).listen(0);
const url = `http://localhost:${srv.address().port}/${slug}/`;
const salida = path.join(RAIZ, 'dist', slug, '_revision'); fs.mkdirSync(salida, { recursive: true });
const b = await chromium.launch();
let fallos = 0;
for (const [nombre, w, h] of [['movil', 390, 844], ['ordenador', 1440, 900], ['portatil-bajo', 1366, 657]]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => { try { sessionStorage.setItem('lz-entrada', '1'); } catch {} });
  const p = await c.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' });
  // baja poco a poco para que carguen las imágenes diferidas
  await p.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += innerHeight * .8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 300)); });
  const r = await p.evaluate(() => {
    const hero = document.querySelector('.hero h1');
    return {
      desborde: document.documentElement.scrollWidth > innerWidth + 1,
      tituloCortado: hero ? hero.getBoundingClientRect().bottom > innerHeight : false,
      sinAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
      rotas: [...document.images].filter(i => i.getAttribute('src') && !/^https?:/.test(i.getAttribute('src')) && i.complete && i.naturalWidth === 0 && !i.src.startsWith('data:')).map(i => i.getAttribute('src')),
    };
  });
  await p.screenshot({ path: path.join(salida, nombre + '.png'), fullPage: nombre === 'movil' });
  const malo = errores.length || r.desborde || r.rotas.length;
  fallos += malo ? 1 : 0;
  console.log(`${malo ? '✘' : '✔'} ${nombre.padEnd(14)} desborde:${r.desborde ? 'SÍ' : 'no'}  titular cortado:${r.tituloCortado ? 'sí' : 'no'}  imágenes rotas:${r.rotas.length}  errores JS:${errores.length}`);
  r.rotas.forEach(x => console.log('    imagen rota: ' + x)); errores.forEach(x => console.log('    error: ' + x));
  await c.close();
}
await b.close(); srv.close();
console.log(`Capturas en dist/${slug}/_revision/`);
process.exit(fallos ? 1 : 0);
