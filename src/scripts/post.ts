// Post-page niceties: callouts, a copy button on every code block and a thin reading-progress line.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// GitHub-style callouts: a blockquote opening with [!NOTE] / [!TIP] / [!IMPORTANT] / [!WARNING] / [!CAUTION].
const MARKER = /^\s*\[!(note|tip|important|warning|caution)\]\s*/i;
for (const quote of document.querySelectorAll<HTMLQuoteElement>('.prose blockquote')) {
  const first = quote.firstElementChild;
  const hit = first?.tagName === 'P' ? MARKER.exec(first.textContent ?? '') : null;
  if (!first || !hit) continue;
  const kind = hit[1].toLowerCase();
  const node = first.firstChild;
  if (node?.nodeType === Node.TEXT_NODE) node.textContent = (node.textContent ?? '').replace(MARKER, '');
  if (!first.textContent?.trim()) first.remove();
  const box = document.createElement('div');
  box.className = `callout callout-${kind}`;
  box.setAttribute('role', 'note');
  const title = document.createElement('p');
  title.className = 'callout-title';
  title.textContent = kind[0].toUpperCase() + kind.slice(1);
  box.append(title, ...quote.childNodes);
  quote.replaceWith(box);
}

for (const pre of document.querySelectorAll<HTMLElement>('.prose pre')) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy';
  btn.textContent = 'Copy';
  btn.setAttribute('aria-label', 'Copy code to clipboard');
  let timer: number | undefined;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? pre.textContent ?? '');
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Press ⌘C';
    }
    clearTimeout(timer);
    timer = window.setTimeout(() => (btn.textContent = 'Copy'), 1600);
  });
  const wrap = document.createElement('div');
  wrap.className = 'code';
  const lang = pre.dataset.language;
  if (lang && lang !== 'plaintext' && lang !== 'text') wrap.dataset.lang = lang;
  pre.replaceWith(wrap);
  wrap.append(pre, btn);
}

const bar = document.getElementById('progress');
const article = document.querySelector<HTMLElement>('article');
if (bar && article && !reduce) {
  let ticking = false;
  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - innerHeight * 0.6;
    const done = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 1);
    bar.style.transform = `scaleX(${done.toFixed(4)})`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
