// Cuestionario de contacto: pregunta a pregunta y al final abre WhatsApp (o correo) con el resumen.
document.querySelectorAll('[data-quiz]').forEach(function(q){var d=JSON.parse(q.dataset.quiz),r=[],i=0,cuerpo=q.querySelector('.cq-cuerpo'),num=q.querySelector('.cq-num'),pista=q.querySelector('.cq-pista i'),atras=q.querySelector('.cq-atras'),N=d.preguntas.length;
function e(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});}
function pinta(){atras.hidden=i===0;pista.style.transform='scaleX('+Math.min(i+1,N)/N+')';num.textContent=String(Math.min(i+1,N)).padStart(2,'0')+' / '+String(N).padStart(2,'0');
if(i<N){var p=d.preguntas[i];cuerpo.innerHTML='<h3>'+e(p.pregunta)+'</h3>'+(p.opciones?'<div class="cq-opciones">'+p.opciones.map(function(o){return'<button type="button">'+e(o)+'</button>'}).join('')+'</div>':'<textarea rows="4" placeholder="'+e(p.ayuda||'Cuéntamelo aquí')+'"></textarea><button type="button" class="btn btn-principal">Siguiente</button>');
cuerpo.querySelectorAll('.cq-opciones button').forEach(function(b){b.onclick=function(){r[i]=b.textContent;i++;pinta();};});
var ta=cuerpo.querySelector('textarea');if(ta){ta.value=r[i]||'';cuerpo.querySelector('.btn').onclick=function(){r[i]=ta.value.trim()||'—';i++;pinta();};}
var h=cuerpo.querySelector('h3');if(h&&q.dataset.tocado){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}q.dataset.tocado=1;return;}
var lineas=d.preguntas.map(function(p,k){return(p.clave||p.pregunta)+': '+r[k];});var txt=d.inicio+'\n\n'+lineas.join('\n');
var url=d.via==='whatsapp'?d.destino+'?text='+encodeURIComponent(txt):d.destino+'?subject='+encodeURIComponent('Contacto desde la web')+'&body='+encodeURIComponent(txt);
cuerpo.innerHTML='<h3>'+e(d.gracias)+'</h3><ul class="cq-resumen">'+d.preguntas.map(function(p,k){return'<li><b>'+e(p.clave||p.pregunta)+':</b> '+e(r[k])+'</li>'}).join('')+'</ul><a class="btn btn-principal" target="_blank" rel="noopener" href="'+e(url)+'">'+e(d.textoFinal)+' ↗</a>';}
atras.onclick=function(){if(i>0){i--;pinta();}};pinta();});
