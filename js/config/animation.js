const readVar = (name, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const readNumber = (name, fallback) => {
  const value = parseFloat(readVar(name, fallback));
  return Number.isNaN(value) ? fallback : value;
};

const readBool = (name, fallback) => {
  const value = readVar(name, "").toLowerCase();
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

const readUnit = (name, fallback) => readVar(name, fallback);

const readGridPx = () => {
  const grid = readNumber("--grid-size", 5);
  return grid * window.innerHeight / 100;
};

const config = {
  gridPx: readGridPx(),
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
    arrowYOffset: readUnit("--anim-arrow-y-offset", "+=10"),
    timelineOverlap: readUnit("--anim-timeline-overlap", "-=90%"),
    svgSizes: {
      cir1Multiplier: readNumber("--cir1-size-multiplier", 2),
      cir2Multiplier: readNumber("--cir2-size-multiplier", 1),
      arcSvgSize: readUnit("--arc-svg-size", "145px")
    }
  }
};

export { config, readGridPx };
