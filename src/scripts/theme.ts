// Theme toggle as a waterdrop: a drop lands on the button, ripples emanate outward,
// and the new theme bleeds in slowly behind the leading wave (View Transitions +
// a feathered, animated mask). The page stays visible the whole time.
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
const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

const FRONT_MS = 2000;                        // how long the colours take to flood the page
const RING_DELAYS = [0, 200, 400, 620, 860];  // successive ripples, trailing the leading wave

/** A droplet falls onto the button; resolves on impact. */
function dropFall(ox: number, oy: number, next: 'dark' | 'light') {
  const el = document.createElement('i');
  const night = next === 'dark';
  el.style.cssText =
    `position:fixed;z-index:9999;pointer-events:none;left:${ox - 7}px;top:${oy - 9}px;width:14px;height:18px;` +
    `border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;` +
    `background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.9), ${night ? '#2a2620' : '#f4efe3'} 55%);` +
    `box-shadow:0 0 0 1px ${night ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.22)'}, 0 2px 8px rgba(0,0,0,.25);`;
  document.body.append(el);
  const fall = Math.min(oy + 24, 90);
  const a = el.animate(
    [
      { transform: `translateY(${-fall}px) scale(0.8, 1.35)`, opacity: 0 },
      { transform: `translateY(${-fall * 0.5}px) scale(0.85, 1.3)`, opacity: 1, offset: 0.35 },
      { transform: 'translateY(0) scale(1, 1)', opacity: 1, offset: 0.88 },
      { transform: 'translateY(2px) scale(1.7, 0.2)', opacity: 0 },
    ],
    { duration: 300, easing: 'cubic-bezier(.5,0,.9,.6)', fill: 'forwards' },
  );
  return a.finished.then(() => el.remove());
}

/** Concentric ripple rings (SVG, driven per frame so stroke width stays constant). */
function ripples(container: HTMLElement, ox: number, oy: number, R: number, next: 'dark' | 'light') {
  const W = innerWidth, H = innerHeight;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', String(W));
  svg.setAttribute('height', String(H));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const rgb = next === 'dark' ? '255,238,205' : '29,26,23';
  const rings = RING_DELAYS.map(() => {
    const glow = document.createElementNS(NS, 'circle');
    const line = document.createElementNS(NS, 'circle');
    for (const c of [glow, line]) {
      c.setAttribute('cx', String(ox)); c.setAttribute('cy', String(oy));
      c.setAttribute('fill', 'none'); c.setAttribute('stroke', `rgb(${rgb})`);
    }
    glow.setAttribute('stroke-width', '14');
    line.setAttribute('stroke-width', '2');
    svg.append(glow, line);
    return { glow, line };
  });
  container.append(svg);
  const t0 = performance.now();
  const end = FRONT_MS + RING_DELAYS[RING_DELAYS.length - 1] + 100;
  const tick = (now: number) => {
    const t = now - t0;
    rings.forEach((ring, i) => {
      const p = (t - RING_DELAYS[i]) / FRONT_MS;
      const on = p > 0 && p < 1;
      const r = R * easeOut(p);
      const o = on ? 0.5 * Math.pow(1 - p, 1.4) : 0;
      ring.line.setAttribute('r', String(Math.max(r, 0)));
      ring.glow.setAttribute('r', String(Math.max(r, 0)));
      ring.line.setAttribute('stroke-opacity', o.toFixed(3));
      ring.glow.setAttribute('stroke-opacity', (o * 0.18).toFixed(3));
    });
    if (t < end) requestAnimationFrame(tick); else svg.remove();
  };
  requestAnimationFrame(tick);
}

/** Droplet lands on the button, ripples spread, and the new theme bleeds in behind the leading wave. */
function reveal(next: 'dark' | 'light', ox: number, oy: number) {
  busy = true;
  const R = Math.hypot(Math.max(ox, innerWidth - ox), Math.max(oy, innerHeight - oy)) + 240;
  root.style.setProperty('--ox', `${ox}px`);
  root.style.setProperty('--oy', `${oy}px`);

  dropFall(ox, oy, next).then(() => {
    let container: HTMLElement | null = null;
    const vt = (document as any).startViewTransition(() => {
      apply(next);
      container = document.createElement('div');
      container.className = 'ink-drops';
      document.body.append(container);
    });
    vt.ready.then(() => {
      // --ripple-r is a registered <length>; the CSS mask feathers the colour change around it
      root.animate(
        { '--ripple-r': ['0px', `${R}px`] } as any,
        { duration: FRONT_MS, easing: 'cubic-bezier(.22,.6,.3,1)', fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
      );
      if (container) ripples(container, ox, oy, R, next);
    }).catch(() => {});
    vt.finished.finally(() => {
      (container as HTMLElement | null)?.remove(); // frees the view-transition-name for the next toggle
      root.style.removeProperty('--ox');
      root.style.removeProperty('--oy');
      busy = false;
    });
  });
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
