import { esc, rico, cabecera, ICONOS } from '../utilidades.mjs';

// Rejilla de vídeos de YouTube (trabajos, testimonios en vídeo, tutoriales...).
// Se reproducen dentro de la web; si no se puede incrustar (vista previa), abren YouTube.
// Se ven "visibles" al principio y el resto con "Ver todos".
export default {
  tipo: 'videos',
  render(d, sitio, ctx) {
    const lista = d.videos || [];
    const visibles = d.visibles ?? 6;
    const idLista = ctx.id + '-lista';
    return `<section id="${ctx.id}" class="videos${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    <div class="vd-grid" id="${idLista}" style="--cols:${d.columnas || 3}">${lista.map((v, i) => {
      const id = String(v.youtube).replace(/.*(?:youtu\.be\/|v=|shorts\/)([\w-]{11}).*/, '$1');
      const portada = v.portada || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return `<a class="vd${i >= visibles ? ' extra' : ''}" data-yt="${esc(id)}" href="https://youtu.be/${esc(id)}" target="_blank" rel="noopener">
        <span class="vd-img"><img src="${esc(portada)}" alt="" loading="lazy" decoding="async"><span class="vd-play" aria-hidden="true">${ICONOS.play}</span>${v.distintivo ? `<span class="vd-badge">${esc(v.distintivo)}</span>` : ''}</span>
        <span class="vd-txt"><strong>${rico(v.titulo)}</strong>${v.subtitulo ? `<span>${esc(v.subtitulo)}</span>` : ''}</span>
      </a>`;
    }).join('')}</div>
    ${lista.length > visibles ? `<button type="button" class="btn btn-secundario ver-mas" data-lista="${idLista}" data-texto="${esc(d.textoVerMas || 'Ver todos (' + lista.length + ')')}" aria-expanded="false">${esc(d.textoVerMas || 'Ver todos (' + lista.length + ')')}</button>` : ''}
  </div>
</section>`;
  },
  css: `
.vd-grid{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));gap:28px 18px}
.vd{text-decoration:none;display:block}
.vd-img{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;border-radius:var(--radio);background:var(--superficie-2);border:1px solid var(--linea)}
.vd-img img,.vd-img iframe{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0;transition:transform .5s}
.vd:hover .vd-img img{transform:scale(1.03)}
.vd-play{position:absolute;left:14px;bottom:14px;width:52px;height:52px;border-radius:50%;background:var(--acento);color:var(--sobre-acento);display:grid;place-items:center;transition:transform .2s}
.vd-play svg{width:20px;height:20px;fill:currentColor;margin-left:3px}
.vd:hover .vd-play{transform:scale(1.08)}
.vd-badge{position:absolute;top:12px;right:12px;background:var(--acento);color:var(--sobre-acento);font:700 10px/1 var(--fuente-texto);letter-spacing:.14em;text-transform:uppercase;padding:6px 8px}
.vd.reproduciendo .vd-play,.vd.reproduciendo .vd-badge{display:none}
.vd-txt{display:block;margin-top:14px}
.vd-txt strong{display:block;font:var(--titulos-peso) 20px/1.15 var(--fuente-titulos);text-transform:var(--titulos-mayus);letter-spacing:var(--titulos-espaciado)}
.vd-txt span{font-size:13px;color:var(--texto-2)}
@media (max-width:900px){.vd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.vd-grid{grid-template-columns:1fr}}`,
  runtime: ['vermas', 'videos', 'medios'],
};
