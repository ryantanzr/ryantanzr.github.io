---
name: Ryan Tan, The Bamboo Grove at Dawn
description: A quiet engineer's site seen as a view into a bamboo grove at dawn, drawn in ink-wash on mist-green washi.
colors:
  mist-washi: "#e8ead3"
  washi-surface: "#f0f1de"
  bark-ink: "#1f1a10"
  muted-bark: "#58543b"
  reed-line: "#c9cbb0"
  bamboo-green: "#3f5b29"
  bamboo-soft: "#7a9a58"
  bamboo-leaf: "#4d6a32"
  bamboo-wash: "#dfe3c4"
  dawn-gold: "#bd9230"
  gold-ink: "#7a5710"
  gold-wash: "#e6d49a"
  sun-gold: "#d9ab3c"
  bark-brown: "#5a3d28"
  stalk-bark: "#3a2c1a"
  code-wash: "#e0e3c8"
  on-bamboo: "#f4f1dc"
  forest-black: "#141a0f"
  forest-surface: "#1b2315"
  night-text: "#ebe5cb"
  night-muted: "#adab8e"
  night-line: "#2c3622"
  night-bamboo: "#9dba74"
  night-gold: "#d4ad55"
  night-gold-ink: "#dcb860"
  moon-pale: "#ebe4b8"
typography:
  display:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, Noto Serif, serif"
    fontSize: "clamp(2.6rem, 7.5vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "0.015em"
  headline:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, Noto Serif, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.015em"
  title:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, Noto Serif, serif"
    fontSize: "1.6rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.015em"
  body:
    fontFamily: "Lato, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Lato, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.5rem"
  section: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.bamboo-green}"
    textColor: "{colors.on-bamboo}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.dawn-gold}"
    textColor: "{colors.bark-ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.bark-ink}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.35rem"
  button-secondary-hover:
    backgroundColor: "{colors.gold-wash}"
  chip:
    textColor: "{colors.bamboo-green}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.7rem"
  code-block:
    backgroundColor: "{colors.code-wash}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem"
  callout:
    rounded: "{rounded.md}"
    padding: "0.95rem 1.15rem"
  seal-bamboo:
    backgroundColor: "{colors.bamboo-green}"
    textColor: "{colors.on-bamboo}"
    rounded: "{rounded.sm}"
    size: "56px"
---

# Design System: Ryan Tan, The Bamboo Grove at Dawn

## Overview

**Creative North Star: "The Bamboo Grove at Dawn"**

The site is a view into a grove: three depths of ink-wash bamboo, mist bands drifting between them, a low gold sun behind the stalks. Everything else is drawn in the same hand. Surfaces are mist-green washi with a faint fibre texture; text is bark-brown sumi; gold is light, never ink on light. The dark theme is the same grove before sunrise: forest-black ground, a pale gold moon, slow fireflies.

It is calm and sparse. There are no cards and no boxes: structure is carried by hairline rules warmed with gold, by the bamboo culm of the journey, and by whitespace (7rem between sections). Display type is a Japanese-inflected serif, body is a plain humanist sans, and every drawn mark has a brushed, not vector-clean, edge (small marks through an SVG ink filter, the big grove through hand-wobbled geometry). Reading pages (posts, resume) drop the scenery and keep only the palette, type and rules, on a 42-46rem column.

Religious-adjacent motifs (lotus, ensō, bodhi leaf, mala) appear only as small authored marks: seals, dividers, the theme toggle, the footer strand, the contact pond. They are never wallpaper, and no figures or wheel-type symbols are used.

**Key Characteristics:**
- Mist-green washi ground with a plain translucent fibre-noise tile (`--grain` 0.16 light, 0.03 dark; no blend mode, so scrolling never re-blends the page).
- Gold for light, seals, rules and focus; a separate darker gold-ink for anything that must read as text on light.
- Shippori Mincho 500 for names and headings, Lato 400/700 for everything else.
- SVG ink filters on small drawn forms only (seals, ensō, dividers); the grove is filter-free vector with baked wobble; flat tonal depth, one shadow-free surface language.
- Slow, damped, optional motion: nothing moves faster than 0.5s, the scene breathes over 15-120s.

## Colors

A bamboo-forest palette of mist, bark, leaf and gold, with an exact dark twin. Hexes are in the frontmatter; light and dark are swapped by `--bg`, `--text`, `--green`, `--gold` and friends on `:root` (and `[data-theme]`).

### Primary
- **Bamboo Green** (#3f5b29, dark: #9dba74 / accent #a9c77c): primary buttons, hover ink on links, chip and stack labels, tip callouts, the main seal. The one working accent.
- **Soft Bamboo** (#7a9a58, dark #5f7d42): distant stalks, mist-side leaves, scrollbar, pond ripples, culm highlight.
- **Leaf Green** (#4d6a32, dark #35502a): near-stalk leaves only.

### Secondary
- **Dawn Gold** (#bd9230, dark #d4ad55): light and ornament only: underline of links, rules (mixed 45-55% into the line colour), progress bar, hover washes, lotus centre, list-marker leaf, selection. Never body-size text on light.
- **Gold Ink** (#7a5710, dark #dcb860): the text-safe gold. Used for roles in the journey, badges, list markers, focus outline, the theme button glyph, external-link arrow.
- **Gold Wash** (#e6d49a, dark #3a3318): lotus petal fill, hover ground for buttons and chips, `mark`.
- **Sun / Halo** (#d9ab3c / #e8c862, night moon #ebe4b8 / #b9a652): the hero orb and its glow, scene only.

### Tertiary
- **Bark Brown** (#5a3d28, dark #c9a073): secondary button outline, mala beads, brush dividers, brown seals, default callout.
- **Stalk Bark** (#3a2c1a, dark #0c1008): near framing stalks.

### Neutral
- **Mist Washi** (#e8ead3, dark Forest Black #141a0f): page ground; also the mist-band colour so bands dissolve into it.
- **Washi Surface** (#f0f1de, dark #1b2315): TOC, kbd, copy button.
- **Bark Ink** (#1f1a10, dark #ebe5cb): text. Muted Bark (#58543b, dark #adab8e) for secondary text and meta.
- **Reed Line** (#c9cbb0, dark #2c3622): hairlines and chip borders.
- **Code Wash** (#e0e3c8, dark #1a2214): code blocks and inline code.

### Named Rules
**The Light-Not-Ink Rule.** Dawn gold is light. If gold must be read as text on a light ground, it is gold-ink (#7a5710). Decorative gold (rules, washes, the progress bar, seals) stays the brighter value.

**The Ground-Is-The-Mist Rule.** Mist bands, hero scrim and the hero bottom fade are all the page ground colour, so scenery always dissolves into the page and never ends in an edge.

## Typography

**Display Font:** Shippori Mincho 500 (Hiragino Mincho ProN, Yu Mincho, Noto Serif, serif), self-hosted woff2, single weight.
**Body Font:** Lato 400 and 700 (system-ui fallback), self-hosted.
**Mono:** ui-monospace, SF Mono, Menlo.

**Character:** A brush-calligraphy-adjacent serif for names and quiet statements, set against a neutral sans that stays out of the way. Display never bolds; hierarchy comes from size and the generous 1.7 body leading.

### Hierarchy
- **Display** (500, clamp 2.6-5.25rem, 1.05): the h1 name on the home hero; post titles use clamp 2.2-3.5rem at 1.12.
- **Headline** (500, clamp 1.8-2.5rem, 1.15): section h2. The about pull-quote is display at clamp 1.7-2.5rem, 1.4.
- **Title** (500, 1.6-1.8rem, 1.15-1.2): journey, work, job and post-list titles; prose h2 2rem, h3 1.55rem, h4 1.2rem.
- **Body** (400, 1.0625rem, 1.7): `text-wrap: pretty`; prose column max 42rem; home measure 46rem, wide 68rem. Lede 1.3rem.
- **Label** (400, 0.74-0.8rem, 0.1-0.14em, uppercase): chips, journey periods, stack lines, badges, callout titles, nav-card captions. Tabular numerals for time and meta.

### Named Rules
**The One-Weight Display Rule.** Shippori Mincho is only ever 500; do not synthesise bold or italic.

## Layout

Single column at 46rem (`--measure`) for reading, 68rem (`--wide`) for the home page, 1.25rem side gutters. The hero is full-bleed, pulled under the header (margin-top -4.25rem), min-height clamp(36rem, 88svh, 54rem), copy left-aligned on the wrap column from 48rem up and centred below; the sun or moon sits right of centre on desktop (sun offset 250px, glow at 68%) and centred on mobile (offset 0). Sections are 7rem apart (3.25rem mid, 2rem tight). About and journey are two-column splits from 62rem (1.1fr/1fr and 1fr/2fr, gap 5rem; the journey heading is sticky); work is two columns from 46rem. Phones stack everything; near stalks are 13% wide on desktop and 15% at 0.7 opacity on mobile.

## Elevation & Depth

There are no box shadows. Depth is atmospheric: three scene layers (far at 0.3 opacity, mid at 0.55, near at 0.94) separated by mist bands, plus a radial scrim behind the hero copy. On the page, depth is tonal (Washi Surface for TOC and kbd) and hairline, never lifted.

### Named Rules
**The Flat-As-Paper Rule.** Surfaces never cast shadows; separation comes from hairline rules, tone, or mist.

## Shapes

Soft and organic. Pills (999px) for buttons, chips, badges and the theme toggle; 8px for code blocks, callouts and TOC; 6px for hover rows, images and details; 4px for kbd and inline code. Seals are 5px-radius squares with an inset 2px-radius hairline, edges roughened by the ink filter. Small drawn marks use one of two SVG filters: `ink-rough-sm` (seals, ensō) and `ink-dry` (brush dividers). The grove uses none: stalks are Catmull-Rom curves wobbled by seeded sines, each drawn twice from one path (a faint wide pass for ink bleed, then the stroke), and mist bands are radial gradients.

## Components

### Hero grove
A decorative, aria-hidden SVG scene: far/mid/near stalks with nodes, two brushed-edge disc orbs, each in its own svg layer (`.orb-d` sun, `.orb-n` moon) driven by `--sun-o/--sun-y/--moon-o/--moon-y` so the sun can sink and the moon rise, a CSS radial-gradient glow div (`.g-glow`, not an SVG halo; 37% height, lifting 3rem at night), two mist bands at 200% width drawn as gradient divs, and near stalks whose top and inside edges fade by mask. All scene layers are filter-free SVG or CSS gradient; no raster assets ship. Copy sits over a radial scrim in ground colour. Name, then ensō and location line (wraps within a 17rem span on mobile), lede, two buttons.

### Ensō seal
An open brush circle (stroke gold, 3.2) holding the lotus, 44-52px, used once beside the location line.

### Hanko monogram seals
56px rounded squares in bamboo (default), brown or gold, with a Shippori monogram of one or two characters (28 or 21px). One per journey place. Seals carry no lotus.

### Journey (bamboo culm)
Ordered list over a 12px-wide gradient culm (green to soft green to gold-wash, 0.5 opacity). Each item is a 56px seal column plus body; a brown node bar (22x5) sits between items. Period label, title (1.6rem), gold-ink role, muted note.

### Lotus pond contact
Centred clearing: a 15rem lotus with three slow ripple ellipses, headline, one sentence, primary button.

### Mala-bead footer
A 27-bead sagging strand (brown at 0.55 opacity, one gold guru bead at the centre) with a lotus tassel, 44rem max, above a muted footer line.

### Lotus theme toggle
40px outlined pill holding a lotus. Open by day; pressed, the outer petals rotate 34deg and mid petals 20deg to close it, outer first (0s), mid (0.18s), heart (0.36s) over 1.7s, and reopen in reverse order. A thin gold ring spreads once from the button (1.8s, scale 1 to 2.4, like a pond ripple). Hover washes gold.

### Buttons
Pills with 1px bark-brown outline, 0.65x1.35rem, 0.04em tracking. Primary is bamboo green with on-bamboo text, turning dawn gold with dark ink on hover; secondary hovers to gold wash and gold-ink border. Press nudges 1px.

### Post list and links
Rows separated by gold-mixed hairlines, display titles at 1.8rem. The section always renders, with an empty-state line when nothing is published. Hairlines in this list and in the work list are gold-tinted. Hovered or focused rows take a 13% gold wash that rises in 0.7s and fades back over 1.6s. Arrows on back, more and external links are drawn masks (no glyph arrows). Links keep a gold 1px underline (2px on hover) and shift to bamboo green; nav links draw a gold underline in 0.8s.

### Post prose
42rem column, 1.2rem paragraph gap, bodhi-leaf bullets (`ul` list-style-image, a gold leaf data-URI) with gold-ink markers, blockquotes in display serif with a gold opening quote mark, tables with hairline rows, a TOC in Washi Surface at 8px radius, and a 2px gold reading-progress bar.

Lotus appears only on the ensō, pond, toggle, dividers and footer strand; the bodhi leaf only as the prose list marker.

### Callouts
8px radius, 1px border and 8% tint of the callout colour: note brown, tip bamboo, important gold-ink, warning #8a5a14 (dark #dba14a), caution #8a3b22 (dark #e08a6a); small uppercase title in the same colour.

### Code blocks
Code Wash ground, hairline border, 8px radius, 0.88rem/1.55; language tag top-left, pill copy button top-right that appears on hover or focus (always on touch); Shiki dual theme.

## Motion

Grammar: slow ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), damped, ambient; the theme dusk uses ease-in-out (`--dusk`) so the sky changes at the pace of light, not a pop.
- Entrance: stalks rise over 2.6-2.8s staggered 0.2-0.5s, the sun settles over 4.2s, the glow fades in over 5s, hero copy settles (blur 4px to 0) over 1.9s with 0.15s steps.
- Mist drifts 34% sideways over 90s and 120s, alternating.
- Near stalks sway between -0.45 and 0.45 degrees over 15s and 19s, always under 0.5deg.
- Scroll parallax lags deep and front layers 2.5rem and 5rem across the first 90svh, only inside `@supports (animation-timeline: scroll())`.
- Gold light lingers on hovered rows (0.7s in, 1.6s out); links and buttons transition 0.5-0.8s.
- Theme change is a slow dusk, not a snapshot cross-fade: every colour token is a registered `@property` tweened on `:root` with the dusk ease (`cubic-bezier(0.4, 0, 0.2, 1)`). Ground and scene tokens take 1.7s; text tokens wait 0.6s and take 0.5s so lettering crosses the darkening ground quickly. The sun sinks and fades over 1.7s while the moon rises over 2s (0.2s later); the glow lifts 3rem; fireflies fade in over 1.7s; the lotus closes and a ring ripples from it. Element-level colour transitions stand down while it runs (`:root[data-tween]`). It is interruptible: CSS retargets from the current value.
- Ambient motes (day) and fireflies (night) on a canvas, 8-18 particles, only where `.hero` exists (home page), skipped for data saver and weak devices.
- Endless loops (sway, mist drift) pause when the hero is off screen (`scripts/scene.ts`); the canvas stops too.
- Under `prefers-reduced-motion: reduce` the ambient and spatial motion is off: no entrance, mist, sway, parallax, ripples, particles or petal rotation. The theme change keeps its meaning: colours tween over 0.6s (text 0.25s after 0.2s), the sun and moon swap by opacity only with nothing travelling, and the glow stays put.

## Do's and Don'ts

### Do:
- **Do** use gold-ink (#7a5710) for any gold that must be read as text on the light ground.
- **Do** run every new small drawn form through an existing ink filter (`ink-rough-sm`, `ink-dry`) and draw it in palette colours via CSS variables so dark mode follows. Never put an SVG filter (turbulence, displacement, blur) on a large area: it re-rasterises on the CPU (about 0.4s each for the far and mid grove) on every paint and theme change; bake the wobble into the path geometry or use a gradient instead.
- **Do** keep lotus, ensō, bodhi leaf and mala beads as seals, dividers, the toggle, list markers and the footer strand.
- **Do** keep durations at or above 0.5s with the grove ease, and wrap any new motion in `prefers-reduced-motion: no-preference`.
- **Do** separate with hairlines (1px, gold mixed 45-55% into Reed Line) and whitespace, not boxes.

### Don't:
- **Don't** add cards, drop shadows or hard offset shadows; the system is flat.
- **Don't** use gold (#bd9230) as body-size text on light.
- **Don't** let the ground colour drift from the mist: scrims, bands and fades all use `--bg`.
- **Don't** use religious figures, wheels or swastika-type symbols, or tile any motif as wallpaper.
- **Don't** bold or italicise Shippori Mincho, or add a third typeface.
- **Don't** add inline styles or third-party assets; CSP stays strict and fonts are self-hosted.
