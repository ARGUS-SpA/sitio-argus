
var ARGUS_V2 = true;
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

/* Guiones. Paciente = 'p' (derecha), agente = 'a' (izquierda). */
function argusScripts(fire){
 const ev = name => () => fire(name);
 return {
 web:[{who:'p',text:'Hola, quisiera reservar una hora.'},{who:'a',text:'Hola. Soy el asistente automatizado de Sonrisas del Sur. Gestiono citas; no evalúo síntomas. Este ejemplo usa datos ficticios. ¿Busca un horario disponible?'},{who:'p',text:'Sí, el sábado.'},{who:'a',text:'Hay un horario a las 10:00. ¿Desea reservarlo?'},{who:'p',text:'Sí. Ignacio Lagos, contacto de demostración.'},{who:'a',text:'La reserva de ejemplo quedó confirmada para el sábado a las 10:00.',after:ev('web')},{who:'sys',text:'Reserva ficticia registrada en ATLAS'}],
 book:[{day:'Ejemplo · fuera de horario'},{who:'p',t:'23:10',text:'Hola, quiero reservar una hora.'},{who:'a',t:'23:10',text:'Hola. Soy el asistente automatizado de Sonrisas del Sur. Puedo gestionar su cita. No evalúo síntomas ni atiendo urgencias. Este es un ejemplo ficticio.'},{who:'p',text:'Busco un horario el jueves.'},{who:'a',text:'Está disponible el jueves a las 10:30. ¿Desea reservarlo?'},{who:'p',text:'Sí, confirmo. Mis datos de ejemplo están registrados.'},{who:'a',text:'Reserva confirmada para el jueves a las 10:30. ¿Desea recibir por este WhatsApp recordatorios de esta y sus próximas citas con la clínica?'},{who:'p',text:'Sí, recordarme.'},{who:'a',text:'Preferencia registrada. Puede retirar los recordatorios por el canal de preferencias de la clínica.',after:ev('book')},{who:'sys',text:'Cita creada · permiso de recordatorios registrado'}],
 remind:[{day:'Ejemplo · recordatorio autorizado'},{who:'a',text:'Tiene un recordatorio de una cita. Revise el detalle en el enlace protegido de su centro. [Enlace de demostración] ¿Confirma su asistencia?'},{who:'p',text:'Sí, confirmo.'},{who:'a',text:'Asistencia confirmada. Gracias.',after:ev('confirm')},{who:'sys',text:'Confirmación registrada · sin datos clínicos en el mensaje'}],
 cancel:[{day:'Ejemplo · cancelación'},{who:'p',text:'Necesito cancelar mi reserva de hoy.'},{who:'a',text:'La reserva de ejemplo fue identificada mediante la verificación configurada. ¿Confirma que desea cancelarla?'},{who:'p',text:'Sí, cancelar.'},{who:'a',text:'Su reserva quedó cancelada. Podemos buscar otro horario si lo desea.',after:ev('cancel')},{who:'sys',text:'Cupo liberado → lista de espera'}],
 wait:[{day:'Ejemplo · lista de espera'},{fn:ev('notify')},{who:'a',text:'Hay un horario disponible para su solicitud en lista de espera. Consulte el detalle en el enlace protegido. [Enlace de demostración] ¿Desea reservarlo?'},{who:'p',text:'Sí, deseo reservarlo.'},{who:'a',text:'Reserva confirmada. Puede revisar el detalle en el canal protegido de su centro.',after:ev('fill')},{who:'sys',text:'Cupo reservado desde la lista de espera'}],
 urgent:[{day:'Ejemplo · fuera del horario del centro'},{who:'p',t:'21:20',text:'Necesito hablar con una persona.'},{who:'a',t:'21:20',text:'Dejé su solicitud para el equipo de la clínica. En este momento está fuera de su horario de atención humana y queda pendiente de revisión. Este asistente solo realiza gestiones administrativas; no atiende urgencias.',after:ev('urgent')},{who:'sys',cls:'al',text:'Derivación pendiente · sin respuesta humana inmediata'}]
 };
}

/* Escenarios y orquestación de la demo */
var ARGUS_SCN = [
  {k:'web',    label:'Sitio web',       clock:'21:40', view:'agenda',  channel:'web', web:true},
  {k:'book',   label:'Agendar',         clock:'23:10', view:'agenda'},
  {k:'remind', label:'Recordatorio',    clock:'10:30', view:'agenda',  needs:['book']},
  {k:'cancel', label:'Cancelación',     clock:'08:02', view:'agenda'},
  {k:'wait',   label:'Lista de espera', clock:'08:04', view:'espera',  needs:['cancel']},
  {k:'urgent', label:'Derivación humana',        clock:'21:20', view:'conv'}
].filter(function(s){ return ARGUS_V2 || !s.web; });
var ARGUS_EVS = {web:['web'], book:['book'], remind:['confirm'], cancel:['cancel'], wait:['notify','fill'], urgent:['urgent']};

function ArgusDemo(o){
  // o: {wa: Player, web: Player (opcional), channel: fn(name), onScene: fn(scn)}
  var self = this; this.o = o; this.seq = 0;
  this.scripts = argusScripts(function(ev){ Admin.fire(ev); });
}
ArgusDemo.prototype.find = function(k){ return ARGUS_SCN.filter(function(s){ return s.k === k; })[0]; };
ArgusDemo.prototype.prepare = function(sc){
  var self = this;
  (sc.needs || []).forEach(function(n){ ARGUS_EVS[n].forEach(function(e){ Admin.fire(e, {silent:true}); }); });
};
ArgusDemo.prototype.play = function(k){
  var sc = this.find(k); if(!sc) return Promise.resolve(false);
  var ch = sc.channel || 'wa';
  if(this.o.channel) this.o.channel(ch);
  this.prepare(sc);
  if(sc.view) Admin.show(sc.view);
  if(this.o.onScene) this.o.onScene(sc);
  var pl = ch === 'web' ? this.o.web : this.o.wa;
  if(this.o.wa) this.o.wa.stop(); if(this.o.web) this.o.web.stop();
  pl.clear(); pl.clock(sc.clock);
  return pl.play(this.scripts[k]);
};
ArgusDemo.prototype.stopTour = function(){ this.seq++; };
ArgusDemo.prototype.tour = async function(opts){
  opts = opts || {};
  var my = ++this.seq, self = this;
  while(my === this.seq){
    Admin.reset();
    for(var i = 0; i < ARGUS_SCN.length; i++){
      if(my !== this.seq) return;
      var k = ARGUS_SCN[i].k;
      if(opts.skip && opts.skip.indexOf(k) > -1) continue;
      await this.play(k);
      if(my !== this.seq) return;
      await Chat.sleep(2600);
    }
    if(my !== this.seq) return;
    Admin.show('inicio'); if(this.o.onScene) this.o.onScene({k:'stats', label:'Estadísticas'});
    await Chat.sleep(7000);
    if(!opts.loop) return;
  }
};

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
function whenVisible(el, fn, th){
  var done = false;
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && !done){ done = true; io.disconnect(); fn(); } }); }, {threshold: th || .3});
  io.observe(el);
}

/* ================= Panel de administración (compartido) ================= */
var Admin = (function(){
  var root, content, toastEl, toastT, S;
  var PX = 26; // px por media hora
  var DAYS = [['Lun',12],['Mar',13],['Mié',14],['Jue',15],['Vie',16],['Sáb',17]];
  var PROS = {
    rojas:  {name:'Dr. Andrés Rojas', short:'Dr. Rojas',  spec:'Odontología general', ini:'AR', hours:'Lun–Vie · 09:00–18:00', block:'Vie 16 · 16:00–18:00 · Capacitación', occ:0},
    mendez: {name:'Dra. Paula Méndez', short:'Dra. Méndez', spec:'Ortodoncia', ini:'PM', hours:'Lun–Vie · 09:00–18:00 · Sáb 09:00–13:00', block:'Sin bloqueos esta semana'},
    vera:   {name:'Dr. Felipe Vera', short:'Dr. Vera', spec:'Endodoncia', ini:'FV', hours:'Lun–Vie · 09:00–17:00', block:'Mar 13 · 09:00–11:00 · Trámite'}
  };
  var COLORS = {rojas:'rgba(232,228,220,.45)', mendez:'#8B9299', vera:'#8F6C3B'};

  function initial(){
    return {
      view:'inicio', convSel:'c1', q:'', done:{}, fresh:{},
      filter:{rojas:true, mendez:true, vera:true},
      agentOn:{rojas:true, mendez:true, vera:true},
      appts:[
        {id:'a1', d:0, s:'09:00', m:30, p:'rojas',  n:'Morales'},
        {id:'a2', d:0, s:'10:00', m:60, p:'vera',   n:'Castro'},
        {id:'a3', d:0, s:'11:30', m:30, p:'mendez', n:'Navarro'},
        {id:'a4', d:0, s:'15:00', m:30, p:'rojas',  n:'Riquelme'},
        {id:'a5', d:1, s:'11:30', m:30, p:'mendez', n:'Pino'},
        {id:'a6', d:1, s:'14:30', m:60, p:'rojas',  n:'Gallardo'},
        {id:'a7', d:1, s:'16:00', m:30, p:'vera',   n:'Torres'},
        {id:'a8', d:2, s:'09:00', m:30, p:'rojas',  n:'Araya'},
        {id:'a9', d:2, s:'10:30', m:60, p:'vera',   n:'Sepúlveda'},
        {id:'tp', d:2, s:'14:00', m:30, p:'rojas',  n:'Pérez'},
        {id:'a10',d:2, s:'16:30', m:30, p:'mendez', n:'Bravo'},
        {id:'a11',d:3, s:'09:30', m:30, p:'mendez', n:'Fuentealba'},
        {id:'a12',d:3, s:'12:00', m:30, p:'rojas',  n:'Vidal'},
        {id:'a13',d:3, s:'15:00', m:60, p:'vera',   n:'Cárdenas'},
        {id:'a14',d:4, s:'09:00', m:30, p:'rojas',  n:'Reyes'},
        {id:'a15',d:4, s:'11:00', m:30, p:'mendez', n:'Muñoz'},
        {id:'a16',d:4, s:'14:30', m:30, p:'vera',   n:'Jara'},
        {id:'a17',d:5, s:'09:00', m:30, p:'mendez', n:'Contreras'},
        {id:'a18',d:5, s:'11:00', m:30, p:'rojas',  n:'Espinoza'}
      ],
      blocks:[
        {d:0,s:'13:00',m:60,t:'Colación'},{d:1,s:'13:00',m:60,t:'Colación'},{d:2,s:'13:00',m:60,t:'Colación'},
        {d:3,s:'13:00',m:60,t:'Colación'},{d:4,s:'13:00',m:60,t:'Colación'},
        {d:4,s:'16:00',m:120,t:'Bloqueo · Dr. Rojas'},{d:1,s:'09:00',m:120,t:'Bloqueo · Dr. Vera'},
        {d:5,s:'13:00',m:300,t:'Cerrado'}
      ],
      wait:[
        {n:'Marcela Fuentes', need:'Control · Dr. Rojas', since:'02/10', st:'wait'},
        {n:'Rodrigo Ibáñez',  need:'Limpieza · cualquier profesional', since:'05/10', st:'wait'},
        {n:'Carla Salas',     need:'Ortodoncia · Dra. Méndez', since:'08/10', st:'wait'}
      ],
      freed:null, filled:false,
      patients:[
        {n:'Luis Castro',      rut:'14.552.***-1', last:'02/09', next:'Lun 12 · 10:00', ch:'WhatsApp'},
        {n:'Sofía Navarro',    rut:'20.118.***-4', last:'15/09', next:'Lun 12 · 11:30', ch: ARGUS_V2 ? 'Sitio web' : 'WhatsApp'},
        {n:'Daniela Pino',     rut:'18.730.***-K', last:'30/09', next:'Mar 13 · 11:30', ch:'WhatsApp'},
        {n:'Tomás Pérez',      rut:'16.204.***-8', last:'11/04', next:'Mié 14 · 14:00', ch:'WhatsApp'},
        {n:'Héctor Vidal',     rut:'12.977.***-3', last:'19/03', next:'Jue 15 · 12:00', ch:'Recepción'},
        {n:'Marcela Fuentes',  rut:'17.415.***-2', last:'08/03', next:'—', ch:'WhatsApp'},
        {n:'Valentina Soto',   rut:'15.873.***-6', last:'09/04', next:'—', ch:'WhatsApp'}
      ],
      convos:[
        {id:'c1', n:'Daniela Pino', ch:'WhatsApp', t:'Ayer 19:42', pre:'Reagendó su control para el martes 13', steps:['Encontró su cita del lunes 12 a las 10:00','La paciente pidió moverla: ofreció tres alternativas de la Dra. Méndez','Movió la cita al martes 13 a las 11:30','Reprogramó los recordatorios a la nueva hora']},
        {id:'c2', n:'Héctor Vidal', ch:'WhatsApp', t:'Ayer 12:15', pre:'Preguntó qué incluye una limpieza', steps:['Respondió con la información de servicios que cargó la clínica','Ofreció agendar; el paciente prefirió esperar','Dejó la conversación abierta, sin compromisos']},
        {id:'c3', n:'Sofía Navarro', ch: ARGUS_V2 ? 'Sitio web' : 'WhatsApp', t:'Vie 09 18:03', pre:'Agendó su control de ortodoncia', steps:['Verificó los datos mínimos de la reserva de ejemplo','Ofreció horas de la Dra. Méndez','Reservó el lunes 12 a las 11:30','Registró el permiso para recordatorios']}
      ],
      kpi:{citas:63, recup:9, resp:'< 40 s', fuera:41},
      origin: ARGUS_V2 ? {wa:62, web:24, rec:14} : {wa:74, web:0, rec:26},
      feed:[
        {t:'08:00', h:'Recordatorios de hoy enviados · <b>14 pacientes</b>'},
        {t:'07:40', h:'Lista de espera revisada · <b>3 pacientes</b> en cola'},
        {t:'Ayer', h:'Cita reagendada por el agente · <b>D. Pino</b>'},
        {t:'Ayer', h:'Consulta respondida fuera de horario · <b>H. Vidal</b>'}
      ]
    };
  }

  function min(s){ var p = s.split(':'); return +p[0]*60 + +p[1]; }
  function feed(t, h, al){ S.feed.unshift({t:t, h:h, al:al, fresh:true}); S.feed = S.feed.slice(0, 7); }
  function patient(p){
    var f = S.patients.filter(function(x){ return x.n === p.n; })[0];
    if(f){ for(var k in p) f[k] = p[k]; f.fresh = true; S.patients.splice(S.patients.indexOf(f), 1); S.patients.unshift(f); }
    else { p.fresh = true; S.patients.unshift(p); }
  }
  function appt(id){ return S.appts.filter(function(a){ return a.id === id; })[0]; }

  var EV = {
    book: function(){
      S.appts.push({id:'vs', d:3, s:'10:30', m:30, p:'rojas', n:'Soto', tag:'Agente', ag:true});
      S.kpi.citas++; S.fresh.citas = 1; S.fresh.vs = 1;
      patient({n:'Valentina Soto', next:'Jue 15 · 10:30', ch:'WhatsApp'});
      S.convos.unshift({id:'cvs', n:'Valentina Soto', ch:'WhatsApp', t:'Dom 11 23:11', pre:'Agendó control con el Dr. Rojas', fresh:true, steps:['Verificó los datos mínimos de la reserva de ejemplo','Consultó una preferencia de horario','Ofreció tres horas libres del Dr. Rojas','Reservó el jueves 15 a las 10:30, con la agenda bloqueada mientras confirmaba','Registró el permiso para recordatorios']});
      feed('23:11', 'Cita creada por el agente · <b>V. Soto</b> · Jue 15, 10:30');
      return {k:'Nueva cita · WhatsApp', m:'Valentina Soto · Jue 15, 10:30 · Dr. Rojas', view:'agenda'};
    },
    confirm: function(){
      var a = appt('vs'); if(a){ a.tag = 'Confirmada'; } S.fresh.vs = 1;
      var c = S.convos.filter(function(x){ return x.id === 'cvs'; })[0];
      if(c){ c.pre = 'Confirmó asistencia por recordatorio'; c.t = 'Mié 14 10:34'; c.steps.push('Envió el recordatorio de 24 h y recibió la confirmación'); }
      feed('10:34', 'Recordatorio 24 h · <b>V. Soto</b> confirmó asistencia');
      return {k:'Asistencia confirmada', m:'V. Soto respondió el recordatorio de 24 h', view:'agenda'};
    },
    cancel: function(){
      var a = appt('tp'); if(a){ a.cx = true; a.tag = 'Cancelada'; } S.fresh.tp = 1;
      S.freed = 'Mié 14 · 14:00 · Dr. Rojas';
      patient({n:'Tomás Pérez', next:'Mar 20 · 16:30', ch:'WhatsApp'});
      S.convos.unshift({id:'ctp', n:'Tomás Pérez', ch:'WhatsApp', t:'Mié 14 08:03', pre:'Canceló y reagendó para el martes 20', fresh:true, steps:['Identificó su cita de hoy a las 14:00','La canceló y liberó el cupo en la agenda','Reagendó para el martes 20 a las 16:30','Activó la lista de espera para el cupo liberado']});
      feed('08:02', 'Cancelación · <b>T. Pérez</b> liberó Mié 14, 14:00', true);
      return {k:'Cupo liberado', m:'T. Pérez canceló Mié 14 · 14:00. La lista de espera se activa sola.', view:'agenda', al:true};
    },
    notify: function(){
      if(!S.freed){ S.done.cancel = 1; EV.cancel(); }
      S.wait[0].st = 'notif'; S.wait[0].fresh = true;
      feed('08:04', 'Lista de espera · <b>M. Fuentes</b> notificada por WhatsApp');
      return {k:'Lista de espera', m:'Marcela Fuentes fue notificada del cupo liberado', view:'espera'};
    },
    fill: function(){
      if(S.wait[0].st === 'wait'){ S.done.notify = 1; EV.notify(); }
      S.wait[0].st = 'ok'; S.wait[0].fresh = true; S.filled = true;
      var a = appt('tp'); if(a) a.hide = true;
      S.appts.push({id:'mf', d:2, s:'14:00', m:30, p:'rojas', n:'Fuentes', tag:'Lista de espera', ag:true});
      S.kpi.recup++; S.kpi.citas++; S.fresh.recup = 1; S.fresh.citas = 1; S.fresh.mf = 1;
      patient({n:'Marcela Fuentes', next:'Mié 14 · 14:00', ch:'WhatsApp'});
      S.convos.unshift({id:'cmf', n:'Marcela Fuentes', ch:'WhatsApp', t:'Mié 14 08:09', pre:'Tomó el cupo liberado de las 14:00', fresh:true, steps:['Detectó el cupo liberado del Dr. Rojas','Notificó a la primera paciente de la lista de espera','Recibió la aceptación y reservó el miércoles 14 a las 14:00','Retiró a la paciente de la lista de espera']});
      feed('08:09', 'Cupo recuperado · <b>M. Fuentes</b> tomó Mié 14, 14:00');
      return {k:'Cupo recuperado', m:'Marcela Fuentes tomó la hora de las 14:00', view:'espera'};
    },
    urgent: function(){
      S.convos.unshift({id:'cur', n:'Jorge Lillo', ch:'WhatsApp', t:'Mié 14 21:20', pre:'Derivada a recepción', flag:true, fresh:true, steps:['Recibió una solicitud de atención humana','Informó el alcance administrativo del asistente','Registró la derivación para el equipo del centro','Informó que el centro estaba fuera de horario humano']});
      S.convSel = 'cur';
      feed('21:20', 'Solicitud derivada a recepción · <b>J. Lillo</b>', true);
      return {k:'Derivación humana · requiere atención', m:'J. Lillo fue derivado a recepción', view:'conv', al:true};
    },
    web: function(){
      S.appts.push({id:'il', d:5, s:'10:00', m:45, p:'mendez', n:'Lagos', tag:'Sitio web', ag:true});
      S.kpi.citas++; S.fresh.citas = 1; S.fresh.il = 1;
      patient({n:'Ignacio Lagos', rut:'19.204.***-3', last:'Nuevo', next:'Sáb 17 · 10:00', ch:'Sitio web'});
      S.convos.unshift({id:'cil', n:'Ignacio Lagos', ch:'Sitio web', t:'Sáb 10 21:42', pre:'Primera evaluación de ortodoncia', fresh:true, steps:['Respondió qué incluye la evaluación de ortodoncia','Ofreció horas del sábado de la Dra. Méndez','Registró los datos mínimos del paciente ficticio','Reservó el sábado 17 a las 10:00 y pasó la confirmación a WhatsApp']});
      feed('21:42', 'Paciente nuevo desde el sitio web · <b>I. Lagos</b> · Sáb 17, 10:00');
      return {k:'Nueva cita · sitio web', m:'Ignacio Lagos · Sáb 17, 10:00 · Dra. Méndez', view:'agenda'};
    }
  };

  /* ---------- Vistas ---------- */
  function head(k, title, right){ return '<div class="v-head"><div><div class="k">' + k + '</div><h4>' + title + '</h4></div>' + (right || '') + '</div>'; }
  function fr(key){ return S.fresh[key] ? ' fresh' : ''; }

  var BARS = [4,6,5,7,3,1,5,6,4,8,6,5,2,0];
  var V = {
    inicio: function(){
      var b = BARS.slice(); b[13] = (S.done.book?1:0) + (S.done.fill?1:0) + (S.done.web?1:0) + 2;
      var mx = Math.max.apply(null, b);
      var bars = b.map(function(v, i){ return '<div class="bar' + (i === 13 ? ' hl' : '') + '" data-v="' + v + '" data-h="' + Math.round(v / mx * 100) + '"></div>'; }).join('');
      var o = S.origin;
      var org = '<div class="stack"><span style="flex:' + o.wa + ';background:var(--brass)"></span>' + (o.web ? '<span style="flex:' + o.web + ';background:var(--bone)"></span>' : '') + '<span style="flex:' + o.rec + ';background:var(--faint)"></span></div>' +
        '<div class="lg"><span><i style="background:var(--brass)"></i>Agente · WhatsApp</span><b>' + o.wa + '%</b></div>' +
        (o.web ? '<div class="lg"><span><i style="background:var(--bone)"></i>Agente · sitio web</span><b>' + o.web + '%</b></div>' : '') +
        '<div class="lg"><span><i style="background:var(--faint)"></i>Recepción</span><b>' + o.rec + '%</b></div>' +
        '<div class="mini"><span>Recordatorios enviados</span><b>212</b></div><div class="mini" style="margin-top:0;border:0;padding-top:4px"><span>Asistencia confirmada</span><b>88%</b></div>';
      var fd = S.feed.map(function(f){ return '<li class="' + (f.al ? 'al' : '') + (f.fresh ? ' fresh' : '') + '"><time>' + f.t + '</time><span>' + f.h + '</span></li>'; }).join('');
      return head('Octubre · ciclo actual', 'Resumen de la clínica', '<span class="v-note">Actualizado en tiempo real</span>') +
        '<div class="kpis">' +
          '<div class="kpi hl' + fr('citas') + '"><div class="n">' + S.kpi.citas + '</div><div class="l">Citas agendadas<br>por el agente</div></div>' +
          '<div class="kpi' + fr('recup') + '"><div class="n">' + S.kpi.recup + '</div><div class="l">Cupos recuperados<br>por lista de espera</div></div>' +
          '<div class="kpi"><div class="n">' + S.kpi.resp + '</div><div class="l">Tiempo de<br>respuesta</div></div>' +
          '<div class="kpi"><div class="n">' + S.kpi.fuera + '%</div><div class="l">Conversaciones<br>fuera de horario</div></div>' +
        '</div>' +
        '<div class="g2"><div class="card"><h5><span>Citas del agente</span><span>14 días</span></h5><div class="bars">' + bars + '</div><div class="bars-x"><span>29 sep</span><span>Hoy</span></div></div>' +
        '<div class="card"><h5><span>Origen de las citas</span></h5>' + org + '</div></div>' +
        '<div class="card" style="margin-top:14px"><h5><span>Actividad reciente</span></h5><ul class="feed" style="margin-top:0">' + fd + '</ul></div>' +
        '<div class="demo-note">Ejemplo de uso · datos ficticios</div>';
    },
    agenda: function(){
      var chips = Object.keys(PROS).map(function(k){ return '<button class="chip' + (S.filter[k] ? ' on' : '') + '" data-f="' + k + '"><i style="border-color:' + COLORS[k] + '"></i>' + PROS[k].short + '</button>'; }).join('');
      var times = ''; for(var h = 9; h <= 17; h++) times += '<span style="top:' + ((h - 9) * 2 * PX) + 'px">' + (h < 10 ? '0' : '') + h + ':00</span>';
      var cols = DAYS.map(function(d, i){
        var html = '';
        S.blocks.filter(function(b){ return b.d === i; }).forEach(function(b){
          html += '<div class="slot blk" style="top:' + ((min(b.s) - 540) / 30 * PX) + 'px;height:' + (b.m / 30 * PX - 2) + 'px">' + b.t + '</div>';
        });
        S.appts.filter(function(a){ return a.d === i && !a.hide; }).forEach(function(a){
          var cls = 'slot p-' + a.p + (a.cx ? ' cx' : a.ag ? ' ag' : '') + (S.filter[a.p] ? '' : ' dim') + fr(a.id);
          html += '<div class="' + cls + '" title="' + PROS[a.p].name + '" style="top:' + ((min(a.s) - 540) / 30 * PX + 1) + 'px;height:' + (Math.max(a.m, 30) / 30 * PX - 2) + 'px"><b>' + a.s + '</b>' + a.n + (a.tag && a.m > 30 || a.tag && a.ag || a.cx ? '<span class="tg">' + a.tag + '</span>' : '') + '</div>';
        });
        return '<div class="cal-c">' + html + '</div>';
      }).join('');
      var hd = '<div class="cal-h"></div>' + DAYS.map(function(d, i){ return '<div class="cal-h' + (i === 2 ? ' today' : '') + '">' + d[0] + '<b>' + d[1] + '</b></div>'; }).join('');
      return head('Semana 12 – 17 octubre', 'Agenda', '<div class="chips">' + chips + '</div>') +
        '<div class="cal-wrap"><div class="cal">' + hd + '<div class="cal-t">' + times + '</div>' + cols + '</div></div>' +
        '<div class="cal-leg"><span><i style="background:rgba(194,146,79,.25);border-left:2px solid var(--brass)"></i>Creada por el agente</span><span><i style="background:var(--alert-a);border-left:2px solid var(--alert)"></i>Cancelada</span><span><i style="background:repeating-linear-gradient(135deg,rgba(232,228,220,.15) 0 2px,transparent 2px 4px)"></i>Bloqueo</span></div>';
    },
    pros: function(){
      var cards = Object.keys(PROS).map(function(k){
        var P = PROS[k];
        var n = S.appts.filter(function(a){ return a.p === k && !a.hide && !a.cx; }).length;
        var occ = Math.min(96, Math.round(n / 9 * 100));
        return '<div class="pro"><div class="top"><div class="av">' + P.ini + '</div><div><h6>' + P.name + '</h6><div class="sp">' + P.spec + '</div></div></div>' +
          '<dl><dt>Horario</dt><dd>' + P.hours + '</dd><dt>Colación</dt><dd>13:00–14:00</dd><dt>Bloqueos</dt><dd>' + P.block + '</dd>' +
          '<dt>Semana</dt><dd>' + n + ' citas<div class="meter"><i style="width:' + occ + '%"></i></div></dd></dl>' +
          '<button class="tgl" data-ag="' + k + '"><span>Agendable por el agente</span><span class="sw' + (S.agentOn[k] ? ' on' : '') + '"></span></button></div>';
      }).join('');
      return head('Equipo', 'Profesionales', '<span class="v-note">3 profesionales · 1 sede</span>') + '<div class="pros">' + cards + '</div>' +
        '<div class="rule">Horarios, colaciones y bloqueos definen lo que el agente puede ofrecer. Un cambio aquí rige desde la próxima conversación.</div>';
    },
    pac: function(){
      return head('Fichas', 'Pacientes', '<label class="search"><svg viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5"/><path d="M9.5 9.5L13 13"/></svg><input type="text" placeholder="Buscar paciente" value="' + S.q.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;') + '" data-q></label>') +
        '<table class="tbl"><thead><tr><th>Paciente</th><th class="hm">RUT</th><th class="hm">Última atención</th><th>Próxima cita</th><th>Canal</th></tr></thead><tbody data-rows>' + rows() + '</tbody></table>' +
        '<div class="rule">Los campos y la verificación se configuran según la necesidad de la operación. Esta tabla usa datos ficticios.</div>';
    },
    espera: function(){
      var flag = S.filled ? '<div class="flag ok">Cupo recuperado · M. Fuentes tomó Mié 14 · 14:00</div>' : S.freed ? '<div class="flag">Cupo liberado · ' + S.freed + '</div>' : '';
      var st = {wait:'<span class="pill br">En espera</span>', notif:'<span class="pill">Notificada · esperando respuesta</span>', ok:'<span class="pill ok">Hora confirmada</span>'};
      var r = S.wait.map(function(w, i){ return '<tr class="' + (w.fresh ? 'fresh' : '') + '"><td class="m">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</td><td><b>' + w.n + '</b></td><td>' + w.need + '</td><td class="m hm">' + w.since + '</td><td>' + st[w.st] + '</td></tr>'; }).join('');
      return head('Retención', 'Lista de espera', '<span class="v-note">' + S.wait.filter(function(w){ return w.st !== 'ok'; }).length + ' pacientes en cola</span>') + flag +
        '<table class="tbl"><thead><tr><th>#</th><th>Paciente</th><th>Necesita</th><th class="hm">Desde</th><th>Estado</th></tr></thead><tbody>' + r + '</tbody></table>' +
        '<div class="rule">En este ejemplo se ofrece el cupo por orden de llegada. La secuencia y los plazos se configuran para cada operación.</div>';
    },
    conv: function(){
      var list = S.convos.map(function(c){
        return '<button class="c-item' + (c.id === S.convSel ? ' on' : '') + (c.fresh ? ' fresh' : '') + '" data-c="' + c.id + '"><div class="r"><b>' + c.n + '</b><time>' + c.t + '</time></div><p>' + c.pre + '</p>' +
          (c.flag ? '<span class="pill al">Derivada</span>' : '<span class="pill">' + c.ch + '</span>') + '</button>';
      }).join('');
      var c = S.convos.filter(function(x){ return x.id === S.convSel; })[0] || S.convos[0];
      var det = '<h6>' + c.n + '</h6><div class="meta"><span>' + c.ch + '</span><span>' + c.t + '</span><span>Agente Sonrisas · versión 7</span></div><div class="k">Qué hizo el agente</div><ol class="steps">' +
        c.steps.map(function(s){ return '<li>' + s + '</li>'; }).join('') + '</ol>' +
        (c.flag ? '<div class="esc">Solicitud pendiente del equipo del centro. La atención humana depende de su horario.</div>' : '');
      return head('Historial', 'Conversaciones', '<span class="v-note">Explicadas en lenguaje simple</span>') + '<div class="conv"><div class="c-list">' + list + '</div><div class="c-det">' + det + '</div></div>';
    }
  };
  function rows(){
    var q = S.q.toLowerCase();
    return S.patients.filter(function(p){ return !q || p.n.toLowerCase().indexOf(q) > -1; }).map(function(p){
      return '<tr class="' + (p.fresh ? 'fresh' : '') + '"><td><b>' + p.n + '</b></td><td class="m hm">' + p.rut + '</td><td class="m hm">' + p.last + '</td><td class="m">' + p.next + '</td><td>' + p.ch + '</td></tr>';
    }).join('');
  }

  function render(){
    if(!content) return;
    content.innerHTML = '<div class="vw">' + V[S.view]() + '</div>';
    content.scrollTop = 0;
    root.querySelectorAll('.adm-nav').forEach(function(b){
      b.classList.toggle('on', b.dataset.v === S.view);
      var old = b.querySelector('.bd'); if(old) old.remove();
      var n = 0, al = false;
      if(b.dataset.v === 'espera') n = S.wait.filter(function(w){ return w.st !== 'ok'; }).length;
      if(b.dataset.v === 'conv'){ n = S.convos.filter(function(c){ return c.flag; }).length; al = true; }
      if(n){ var s = document.createElement('span'); s.className = 'bd' + (al ? ' al' : ''); s.textContent = n; b.appendChild(s); }
    });
    if(S.view === 'inicio') requestAnimationFrame(function(){ requestAnimationFrame(function(){
      content.querySelectorAll('.bar').forEach(function(b){ b.style.height = b.dataset.h + '%'; });
    }); });
    // las marcas "fresh" solo se animan una vez
    S.fresh = {};
    S.feed.forEach(function(f){ f.fresh = false; }); S.patients.forEach(function(p){ p.fresh = false; });
    S.wait.forEach(function(w){ w.fresh = false; }); S.convos.forEach(function(c){ c.fresh = false; });
  }

  function toast(k, m, al){
    if(!toastEl) return;
    toastEl.querySelector('.k').textContent = k; toastEl.querySelector('.m').textContent = m;
    toastEl.classList.toggle('al', !!al); toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function(){ toastEl.classList.remove('show'); }, 3600);
  }

  function mount(el){
    root = el; content = el.querySelector('.adm-content'); toastEl = el.querySelector('.toast');
    S = initial();
    el.querySelectorAll('.adm-nav').forEach(function(b){ b.addEventListener('click', function(){ show(b.dataset.v); if(api.onNav) api.onNav(b.dataset.v); }); });
    content.addEventListener('click', function(e){
      var f = e.target.closest('[data-f]'); if(f){ S.filter[f.dataset.f] = !S.filter[f.dataset.f]; render(); return; }
      var c = e.target.closest('[data-c]'); if(c){ S.convSel = c.dataset.c; render(); return; }
      var a = e.target.closest('[data-ag]');
      if(a){ var k = a.dataset.ag; S.agentOn[k] = !S.agentOn[k];
        a.querySelector('.sw').classList.toggle('on', S.agentOn[k]);
        feed('Ahora', PROS[k].name + (S.agentOn[k] ? ' vuelve a ser agendable por el agente' : ' deja de ser agendable por el agente'));
        toast('Configuración guardada', PROS[k].short + (S.agentOn[k] ? ': el agente vuelve a ofrecer sus horas' : ': el agente ya no ofrece sus horas'));
      }
    });
    content.addEventListener('input', function(e){ if(e.target.matches('[data-q]')){ S.q = e.target.value; content.querySelector('[data-rows]').innerHTML = rows(); } });
    render();
  }
  function show(v){ if(!S) return; S.view = v; render(); }
  function fire(name, o){
    o = o || {};
    if(!S || S.done[name]) return;
    S.done[name] = 1;
    var r = EV[name]();
    if(o.silent){ S.fresh = {}; return; }
    toast(r.k, r.m, r.al);
    if(o.follow !== false && r.view) S.view = r.view;
    render();
  }
  function reset(){ var v = S ? S.view : 'inicio'; S = initial(); S.view = v; render(); }
  var api = {mount:mount, show:show, fire:fire, reset:reset, state:function(){ return S; }, onNav:null};
  return api;
})();

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

  Admin.mount(document.querySelector('#adm .adm'));
  var wa = new Chat.Player(document.querySelector('#phone .phone'));
  var cap = document.getElementById('cap');
  var demo = new ArgusDemo({wa: wa, onScene: function(sc){
    document.querySelectorAll('#ctrl .sc[data-k]').forEach(function(b){ b.classList.toggle('on', b.dataset.k === sc.k); });
    cap.innerHTML = sc.k === 'stats' ? 'Resumen del mes en el panel' : 'WhatsApp del paciente · <b>' + sc.label + '</b>';
  }});
  // en este diseño el escenario web vive en su propia sección
  if(ARGUS_V2) ARGUS_SCN = ARGUS_SCN.filter(function(s){ return s.k !== 'web'; });

  var ctrl = document.getElementById('ctrl');
  ARGUS_SCN.forEach(function(sc){
    var b = document.createElement('button'); b.className = 'sc'; b.dataset.k = sc.k; b.textContent = sc.label;
    b.addEventListener('click', function(){ demo.stopTour(); demo.play(sc.k); });
    ctrl.appendChild(b);
  });
  var t = document.createElement('button'); t.className = 'sc tour'; t.textContent = 'Recorrer todo';
  t.addEventListener('click', function(){ demo.tour({loop:false}); });
  ctrl.appendChild(t); var stop = document.createElement('button'); stop.className='sc'; stop.textContent='Detener'; stop.addEventListener('click',function(){ demo.stopTour(); wa.stop(); }); ctrl.appendChild(stop); var reset = document.createElement('button'); reset.className='sc'; reset.textContent='Reiniciar'; reset.addEventListener('click',function(){demo.stopTour();wa.clear();Admin.reset();cap.textContent='WhatsApp del paciente · ejemplo ficticio';}); ctrl.appendChild(reset); wa.speed=2;
  Admin.onNav = function(){ demo.stopTour(); };

  // Demonstration starts only after an explicit action.

  // sitio web (versión con web)
  var host = document.getElementById('siteHost');
  if(host){
    var site = host.querySelector('.site');
    var wc = new Chat.Player(site.querySelector('.wc'));
    var scripts = argusScripts(function(ev){ Admin.fire(ev, {silent:true}); document.getElementById('siteAppt').classList.add('on'); });
    var played = false;
    function playWeb(){ if(played) return; played = true; wc.clear(); wc.play(scripts.web); }
    wireSite(site, playWeb);
    // The example opens on demand.
  }
})();
