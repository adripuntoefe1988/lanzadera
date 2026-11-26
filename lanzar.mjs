#!/usr/bin/env node
// Lanzadera de webs. Uso:
//   node lanzar.mjs nueva <slug> [--tema templo] [--nombre "Mi negocio"]   crea sitios/<slug> desde la plantilla
//   node lanzar.mjs construir [slug]                                         construye una web o todas en dist/
//   node lanzar.mjs ver [slug]                                               construye y abre un servidor local
//   node lanzar.mjs fotos <slug>                                             pasa las fotos de archivos/ a webp ligeras
//   node lanzar.mjs revisar <slug>                                           prueba en móvil y ordenador (necesita Playwright)
//   node lanzar.mjs temas | secciones                                        lista lo disponible
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { construir, construirIndice, cargarSecciones, RAIZ } from './motor/construir.mjs';
import { aSlug } from './motor/utilidades.mjs';

const [, , orden = 'ayuda', ...resto] = process.argv;
const opcion = n => { const i = resto.indexOf('--' + n); return i >= 0 ? resto[i + 1] : undefined; };
const arg = resto.filter((a, i) => !a.startsWith('--') && !(resto[i - 1] || '').startsWith('--'))[0];
const sitios = () => fs.readdirSync(path.join(RAIZ, 'sitios')).filter(d => !d.startsWith('_') && fs.existsSync(path.join(RAIZ, 'sitios', d, 'sitio.json')));
const verde = s => `\x1b[32m${s}\x1b[0m`, amarillo = s => `\x1b[33m${s}\x1b[0m`, rojo = s => `\x1b[31m${s}\x1b[0m`;

async function construirTodo(lista) {
  const secciones = await cargarSecciones();
  const res = [];
  for (const s of lista) {
    try {
      const r = await construir(s, { secciones });
      console.log(`${verde('✔')} ${s}  →  dist/${s}/index.html  (${r.kb} KB, ${r.secciones.length} tipos de sección)`);
      r.avisos.forEach(a => console.log(`   ${amarillo('!')} ${a}`));
      res.push(r);
    } catch (e) { console.log(`${rojo('✘')} ${s}: ${e.message}`); process.exitCode = 1; }
  }
  if (res.length) construirIndice(res);
  return res;
}

const ordenes = {
  async nueva() {
    if (!arg) throw new Error('Dime el nombre corto de la web: node lanzar.mjs nueva mi-negocio');
    const slug = aSlug(arg), dst = path.join(RAIZ, 'sitios', slug);
    if (fs.existsSync(dst)) throw new Error(`Ya existe sitios/${slug}`);
    fs.cpSync(path.join(RAIZ, 'sitios', '_plantilla'), dst, { recursive: true });
    const f = path.join(dst, 'sitio.json'), s = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (opcion('tema')) s.tema = opcion('tema');
    if (opcion('nombre')) { s.marca.nombre = opcion('nombre'); s.titulo = opcion('nombre'); }
    fs.writeFileSync(f, JSON.stringify(s, null, 2));
    console.log(`${verde('✔')} Creada sitios/${slug}. Rellena sitio.json, mete las fotos en sitios/${slug}/archivos/ y ejecuta: node lanzar.mjs ver ${slug}`);
  },
  async construir() { await construirTodo(arg ? [arg] : sitios()); },
  async ver() {
    const lista = arg ? [arg] : sitios();
    await construirTodo(lista);
    const raiz = path.join(RAIZ, 'dist'), puerto = +(opcion('puerto') || 8080);
    const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.json': 'application/json' };
    http.createServer((q, r) => {
      let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
      const f = path.join(raiz, p);
      if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('No encontrado'); }
      r.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
    }).listen(puerto, () => console.log(`\nAbierto en http://localhost:${puerto}/${arg ? arg + '/' : ''}  (Ctrl+C para cerrar)`));
  },
  async fotos() {
    if (!arg) throw new Error('node lanzar.mjs fotos <slug>');
    execFileSync('python3', [path.join(RAIZ, 'herramientas', 'optimizar_fotos.py'), path.join(RAIZ, 'sitios', arg, 'archivos')], { stdio: 'inherit' });
  },
  async revisar() {
    if (!arg) throw new Error('node lanzar.mjs revisar <slug>');
    await construirTodo([arg]);
    execFileSync('node', [path.join(RAIZ, 'herramientas', 'revisar.mjs'), arg], { stdio: 'inherit' });
  },
  async temas() {
    for (const f of fs.readdirSync(path.join(RAIZ, 'temas'))) { const t = JSON.parse(fs.readFileSync(path.join(RAIZ, 'temas', f), 'utf8')); console.log(`${f.replace('.json', '').padEnd(12)} ${t.descripcion}`); }
  },
  async secciones() {
    const s = await cargarSecciones(); console.log(Object.keys(s).join('\n'));
  },
  async ayuda() {
    console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 9).map(l => l.replace(/^\/\/ ?/, '')).join('\n'));
  },
};

(ordenes[orden] || ordenes.ayuda)().catch(e => { console.error(rojo('✘ ' + e.message)); process.exit(1); });
