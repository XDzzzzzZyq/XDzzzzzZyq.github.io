document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const sun = document.querySelector('.sun');
    const arc = document.querySelector('.arc');
    const cir1 = document.querySelector('.cir1');
    const cir2 = document.querySelector('.cir2');
    gsap.to(sun, { rotation: 360, duration: 3, scrollTrigger: {
        trigger: sun,
        scrub: true,
        markers: true
    } });
    gsap.fromTo(arc, { opacity: 0 }, { 
        opacity: 1, 
        duration: 1,
        transformOrigin: "50% 50%" });
    gsap.fromTo(cir1, { scale: 0 }, { 
        scale: 1, 
        duration: 1,
        transformOrigin: "50% 50%" });
    gsap.fromTo(cir2, { scale: 0 }, { 
        scale: 1, 
        duration: 1,
        transformOrigin: "50% 50%" });

    let split = new SplitText(".xdzzyq", { type: "chars" });
    gsap.from(split.chars, {
        duration: 0.5,
        autoAlpha: 0,
        yPercent: "random(-100, 100)",
        stagger: {
            amount: 0.5,
            from: "random"
        }
    });

    const arrow = document.querySelector('.arrow');

    gsap.fromTo(arrow, { y: -30, opacity: 0 }, { 
        y: -10, opacity: 1, 
        duration: 0.5 });
});
