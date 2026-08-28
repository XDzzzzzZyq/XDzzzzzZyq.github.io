GSAP usage
- Register plugins once per page (ScrollTrigger, SplitText, CustomEase).
- Prefer a single timeline per section.
- Keep selectors stable; prefer ids or data- attributes.
- Hero animation lives in `src/scripts/title.ts`; the design cover reuses it
  untouched through `src/components/HeroTitle.astro`.
- The home page intro lives in `src/scripts/home-intro.ts`: the mark rises into
  place while the two selector cards follow it up and fade in, all on
  `--anim-home-intro-ease`. Nothing waits for the move before it — the hold cuts
  into the tail of `title.ts` and the cards start before the mark settles.

Parameters live in CSS
- Durations, easings and offsets are CSS variables, read through
  `src/scripts/config/animation.ts`. Do not hardcode them in scripts.
- `readVar` reads from `document.documentElement`, so tokens scoped to an area
  (`body.design-page`) must be read from `document.body` in that area's script.
  `src/scripts/bg-suns.ts` and `src/scripts/design-intro.ts` show the pattern:
  read with a fallback to the shared value, so other areas keep their behaviour.
- An ease token starting with `M` is read as a CustomEase path, so a hand-drawn
  curve can be tuned in CSS. Parsing failures fall back to a named ease.

Hidden-until-animated
- Anything that starts invisible is first held by a gate class on `<html>`, set
  by an inline head script so nothing flashes before the bundle runs. The script
  then adopts the state as inline styles and drops the class. A timeout removes
  the gate as well, so a broken bundle cannot leave the page blank.
- One area can hold another script's animation: `.bg-suns[data-bg-suns-hold]`
  makes `bg-suns.ts` wait for a `bg-suns:release` event. Every code path that
  skips the intro must still fire that event.

ScrollTrigger
- Use clear start/end values with scrub where appropriate.
- Disable markers for production.
- Reveal triggers (`--anim-reveal-start`, `top 94%`) are measured against the
  page as it loads. Changing the height of anything above the fold — the design
  cover especially — can push a panel past its trigger and make its animation
  play before it is ever seen. Re-check the first screen after such a change.
- A load-time intro should pin the page to the top (`history.scrollRestoration`
  plus `scrollTo`), otherwise a reload restores the old scroll position and the
  intro plays off screen.

Reduced motion
- `reveal.ts`, `design-intro.ts` and `home-intro.ts` skip to the final state when
  `prefers-reduced-motion` is set. `title.ts` and `bg-suns.ts` do not check it
  yet — worth fixing when either is next touched.
- A script that skips its animation must still fire whatever event other scripts
  are waiting on, or they stay hidden forever.

Performance
- Avoid heavy layout thrashing; keep transforms GPU-friendly.
- Debounce resize-driven recalculations where needed.
- Two tweens cannot share one transform component. To add a scrubbed rotation on
  top of an entrance rotation, tween plain numbers and write the sum to the
  element (see `startSun` in `src/scripts/bg-suns.ts`).
- An element parked with a percentage translate must not be moved with a GSAP `x`
  or `y` tween. GSAP takes the computed matrix over and bakes the percentage into
  pixels, freezing the centring at the width measured on load. Tween a number and
  write a CSS variable the transform already composes instead —
  `--home-intro-rise` in `home-intro.ts` and `--splash-lift` in `design-intro.ts`
  both do this.
- Never fade a group that contains a `backdrop-filter`. An ancestor with opacity
  below 1 becomes the backdrop root for its subtree, so the filter has nothing to
  sample and the frosted glass only appears on the frame the fade ends. Fade the
  frosted elements themselves — `home-intro.ts` fades `.selector-card`, not
  `.selector`, for exactly this reason.
