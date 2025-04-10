
 document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            easing: 'ease-in-out',
            delay: 100
        });
    } else {
        console.warn('AOS library not loaded. Skipping initialization.');
    }

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }

    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                animateTextReveal();
            }, 500);
        }
    }, 2000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (document.querySelector('.sidebar') && 
                    document.querySelector('.sidebar').style.display === 'flex') {
                    hideSidebar();
                }
            }
        });
    });

    if (window.innerWidth > 768) { 
        const oceanDescription = document.querySelector('.ocean-description');
        const heroImage = document.querySelector('.hero-image');
        const oceanLayers = document.querySelectorAll('.layer');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // description
            if (oceanDescription) {
                oceanDescription.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
            
            //image
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * -0.08}px)`;
            }
        //layers
            oceanLayers.forEach((layer, index) => {
                const depth = layer.getAttribute('data-depth') || (index + 1) * 0.2;
                layer.style.transform = `translateX(${scrollPosition * depth * 0.1}px)`;
            });
        });
    }

    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.scrollY;
        
        if (currentScrollPosition > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    // hover effects for cards
    const marineCards = document.querySelectorAll('.marine-card');
    marineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const factBox = this.querySelector('.fact-box');
            if (factBox) {
                factBox.style.backgroundColor = '#b3e5fc';
            }
            
            // card_rotation
            const cardInner = this.querySelector('.card-inner');
            if (cardInner) {
                cardInner.style.transform = 'rotateY(180deg) scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const factBox = this.querySelector('.fact-box');
            if (factBox) {
                factBox.style.backgroundColor = '#e0f7fa';
            }
            
            const cardInner = this.querySelector('.card-inner');
            if (cardInner) {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        });
    });

    // Handle back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initFloatingElements();
    initOceanLayersInteraction();
    initCustomCursor();
    preloadImages();
});

function animateTextReveal() {
    const titleElement = document.querySelector('.title-animated');
    if (titleElement) {
        titleElement.classList.add('animate');
    }
}

// floating animations
function initFloatingElements() {
    //cutiee bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const randomX = Math.random() * 10 - 5; 
        bubble.style.animation = `bubble-rise ${15 + Math.random() * 10}s infinite ease-in`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.transform = 'translateX(0)';
        bubble.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(${randomX}px)` },
                { transform: 'translateX(0)' }
            ],
            {
                duration: 3000 + Math.random() * 2000,
                iterations: Infinity,
                easing: 'ease-in-out',
                direction: 'alternate'
            }
        );
    });

    const fishes = document.querySelectorAll('.fish');
    fishes.forEach(fish => {
        const randomSize = 0.5 + Math.random() * 1.5;
        const randomSpeed = 25 + Math.random() * 15;
        const randomDelay = Math.random() * 10;
        const randomY = Math.random() * 20 - 10;
        
        fish.style.transform = `scale(${randomSize})`;
        fish.style.animation = `fish-swim ${randomSpeed}s linear infinite`;
        fish.style.animationDelay = `-${randomDelay}s`;
        
        //vertical movement
        fish.animate(
            [
                { transform: `scale(${randomSize}) translateY(0)` },
                { transform: `scale(${randomSize}) translateY(${randomY}px)` },
                { transform: `scale(${randomSize}) translateY(0)` }
            ],
            {
                duration: 5000 + Math.random() * 3000,
                iterations: Infinity,
                easing: 'ease-in-out',
                direction: 'alternate'
            }
        );
    });
}

// ocean layers
function initOceanLayersInteraction() {
    const layers = document.querySelectorAll('.layer');
    
    layers.forEach(layer => {
        layer.addEventListener('mouseenter', () => {
            layer.style.transform = 'scale(1.05) translateX(10px)';
            layer.style.boxShadow = 'var(--shadow-lg)';
            layer.style.zIndex = '5';
        });
        
        layer.addEventListener('mouseleave', () => {
            layer.style.transform = '';
            layer.style.boxShadow = 'var(--shadow-md)';
            layer.style.zIndex = '1';
        });
    });
}
// cursour effect
function initCustomCursor() {
    if (window.innerWidth <= 768) return; 
    
    const interactiveElements = document.querySelectorAll('.btn, .marine-card, .layer, .action, a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'auto';
        });
    });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            // ripple element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            heroSection.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        // ripple style
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: fixed;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 1s linear;
                pointer-events: none;
                z-index: 10;
            }
            
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    width: 0;
                    height: 0;
                    opacity: 0.5;
                }
                100% {
                    transform: scale(1);
                    width: 500px;
                    height: 500px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// nav sidebar
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';

    //animation
    sidebar.style.animation = 'slideIn 0.3s forwards';
    document.body.style.overflow = 'hidden';
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.filter = 'blur(3px)';
        mainContent.style.transition = 'filter 0.3s ease';
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) return;

    // sidebar_animation
    sidebar.style.animation = 'slideOut 0.3s forwards';

    setTimeout(() => {
        sidebar.style.display = 'none';
        document.body.style.overflow = 'auto';

        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.filter = 'blur(0)';
        }
    }, 300);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.style.display === 'flex') {
            hideSidebar();
        }
    }
});

if (!document.querySelector('style[data-id="sidebar-animations"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-id', 'sidebar-animations');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }

        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
}

function preloadImages() {
    const images = [
        'Images/whale.jpeg',
        'Images/occtopus.jpeg',
        'Images/shark.jpeg',
        'Images/wave.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous"; 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.primary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const wave = button.querySelector('.btn-wave');
            if (wave) {
                wave.style.animation = 'none';
                setTimeout(() => {
                    wave.style.animation = 'wave-animation-btn 1.5s infinite';
                }, 10);
            }
        });
    });
});

// 3D tilt effect to images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('.conservation-image, .marine-card');
    
    images.forEach(image => {
        image.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            this.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale3d(1.05, 1.05, 1.05)`;
            this.style.transition = 'transform 0.1s';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.5s';
        });
    });
});