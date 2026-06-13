import { config, readGridPx, gridPxValue } from "./config/animation.js";

const TITLE_HTML = `
<img src="/res/elem/sun.svg" class="centered sun" alt="Sun">
<svg data-size="cir1" width="70" height="70" xmlns="http://www.w3.org/2000/svg" class="centered cir1">
    <circle cx="35" cy="35" r="35" fill="white" />
</svg>
<svg data-size="arc" width="145" height="145" xmlns="http://www.w3.org/2000/svg" class="centered arc" aria-hidden="true">
    <path class="arc-path" d="M0,72.5 A72.5,72.5 0 0,1 72.5,0"/>
</svg>
<svg data-size="cir2" width="35" height="35" xmlns="http://www.w3.org/2000/svg" class="centered cir2">
    <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
</svg>
<h1 class="centered xdzzyq">XDzZyq</h1>
<img src="/res/elem/arrow.svg" class="centered arrow" alt="Arrow">
`;

const injectTitle = (container) => {
  container.innerHTML = TITLE_HTML;
};

const getElements = (container) => ({
  sun: container.querySelector(".sun"),
  arcPath: container.querySelector(".arc-path"),
  cir1: container.querySelector(".cir1"),
  cir2: container.querySelector(".cir2"),
  arrow: container.querySelector(".arrow"),
});

const updateCircleSizes = (container) => {
  const grid = readGridPx();
  const cir1 = container.querySelector(".cir1");
  const cir2 = container.querySelector(".cir2");

  if (cir1) {
    cir1.setAttribute("width", grid * config.hero.svgSizes.cir1Multiplier);
    cir1.setAttribute("height", grid * config.hero.svgSizes.cir1Multiplier);
    const circle = cir1.querySelector("circle");
    circle.setAttribute("r", grid * config.hero.svgSizes.cir1Multiplier / 2);
    circle.setAttribute("cx", grid * config.hero.svgSizes.cir1Multiplier / 2);
    circle.setAttribute("cy", grid * config.hero.svgSizes.cir1Multiplier / 2);
  }

  if (cir2) {
    cir2.setAttribute("width", grid * config.hero.svgSizes.cir2Multiplier);
    cir2.setAttribute("height", grid * config.hero.svgSizes.cir2Multiplier);
    const circle = cir2.querySelector("circle");
    circle.setAttribute("r", grid * config.hero.svgSizes.cir2Multiplier / 2);
    circle.setAttribute("cx", grid * config.hero.svgSizes.cir2Multiplier / 2);
    circle.setAttribute("cy", grid * config.hero.svgSizes.cir2Multiplier / 2);
  }
};

const updateSvgSizes = (container) => {
  const arcSvg = container.querySelector("svg[data-size='arc']");
  if (!arcSvg) return;
  const size = gridPxValue() * config.hero.svgSizes.arcSvgSizeMultiplier;
  arcSvg.setAttribute("width", size);
  arcSvg.setAttribute("height", size);
};

const initHeroAnimation = (container) => {
  gsap.registerPlugin(ScrollTrigger);

  const { sun, arcPath, cir2, arrow } = getElements(container);
  const off = config.hero.timelineOverlap;
  const tl = gsap.timeline();

  const length = arcPath.getTotalLength();
  gsap.set(arcPath, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  gsap.set(cir2, { autoAlpha: 0 });
  gsap.set(arcPath, { strokeDashoffset: length });

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
    container.querySelector(".cir1"),
    { scale: 0 },
    {
      scale: 1,
      duration: config.hero.cir1ScaleDuration,
      transformOrigin: "50% 50%"
    },
    "<"
  );
  tl.to(
    arcPath,
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

const initTitle = (containerSelector = ".title") => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  injectTitle(container);

  // Wait for the browser to lay out the injected elements before GSAP
  // reads layout-dependent properties (SVG getTotalLength, etc.)
  requestAnimationFrame(() => {
    updateCircleSizes(container);
    updateSvgSizes(container);
    initHeroAnimation(container);
  });

  window.addEventListener("resize", () => {
    updateCircleSizes(container);
    updateSvgSizes(container);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initTitle());
} else {
  initTitle();
}

export { initTitle };
