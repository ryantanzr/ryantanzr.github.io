import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// If you name the repo `ryantanzr.github.io`, this is the final URL and no `base` is needed.
// For a project repo (e.g. `portfolio`), add:  base: '/portfolio'
export default defineConfig({
  site: 'https://ryantanzr.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-dimmed' } },
  },
});
