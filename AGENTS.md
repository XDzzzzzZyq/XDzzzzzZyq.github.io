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
  Notion note links, and publication-list requirements.
- `.github/instructions/content.instructions.md` for section ids, navigation,
  repeated content blocks, links, and image alt text.
- `.github/instructions/animation.instructions.md` for GSAP, ScrollTrigger,
  SplitText, timelines, and animation performance.

## Project Shape

Keep these project-wide rules in mind:

- Static HTML, CSS, and JS only; do not add a build step unless explicitly
  requested.
- Main entry points are `index.html`, `design/index.html`, and
  `research/index.html`.
- Preserve stable URLs for `/design/` and `/research/`.
- Prefer semantic HTML, section ids for navigation, CSS variables for shared
  tokens, and modular JS by page or section.
- Shared assets live under `res/`; design source assets may live under
  `design/`.

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
