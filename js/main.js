document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();

    const sun = document.querySelector('.sun');
    const arc = document.querySelector('.arc');
    const cir1 = document.querySelector('.cir1');
    const cir2 = document.querySelector('.cir2');
    const off = "-=90%";

    tl.fromTo(sun, 
        {
            scale: 5,
        },
        {
            scale: 1,
            duration: 0.5,
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
            duration: 1.5,
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
    tl.fromTo(arc, { opacity: 0 }, { 
        opacity: 1, 
        duration: 1,
        transformOrigin: "50% 50%" }, off);
    tl.fromTo(cir1, { scale: 0 }, { 
        scale: 1, 
        duration: 1,
        transformOrigin: "50% 50%" }, off);
    tl.fromTo(cir2, { scale: 0 }, { 
        scale: 1, 
        duration: 1,
        transformOrigin: "50% 50%" }, off);

    let split = new SplitText(".xdzzyq", { type: "chars" });
    tl.from(split.chars, {
        duration: 0.5,
        autoAlpha: 0,
        yPercent: "random(-100, 100)",
        stagger: {
            amount: 0.5,
            from: "random"
        }
    }, off);

    const arrow = document.querySelector('.arrow');

    tl.fromTo(arrow, { y: -30, opacity: 0 }, { 
        y: -10, opacity: 1, 
        duration: 0.5 }, off);
});
