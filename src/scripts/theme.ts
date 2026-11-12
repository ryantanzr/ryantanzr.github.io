// Theme toggle. The new theme is revealed through an organic, ink-shaped edge that
// spreads from the button (View Transitions + an animated clip-path), with ink
// droplets flung ahead of it. The page stays visible the whole time.
const root = document.documentElement;
const btn = document.getElementById('theme') as HTMLButtonElement | null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let busy = false;

const current = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: 'dark' | 'light') {
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀' : '☾';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode');
  }
}

const TAU = Math.PI * 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.1);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Build clip-path keyframes for a blobby, ink-like edge growing from (ox, oy). */
function inkFrames(ox: number, oy: number, R: number) {
  const POINTS = 90, STEPS = 30;
  const lobes = Array.from({ length: 5 }, () => ({
    k: 2 + Math.floor(Math.random() * 5), a: rand(0.05, 0.13), ph: rand(0, TAU), drift: rand(-1.5, 1.5),
  }));
  const fingers = Array.from({ length: 8 }, () => ({ at: rand(0, TAU), w: rand(0.06, 0.12), h: rand(0.14, 0.34) }));
  const frames: string[] = [];
  for (let s = 0; s <= STEPS; s++) {
    const p = s / STEPS;
    const base = R * easeOut(p);
    const wobble = Math.pow(1 - p, 0.8); // edge irregularity melts away as it covers the screen
    const pts: string[] = [];
    for (let i = 0; i < POINTS; i++) {
      const th = (i / POINTS) * TAU;
      let j = 0;
      for (const l of lobes) j += l.a * Math.sin(l.k * th + l.ph + l.drift * p * 3);
      for (const f of fingers) {
        let d = Math.abs(th - f.at); if (d > Math.PI) d = TAU - d;
        j += f.h * Math.exp(-(d * d) / (2 * f.w * f.w)); // pointed ink "fingers"
      }
      const r = base * (1 + j * wobble);
      pts.push(`${(ox + Math.cos(th) * r).toFixed(1)}px ${(oy + Math.sin(th) * r).toFixed(1)}px`);
    }
    frames.push(`polygon(${pts.join(',')})`);
  }
  return frames;
}

function flingDrops(container: HTMLElement, ox: number, oy: number, R: number, color: string) {
  for (let i = 0; i < 18; i++) {
    const size = rand(5, 22);
    const d = document.createElement('i');
    d.style.cssText = `position:absolute;left:${ox - size / 2}px;top:${oy - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;background:${color};`;
    container.append(d);
    const ang = rand(0, TAU), dist = R * rand(0.35, 0.95);
    d.animate(
      [
        { transform: 'translate(0,0) scale(0.3)', opacity: 1, offset: 0 },
        { transform: `translate(${Math.cos(ang) * dist * 0.85}px, ${Math.sin(ang) * dist * 0.85}px) scale(1)`, opacity: 1, offset: 0.7 },
        { transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0.6)`, opacity: 0, offset: 1 },
      ],
      { duration: rand(650, 950), easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' },
    );
  }
}

function reveal(next: 'dark' | 'light', ox: number, oy: number) {
  busy = true;
  const W = innerWidth, H = innerHeight;
  const R = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy)) * 1.12;
  const frames = inkFrames(ox, oy, R);
  const dropColor = next === 'dark' ? '#141210' : '#efe8d8';
  const DURATION = 900;
  let drops: HTMLElement | null = null;

  const vt = (document as any).startViewTransition(() => {
    apply(next);
    drops = document.createElement('div');
    drops.className = 'ink-drops';
    document.body.append(drops);
  });
  vt.ready.then(() => {
    root.animate(
      { clipPath: frames },
      { duration: DURATION, easing: 'linear', fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
    );
    if (drops) flingDrops(drops, ox, oy, R, dropColor);
  }).catch(() => {});
  vt.finished.finally(() => { drops?.remove(); busy = false; });
}

if (btn) {
  apply(current()); // sync icon + label with the theme chosen in <head>
  btn.addEventListener('click', () => {
    if (busy) return;
    const next = current() === 'dark' ? 'light' : 'dark';
    if (reduce || !('startViewTransition' in document)) { apply(next); return; }
    const r = btn.getBoundingClientRect();
    reveal(next, r.left + r.width / 2, r.top + r.height / 2);
  });
}
