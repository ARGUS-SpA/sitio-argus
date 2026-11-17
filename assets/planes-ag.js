/* Sección de planes ATLAS: configurador (vanilla JS). */
/* ============================================================
   ARGUS · Sección Planes — lógica (vanilla JS, sin dependencias)
   Toda la configuración comercial está en CONFIG.
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    volumenInicial: 1500,
    contratoInicial: 'anual',
    excedentePorAtencion: 500,
    maxEstandar: 3200,           // sobre esto → "plan a medida"
    planes: [
      { id: 'inicio',         nombre: 'Inicio',         precio: 149000, atenciones: 300,  pagoInicial: 150000 },
      { id: 'emprendimiento', nombre: 'Emprendimiento', precio: 279000, atenciones: 800,  pagoInicial: 300000 },
      { id: 'pyme',           nombre: 'Pyme',           precio: 499000, atenciones: 1600, pagoInicial: 300000 },
      { id: 'empresa',        nombre: 'Empresa',        precio: 899000, atenciones: 3200, pagoInicial: 300000 }
    ],
    // Beneficios no acumulables: cada forma de contratar tiene UNO.
    contratos: {
      anual:   { etiqueta: 'anual',    descuento: 0,   mesesDescuento: 0, puestaEnMarchaGratis: true  },
      seis:    { etiqueta: '6 meses',  descuento: 0.3, mesesDescuento: 3, puestaEnMarchaGratis: false },
      mensual: { etiqueta: 'mensual',  descuento: 0.2, mesesDescuento: 3, puestaEnMarchaGratis: false } // ⚠ CONFIRMAR con negocio
    }
  };

  var root = document.getElementById('ag-planes');
  if (!root) return;

  var state = { vol: CONFIG.volumenInicial, contrato: CONFIG.contratoInicial };
  var waNumber = (root.getAttribute('data-wa-number') || '').replace(/\D/g, '');
  var maxPPA = Math.max.apply(null, CONFIG.planes.map(function (p) { return p.precio / p.atenciones; }));

  function n(x) { return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function clp(x) { return '$' + n(x); }
  function $(sel, ctx) { return (ctx || root).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }
  function waHref(msg) { return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg); }

  function mejorPlan(vol) {
    var best = null;
    CONFIG.planes.forEach(function (p) {
      var extra = Math.max(0, vol - p.atenciones);
      var total = p.precio + extra * CONFIG.excedentePorAtencion;
      if (!best || total < best.total) best = { plan: p, total: total, extra: extra };
    });
    return best;
  }

  var range = $('#ag-vol');
  var segBtns = $all('[data-contract]');

  function render() {
    var c = CONFIG.contratos[state.contrato];
    var best = mejorPlan(state.vol);
    var aMedida = state.vol > CONFIG.maxEstandar;

    // Configurador
    $('[data-out="vol"]').textContent = n(state.vol);
    $('[data-out="volDay"]').textContent = n(state.vol / 30);
    range.value = state.vol;
    range.setAttribute('aria-valuetext', n(state.vol) + ' atenciones al mes');
    range.style.setProperty('--pct', ((state.vol - range.min) / (range.max - range.min) * 100) + '%');

    segBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-contract') === state.contrato ? 'true' : 'false');
    });

    $('[data-out="bestName"]').textContent = aMedida ? 'PLAN A MEDIDA' : best.plan.nombre.toUpperCase();
    $('[data-out="bestTotal"]').textContent = clp(best.total);
    $('[data-out="bestDetail"]').textContent = aMedida
      ? 'Sobre ' + n(CONFIG.maxEstandar) + ' atenciones, te conviene un plan a medida.'
      : (best.extra > 0
          ? 'Incluye ' + n(best.extra) + ' atenciones extra a ' + clp(CONFIG.excedentePorAtencion) + ' c/u.'
          : 'Tu volumen cabe completo en el plan.');
    var bestLink = $('[data-out-href="bestAnchor"]');
    bestLink.setAttribute('href', '#ag-plan-' + best.plan.id);

    // Tarjetas
    CONFIG.planes.forEach(function (p) {
      var card = $('[data-plan="' + p.id + '"]');
      if (!card) return;
      card.classList.toggle('is-featured', p.id === best.plan.id);

      var conDcto = c.descuento > 0;
      $('[data-f="kicker"]', card).textContent = conDcto
        ? 'PRIMEROS ' + c.mesesDescuento + ' MESES · −' + Math.round(c.descuento * 100) + '%'
        : 'MENSUALIDAD';
      $('[data-f="price"]', card).textContent = clp(p.precio * (1 - c.descuento));
      $('[data-f="after"]', card).textContent = conDcto ? 'Luego ' + clp(p.precio) + ' /mes + IVA' : '/mes + IVA';
      $('[data-f="ppa"]', card).textContent = clp(p.precio / p.atenciones);
      $('[data-f="meter"]', card).style.width = Math.round((p.precio / p.atenciones) / maxPPA * 100) + '%';

      $('[data-f="setup"]', card).innerHTML = c.puestaEnMarchaGratis
        ? '<span class="ag-strike">' + clp(p.pagoInicial) + '</span><span class="ag-free">$0</span>'
        : clp(p.pagoInicial) + ' + IVA';

      var cta = $('[data-f="cta"]', card);
      if (waNumber) {
        cta.href = waHref('Hola, quiero el plan ' + p.nombre + ' de ATLAS (contrato ' + c.etiqueta + ').');
        cta.target = '_blank';
        cta.rel = 'noopener';
      }
    });

    var custom = $('[data-f-custom]');
    if (custom && waNumber) {
      custom.href = waHref('Hola, necesito un plan a medida de ATLAS para unas ' + n(state.vol) + ' atenciones al mes.');
      custom.target = '_blank';
      custom.rel = 'noopener';
    }
  }

  range.addEventListener('input', function () { state.vol = Number(range.value); render(); });
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () { state.contrato = b.getAttribute('data-contract'); render(); });
  });

  render();
})();
