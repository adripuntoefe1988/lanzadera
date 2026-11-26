// Antes/después de audio (dos pistas sincronizadas) y de imagen (deslizador)
document.querySelectorAll('[data-ab]').forEach(function(t){var a=t.querySelectorAll('audio'),v=0,btn=t.querySelector('.ab-play'),barra=t.querySelector('.ab-barra i');
function actual(){return a[v];}
function pintar(){t.classList.toggle('sonando',!actual().paused);}
a.forEach(function(x){x.addEventListener('timeupdate',function(){if(x===actual()&&x.duration)barra.style.transform='scaleX('+(x.currentTime/x.duration)+')';});x.addEventListener('pause',pintar);x.addEventListener('play',pintar);x.addEventListener('ended',function(){barra.style.transform='scaleX(0)';});});
btn.addEventListener('click',function(){var x=actual();if(x.paused){a.forEach(function(o){if(o.preload==='none')o.preload='auto';});x.play();}else x.pause();});
t.querySelectorAll('.ab-cambio button').forEach(function(b){b.addEventListener('click',function(){var n=+b.dataset.v;if(n===v)return;var ant=actual(),son=!ant.paused,tt=ant.currentTime;v=n;
t.querySelectorAll('.ab-cambio button').forEach(function(o){o.setAttribute('aria-pressed',o===b);});var x=actual();try{x.currentTime=tt;}catch(e){}if(son){ant.pause();x.play();}});});
t.querySelector('.ab-barra').addEventListener('click',function(e){var x=actual();if(!x.duration)return;var r=this.getBoundingClientRect();x.currentTime=(e.clientX-r.left)/r.width*x.duration;});});
document.querySelectorAll('[data-ab-img]').forEach(function(f){var r=f.querySelector('input');r.addEventListener('input',function(){f.style.setProperty('--x',r.value+'%');});});
