// v3 Clean Design - Main Script
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------
    // 1. FLOATING ANIMATION (Idling)
    // ---------------------------------------------
    const floaters = document.querySelectorAll('.isometric-prop');

    floaters.forEach((el, i) => {
        // Randomize float parametrs so they don't sync up nicely (organic feel)
        const duration = 2.5 + Math.random();
        const yOffset = 15 + Math.random() * 10;

        gsap.to(el, {
            y: yOffset,
            duration: duration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5 // stagger start
        });
    });

    // ---------------------------------------------
    // 2. PARALLAX SCRUB (Scroll Movement)
    // move visuals slightly faster/slower than scroll
    // ---------------------------------------------
    gsap.utils.toArray('.isometric-prop').forEach(el => {
        gsap.to(el, {
            yPercent: -20, // Move up slightly as we scroll down
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom", // when top of element hits bottom of screen
                end: "bottom top",   // when bottom of element hits top of screen
                scrub: 1
            }
        });
    });

    // ---------------------------------------------
    // 3. FADE IN TEXT ELEMENTS
    // ---------------------------------------------
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const text = section.querySelector('.text-content');
        if (text) {
            gsap.from(text, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });

    console.log("v3 Clean System Initialized");
});
