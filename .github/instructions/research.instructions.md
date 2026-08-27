Research page scope
- /research/ is a separate homepage.
- It must surface two Notion note links and a publications list.
- It ships with built-in i18n (EN/CN), a search overlay, and per-project
  markdown detail pages.

Notion links
- Math note: https://xdzzyq.notion.site/e6337c9d7773493cbc182796a46552fe
- Machine Learning note: https://xdzzyq.notion.site/Machine-Learning-b25f839889ec4cd3917fa92b01e37b28
- Present these as prominent buttons or cards.
- Links live in `src/data/notes.ts`.

Publications list
- Use an ordered list (ol).
- Each item should include year, title, venue, and optional link.
- Keep the list easy to update from `src/data/publications.json`.

Visual direction
- This page can be visually distinct from /design/ but should still feel related.

Internationalization (i18n)
- UI strings live in `src/content/i18n/<lang>.json` (e.g. `en.json`, `cn.json`).
- Add new keys to BOTH dictionaries whenever you change UI text.
- English pages live at `/research/`; Chinese pages live at `/research/cn/`.
- `?lang=cn` and `?lang=en` remain compatibility redirects.
- Adding a new language = adding `src/content/i18n/<code>.json` and a matching
  page tree under `src/pages/research/<code>/`.
- Translate content via the `translate` skill at
  `.opencode/skills/translate/SKILL.md`.

Markdown project details
- Each project has its own markdown body at
  `src/content/projects/en/<slug>.md` and `src/content/projects/cn/<slug>.md`.
  The slug MUST match `slug` in `src/data/projects.json`.
- A slug is missing a language file? The detail page falls back to the other
  language silently — do not crash.
- English detail pages live at `/research/<slug>/`.
- Chinese detail pages live at `/research/cn/<slug>/`.
- `research/project.html?slug=<slug>` remains a compatibility redirect.
- Keep the markdown focused on long-form content: motivation, method,
  results, references. Short summaries and metadata belong in the JSON.
- All external links inside the markdown should be opened in a new tab.

Search overlay
- Lives in `src/components/SearchOverlay.astro` and `src/scripts/search.ts`.
- Index is built from `src/data/projects.json` (title, summary, tags, status).
- Scoring: lower-cased substring match (highest), then subsequence match
  (typo tolerance). Weights: title × 3, tags × 1.4, summary × 0.6,
  status × 0.4. Top 10 results.
- Hotkeys: `Cmd+K` / `Ctrl+K` toggles, `/` opens, `Esc` closes, `↑`/`↓`
  navigate, `Enter` jumps.
- To translate the search UI strings, update `site.searchPlaceholder`,
  `site.searchNoResults`, and `site.searchHint` in both i18n files.

Project list rendering
- Project list containers MUST have `data-project-list="<category>"` where
  category is one of: `research`, `personal`. Both lists are driven by the
  same JSON file; the entry's `category` field picks the list.
