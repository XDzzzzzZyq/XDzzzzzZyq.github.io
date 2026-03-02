Purpose
- Provide a refactor-friendly layout for the dual-homepage site.

Recommended layout
- index.html: landing selector for Design vs Research.
- design/index.html: current site (art works and plugins/scripts).
- research/index.html: research landing (Notion links + publications).

Suggested directory structure
- shared/css/base.css for shared tokens and resets.
- shared/js/base.js for shared utilities (nav, animations).
- design/css/ and design/js/ for design-specific styles and scripts.
- research/css/ and research/js/ for research-specific styles and scripts.
- res/ for shared static assets (icons, images, SVGs).

Rules
- Keep URLs stable: /design/ and /research/.
- Avoid deep nesting; prefer clarity over brevity.
- Use data- attributes for JS hooks if class names change frequently.
