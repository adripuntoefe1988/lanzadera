import { esc, rico, imagen, cabecera } from '../utilidades.mjs';

// Reseñas escritas destacadas: frase corta en grande + "Leer reseña completa" desplegable.
// Regla de oro: solo reseñas reales y con el nombre que la persona usa en público.
export default {
  tipo: 'testimonios',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="testimonios${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="ts-grid">${(d.citas || []).map(c => `<figure class="ts-cita">
      <blockquote><p>“${rico(c.frase)}”</p></blockquote>
      ${c.completa ? `<details><summary>Leer reseña completa</summary>${[].concat(c.completa).map(p => `<p>${rico(p)}</p>`).join('')}</details>` : ''}
      <figcaption>${c.foto ? imagen(c.foto, c.nombre) : `<span class="ts-inicial" aria-hidden="true">${esc((c.nombre || '?')[0])}</span>`}<span><strong>${esc(c.nombre)}</strong>${c.rol ? esc(c.rol) : ''}</span></figcaption>
    </figure>`).join('')}</div>
  </div>
</section>`;
  },
  css: `
.ts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:18px}
.ts-cita{margin:0;display:flex;flex-direction:column;gap:18px;padding:28px;background:var(--superficie-2);border:1px solid var(--linea);border-radius:var(--radio)}
.ts-cita blockquote{margin:0}
.ts-cita blockquote p{font:var(--titulos-peso) clamp(20px,1.8vw,24px)/1.25 var(--fuente-titulos);text-transform:none;letter-spacing:0;margin:0}
.ts-cita details{font-size:14px;color:var(--texto-2)}
.ts-cita summary{cursor:pointer;color:var(--acento-2);font-weight:700;margin-bottom:10px}
.ts-cita figcaption{margin-top:auto;display:flex;align-items:center;gap:12px;font-size:13px;color:var(--texto-2)}
.ts-cita figcaption img,.ts-inicial{width:46px;height:46px;border-radius:50%;object-fit:cover;flex:none}
.ts-inicial{display:grid;place-items:center;background:var(--acento);color:var(--sobre-acento);font:700 18px/1 var(--fuente-texto)}
.ts-cita figcaption strong{display:block;color:var(--texto);font-size:15px}`,
};
