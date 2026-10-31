// Адаптивное меню: доступно мышью, касанием и клавиатурой.
(() => {
 const button = document.getElementById('menu-toggle');
 const nav = document.getElementById('primary-navigation');
 if (!button || !nav) return;
 const mobile = window.matchMedia('(max-width: 767px)');
 const close = () => {button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Открыть меню');nav.classList.remove('site-nav--open');};
 button.addEventListener('click', () => {
  const opening = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded',String(opening));
  button.setAttribute('aria-label',opening?'Закрыть меню':'Открыть меню');
  nav.classList.toggle('site-nav--open',opening);
 });
 nav.addEventListener('click', e => {if(e.target.closest('a') && mobile.matches) close();});
 document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('site-nav--open')) {close();button.focus();}});
 document.addEventListener('click',e => {if(mobile.matches && !nav.contains(e.target) && !button.contains(e.target)) close();});
 mobile.addEventListener('change',close);
})();
