import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "./config/animation";

gsap.registerPlugin(ScrollTrigger);

/**
 * Background suns reuse the hero sun's motion (scale-in, dual-axis rotate,
 * then a scrubbed rotation while scrolling) and read the same --anim-* CSS
 * variables. Each one plays its intro when it scrolls into view instead of
 * on load, so a 5x scale-in never sweeps across the viewport unprompted.
 */
const suns = gsap.utils.toArray<HTMLElement>("[data-bg-sun]");

/**
 * An area retunes the marks with these tokens on its own body class; the
 * fallbacks are the hero values, so research keeps the original entrance.
 */
const areaStyles = getComputedStyle(document.body);
const areaVar = (name: string, fallback: string): string =>
  areaStyles.getPropertyValue(name).trim() || fallback;
const areaNumber = (name: string, fallback: number): number => {
  const value = parseFloat(areaStyles.getPropertyValue(name));
  return Number.isNaN(value) ? fallback : value;
};

/**
 * The scale the entrance starts from, tweened down to --anim-sun-scale-end.
 * "off" drops the scale and leaves the turn as the whole entrance; unset falls
 * back to the hero's own start scale.
 */
const sunScaleIn = areaVar("--anim-bg-sun-scale", "on") !== "off";
const sunScaleStart = areaNumber("--anim-bg-sun-scale", config.hero.sunScaleStart);
/** Seconds added per mark, so a screenful arrives in order instead of at once. */
const sunStagger = areaNumber("--anim-bg-sun-stagger", 0);
const sunScrollStart = areaVar("--anim-bg-sun-scroll-start", config.hero.sunScrollStart);
const sunScrollEnd = areaVar("--anim-bg-sun-scroll-end", config.hero.sunScrollEnd);
/**
 * "off" keeps the entrance in the screen plane: only rotationZ turns, so the
 * mark never reads as a flat mirror the way an unperspectived rotateY does.
 */
const sunRotateY = areaVar("--anim-bg-sun-rotate-y", "on") !== "off";
/**
 * "on" sums the entrance turn and the scrubbed turn. Off — the hero behaviour —
 * two separate tweens own the same rotationZ, so the scrubbed one overrides the
 * entrance instead of building on it.
 */
const sunRotateAdds = areaVar("--anim-bg-sun-rotate-additive", "off") === "on";
/**
 * "with-rotation" holds a mark out of sight through its stagger delay and shows
 * it the instant its turn starts — no fade, just the two things at once. The
 * default shows every mark straight away and only the turn is delayed.
 */
const sunAppearsWithTurn = areaVar("--anim-bg-sun-appear", "immediate") === "with-rotation";

const startSun = (sun: HTMLElement, index: number) => {
  const delay = Number(sun.dataset.delay ?? 0) + index * sunStagger;

  const intro = gsap.timeline({
    delay,
    paused: true,
  });

  if (sunAppearsWithTurn) {
    intro.set(sun, { autoAlpha: 1 }, 0);
  }

  if (sunScaleIn) {
    intro.fromTo(
      sun,
      { scale: sunScaleStart },
      {
        scale: config.hero.sunScaleEnd,
        duration: config.hero.sunScaleDuration,
        ease: config.hero.sunScaleEase,
      },
      0
    );
  }

  const scrollTurn = {
    trigger: sun,
    start: sunScrollStart,
    end: sunScrollEnd,
    scrub: config.hero.sunScrollScrub,
    markers: config.hero.scrollMarkers,
  };

  if (sunRotateAdds) {
    /* Two tweens cannot share rotationZ, so each turn owns a plain number and
       the element is written the sum of the two. */
    const turn = { intro: config.hero.sunRotateZStart, scroll: 0 };
    const applyTurn = () => gsap.set(sun, { rotationZ: turn.intro + turn.scroll });

    intro.to(
      turn,
      {
        intro: config.hero.sunRotateZEnd,
        duration: config.hero.sunRotateDuration,
        ease: config.hero.sunRotateEase,
        onUpdate: applyTurn,
      },
      0
    );

    gsap.to(turn, {
      scroll: config.hero.sunScrollRotation,
      ease: config.hero.sunScrollEase,
      onUpdate: applyTurn,
      scrollTrigger: scrollTurn,
    });
  } else {
    intro.fromTo(
      sun,
      { rotationZ: config.hero.sunRotateZStart },
      {
        rotationZ: config.hero.sunRotateZEnd,
        duration: config.hero.sunRotateDuration,
        ease: config.hero.sunRotateEase,
      },
      0
    );

    gsap.to(sun, {
      rotation: "+=" + config.hero.sunScrollRotation,
      ease: config.hero.sunScrollEase,
      scrollTrigger: scrollTurn,
    });
  }

  if (sunRotateY) {
    intro.fromTo(
      sun,
      { rotationY: config.hero.sunRotateYStart },
      {
        rotationY: config.hero.sunRotateYEnd,
        duration: config.hero.sunRotateDuration,
        ease: config.hero.sunRotateEase,
      },
      0
    );
  }

  ScrollTrigger.create({
    trigger: sun,
    start: "top bottom",
    once: true,
    onEnter: () => intro.play(),
  });
};

/**
 * Pages can hold the marks back by putting data-bg-suns-hold on the container:
 * the design hub does that so they play with its section title rather than
 * alongside the cover logo, and releases them with a "bg-suns:release" event.
 * Without the attribute — the research area — nothing waits.
 */
const startAll = () => suns.forEach((sun, index) => startSun(sun, index));

if (sunAppearsWithTurn) {
  gsap.set(suns, { autoAlpha: 0 });
}

if (document.querySelector(".bg-suns[data-bg-suns-hold]")) {
  window.addEventListener("bg-suns:release", startAll, { once: true });
} else {
  startAll();
}
