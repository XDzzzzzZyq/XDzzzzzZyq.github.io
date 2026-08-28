import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { config, readGridPx } from "./config/animation";

gsap.registerPlugin(CustomEase);

/**
 * Home intro: the mark rises into its resting place and the two selector cards
 * follow it up and fade in. One curve drives all three moves.
 *
 * Nothing waits for the move before it to land. The hold cuts into the tail of
 * the mark's own timeline — that timeline lives in scripts/title.ts and is
 * deliberately left untouched, so the wait is a plain hold rather than a
 * callback — and the cards start before the mark has settled. The overlap is
 * what keeps the sequence from feeling like a queue.
 *
 * Both rises write a CSS variable instead of tweening `y`. The resting positions
 * are percentage translates, and GSAP bakes the computed matrix into pixels the
 * moment it takes a transform over, which would freeze the centring at whatever
 * the window measured on load.
 *
 * The fade is on the cards themselves rather than on the group around them. An
 * ancestor with opacity below 1 becomes the backdrop root for everything inside
 * it, so the cards' backdrop-filter has nothing left to sample and the frosted
 * glass only appears on the frame the fade ends.
 */
const GATE_CLASS = "home-intro-pending";
const introRoot = document.documentElement;
const title = document.querySelector<HTMLElement>("[data-hero-title]");
const selector = document.querySelector<HTMLElement>(".selector");
const cards = document.querySelectorAll<HTMLElement>(".selector-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A path token is a hand-drawn CustomEase curve; anything else is an ease name. */
const introEase = (token: string): gsap.EaseFunction | string => {
  if (!token.startsWith("M")) return token;
  try {
    return CustomEase.create("homeIntro", token);
  } catch {
    return "power2.inOut";
  }
};

if (!title || !selector || cards.length === 0 || reduceMotion) {
  introRoot.classList.remove(GATE_CLASS);
} else {
  const { hold, duration, riseMultiplier, selectorRiseMultiplier, selectorOffset } =
    config.homeIntro;
  const ease = introEase(config.homeIntro.ease);
  const grid = readGridPx();

  const rise = { title: grid * riseMultiplier, cards: grid * selectorRiseMultiplier };
  const applyTitle = () => title.style.setProperty("--home-intro-rise", `${rise.title}px`);
  const applyCards = () =>
    selector.style.setProperty("--home-intro-selector-rise", `${rise.cards}px`);

  applyTitle();
  applyCards();
  gsap.set(cards, { autoAlpha: 0 });
  introRoot.classList.remove(GATE_CLASS);

  const intro = gsap.timeline({ delay: hold });

  intro.to(
    rise,
    {
      title: 0,
      duration,
      ease,
      onUpdate: applyTitle,
      // Handing the offset back to the stylesheet keeps the mark centred when
      // the window is resized, the same way the design cover releases its lift.
      onComplete: () => title.style.removeProperty("--home-intro-rise"),
    },
    0
  );

  const cardsStart = duration * selectorOffset;

  intro.to(
    rise,
    {
      cards: 0,
      duration,
      ease,
      onUpdate: applyCards,
      onComplete: () => selector.style.removeProperty("--home-intro-selector-rise"),
    },
    cardsStart
  );

  intro.to(
    cards,
    { autoAlpha: 1, duration, ease, clearProps: "opacity,visibility" },
    cardsStart
  );
}
