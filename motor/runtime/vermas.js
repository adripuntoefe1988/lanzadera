// "Ver todos": muestra los elementos .extra de la lista indicada en data-lista
document.querySelectorAll('.ver-mas[data-lista]').forEach(function(b){var l=document.getElementById(b.dataset.lista);if(!l)return;
b.addEventListener('click',function(){var a=l.classList.toggle('abierto');b.setAttribute('aria-expanded',a);b.textContent=a?'Ver menos':b.dataset.texto;if(!a)l.scrollIntoView({block:'start'});});});
