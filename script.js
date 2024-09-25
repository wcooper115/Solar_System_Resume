document.addEventListener("DOMContentLoaded", function() {
    const planets = document.querySelectorAll(".planet");
    let angle = 0;


    // Function to set the initial positions of the planets
    function setInitialPositions() {
        planets.forEach((planet, index) => {
            const radius = 150 + (index * 50); // Orbit radius: 150px + 50px for each planet
            const x = Math.cos(angle + index * Math.PI / 2) * radius; // Initial angle offset for each planet
            const y = Math.sin(angle + index * Math.PI / 2) * radius;

            // Apply the transform for the initial position
            planet.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    }
    // Function to rotate planets around their orbits
    function rotatePlanets() {
        planets.forEach((planet, index) => {
            const radius = 150 + (index * 50); // Match this with orbit ring sizes
            const x = Math.cos(angle + index * Math.PI / 2) * radius;
            const y = Math.sin(angle + index * Math.PI / 2) * radius;

            // Adjust position based on the solar system center (50%, 50%)
            planet.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${planet.classList.contains('hovered') ? 1.2 : 1})`;
        });
        angle += 0.0009; // Slow the rotation even more for smooth interactions
        requestAnimationFrame(rotatePlanets);
    }

    // Set initial positions right away
    setInitialPositions();

    rotatePlanets();

    // Hover effect for scaling planets
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            planet.classList.add('hovered');
        });
        planet.addEventListener('mouseleave', () => {
            planet.classList.remove('hovered');
        });
    });

    // Function to handle showing overlay when a planet is clicked
    function setupPlanetClick(planetId, overlayId) {
        const planet = document.getElementById(planetId);
        const overlay = document.getElementById(overlayId);
        const backButton = overlay.querySelector('.backButton');

        planet.addEventListener('click', () => {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('show');
            }, 10); // Delay for smooth transition
        });

        backButton.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 500); // Matches the fade-out transition time
        });
    }

    // Set up event listeners for each planet
    setupPlanetClick('aboutMe', 'aboutMePage');
    setupPlanetClick('educationPlanet', 'educationPage');
    setupPlanetClick('workPlanet', 'workPage');
    setupPlanetClick('projectsPlanet', 'projectsPage');
    setupPlanetClick('skillsPlanet', 'skillsPage');

    // Function to create stars
    function createStars(numStars) {
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars');
        document.body.appendChild(starsContainer);

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Randomly position the stars within the viewport
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            // Random size for stars to add depth
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Add the star to the container
            starsContainer.appendChild(star);
        }
    }

    // Function to create shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight / 2; // Upper half of the screen

        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;

        // Append the shooting star to the body
        document.body.appendChild(shootingStar);

        // Remove shooting star after animation ends
        setTimeout(() => {
            shootingStar.remove();
        }, 1500); // Matches the animation duration
    }

    // Function to randomly trigger shooting stars
    function triggerShootingStars() {
        // Random interval between shooting stars (2 to 5 seconds)
        const randomDelay = Math.random() * 3000 + 2000;

        // Create a shooting star
        createShootingStar();

        // Repeat the process
        setTimeout(triggerShootingStars, randomDelay);
    }

    // Create 150 stars for the background
    createStars(150);

    // Start shooting stars
    triggerShootingStars();

    // Add starfield functionality
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let width, height, stars;

    function init() {
        resize();
        animate();
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = createStars(width, height, 100);
    }

    function createStars(width, height, count) {
        return Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5
        }));
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.x += 0.05;
            if (star.x > width) star.x = 0;
        });
        requestAnimationFrame(animate);
    }

    init();
    window.addEventListener('resize', resize);
});


