// Menú móvil y cierre al elegir sección
(function(){var n=document.querySelector('.nav');if(!n)return;var b=n.querySelector('.abrir-menu');
if(b)b.addEventListener('click',function(){var a=n.classList.toggle('abierto');b.setAttribute('aria-expanded',a);});
n.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('abierto');if(b)b.setAttribute('aria-expanded','false');});});
var y=document.querySelector('[data-anio]');if(y)y.textContent=new Date().getFullYear();})();
