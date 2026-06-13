import { config, readGridPx, gridPxValue } from "./config/animation.js";

const updateCircleSizes = () => {
  const cir1 = document.querySelector(".cir1");
  const cir2 = document.querySelector(".cir2");
  if (!cir1 || !cir2) return;

  const grid = readGridPx();
  cir1.setAttribute("width", grid * config.hero.svgSizes.cir1Multiplier);
  cir1.setAttribute("height", grid * config.hero.svgSizes.cir1Multiplier);
  let circle = cir1.querySelector("circle");
  circle.setAttribute("r", grid * config.hero.svgSizes.cir1Multiplier / 2);
  circle.setAttribute("cx", grid * config.hero.svgSizes.cir1Multiplier / 2);
  circle.setAttribute("cy", grid * config.hero.svgSizes.cir1Multiplier / 2);

  cir2.setAttribute("width", grid * config.hero.svgSizes.cir2Multiplier);
  cir2.setAttribute("height", grid * config.hero.svgSizes.cir2Multiplier);
  circle = cir2.querySelector("circle");
  circle.setAttribute("r", grid * config.hero.svgSizes.cir2Multiplier / 2);
  circle.setAttribute("cx", grid * config.hero.svgSizes.cir2Multiplier / 2);
  circle.setAttribute("cy", grid * config.hero.svgSizes.cir2Multiplier / 2);
};

const updateSvgSizes = () => {
  const arcSvg = document.querySelector("svg[data-size='arc']");
  if (!arcSvg) return;
  const size = gridPxValue() * config.hero.svgSizes.arcSvgSizeMultiplier;
  arcSvg.setAttribute("width", size);
  arcSvg.setAttribute("height", size);
};

const initHeroAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);

  const sun = document.querySelector(".sun");
  const arc = document.querySelector(".arc-path");
  const cir1 = document.querySelector(".cir1");
  const cir2 = document.querySelector(".cir2");
  const arrow = document.querySelector(".arrow");
  if (!sun || !arc || !cir1 || !cir2 || !arrow) return;

  const off = config.hero.timelineOverlap;
  const tl = gsap.timeline();

  const length = arc.getTotalLength();
  gsap.set(arc, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  gsap.set(cir2, { autoAlpha: 0 });
  gsap.set(arc, { strokeDashoffset: length });

  tl.fromTo(
    sun,
    { scale: config.hero.sunScaleStart },
    {
      scale: config.hero.sunScaleEnd,
      duration: config.hero.sunScaleDuration,
      ease: config.hero.sunScaleEase
    },
    0
  );
  tl.fromTo(
    sun,
    {
      rotationZ: config.hero.sunRotateZStart,
      rotationY: config.hero.sunRotateYStart
    },
    {
      rotationZ: config.hero.sunRotateZEnd,
      rotationY: config.hero.sunRotateYEnd,
      duration: config.hero.sunRotateDuration,
      ease: config.hero.sunRotateEase
    },
    0
  );
  tl.to(
    sun,
    {
      rotation: "+=" + config.hero.sunScrollRotation,
      ease: config.hero.sunScrollEase,
      scrollTrigger: {
        trigger: ".title",
        start: config.hero.sunScrollStart,
        end: config.hero.sunScrollEnd,
        scrub: config.hero.sunScrollScrub,
        markers: config.hero.scrollMarkers
      }
    },
    0
  );
  tl.fromTo(
    cir1,
    { scale: 0 },
    {
      scale: 1,
      duration: config.hero.cir1ScaleDuration,
      transformOrigin: "50% 50%"
    },
    "<"
  );
  tl.to(
    arc,
    {
      strokeDashoffset: 0,
      duration: config.hero.arcDrawDuration,
      ease: config.hero.arcDrawEase
    },
    off
  );
  tl.set(cir2, { autoAlpha: 1 }, "<");
  tl.fromTo(
    cir2,
    { rotation: config.hero.cir2RotationStart },
    {
      rotation: config.hero.cir2RotationEnd,
      duration: config.hero.cir2RotationDuration,
      transformOrigin: config.hero.cir2TransformOrigin,
      ease: config.hero.cir2Ease
    },
    "<"
  );

  const split = new SplitText(".xdzzyq", { type: "chars" });
  tl.from(
    split.chars,
    {
      duration: config.hero.splitDuration,
      autoAlpha: 0,
      yPercent: config.hero.splitYRandom,
      stagger: {
        amount: config.hero.splitStaggerAmount,
        from: "random"
      }
    },
    off
  );

  tl.fromTo(
    arrow,
    { opacity: 0 },
    {
      y: gridPxValue() * config.hero.arrowYOffsetMultiplier,
      opacity: 1,
      duration: config.hero.arrowFadeDuration
    },
    off
  );
};

document.addEventListener("DOMContentLoaded", () => {
  updateCircleSizes();
  updateSvgSizes();
  initHeroAnimation();
});

window.addEventListener("resize", () => {
  updateCircleSizes();
  updateSvgSizes();
});
