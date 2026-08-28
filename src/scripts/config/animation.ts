const readVar = (name: string, fallback: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const readNumber = (name: string, fallback: number): number => {
  const value = parseFloat(readVar(name, String(fallback)));
  return Number.isNaN(value) ? fallback : value;
};

const readBool = (name: string, fallback: boolean): boolean => {
  const value = readVar(name, "").toLowerCase();
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

const readUnit = (name: string, fallback: string): string => readVar(name, fallback);

export const readGridPx = (): number => {
  const columns = readNumber("--grid-columns", 48);
  return columns > 0 ? window.innerWidth / columns : 0;
};

export const gridPxValue = (): number => readGridPx();

export const config = {
  get gridPx() {
    return readGridPx();
  },
  reveal: {
    shiftMultiplier: readNumber("--anim-reveal-shift-multiplier", 0.4),
    duration: readNumber("--anim-reveal-duration", 0.55),
    stagger: readNumber("--anim-reveal-stagger", 0.07),
    ease: readUnit("--anim-reveal-ease", "power2.out"),
    start: readUnit("--anim-reveal-start", "top 94%"),
  },
  hero: {
    sunScaleStart: readNumber("--anim-sun-scale-start", 5),
    sunScaleEnd: readNumber("--anim-sun-scale-end", 1),
    sunScaleDuration: readNumber("--anim-sun-scale-duration", 0.5),
    sunScaleEase: readUnit("--anim-sun-scale-ease", "power3.out"),
    sunRotateZStart: readNumber("--anim-sun-rotate-z-start", 0),
    sunRotateZEnd: readNumber("--anim-sun-rotate-z-end", 180),
    sunRotateYStart: readNumber("--anim-sun-rotate-y-start", 180),
    sunRotateYEnd: readNumber("--anim-sun-rotate-y-end", 0),
    sunRotateDuration: readNumber("--anim-sun-rotate-duration", 1.5),
    sunRotateEase: readUnit("--anim-sun-rotate-ease", "power2.out"),
    sunScrollRotation: readNumber("--anim-sun-scroll-rotation", 90),
    sunScrollEase: readUnit("--anim-sun-scroll-ease", "power1.inOut"),
    sunScrollStart: readUnit("--anim-sun-scroll-start", "top 25%"),
    sunScrollEnd: readUnit("--anim-sun-scroll-end", "bottom top"),
    sunScrollScrub: readNumber("--anim-sun-scroll-scrub", 0.5),
    scrollMarkers: readBool("--anim-scroll-markers", false),
    cir1ScaleDuration: readNumber("--anim-cir1-scale-duration", 1),
    arcDrawDuration: readNumber("--anim-arc-draw-duration", 1),
    arcDrawEase: readUnit("--anim-arc-draw-ease", "power2.out"),
    cir2RotationStart: readNumber("--anim-cir2-rotation-start", -90),
    cir2RotationEnd: readNumber("--anim-cir2-rotation-end", 0),
    cir2RotationDuration: readNumber("--anim-cir2-rotation-duration", 1),
    cir2TransformOrigin: readUnit("--anim-cir2-origin", "-150% 50%"),
    cir2Ease: readUnit("--anim-cir2-ease", "power2.out"),
    splitDuration: readNumber("--anim-split-duration", 0.5),
    splitYRandom: readUnit("--anim-split-y-random", "random(-100, 100)"),
    splitStaggerAmount: readNumber("--anim-split-stagger-amount", 0.5),
    arrowFadeDuration: readNumber("--anim-arrow-fade-duration", 0.5),
    arrowYOffsetMultiplier: readNumber("--anim-arrow-y-offset-multiplier", 0.2),
    timelineOverlap: readUnit("--anim-timeline-overlap", "-=90%"),
    svgSizes: {
      cir1Multiplier: readNumber("--cir1-size-multiplier", 2),
      cir2Multiplier: readNumber("--cir2-size-multiplier", 1),
      arcSvgSizeMultiplier: readNumber("--arc-svg-size-multiplier", 2.9),
    },
  },
};
