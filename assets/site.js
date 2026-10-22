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
  if (/\/(?:index\.html)?$/.test(location.pathname)) {
    const redirects = {'#beneficios':'atlas.html','#sitio':'web.html','#demo':'demo.html#demo','#nosotros':'nosotros.html'};
    if (redirects[location.hash]) location.replace(redirects[location.hash]);
  }
})();
