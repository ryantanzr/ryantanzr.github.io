// Ambient light: a few gold motes drift up through the grove by day; fireflies pulse slowly by night.
// Sparse on purpose, skipped for reduced motion, data saver and weak devices.
const canvas = document.getElementById('fx') as HTMLCanvasElement | null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const conn = (navigator as any).connection;
const lowEnd = !!conn?.saveData || (navigator.hardwareConcurrency ?? 8) <= 2;

// reading pages stay still: the lights live on the home page, where the grove is
if (canvas && !reduce && !lowEnd && document.querySelector('.hero')) {
  const ctx = canvas.getContext('2d')!;
  const root = document.documentElement;
  let w = 0, h = 0, dpr = 1, raf = 0;
  let night = root.dataset.theme === 'dark';
  let gold = '#bd9230', green = '#7a9a58';
  const readColors = () => {
    const cs = getComputedStyle(root);
    gold = cs.getPropertyValue('--gold').trim() || gold;
    green = cs.getPropertyValue('--green-soft').trim() || green;
  };
  readColors();

  type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; ph: number; sp: number; leaf: boolean };
  let ps: P[] = [];
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const make = (): P => ({
    x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.05, 0.05), vy: rnd(-0.16, -0.04), r: rnd(1, 2.4), a: rnd(0.25, 0.55),
    ph: rnd(0, Math.PI * 2), sp: rnd(0.0006, 0.0016), leaf: Math.random() < 0.25,
  });
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = innerWidth; h = innerHeight;
    canvas!.width = w * dpr; canvas!.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(Math.max((w * h) / 70000, 8), 18));
    ps = Array.from({ length: count }, make);
  }
  function frame(now: number) {
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.x += p.vx + Math.sin(now * p.sp + p.ph) * 0.06;
      p.y += p.vy;
      if (p.y < -12) { p.y = h + 12; p.x = rnd(0, w); }
      if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
      const breathe = 0.55 + 0.45 * Math.sin(now * p.sp * 1.6 + p.ph);
      ctx.beginPath();
      if (night) {
        // firefly: a warm core inside a soft halo that swells and fades
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
        g.addColorStop(0, gold); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = p.a * breathe * 0.9;
        ctx.fillStyle = g; ctx.arc(p.x, p.y, p.r * 7, 0, Math.PI * 2); ctx.fill();
      } else if (p.leaf) {
        ctx.globalAlpha = p.a * 0.7; ctx.fillStyle = green;
        ctx.ellipse(p.x, p.y, p.r * 2.6, p.r * 0.9, now * p.sp + p.ph, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.globalAlpha = p.a * breathe; ctx.fillStyle = gold;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  document.addEventListener('themechange', (e) => { night = (e as CustomEvent).detail === 'dark'; readColors(); });
  addEventListener('resize', resize, { passive: true });
  resize();
  start();
}
