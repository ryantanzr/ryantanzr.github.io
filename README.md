# ryantanzr.github.io

Personal site and tech blog, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Edit

- Bio, experience, projects, skills: `src/data/site.ts` (and the About/Education text in `src/pages/index.astro`)
- Blog posts: add a Markdown file to `src/content/blog/` (see the sample for frontmatter). `draft: true` hides a post.
- Ink illustration: `src/components/InkHero.astro`; colours and theme in `src/styles/global.css`

## Deploy

1. Create a GitHub repo named `ryantanzr.github.io` and push this folder to `main`.
2. In the repo: Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` rebuilds and publishes the site.

If you use a different repo name, set `base: '/<repo-name>'` in `astro.config.mjs`.
