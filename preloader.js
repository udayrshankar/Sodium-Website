const milPreloader = document.querySelector('.mil-preloader');
const links = document.querySelectorAll('a');

function preventDefault(event) {
    event.preventDefault(); // Prevent default link behavior
}

if (milPreloader) {
    // Add event listeners to prevent default behavior DURING preload
    links.forEach(link => {
        link.addEventListener('click', preventDefault);
    });

    var timeline = gsap.timeline({
        onComplete: () => { // Use onComplete in the timeline
            milPreloader.remove();

            // VERY IMPORTANT: Remove event listeners AFTER preloader is gone
            links.forEach(link => {
                link.removeEventListener('click', preventDefault);
            });
        }
    });

    timeline.to(".mil-preloader-animation", { opacity: 1 });
    timeline.fromTo(".mil-animation-1 .mil-h3", { y: "30px", opacity: 0 }, { y: "0px", opacity: 1, stagger: 0.4 });
    timeline.to(".mil-animation-1 .mil-h3", { opacity: 0, y: '-30' }, "+=.3");
    timeline.fromTo(".mil-reveal-box", 0.1, { opacity: 0 }, { opacity: 1, x: '-30' });
    timeline.to(".mil-reveal-box", 0.45, { width: "100%", x: 0 }, "+=.1");
    timeline.to(".mil-reveal-box", { right: "0" });
    timeline.to(".mil-reveal-box", 0.3, { width: "0%" });
    timeline.fromTo(".mil-animation-2 .mil-h3", { opacity: 0 }, { opacity: 1 }, "-=.5");
    timeline.to(".mil-animation-2 .mil-h3", 0.6, { opacity: 0, y: '-30' }, "+=.5");
    timeline.to(".mil-preloader", 0.8, { opacity: 0, ease: 'sine' }, "+=.2");
    timeline.fromTo(".mil-up", 0.8, { opacity: 0, y: 40, scale: .98, ease: 'sine' }, { y: 0, opacity: 1, scale: 1 }, "-=1");
}