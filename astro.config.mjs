import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// If you name the repo `ryantanzr.github.io`, this is the final URL and no `base` is needed.
// For a project repo (e.g. `portfolio`), add:  base: '/portfolio'
export default defineConfig({
  site: 'https://ryantanzr.github.io',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' }, // tiny CSS: inline it, no render-blocking request
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-dimmed' } },
  },
  security: {
    // Emitted as a <meta> CSP on every page (GitHub Pages can't set real headers).
    // Astro adds hashes for its own scripts/styles; nothing is allowed from other origins.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
        'upgrade-insecure-requests',
      ],
      // Shiki code highlighting uses style *attributes*; inline <style> blocks stay hash-only.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
});
