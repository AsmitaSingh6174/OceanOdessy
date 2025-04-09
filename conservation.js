document.addEventListener("DOMContentLoaded", function() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function updateParallax() {
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
            const yPos = -(window.scrollY * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateParallax);
    
    // Initial update
    updateParallax();
    
    // Handle animated elements
    const animatedBoxes = document.querySelectorAll(".animated-box");

    function checkScroll() {
        animatedBoxes.forEach(box => {
            const boxPosition = box.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (boxPosition < screenHeight * 0.85) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once in case elements are already in view
});