/* Navigation, local contact events, and aggregate production web analytics. */
(() => {
  'use strict';
  // Keep local development and Vercel previews out of commercial-site reports.
  // This public beacon token is not an API credential. No contact event is sent.
  if (location.protocol === 'https:' && location.hostname === 'www.argus.cl' && navigator.doNotTrack !== '1') {
    const analytics = document.createElement('script');
    analytics.type = 'module';
    analytics.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    analytics.dataset.cfBeacon = JSON.stringify({token:'701a1a6b71ba4bd782c9b3b6f9c4c299'});
    document.head.appendChild(analytics);
  }
  const button = document.querySelector('.menu-toggle');
  const menu = document.getElementById('main-nav');
  function closeMenu() { if (!button || !menu) return; menu.classList.remove('open'); button.setAttribute('aria-expanded','false'); }
  button?.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded',String(open)); menu.classList.toggle('open',open); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('open')) { closeMenu(); button.focus(); } });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('click', e => { if (menu?.classList.contains('open') && !e.target.closest('.masthead')) closeMenu(); });
  /* A future approved measurement adapter can subscribe to argus:contact.
     This event counts a click, not a lead or a conversion. */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-contact]'); if (!link) return;
    document.dispatchEvent(new CustomEvent('argus:contact',{detail:{channel:link.dataset.contact,placement:link.dataset.placement,page:location.pathname}}));
  });
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const promotion = document.querySelector('[data-promotion-end]');
  if (promotion && today > promotion.dataset.promotionEnd) promotion.classList.add('expired');
  // Panel tour tabs (portada): roving tabindex and arrow keys.
  const tablist = document.querySelector('.panel-tabs');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const select = tab => tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; const pane = document.getElementById(t.getAttribute('aria-controls')); if (pane) pane.hidden = !on; });
    tabs.forEach(t => t.addEventListener('click', () => select(t)));
    tablist.addEventListener('keydown', e => { const i = tabs.indexOf(document.activeElement); if (i < 0) return; let n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length; else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i + tabs.length - 1) % tabs.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); tabs[n].focus(); select(tabs[n]); } });
  }
  // Mobile call-to-action bar: appears after the first screen, hides near contact and footer.
  if (!document.body.classList.contains('demo-page')) {
    const wa = 'https://wa.me/56993477920?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20ATLAS%20y%20coordinar%20una%20demo.';
    const bar = document.createElement('div'); bar.className = 'mobile-cta'; bar.setAttribute('aria-label', 'Acciones rápidas');
    bar.innerHTML = '<a class="button" href="' + wa + '" target="_blank" rel="noopener" data-contact="whatsapp" data-placement="barra_movil">Coordinar demo</a><a class="button secondary" href="demo.html">Ver la demo</a>';
    document.body.appendChild(bar); document.body.classList.add('has-mobile-cta');
    const blockers = [document.getElementById('contacto'), document.querySelector('.footer')].filter(Boolean);
    const visible = new Set();
    const update = () => { bar.classList.toggle('show', window.scrollY > 520 && visible.size === 0); };
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { es.forEach(en => en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)); update(); }); blockers.forEach(b => io.observe(b)); }
    window.addEventListener('scroll', update, {passive: true}); update();
  }

  if (/\/(?:index\.html)?$/.test(location.pathname)) {
    const redirects = {'#beneficios':'demo.html#atlas','#sitio':'web.html','#demo':'demo.html#demo','#nosotros':'nosotros.html'};
    if (redirects[location.hash]) location.replace(redirects[location.hash]);
  }
})();
