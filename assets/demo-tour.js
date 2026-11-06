/* ARGUS · Demo guiada de ATLAS. Datos ficticios; no envía mensajes.
   Las situaciones y las filas de la agenda salen del perfil de rubro (assets/demo-rubros.js). */
(() => {
  'use strict';
  const root = document.getElementById('demo');
  if (!root || !document.getElementById('tourTabs')) return;
  const PF = window.ARGUS_PERFIL;
  if (!PF) return;

  const S = PF.tour;
  const BASE = PF.base;
  const NAV = [['inicio', 'Inicio'], ['agenda', 'Agenda'], ['espera', 'Lista de espera'], ['bandeja', 'Bandeja'], ['pacientes', 'Clientes']];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = n => String(n).padStart(2, '0');

  const tabs = $('tourTabs');
  S.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'tour-scn'; b.setAttribute('role', 'tab'); b.id = 'tour-tab-' + i;
    b.setAttribute('aria-controls', 'tourPanel');
    b.innerHTML = '<span class="n">' + pad(i + 1) + '</span><b>' + esc(s.name) + '</b><span class="h">' + esc(s.hint) + '</span>';
    b.addEventListener('click', () => { stopTour(); select(i); paint(); });
    tabs.appendChild(b);
  });
  tabs.addEventListener('keydown', e => {
    const list = [...tabs.children]; const i = list.indexOf(document.activeElement); if (i < 0) return;
    let n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % list.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + list.length - 1) % list.length;
    else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = list.length - 1;
    if (n !== null) { e.preventDefault(); stopTour(); list[n].focus(); select(n); paint(); }
  });

  let cur = -1, run = 0, tourTimer = null;
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  function renderPanel(i) {
    const c = S[i];
    $('tourNav').innerHTML = NAV.map(([k, l]) => '<span class="' + (k === c.nav ? 'on' : '') + '">' + l + (k === 'bandeja' && c.bandeja ? '<i>1</i>' : '') + '</span>').join('');
    const ev = $('tourEvent'); ev.className = 'tour-event t-' + c.tone; ev.classList.remove('in');
    $('tourEventT').textContent = c.event; $('tourEventS').textContent = c.eventSub;
    if (c.bandeja) {
      const b = c.bandeja;
      $('tourView').innerHTML = '<div class="tour-vh"><h2>Bandeja</h2><span>Por atender · 1</span></div><article class="tour-inbox"><div><b>' + esc(b.who) + '</b><small>' + esc(b.meta) + '</small></div><p><b>Resumen del agente:</b> ' + esc(b.res) + '</p><div class="acts"><span class="p">Tomar conversación</span><span>Agendar hora</span><span>Devolver al agente</span></div></article><p class="tour-fine">Fuera del horario de su equipo, la conversación queda pendiente en la bandeja.</p>';
    } else {
      const rows = BASE.map(([time, who, what, pill]) => {
        const hit = time === c.hl;
        if (hit) { who = c.hlWho; what = c.hlWhat; pill = c.hlPill; }
        const free = who === 'Disponible';
        return '<li class="' + (hit ? 'hit t-' + c.tone : free ? 'free' : '') + '"><time>' + time + '</time><span><b>' + esc(who) + '</b><small>' + esc(what) + '</small></span><em>' + esc(pill) + '</em></li>';
      }).join('');
      $('tourView').innerHTML = '<div class="tour-vh"><h2>' + c.day + '</h2><span>' + esc(PF.personas) + '</span></div><ul class="tour-rows">' + rows + '</ul>';
    }
  }

  async function playMsgs(i, token, instant) {
    const box = $('tourMsgs'); box.innerHTML = '';
    const wait = ms => instant ? Promise.resolve() : sleep(ms);
    for (const [who, text, time] of S[i].msgs) {
      if (token !== run) return;
      if (who === 'a' && !reduce && !instant) {
        const t = document.createElement('div'); t.className = 'tour-typing'; t.innerHTML = '<i></i><i></i><i></i>'; box.appendChild(t);
        await wait(650); t.remove(); if (token !== run) return;
      }
      const p = document.createElement('p'); p.className = who === 'a' ? 'a' : 'u';
      p.innerHTML = (who === 'a' ? '<b>Agente ATLAS</b>' : '') + esc(text) + '<time>' + time + '</time>';
      box.appendChild(p);
      await wait(who === 'a' ? 500 : 650);
    }
    if (token === run) $('tourEvent').classList.add('in');
  }

  function select(i, instant) {
    cur = i; run++;
    [...tabs.children].forEach((b, k) => { const on = k === i; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    $('tourPanel').setAttribute('aria-labelledby', 'tour-tab-' + i);
    $('tourNum').textContent = pad(i + 1) + ' DE ' + pad(S.length);
    $('tourStory').textContent = S[i].story; $('tourResult').textContent = S[i].result;
    $('tourClock').textContent = S[i].clock;
    renderPanel(i);
    return playMsgs(i, run, instant);
  }

  // Recorrido guiado: reproducir, pausar al instante, continuar y volver a ver.
  const playBtn = $('tourPlay'); const label = playBtn.querySelector('span');
  const icon = playBtn.querySelector('svg');
  const PLAY = '<path d="M5 3.5v13l11-6.5z"/>', PAUSE = '<path d="M5.5 3.5h3v13h-3zM11.5 3.5h3v13h-3z"/>', AGAIN = '<path d="M4 10a6 6 0 1 0 2-4.5M4 3.5v3h3" fill="none" stroke="currentColor" stroke-width="1.6"/>';
  const bar = $('tourProgress');
  let mode = 'idle', tourId = null;
  function paint() {
    const txt = { idle: 'Ver recorrido completo · 30 s', playing: 'Pausar recorrido', paused: 'Continuar recorrido', done: 'Ver de nuevo' }[mode];
    label.textContent = txt; icon.innerHTML = mode === 'playing' ? PAUSE : mode === 'done' ? AGAIN : PLAY;
    playBtn.setAttribute('aria-pressed', String(mode === 'playing'));
    root.classList.toggle('touring', mode === 'playing' || mode === 'paused');
    if (bar) bar.style.width = ((cur + 1) / S.length * 100) + '%';
    const cta = root.querySelector('.tour-cta'); if (cta) cta.classList.toggle('lit', mode === 'done');
  }
  function stopTour() { tourId = null; if (mode !== 'idle') { mode = 'idle'; paint(); } }
  function pause() { tourId = null; mode = 'paused'; select(cur, true); paint(); }
  async function tour(from) {
    const id = {}; tourId = id; mode = 'playing';
    for (let i = from; i < S.length; i++) {
      if (tourId !== id) return;
      const p = select(i); paint(); await p;
      if (tourId !== id) return;
      await sleep(i === S.length - 1 ? 1200 : 2600);
    }
    if (tourId === id) { tourId = null; mode = 'done'; paint(); }
  }
  playBtn.addEventListener('click', () => {
    if (mode === 'playing') pause();
    else if (mode === 'paused') tour(cur);
    else tour(0);
  });
  $('tourReset').addEventListener('click', () => { stopTour(); select(0, true); paint(); });
  paint();

  // Abre con la primera situación ya completa para que nunca se vea vacía.
  // Enlaces directos desde la portada: demo.html#agendar, #recordatorio, #cancelacion, #lista-de-espera, #equipo.
  const HASH = { agendar: 0, recordatorio: 1, cancelacion: 2, 'lista-de-espera': 3, equipo: 4 };
  const fromHash = () => HASH[location.hash.slice(1)];
  const start = fromHash();
  if (start !== undefined) { select(start); requestAnimationFrame(() => root.scrollIntoView({ block: 'start' })); }
  else select(0, true);
  window.addEventListener('hashchange', () => { const i = fromHash(); if (i !== undefined) { stopTour(); select(i); root.scrollIntoView({ block: 'start' }); } });
})();
