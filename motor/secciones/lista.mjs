import { esc, rico, cabecera, boton } from '../utilidades.mjs';

// Lista de servicios sueltos o ventajas, en rejilla de 2-3 columnas.
export default {
  tipo: 'lista',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="lista${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <ul class="ls-grid">${(d.items || []).map(i => `<li>${i.icono ? `<span class="ls-icono" aria-hidden="true">${esc(i.icono)}</span>` : ''}<h3>${rico(i.titulo)}</h3>${i.texto ? `<p>${rico(i.texto)}</p>` : ''}</li>`).join('')}</ul>
    ${d.boton ? `<div class="botones ls-boton">${boton(d.boton, sitio)}</div>` : ''}
  </div>
</section>`;
  },
  css: `
.ls-grid{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:0 36px}
.ls-grid li{padding:24px 0;border-top:1px solid var(--linea)}
.ls-grid h3{font-size:21px;margin-bottom:8px}
.ls-grid p{color:var(--texto-2);font-size:15px;margin:0}
.ls-icono{display:block;font-size:26px;margin-bottom:10px;color:var(--acento)}
.ls-boton{margin-top:36px}`,
};
