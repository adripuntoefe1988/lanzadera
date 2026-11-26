// Cinta de reseñas: avanza sola solo cuando se ve y la pestaña está activa; se para al tocarla.
document.querySelectorAll('[data-cinta]').forEach(function(c){var visible=false,parada=false,mitad=0,acc=0;
function m(){if(!mitad)mitad=c.scrollWidth/2;return mitad;}addEventListener('resize',function(){mitad=0});
new IntersectionObserver(function(e){visible=e[0].isIntersecting;}).observe(c);
['pointerdown','touchstart','focusin','mouseenter'].forEach(function(t){c.addEventListener(t,function(){parada=true},{passive:true});});
['mouseleave','focusout'].forEach(function(t){c.addEventListener(t,function(){parada=false});});
c.addEventListener('touchend',function(){setTimeout(function(){parada=false},2500)},{passive:true});
var red=matchMedia('(prefers-reduced-motion: reduce)').matches;
function paso(){if(visible&&!parada&&!document.hidden&&!red){acc+=.45;if(acc>=1){var n=Math.floor(acc);acc-=n;c.scrollLeft+=n;if(c.scrollLeft>=m())c.scrollLeft-=m();}}requestAnimationFrame(paso);}requestAnimationFrame(paso);});
