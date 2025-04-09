document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to hero sections
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Add animation for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        galleryItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }
    
    // Handle 360° video/image interaction
    const aScene = document.querySelector('a-scene');
    if (aScene) {
        // Add loading indicator
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Loading 360° Experience...';
        loadingText.style.position = 'absolute';
        loadingText.style.top = '50%';
        loadingText.style.left = '50%';
        loadingText.style.transform = 'translate(-50%, -50%)';
        loadingText.style.color = 'white';
        loadingText.style.fontSize = '1.5rem';
        loadingText.style.zIndex = '999';
        
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.style.position = 'relative';
            videoContainer.appendChild(loadingText);
        }
        
        // Remove loading text when scene is loaded
        aScene.addEventListener('loaded', function() {
            if (loadingText.parentNode) {
                loadingText.parentNode.removeChild(loadingText);
            }
        });
        
        // Add instructions for mobile users
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const mobileInstructions = document.createElement('div');
            mobileInstructions.textContent = 'Move your device to look around';
            mobileInstructions.style.position = 'absolute';
            mobileInstructions.style.bottom = '20px';
            mobileInstructions.style.left = '50%';
            mobileInstructions.style.transform = 'translateX(-50%)';
            mobileInstructions.style.color = 'white';
            mobileInstructions.style.background = 'rgba(0,0,0,0.5)';
            mobileInstructions.style.padding = '10px 20px';
            mobileInstructions.style.borderRadius = '20px';
            mobileInstructions.style.zIndex = '999';
            
            if (videoContainer) {
                videoContainer.appendChild(mobileInstructions);
                
                // Hide instructions after 5 seconds
                setTimeout(() => {
                    mobileInstructions.style.opacity = '0';
                    mobileInstructions.style.transition = 'opacity 1s ease';
                }, 5000);
            }
        }
    }
});