// Theme toggle. Flipping data-theme is all that is needed: every colour token is registered in CSS and
// tweens slowly (a dusk, not a switch), the sun sets and the moon rises, and the lotus closes or opens.
// This script adds the one thing CSS cannot: a ripple that spreads from the lotus on each press.
const root = document.documentElement;
const btn = document.getElementById('theme') as HTMLButtonElement | null;

let tweenTimer = 0;
const current = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: 'dark' | 'light') {
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  btn?.setAttribute('aria-label', theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode');
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

if (btn) {
  apply(current()); // sync the label with the theme chosen in <head>
  btn.addEventListener('animationend', () => btn.classList.remove('ripple'));
  btn.addEventListener('click', () => {
    // while the colour tokens tween, element-level colour transitions stand down (they would restart every frame)
    root.dataset.tween = '';
    clearTimeout(tweenTimer);
    tweenTimer = window.setTimeout(() => delete root.dataset.tween, 2000);
    apply(current() === 'dark' ? 'light' : 'dark'); // always responds, even mid-tween: CSS retargets from where it is
    btn.classList.remove('ripple');
    void btn.offsetWidth; // restart the ripple if it is still spreading
    btn.classList.add('ripple');
  });
}
