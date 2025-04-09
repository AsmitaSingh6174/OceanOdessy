//navbar

function showSidebar(){
    const sidebar=document.querySelector('.sidebar')
    sidebar.style.display='flex'
}
function hideSidebar(){
     const sidebar=document.querySelector('.sidebar')
    sidebar.style.display='none'
}

// Parallax effect for sections
const parallaxSections = document.querySelectorAll('.parallax-section');

window.addEventListener('scroll', () => {
    parallaxSections.forEach(section => {
        const speed = section.getAttribute('data-speed');
        const yPos = -(window.scrollY * speed);
        section.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Animated boxes appear on scroll
const animatedBoxes = document.querySelectorAll('.animated-box');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

animatedBoxes.forEach(box => {
    observer.observe(box);
});

// 3D card effect for stat boxes
const statBoxes = document.querySelectorAll('.stat-box');

statBoxes.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xAxis = (rect.width / 2 - x) / 15;
        const yAxis = (rect.height / 2 - y) / 15;
        
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});

// Water ripple effect for headers
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('header, .parallax-section');
    
    headers.forEach(header => {
        header.addEventListener('mousemove', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            header.appendChild(ripple);
            
            ripple.style.left = `${e.pageX - header.offsetLeft}px`;
            ripple.style.top = `${e.pageY - header.offsetTop}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 2000);
        });
    });
});

// Animated counter for stats
const statNumbers = document.querySelectorAll('.stat-box h3');

function animateCounter(el) {
    const target = parseInt(el.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = el.textContent.includes('%') ? `${target}%` : `${target.toLocaleString()}`;
            clearInterval(timer);
        } else {
            el.textContent = el.textContent.includes('%') ? `${Math.floor(current)}%` : `${Math.floor(current).toLocaleString()}`;
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});
