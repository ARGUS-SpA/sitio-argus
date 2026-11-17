/* Planes y calculadora de ATLAS. Valores en CLP netos + IVA.
   Atención = cliente atendido en 24 h, con hasta 12 respuestas del agente. */
(() => {
  'use strict';
  const clp = n => '$' + Math.round(n).toLocaleString('es-CL');
  const $ = id => document.getElementById(id);

  // Selector de plan en móvil (una tarjeta visible a la vez).
  const seg = [...document.querySelectorAll('.plan-seg [role=tab]')];
  const cards = [...document.querySelectorAll('.plan-card')];
  const pick = i => {
    seg.forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
    cards.forEach((c, j) => c.classList.toggle('on', j === i));
  };
  seg.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  if (seg.length) pick(2);

  // Planes: atenciones incluidas, mensualidad y pago inicial de implementación del agente.
  const PLANES = [
    { n: 'Inicio', atenciones: 300, mes: 149000, impl: 150000 },
    { n: 'Emprendimiento', atenciones: 800, mes: 279000, impl: 300000 },
    { n: 'Pyme', atenciones: 1600, mes: 499000, impl: 300000, rec: true },
    { n: 'Empresa', atenciones: 3200, mes: 899000, impl: 300000 }
  ];
  // Cada atención sobre el plan cuesta $500 + IVA. Se elige el plan que resulte más barato.
  const EXCEDENTE = 500;
  const WEB_MES = 19900, WEB_INI = 190000;
  const STD_MES = 25000, STD_INI = 250000;
  const MED_MES = 50000, MED_INI = 600000;

  function mejorPlan(n) {
    return PLANES
      .map(p => ({ p, costo: p.mes + Math.max(0, n - p.atenciones) * EXCEDENTE }))
      .reduce((a, b) => (b.costo < a.costo ? b : a));
  }
  // Redondeo hacia arriba para que el valor termine en $9.000.
  const redondear = x => Math.ceil((x + 1000) / 10000) * 10000 - 1000;

  const conv = $('c-att'), min = $('c-min'), integ = $('c-integ'),
        medida = $('c-medida'), web = $('c-web');
  if (!conv) return;

  function calc() {
    const n = +conv.value, m = +min.value;
    const nStd = Math.max(0, +integ.value || 0),
          nMed = Math.max(0, +medida.value || 0),
          wOn = web.checked;

    const { p, costo } = mejorPlan(n);
    const mes = costo + nStd * STD_MES + nMed * MED_MES + (wOn ? WEB_MES : 0);
    const ini = p.impl + nStd * STD_INI + nMed * MED_INI + (wOn ? WEB_INI : 0);

    $('c-att-v').textContent = n.toLocaleString('es-CL');
    $('c-min-v').textContent = m;
    $('c-h').textContent = Math.round(n * m / 60).toLocaleString('es-CL');
    $('c-mes').textContent = clp(redondear(mes));
    $('c-ini').textContent = clp(ini);
    $('c-unit').textContent = clp(costo / n);

    $('c-plan').textContent = p.n + (p.rec ? ' · recomendado' : '');
    const extra = n > p.atenciones
      ? ' Las ' + (n - p.atenciones).toLocaleString('es-CL') + ' atenciones extra suman $500 + IVA cada una.'
      : '';
    $('c-plan-d').textContent = 'Incluye hasta ' + p.atenciones.toLocaleString('es-CL') +
      ' atenciones al mes, por ' + clp(p.mes) + ' + IVA.' + extra;

    $('c-cta').href = 'https://hablemos.argus.cl?texto=' + encodeURIComponent(
      'Hola, quiero conversar sobre ' + n + ' atenciones al mes, ' + clp(redondear(mes)) + ' al mes + IVA');
  }
  [conv, min, integ, medida, web].forEach(el => {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });
  calc();
})();
