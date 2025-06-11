document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();
    let fact = 1.0;

    const sun = document.querySelector('.sun');
    const arc = document.querySelector('.arc-path');
    const cir1 = document.querySelector('.cir1');
    const cir2 = document.querySelector('.cir2');
    const off = "-=90%";

    const length = arc.getTotalLength();
    gsap.set(arc, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
    gsap.set(cir2, { autoAlpha: 0 }); // Instantly hide cir2 before animation
    gsap.set(arc, { strokeDashoffset: length }); // Already present, ensures arc is hidden
    console.log("Length of arc: " + length);

    tl.fromTo(sun, 
        {
            scale: 5,
        },
        {
            scale: 1,
            duration: 0.5 * fact,
            ease: "power3.out",
        }, 0);
    tl.fromTo(sun, 
        {
            rotationZ: 0,
            rotationY: 180,
        },
        {
            rotationZ: 180,
            rotationY: 0,
            duration: 1.5 * fact,
            ease: "power2.out",
        }, 0);
    tl.to(sun, {
        rotation: "+=90",
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".title",
            start: "top 25%",
            end: "bottom top",
            scrub: 0.5,
            markers: true,
        }
        }, 0);
    tl.fromTo(cir1, { scale: 0 }, { 
        scale: 1, 
        duration: 1 * fact,
        transformOrigin: "50% 50%" }, "<");
    tl.to(arc, {
      strokeDashoffset: 0,
      duration: 1.0 * fact,
      ease: "power2.out"
    }, off);
    tl.set(cir2, { autoAlpha: 1 }, "<"); // Show cir2 before animating
    tl.fromTo(
        cir2,
        { rotation: -90, }, // Start hidden and rotated
        { rotation: 0, duration: 1 * fact, transformOrigin: "-150% 50%", ease: "power2.out" },
        "<"
    );

    let split = new SplitText(".xdzzyq", { type: "chars" });
    tl.from(split.chars, {
        duration: 0.5 * fact,
        autoAlpha: 0,
        yPercent: "random(-100, 100)",
        stagger: {
            amount: 0.5 * fact,
            from: "random"
        }
    }, off);

    const arrow = document.querySelector('.arrow');

    tl.fromTo(arrow, { opacity: 0 }, { 
        y: "+=10", opacity: 1, 
        duration: 0.5 }, off);
});
