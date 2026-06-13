# Agent Notes

This is a static personal site. There is no build step for the current setup.

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

Keep these project-wide rules in mind:

- Static HTML, CSS, and JS only; do not add a build step unless explicitly
  requested.
- Main entry points are `index.html`, `design/index.html`,
  `research/index.html`, and `research/project.html`.
- Preserve stable URLs for `/design/` and `/research/`.
- Prefer semantic HTML, section ids for navigation, CSS variables for shared
  tokens, and modular JS by page or section.
- Shared assets live under `res/`; design source assets may live under
  `design/`.

## Visual Layer System

The site uses 4 explicit z-index layers (defined as CSS variables in
`css/variables.css`). Every visual element must belong to one of these layers:

| Layer | Variable | Contains |
|---|---|---|
| 1 — Background | `--layer-bg` (0) | Body `background-color` |
| 2 — Background animation | `--layer-bg-anim` (10) | Animated hero elements (XDzZyq title, sun, floating marks) |
| 3 — Content | `--layer-content` (20) | Panels, cards, nav (`--layer-nav`: 100), overlays (`--layer-overlay`: 500) |
| 4 — Debug | `--layer-debug-overlay` (9999), `--layer-debug-ui` (10000) | Debug grid overlay and toggle UI |

Rules:
- Never hardcode `z-index` numeric values. Use the layer CSS variables.
- When introducing a new overlay or floating element, check if an existing
  layer variable fits before adding a new one.
- The debug layer must always be the highest layer on every page.
- Layer 2 elements must use `pointer-events: none` to avoid blocking content
  interaction.

## Research Page Systems (since the i18n + markdown + search refactor)

The `/research/` area is a small content app, not just a static page:

- **i18n.** UI strings live in `research/i18n/<lang>.json` and are
  applied via `data-i18n="<dotted.path>"` attributes. The active
  language comes from `?lang=<code>`, then `localStorage["xdzzyq.lang"]`,
  then defaults to `en`. The page reloads on switch. See
  `research/js/i18n.js` and `.github/instructions/research.instructions.md`.
- **Markdown project details.** Long-form content for each project lives
  at `research/projects/<slug>.md` and `<slug>.cn.md`. The detail page
  `research/project.html?slug=<slug>` renders them with marked + DOMPurify.
- **Search overlay.** A Cmd+K / `/` floating search built on top of
  `research/js/search.js`, indexed from `research/data/projects.json`.
  Hotkeys: `Cmd+K` / `Ctrl+K` toggles, `/` opens, `Esc` closes,
  `↑`/`↓` navigate, `Enter` jumps.
- **Translate skill.** The local `.opencode/skills/translate/SKILL.md`
  knows exactly which files to touch for EN↔CN parity and supports
  scoped translation (all, by slug, by file, by git diff).

## Local Skills

Project-local opencode skills live in `.opencode/skills/`. Currently:

- `translate` — keeps `research/i18n/` and `research/projects/`
  in sync across languages. Use it whenever UI text or markdown
  content changes; it handles scope, fallback ordering, and
  verification.

## Local Preview

For local preview, prefer the existing Live Server launcher:

```powershell
& "D:\Program Files\nodejs\node.exe" ".\.draft\local-live-server.cjs"
```

Open the site at:

```text
http://127.0.0.1:5500/
```

If Live Server is unavailable, run this from the repository root:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

For the longer runbook, read `LOCAL_DEVELOPMENT.md`.
