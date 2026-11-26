import { esc, rico, cabecera, ICONOS } from '../utilidades.mjs';

// Dónde estamos y cuándo. Sin mapa incrustado (pesa y pide cookies): enlace a Google Maps.
export default {
  tipo: 'ubicacion',
  render(d, sitio, ctx) {
    return `<section id="${ctx.id}" class="ubicacion${ctx.alterna ? ' alterna' : ''}" aria-labelledby="${ctx.id}-t">
  <div class="wrap ub-grid">
    <div>${cabecera(d, ctx.id + '-t')}${(d.parrafos || []).map(p => `<p class="ub-p">${rico(p)}</p>`).join('')}</div>
    <div class="ub-tarjeta">
      ${d.direccion ? `<p class="ub-dir">${ICONOS.mapa}<span>${esc(d.direccion)}</span></p>` : ''}
      ${d.horario ? `<dl class="ub-horario">${d.horario.map(h => `<dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd>`).join('')}</dl>` : ''}
      ${d.mapa ? `<a class="btn btn-secundario" href="${esc(d.mapa)}" target="_blank" rel="noopener">Cómo llegar ↗</a>` : ''}
      ${d.nota ? `<p class="ub-nota">${rico(d.nota)}</p>` : ''}
    </div>
  </div>
</section>`;
  },
  css: `
.ub-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,80px);align-items:start}
.ub-p{color:var(--texto-2)}
.ub-tarjeta{padding:30px;border:1px solid var(--linea);border-radius:var(--radio);background:var(--superficie-2);display:grid;gap:22px}
.ub-dir{display:flex;gap:12px;font-weight:700;font-size:18px;margin:0}
.ub-dir .ico{color:var(--acento);margin-top:4px}
.ub-horario{display:grid;grid-template-columns:auto 1fr;gap:10px 24px;margin:0;font-size:15px}
.ub-horario dt{color:var(--texto-2)}
.ub-horario dd{margin:0;font-weight:600}
.ub-nota{font-size:14px;color:var(--texto-2);margin:0}
@media (max-width:860px){.ub-grid{grid-template-columns:1fr}}`,
};
