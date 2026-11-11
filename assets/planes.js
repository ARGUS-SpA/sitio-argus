/* Planes y calculadora de ATLAS. Valores en CLP netos + IVA.
   Atención = cliente atendido en 24 h, con hasta 12 respuestas. */
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
  if (seg.length) pick(1);

  // Tramos de volumen: cada tramo cobra solo lo que cae dentro de él.
  const PLANES = [
    { n: 'Emprendimiento', atenciones: 800, mes: 299000 },
    { n: 'Pyme', atenciones: 1600, mes: 539000, rec: true },
    { n: 'Empresa', atenciones: 3200, mes: 959000 }
  ];
  function volumen(n) {
    if (n <= 400) return 179000;               // plan mínimo de 400 atenciones
    if (n <= 800) return 299000;
    if (n <= 1600) return 299000 + 300 * (n - 800);
    if (n <= 3200) return 539000 + 262.5 * (n - 1600);
    return 959000 + 230 * (n - 3200);
  }
  // Redondeo hacia arriba para que el valor termine en $9.000.
  const redondear = x => Math.ceil((x + 1000) / 10000) * 10000 - 1000;

  const conv = $('c-att'), min = $('c-min'), integ = $('c-integ'),
        web = $('c-web'), camp = $('c-camp');
  if (!conv) return;

  function calc() {
    const n = +conv.value, m = +min.value;
    const ni = Math.max(0, +integ.value || 0),
          nc = Math.max(0, +camp.value || 0);
    const wOn = web.checked;

    const vol = volumen(n);
    const mes = vol + ni * 50000 + (wOn ? 19900 : 0) + nc * 149000;
    const ini = 300000 + ni * 600000 + (wOn ? 315000 : 0);

    $('c-att-v').textContent = n.toLocaleString('es-CL');
    $('c-min-v').textContent = m;
    $('c-h').textContent = Math.round(n * m / 60).toLocaleString('es-CL');
    $('c-mes').textContent = clp(redondear(mes));
    $('c-ini').textContent = clp(ini);
    $('c-unit').textContent = clp(vol / n);

    // Plan sugerido: si el volumen queda a menos de 10 % de un plan estándar y no hay extras.
    const cerca = PLANES.find(p => Math.abs(n - p.atenciones) / p.atenciones <= 0.10);
    const solo = ni + nc === 0 && !wOn;
    if (cerca && solo) {
      $('c-plan').textContent = cerca.n + (cerca.rec ? ' · recomendado' : '');
      $('c-plan-d').textContent = 'Su volumen está cerca de este plan estándar: le conviene el plan publicado, con ' + clp(cerca.mes) + ' al mes.';
    } else {
      $('c-plan').textContent = 'Cotización a medida';
      $('c-plan-d').textContent = 'Según el volumen y la configuración que elija. Conversemos la propuesta.';
    }

    $('c-cta').href = 'https://hablemos.argus.cl?texto=' + encodeURIComponent(
      'Hola, quiero conversar sobre ' + n + ' atenciones al mes, ' + clp(redondear(mes)) + ' al mes + IVA');
  }
  [conv, min, integ, camp, web].forEach(el => el.addEventListener('input', calc));
  calc();
})();
