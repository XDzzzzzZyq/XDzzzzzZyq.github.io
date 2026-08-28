import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "./config/animation";

gsap.registerPlugin(ScrollTrigger);

/**
 * Progressive panel reveal for the research and design areas.
 *
 * Every panel marked with `data-reveal` starts slightly lower and fully
 * transparent, then fades up when it scrolls into view, batched so panels on
 * the same row come in together with a small stagger. The hidden state is
 * first held by the `reveal-pending` class on <html> (set inline in the head,
 * so nothing flashes), then handed over to inline styles here.
 *
 * Inline transforms are cleared when a panel finishes, otherwise they would
 * fight the translateY hover states on cards.
 */
const GATE_CLASS = "reveal-pending";
const root = document.documentElement;
const panels = gsap.utils.toArray<HTMLElement>("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (panels.length === 0 || reduceMotion) {
  root.classList.remove(GATE_CLASS);
} else {
  const shift = config.reveal.shiftMultiplier * config.gridPx;

  gsap.set(panels, { opacity: 0, y: shift, willChange: "transform, opacity" });
  root.classList.remove(GATE_CLASS);

  ScrollTrigger.batch(panels, {
    start: config.reveal.start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: config.reveal.duration,
        ease: config.reveal.ease,
        stagger: config.reveal.stagger,
        overwrite: true,
        clearProps: "opacity,transform,willChange",
      }),
  });

  // Lazy-loaded covers change panel offsets after the triggers are created,
  // so re-measure once everything has settled.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
