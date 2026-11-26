// Música de ambiente opcional. Los navegadores no dejan sonar sin un gesto, así que:
//  - con pantalla de entrada: el toque que la quita enciende la música (lo más fiable en móvil)
//  - sin pantalla: arranca en silencio y se activa con el primer toque, clic o tecla
// Se para cuando suena cualquier otra cosa (muestras, vídeos) y vuelve al terminar.
(function(){var amb=document.querySelector('audio[data-ambiente]'),btn=document.getElementById('ambiente');if(!amb||!btn)return;
var VOL=+(amb.dataset.volumen||.35),quiere=true,listo=false,fadeT;try{quiere=localStorage.getItem('lz-ambiente')!=='off';}catch(e){}
function fade(to,ms){clearInterval(fadeT);var from=amb.volume,t0=Date.now();fadeT=setInterval(function(){var k=Math.min(1,(Date.now()-t0)/ms);try{amb.volume=from+(to-from)*k;}catch(e){}if(k>=1){clearInterval(fadeT);if(to===0)amb.pause();}},40);}
function pintar(){var on=!amb.paused&&!amb.muted;btn.classList.toggle('on',on);btn.querySelector('.amb-estado').textContent=on?'ON':'OFF';btn.setAttribute('aria-pressed',on);}
amb.addEventListener('play',pintar);amb.addEventListener('pause',pintar);
function sonar(){if(!quiere)return;amb.muted=false;amb.volume=0;var p=amb.play();if(p&&p.then)p.then(function(){listo=true;quitar();fade(VOL,1800);pintar();}).catch(function(){});}
var EV=['pointerdown','keydown','touchend','click'];function primera(e){if(listo||!quiere)return;if(e&&e.target.closest&&e.target.closest('#ambiente,.entrada'))return;sonar();}
function quitar(){EV.forEach(function(t){document.removeEventListener(t,primera,true);});}
EV.forEach(function(t){document.addEventListener(t,primera,true);});
btn.addEventListener('click',function(){quiere=amb.paused||amb.muted;try{localStorage.setItem('lz-ambiente',quiere?'on':'off');}catch(e){}if(quiere)sonar();else fade(0,500);});
var pausadaPorOtro=false;document.addEventListener('lz:medio',function(){if(!amb.paused){pausadaPorOtro=true;fade(0,400);}});
document.addEventListener('ended',function(e){if(pausadaPorOtro&&e.target!==amb){pausadaPorOtro=false;sonar();}},true);
document.addEventListener('visibilitychange',function(){if(document.hidden&&!amb.paused){amb.pause();amb.dataset.reanudar=1;}else if(!document.hidden&&amb.dataset.reanudar){delete amb.dataset.reanudar;sonar();}});
window.lzAmbiente={sonar:sonar,silencio:function(){quiere=false;amb.pause();pintar();}};pintar();})();
