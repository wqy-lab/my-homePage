// ── Matrix Rain ──
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\';
const SIZE  = 14;
let drops   = [];

function initDrops() {
    const cols = Math.floor(canvas.width / SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
}
initDrops();

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drops.forEach((y, i) => {
        // head character — bright
        ctx.fillStyle = '#afffaf';
        ctx.font = `bold ${SIZE}px monospace`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * SIZE, y * SIZE);

        // trail — dim green
        ctx.fillStyle = '#00cc44';
        ctx.font = `${SIZE}px monospace`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * SIZE, (y - 1) * SIZE);

        if (y * SIZE > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 0.5;
    });
}

setInterval(drawMatrix, 40);

window.addEventListener('resize', () => {
    resize();
    initDrops();
});

// ── Typewriter ──
const MOTTO   = '不为失败找理由，只为成功找方法';
const target  = document.getElementById('typewriter');
const cursor  = document.querySelector('.cursor');
let idx = 0;

function type() {
    if (idx < MOTTO.length) {
        target.textContent += MOTTO[idx++];
        setTimeout(type, 120 + Math.random() * 60);
    } else {
        // done — keep cursor blinking, occasionally retype
        setTimeout(retype, 6000);
    }
}

function retype() {
    // erase
    const erase = setInterval(() => {
        if (target.textContent.length === 0) {
            clearInterval(erase);
            idx = 0;
            setTimeout(type, 500);
        } else {
            target.textContent = target.textContent.slice(0, -1);
        }
    }, 40);
}

setTimeout(type, 1000);
