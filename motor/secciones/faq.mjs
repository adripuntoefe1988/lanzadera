import { rico, cabecera } from '../utilidades.mjs';

// Preguntas frecuentes desplegables. Responde las dudas que frenan el primer mensaje.
export default {
  tipo: 'faq',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="faq${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap faq-grid">
    ${cabecera(d, ctx.id + '-t')}
    <div class="faq-lista">${(d.preguntas || []).map((q, i) => `<details${i === 0 ? ' open' : ''}><summary>${rico(q.pregunta)}</summary><div>${[].concat(q.respuesta).map(p => `<p>${rico(p)}</p>`).join('')}</div></details>`).join('')}</div>
  </div>
</section>`;
  },
  css: `
.faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(30px,5vw,80px);align-items:start}
.faq-lista details{border-top:1px solid var(--linea)}
.faq-lista details:last-child{border-bottom:1px solid var(--linea)}
.faq-lista summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;padding:22px 0;font-weight:700;font-size:18px}
.faq-lista summary::-webkit-details-marker{display:none}
.faq-lista summary::after{content:"+";font-size:26px;line-height:1;color:var(--acento);transition:transform .25s}
.faq-lista details[open] summary::after{transform:rotate(45deg)}
.faq-lista details div{color:var(--texto-2);padding-bottom:12px}
@media (max-width:860px){.faq-grid{grid-template-columns:1fr}}`,
};
