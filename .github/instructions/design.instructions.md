Design page scope
- /design/ showcases art works and the plugins/scripts you developed.
- Broad redesigns are allowed and encouraged.
- Chinese-first: /design/ is CN, /design/en/ is EN. Dictionaries live in
  src/content/design/{cn,en}.json, helpers in src/lib/design.ts.
- Nothing here links to / or /research/. The last nav entry is the About panel.

Visual direction
- Feel free to explore a new visual language, but keep a coherent identity.
- Keep typography intentional; avoid default system stacks.
- Use a clear layout rhythm (grid, column, or modular blocks).

Grid alignment
- Layout and alignment are computed from --grid-size, never from loose pixels.
  Use the --space-* scale on body.design-page (1/2/3 grid, plus /2, /4, /8).
- Fractional multiples are fine; 1px rules and hairlines are fine. What is not
  fine is an arbitrary pixel value standing in for a grid step.
- Control heights come from the grid as well, e.g. .link-button uses
  min-height: calc(var(--grid-size) * 1.25), so they stay in step on resize.

Content structure
- The hub lists three sections — Motion, Graphic and Tools (sectionIds in
  src/data/works.ts) — plus the About panel. Each section has its own page and
  each work its own detail page.
- Prefer cards or panels for works and tools with thumbnails, tags, and links.
- Work metadata lives in src/data/works.ts, including an optional video
  ({ bvid, cid }) that renders a Bilibili player iframe.
- Work images are hosted locally under public/design/assets/, not hotlinked.
- Displayed images opt into the zoom overlay through data-lightbox; the overlay
  itself lives in src/layouts/DesignLayout.astro and src/scripts/lightbox.ts.

Known traps
- Do not build the work wall with CSS multi-column. Safari stops repainting
  column fragments while a composited animation runs inside the container, so
  cards vanish during hover. The wall is a real grid with hand-dealt columns
  (.work-wall__col, flattened with display: contents on narrow screens).
- The home page mark (src/components/HeroTitle.astro, src/scripts/title.ts,
  src/styles/home.css) is shared with the design cover. Reuse it as is; do not
  refactor it for design's sake.

Refactor guidance
- Split large styles into section-level files when growth demands it.
- Keep shared tokens in src/styles/variables.css; area-only tokens belong on
  body.design-page in src/styles/design.css.
