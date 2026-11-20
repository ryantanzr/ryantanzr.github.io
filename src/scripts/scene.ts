// The grove has endless, slow loops (swaying stalks, drifting mist). They only run while the hero is on screen,
// so scrolling down the page, or reading in another tab, costs nothing.
const hero = document.querySelector<HTMLElement>('.hero');
if (hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) delete hero.dataset.off; else hero.dataset.off = '';
    document.dispatchEvent(new CustomEvent('heroview', { detail: e.isIntersecting }));
  }).observe(hero);
}
