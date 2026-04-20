'use strict';

// ── SVG Face (pepe-style smoking character) ──
const FACE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" width="110" height="72">
  <!-- Body blob -->
  <path d="M20,65 C15,40 30,20 60,18 C80,16 110,14 140,18 C165,22 185,38 182,60 C180,80 170,100 145,108 C120,116 75,118 50,110 C28,103 22,85 20,65 Z"
        fill="#8B5E3C" stroke="#1a0a00" stroke-width="4"/>
  <!-- Left eye white -->
  <ellipse cx="72" cy="52" rx="22" ry="18" fill="#fff" stroke="#1a0a00" stroke-width="3"/>
  <!-- Right eye white -->
  <ellipse cx="128" cy="52" rx="22" ry="18" fill="#fff" stroke="#1a0a00" stroke-width="3"/>
  <!-- Left pupil -->
  <ellipse cx="76" cy="56" rx="10" ry="12" fill="#1a0a00"/>
  <!-- Right pupil -->
  <ellipse cx="132" cy="56" rx="10" ry="12" fill="#1a0a00"/>
  <!-- Left eye glare -->
  <circle cx="80" cy="50" r="3" fill="#fff"/>
  <!-- Right eye glare -->
  <circle cx="136" cy="50" r="3" fill="#fff"/>
  <!-- Left eyelid (heavy) -->
  <path d="M50,44 Q72,34 94,44" fill="#8B5E3C" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
  <!-- Right eyelid (heavy) -->
  <path d="M106,44 Q128,34 150,44" fill="#8B5E3C" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
  <!-- Left brow -->
  <path d="M50,36 Q72,26 94,34" fill="none" stroke="#1a0a00" stroke-width="4" stroke-linecap="round"/>
  <!-- Right brow -->
  <path d="M106,34 Q128,26 150,36" fill="none" stroke="#1a0a00" stroke-width="4" stroke-linecap="round"/>
  <!-- Cigarette -->
  <rect x="18" y="72" width="48" height="7" rx="3.5" fill="#f5f0e0" stroke="#1a0a00" stroke-width="2"/>
  <rect x="18" y="72" width="10" height="7" rx="3.5" fill="#c0392b"/>
  <!-- Smoke wisp 1 -->
  <path d="M14,70 Q8,58 12,46 Q16,34 10,22" fill="none" stroke="rgba(220,220,220,0.6)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Smoke wisp 2 -->
  <path d="M20,68 Q26,56 22,44 Q18,32 24,20" fill="none" stroke="rgba(220,220,220,0.4)" stroke-width="2" stroke-linecap="round"/>
  <!-- Mouth line -->
  <path d="M75,88 Q100,92 125,88" fill="none" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Smaller variant for result display
const FACE_SVG_SM = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" width="80" height="52">
  <path d="M20,65 C15,40 30,20 60,18 C80,16 110,14 140,18 C165,22 185,38 182,60 C180,80 170,100 145,108 C120,116 75,118 50,110 C28,103 22,85 20,65 Z"
        fill="#8B5E3C" stroke="#1a0a00" stroke-width="4"/>
  <ellipse cx="72" cy="52" rx="22" ry="18" fill="#fff" stroke="#1a0a00" stroke-width="3"/>
  <ellipse cx="128" cy="52" rx="22" ry="18" fill="#fff" stroke="#1a0a00" stroke-width="3"/>
  <ellipse cx="76" cy="56" rx="10" ry="12" fill="#1a0a00"/>
  <ellipse cx="132" cy="56" rx="10" ry="12" fill="#1a0a00"/>
  <circle cx="80" cy="50" r="3" fill="#fff"/>
  <circle cx="136" cy="50" r="3" fill="#fff"/>
  <path d="M50,44 Q72,34 94,44" fill="#8B5E3C" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
  <path d="M106,44 Q128,34 150,44" fill="#8B5E3C" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
  <path d="M50,36 Q72,26 94,34" fill="none" stroke="#1a0a00" stroke-width="4" stroke-linecap="round"/>
  <path d="M106,34 Q128,26 150,36" fill="none" stroke="#1a0a00" stroke-width="4" stroke-linecap="round"/>
  <rect x="18" y="72" width="48" height="7" rx="3.5" fill="#f5f0e0" stroke="#1a0a00" stroke-width="2"/>
  <rect x="18" y="72" width="10" height="7" rx="3.5" fill="#c0392b"/>
  <path d="M14,70 Q8,58 12,46 Q16,34 10,22" fill="none" stroke="rgba(220,220,220,0.6)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M75,88 Q100,92 125,88" fill="none" stroke="#1a0a00" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// ── Spawn floating faces ──
const FACE_POSITIONS = [
  { top: '8%',  left: '5%',  delay: '0s',   duration: '7s',  size: 105 },
  { top: '5%',  right: '4%', delay: '1.2s', duration: '8.5s', size: 90 },
  { top: '35%', left: '2%',  delay: '0.5s', duration: '6.8s', size: 100 },
  { top: '60%', right: '3%', delay: '2s',   duration: '9s',  size: 95 },
  { top: '75%', left: '6%',  delay: '1.8s', duration: '7.5s', size: 88 },
  { top: '82%', right: '6%', delay: '0.9s', duration: '8s',  size: 102 },
];

function spawnFaces() {
  const container = document.getElementById('facesContainer');
  FACE_POSITIONS.forEach((pos, i) => {
    const el = document.createElement('div');
    el.className = 'floating-face';
    el.innerHTML = FACE_SVG;
    el.querySelector('svg').setAttribute('width', pos.size);
    el.querySelector('svg').setAttribute('height', Math.round(pos.size * 0.65));
    Object.assign(el.style, {
      top:    pos.top    || 'auto',
      left:   pos.left   || 'auto',
      right:  pos.right  || 'auto',
      bottom: pos.bottom || 'auto',
      animationDelay:    pos.delay,
      animationDuration: pos.duration,
    });
    el.addEventListener('click', showPopup);
    container.appendChild(el);
  });
}

// ── Popup ──
function showPopup() {
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup() {
  document.getElementById('popupOverlay').classList.remove('active');
}
document.getElementById('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// ── Quiz data ──
const QUESTIONS = [
  {
    q: "You need to remember something important. You:",
    opts: [
      { text: "Write it down immediately",           score: 0 },
      { text: "Tell yourself you'll remember",       score: 1 },
      { text: "Forget it before finishing the sentence", score: 2 },
      { text: "What were we talking about?",         score: 3 },
    ]
  },
  {
    q: "It's 3 AM. You have work at 8 AM. You are:",
    opts: [
      { text: "Asleep like a normal person",         score: 0 },
      { text: "Scrolling Twitter for 'just 5 more minutes'", score: 1 },
      { text: "Deep in a YouTube rabbit hole about medieval cheese", score: 2 },
      { text: "Starting a new hobby you'll abandon tomorrow", score: 3 },
    ]
  },
  {
    q: "Someone explains something to you clearly. You:",
    opts: [
      { text: "Understand and apply it",             score: 0 },
      { text: "Nod but need a second explanation",  score: 1 },
      { text: "Ask the same question 3 times",       score: 2 },
      { text: "Confidently do the opposite",         score: 3 },
    ]
  },
  {
    q: "You read the terms and conditions. You:",
    opts: [
      { text: "Actually read them",                  score: 0 },
      { text: "Scroll to the bottom",               score: 1 },
      { text: "Click agree without even opening it", score: 2 },
      { text: "Terms and what?",                    score: 3 },
    ]
  },
  {
    q: "How do you handle your finances?",
    opts: [
      { text: "Budget, save, invest",                score: 0 },
      { text: "Spend first, think later",            score: 1 },
      { text: "Bought a crypto called 'MoonDogeCoin'", score: 2 },
      { text: "I have $4 and no regrets",            score: 3 },
    ]
  },
  {
    q: "You see a 'WET FLOOR' sign. You:",
    opts: [
      { text: "Walk around it carefully",            score: 0 },
      { text: "Touch it to check if it's wet",      score: 1 },
      { text: "Slip and immediately touch it again", score: 2 },
      { text: "Use it as a frisbee",                 score: 3 },
    ]
  },
  {
    q: "Your battery is at 2%. You:",
    opts: [
      { text: "Plug it in immediately",              score: 0 },
      { text: "Think 'it'll be fine'",               score: 1 },
      { text: "Open TikTok",                         score: 2 },
      { text: "Start a video call",                  score: 3 },
    ]
  },
  {
    q: "The recipe says 'add salt to taste'. You:",
    opts: [
      { text: "Add a pinch and taste",               score: 0 },
      { text: "Add too much, feel bad",              score: 1 },
      { text: "Pour until satisfied",                score: 2 },
      { text: "Add sugar because they look the same", score: 3 },
    ]
  },
  {
    q: "When you're sick you:",
    opts: [
      { text: "Rest and drink fluids",               score: 0 },
      { text: "Google symptoms and panic",           score: 1 },
      { text: "Self-diagnose 3 terminal diseases",   score: 2 },
      { text: "Go to a party anyway 'it's nothing'", score: 3 },
    ]
  },
  {
    q: "Someone asks if you're okay. You are clearly not okay. You say:",
    opts: [
      { text: "Honestly explain the situation",      score: 0 },
      { text: "'I'm fine' (clearly not)",            score: 1 },
      { text: "'I'm fine lol' with 12 'lol's",       score: 2 },
      { text: "Start crying and say 'I'm fine'",     score: 3 },
    ]
  },
];

const RESULTS = [
  { min: 0,  max: 6,  label: "Barely R3tard3d",  desc: "You are disappointingly functional. Are you even trying? Seek r3tardation." },
  { min: 7,  max: 13, label: "Mild R3tard3d",     desc: "A solid base level. You forget things, make bad choices occasionally. Respectable." },
  { min: 14, max: 19, label: "Certified R3tard3d", desc: "Now we're talking. You consistently choose the wrong option and thrive on chaos." },
  { min: 20, max: 24, label: "Maximum R3tard3d",  desc: "You are a force of nature. Science cannot explain how you function. Legend." },
  { min: 25, max: 30, label: "GOD-TIER R3tard3d", desc: "You are the reason warning labels exist. A true pioneer. We salute you." },
];

let currentQ = 0;
let totalScore = 0;
let finalScore = 0;
let finalResult = null;

function startQuiz() {
  currentQ = 0;
  totalScore = 0;
  showScreen('quizScreen');
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  document.getElementById('questionNum').textContent = `Question ${currentQ + 1} / ${QUESTIONS.length}`;
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('progressBar').style.width = `${(currentQ / QUESTIONS.length) * 100}%`;

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => selectOption(opt.score, btn));
    container.appendChild(btn);
  });
}

function selectOption(score, btn) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  setTimeout(() => {
    totalScore += score;
    currentQ++;
    if (currentQ < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 300);
}

function showResult() {
  const pct = Math.round((totalScore / (QUESTIONS.length * 3)) * 100);
  finalScore = pct;
  finalResult = RESULTS.find(r => totalScore >= r.min && totalScore <= r.max) || RESULTS[RESULTS.length - 1];

  document.getElementById('scoreNumber').textContent = pct + '%';
  document.getElementById('scoreLabel').textContent = finalResult.label;
  document.getElementById('scoreDesc').textContent = finalResult.desc;
  document.getElementById('resultFaceSvg').innerHTML = FACE_SVG_SM;
  document.getElementById('progressBar').style.width = '100%';

  showScreen('resultScreen');
}

function retryQuiz() { showScreen('homeScreen'); }

function showScreen(id) {
  ['homeScreen','quizScreen','resultScreen'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

// ── Card generation ──
function buildResultText() {
  return `I got ${finalScore}% — ${finalResult.label} on the R3tard3d Quiz!\nhow-r3tard3d-are-you.vercel.app`;
}

function downloadCard() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createRadialGradient(240, 180, 0, 400, 225, 520);
  grad.addColorStop(0, '#9B6DD0');
  grad.addColorStop(0.5, '#6B3FA0');
  grad.addColorStop(1, '#3D1A70');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 450);

  // Card panel
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  roundRect(ctx, 60, 40, 680, 370, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 60, 40, 680, 370, 28);
  ctx.stroke();

  // Title
  ctx.fillStyle = 'rgba(232,213,255,0.9)';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('R3TARD3D SCORE', 400, 110);

  // Score
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 110px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(finalScore + '%', 400, 240);

  // Label
  ctx.fillStyle = '#E8D5FF';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(finalResult.label, 400, 285);

  // Description
  ctx.fillStyle = 'rgba(232,213,255,0.75)';
  ctx.font = '16px sans-serif';
  wrapText(ctx, finalResult.desc, 400, 322, 560, 22);

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = '13px sans-serif';
  ctx.fillText('how-r3tard3d-are-you · Made by sick @thinkisick', 400, 390);

  const link = document.createElement('a');
  link.download = 'r3tard3d-score.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[i] + ' ';
      y += lineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function shareTwitter() {
  const text = encodeURIComponent(`I got ${finalScore}% — ${finalResult.label} on the R3tard3d Quiz 🧠\n\nHow r3tard3d are you?`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function copyResult() {
  const text = buildResultText();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.btn-copy');
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => btn.textContent = orig, 2000);
    });
  }
}

// ── Init ──
spawnFaces();
