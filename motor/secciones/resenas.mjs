import { esc, rico, cabecera, imagen } from '../utilidades.mjs';

// Prueba social de Google (o de donde sea): nota + cinta que avanza sola + visor a pantalla completa.
// Admite reseñas en texto o capturas en imagen. El botón principal NO saca al visitante de la web:
// abre el visor. Google queda como enlace pequeño de verificación.
export default {
  tipo: 'resenas',
  render(d, sitio, ctx) {
    const items = d.capturas
      ? d.capturas.map((src, i) => `<button type="button" class="rs-item rs-captura" data-visor="${ctx.id}" data-src="${esc(src)}">${imagen(src, 'Reseña ' + (i + 1))}</button>`)
      : (d.resenas || []).map(r => `<figure class="rs-item rs-texto"><div class="rs-estrellas" aria-label="${r.estrellas || 5} estrellas">${'★'.repeat(r.estrellas || 5)}</div><blockquote>${rico(r.texto)}</blockquote><figcaption>${esc(r.nombre)}${r.fecha ? ` · <span>${esc(r.fecha)}</span>` : ''}</figcaption></figure>`);
    return `<section id="${ctx.id}" class="resenas${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="rs-nota">
      <strong>${esc(d.nota || '5,0')}</strong>
      <div><span class="rs-estrellas" aria-hidden="true">★★★★★</span><small>${esc(d.textoNota || `Valoración en ${d.fuente || 'Google'}${d.total ? ' · ' + d.total + ' reseñas' : ''}`)}</small>
      ${d.enlace ? `<a class="rs-verificar" href="${esc(d.enlace)}" target="_blank" rel="noopener">Verificadas en ${esc(d.fuente || 'Google')} <span aria-hidden="true">↗</span></a>` : ''}</div>
      ${d.capturas ? `<button type="button" class="btn btn-secundario" data-abrir-visor="${ctx.id}">Leer las reseñas</button>` : ''}
    </div>
  </div>
  <div class="cinta-marco"><div class="cinta" data-cinta tabindex="0" aria-label="Reseñas, se pueden deslizar"><div class="cinta-pista">${items.join('')}${items.join('')}</div></div></div>
  ${d.pie ? `<p class="wrap rs-pie">${rico(d.pie)}</p>` : ''}
</section>`;
  },
  css: `
.rs-nota{display:flex;flex-wrap:wrap;align-items:center;gap:20px 28px;margin-top:-20px;margin-bottom:40px}
.rs-nota>strong{font:var(--titulos-peso) 72px/1 var(--fuente-titulos)}
.rs-nota small{display:block;color:var(--texto-2);font-size:14px}
.rs-estrellas{color:#F5B301;letter-spacing:3px;font-size:18px}
.rs-verificar{display:inline-block;margin-top:6px;font-size:12px;font-weight:600;color:var(--texto-2);text-underline-offset:3px}
.cinta{overflow-x:auto;scrollbar-width:none;cursor:grab;position:relative}
.cinta::-webkit-scrollbar{display:none}
.cinta-marco{position:relative}
.cinta-marco::before,.cinta-marco::after{content:"";position:absolute;top:0;bottom:0;width:6%;z-index:1;pointer-events:none}
.cinta-marco::before{left:0;background:linear-gradient(90deg,var(--fondo-seccion),transparent)}
.cinta-marco::after{right:0;background:linear-gradient(270deg,var(--fondo-seccion),transparent)}
.cinta-pista{display:flex;gap:16px;width:max-content;padding:4px 20px}
.rs-item{flex:none;width:min(340px,80vw);border-radius:var(--radio);border:1px solid var(--linea);background:var(--superficie-2)}
.rs-captura{padding:0;cursor:zoom-in;height:200px;overflow:hidden}
.rs-captura img{width:100%;height:100%;object-fit:cover;object-position:top}
.rs-texto{margin:0;padding:24px;display:flex;flex-direction:column;gap:12px}
.rs-texto blockquote{margin:0;font-size:15px;line-height:1.55;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}
.rs-texto figcaption{margin-top:auto;font-weight:700;font-size:14px}
.rs-texto figcaption span{font-weight:400;color:var(--texto-2)}
.rs-pie{margin-top:22px;font-size:13px;color:var(--texto-2)}`,
  runtime: ['cinta', 'visor'],
};
