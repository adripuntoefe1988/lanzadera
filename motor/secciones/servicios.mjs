import { esc, rico, boton, cabecera } from '../utilidades.mjs';

// Packs / planes / servicios principales. Sin precios por defecto (precio es opcional).
// Cada plan: botón directo (WhatsApp con mensaje propio) + alternativa al cuestionario.
// La lista va pegada al texto y los botones quedan alineados abajo (lección de la tarjeta "Forjar").
export default {
  tipo: 'servicios',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="servicios${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="sv-grid" style="--n:${Math.min((d.planes || []).length, 3)}">${(d.planes || []).map(p => `<article class="sv-plan${p.destacado ? ' destacado' : ''}">
      ${p.etiqueta ? `<span class="sv-etiqueta">${esc(p.etiqueta)}</span>` : ''}
      ${p.verbo ? `<p class="sv-verbo">${esc(p.verbo)}</p>` : ''}
      <h3>${rico(p.nombre)}</h3>
      ${p.tipo ? `<p class="sv-tipo">${esc(p.tipo)}</p>` : ''}
      ${p.precio ? `<p class="sv-precio">${esc(p.precio)}</p>` : ''}
      ${p.frase ? `<p class="sv-frase">${rico(p.frase)}</p>` : ''}
      ${[].concat(p.texto || []).map(t => `<p class="sv-texto">${rico(t)}</p>`).join('')}
      ${p.incluye ? `<ul class="sv-incluye">${p.incluye.map(i => `<li>${rico(i)}</li>`).join('')}</ul>` : ''}
      ${p.aviso ? `<div class="sv-aviso">${rico(p.aviso)}</div>` : ''}
      <div class="sv-pie">
        ${boton({ estilo: p.destacado ? 'principal' : 'secundario', ...p.boton }, sitio)}
        ${p.alternativa ? boton({ estilo: 'texto', ...p.alternativa }, sitio, 'sv-alt') : ''}
        ${p.nota ? `<p class="sv-nota">${esc(p.nota)}</p>` : ''}
      </div>
    </article>`).join('')}</div>
    ${d.nota ? `<p class="sv-nota-general">${rico(d.nota)}</p>` : ''}
  </div>
</section>`;
  },
  css: `
.sv-grid{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:18px;align-items:stretch}
.sv-plan{position:relative;display:flex;flex-direction:column;gap:14px;padding:34px 30px 30px;background:var(--superficie-2);border:1px solid var(--linea);border-radius:var(--radio)}
.sv-plan.destacado{border-color:var(--acento);box-shadow:0 0 0 1px var(--acento) inset}
.sv-etiqueta{position:absolute;top:-1px;right:-1px;background:var(--acento);color:var(--sobre-acento);font:700 11px/1 var(--fuente-texto);letter-spacing:.14em;text-transform:uppercase;padding:7px 10px;border-radius:0 var(--radio) 0 var(--radio)}
.sv-verbo{font:var(--titulos-peso) clamp(40px,4.4vw,60px)/1 var(--fuente-titulos);text-transform:var(--titulos-mayus);color:var(--acento);margin:0}
.sv-plan h3{margin:0}
.sv-tipo{font:700 11px/1.5 var(--fuente-texto);letter-spacing:.18em;text-transform:uppercase;color:var(--acento-2);margin:0}
.sv-precio{font:var(--titulos-peso) 34px/1 var(--fuente-titulos);margin:4px 0}
.sv-frase{font-weight:700;font-size:18px;line-height:1.4;margin:6px 0 0}
.sv-texto{color:var(--texto-2);font-size:15px;margin:0}
.sv-incluye{list-style:none;padding:18px 0 0;margin:6px 0 0;border-top:1px solid var(--linea);display:grid;gap:10px;font-size:15px}
.sv-incluye li{display:grid;grid-template-columns:22px 1fr}
.sv-incluye li::before{content:"";width:12px;height:2px;background:var(--exito);margin-top:.75em}
.sv-aviso{padding:14px 16px;border-left:3px solid var(--acento);background:color-mix(in srgb,var(--acento) 8%,transparent);font-size:14px;color:var(--texto-2)}
.sv-pie{margin-top:auto;padding-top:14px;display:grid;gap:14px;justify-items:center;text-align:center}
.sv-pie .btn:not(.btn-texto){width:100%}
.sv-alt{font-size:12px;text-transform:none;letter-spacing:.02em;font-weight:600}
.sv-nota{font-size:12px;color:var(--texto-2);margin:0}
.sv-nota-general{margin-top:28px;color:var(--texto-2);font-size:15px}
@media (max-width:980px){.sv-grid{grid-template-columns:1fr}}`,
};
