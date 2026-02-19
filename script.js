// ===========================
// CURSOR GLOW FOLLOW
// ===========================
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
});

// Card hover glow follow
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

// ===========================
// STARS CANVAS BACKGROUND
// ===========================
const starsCanvas = document.getElementById('starsCanvas');
const starsCtx = starsCanvas.getContext('2d');

function resizeStarsCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
}
resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        // Mix of blue and grey-white stars
        this.isGrey = Math.random() > 0.6;
    }
    draw(time) {
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.5 + 0.5;
        const alpha = this.opacity * twinkle;
        starsCtx.beginPath();
        starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starsCtx.fillStyle = this.isGrey 
            ? `rgba(209, 213, 219, ${alpha})` 
            : `rgba(147, 197, 253, ${alpha})`;
        starsCtx.fill();

        // Glow
        starsCtx.beginPath();
        starsCtx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        starsCtx.fillStyle = this.isGrey
            ? `rgba(156, 163, 175, ${alpha * 0.08})`
            : `rgba(59, 130, 246, ${alpha * 0.1})`;
        starsCtx.fill();
    }
}

const stars = Array.from({ length: 150 }, () => new Star());

function animateStars(time) {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(star => star.draw(time));
    requestAnimationFrame(animateStars);
}
requestAnimationFrame(animateStars);

// ===========================
// FLOATING HEARTS GENERATOR
// ===========================
const floatingHeartsContainer = document.getElementById('floatingHearts');
const heartEmojis = ['💙', '🩵', '💎', '🦋', '✨', '🤍'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--duration', (Math.random() * 6 + 5) + 's');
    heart.style.setProperty('--delay', '0s');
    heart.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

setInterval(createFloatingHeart, 2000);

// ===========================
// SCROLL ANIMATIONS (Intersection Observer)
// ===========================
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay * 150);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ===========================
// ENVELOPE INTERACTION
// ===========================
const envelope = document.getElementById('envelope');
let envelopeOpen = false;

envelope.addEventListener('click', () => {
    envelopeOpen = !envelopeOpen;
    envelope.classList.toggle('open', envelopeOpen);
    
    if (envelopeOpen) {
        // Burst hearts on open
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createClickHeart(
                envelope.getBoundingClientRect().left + envelope.offsetWidth / 2,
                envelope.getBoundingClientRect().top
            ), i * 100);
        }
    }
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💙';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 1s ease-out';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 150}px, ${-100 - Math.random() * 100}px) scale(0)`;
        heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1200);
}

// ===========================
// CONSTELLATION CANVAS
// ===========================
const constCanvas = document.getElementById('constellationCanvas');
const constCtx = constCanvas.getContext('2d');
const constStars = [];
const maxConstDistance = 150;

function resizeConstCanvas() {
    const rect = constCanvas.getBoundingClientRect();
    constCanvas.width = rect.width;
    constCanvas.height = rect.height;
}
resizeConstCanvas();
window.addEventListener('resize', resizeConstCanvas);

class ConstellationStar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > constCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > constCanvas.height) this.vy *= -1;
    }
}

constCanvas.addEventListener('click', (e) => {
    const rect = constCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    constStars.push(new ConstellationStar(x, y));
    
    // Limit stars to prevent performance issues
    if (constStars.length > 60) constStars.shift();
});

function drawConstellation(time) {
    constCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);

    // Draw connections
    for (let i = 0; i < constStars.length; i++) {
        for (let j = i + 1; j < constStars.length; j++) {
            const dx = constStars[i].x - constStars[j].x;
            const dy = constStars[i].y - constStars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxConstDistance) {
                const alpha = (1 - dist / maxConstDistance) * 0.5;
                constCtx.beginPath();
                constCtx.moveTo(constStars[i].x, constStars[i].y);
                constCtx.lineTo(constStars[j].x, constStars[j].y);
                constCtx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
                constCtx.lineWidth = 1;
                constCtx.stroke();
            }
        }
    }

    // Draw stars
    constStars.forEach(star => {
        star.update();
        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.4 + 0.8;
        
        // Outer glow
        constCtx.beginPath();
        constCtx.arc(star.x, star.y, star.size * 4 * pulse, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(59, 130, 246, 0.08)`;
        constCtx.fill();

        // Inner glow
        constCtx.beginPath();
        constCtx.arc(star.x, star.y, star.size * 2 * pulse, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(96, 165, 250, 0.15)`;
        constCtx.fill();

        // Core
        constCtx.beginPath();
        constCtx.arc(star.x, star.y, star.size * pulse, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(191, 219, 254, ${0.8 * pulse})`;
        constCtx.fill();
    });

    requestAnimationFrame(drawConstellation);
}
requestAnimationFrame(drawConstellation);

// ===========================
// LOVE BUTTON
// ===========================
const loveBtn = document.getElementById('loveBtn');
const heartCountEl = document.getElementById('heartCount');
let heartCount = parseInt(localStorage.getItem('heartCount') || '0');
heartCountEl.textContent = heartCount;

loveBtn.addEventListener('click', (e) => {
    heartCount++;
    heartCountEl.textContent = heartCount;
    localStorage.setItem('heartCount', heartCount);

    // Create burst effect
    const rect = loveBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = cx + 'px';
            heart.style.top = cy + 'px';
            heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            document.body.appendChild(heart);

            requestAnimationFrame(() => {
                const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.5;
                const distance = 80 + Math.random() * 60;
                heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px) scale(0) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => heart.remove(), 1500);
        }, i * 60);
    }
});

// ===========================
// VYBZ KARTEL DANCEHALL PLAYER 🎶
// ===========================
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;
let player = null;
let currentTrack = 0;

// Vybz Kartel love songs (YouTube video IDs)
const playlist = [
    { id: 'pLgQMfaFMoA', title: 'Vybz Kartel - Sometimes Love Dies' },
    { id: 'CflpGXx5MsU', title: 'Vybz Kartel - Colouring This Life' },
    { id: 'V6vGNPCkMnE', title: 'Vybz Kartel - I Promise You' },
    { id: '7v6RbGGF11M', title: 'Vybz Kartel - My Heaven My Hell' },
    { id: 'kC2SMXy7_Hk', title: 'Vybz Kartel - Forever' },
];

// Now Playing display
const nowPlaying = document.createElement('div');
nowPlaying.id = 'nowPlaying';
nowPlaying.className = 'now-playing';
nowPlaying.innerHTML = `
    <div class="now-playing-inner">
        <span class="np-icon">🎶</span>
        <span class="np-text">Click 🎵 to play</span>
        <div class="np-controls">
            <button class="np-btn" id="prevTrack">⏮</button>
            <button class="np-btn" id="nextTrack">⏭</button>
        </div>
    </div>
`;
document.body.appendChild(nowPlaying);

// Create hidden YouTube iframe for audio
function createPlayer(videoId) {
    // Remove old iframe if exists
    const oldFrame = document.getElementById('ytPlayer');
    if (oldFrame) oldFrame.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'ytPlayer';
    iframe.width = '0';
    iframe.height = '0';
    iframe.style.position = 'absolute';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.allow = 'autoplay';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&enablejsapi=1`;
    document.body.appendChild(iframe);
    
    updateNowPlaying();
}

function updateNowPlaying() {
    const text = nowPlaying.querySelector('.np-text');
    text.textContent = playlist[currentTrack].title;
    nowPlaying.classList.add('visible');
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    if (isPlaying) createPlayer(playlist[currentTrack].id);
    updateNowPlaying();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    if (isPlaying) createPlayer(playlist[currentTrack].id);
    updateNowPlaying();
}

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        // Stop
        const frame = document.getElementById('ytPlayer');
        if (frame) frame.remove();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
        nowPlaying.classList.remove('visible');
    } else {
        // Play
        createPlayer(playlist[currentTrack].id);
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
    }
    isPlaying = !isPlaying;
});

document.getElementById('prevTrack').addEventListener('click', (e) => {
    e.stopPropagation();
    prevTrack();
});
document.getElementById('nextTrack').addEventListener('click', (e) => {
    e.stopPropagation();
    nextTrack();
});

// ===========================
// PARALLAX ON SCROLL
// ===========================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const landing = document.querySelector('.landing-content');
    if (landing) {
        landing.style.transform = `translateY(${scrollY * 0.3}px)`;
        landing.style.opacity = 1 - scrollY / 600;
    }
});

// ===========================
// CLICK ANYWHERE HEARTS
// ===========================
document.addEventListener('click', (e) => {
    // Don't create hearts on interactive elements
    if (e.target.closest('button, .envelope, canvas')) return;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createClickHeart(e.clientX, e.clientY), i * 80);
    }
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
