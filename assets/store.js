const params = new URLSearchParams(location.search);
const tracked = ['utm_source','utm_medium','utm_campaign','utm_content'];
tracked.forEach(k => {
  const v = params.get(k);
  if (v) localStorage.setItem('yjs_' + k, v);
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  if (id.length > 1) {
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  }
}));
document.querySelectorAll('a[href*="checkout.html"]').forEach(a => {
  const u = new URL(a.href, location.href);
  tracked.forEach(k => {
    const v = localStorage.getItem('yjs_' + k);
    if (v) u.searchParams.set(k, v);
  });
  a.href = u.toString();
});
