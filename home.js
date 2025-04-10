// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        // Initialize AOS with custom settings
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

    // Initialize vanilla-tilt if loaded
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }

    // Show page content, hide loader
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Start title animation
                animateTextReveal();
            }, 500);
        }
    }, 2000);

    // Add smooth scrolling for all links
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
                
                // Close sidebar if open
                if (document.querySelector('.sidebar') && 
                    document.querySelector('.sidebar').style.display === 'flex') {
                    hideSidebar();
                }
            }
        });
    });

    // Add parallax effect to ocean description and other elements
    if (window.innerWidth > 768) { // Only on desktop
        const oceanDescription = document.querySelector('.ocean-description');
        const heroImage = document.querySelector('.hero-image');
        const oceanLayers = document.querySelectorAll('.layer');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Parallax for ocean description
            if (oceanDescription) {
                oceanDescription.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
            
            // Parallax for hero image
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * -0.08}px)`;
            }
            
            // Parallax for ocean layers
            oceanLayers.forEach((layer, index) => {
                const depth = layer.getAttribute('data-depth') || (index + 1) * 0.2;
                layer.style.transform = `translateX(${scrollPosition * depth * 0.1}px)`;
            });
        });
    }

    // Handle header scroll effect
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

    // Add hover effects to marine cards
    const marineCards = document.querySelectorAll('.marine-card');
    marineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const factBox = this.querySelector('.fact-box');
            if (factBox) {
                factBox.style.backgroundColor = '#b3e5fc';
            }
            
            // Add subtle rotation
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
            
            // Reset rotation
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

    // Show cookie consent after delay
    setTimeout(() => {
        const cookieConsent = document.getElementById('cookieConsent');
        if (cookieConsent && !localStorage.getItem('cookieAccepted')) {
            cookieConsent.style.display = 'block';
        }
    }, 3000);

    // Handle cookie acceptance
    const acceptCookiesButton = document.getElementById('acceptCookies');
    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', function() {
            localStorage.setItem('cookieAccepted', 'true');
            const cookieConsent = document.getElementById('cookieConsent');
            if (cookieConsent) {
                cookieConsent.style.opacity = '0';
                setTimeout(() => {
                    cookieConsent.style.display = 'none';
                }, 500);
            }
        });
    }

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const feedbackElement = this.querySelector('.form-feedback');
            
            // Simple validation
            if (email && email.includes('@')) {
                // Simulate submission success
                feedbackElement.textContent = 'Thank you for subscribing!';
                feedbackElement.style.color = '#4CAF50';
                this.reset();
                
                // Clear success message after delay
                setTimeout(() => {
                    feedbackElement.textContent = '';
                }, 5000);
            } else {
                feedbackElement.textContent = 'Please enter a valid email address.';
                feedbackElement.style.color = '#F44336';
            }
        });
    }

    // Initialize floating animations for bubbles and fish
    initFloatingElements();

    // Make ocean layers interactive
    initOceanLayersInteraction();

    // Add cursor effects
    initCustomCursor();

    // Preload images for better performance
    preloadImages();
});

// Title text animation
function animateTextReveal() {
    const titleElement = document.querySelector('.title-animated');
    if (titleElement) {
        titleElement.classList.add('animate');
    }
}

// Initialize floating animations
function initFloatingElements() {
    // Create random movements for bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        // Add random horizontal movement
        const randomX = Math.random() * 10 - 5; // Random value between -5 and 5
        bubble.style.animation = `bubble-rise ${15 + Math.random() * 10}s infinite ease-in`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add slight horizontal movement with CSS
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

    // Animate fish with random speeds and sizes
    const fishes = document.querySelectorAll('.fish');
    fishes.forEach(fish => {
        const randomSize = 0.5 + Math.random() * 1.5;
        const randomSpeed = 25 + Math.random() * 15;
        const randomDelay = Math.random() * 10;
        const randomY = Math.random() * 20 - 10;
        
        fish.style.transform = `scale(${randomSize})`;
        fish.style.animation = `fish-swim ${randomSpeed}s linear infinite`;
        fish.style.animationDelay = `-${randomDelay}s`;
        
        // Add vertical movement
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

// Make ocean layers interactive
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

// Custom cursor effect for interactive elements
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const interactiveElements = document.querySelectorAll('.btn, .marine-card, .layer, .action, a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'auto';
        });
    });
    
    // Add ripple effect on hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            // Position at click coordinates
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            
            // Add to DOM and remove after animation
            heroSection.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        // Add ripple style
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

// Navigation sidebar functions
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    sidebar.style.display = 'flex';

    // Add animation
    sidebar.style.animation = 'slideIn 0.3s forwards';

    // Prevent body scrolling when sidebar is open
    document.body.style.overflow = 'hidden';
    
    // Add blur effect to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.filter = 'blur(3px)';
        mainContent.style.transition = 'filter 0.3s ease';
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Add animation
    sidebar.style.animation = 'slideOut 0.3s forwards';

    // Wait for animation to complete before hiding
    setTimeout(() => {
        sidebar.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = 'auto';
        
        // Remove blur effect from main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.filter = 'blur(0)';
        }
    }, 300);
}

// Add keydown event to close sidebar with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.style.display === 'flex') {
            hideSidebar();
        }
    }
});

// Add animation for sidebar if not already added
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

// Preload images for better performance
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
        img.crossOrigin = "anonymous"; // Prevent CORS issues when using canvas
    });
}

// Add water wave effect to buttons
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

// Add dynamic 3D tilt effect to images
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