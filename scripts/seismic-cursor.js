/**
 * SEISMIC RIPPLE CURSOR
 * Generates expanding "heat map" contours on cursor movement.
 */

const canvas = document.getElementById('seismic-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let ripples = [];
let mouse = { x: -100, y: -100 };
let lastMouse = { x: -100, y: -100 };

// Configuration
const CONFIG = {
    spawnRate: 30, // px distance to spawn new ripple
    decay: 0.008,   // Opacity fade per frame
    growth: 0.8,    // Radius expansion per frame
    maxRadius: 150,
    colors: [
        'rgba(255, 69, 0,',   // Deep Orange (Magma)
        'rgba(255, 215, 0,',  // Gold
        'rgba(166, 94, 68,',  // Terracotta
        'rgba(255, 140, 0,'   // Dark Orange
    ]
};

// Resize Handler
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Mouse Tracker
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Spawn ripple if moved enough
    const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
    if (dist > CONFIG.spawnRate) {
        ripples.push(new Ripple(mouse.x, mouse.y));
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
    }
});

/**
 * RIPPLE CLASS
 * An organic, irregular ring that expands and fades.
 */
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5 + Math.random() * 10;
        this.opacity = 1;
        this.colorVal = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.lineWidth = 1 + Math.random() * 2;

        // Generate organic variations (vertices)
        this.points = [];
        const segments = 12; // Number of points in the circle
        for (let i = 0; i < segments; i++) {
            // Add randomness to radius for "wobbly" organic look
            const variance = 0.8 + Math.random() * 0.4;
            this.points.push(variance);
        }
    }

    update() {
        this.radius += CONFIG.growth;
        this.opacity -= CONFIG.decay;
    }

    draw(ctx) {
        if (this.opacity <= 0) return;

        ctx.beginPath();
        const segments = this.points.length;

        for (let i = 0; i <= segments; i++) {
            const index = i % segments;
            const angle = (Math.PI * 2 * i) / segments;
            const r = this.radius * this.points[index];
            const px = this.x + Math.cos(angle) * r;
            const py = this.y + Math.sin(angle) * r;

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }

        ctx.closePath();
        ctx.strokeStyle = `${this.colorVal} ${this.opacity})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and Draw Ripples backwards (so new ones are on top)
    for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.update();
        r.draw(ctx);

        if (r.opacity <= 0) {
            ripples.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();
