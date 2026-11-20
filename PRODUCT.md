# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 static site on GitHub Pages (repo `ryantanzr/ryantanzr.github.io`, deploys on push to `main`), plain CSS, no UI framework, Sveltia CMS vendored at `/admin`.

## Users

Two audiences, treated as equals: (1) recruiters and hiring managers deciding whether to talk to Ryan, who scan the home page and resume; (2) software engineers who arrive at a blog post from search or a link and judge the writing. Both visit on phones and laptops, in unhurried moments.

## Product Purpose

Ryan Tan's personal site and tech blog. It presents his backend and distributed-systems work and hosts his writing about idempotency, observability and serverless. Success: a first-time visitor trusts his engineering, reads a post, and ends up reaching out or following the RSS feed. The blog is the evidence of how he thinks; being contacted or hired is the end goal.

## Positioning

A quiet, craft-minded backend engineer in Singapore whose pitch is calm systems ("software that is quiet"), told through an ink-and-brush Asian aesthetic rather than a developer-template look.

## Operating Context

Writing happens through the `/admin` Sveltia CMS (GitHub token sign-in) or the local blog CLI (`npm run new-post`, `posts`, `publish-post`, `unpublish-post`). Drafts preview under `npm run dev` only. Posts are Markdown with optional callouts (`> [!NOTE]`), code blocks with copy buttons, a contents list, reading time and older/newer links.

## Capabilities and Constraints

- Light and dark themes with a user toggle (the existing ink-ripple transition may be redesigned) must both ship.
- Strict self-hosted posture: no third-party scripts, fonts, analytics or CDN assets; Astro-generated CSP meta tag stays strict (`default-src 'none'`).
- The blog CMS config, blog CLI and post features must keep working.
- Factual content (experience, projects, skills, journey, metrics such as "50 families", "700 tables", "top 60 of 18,000") must not be invented or altered; connective microcopy may be reworded.
- Fonts on disk: Lato (body, required to stay), Minoru (current display face, replaceable).
- Pages: home, resume, blog index, tag pages, post pages, 404, RSS.

## Brand Commitments

Binding, stated by the user for the redesign: keep Lato; keep the ink-wash/brush motifs; keep the Asian aesthetic; motion is subtle and zen; palette moves to brown, gold and green in a bamboo-forest feel; lotus and Buddhist motifs wherever tasteful (lotus, ensō, bodhi leaf, mala beads as seals, dividers, the theme toggle and the footer; no Buddha figures, no wheel or swastika-type symbols, never wallpaper).

## Evidence on Hand

Real experience, projects and skills in `src/data/site.ts`; a Hult Prize credential link on the resume page. No testimonials, photos or logo assets exist; the journey "seals" are monograms standing in for logos. Do not fabricate any.

## Product Principles

1. Quiet is the product: nothing performs for attention, and what moves does so slowly.
2. The writing is the proof; reading must be the best place on the site.
3. The home page earns a contact or a first read within one scroll.
4. Everything ships static, fast and self-hosted.
5. Real facts only; illustrate, never invent.

## Accessibility & Inclusion

No product-specific standard was stated. Keep WCAG AA contrast in both themes, visible keyboard focus, and honour `prefers-reduced-motion` and `prefers-color-scheme`.
