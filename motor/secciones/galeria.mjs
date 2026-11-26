import { esc, imagen, cabecera } from '../utilidades.mjs';

// Galería en mosaico; cada foto se amplía en el visor. "grande": true ocupa dos columnas.
export default {
  tipo: 'galeria',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="galeria${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="gl-grid">${(d.fotos || []).map(f => `<figure class="${f.grande ? 'grande' : ''}" data-visor="${ctx.id}" data-src="${esc(f.src || '')}" data-pie="${esc(f.pie || '')}">${imagen(f.src, f.alt || f.pie || '', { pos: f.pos })}${f.pie ? `<figcaption>${esc(f.pie)}</figcaption>` : ''}</figure>`).join('')}</div>
    ${d.nota ? `<p class="gl-nota">${esc(d.nota)}</p>` : ''}
  </div>
</section>`;
  },
  css: `
.gl-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:240px;gap:12px}
.gl-grid figure{margin:0;position:relative;overflow:hidden;border-radius:var(--radio);cursor:zoom-in}
.gl-grid figure.grande{grid-column:span 2;grid-row:span 2}
.gl-grid img,.gl-grid .hueco-foto{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.gl-grid figure:hover img{transform:scale(1.04)}
.gl-grid figcaption{position:absolute;left:0;right:0;bottom:0;padding:24px 14px 12px;background:linear-gradient(0deg,rgba(0,0,0,.7),transparent);color:#fff;font-size:13px;font-weight:600;opacity:0;transition:opacity .3s}
.gl-grid figure:hover figcaption{opacity:1}
.gl-nota{margin-top:22px;color:var(--texto-2);font-size:15px}
@media (max-width:860px){.gl-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:180px}}`,
  runtime: ['visor'],
};
