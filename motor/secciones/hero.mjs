import { esc, rico, boton, imagen } from '../utilidades.mjs';

// Portada: texto a la izquierda, foto a sangre a la derecha (la composición que más gustó en Refuge).
// El titular se ajusta al ancho Y al alto de pantalla, para que no se corte en monitores anchos y bajos.
export default {
  tipo: 'hero',
  render(d, sitio) {
    const lineas = (Array.isArray(d.titulo) ? d.titulo : [d.titulo]).map(l =>
      typeof l === 'string' ? `<span>${rico(l)}</span>` : `<span class="${l.acento ? 'acento' : ''}">${rico(l.texto)}</span>`).join('');
    return `<section class="hero${d.foto || d.fotoAlt ? '' : ' sin-foto'}" id="${esc(d.id || 'inicio')}" aria-labelledby="hero-t">
  ${d.foto || d.fotoAlt ? `<div class="hero-foto">${imagen(d.foto, d.fotoAlt || '', { eager: true, pos: d.fotoPos })}</div>` : ''}
  <div class="wrap">
    ${d.antetitulo ? `<p class="antetitulo">${esc(d.antetitulo)}</p>` : ''}
    <h1 id="hero-t">${lineas}</h1>
    ${d.entradilla ? `<p class="hero-lead">${rico(d.entradilla)}</p>` : ''}
    <div class="botones">${(d.botones || []).map(b => boton(b, sitio)).join('')}</div>
    ${d.datos ? `<ul class="hero-datos">${d.datos.map(x => `<li><strong>${esc(x.valor)}</strong><span>${esc(x.texto)}</span></li>`).join('')}</ul>` : ''}
  </div>
</section>`;
  },
  css: `
.hero{min-height:calc(100svh - 72px);display:flex;align-items:center;overflow:hidden;padding-block:0}
.hero .wrap{position:relative;z-index:1;padding-block:clamp(56px,min(12vw,10vh),150px) clamp(40px,min(7vw,7vh),80px)}
.hero-foto{position:absolute;inset:0 0 0 40%}
.hero-foto img{width:100%;height:100%;object-fit:cover}
.hero-foto::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--fondo) 0%,color-mix(in srgb,var(--fondo) 55%,transparent) 30%,transparent 70%),linear-gradient(0deg,var(--fondo),transparent 30%)}
.hero h1{font-size:clamp(48px,min(8.6vw,10vh),124px);line-height:.92;max-width:11.5ch;margin-bottom:28px}
.hero h1 span{display:block}
.hero-lead{font-size:clamp(17px,1.7vw,21px);color:var(--texto-2);max-width:520px;margin-bottom:34px}
.hero-datos{display:flex;flex-wrap:wrap;gap:12px 36px;list-style:none;padding:0;margin:44px 0 0}
.hero-datos strong{display:block;font:var(--titulos-peso) 34px/1 var(--fuente-titulos);color:var(--texto)}
.hero-datos span{font-size:13px;color:var(--texto-2);letter-spacing:.04em}
.hero.sin-foto h1{max-width:14ch}
@media (max-width:760px){
  .hero{min-height:auto;flex-direction:column;align-items:stretch}
  .hero-foto{position:relative;inset:auto;height:58vh;order:-1}
  .hero-foto::after{background:linear-gradient(0deg,var(--fondo) 2%,transparent 50%)}
  .hero .wrap{margin-top:-90px;padding-top:0}
}`,
};
