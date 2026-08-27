Project overview
- This is an Astro 5 static personal website compiled to GitHub Pages.
- Source lives in `src/`; public assets live in `public/`.
- Animations use GSAP (ScrollTrigger, SplitText) from npm.
- Assets live under `public/res/` and `public/research/assets/`.
- The site will evolve: keep refactors easy and structure clear.

Information architecture
- / is a landing selector with two options: Design and Research.
- /design/ uses the current design portfolio.
- /research/ is a separate homepage with Notion links and publications.
- /research/cn/ is the Chinese research homepage.
- /research/<slug>/ and /research/cn/<slug>/ are project detail pages.

Design and refactor intent
- Broad design changes are welcome; do not cling to the current visual style.
- Keep a consistent identity across pages (name, typography direction, spacing rhythm).
- Prefer shared tokens and utilities to make future refactors easy.

Code conventions
- Keep HTML semantic with section ids for navigation.
- Keep CSS variables for colors, spacing, and typography.
- Keep client JS modular: one script per concern (`title.ts`, `search.ts`, `debug.ts`).
- Do not add a runtime framework (React/Vue) unless explicitly requested.
- Keep output static. Do not add an SSR adapter unless explicitly requested.

Animation guidance
- Register GSAP plugins once per page.
- Prefer timelines over scattered tweens.
- Avoid ScrollTrigger markers in production builds.

Files to treat as entry points
- src/pages/index.astro (landing selector)
- src/pages/design/index.astro (design site)
- src/pages/research/index.astro (research landing)
- src/pages/research/[slug].astro (project detail)
