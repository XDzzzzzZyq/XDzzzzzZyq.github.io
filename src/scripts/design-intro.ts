import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { readGridPx } from "./config/animation";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hub intro: the XDzZyq mark plays alone on a full screen, then the cover
 * slides up, brings the nav in and hands over to the section title.
 *
 * The mark's own timeline lives in scripts/title.ts and is deliberately left
 * untouched, so the wait below is a plain hold rather than a callback — keep
 * --anim-design-intro-hold a little longer than that timeline runs.
 *
 * Panels below the cover are already held back by scripts/reveal.ts; their
 * trigger positions were measured against the tall cover, so a
 * ScrollTrigger.refresh() partway through the slide is what lets the section
 * title fade in while the cover is still moving, rather than after it lands.
 */
const GATE_CLASS = "design-intro-pending";
const COLLAPSED_CLASS = "is-collapsed";
const introRoot = document.documentElement;
const splash = document.querySelector<HTMLElement>("[data-design-splash]");
const designNav = document.querySelector<HTMLElement>(".design-nav");
const bgSuns = document.querySelector<HTMLElement>(".bg-suns");
const introReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// These tokens sit on body.design-page rather than :root, so they are read here
// instead of through scripts/config/animation.ts.
const designStyles = getComputedStyle(document.body);
const introToken = (name: string, fallback: number): number => {
  const value = parseFloat(designStyles.getPropertyValue(name));
  return Number.isNaN(value) ? fallback : value;
};

if (!splash || !designNav || introReduceMotion) {
  splash?.classList.add(COLLAPSED_CLASS);
  introRoot.classList.remove(GATE_CLASS);
} else {
  const duration = introToken("--anim-design-intro-duration", 0.9);
  const ease = designStyles.getPropertyValue("--anim-design-intro-ease").trim() || "power2.inOut";
  const grid = readGridPx();
  const collapsedHeight = grid * introToken("--design-splash-collapsed-multiplier", 12);

  gsap.set(designNav, { autoAlpha: 0, y: grid * -0.5 });
  if (bgSuns) gsap.set(bgSuns, { autoAlpha: 0 });
  introRoot.classList.remove(GATE_CLASS);

  const intro = gsap.timeline({ delay: introToken("--anim-design-intro-hold", 2.2) });

  intro.to(
    splash,
    {
      height: collapsedHeight,
      duration,
      ease,
      onComplete: () => {
        // Hand the tweened pixel height back to the grid-based rule so the
        // cover keeps its proportions when the window is resized.
        splash.classList.add(COLLAPSED_CLASS);
        splash.style.height = "";
        ScrollTrigger.refresh();
      },
    },
    0
  );

  intro.to(
    designNav,
    {
      autoAlpha: 1,
      y: 0,
      duration: duration * 0.7,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform",
    },
    duration * 0.35
  );

  // Hand over mid-slide: once the panels below have been re-measured they are
  // already inside their trigger range, so the title starts fading up while the
  // cover is still on its way. The second pass settles the final positions.
  const handoff = duration * introToken("--anim-design-intro-handoff", 0.45);

  intro.call(() => ScrollTrigger.refresh(), undefined, handoff);

  // The background marks belong to the body copy, not to the cover, so they are
  // revealed with the title and then play their own scale-in from scratch —
  // bg-suns.ts waits for this event because the container carries
  // data-bg-suns-hold. No fade: the scale-in is the entrance.
  if (bgSuns) {
    intro.call(
      () => {
        gsap.set(bgSuns, { clearProps: "opacity,visibility" });
        window.dispatchEvent(new Event("bg-suns:release"));
      },
      undefined,
      handoff
    );
  }
}
