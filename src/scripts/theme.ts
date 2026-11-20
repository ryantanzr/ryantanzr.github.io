// Theme toggle: the page cross-fades slowly (View Transitions) while the lotus opens or closes.
const root = document.documentElement;
const btn = document.getElementById('theme') as HTMLButtonElement | null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let busy = false;

const current = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: 'dark' | 'light') {
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  btn?.setAttribute('aria-label', theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode');
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

if (btn) {
  apply(current()); // sync the label with the theme chosen in <head>
  btn.addEventListener('click', () => {
    if (busy) return;
    const next = current() === 'dark' ? 'light' : 'dark';
    const start = (document as any).startViewTransition?.bind(document);
    if (reduce || !start) { apply(next); return; }
    busy = true;
    start(() => apply(next)).finished.finally(() => { busy = false; });
  });
}
