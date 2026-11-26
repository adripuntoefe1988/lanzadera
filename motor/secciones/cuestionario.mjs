import { esc, rico, cabecera, boton, imagen, whatsapp } from '../utilidades.mjs';

// Contacto en dos caminos (lección de Refuge):
//  1) directo: "¿Ya lo tienes claro? Escríbeme" con WhatsApp preescrito
//  2) cuestionario de 3-6 preguntas cortas que al final abre WhatsApp (o correo) con todo el contexto
// Así llegan mensajes con información en vez de "hola, ¿precio?".
export default {
  tipo: 'cuestionario',
  render(d, sitio, ctx) {
    const c = sitio.contacto || {};
    const datos = {
      preguntas: d.preguntas || [],
      inicio: d.mensajeInicio || `¡Hola! Vengo de la web de ${sitio.marca?.nombre || ''}.`,
      destino: c.whatsapp ? whatsapp(c.whatsapp) : (c.email ? 'mailto:' + c.email : ''),
      via: c.whatsapp ? 'whatsapp' : 'email',
      textoFinal: d.textoFinal || (c.whatsapp ? 'Abrir WhatsApp con mi respuesta' : 'Enviar por correo'),
      gracias: d.gracias || '¡Listo! Revisa el mensaje y envíalo.',
    };
    return `<section id="${ctx.id}" class="cuestionario${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap">
    ${cabecera(d, ctx.id + '-t')}
    ${d.directo ? `<div class="cq-directo"><div><h3>${rico(d.directo.titulo)}</h3><p>${rico(d.directo.texto)}</p></div>${boton({ whatsapp: true, ...d.directo.boton }, sitio)}</div>` : ''}
    <div class="cq-grid${d.foto ? '' : ' sin-foto'}">
      <div class="cq" data-quiz='${esc(JSON.stringify(datos))}'>
        <div class="cq-progreso"><span class="cq-num">01 / ${String(datos.preguntas.length).padStart(2, '0')}</span><span class="cq-pista"><i></i></span></div>
        <div class="cq-cuerpo" aria-live="polite"></div>
        <button type="button" class="cq-atras" hidden>← Pregunta anterior</button>
        <noscript><p>Escríbenos directamente: ${c.whatsapp ? `<a href="${esc(whatsapp(c.whatsapp))}">WhatsApp</a>` : ''} ${c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}</p></noscript>
      </div>
      ${d.foto ? `<figure class="cq-foto">${imagen(d.foto, d.fotoAlt, { pos: d.fotoPos })}</figure>` : ''}
    </div>
    <div class="cq-canales">
      ${c.telefono ? `<a href="tel:${esc(c.telefono.replace(/\s/g, ''))}">${esc(c.telefono)}</a>` : ''}
      ${c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}
      ${(c.instagram || []).map(u => `<a href="https://www.instagram.com/${esc(u.replace('@', ''))}/" target="_blank" rel="noopener">@${esc(u.replace('@', ''))}</a>`).join('')}
    </div>
  </div>
</section>`;
  },
  css: `
.cq-directo{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;padding:26px 28px;margin-bottom:28px;border:1px solid var(--acento);border-radius:var(--radio);background:color-mix(in srgb,var(--acento) 7%,transparent)}
.cq-directo h3{font-size:24px;margin-bottom:6px}
.cq-directo p{color:var(--texto-2);margin:0;max-width:560px}
.cq-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:24px}
.cq-grid.sin-foto{grid-template-columns:1fr}
.cq{padding:clamp(24px,4vw,44px);background:var(--superficie-2);border:1px solid var(--linea);border-radius:var(--radio);min-height:420px;display:flex;flex-direction:column}
.cq-progreso{display:flex;align-items:center;gap:16px;font:700 12px/1 var(--fuente-texto);letter-spacing:.2em;color:var(--texto-2);margin-bottom:30px}
.cq-pista{flex:1;height:3px;background:var(--linea)}
.cq-pista i{display:block;height:100%;background:var(--acento);transform-origin:left;transition:transform .3s}
.cq-cuerpo h3{font-size:clamp(26px,3vw,38px);margin-bottom:24px}
.cq-opciones{display:grid;gap:10px}
.cq-opciones button{text-align:left;padding:16px 18px;border:1px solid var(--linea);border-radius:var(--radio-btn);background:var(--fondo);color:var(--texto);font:600 16px/1.3 var(--fuente-texto);cursor:pointer;transition:border-color .2s,transform .2s}
.cq-opciones button:hover{border-color:var(--acento);transform:translateX(4px)}
.cq-cuerpo textarea,.cq-cuerpo input{width:100%;padding:14px;border:1px solid var(--linea);border-radius:var(--radio-btn);background:var(--fondo);color:var(--texto);font:16px/1.5 var(--fuente-texto);margin-bottom:14px}
.cq-resumen{list-style:none;padding:0;margin:0 0 24px;display:grid;gap:8px;font-size:15px;color:var(--texto-2)}
.cq-resumen b{color:var(--texto)}
.cq-atras{margin-top:auto;align-self:flex-start;background:none;border:0;color:var(--texto-2);font:600 13px/1 var(--fuente-texto);cursor:pointer;padding:18px 0 0}
.cq-foto{margin:0;overflow:hidden;border-radius:var(--radio)}
.cq-foto img,.cq-foto .hueco-foto{width:100%;height:100%;object-fit:cover}
.cq-canales{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:28px;font-weight:600}
.cq-canales a{text-decoration:none;border-bottom:1px solid var(--linea)}
.cq-canales a:hover{border-color:var(--acento)}
@media (max-width:860px){.cq-grid{grid-template-columns:1fr}.cq-foto{display:none}}`,
  runtime: ['cuestionario'],
};
