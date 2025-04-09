document.addEventListener("DOMContentLoaded", function () {
    const animatedBox = document.querySelector(".animated-box");

    function checkScroll() {
        const boxPosition = animatedBox.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (boxPosition < screenHeight * 0.85) {
            animatedBox.classList.add("show");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once in case the box is already in view
});