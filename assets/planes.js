/* Planes: selector móvil de plan y configurador "Arme su plan". Valores en CLP netos + IVA. */
(() => {
  'use strict';
  const PLANES = {
    A: { nombre: 'Asistente', mes: 159000, inicial: 300000, descontable: 300000 },
    B: { nombre: 'Conectado', mes: 479000, inicial: 900000, descontable: 900000 },
    C: { nombre: 'Conectado + web', mes: 498900, inicial: 1215000, descontable: 900000 } // web y dominio sin descuento
  };
  const EXTRAS = { campanas: { mes: 190000, inicial: 150000 }, webPlanA: { mes: 19900, inicial: 315000 } };
  const clp = n => '$' + Math.round(n).toLocaleString('es-CL');
  const $ = id => document.getElementById(id);

  // Selector de plan en móvil (una tarjeta visible) y botón fijo inferior.
  const seg = [...document.querySelectorAll('.plan-seg [role=tab]')];
  const cards = [...document.querySelectorAll('.plan-card')];
  const syncMobileCta = card => {
    const bar = document.querySelector('.mobile-cta .button:not(.secondary)');
    const link = card?.querySelector('a.button');
    if (bar && link) { bar.textContent = link.textContent; bar.href = link.href; }
  };
  const pick = i => {
    seg.forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
    cards.forEach((c, j) => c.classList.toggle('on', j === i));
    syncMobileCta(cards[i]);
  };
  seg.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  if (seg.length) window.addEventListener('load', () => pick(seg.findIndex(b => b.getAttribute('aria-selected') === 'true')));

  // Configurador.
  const root = $('arme');
  if (!root) return;
  const state = { plan: 'B', camp: false, web: false, anual: true };
  const radios = [...root.querySelectorAll('[role=radio]')];
  const sw = { camp: $('cfg-camp'), web: $('cfg-web'), anual: $('cfg-anual') };

  function render() {
    const p = PLANES[state.plan];
    const webOn = state.plan === 'C' || (state.plan === 'A' && state.web);
    radios.forEach(r => r.setAttribute('aria-checked', String(r.dataset.plan === state.plan)));
    sw.camp.setAttribute('aria-checked', String(state.camp));
    sw.web.setAttribute('aria-checked', String(webOn));
    sw.web.setAttribute('aria-disabled', String(state.plan === 'C'));
    sw.anual.setAttribute('aria-checked', String(state.anual));
    $('cfg-web-p').textContent = state.plan === 'A' ? '+ $290.000 y dominio $25.000 · $19.900/mes'
      : state.plan === 'C' ? 'Incluida en el plan C' : 'Para sumar la web, elija el plan C';

    let mes = p.mes, ini = p.inicial;
    if (state.plan === 'A' && state.web) { mes += EXTRAS.webPlanA.mes; ini += EXTRAS.webPlanA.inicial; }
    if (state.camp) { mes += EXTRAS.campanas.mes; ini += EXTRAS.campanas.inicial; }
    const ahorro = state.anual ? p.descontable * 0.5 : 0;
    ini -= ahorro;

    const partes = ['Plan ' + state.plan + ' · ' + p.nombre];
    if (state.plan === 'A' && state.web) partes.push('web');
    if (state.camp) partes.push('campañas');
    partes.push(state.anual ? 'contrato anual' : 'contrato mensual');
    const resumen = partes.join(' + ');
    $('cfg-res').textContent = resumen;
    $('cfg-mes').textContent = clp(mes);
    $('cfg-ini').textContent = clp(ini);
    $('cfg-save').textContent = ahorro ? 'Ahorra ' + clp(ahorro) + ' con el contrato anual' : '';
    $('cfg-cta').href = 'https://hablemos.argus.cl?texto=' + encodeURIComponent('Hola, quiero conversar sobre: ' + resumen + ' (' + clp(mes) + '/mes, pago inicial ' + clp(ini) + ', + IVA)');
  }

  radios.forEach(r => r.addEventListener('click', () => { state.plan = r.dataset.plan; if (state.plan !== 'A') state.web = false; render(); }));
  root.querySelector('[role=radiogroup]').addEventListener('keydown', e => {
    const i = radios.indexOf(document.activeElement); if (i < 0) return;
    const n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : null;
    if (n === null) return; e.preventDefault();
    const r = radios[(n + radios.length) % radios.length]; r.focus(); r.click();
  });
  sw.camp.addEventListener('click', () => { state.camp = !state.camp; render(); });
  sw.anual.addEventListener('click', () => { state.anual = !state.anual; render(); });
  sw.web.addEventListener('click', () => {
    if (state.plan === 'A') state.web = !state.web;
    else if (state.plan === 'B') state.plan = 'C';
    render();
  });
  render();
})();
