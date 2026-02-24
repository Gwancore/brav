// === CURSOR GLOW ===
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
        card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
});

// === STARS CANVAS ===
const starsCanvas = document.getElementById('starsCanvas');
const starsCtx = starsCanvas.getContext('2d');
function resizeStarsCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
}
resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.isGrey = Math.random() > 0.6;
    }
    draw(time) {
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.5 + 0.5;
        const alpha = this.opacity * twinkle;
        starsCtx.beginPath();
        starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starsCtx.fillStyle = this.isGrey ? 'rgba(209,213,219,' + alpha + ')' : 'rgba(147,197,253,' + alpha + ')';
        starsCtx.fill();
        starsCtx.beginPath();
        starsCtx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        starsCtx.fillStyle = this.isGrey ? 'rgba(156,163,175,' + (alpha*0.08) + ')' : 'rgba(59,130,246,' + (alpha*0.1) + ')';
        starsCtx.fill();
    }
}
const stars = Array.from({ length: 150 }, () => new Star());
function animateStars(time) {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(s => s.draw(time));
    requestAnimationFrame(animateStars);
}
requestAnimationFrame(animateStars);

// === FLOATING HEARTS ===
const floatingHeartsContainer = document.getElementById('floatingHearts');
const heartEmojis = ['💙', '🩵', '💎', '🦋', '✨', '🤍'];
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--duration', (Math.random() * 6 + 5) + 's');
    heart.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
    floatingHeartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
}
setInterval(createFloatingHeart, 2500);

// === NAV TRACKING ===
const navLinks = document.querySelectorAll('.nav-link');
const roomLabel = document.getElementById('roomLabel');
const nav = document.getElementById('mainNav');
const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                if (link.getAttribute('href') === '#' + id) {
                    roomLabel.textContent = link.dataset.room;
                }
            });
        }
    });
}, { threshold: 0.3 });
allSections.forEach(s => sectionObserver.observe(s));
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// === SCROLL ANIMATIONS ===
const animateElements = document.querySelectorAll('[data-animate]');
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay * 150);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
animateElements.forEach(el => animObserver.observe(el));

// === GREETING & TIME ===
function updateGreeting() {
    const h = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    const timeEl = document.getElementById('currentTime');
    let g;
    if (h < 6) g = "Can't sleep, Chia? I'm here 🌙";
    else if (h < 12) g = "Good morning, beautiful ☀️";
    else if (h < 17) g = "Good afternoon, Chia ��️";
    else if (h < 21) g = "Good evening, my love 🌅";
    else g = "Good night, sweet dreams ahead 🌙";
    greetingEl.textContent = g;
    timeEl.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
updateGreeting();
setInterval(updateGreeting, 30000);

// === DAILY NOTE ===
const dailyNotes = [
    { title: "You Make the World Better", msg: "Just by existing, Chia. The world is brighter because you're in it. Never forget that." },
    { title: "You're Stronger Than You Know", msg: "Whatever today throws at you, remember: you've survived 100% of your bad days. You're incredible." },
    { title: "I'm So Proud of You", msg: "For everything you do, everything you are, and everything you're becoming. You amaze me, Bravine." },
    { title: "A Reminder", msg: "You deserve every good thing that comes your way. Don't let anyone — including yourself — tell you otherwise." },
    { title: "You're Not Alone", msg: "Whenever the world feels heavy, remember I'm right here. Always. You don't have to carry everything alone, Chia." },
    { title: "Today is Yours", msg: "This day belongs to you. Do what makes your soul happy. Be gentle with yourself. You're doing amazing." },
    { title: "Thank You", msg: "For being you. For your patience, your warmth, your beautiful heart. I'm the luckiest person alive, Chia." },
    { title: "Smile, Beautiful", msg: "That smile of yours could end wars and heal hearts. I hope something makes you smile wide today." },
    { title: "Dream Big, Chia", msg: "Every dream you have is valid. Every goal is possible. I believe in you more than words can say." },
    { title: "You Are Loved", msg: "Deeply, completely, unconditionally. Today and every day after. Don't ever doubt it, Bravine." },
    { title: "Take a Breath", msg: "If today is hard, just breathe. You don't have to be perfect. You just have to be you. That's enough." },
    { title: "My Favorite Person", msg: "Out of all the people on this planet, you're my absolute favorite. And I'd choose you in every lifetime." },
    { title: "Look How Far You've Come", msg: "Remember where you started and look where you are. That growth? That's all you, Chia. Be proud." },
    { title: "You Deserve Rest", msg: "It's okay to slow down. It's okay to do nothing. You don't have to earn rest. You deserve it." },
    { title: "Something Good is Coming", msg: "I can feel it. Something beautiful is on its way to you. Keep going, keep believing, Chia." },
    { title: "Your Energy is Magic", msg: "The way you light up a room without even trying — that's a superpower, Bravine." },
    { title: "I Choose You", msg: "Today, tomorrow, on the hard days and the easy ones. I choose you every single time." },
    { title: "Be Kind to Yourself", msg: "Talk to yourself the way I talk about you — with love, admiration, and so much respect." },
    { title: "You're My Peace", msg: "In a world full of chaos, you're my calm. My safe place. My home. Thank you, Chia." },
    { title: "Adventure Awaits", msg: "There are so many beautiful things we haven't done yet, places we haven't seen. I can't wait, Bravine." },
    { title: "I See You", msg: "Not just the strong you, but the tired you, the scared you, the silly you. And I love every version." },
    { title: "You Matter", msg: "Your feelings matter. Your thoughts matter. Your dreams matter. YOU matter. Always." },
    { title: "Keep Shining", msg: "Even when you don't feel like it, your light reaches people. You make a difference, Chia." },
    { title: "Sending You Love", msg: "Right now, across whatever distance, I'm sending you all my love. Can you feel it? 💙" },
    { title: "Tonight's Stars Are for You", msg: "Look up tonight. Those stars? I put them there for you. Okay maybe not, but I wish I could." },
    { title: "You're My Everything", msg: "My morning thought. My midnight smile. My forever plan. You, Bravine, are my everything." },
    { title: "No Bad Day Lasts Forever", msg: "If today was rough, it's almost over. Tomorrow is a fresh start. And I'll be there for it." },
    { title: "Let's Dance Through Life", msg: "With you, even the mundane feels magical. Let's keep dancing through it all, Chia." },
    { title: "I'm Grateful for You", msg: "For your patience with me, your love, your warmth. I don't say it enough — thank you, Bravine." },
    { title: "You Are Enough", msg: "Exactly as you are, right now, in this moment. You are enough. You always have been." },
    { title: "I Love You", msg: "Simple. True. Infinite. I love you, Chia. Today and for every day that follows." }
];
function loadDailyNote() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const note = dailyNotes[dayOfYear % dailyNotes.length];
    document.getElementById('dailyTitle').textContent = note.title;
    document.getElementById('dailyMessage').textContent = note.msg;
    document.getElementById('dailyDate').textContent = today.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}
loadDailyNote();

// === ENVELOPE ===
const envelope = document.getElementById('envelope');
let envelopeOpen = false;
envelope.addEventListener('click', () => {
    envelopeOpen = !envelopeOpen;
    envelope.classList.toggle('open', envelopeOpen);
    if (envelopeOpen) {
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
    heart.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;font-size:1.5rem;pointer-events:none;z-index:1000;transition:all 1s ease-out;';
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
        heart.style.transform = 'translate(' + ((Math.random()-0.5)*150) + 'px,' + (-100-Math.random()*100) + 'px) scale(0)';
        heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 1200);
}

// === CONSTELLATION ===
const constCanvas = document.getElementById('constellationCanvas');
const constCtx = constCanvas.getContext('2d');
const constStars = [];
function resizeConstCanvas() {
    const rect = constCanvas.getBoundingClientRect();
    constCanvas.width = rect.width;
    constCanvas.height = rect.height;
}
resizeConstCanvas();
window.addEventListener('resize', resizeConstCanvas);

class ConstellationStar {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 3 + 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > constCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > constCanvas.height) this.vy *= -1;
    }
}
constCanvas.addEventListener('click', (e) => {
    const rect = constCanvas.getBoundingClientRect();
    constStars.push(new ConstellationStar(e.clientX - rect.left, e.clientY - rect.top));
    if (constStars.length > 60) constStars.shift();
});
function drawConstellation(time) {
    constCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);
    for (let i = 0; i < constStars.length; i++) {
        for (let j = i + 1; j < constStars.length; j++) {
            const dx = constStars[i].x - constStars[j].x;
            const dy = constStars[i].y - constStars[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                constCtx.beginPath();
                constCtx.moveTo(constStars[i].x, constStars[i].y);
                constCtx.lineTo(constStars[j].x, constStars[j].y);
                constCtx.strokeStyle = 'rgba(96,165,250,' + ((1 - dist/150)*0.5) + ')';
                constCtx.lineWidth = 1;
                constCtx.stroke();
            }
        }
    }
    constStars.forEach(star => {
        star.update();
        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.4 + 0.8;
        constCtx.beginPath();
        constCtx.arc(star.x, star.y, star.size * 4 * pulse, 0, Math.PI * 2);
        constCtx.fillStyle = 'rgba(59,130,246,0.08)';
        constCtx.fill();
        constCtx.beginPath();
        constCtx.arc(star.x, star.y, star.size * pulse, 0, Math.PI * 2);
        constCtx.fillStyle = 'rgba(191,219,254,' + (0.8 * pulse) + ')';
        constCtx.fill();
    });
    requestAnimationFrame(drawConstellation);
}
requestAnimationFrame(drawConstellation);

// === DREAM BOARD ===
const dreamInput = document.getElementById('dreamInput');
const dreamBtn = document.getElementById('dreamBtn');
const dreamsCanvas = document.getElementById('dreamsCanvas');
const dreamCountEl = document.getElementById('dreamCount');
let dreams = JSON.parse(localStorage.getItem('chiaDreams') || '[]');

function renderDreams() {
    dreamsCanvas.innerHTML = '';
    dreams.forEach((dream, i) => {
        const bubble = document.createElement('div');
        bubble.className = 'dream-bubble';
        bubble.textContent = dream;
        bubble.style.left = (10 + Math.random() * 70) + '%';
        bubble.style.top = (10 + Math.random() * 70) + '%';
        bubble.style.animationDelay = (i * 0.5) + 's';
        bubble.style.animationDuration = (15 + Math.random() * 10) + 's';
        dreamsCanvas.appendChild(bubble);
    });
    dreamCountEl.textContent = dreams.length;
    document.getElementById('dreamsWritten').textContent = dreams.length;
}
function addDream() {
    const text = dreamInput.value.trim();
    if (!text) return;
    dreams.push(text);
    if (dreams.length > 20) dreams.shift();
    localStorage.setItem('chiaDreams', JSON.stringify(dreams));
    dreamInput.value = '';
    renderDreams();
}
dreamBtn.addEventListener('click', addDream);
dreamInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addDream(); });
renderDreams();

// === MOOD ===
const moodResponses = {
    happy: [
        "That makes me so happy, Chia! Your happiness is my happiness 💙",
        "Love to hear that! Keep that beautiful smile going ✨",
        "A happy Chia = the best thing in the world 😊"
    ],
    loved: [
        "Because you ARE so loved, Bravine. More than you'll ever know 💙",
        "Good. That's exactly how you should feel. Always. 🥰",
        "You deserve every bit of love the universe can give 💫"
    ],
    sad: [
        "I wish I could hold you right now, Chia. It's okay to feel this way. You're not alone 💙",
        "Hey... bad days don't last. But my love for you does. I'm here 🤍",
        "Let yourself feel it, then let it go. Better days are coming, I promise 🌙"
    ],
    tired: [
        "Rest, my love. You've done enough today. Tomorrow can wait 🌙",
        "Close your eyes for a bit, Chia. You deserve a break 💙",
        "Being tired means you've been giving your all. I'm so proud of you 🤍"
    ],
    anxious: [
        "Breathe with me, Chia. In... and out... You're safe. I'm right here 💙",
        "Whatever is worrying you — we'll figure it out. Together. Always. 🤍",
        "Your anxiety doesn't define you. You are brave. You are strong. You are loved 🌙"
    ],
    excited: [
        "YESSS! That energy! Tell me everything! 🤩💙",
        "I love seeing you excited, Bravine! Your joy is contagious ✨",
        "Channel that energy! The world isn't ready for you! 🔥💙"
    ],
    angry: [
        "It's okay to be frustrated. Feel it, then release it. I'm here 💙",
        "Whatever happened — your feelings are valid, Chia. Always. 🤍",
        "Take a deep breath. I'm on your side. Always and forever 💙"
    ],
    grateful: [
        "The world is grateful for YOU, Chia. Trust me on that 💙",
        "A grateful heart is a beautiful heart. And yours is the most beautiful of all 🙏",
        "I'm grateful too — for you. Every single day 💫"
    ]
};
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const mood = btn.dataset.mood;
        const responses = moodResponses[mood];
        const response = responses[Math.floor(Math.random() * responses.length)];
        const textEl = document.getElementById('moodResponseText');
        textEl.classList.remove('show');
        setTimeout(() => {
            textEl.textContent = response;
            textEl.classList.add('show');
        }, 200);
    });
});

// === MEMORY GAME ===
const gameEmojis = ['💙', '🦋', '✨', '🌙', '💎', '🌸', '🌊', '💫'];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let gameActive = true;

function initGame() {
    const board = document.getElementById('gameBoard');
    const winEl = document.getElementById('gameWin');
    board.innerHTML = '';
    winEl.classList.remove('show');
    flippedCards = [];
    matchedPairs = 0;
    moveCount = 0;
    gameActive = true;
    document.getElementById('moveCount').textContent = '0';
    const bestScore = localStorage.getItem('chiaBestScore');
    document.getElementById('bestScore').textContent = bestScore || '—';
    const deck = [...gameEmojis, ...gameEmojis];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.forEach((emoji, i) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.emoji = emoji;
        card.innerHTML = '<span class="card-front">' + emoji + '</span><span class="card-back">💙</span>';
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}
function flipCard(card) {
    if (!gameActive || card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        moveCount++;
        document.getElementById('moveCount').textContent = moveCount;
        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
            flippedCards.forEach(c => c.classList.add('matched'));
            flippedCards = [];
            matchedPairs++;
            if (matchedPairs === gameEmojis.length) {
                gameActive = false;
                const best = localStorage.getItem('chiaBestScore');
                if (!best || moveCount < parseInt(best)) {
                    localStorage.setItem('chiaBestScore', moveCount);
                    document.getElementById('bestScore').textContent = moveCount;
                }
                document.getElementById('gameWinText').textContent = moveCount + ' moves! You\'re amazing 💙';
                setTimeout(() => document.getElementById('gameWin').classList.add('show'), 500);
            }
        } else {
            gameActive = false;
            setTimeout(() => {
                flippedCards.forEach(c => c.classList.remove('flipped'));
                flippedCards = [];
                gameActive = true;
            }, 800);
        }
    }
}
document.getElementById('resetGame').addEventListener('click', initGame);
initGame();

// === LOVE BUTTON & STATS ===
const loveBtn = document.getElementById('loveBtn');
let heartCount = parseInt(localStorage.getItem('chiaHearts') || '0');
document.getElementById('heartsSent').textContent = heartCount;
let visits = parseInt(localStorage.getItem('chiaVisits') || '0');
visits++;
localStorage.setItem('chiaVisits', visits);
document.getElementById('visitsCount').textContent = visits;

loveBtn.addEventListener('click', () => {
    heartCount++;
    localStorage.setItem('chiaHearts', heartCount);
    document.getElementById('heartsSent').textContent = heartCount;
    const rect = loveBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.cssText = 'position:fixed;left:' + cx + 'px;top:' + cy + 'px;font-size:' + (0.8+Math.random()) + 'rem;pointer-events:none;z-index:1000;transition:all 1.2s cubic-bezier(0.16,1,0.3,1);';
            document.body.appendChild(heart);
            requestAnimationFrame(() => {
                const angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
                const dist = 80 + Math.random() * 60;
                heart.style.transform = 'translate(' + (Math.cos(angle)*dist) + 'px,' + (Math.sin(angle)*dist - 50) + 'px) scale(0) rotate(' + (Math.random()*360) + 'deg)';
                heart.style.opacity = '0';
            });
            setTimeout(() => heart.remove(), 1500);
        }, i * 60);
    }
});

// === EASTER EGGS ===
let secretsFound = JSON.parse(localStorage.getItem('chiaSecrets') || '[]');
const secretToast = document.getElementById('secretToast');
const secretToastText = document.getElementById('secretToastText');
const secretsCounter = document.getElementById('secretsCounter');
const secretsFoundEl = document.getElementById('secretsFound');

function updateSecretsUI() {
    secretsFoundEl.textContent = secretsFound.length;
    if (secretsFound.length > 0) secretsCounter.classList.add('show');
}
updateSecretsUI();

function revealSecret(id, message) {
    if (secretsFound.includes(id)) return;
    secretsFound.push(id);
    localStorage.setItem('chiaSecrets', JSON.stringify(secretsFound));
    updateSecretsUI();
    secretToastText.textContent = message;
    secretToast.classList.add('show');
    setTimeout(() => secretToast.classList.remove('show'), 3500);
}

// Secret 1: Triple-click the title
let titleClicks = 0;
let titleClickTimer;
document.querySelector('.title-reveal').addEventListener('click', () => {
    titleClicks++;
    clearTimeout(titleClickTimer);
    titleClickTimer = setTimeout(() => { titleClicks = 0; }, 600);
    if (titleClicks >= 3) {
        revealSecret('title', 'Secret #1: "You found the hidden heartbeat! I love you x1000"');
        titleClicks = 0;
    }
});

// Secret 2: Hold the love button for 3 seconds
let loveBtnTimer;
loveBtn.addEventListener('mousedown', () => {
    loveBtnTimer = setTimeout(() => {
        revealSecret('hold', 'Secret #2: "Holding on forever — just like my love for you, Chia"');
    }, 3000);
});
loveBtn.addEventListener('mouseup', () => clearTimeout(loveBtnTimer));
loveBtn.addEventListener('mouseleave', () => clearTimeout(loveBtnTimer));

// Secret 3: Scroll to the very bottom
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= scrollMax - 5 && window.scrollY > lastScrollTop) {
        revealSecret('bottom', 'Secret #3: "You reached the very end... but our story never ends 💙"');
    }
    lastScrollTop = window.scrollY;
});

// === MUSIC PLAYER TOGGLE ===
const musicPlayerBody = document.getElementById('musicPlayerBody');
const musicPlayerToggle = document.getElementById('musicPlayerToggle');
const mpArrow = document.getElementById('mpArrow');
let playerOpen = false;
musicPlayerBody.style.display = 'none';
musicPlayerToggle.addEventListener('click', () => {
    playerOpen = !playerOpen;
    musicPlayerBody.style.display = playerOpen ? 'block' : 'none';
    mpArrow.textContent = playerOpen ? '▼' : '▲';
});

// === PARALLAX ===
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const landing = document.querySelector('.landing-content');
    if (landing) {
        landing.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
        landing.style.opacity = Math.max(0, 1 - scrollY / 600);
    }
});

// === CLICK HEARTS ===
document.addEventListener('click', (e) => {
    if (e.target.closest('button, .envelope, canvas, .music-player, input, .nav, .mood-btn, .game-card, .game-reset-btn')) return;
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createClickHeart(e.clientX, e.clientY), i * 80);
    }
});

// === PAGE LOAD ===
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
