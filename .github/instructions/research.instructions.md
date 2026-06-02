Research page scope
- /research/ is a separate homepage.
- It must surface two Notion note links and a publications list.
- It ships with built-in i18n (EN/CN), a search overlay, and per-project
  markdown detail pages.

Notion links
- Math note: https://marmalade-droplet-f1d.notion.site/e6337c9d7773493cbc182796a46552fe
- Machine Learning note: https://marmalade-droplet-f1d.notion.site/Machine-Learning-b25f839889ec4cd3917fa92b01e37b28
- Present these as prominent buttons or cards.

Publications list
- Use an ordered list (ol).
- Each item should include year, title, venue, and optional link.
- Keep the list easy to update (consider a future JSON or markdown source).

Visual direction
- This page can be visually distinct from /design/ but should still feel related.

Internationalization (i18n)
- UI strings live in `research/i18n/<lang>.json` (e.g. `en.json`, `cn.json`).
- Add new keys to BOTH dictionaries whenever you change UI text.
- HTML nodes opt in with `data-i18n="<dotted.path>"` (e.g. `data-i18n="nav.bio"`).
  Strings that contain safe inline markup may be rendered as `innerHTML`.
- The current language comes from the `?lang=<code>` query parameter, then
  `localStorage["xdzzyq.lang"]`, then defaults to `en`.
- The full page reloads on switch so that all scripts re-read the dictionary.
- The lang switcher in the nav lives at `a.lang-switch` and is bound by
  `research/js/i18n.js` — do not hand-write the href, the script does that.
- Adding a new language = adding `research/i18n/<code>.json` (same shape as
  `en.json`) and adding the code to `SUPPORTED` in `research/js/i18n.js`.
- Translate content via the `translate` skill at
  `.opencode/skills/translate/SKILL.md` — never hand-edit both dictionaries
  in one pass without cross-checking key parity.

Markdown project details
- Each project has its own markdown body at
  `research/projects/<slug>.md` (English) and `research/projects/<slug>.cn.md`
  (Chinese). The slug MUST match `slug` in `research/data/projects.json`.
- A slug is missing a language file? The detail page falls back to the other
  language silently — do not crash.
- The detail page lives at `research/project.html?slug=<slug>`.
- It loads `research/data/projects.json`, fetches the matching markdown
  based on the current language, and renders with
  `marked@12.0.2` + `DOMPurify@3.1.6` (both via CDN).
- Keep the markdown focused on long-form content: motivation, method,
  results, references. Short summaries and metadata belong in the JSON.
- All external links inside the markdown should be opened in a new tab;
  the renderer enforces `target="_blank" rel="noopener noreferrer"` on
  any `http(s)://` link.

Search overlay
- Lives at `.search-overlay` in `research/index.html` and
  `research/project.html`. Both pages include `research/js/search.js`.
- Index is built from `research/data/projects.json` (title, summary, tags,
  status). The full markdown body is NOT searched — keep index size small.
- Scoring: lower-cased substring match (highest), then subsequence match
  (typo tolerance). Weights: title × 3, tags × 1.4, summary × 0.6,
  status × 0.4. Top 10 results.
- Hotkeys: `Cmd+K` / `Ctrl+K` toggles, `/` opens, `Esc` closes, `↑`/`↓`
  navigate, `Enter` jumps. There is also a `data-search-open` button in
  the nav as a mouse fallback.
- To translate the search UI strings (placeholder, no-results, hint), update
  `site.searchPlaceholder`, `site.searchNoResults`, and `site.searchHint`
  in both `i18n/<lang>.json` files.

Project list rendering
- Project list containers MUST have `data-project-list="<category>"` where
  category is one of: `research`, `personal`. Both lists are driven by the
  same JSON file; the entry's `category` field picks the list.
- Loading and error states use the i18n keys `projects.loading` and
  `projects.loadError` so they translate with the rest of the page.
