---
name: translate
description: Translate UI strings (i18n JSON) and/or project markdown bodies between English and Chinese for the /research/ area of the site. Supports scoped runs (all, by project slug, by file path, by git diff). Use this whenever new UI copy, new projects, or new markdown content is added in one language and needs parity in the other.
license: MIT
compatibility: opencode
---

## What I do

I keep `research/i18n/en.json` and `research/i18n/cn.json` in lock-step, and
keep `research/projects/<slug>.md` and `<slug>.cn.md` in lock-step. I
support four scopes, picked by the user's request:

| Scope            | Trigger phrases                                                     | What I touch                                                       |
|------------------|---------------------------------------------------------------------|--------------------------------------------------------------------|
| All content      | "translate everything", "fill in missing translations", "sync i18n"| Every i18n JSON, every project markdown pair                       |
| By project slug  | "translate project A", "把 opengl-renderer 翻译成中文"                | Both markdown files for that slug only                             |
| By file path     | "translate research/i18n/en.json", "translate this file"            | That single file (translate into the other language)              |
| By git diff      | "translate what changed", "translate unstaged", "translate HEAD~1"  | Only files changed vs. the chosen git ref                          |

Default translation direction: detect from filenames.

- `*.cn.md` → translate to English (`*.md`)
- `*.md` (in `research/projects/`) → translate to Chinese (`*.cn.md`)
- `research/i18n/en.json` → translate to Chinese → write to `cn.json`
- `research/i18n/cn.json` → translate to English → write to `en.json`
- `research/i18n/<other>.json` → ask the user which language to target

If the user explicitly says a direction (e.g. "translate to Chinese"),
honor it even if filename-based detection would disagree.

## Project layout I work with

```
research/
  i18n/
    en.json                # English UI strings
    cn.json                # Chinese UI strings
  data/
    projects.json          # project registry (NOT translated; keys stay in English)
  projects/
    <slug>.md              # English project body, required
    <slug>.cn.md           # Chinese project body, required for parity
  index.html               # uses data-i18n="..." attributes
  project.html             # uses data-i18n="..." attributes
  js/i18n.js               # loads dictionary, applies translations
  js/project.js            # picks <slug>.<lang>.md at render time
```

Key constraints:

- `research/data/projects.json` keys are NOT translated. The `slug` field is
  a stable identifier used in URLs and filenames. Field names stay in
  English. The English *values* inside JSON entries (title, summary,
  abstract, status, details) are likewise not translated via this skill —
  they are short labels rendered in cards where the rest of the page is
  already in the active language. If the user wants those translated,
  treat it as a one-off request and ask before doing it.
- The detail page falls back to the other language if the requested
  `<slug>.<lang>.md` is missing. So leaving a `.cn.md` empty or
  untranslated will silently show English to Chinese readers. The
  verification step (below) catches this.

## Workflow

1. **Read the instruction files first.** Pull up
   `.github/instructions/research.instructions.md` and
   `.github/instructions/structure.instructions.md` so any project
   conventions are fresh in mind.

2. **Resolve scope.** Map the user's request to one of the four scopes
   above. If the request is ambiguous, ask ONE clarifying question with
   concrete options before proceeding.

3. **Load current state.**
   - For i18n: read BOTH `research/i18n/en.json` AND `cn.json` to compute
     the set of keys that are present in one but missing in the other.
     Translate only the missing keys. Never blindly overwrite an
     existing translation without checking it — the user may have already
     edited it.
   - For markdown: read BOTH `<slug>.md` and `<slug>.cn.md`. If the
     source file has changed since the last sync (e.g. new sections,
     changed phrasing), translate the diff. If the target file is empty
     or missing, translate the whole source.
   - For git diff scope: run `git diff --name-only <ref>` to enumerate
     changed files. Translate only those, choosing the direction
     filename-by-filename as above. Use `git diff <ref> -- <file>` to
     see exactly what changed and minimize unnecessary churn.

4. **Translate.**
   - Preserve markdown structure exactly: heading levels, lists, code
     fences, blockquotes, links, image alt text, tables, and inline
     emphasis must survive round-tripping.
   - Preserve file-internal anchors and link targets unchanged — only
     the human-readable text changes.
   - For i18n JSON, keep keys unchanged; translate the values. Use
     safe HTML (`<code>`, `<strong>`, etc.) only when the source value
     uses it; never introduce new tags.
   - Match the project's existing tone and terminology. Read 2-3
     existing target-language strings first to learn the voice.

5. **Write the targets.**
   - JSON: write the updated dictionary, keeping the original key
     ordering where possible. Use `Write` (overwrite) only when keys
     were added or removed; for value-only changes prefer `Edit` to
     minimize diff size.
   - Markdown: write the entire target file when translating from
     scratch; use `Edit` for partial updates.
   - For git-diff scope, write only the touched file(s).

6. **Verify.**
   - Run `python3 -c "import json; json.load(open('research/i18n/en.json'))"`
     and the same for `cn.json` — both must parse.
   - For markdown, list `research/projects/` and confirm every slug
     has both `.md` and `.cn.md`, and that no file is empty
     (`size > 0`).
   - If the i18n keys referenced in `research/index.html` and
     `research/project.html` were changed, recompute the
     coverage: extract `data-i18n="..."` paths from both HTML
     files and confirm each one resolves in both dictionaries.
   - Optionally start the local server (`python3 -m http.server
     5500 --bind 127.0.0.1` from the repo root) and curl
     `?lang=cn` to make sure the page still 200s.

7. **Report.** Tell the user which files were touched, which keys
   were added, and which markdown sections were updated. If a
   scope was inferred, name it explicitly so the user can
   correct course.

## When NOT to use me

- Translating the user's English bio into a third language not yet
  supported by the site → tell the user to add a new language first
  (see "Adding a new language" below).
- Translating content OUTSIDE `research/` (e.g. `design/index.html`,
  `index.html`, `AGENTS.md`, instruction files) → ask first; that
  is a different scope.
- Editing translations because the user wants a *better* English
  wording (not a translation) → defer to general writing skill.

## Adding a new language

When the user wants to add a third language (e.g. `ja`):

1. Copy `research/i18n/en.json` → `research/i18n/<code>.json`.
2. Add the code to `SUPPORTED` in `research/js/i18n.js`.
3. Tell the user the slug pair convention is `<slug>.<code>.md`
   alongside the existing `<slug>.md` and `<slug>.cn.md`.
4. Update `.opencode/skills/translate/SKILL.md` (this file) to
   include the new code in the default-direction rules above.
5. Update the lang switcher labels in both dictionaries
   (`site.langLabel`, `site.langOther`).

## Reference: existing project voices to match

- Voice: technical, direct, third-person-light. No marketing fluff.
- "concrete" not "robust" (the site uses "robust" in the CV already;
  prefer "reliable" or "stable" in markdown where natural).
- Code identifiers, paper titles, library names, and URLs are
  NEVER translated.
- Chinese voice: 简洁、技术化、避免营销腔。论文名、库名、URL 保持英文。
