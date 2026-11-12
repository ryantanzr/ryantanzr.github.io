// Theme toggle with an ink-splatter transition.
// Night: ink spreads from the button. Day: a wash of paper spreads back.
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

const NS = 'http://www.w3.org/2000/svg';
const el = (name: string, attrs: Record<string, string | number> = {}) => {
  const n = document.createElementNS(NS, name);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  return n;
};
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function splatter(next: 'dark' | 'light', ox: number, oy: number) {
  busy = true;
  const W = innerWidth, H = innerHeight;
  const color = next === 'dark' ? '#141210' : '#efe8d8';
  const R = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy)) * 1.12;

  const svg = el('svg', { class: 'ink-splash', viewBox: `0 0 ${W} ${H}`, 'aria-hidden': 'true' });
  const defs = el('defs');
  // gooey merge: blur, then threshold alpha so touching blobs fuse like wet ink
  const goo = el('filter', { id: 'splash-goo', filterUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H });
  goo.append(
    el('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: 9, result: 'b' }),
    el('feColorMatrix', { in: 'b', type: 'matrix', values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10', result: 'g' }),
    el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.012, numOctaves: 3, seed: Math.floor(Math.random() * 90), result: 'n' }),
    el('feDisplacementMap', { in: 'g', in2: 'n', scale: 70, xChannelSelector: 'R', yChannelSelector: 'G' }),
  );
  defs.append(goo);
  const g = el('g', { filter: 'url(#splash-goo)', fill: color });
  svg.append(defs, g);

  const main = el('circle', { cx: ox, cy: oy, r: 0 });
  g.append(main);

  // fingers: lobes riding the main edge, so the outline is blobby, not a clean circle
  const fingers = Array.from({ length: 16 }, () => ({
    a: Math.random() * Math.PI * 2,
    reach: 0.92 + Math.random() * 0.2,
    size: 0.05 + Math.random() * 0.1,
    node: el('circle', { r: 0, cx: ox, cy: oy }),
  }));
  // droplets flung ahead of the splash
  const drops = Array.from({ length: 26 }, () => ({
    a: Math.random() * Math.PI * 2,
    lead: 1.08 + Math.random() * 0.5,
    r: 3 + Math.random() * 13,
    node: el('circle', { r: 0, cx: ox, cy: oy }),
  }));
  g.append(...fingers.map((f) => f.node), ...drops.map((d) => d.node));
  document.body.append(svg);

  const GROW = 950, FADE = 800;
  const t0 = performance.now();
  let swapped = false;

  function frame(now: number) {
    const t = now - t0;
    if (t <= GROW) {
      const k = easeOut(t / GROW);
      const r = R * k;
      main.setAttribute('r', String(r));
      for (const f of fingers) {
        f.node.setAttribute('cx', String(ox + Math.cos(f.a) * r * f.reach));
        f.node.setAttribute('cy', String(oy + Math.sin(f.a) * r * f.reach));
        f.node.setAttribute('r', String(r * f.size));
      }
      for (const d of drops) {
        const dist = r * d.lead;
        d.node.setAttribute('cx', String(ox + Math.cos(d.a) * dist));
        d.node.setAttribute('cy', String(oy + Math.sin(d.a) * dist));
        d.node.setAttribute('r', String(d.r * Math.min(1, t / 140)));
      }
      requestAnimationFrame(frame);
      return;
    }
    if (!swapped) {
      swapped = true;
      apply(next); // sun/moon transitions start now, beneath the fading ink
    }
    const f = (t - GROW) / FADE;
    svg.style.opacity = String(Math.max(0, 1 - f * f));
    if (f < 1) requestAnimationFrame(frame);
    else { svg.remove(); busy = false; }
  }
  requestAnimationFrame(frame);
}

if (btn) {
  apply(current()); // sync icon + label with the theme chosen in <head>
  btn.addEventListener('click', () => {
    if (busy) return;
    const next = current() === 'dark' ? 'light' : 'dark';
    if (reduce) { apply(next); return; }
    const r = btn.getBoundingClientRect();
    splatter(next, r.left + r.width / 2, r.top + r.height / 2);
  });
}
