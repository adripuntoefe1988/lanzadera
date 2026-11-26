// Utilidades compartidas por el motor y las secciones.

/** Escapa texto para meterlo en HTML. */
export const esc = (v = '') =>
  String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Permite *cursiva*, **negrita** y [[acento]] dentro de un texto ya escapado. */
export const rico = (v = '') =>
  esc(v)
    .replace(/\[\[(.+?)\]\]/g, '<span class="acento">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Une clases ignorando las vacías. */
export const cls = (...c) => c.filter(Boolean).join(' ');

/** Enlace de WhatsApp con mensaje ya escrito. */
export const whatsapp = (numero, mensaje = '') =>
  `https://wa.me/${String(numero).replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}`;

/** Resuelve el destino de un botón: {href}, {whatsapp:"mensaje"}, {seccion:"id"}. */
export function destino(boton = {}, sitio) {
  if (boton.whatsapp !== undefined) {
    const num = sitio.contacto?.whatsapp;
    if (!num) throw new Error(`El botón "${boton.texto}" usa WhatsApp pero falta contacto.whatsapp`);
    return { href: whatsapp(num, boton.whatsapp === true ? (sitio.contacto.mensaje || '') : boton.whatsapp), externo: true };
  }
  if (boton.seccion) return { href: '#' + boton.seccion, externo: false };
  const href = boton.href || '#';
  return { href, externo: /^https?:/.test(href) };
}

/** Pinta un botón. estilo: principal | secundario | texto */
export function boton(b, sitio, extra = '') {
  if (!b) return '';
  const d = destino(b, sitio);
  const estilo = b.estilo || 'principal';
  const icono = b.whatsapp !== undefined ? ICONOS.whatsapp : '';
  return `<a class="${cls('btn', 'btn-' + estilo, extra)}" href="${esc(d.href)}"${d.externo ? ' target="_blank" rel="noopener"' : ''}>${icono}${esc(b.texto)}${d.externo && !icono ? ' <span aria-hidden="true">↗</span>' : ''}</a>`;
}

/** Imagen con carga diferida y tamaño opcional; si falta la ruta, un hueco elegante con la descripción. */
export function imagen(src, alt = '', { clase = '', eager = false, pos = '' } = {}) {
  if (!src) return `<div class="${cls('hueco-foto', clase)}" role="img" aria-label="${esc(alt)}"><span>${esc(alt || 'Foto')}</span></div>`;
  return `<img class="${esc(clase)}" src="${esc(src)}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${pos ? ` style="object-position:${esc(pos)}"` : ''}>`;
}

/** Cabecera estándar de sección: capítulo, antetítulo, título y entradilla. */
export function cabecera(d, idTitulo) {
  return `<div class="cabecera">
  ${d.capitulo ? `<div class="capitulo" aria-hidden="true">${esc(d.capitulo)}</div>` : ''}
  ${d.antetitulo ? `<p class="antetitulo">${esc(d.antetitulo)}</p>` : ''}
  ${d.titulo ? `<h2 id="${idTitulo}">${rico(d.titulo)}</h2>` : ''}
  ${d.entradilla ? `<p class="entradilla">${rico(d.entradilla)}</p>` : ''}
</div>`;
}

export const ICONOS = {
  whatsapp: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.4-.9 2.2 0 .9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.6 1.4.6 2 .6 2.7.5.8-.1 1.5-.6 1.8-1.2.2-.4.2-.9.1-1.2l-.3-.1z"/></svg>',
  instagram: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
  play: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg>',
  pausa: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  email: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  telefono: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
  mapa: '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
};

/** Convierte un nombre en identificador de URL. */
export const aSlug = t =>
  String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
