'use strict';

// ── SVG Face — pepe smoking sticker (wide flat blob, heavy lids, cig) ──
function makeFaceSVG(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170" width="${w}" height="${h}">
  <!-- Body: wide flat organic blob -->
  <path d="M 38,85 C 33,58 42,30 75,22 C 98,16 135,12 168,15
           C 200,18 240,28 260,44 C 278,57 278,75 268,92
           C 258,110 240,125 210,132 C 182,139 148,141 115,138
           C 84,135 55,124 40,108 C 30,96 40,95 38,85 Z"
    fill="#7A3B1E" stroke="#111" stroke-width="6.5" stroke-linejoin="round"/>

  <!-- Lower face wrinkle -->
  <path d="M 58,118 Q 95,110 140,114 Q 178,118 210,110 Q 232,106 248,114"
    fill="none" stroke="#5A2810" stroke-width="3" stroke-linecap="round" opacity="0.7"/>

  <!-- LEFT EYE white (full ellipse) -->
  <ellipse cx="110" cy="72" rx="33" ry="27" fill="white" stroke="#111" stroke-width="5"/>
  <!-- LEFT pupil (low, stoned look) -->
  <ellipse cx="116" cy="82" rx="15" ry="17" fill="#111"/>
  <!-- LEFT eyelid cover: filled brown shape covering top 58% of eye -->
  <!-- Eyelid bottom boundary = y≈74 (a Q-curve sagging down = heavy drooping lid) -->
  <path d="M 77,74 Q 110,82 143,74 L 143,44 L 77,44 Z" fill="#7A3B1E"/>
  <!-- LEFT eyelid bottom edge (visible curved line) -->
  <path d="M 77,74 Q 110,82 143,74" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>
  <!-- LEFT glare dot (below lid line, visible) -->
  <circle cx="122" cy="78" r="4.5" fill="white"/>
  <!-- LEFT inner-corner fold -->
  <path d="M 78,77 Q 73,83 75,90" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>

  <!-- RIGHT EYE white -->
  <ellipse cx="198" cy="70" rx="33" ry="27" fill="white" stroke="#111" stroke-width="5"/>
  <!-- RIGHT pupil -->
  <ellipse cx="204" cy="80" rx="15" ry="17" fill="#111"/>
  <!-- RIGHT eyelid cover -->
  <path d="M 165,72 Q 198,80 231,72 L 231,42 L 165,42 Z" fill="#7A3B1E"/>
  <!-- RIGHT eyelid bottom edge -->
  <path d="M 165,72 Q 198,80 231,72" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>
  <!-- RIGHT glare dot -->
  <circle cx="210" cy="76" r="4.5" fill="white"/>
  <!-- RIGHT outer-corner fold -->
  <path d="M 230,75 Q 237,81 235,88" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>

  <!-- LEFT EYEBROW — thick, inner end dips down (furrowed/concerned look) -->
  <path d="M 76,50 Q 110,38 144,48" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round"/>
  <!-- RIGHT EYEBROW -->
  <path d="M 163,46 Q 197,36 232,46" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round"/>
  <!-- Brow inner furrow dip (between brows, making them look heavy/mean) -->
  <path d="M 142,49 L 149,56" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>
  <path d="M 163,46 L 157,53" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>

  <!-- CIGARETTE sticking out lower-left (~14° downward) -->
  <rect x="3" y="97" width="72" height="12" rx="6"
    fill="#EAE0C0" stroke="#111" stroke-width="2.5"
    transform="rotate(-14 39 103)"/>
  <!-- Filter section -->
  <rect x="55" y="95" width="20" height="12" rx="5.5"
    fill="#D0C090" stroke="#111" stroke-width="2"
    transform="rotate(-14 65 101)"/>
  <!-- Ash band -->
  <rect x="24" y="98" width="11" height="8" rx="2"
    fill="#999" opacity="0.5" transform="rotate(-14 29 102)"/>
  <!-- Ember (red glow) -->
  <circle cx="6" cy="101" r="7" fill="#C03010" transform="rotate(-14 6 101)"/>
  <circle cx="6" cy="101" r="4" fill="#FF6030" transform="rotate(-14 6 101)" opacity="0.9"/>

  <!-- SMOKE wisps from ember -->
  <path d="M 1,91 C -5,77 -1,63 -7,49 C -11,37 -5,24 -9,11"
    fill="none" stroke="rgba(195,195,195,0.75)" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M 12,89 C 18,75 14,61 20,48 C 24,36 18,23 23,10"
    fill="none" stroke="rgba(195,195,195,0.5)" stroke-width="2.5" stroke-linecap="round"/>
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
