Project overview
- This is a static personal website (no build system).
- Main entry points are plain HTML, CSS, and JS.
- Animations use GSAP (ScrollTrigger, SplitText) via CDN.
- Assets live under res/ and design/ for source files.
- The site will evolve: keep refactors easy and structure clear.

Information architecture
- / is a landing selector with two options: Design and Research.
- /design/ uses the current site (reuse existing index.html for now).
- /research/ is a separate homepage with Notion links and publications.

Design and refactor intent
- Broad design changes are welcome; do not cling to the current visual style.
- Keep a consistent identity across pages (name, typography direction, spacing rhythm).
- Prefer shared tokens and utilities to make future refactors easy.

Code conventions
- Keep HTML semantic with section ids for navigation.
- Keep CSS variables for colors, spacing, and typography.
- Keep JS modular: one script per page section when possible.
- Do not add a build step unless explicitly requested.

Animation guidance
- Register GSAP plugins once per page.
- Prefer timelines over scattered tweens.
- Avoid ScrollTrigger markers in production builds.

Files to treat as entry points
- index.html (landing selector)
- design/index.html (current site)
- research/index.html (research landing)
