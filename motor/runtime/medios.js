// Coordina los sonidos de la página: cuando empieza uno, se paran los demás y la música de ambiente.
(function(){var p=HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play=function(){if(!this.muted&&!this.hasAttribute('data-ambiente')){var yo=this;document.querySelectorAll('audio,video').forEach(function(m){if(m!==yo&&!m.paused&&!m.hasAttribute('data-ambiente'))m.pause();});document.dispatchEvent(new CustomEvent('lz:medio'));}return p.apply(this,arguments);};})();
