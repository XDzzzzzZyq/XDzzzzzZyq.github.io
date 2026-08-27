Purpose
- Provide a refactor-friendly layout for the dual-homepage site.

Recommended layout
- src/pages/index.astro: landing selector for Design vs Research.
- src/pages/design/index.astro: current site (art works and plugins/scripts).
- src/pages/research/index.astro: English research landing.
- src/pages/research/cn/index.astro: Chinese research landing.
- src/pages/research/[slug].astro and src/pages/research/cn/[slug].astro:
  per-project detail pages.

Suggested directory structure
- src/styles/ for shared tokens and page styles.
- src/scripts/ for client-only utilities (nav, animations, search).
- src/layouts/ and src/components/ for Astro templates.
- src/content/i18n/<lang>.json for UI string dictionaries.
- src/data/projects.json for the project registry.
- src/content/projects/en/<slug>.md and cn/<slug>.md for long-form bodies.
- public/res/ for shared static assets.
- public/research/assets/ for research cover images.
- .opencode/skills/ for project-local opencode skills (e.g. translate).

Visual layer system
- The site uses 4 explicit z-index layers defined in `src/styles/variables.css`.
  See `AGENTS.md` for the layer table.
- Every visual element must use one of the `--layer-*` variables; never
  hardcode `z-index` numeric values.
- Layer 2 (`--layer-bg-anim`) is for animated background elements only;
  these must have `pointer-events: none` to avoid blocking content.
- Layer 4 (`--layer-debug-*`) must always be the highest layer on every page.

Rules
- Keep URLs stable: /design/ and /research/.
- Avoid deep nesting; prefer clarity over brevity.
- Use data- attributes for JS hooks if class names change frequently.
- When adding a new project, you must:
  1. Add an entry to `src/data/projects.json` with a unique `slug`.
  2. Create `src/content/projects/en/<slug>.md` (English, required).
  3. Create `src/content/projects/cn/<slug>.md` (Chinese, required for parity).
  4. Make sure every UI string referenced in templates has a value in every
     `src/content/i18n/<lang>.json` file.
- Project list containers carry `data-project-list="<category>"` (currently
  `research` or `personal`). The single source of truth is `src/data/projects.json`.
- Language switching uses `/research/` vs `/research/cn/` paths. `?lang=`
  remains a compatibility redirect only.
- Detail page language is selected by the URL path, with a cross-language
  markdown fallback if one body is missing.
