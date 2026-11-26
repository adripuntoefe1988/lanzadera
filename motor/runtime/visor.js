// Visor a pantalla completa. Cualquier elemento con data-visor="grupo" y data-src se abre aquí.
// Un botón con data-abrir-visor="grupo" abre el grupo desde la primera imagen.
(function(){
var v=document.createElement('div');v.className='visor';v.hidden=true;v.setAttribute('role','dialog');v.setAttribute('aria-modal','true');v.setAttribute('aria-label','Visor de imágenes');
v.innerHTML='<button class="visor-ant" type="button" aria-label="Anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="visor-sig" type="button" aria-label="Siguiente">›</button><button class="visor-cerrar" type="button" aria-label="Cerrar">✕</button>';
document.body.appendChild(v);var img=v.querySelector('img'),pie=v.querySelector('figcaption'),lista=[],i=0,antes=null,x0=null;
function grupo(g){var vistos={},r=[];document.querySelectorAll('[data-visor="'+g+'"]').forEach(function(e){var s=e.dataset.src;if(s&&!vistos[s]){vistos[s]=1;r.push(e);}});return r;}
function pinta(){var e=lista[i];img.src=e.dataset.src;img.alt=(e.querySelector('img')||{}).alt||'';pie.textContent=(e.dataset.pie?e.dataset.pie+' · ':'')+(i+1)+' / '+lista.length;}
function abrir(g,n){lista=grupo(g);if(!lista.length)return;i=n||0;antes=document.activeElement;pinta();v.hidden=false;document.documentElement.style.overflow='hidden';v.querySelector('.visor-cerrar').focus();}
function cerrar(){v.hidden=true;document.documentElement.style.overflow='';if(antes)antes.focus();}
function mover(d){i=(i+d+lista.length)%lista.length;pinta();}
document.addEventListener('click',function(e){var t=e.target.closest('[data-visor]');if(t&&t.dataset.src){e.preventDefault();var l=grupo(t.dataset.visor);abrir(t.dataset.visor,Math.max(0,l.findIndex(function(x){return x.dataset.src===t.dataset.src;})));return;}
var b=e.target.closest('[data-abrir-visor]');if(b)abrir(b.dataset.abrirVisor,0);});
v.querySelector('.visor-ant').onclick=function(){mover(-1)};v.querySelector('.visor-sig').onclick=function(){mover(1)};v.querySelector('.visor-cerrar').onclick=cerrar;
v.addEventListener('click',function(e){if(e.target===v||e.target.tagName==='FIGURE')cerrar();});
document.addEventListener('keydown',function(e){if(v.hidden)return;if(e.key==='Escape')cerrar();if(e.key==='ArrowLeft')mover(-1);if(e.key==='ArrowRight')mover(1);});
v.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
v.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)mover(dx<0?1:-1);x0=null;});
})();
