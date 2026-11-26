import { esc, rico, boton, imagen, cabecera } from '../utilidades.mjs';

// "Empieza por aquí": 2-4 tarjetas grandes con foto, una por tipo de cliente o necesidad.
// Cada una lleva a la sección o al WhatsApp adecuados. En Refuge: tema en la cabeza / proyecto / rumbo.
export default {
  tipo: 'caminos',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="caminos${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="cm-grid" style="--n:${Math.min((d.tarjetas || []).length, 4)}">
      ${(d.tarjetas || []).map(t => `<article class="cm-tarjeta">
        <div class="cm-foto">${imagen(t.foto, t.fotoAlt || t.titulo, { pos: t.fotoPos })}</div>
        <div class="cm-cuerpo">
          ${t.etiqueta ? `<span class="cm-etiqueta">${esc(t.etiqueta)}</span>` : ''}
          <h3>${rico(t.titulo)}</h3>
          ${t.texto ? `<p>${rico(t.texto)}</p>` : ''}
          ${boton({ estilo: 'texto', ...t.boton }, sitio)}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
  },
  css: `
.cm-grid{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:18px}
.cm-tarjeta{position:relative;min-height:460px;display:flex;align-items:flex-end;overflow:hidden;border-radius:var(--radio);border:1px solid var(--linea);isolation:isolate}
.cm-foto{position:absolute;inset:0;z-index:-1}
.cm-foto img,.cm-foto .hueco-foto{width:100%;height:100%;object-fit:cover;transition:transform .7s}
.cm-tarjeta:hover .cm-foto img{transform:scale(1.04)}
.cm-foto::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.88) 8%,rgba(0,0,0,.35) 55%,rgba(0,0,0,.1))}
.cm-cuerpo{padding:28px;color:#fff}
.cm-cuerpo h3{color:#fff;font-size:clamp(24px,2.4vw,32px)}
.cm-cuerpo p{color:rgba(255,255,255,.78);font-size:15px}
.cm-cuerpo .btn-texto{color:#fff}
.cm-etiqueta{display:inline-block;font:700 11px/1 var(--fuente-texto);letter-spacing:.2em;text-transform:uppercase;color:#fff;background:var(--acento);padding:6px 9px;margin-bottom:14px}
@media (max-width:900px){.cm-grid{grid-template-columns:1fr}.cm-tarjeta{min-height:380px}}`,
};
