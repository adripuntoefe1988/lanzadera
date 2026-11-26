import { rico, boton } from '../utilidades.mjs';

// Banda de llamada a la acción a lo ancho. Úsala entre bloques largos o justo antes del contacto.
export default {
  tipo: 'cta',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="cta" aria-labelledby="${ctx.id}-t">
  <div class="wrap cta-caja">
    <h2 id="${ctx.id}-t">${rico(d.titulo)}</h2>
    ${d.texto ? `<p>${rico(d.texto)}</p>` : ''}
    <div class="botones">${(d.botones || []).map(b => boton(b, sitio)).join('')}</div>
  </div>
</section>`;
  },
  css: `
.cta{padding-block:clamp(56px,8vw,96px);background:var(--acento);color:var(--sobre-acento);--fondo-seccion:var(--acento)}
.cta h2{max-width:16ch}
.cta p{max-width:560px;opacity:.85;font-size:18px}
.cta .btn-principal{background:var(--sobre-acento);color:var(--acento)}
.cta .btn-secundario{border-color:var(--sobre-acento);color:var(--sobre-acento)}
.cta .acento{color:inherit;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:6px}`,
};
