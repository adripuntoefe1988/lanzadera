import { esc, rico, imagen, cabecera } from '../utilidades.mjs';

// Frases grandes que cuentan en qué cree el negocio. En Refuge: "No dejes de ser tú".
export default {
  tipo: 'manifiesto',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="manifiesto${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap mf-grid${d.foto ? '' : ' sin-foto'}">
    <div>
      ${cabecera(d, ctx.id + '-t')}
      <ol class="mf-frases">${(d.frases || []).map(f => `<li><strong>${rico(f.fuerte || f)}</strong>${f.texto ? `<span>${rico(f.texto)}</span>` : ''}</li>`).join('')}</ol>
      ${d.cierre ? `<p class="mf-cierre">${rico(d.cierre)}</p>` : ''}
    </div>
    ${d.foto ? `<div class="mf-foto">${imagen(d.foto, d.fotoAlt, { pos: d.fotoPos })}</div>` : ''}
  </div>
</section>`;
  },
  css: `
.mf-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(36px,6vw,90px);align-items:start}
.mf-grid.sin-foto{grid-template-columns:1fr}
.mf-frases{list-style:none;padding:0;margin:0;counter-reset:f}
.mf-frases li{counter-increment:f;display:grid;grid-template-columns:56px 1fr;gap:4px 0;padding:22px 0;border-top:1px solid var(--linea)}
.mf-frases li::before{content:counter(f,decimal-leading-zero);grid-row:span 2;font:700 13px/2.2 var(--fuente-texto);color:var(--acento-2);letter-spacing:.1em}
.mf-frases strong{font:var(--titulos-peso) clamp(24px,2.8vw,36px)/1.1 var(--fuente-titulos);text-transform:var(--titulos-mayus);letter-spacing:var(--titulos-espaciado)}
.mf-frases span{color:var(--texto-2);margin-top:6px}
.mf-cierre{margin-top:34px;font:var(--titulos-peso) clamp(26px,3vw,40px)/1.1 var(--fuente-titulos);text-transform:var(--titulos-mayus);color:var(--acento)}
.mf-foto{position:sticky;top:110px;aspect-ratio:3/4;overflow:hidden;border-radius:var(--radio)}
.mf-foto img{width:100%;height:100%;object-fit:cover}
@media (max-width:860px){.mf-grid{grid-template-columns:1fr}.mf-foto{position:relative;top:0;aspect-ratio:4/3}}`,
};
