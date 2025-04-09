const card = document.querySelector('.card');

document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
});

card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
});

card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

