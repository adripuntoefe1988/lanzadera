// Pantalla de entrada: una vez por sesión. Su toque es el que enciende la música.
(function(){var ent=document.getElementById('entrada');if(!ent)return;
try{if(sessionStorage.getItem('lz-entrada')){ent.remove();document.documentElement.classList.remove('con-entrada');return;}}catch(e){}
function entrar(sonido){if(ent.classList.contains('fuera'))return;try{sessionStorage.setItem('lz-entrada','1');}catch(e){}
if(window.lzAmbiente){if(sonido)window.lzAmbiente.sonar();else window.lzAmbiente.silencio();}
ent.classList.add('fuera');document.documentElement.classList.remove('con-entrada');setTimeout(function(){ent.remove();},800);}
var s=ent.querySelector('.entrada-silencio');if(s)s.addEventListener('click',function(e){e.stopPropagation();entrar(false);});
ent.addEventListener('click',function(){entrar(true);});
document.addEventListener('keydown',function(e){if(!document.body.contains(ent))return;if(e.key==='Escape')entrar(false);else if(e.key==='Enter'){e.preventDefault();entrar(true);}});})();
