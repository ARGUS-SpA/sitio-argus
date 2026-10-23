/* Theme preference is local to this browser. */
(() => {
  let saved = 'dark';
  try { saved = localStorage.getItem('argus-theme') || 'dark'; } catch (_) {}
  function apply(value) {
    if (value === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = value === 'light' ? 'light' : 'dark';
  }
  apply(saved);
  document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.footer-bottom') || document.querySelector('footer');
    if (!target) return;
    const label = document.createElement('label'); label.className = 'theme-control';
    const select = document.createElement('select'); select.setAttribute('aria-label','Tema de apariencia');
    [['dark','Oscuro'],['light','Claro'],['system','Sistema']].forEach(([value,text]) => { const option = document.createElement('option'); option.value=value; option.textContent=text; select.append(option); });
    label.append('Apariencia',select); target.append(label); select.value=saved;
    select.addEventListener('change',()=>{apply(select.value);try{localStorage.setItem('argus-theme',select.value);}catch(_){}});
  });
})();

// Accessible selection and arrow-key movement in demo button groups.
document.addEventListener('DOMContentLoaded', () => {
  const sync = () => document.querySelectorAll('.adm-nav,.c-item,.sc').forEach(button => {
    if (button.classList.contains('on')) button.setAttribute('aria-current','true');
    else button.removeAttribute('aria-current');
  });
  sync();
  const panel=document.querySelector('.adm');
  if(panel)new MutationObserver(sync).observe(panel,{childList:true,subtree:true});
  document.addEventListener('click',event=>{if(event.target.closest('.sc,.adm-nav,.c-item'))setTimeout(sync,0);});
  document.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(event.key))return;
    const group=event.target.closest('.ctrl,.adm-side,.c-list');if(!group)return;
    const buttons=[...group.querySelectorAll('button')];const index=buttons.indexOf(event.target);if(index<0)return;
    event.preventDefault();buttons[(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:buttons.length-1))%buttons.length].focus();
  });
});
