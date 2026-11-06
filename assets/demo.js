/* ARGUS · Demo de ATLAS: conversaciones y sitio web de ejemplo. Datos ficticios; no envía mensajes.
   Los textos salen del perfil de rubro (assets/demo-rubros.js). */

/* ================= Conversaciones (compartido) ================= */
var Chat = (function(){
  function sleep(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

  // root: elemento que contiene .wa-body/.wc-body, .wa-state y (opcional) .wa-clock
  function Player(root){
    this.root = root;
    this.body = root.querySelector('.wa-body, .wc-body');
    this.stateEl = root.querySelector('.wa-state');
    this.clockEl = root.querySelector('.wa-clock');
    this.idle = this.stateEl ? this.stateEl.textContent : '';
    this.run = 0; this.speed = 1;
  }
  Player.prototype.setState = function(s, typing){
    if(!this.stateEl) return;
    this.stateEl.textContent = s || this.idle;
    this.stateEl.classList.toggle('typ', !!typing);
  };
  Player.prototype.clock = function(t){ if(this.clockEl && t) this.clockEl.textContent = t; };
  Player.prototype.stop = function(){ this.run++; var t = this.body.querySelector('.typing'); if(t) t.remove(); this.setState(); };
  Player.prototype.clear = function(){ this.stop(); this.body.innerHTML = ''; };
  Player.prototype.add = function(cls, html){
    var b = document.createElement('div'); b.className = cls; b.innerHTML = html;
    this.body.appendChild(b);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ b.classList.add('show'); }); });
    var body = this.body; setTimeout(function(){ body.scrollTop = body.scrollHeight; }, 40);
    return b;
  };
  Player.prototype.play = async function(script){
    var my = ++this.run, sp = this.speed;
    for(var i = 0; i < script.length; i++){
      var s = script[i];
      if(my !== this.run) return false;
      if(s.fn){ s.fn(); continue; }
      if(s.wait){ await sleep(s.wait / sp); continue; }
      if(s.day){ this.add('wa-day', s.day); continue; }
      if(s.who === 'a'){
        await sleep((s.pre || 450) / sp); if(my !== this.run) return false;
        var ty = this.add('typing', '<i></i><i></i><i></i>'); this.setState('escribiendo…', true);
        await sleep((s.type || 1150) / sp); ty.remove(); this.setState();
        if(my !== this.run) return false;
      } else {
        await sleep((s.pre || (s.who === 'sys' ? 450 : 950)) / sp); if(my !== this.run) return false;
      }
      var time = s.t ? '<span class="t">' + s.t + (s.who === 'p' ? '<span class="ck">✓✓</span>' : '') + '</span>' : '';
      this.add('msg ' + s.who + (s.cls ? ' ' + s.cls : ''), s.text + time);
      if(s.after) s.after();
    }
    return my === this.run;
  };
  return { Player: Player, sleep: sleep };
})();

/* Sitio web: abrir / cerrar el chat */
function wireSite(site, onOpen){
  site.querySelectorAll('[data-open-chat]').forEach(function(b){
    b.addEventListener('click', function(){ site.classList.add('chat-open'); if(onOpen) onOpen(); });
  });
  site.querySelectorAll('[data-close-chat]').forEach(function(b){
    b.addEventListener('click', function(){ site.classList.remove('chat-open'); });
  });
}

/* Revelado al hacer scroll */
function argusReveal(){
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
}

(function(){
  "use strict";
  argusReveal();
  // medidores
  var R = 44, C = 2 * Math.PI * R;
  document.querySelectorAll('.gauge').forEach(function(g){
    var mn = +g.dataset.min, mx = +g.dataset.max, f = g.querySelector('.g-fill');
    f.style.strokeDasharray = '0 ' + C; f.style.strokeDashoffset = -(C * mn / 100);
    setTimeout(function(){ f.style.strokeDasharray = (C * (mx - mn) / 100) + ' ' + C; }, 700);
  });

  // sitio web de ejemplo: el chat se abre a demanda
  var host = document.getElementById('siteHost');
  if(host && window.ARGUS_PERFIL){
    var site = host.querySelector('.site');
    var wc = new Chat.Player(site.querySelector('.wc'));
    var script = window.ARGUS_PERFIL.web_msgs.map(function(m, i, arr){
      var s = { who: m[0], text: m[1] };
      if(i === arr.length - 1) s.after = function(){ var a = document.getElementById('siteAppt'); if(a) a.classList.add('on'); };
      return s;
    });
    var played = false;
    function playWeb(){ if(played) return; played = true; wc.clear(); wc.play(script); }
    wireSite(site, playWeb);
  }
})();
