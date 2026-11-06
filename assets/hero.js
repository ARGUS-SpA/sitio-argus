/* Hero de portada: conversación en bucle. Con prefers-reduced-motion se muestra completa y quieta. */
(() => {
  'use strict';
  const hero = document.querySelector('.hx');
  if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const msgs = [...hero.querySelectorAll('.hx-m')];
  const typing = hero.querySelector('.hx-typing');
  const card = hero.querySelector('.hx-card');
  const box = hero.querySelector('.hx-msgs');
  hero.classList.add('is-anim');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(hero);
  const waitVisible = async () => { while (!visible || document.hidden) await sleep(400); };
  async function loop() {
    for (;;) {
      msgs.forEach(m => m.classList.remove('show')); card.classList.remove('show'); typing.classList.remove('show');
      await sleep(900);
      for (const m of msgs) {
        await waitVisible();
        if (m.classList.contains('a')) {
          box.insertBefore(typing, m); typing.classList.add('show');
          await sleep(1100);
          typing.classList.remove('show');
        } else {
          await sleep(800);
        }
        m.classList.add('show');
      }
      await sleep(500);
      card.classList.add('show');
      await sleep(7000);
    }
  }
  loop();
})();
