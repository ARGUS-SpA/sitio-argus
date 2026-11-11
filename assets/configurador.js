/* Configurador "Arme su plan". Valores en CLP netos + IVA; el total se redondea hacia arriba para terminar en $9.000. */
(() => {
  'use strict';
  const root = document.getElementById('cfg');
  if (!root) return;
  const clp = n => '$' + Math.round(n).toLocaleString('es-CL');
  const PLANES = [
    { n: 'Emprendimiento', mes: 299000 },
    { n: 'Pyme', mes: 539000 },
    { n: 'Empresa', mes: 959000 }
  ];
  const IMPL = 300000, WEB_INI = 315000, INTEG_INI = 600000;
  const redondear = x => Math.ceil((x + 1000) / 10000) * 10000 - 1000;

  const st = { plan: 1, web: false, integ: 0, horas: 0, camp: 0, num: 0 };
  const radios = [...root.querySelectorAll('[role=radio]')];
  const web = document.getElementById('cfg-web');
  const outs = { integ: 'cfg-integ-v', horas: 'cfg-horas-v', camp: 'cfg-camp-v', num: 'cfg-num-v' };

  function render() {
    radios.forEach((r, i) => r.setAttribute('aria-checked', String(i === st.plan)));
    const p = PLANES[st.plan];
    const mes = p.mes + (st.web ? 19900 : 0) + st.integ * 50000 + st.horas * 35000 + st.camp * 149000 + st.num * 49000;
    const ini = IMPL + (st.web ? WEB_INI : 0) + st.integ * INTEG_INI;
    const extras = [];
    if (st.web) extras.push('web');
    if (st.integ) extras.push(st.integ + (st.integ > 1 ? ' integraciones' : ' integración'));
    if (st.horas) extras.push(st.horas + (st.horas > 1 ? ' h de ajuste' : ' h de ajuste'));
    if (st.camp) extras.push(st.camp + ' × 1.000 envíos');
    if (st.num) extras.push(st.num + (st.num > 1 ? ' números' : ' número'));
    document.getElementById('cfg-mes').textContent = clp(redondear(mes));
    document.getElementById('cfg-ini').textContent = clp(ini);
    document.getElementById('cfg-res').textContent = p.n + (extras.length ? ' + ' + extras.join(' + ') : ' · sin adicionales');
    Object.keys(outs).forEach(k => { document.getElementById(outs[k]).textContent = st[k]; });
    document.getElementById('cfg-cta').href = 'https://hablemos.argus.cl?texto=' + encodeURIComponent(
      'Hola, quiero conversar sobre: ' + p.n + (extras.length ? ' + ' + extras.join(' + ') : '') + ' (' + clp(redondear(mes)) + '/mes, pago inicial ' + clp(ini) + ', + IVA)');
  }

  radios.forEach((r, i) => r.addEventListener('click', () => { st.plan = i; render(); }));
  radios.forEach((r, i) => r.addEventListener('keydown', e => {
    const n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : null;
    if (n === null) return; e.preventDefault();
    const t = radios[(n + radios.length) % radios.length]; t.focus(); t.click();
  }));
  web.addEventListener('change', () => { st.web = web.checked; render(); });
  root.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k, d = +b.dataset.d;
    const max = k === 'integ' ? 10 : k === 'camp' ? 50 : k === 'num' ? 10 : 20;
    st[k] = Math.min(max, Math.max(0, st[k] + d)); render();
  }));
  render();
})();
