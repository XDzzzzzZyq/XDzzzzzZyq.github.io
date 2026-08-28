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

suns.forEach((sun) => {
  const delay = Number(sun.dataset.delay ?? 0);

  const intro = gsap.timeline({
    delay,
    paused: true,
  });

  intro.fromTo(
    sun,
    { scale: config.hero.sunScaleStart },
    {
      scale: config.hero.sunScaleEnd,
      duration: config.hero.sunScaleDuration,
      ease: config.hero.sunScaleEase,
    },
    0
  );

  intro.fromTo(
    sun,
    {
      rotationZ: config.hero.sunRotateZStart,
      rotationY: config.hero.sunRotateYStart,
    },
    {
      rotationZ: config.hero.sunRotateZEnd,
      rotationY: config.hero.sunRotateYEnd,
      duration: config.hero.sunRotateDuration,
      ease: config.hero.sunRotateEase,
    },
    0
  );

  ScrollTrigger.create({
    trigger: sun,
    start: "top bottom",
    once: true,
    onEnter: () => intro.play(),
  });

  gsap.to(sun, {
    rotation: "+=" + config.hero.sunScrollRotation,
    ease: config.hero.sunScrollEase,
    scrollTrigger: {
      trigger: sun,
      start: config.hero.sunScrollStart,
      end: config.hero.sunScrollEnd,
      scrub: config.hero.sunScrollScrub,
      markers: config.hero.scrollMarkers,
    },
  });
});
