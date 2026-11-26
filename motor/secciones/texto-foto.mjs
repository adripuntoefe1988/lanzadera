import { esc, rico, boton, imagen, cabecera } from '../utilidades.mjs';

// Historia, "quién soy", el espacio... Texto con foto al lado. "invertir" pone la foto a la izquierda.
export default {
  tipo: 'texto-foto',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="tf${d.invertir ? ' invertir' : ''}${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap tf-grid">
    <div class="tf-texto">
      ${cabecera(d, ctx.id + '-t')}
      ${(d.parrafos || []).map(p => `<p>${rico(p)}</p>`).join('')}
      ${d.cita ? `<blockquote class="tf-cita">${rico(d.cita)}</blockquote>` : ''}
      ${d.firma ? `<p class="tf-firma">${esc(d.firma)}</p>` : ''}
      ${d.boton ? `<div class="botones">${boton(d.boton, sitio)}</div>` : ''}
    </div>
    <figure class="tf-foto${d.fotos?.length > 1 ? ' doble' : ''}">
      ${(d.fotos || [{ src: d.foto, alt: d.fotoAlt }]).map(f => `<div class="marco" data-visor="${ctx.id}" data-src="${esc(f.src || '')}">${imagen(f.src, f.alt, { pos: f.pos })}</div>`).join('')}
      ${d.pieFoto ? `<figcaption>${esc(d.pieFoto)}</figcaption>` : ''}
    </figure>
  </div>
</section>`;
  },
  css: `
.tf-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(36px,6vw,90px);align-items:center}
.tf.invertir .tf-foto{order:-1}
.tf-texto .cabecera{margin-bottom:28px}
.tf-texto>p{color:var(--texto-2);max-width:600px}
.tf-texto>p:first-of-type{color:var(--texto);font-size:1.08em}
.tf-cita{margin:30px 0;padding-left:22px;border-left:3px solid var(--acento);font:var(--titulos-peso) clamp(22px,2.4vw,30px)/1.2 var(--fuente-titulos);text-transform:var(--titulos-mayus)}
.tf-firma{font-weight:700;letter-spacing:.06em}
.tf-foto{margin:0;display:grid;gap:14px}
.tf-foto.doble{grid-template-columns:1fr 1fr}
.tf-foto .marco{aspect-ratio:4/5;overflow:hidden;cursor:zoom-in;border-radius:var(--radio)}
.tf-foto.doble .marco:nth-child(2){margin-top:48px}
.tf-foto img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.tf-foto .marco:hover img{transform:scale(1.03)}
.tf-foto figcaption{grid-column:1/-1;font-size:13px;color:var(--texto-2)}
@media (max-width:860px){.tf-grid{grid-template-columns:1fr}.tf.invertir .tf-foto{order:0}}`,
  runtime: ['visor'],
};
