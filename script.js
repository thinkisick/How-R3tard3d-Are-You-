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
  { key: 'braincell',  label: 'Brain Cells Left',     fmt: pct => pct + ' / 100' },
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

// ── Card download via html2canvas ──
function downloadCard() {
  const btn = document.querySelector('.btn-download');
  btn.textContent = '⏳ Generating...';
  btn.disabled = true;

  // Build off-screen snapshot card
  let snap = document.getElementById('downloadSnapshot');
  if (snap) snap.remove();

  snap = document.createElement('div');
  snap.id = 'downloadSnapshot';

  const statsHTML = currentStats.map(s => `
    <div class="snap-stat">
      <div class="snap-stat-label">${s.label}</div>
      <div class="snap-stat-val">${s.fmt(s.raw)}</div>
      <div class="snap-stat-bar-wrap">
        <div class="snap-stat-bar" style="width:${s.raw}%"></div>
      </div>
    </div>
  `).join('');

  snap.innerHTML = `
    <div class="snap-avatar">${makeFaceSVG(68, 40)}</div>
    <div class="snap-handle">@${currentHandle}</div>
    <div class="snap-label">R3tard3d Score</div>
    <div class="snap-score">${currentScore}%</div>
    <div class="snap-tier">${currentTier.tier}</div>
    <div class="snap-desc">${currentTier.desc}</div>
    <div class="snap-stats">${statsHTML}</div>
    <div class="snap-footer">how-r3tard3d-are-you · Made by sick @thinkisick</div>
  `;
  document.body.appendChild(snap);

  html2canvas(snap, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  }).then(canvas => {
    const a = document.createElement('a');
    a.download = 'r3tard3d-score.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
    snap.remove();
    btn.textContent = '⬇ Download Card';
    btn.disabled = false;
  }).catch(() => {
    snap.remove();
    btn.textContent = '⬇ Download Card';
    btn.disabled = false;
  });
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
