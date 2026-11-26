// Motor de la lanzadera: convierte sitios/<slug>/sitio.json en dist/<slug>/index.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { esc, rico, boton, whatsapp, ICONOS, aSlug } from './utilidades.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
export const RAIZ = path.resolve(AQUI, '..');
const RUNTIME_ORDEN = ['base', 'medios', 'visor', 'vermas', 'videos', 'cinta', 'comparador', 'cuestionario', 'ambiente', 'entrada'];

export async function cargarSecciones() {
  const dir = path.join(AQUI, 'secciones');
  const mapa = {};
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
    const m = (await import(pathToFileURL(path.join(dir, f)).href)).default;
    mapa[m.tipo] = m;
  }
  return mapa;
}

export function cargarTema(nombre) {
  const f = path.join(RAIZ, 'temas', nombre + '.json');
  if (!fs.existsSync(f)) throw new Error(`No existe el tema "${nombre}". Temas: ${fs.readdirSync(path.join(RAIZ, 'temas')).map(x => x.replace('.json', '')).join(', ')}`);
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

export function leerSitio(slug) {
  const f = path.join(RAIZ, 'sitios', slug, 'sitio.json');
  if (!fs.existsSync(f)) throw new Error(`No encuentro ${path.relative(RAIZ, f)}`);
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { throw new Error(`sitio.json de "${slug}" no es JSON válido: ${e.message}`); }
}

/** Comprueba lo que suele fallar antes de publicar. Devuelve avisos (no detiene la construcción). */
function revisarSitio(sitio, slug, secciones) {
  const avisos = [];
  const base = path.join(RAIZ, 'sitios', slug);
  const visto = new Set();
  const recorrer = (o, ruta) => {
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string' && /\.(webp|jpe?g|png|avif|svg|mp3|m4a|ogg|wav)$/i.test(v) && !/^https?:/.test(v)) {
        if (!visto.has(v)) { visto.add(v); if (!fs.existsSync(path.join(base, v))) avisos.push(`Falta el archivo ${v} (${ruta}.${k})`); else {
          const kb = fs.statSync(path.join(base, v)).size / 1024;
          if (/\.(jpe?g|png)$/i.test(v) && kb > 400) avisos.push(`${v} pesa ${Math.round(kb)} KB: pásalo a webp con "node lanzar.mjs fotos ${slug}"`);
        } }
      } else if (typeof v === 'object') recorrer(v, ruta + '.' + k);
    }
  };
  recorrer(sitio, 'sitio');
  (sitio.secciones || []).forEach((s, i) => { if (!secciones[s.tipo]) avisos.push(`Sección ${i + 1}: tipo "${s.tipo}" desconocido. Tipos: ${Object.keys(secciones).join(', ')}`); });
  if (!sitio.descripcion) avisos.push('Falta "descripcion" (sale en Google y al compartir el enlace)');
  if (!sitio.contacto?.whatsapp && !sitio.contacto?.email) avisos.push('No hay ni WhatsApp ni email en "contacto"');
  return avisos;
}

export async function construir(slug, { secciones, salida } = {}) {
  secciones ||= await cargarSecciones();
  const sitio = leerSitio(slug);
  sitio.slug = slug;
  const tema = cargarTema(sitio.tema || 'papel');
  const avisos = revisarSitio(sitio, slug, secciones);

  // ---- secciones ----
  const usados = new Set();
  const runtime = new Set(['base']);
  let alterna = false;
  const ids = new Set();
  const cuerpo = (sitio.secciones || []).map((d, i) => {
    const m = secciones[d.tipo];
    if (!m) return `<!-- sección desconocida: ${esc(d.tipo)} -->`;
    usados.add(d.tipo);
    (m.runtime || []).forEach(r => runtime.add(r));
    let id = d.id || aSlug(d.menu || d.tipo);
    while (ids.has(id)) id += '-' + i;
    ids.add(id); d.id = id;
    if (d.tipo !== 'hero' && d.tipo !== 'cta' && d.fondo !== 'igual') alterna = d.fondo === 'alterno' ? true : (d.fondo === 'normal' ? false : !alterna);
    return m.render(d, sitio, { id, indice: i, alterna: d.tipo === 'hero' ? false : alterna });
  }).join('\n');

  // ---- extras ----
  const ex = sitio.extras || {};
  const marca = sitio.marca || {};
  const menu = (sitio.secciones || []).filter(s => s.menu).map(s => `<li><a href="#${esc(s.id)}">${esc(s.menu)}</a></li>`).join('');
  const ctaNav = sitio.navegacion?.boton;
  const nav = `<header class="nav"><div class="wrap">
  <a class="marca" href="#">${marca.logo ? `<img src="${esc(marca.logo)}" alt="">` : ''}<span>${esc(marca.nombre || sitio.titulo)}</span>${marca.etiqueta ? `<small>${esc(marca.etiqueta)}</small>` : ''}</a>
  <nav aria-label="Principal"><ul class="menu">${menu}</ul></nav>
  ${ctaNav ? boton(ctaNav, sitio, 'nav-cta') : ''}
  <button class="abrir-menu" type="button" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>`;

  let extrasHtml = '', extrasCss = '';
  if (ex.musica?.archivo) {
    runtime.add('medios'); runtime.add('ambiente');
    extrasHtml += `<audio data-ambiente data-volumen="${ex.musica.volumen ?? 0.35}" src="${esc(ex.musica.archivo)}" loop preload="none"></audio>
<button type="button" id="ambiente" class="ambiente" aria-pressed="false"><span class="amb-eq" aria-hidden="true"><b></b><b></b><b></b></span><span>${esc(ex.musica.titulo || 'Música')}</span><span class="amb-estado">OFF</span></button>`;
    extrasCss += `.ambiente{position:fixed;left:16px;bottom:16px;z-index:95;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:99px;border:1px solid var(--linea);background:var(--nav-fondo);color:var(--texto);font:700 11px/1 var(--fuente-texto);letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.amb-estado{color:var(--texto-2)}.ambiente.on .amb-estado{color:var(--exito)}
.amb-eq{display:inline-flex;gap:2px;align-items:flex-end;height:12px}.amb-eq b{width:3px;height:100%;background:var(--texto-2);transform:scaleY(.3);transform-origin:bottom}
.ambiente.on .amb-eq b{background:var(--exito);animation:lzvu .9s ease-in-out infinite alternate}.ambiente.on .amb-eq b:nth-child(2){animation-delay:-.3s}.ambiente.on .amb-eq b:nth-child(3){animation-delay:-.6s}
@keyframes lzvu{0%{transform:scaleY(.25)}100%{transform:scaleY(1)}}\n`;
  }
  if (ex.entrada) {
    runtime.add('entrada');
    const e = ex.entrada;
    extrasHtml = `<div class="entrada" id="entrada" role="dialog" aria-modal="true" aria-labelledby="entrada-t"><div class="entrada-caja">
  ${e.etiqueta ? `<span class="entrada-etiqueta">${esc(e.etiqueta)}</span>` : ''}
  <p class="entrada-marca" id="entrada-t">${esc(e.titulo || marca.nombre || sitio.titulo)}</p>
  ${e.subtitulo ? `<p class="entrada-sub">${esc(e.subtitulo)}</p>` : ''}
  <button type="button" class="btn btn-principal entrada-boton">${esc(e.boton || 'Entrar')}</button>
  ${ex.musica?.archivo ? `<button type="button" class="entrada-silencio">${esc(e.sinSonido || 'Entrar sin sonido')}</button>` : ''}
</div></div>
<script>try{if(!sessionStorage.getItem('lz-entrada'))document.documentElement.classList.add('con-entrada')}catch(e){}</script>\n` + extrasHtml;
    extrasCss += `.entrada{position:fixed;inset:0;z-index:400;display:grid;place-items:center;padding:24px;background:radial-gradient(ellipse at 50% 60%,color-mix(in srgb,var(--acento) 26%,transparent),transparent 60%),var(--fondo);text-align:center;cursor:pointer;transition:opacity .7s,visibility .7s}
.entrada.fuera{opacity:0;visibility:hidden}.con-entrada,.con-entrada body{overflow:hidden}
html:not(.con-entrada) .entrada:not(.fuera){display:none}
.entrada-caja{display:flex;flex-direction:column;align-items:center;gap:18px;max-width:600px}
.entrada-etiqueta{font:700 11px/1 var(--fuente-texto);letter-spacing:.3em;color:var(--acento-2);border:1px solid var(--acento);padding:7px 11px}
.entrada-marca{font:var(--titulos-peso) clamp(40px,10vw,96px)/.95 var(--fuente-titulos);text-transform:var(--titulos-mayus);letter-spacing:var(--titulos-espaciado);margin:0}
.entrada-sub{font:600 12px/1.4 var(--fuente-texto);letter-spacing:.3em;text-transform:uppercase;color:var(--texto-2);margin:0}
.entrada-boton{margin-top:12px;animation:lzlatido 2.2s ease-out infinite}
@keyframes lzlatido{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--acento) 55%,transparent)}70%,100%{box-shadow:0 0 0 22px transparent}}
.entrada-silencio{background:none;border:0;color:var(--texto-2);font:600 12px/1 var(--fuente-texto);text-decoration:underline;text-underline-offset:4px;cursor:pointer;padding:10px}\n`;
  }
  const c = sitio.contacto || {};
  if (c.whatsapp && ex.botonWhatsapp !== false) extrasHtml += `<a class="wa-flotante" href="${esc(whatsapp(c.whatsapp, c.mensaje || ''))}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">${ICONOS.whatsapp}</a>`;
  if (ex.musica?.archivo && c.whatsapp && ex.botonWhatsapp !== false) extrasCss += '.wa-flotante{bottom:74px}@media(min-width:761px){.wa-flotante{bottom:18px}}\n';

  const pie = `<footer class="pie"><div class="wrap">
  <p>© <span data-anio></span> ${esc(sitio.pie?.titular || marca.nombre || sitio.titulo)}${sitio.pie?.texto ? ' · ' + esc(sitio.pie.texto) : ''}</p>
  <nav aria-label="Enlaces">${(sitio.pie?.enlaces || []).map(l => `<a href="${esc(l.href)}"${/^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : ''}>${esc(l.texto)}</a>`).join('')}${(c.instagram || []).map(u => `<a href="https://www.instagram.com/${esc(u.replace('@', ''))}/" target="_blank" rel="noopener">@${esc(u.replace('@', ''))}</a>`).join('')}</nav>
</div></footer>`;

  // ---- CSS y JS ----
  const vars = { ...tema.variables, ...(sitio.ajustesTema || {}) };
  const varsCss = `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')};color-scheme:${tema.modo === 'oscuro' ? 'dark' : 'light'}}`;
  const grano = fs.readFileSync(path.join(AQUI, 'grano.b64'), 'utf8').trim();
  const css = [varsCss, fs.readFileSync(path.join(AQUI, 'base.css'), 'utf8').replace('__GRANO__', grano),
    ...[...usados].map(t => `/* ${t} */${secciones[t].css || ''}`), extrasCss, tema.cssExtra || '', sitio.cssExtra || ''].join('\n');
  const js = RUNTIME_ORDEN.filter(r => runtime.has(r)).map(r => fs.readFileSync(path.join(AQUI, 'runtime', r + '.js'), 'utf8')).join('\n');

  const titulo = sitio.titulo || marca.nombre;
  const og = sitio.imagenCompartir || sitio.secciones?.find(s => s.tipo === 'hero')?.foto;
  const html = `<!DOCTYPE html>
<html lang="${esc(sitio.idioma || 'es')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(sitio.descripcion || '')}">
<meta name="theme-color" content="${esc(vars['--fondo'])}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(sitio.descripcion || '')}">
<meta property="og:type" content="website">
${og ? `<meta property="og:image" content="${esc(og)}">` : ''}
${marca.favicon ? `<link rel="icon" href="${esc(marca.favicon)}">` : `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${vars['--acento']}'/><text x='32' y='44' font-size='34' text-anchor='middle' font-family='Arial' font-weight='700' fill='${vars['--sobre-acento']}'>${esc((marca.nombre || titulo || '?')[0])}</text></svg>`)}">`}
${tema.fuentes?.google ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${tema.fuentes.google}&display=swap">` : ''}
${og && !/^https?:/.test(og) ? `<link rel="preload" as="image" href="${esc(og)}">` : ''}
<style>
${css}
</style>
</head>
<body class="${tema.grano ? 'con-grano' : ''}">
<a class="saltar" href="#contenido">Saltar al contenido</a>
${extrasHtml}
${nav}
<main id="contenido">
${cuerpo}
</main>
${pie}
<script>
${js}
</script>
</body>
</html>`;

  // ---- escribir ----
  const destino = salida || path.join(RAIZ, 'dist', slug);
  fs.rmSync(destino, { recursive: true, force: true });
  fs.mkdirSync(destino, { recursive: true });
  fs.writeFileSync(path.join(destino, 'index.html'), html);
  const archivos = path.join(RAIZ, 'sitios', slug, 'archivos');
  if (fs.existsSync(archivos)) fs.cpSync(archivos, path.join(destino, 'archivos'), { recursive: true });
  fs.writeFileSync(path.join(destino, '.nojekyll'), '');
  return { slug, destino, avisos, kb: Math.round(Buffer.byteLength(html) / 1024), secciones: [...usados] };
}

/** Página índice con todas las webs construidas (útil para enseñar el catálogo). */
export function construirIndice(resultados) {
  const filas = resultados.map(r => {
    const s = leerSitio(r.slug);
    const t = cargarTema(s.tema || 'papel').variables;
    return `<a href="${esc(r.slug)}/index.html" style="--f:${t['--fondo']};--a:${t['--acento']};--t:${t['--texto']}"><i aria-hidden="true"></i><strong>${esc(s.marca?.nombre || s.titulo)}</strong><span>${esc(s.descripcion || '')}</span><em>Tema ${esc(s.tema || 'papel')} · ${r.secciones.length} tipos de sección</em></a>`;
  }).join('');
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lanzadera · webs</title>
<style>body{margin:0;font:16px/1.5 system-ui,sans-serif;background:#111;color:#eee;padding:40px 20px}main{max-width:900px;margin:auto}h1{font-size:40px;margin:0 0 8px}p{color:#aaa}
.l{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:14px;margin-top:30px}.l a{display:grid;gap:6px;align-content:start;padding:20px;border:1px solid #333;border-radius:10px;text-decoration:none;color:inherit;transition:border-color .2s}.l a:hover{border-color:var(--a)}.l i{display:block;height:64px;border-radius:6px;margin-bottom:8px;background:linear-gradient(90deg,var(--f) 0 60%,var(--a) 60% 80%,var(--t) 80%);border:1px solid #333}.l strong{font-size:18px}.l span{color:#aaa;font-size:14px}.l em{font-size:12px;color:#888;font-style:normal}</style></head>
<body><main><h1>Lanzadera</h1><p>Webs construidas con el mismo motor. Cada una sale de un solo archivo sitio.json.</p><div class="l">${filas}</div></main></body></html>`;
  fs.writeFileSync(path.join(RAIZ, 'dist', 'index.html'), html);
  fs.writeFileSync(path.join(RAIZ, 'dist', '.nojekyll'), '');
}
