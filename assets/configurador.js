/* Adicionales de planes: cada tarjeta muestra su total mensual y su pago inicial con los adicionales elegidos. CLP netos + IVA. */
(() => {
  'use strict';
  const ad = document.getElementById('ad');
  if (!ad) return;
  const clp = n => '$' + Math.round(n).toLocaleString('es-CL');
  const redondear = x => Math.ceil((x + 1000) / 10000) * 10000 - 1000;
  // Orden de tarjetas: Inicio, Emprendimiento, Pyme, Empresa.
  const PLANES = [149000, 279000, 499000, 899000];
  const IMPL = [150000, 300000, 300000, 300000];
  const WEB_MES = 19900, WEB_INI = 190000;
  const STD_MES = 25000, STD_INI = 250000;
  const MED_MES = 50000, MED_INI = 600000;
  const st = { web: false, std: 0, medida: 0 };
  const web = document.getElementById('ad-web');
  const max = { std: 10, medida: 10 };

  function render() {
    const addMes = (st.web ? WEB_MES : 0) + st.std * STD_MES + st.medida * MED_MES;
    const addIni = (st.web ? WEB_INI : 0) + st.std * STD_INI + st.medida * MED_INI;
    PLANES.forEach((base, i) => {
      const m = document.querySelector('[data-m="' + i + '"]');
      const n = document.querySelector('[data-i="' + i + '"]');
      if (m) m.textContent = clp(redondear(base + addMes));
      if (n) n.textContent = clp(IMPL[i] + addIni);
    });
    ['std', 'medida'].forEach(k => { const o = document.getElementById('ad-' + k); if (o) o.textContent = st[k]; });
  }

  web.addEventListener('change', () => { st.web = web.checked; render(); });
  ad.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k;
    st[k] = Math.min(max[k], Math.max(0, st[k] + (+b.dataset.d)));
    render();
  }));
  render();
})();
