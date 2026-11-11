/* Adicionales de planes: cada tarjeta muestra su total mensual y su pago inicial con los adicionales elegidos. CLP netos + IVA. */
(() => {
  'use strict';
  const ad = document.getElementById('ad');
  if (!ad) return;
  const clp = n => '$' + Math.round(n).toLocaleString('es-CL');
  const redondear = x => Math.ceil((x + 1000) / 10000) * 10000 - 1000;
  const PLANES = [299000, 539000, 959000];
  const IMPL = 300000, WEB_INI = 315000, INTEG_INI = 600000;
  const st = { web: false, integ: 0, camp: 0, num: 0 };
  const web = document.getElementById('ad-web');
  const max = { integ: 10, camp: 50, num: 10 };

  function render() {
    const addMes = (st.web ? 19900 : 0) + st.integ * 50000 + st.camp * 149000 + st.num * 49000;
    const addIni = (st.web ? WEB_INI : 0) + st.integ * INTEG_INI;
    PLANES.forEach((base, i) => {
      const m = document.querySelector('[data-m="' + i + '"]');
      const n = document.querySelector('[data-i="' + i + '"]');
      if (m) m.textContent = clp(redondear(base + addMes));
      if (n) n.textContent = clp(IMPL + addIni);
    });
    ['integ', 'camp', 'num'].forEach(k => { const o = document.getElementById('ad-' + k); if (o) o.textContent = st[k]; });
  }

  web.addEventListener('change', () => { st.web = web.checked; render(); });
  ad.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k;
    st[k] = Math.min(max[k], Math.max(0, st[k] + (+b.dataset.d)));
    render();
  }));
  render();
})();
