import { esc, rico, cabecera, boton } from '../utilidades.mjs';

// Cómo se trabaja, en pasos numerados. Quita miedo al cliente nuevo: sabe qué va a pasar.
export default {
  tipo: 'pasos',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="pasos${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <ol class="ps-lista">${(d.pasos || []).map(p => `<li><h3>${rico(p.titulo)}</h3><p>${rico(p.texto)}</p></li>`).join('')}</ol>
    ${d.boton ? `<div class="botones ps-boton">${boton(d.boton, sitio)}</div>` : ''}
  </div>
</section>`;
  },
  css: `
.ps-lista{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0;counter-reset:p;border-top:1px solid var(--linea)}
.ps-lista li{counter-increment:p;padding:30px 26px 10px 0;border-right:1px solid var(--linea);margin-right:26px}
.ps-lista li:last-child{border-right:0}
.ps-lista li::before{content:counter(p,decimal-leading-zero);display:block;font:var(--titulos-peso) 54px/1 var(--fuente-titulos);color:var(--acento);margin-bottom:18px}
.ps-lista h3{font-size:22px}
.ps-lista p{color:var(--texto-2);font-size:15px}
.ps-boton{margin-top:40px}
@media (max-width:720px){.ps-lista li{border-right:0;margin-right:0;border-bottom:1px solid var(--linea)}}`,
};
