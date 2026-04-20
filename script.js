'use strict';

// ── SVG Face — accurate pepe-smoking sticker ──
// Wide flat brown blob, heavy-lidded stoned eyes, cigarette bottom-left, smoke wisps
function makeFaceSVG(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="${w}" height="${h}">
  <!-- Body: wide flat blob with wavy bumpy edges -->
  <path d="
    M 38,80
    C 32,55 36,32 62,24
    C 82,18 108,14 145,16
    C 175,18 210,24 230,38
    C 248,50 250,68 244,86
    C 238,104 224,118 200,124
    C 178,130 148,134 118,132
    C 90,130 62,126 48,114
    C 34,103 40,98 38,80 Z"
    fill="#7A3B1E" stroke="#111" stroke-width="5.5" stroke-linejoin="round"/>

  <!-- Skin wrinkle / fold lines -->
  <path d="M 60,110 Q 90,104 120,108 Q 155,112 185,106 Q 210,102 225,112"
    fill="none" stroke="#5C2A10" stroke-width="3" stroke-linecap="round" opacity="0.7"/>

  <!-- LEFT EYE white -->
  <ellipse cx="100" cy="66" rx="32" ry="26" fill="white" stroke="#111" stroke-width="4.5"/>
  <!-- RIGHT EYE white -->
  <ellipse cx="178" cy="64" rx="32" ry="26" fill="white" stroke="#111" stroke-width="4.5"/>

  <!-- Left pupil (slightly right-center, stoned look) -->
  <ellipse cx="106" cy="72" rx="15" ry="17" fill="#111"/>
  <!-- Right pupil -->
  <ellipse cx="183" cy="70" rx="15" ry="17" fill="#111"/>

  <!-- Eye glare left -->
  <circle cx="112" cy="64" r="4.5" fill="white"/>
  <!-- Eye glare right -->
  <circle cx="189" cy="62" r="4.5" fill="white"/>

  <!-- LEFT heavy eyelid (covers ~55% of eye from top) -->
  <path d="M 68,58 Q 100,42 132,58 L 132,66 Q 100,55 68,66 Z"
    fill="#7A3B1E" stroke="#111" stroke-width="4"/>
  <!-- RIGHT heavy eyelid -->
  <path d="M 146,56 Q 178,40 210,56 L 210,64 Q 178,53 146,64 Z"
    fill="#7A3B1E" stroke="#111" stroke-width="4"/>

  <!-- Left eyebrow — thick, slightly furrowed inward -->
  <path d="M 66,44 Q 100,32 130,42"
    fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/>
  <!-- Right eyebrow -->
  <path d="M 148,40 Q 178,30 208,42"
    fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/>

  <!-- Eyebrow inner furrow crease left -->
  <path d="M 128,43 Q 135,38 130,42" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
  <!-- Eyebrow inner furrow crease right -->
  <path d="M 148,40 Q 143,36 148,41" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>

  <!-- CIGARETTE — angled, sticking out bottom-left -->
  <!-- Cigarette body (tan/cream) -->
  <rect x="4" y="93" width="62" height="10" rx="5"
    fill="#E8DDB5" stroke="#111" stroke-width="2.5"
    transform="rotate(-8, 35, 98)"/>
  <!-- Filter tip (slightly lighter) -->
  <rect x="48" y="91" width="18" height="10" rx="4"
    fill="#D4C8A0" stroke="#111" stroke-width="2"
    transform="rotate(-8, 57, 96)"/>
  <!-- Lit end / ember -->
  <circle cx="8" cy="99" r="5.5" fill="#D0390E" transform="rotate(-8, 8, 99)"/>
  <circle cx="8" cy="99" r="3" fill="#FF6A3D" transform="rotate(-8, 8, 99)" opacity="0.8"/>

  <!-- Smoke wisp 1 -->
  <path d="M 4,92 C -2,78 2,64 -4,50 C -8,38 -2,26 -6,14"
    fill="none" stroke="rgba(200,200,200,0.65)" stroke-width="3" stroke-linecap="round"/>
  <!-- Smoke wisp 2 -->
  <path d="M 12,90 C 18,76 14,62 20,50 C 24,40 18,28 24,16"
    fill="none" stroke="rgba(200,200,200,0.45)" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;
}

// ── Spawn 6 floating faces ──
const FACE_SLOTS = [
  { top: '6%',  left: '3%',  delay: '0s',    dur: '7.2s', w: 130, h: 75 },
  { top: '4%',  right: '3%', delay: '1.4s',  dur: '8.8s', w: 112, h: 65 },
  { top: '38%', left: '1%',  delay: '0.6s',  dur: '6.6s', w: 124, h: 72 },
  { top: '58%', right: '2%', delay: '2.1s',  dur: '9.2s', w: 118, h: 68 },
  { top: '76%', left: '4%',  delay: '1.9s',  dur: '7.8s', w: 108, h: 63 },
  { top: '80%', right: '5%', delay: '0.8s',  dur: '8.2s', w: 126, h: 73 },
];

function spawnFaces() {
  const c = document.getElementById('facesContainer');
  FACE_SLOTS.forEach(s => {
    const el = document.createElement('div');
    el.className = 'floating-face';
    el.innerHTML = makeFaceSVG(s.w, s.h);
    Object.assign(el.style, {
      top:               s.top    || 'auto',
      left:              s.left   || 'auto',
      right:             s.right  || 'auto',
      bottom:            s.bottom || 'auto',
      animationDelay:    s.delay,
      animationDuration: s.dur,
    });
    el.addEventListener('click', showPopup);
    c.appendChild(el);
  });
}

// ── Popup ──
function showPopup() {
  document.getElementById('popupFace').innerHTML = makeFaceSVG(100, 58);
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup() {
  document.getElementById('popupOverlay').classList.remove('active');
}
document.getElementById('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// ── Deterministic hash from string → 0..1 float ──
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h / 4294967295;
}

function seededRand(seed, salt) {
  return hashStr(seed + salt);
}

// ── Score tiers ──
const TIERS = [
  { min: 0,  max: 19, tier: 'Barely R3tard3d',    desc: "Disappointingly functional. Seek more chaos." },
  { min: 20, max: 39, tier: 'Mild R3tard3d',       desc: "A solid baseline. You make bad choices, but only sometimes." },
  { min: 40, max: 59, tier: 'Average R3tard3d',    desc: "Right in the sweet spot. Chaos energy: moderate." },
  { min: 60, max: 74, tier: 'Certified R3tard3d',  desc: "Now we're talking. Consistently unhinged. Respect." },
  { min: 75, max: 89, tier: 'Elite R3tard3d',      desc: "Science cannot explain your decision-making. Icon." },
  { min: 90, max: 100,tier: 'GOD-TIER R3tard3d',   desc: "You are the reason warning labels exist. A true legend." },
];

const STATS = [
  { key: 'degen',      label: 'Degen Level',         fmt: pct => pct + '%' },
  { key: 'braincell',  label: 'Brain Cells Left',     fmt: pct => Math.round(pct * 12) + ' / 100' },
  { key: 'touchgrass', label: 'Touch Grass Urgency',  fmt: pct => pct + '%' },
  { key: 'online',     label: 'Chronically Online',   fmt: pct => pct + '%' },
  { key: 'posting',    label: 'Unhinged Posts/Day',   fmt: pct => (pct / 10).toFixed(1) },
  { key: 'nft',        label: 'Rug Pull Survivor',    fmt: pct => pct + '%' },
];

let currentHandle = '';
let currentScore  = 0;
let currentTier   = null;
let currentStats  = [];

function rateHandle() {
  let handle = document.getElementById('handleInput').value.trim();
  if (!handle) { document.getElementById('handleInput').focus(); return; }
  handle = handle.replace(/^@+/, '');

  currentHandle = handle;
  const seed = handle.toLowerCase();

  // Main score 0-100
  currentScore = Math.round(seededRand(seed, 'main') * 100);
  currentTier  = TIERS.find(t => currentScore >= t.min && currentScore <= t.max) || TIERS[TIERS.length - 1];

  // Individual stats
  currentStats = STATS.map(s => ({
    label: s.label,
    raw:   Math.round(seededRand(seed, s.key) * 100),
    fmt:   s.fmt,
  }));

  renderResult();
  showScreen('resultScreen');
}

function renderResult() {
  document.getElementById('resultHandle').textContent = '@' + currentHandle;
  document.getElementById('scoreBig').textContent     = currentScore + '%';
  document.getElementById('scoreTier').textContent    = currentTier.tier;
  document.getElementById('scoreDesc').textContent    = currentTier.desc;

  // Avatar placeholder
  const av = document.getElementById('resultAvatar');
  av.innerHTML = makeFaceSVG(52, 30);
  av.style.background = 'rgba(255,255,255,0.08)';

  // Stats
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';
  currentStats.forEach(s => {
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.fmt(s.raw)}</div>
      <div class="stat-bar-wrap"><div class="stat-bar" style="width:${s.raw}%"></div></div>
    `;
    grid.appendChild(item);
  });
}

function goHome() {
  showScreen('homeScreen');
}

function showScreen(id) {
  ['homeScreen', 'resultScreen'].forEach(s =>
    document.getElementById(s).classList.toggle('hidden', s !== id)
  );
}

// Allow Enter key
document.getElementById('handleInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') rateHandle();
});

// ── Card download ──
function downloadCard() {
  const canvas = document.createElement('canvas');
  canvas.width  = 800;
  canvas.height = 460;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(240, 180, 0, 400, 230, 530);
  grad.addColorStop(0, '#9B6DD0');
  grad.addColorStop(0.5, '#6B3FA0');
  grad.addColorStop(1, '#3D1A70');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 460);

  // Card panel
  ctx.fillStyle = 'rgba(255,255,255,0.09)';
  roundRect(ctx, 60, 36, 680, 388, 28); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 60, 36, 680, 388, 28); ctx.stroke();

  // Handle
  ctx.fillStyle = 'rgba(212,176,255,0.9)';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('@' + currentHandle, 400, 90);

  // Label
  ctx.fillStyle = 'rgba(212,176,255,0.7)';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('R3TARD3D SCORE', 400, 118);

  // Big score
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(currentScore + '%', 400, 252);

  // Tier
  ctx.fillStyle = '#E8D5FF';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(currentTier.tier, 400, 294);

  // Desc
  ctx.fillStyle = 'rgba(212,176,255,0.75)';
  ctx.font = '15px sans-serif';
  wrapText(ctx, currentTier.desc, 400, 328, 560, 22);

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '13px sans-serif';
  ctx.fillText('how-r3tard3d-are-you · Made by sick @thinkisick', 400, 402);

  const a = document.createElement('a');
  a.download = 'r3tard3d-score.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
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
    } else { line = test; }
  }
  ctx.fillText(line.trim(), x, y);
}

// ── Share / Copy ──
function shareTwitter() {
  const text = encodeURIComponent(
    `I scored ${currentScore}% — ${currentTier.tier} 🧠\n\nHow R3tard3d are you? Find out:`
  );
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function copyResult() {
  const text = `@${currentHandle} R3tard3d Score: ${currentScore}% — ${currentTier.tier}\n${currentTier.desc}`;
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
