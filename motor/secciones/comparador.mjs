import { esc, rico, cabecera, imagen, ICONOS } from '../utilidades.mjs';

// Antes / después. Dos modos:
//  - "audio": dos pistas sincronizadas; se cambia de una a otra sin perder el punto (mezcla, master, locución...)
//  - "imagen": deslizador sobre dos fotos (reformas, peluquería, restauración, retoque...)
export default {
  tipo: 'comparador',
  render(d, sitio, ctx) {
    const modo = d.modo || 'imagen';
    const et = d.etiquetas || (modo === 'audio' ? ['Antes', 'Después'] : ['Antes', 'Después']);
    const items = (d.items || []).map((it, i) => modo === 'audio' ? `
      <article class="ab-audio" data-ab>
        <div class="ab-cab"><h3>${rico(it.titulo)}</h3>${it.subtitulo ? `<span>${esc(it.subtitulo)}</span>` : ''}</div>
        <audio preload="none" src="${esc(it.antes)}"></audio><audio preload="none" src="${esc(it.despues)}"></audio>
        <div class="ab-controles">
          <button type="button" class="ab-play" aria-label="Reproducir">${ICONOS.play}${ICONOS.pausa}</button>
          <div class="ab-cambio" role="group" aria-label="Versión">
            <button type="button" aria-pressed="true" data-v="0">${esc(et[0])}</button><button type="button" aria-pressed="false" data-v="1">${esc(et[1])}</button>
          </div>
        </div>
        <div class="ab-barra"><i></i></div>
        ${it.nota ? `<p class="ab-nota">${rico(it.nota)}</p>` : ''}
      </article>` : `
      <figure class="ab-imagen" data-ab-img style="--x:50%">
        <div class="ab-capa">${imagen(it.despues, it.alt ? it.alt + ' (' + et[1] + ')' : et[1])}</div>
        <div class="ab-capa ab-antes">${imagen(it.antes, it.alt ? it.alt + ' (' + et[0] + ')' : et[0])}</div>
        <span class="ab-et ab-et-a">${esc(et[0])}</span><span class="ab-et ab-et-d">${esc(et[1])}</span>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar ${esc(et[0])} y ${esc(et[1])}">
        <span class="ab-linea" aria-hidden="true"></span>
        ${it.titulo ? `<figcaption>${rico(it.titulo)}</figcaption>` : ''}
      </figure>`).join('');
    return `<section id="${ctx.id}" class="comparador${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">${cabecera(d, ctx.id + '-t')}<div class="ab-grid ab-${modo}s">${items}</div>
  ${d.consejo ? `<p class="ab-consejo">${rico(d.consejo)}</p>` : ''}</div>
</section>`;
  },
  css: `
.ab-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
.ab-audio{background:var(--superficie-2);border:1px solid var(--linea);border-radius:var(--radio);padding:24px}
.ab-cab h3{font-size:24px;margin-bottom:4px}
.ab-cab span{font-size:14px;color:var(--texto-2)}
.ab-controles{display:flex;align-items:center;gap:14px;margin:22px 0 16px}
.ab-play{width:56px;height:56px;border-radius:50%;border:0;background:var(--acento);color:var(--sobre-acento);display:grid;place-items:center;cursor:pointer;flex:none}
.ab-play svg{width:22px;height:22px;fill:currentColor}
.ab-play svg+svg,.ab-audio.sonando .ab-play svg:first-child{display:none}
.ab-audio.sonando .ab-play svg+svg{display:block}
.ab-cambio{display:flex;border:1px solid var(--linea);border-radius:var(--radio-btn);overflow:hidden;flex:1}
.ab-cambio button{flex:1;border:0;background:none;color:var(--texto-2);font:700 12px/1 var(--fuente-texto);letter-spacing:.12em;text-transform:uppercase;padding:14px 8px;cursor:pointer}
.ab-cambio button[aria-pressed=true]{background:var(--texto);color:var(--fondo)}
.ab-barra{height:4px;background:var(--linea);border-radius:4px;overflow:hidden;cursor:pointer}
.ab-barra i{display:block;height:100%;width:100%;background:var(--acento);transform-origin:left;transform:scaleX(0)}
.ab-nota{font-size:14px;color:var(--texto-2);margin:14px 0 0}
.ab-consejo{margin-top:26px;font-size:14px;color:var(--texto-2)}
.ab-imagen{position:relative;margin:0;aspect-ratio:4/3;overflow:hidden;border-radius:var(--radio);user-select:none}
.ab-capa{position:absolute;inset:0}
.ab-capa img,.ab-capa .hueco-foto{width:100%;height:100%;object-fit:cover}
.ab-antes{clip-path:inset(0 calc(100% - var(--x)) 0 0)}
.ab-imagen input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.ab-linea{position:absolute;top:0;bottom:0;left:var(--x);width:3px;margin-left:-1px;background:#fff;pointer-events:none;box-shadow:0 0 12px rgba(0,0,0,.5)}
.ab-linea::after{content:"⟷";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center;font-size:18px}
.ab-et{position:absolute;top:14px;font:700 11px/1 var(--fuente-texto);letter-spacing:.18em;text-transform:uppercase;background:rgba(0,0,0,.6);color:#fff;padding:7px 9px;pointer-events:none}
.ab-et-a{left:14px}.ab-et-d{right:14px}
.ab-imagen figcaption{position:absolute;left:0;right:0;bottom:0;padding:30px 16px 14px;background:linear-gradient(0deg,rgba(0,0,0,.75),transparent);color:#fff;font-weight:600;pointer-events:none}`,
  runtime: ['comparador', 'medios'],
};
