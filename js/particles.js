// GENERADOR DE PARTICULAS FLOTANTES PARA EL FONDO
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    document.body.prepend(particlesContainer);

    const particleCount = 40; // Cantidad de partículas flotantes

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particle.style.opacity = Math.random() * 0.6 + 0.2;

    container.appendChild(particle);
}