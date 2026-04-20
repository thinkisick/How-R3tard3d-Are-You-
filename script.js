'use strict';

const FACE_IMG = 'face.png';

// ── Spawn 6 floating faces ──
const FACE_SLOTS = [
  { top: '6%',  left: '3%',  delay: '0s',   dur: '7.2s', w: 130 },
  { top: '4%',  right: '3%', delay: '1.4s', dur: '8.8s', w: 112 },
  { top: '38%', left: '1%',  delay: '0.6s', dur: '6.6s', w: 124 },
  { top: '58%', right: '2%', delay: '2.1s', dur: '9.2s', w: 118 },
  { top: '76%', left: '4%',  delay: '1.9s', dur: '7.8s', w: 108 },
  { top: '80%', right: '5%', delay: '0.8s', dur: '8.2s', w: 126 },
];

function spawnFaces() {
  const c = document.getElementById('facesContainer');
  FACE_SLOTS.forEach(s => {
    const el = document.createElement('div');
    el.className = 'floating-face';
    const img = document.createElement('img');
    img.src = FACE_IMG;
    img.width = s.w;
    img.draggable = false;
    el.appendChild(img);
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
  const pf = document.getElementById('popupFace');
  pf.innerHTML = `<img src="${FACE_IMG}" width="120">`;
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

  // Avatar
  const av = document.getElementById('resultAvatar');
  av.innerHTML = `<img src="${FACE_IMG}" style="width:100%;height:100%;object-fit:contain;padding:4px;">`;
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
    <div class="snap-avatar"><img src="${FACE_IMG}" style="width:68px;object-fit:contain;padding:4px;"></div>
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
