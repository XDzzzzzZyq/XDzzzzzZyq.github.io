# Agent Notes

This is an Astro 5 static personal site. GitHub Pages serves the compiled `dist/` folder.

## Instruction Routing

Read `.github/copilot-instructions.md` first for project-wide guidance.

Then read the relevant focused instruction file before editing:

- `.github/instructions/structure.instructions.md` for page layout, directory
  structure, and URL stability.
- `.github/instructions/design.instructions.md` for `/design/` work, visual
  direction, and design/tool portfolio sections.
- `.github/instructions/research.instructions.md` for `/research/` work,
  Notion note links, publication-list requirements, i18n, markdown project
  details, and the search overlay.
- `.github/instructions/content.instructions.md` for section ids, navigation,
  repeated content blocks, links, and image alt text.
- `.github/instructions/animation.instructions.md` for GSAP, ScrollTrigger,
  SplitText, timelines, and animation performance.

## Project Shape

- Astro 5 + TypeScript, static output, no SSR.
- Source lives in `src/`. Compiled HTML/CSS/JS is emitted to `dist/`.
- Preserve stable URLs for `/`, `/design/`, and `/research/`.
- Shared assets live under `public/res/`; research cover images live under
  `public/research/assets/`.
- Prefer Astro components, CSS variables, and page-scoped client scripts.

## Visual Layer System

The site uses 4 explicit z-index layers (defined as CSS variables in
`src/styles/variables.css`). Every visual element must belong to one of these layers:

| Layer | Variable | Contains |
|---|---|---|
| 1 — Background | `--layer-bg` (0) | Body `background-color` |
| 2 — Background animation | `--layer-bg-anim` (10) | Animated hero elements (XDzZyq title, sun, floating marks) |
| 3 — Content | `--layer-content` (20) | Panels, cards, nav (`--layer-nav`: 100), scrollbar (`--layer-scrollbar`: 400), overlays (`--layer-overlay`: 500) |
| 4 — Debug | `--layer-debug-overlay` (9999), `--layer-debug-ui` (10000) | Debug grid overlay and toggle UI |

Rules:
- Never hardcode `z-index` numeric values. Use the layer CSS variables.
- When introducing a new overlay or floating element, check if an existing
  layer variable fits before adding a new one.
- The debug layer must always be the highest layer on every page.
- Layer 2 elements must use `pointer-events: none` to avoid blocking content
  interaction.

## Research Page Systems

The `/research/` area is a small content app:

- **i18n.** UI strings live in `src/content/i18n/<lang>.json`. English pages
  are at `/research/`; Chinese pages are at `/research/cn/`. `?lang=cn`
  still redirects for compatibility.
- **Markdown project details.** Long-form content lives at
  `src/content/projects/en/<slug>.md` and `src/content/projects/cn/<slug>.md`.
  Astro renders them at build time. Detail URLs are `/research/<slug>/` and
  `/research/cn/<slug>/`.
- **Search overlay.** A Cmd+K / `/` floating search built on
  `src/scripts/search.ts`, indexed from `src/data/projects.json`.
- **Translate skill.** `.opencode/skills/translate/SKILL.md` keeps EN↔CN
  dictionaries and markdown bodies in sync.

## Design Page Systems

The `/design/` area is a portfolio that opens with its own intro:

- **i18n.** Dictionaries live in `src/content/design/{cn,en}.json` with helpers
  in `src/lib/design.ts`. Design is Chinese-first — `/design/` is CN and
  `/design/en/` is EN, the opposite of `/research/`.
- **Work data.** `src/data/works.ts` carries every work: section, slug, cover,
  images and an optional `video` (`bvid` + `cid`) that renders a Bilibili
  player. Images are hosted locally under `public/design/assets/`.
- **Hub thumbnails.** `scripts/thumbs.mjs`, wired to `predev` and `prebuild`,
  writes a 640px copy of each asset into `public/design/derived/sm/`, which is
  gitignored. Only the hub's section strip uses it, through `derived()` in
  `src/lib/design.ts`. Every other image on the site is the original.
- **Cover intro.** `/design/` opens on a full-screen cover (`.design-splash`)
  holding the same mark as the home page, which collapses into a band while the
  nav, the section title and the background marks arrive.
  `src/scripts/design-intro.ts` runs it; every duration, curve and offset is a
  token on `body.design-page`.
- **Image zoom.** `src/scripts/lightbox.ts` expands any `[data-lightbox]` image
  over a dimmed overlay.
- **No route home.** Nothing under `/design/` links to `/` or `/research/` —
  the last nav entry is the About panel. Keep it that way: the research area is
  not meant to be reachable from the portfolio.

## Local Preview

```bash
npm install
npm run dev
```

Open the site at `http://127.0.0.1:5500/`. For the longer runbook, read
`LOCAL_DEVELOPMENT.md`.
