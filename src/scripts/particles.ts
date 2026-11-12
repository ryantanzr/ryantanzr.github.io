// Ambient particles: ink motes + drifting petals by day, fireflies by night.
const canvas = document.getElementById('fx') as HTMLCanvasElement | null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const conn = (navigator as any).connection;
// skip the effect on data-saver connections and low-end devices
const lowEnd = !!conn?.saveData || (navigator.hardwareConcurrency ?? 8) <= 2;

if (canvas && !reduce && !lowEnd) {
  const ctx = canvas.getContext('2d')!;
  const root = document.documentElement;
  let w = 0, h = 0, dpr = 1;
  const mouse = { x: -9999, y: -9999 };
  const isNight = () => root.dataset.theme === 'dark';
  let night = isNight();
  let fade = 1;
  let ink = '#1d1a17', accent = '#bf3a2b';
  const readColors = () => {
    const cs = getComputedStyle(root);
    ink = cs.getPropertyValue('--ink').trim() || ink;
    accent = cs.getPropertyValue('--accent').trim() || accent;
  };
  readColors();

  type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; ph: number; petal: boolean; fly: boolean; rot: number; vr: number; ang: number };
  let ps: P[] = [];
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);

  function make(): P {
    const petal = Math.random() < 0.28;
    return {
      x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.12, 0.12), vy: petal ? rnd(0.25, 0.55) : rnd(-0.22, -0.05),
      r: petal ? rnd(3.5, 6.5) : rnd(0.8, 2.6), a: rnd(0.25, 0.6), ph: rnd(0, Math.PI * 2),
      petal, fly: Math.random() < 0.3, rot: rnd(0, Math.PI * 2), vr: rnd(-0.02, 0.02), ang: rnd(0, Math.PI * 2),
    };
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = innerWidth; h = innerHeight;
    canvas!.width = w * dpr; canvas!.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(22, Math.min(80, Math.round((w * h) / 22000)));
    while (ps.length < n) ps.push(make());
    ps.length = n;
  }
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

  new MutationObserver(() => {
    if (night !== isNight()) { night = isNight(); fade = 0; readColors(); }
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  let last = performance.now();
  function frame(now: number) {
    const dt = Math.min(3, (now - last) / 16.67); last = now;
    fade = Math.min(1, fade + 0.012 * dt);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = night ? 'lighter' : 'source-over';
    const t = now / 1000;

    for (const p of ps) {
      // gentle repel from the cursor
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 120 * 120 && d2 > 1) {
        const d = Math.sqrt(d2), f = (1 - d / 120) * 0.9;
        p.vx += (dx / d) * f * 0.08 * dt; p.vy += (dy / d) * f * 0.08 * dt;
      }
      let sx: number, sy: number;
      if (night) {
        // fireflies wander
        p.ang += rnd(-0.06, 0.06) * dt;
        sx = Math.cos(p.ang) * 0.28; sy = Math.sin(p.ang) * 0.22 - 0.03;
      } else if (p.petal) {
        sx = Math.sin(t * 0.8 + p.ph) * 0.35; sy = 0;
        p.rot += p.vr * dt;
      } else {
        sx = Math.sin(t * 0.4 + p.ph) * 0.12; sy = 0;
      }
      p.x += (p.vx + sx) * dt; p.y += (p.vy + sy) * dt;
      p.vx *= 0.97; p.vy = night ? p.vy * 0.97 : p.vy; // damp cursor kicks
      if (!night) { const base = p.petal ? 0.4 : -0.12; p.vy += (base - p.vy) * 0.02 * dt; }
      if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;

      if (night) {
        if (!p.fly) continue; // only some of the motes become fireflies
        const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.6 + p.ph * 3));
        const rad = (p.r + 2) * 3.4;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        g.addColorStop(0, `rgba(255, 232, 160, ${0.9 * pulse * fade})`);
        g.addColorStop(0.25, `rgba(245, 195, 100, ${0.34 * pulse * fade})`);
        g.addColorStop(1, 'rgba(240, 190, 100, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2); ctx.fill();
      } else if (p.petal) {
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot + Math.sin(t + p.ph) * 0.4);
        ctx.globalAlpha = p.a * 1.2 * fade; ctx.fillStyle = accent;
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else {
        ctx.globalAlpha = p.a * fade; ctx.fillStyle = ink;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  // start after first paint so it never competes with LCP
  const idle: (cb: () => void, o?: object) => void = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 300));
  idle(() => requestAnimationFrame(frame), { timeout: 1500 });
}
