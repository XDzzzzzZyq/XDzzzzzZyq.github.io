GSAP usage
- Register plugins once per page (ScrollTrigger, SplitText).
- Prefer a single timeline per section.
- Keep selectors stable; prefer ids or data- attributes.

ScrollTrigger
- Use clear start/end values with scrub where appropriate.
- Disable markers for production.

Performance
- Avoid heavy layout thrashing; keep transforms GPU-friendly.
- Debounce resize-driven recalculations where needed.
