// Reproduce YouTube dentro de la web en dominios reales; en vistas previas abre YouTube en otra pestaña.
(function(){var ok=location.protocol!=='file:'&&!/claude|localhost-preview/.test(location.hostname);if(!ok)return;
document.querySelectorAll('[data-yt]').forEach(function(c){c.addEventListener('click',function(e){if(c.classList.contains('reproduciendo'))return;e.preventDefault();
document.dispatchEvent(new CustomEvent('lz:medio'));
var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+c.dataset.yt+'?autoplay=1&rel=0';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title=(c.querySelector('strong')||{}).textContent||'Vídeo';
(c.querySelector('.vd-img')||c).appendChild(f);c.classList.add('reproduciendo');});});})();
