'use strict';

const FACE_IMG = 'face.png';

// ── Floating faces ──
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
    img.src = FACE_IMG; img.width = s.w; img.draggable = false;
    el.appendChild(img);
    Object.assign(el.style, {
      top: s.top || 'auto', left: s.left || 'auto',
      right: s.right || 'auto', bottom: s.bottom || 'auto',
      animationDelay: s.delay, animationDuration: s.dur,
    });
    el.addEventListener('click', showPopup);
    c.appendChild(el);
  });
}

function showPopup() {
  document.getElementById('popupFace').innerHTML =
    `<img src="donottouchitr3tard.png" style="width:100%;max-width:280px;border-radius:16px;">`;
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup() { document.getElementById('popupOverlay').classList.remove('active'); }
document.getElementById('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// ── Hash / seeded random ──
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h / 4294967295;
}
function seededRand(seed, salt) { return hashStr(seed + salt); }
function seededPick(seed, salt, arr) { return arr[Math.floor(seededRand(seed, salt) * arr.length)]; }

// ── Content pools (random each time for virality) ──
const TITLES   = ['Chaos Engine','Timeline Menace','Reply Goblin','Hot Take Machine','Thread Warrior','Ratio King','Degen Oracle','Touch Grass Never','Unhinged Poster'];
const ABILITIES = ['⚡ Ratio Blast','🔥 Opinion Drop','🌀 Reply Storm','💥 Quote Attack','📡 Viral Misfire','🎯 Clout Sniper','🧠 Galaxy Brain','☠️ Main Character Mode'];
const FLAVORS  = [
  '"this will age badly"','"internet never forgets"','"why would you post this"',
  '"main character detected"','"touching grass not found"','"unhinged but consistent"',
  '"timeline is cooked"','"ratio incoming"',
];
function randPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── Rarity system ──
const RARITIES = [
  { id: 'legendary', min: 100, max: 100, label: '✦ LEGENDARY ✦' },
  { id: 'mythic',    min: 90,  max: 99,  label: '✦ MYTHIC ✦'    },
  { id: 'epic',      min: 70,  max: 89,  label: '✦ EPIC ✦'      },
  { id: 'rare',      min: 40,  max: 69,  label: '✦ RARE ✦'      },
  { id: 'common',    min: 10,  max: 39,  label: '✦ COMMON ✦'    },
  { id: 'secret',    min: 0,   max: 9,   label: '? ? SECRET ? ?' },
];

const TIERS = [
  { min: 0,   max: 19,  tier: 'Barely R3tard3d',   desc: "Disappointingly functional. Seek more chaos." },
  { min: 20,  max: 39,  tier: 'Mild R3tard3d',      desc: "A solid baseline. Bad choices, but only sometimes." },
  { min: 40,  max: 59,  tier: 'Average R3tard3d',   desc: "Right in the sweet spot. Chaos energy: moderate." },
  { min: 60,  max: 74,  tier: 'Certified R3tard3d', desc: "Consistently unhinged. Respect." },
  { min: 75,  max: 89,  tier: 'Elite R3tard3d',     desc: "Science cannot explain your decision-making." },
  { min: 90,  max: 99,  tier: 'GOD-TIER R3tard3d',  desc: "You are the reason warning labels exist." },
  { min: 100, max: 100, tier: 'GOD-TIER R3tard3d',  desc: "Undeniable. Irreversible. A true legend." },
];

const STATS = [
  { key: 'degen',      label: 'Degen Level',        fmt: p => p + '%' },
  { key: 'braincell',  label: 'Brain Cells Left',   fmt: p => p + ' / 100' },
  { key: 'touchgrass', label: 'Touch Grass',        fmt: p => p + '%' },
  { key: 'online',     label: 'Chronically Online', fmt: p => p + '%' },
  { key: 'posting',    label: 'Unhinged Posts/Day', fmt: p => (p / 10).toFixed(1) },
  { key: 'nft',        label: 'Rug Pull Survivor',  fmt: p => p + '%' },
];

let currentHandle    = '';
let currentScore     = 0;
let currentTier      = null;
let currentRarity    = null;
let currentStats     = [];
let currentAvatarUrl = '';
let currentAvatarB64 = null;
let currentTitle     = '';
let currentAbility   = '';
let currentFlavor    = '';

// Load avatar via wsrv.nl proxy (has CORS headers) → canvas → base64
function fetchAvatarBase64(handle) {
  const encoded = encodeURIComponent(handle);
  const candidates = [
    `https://wsrv.nl/?url=unavatar.io%2Fx%2F${encoded}&w=200&h=200&fit=cover&output=jpg`,
    `https://wsrv.nl/?url=unavatar.io%2Ftwitter%2F${encoded}&w=200&h=200&fit=cover&output=jpg`,
    `https://wsrv.nl/?url=unavatar.io%2Fx%2F${encoded}&w=200&h=200&output=png`,
  ];
  function tryNext(i) {
    if (i >= candidates.length) return Promise.resolve(null);
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = c.height = 200;
          c.getContext('2d').drawImage(img, 0, 0, 200, 200);
          resolve(c.toDataURL('image/jpeg', 0.92));
        } catch { resolve(tryNext(i + 1)); }
      };
      img.onerror = () => resolve(tryNext(i + 1));
      img.src = candidates[i];
    });
  }
  return tryNext(0);
}

// ── Rate handle ──
async function rateHandle() {
  let handle = document.getElementById('handleInput').value.trim();
  if (!handle) { document.getElementById('handleInput').focus(); return; }
  handle = handle.replace(/^@+/, '');
  currentHandle = handle;
  const seed = handle.toLowerCase();

  const btn = document.getElementById('rateBtn');
  btn.disabled = true;
  btn.innerHTML = `Scanning... <img src="${FACE_IMG}" class="btn-face-icon" alt="">`;
  document.getElementById('scanningBlock').classList.remove('hidden');

  // Run 5s delay and avatar fetch in parallel
  const [avatarB64] = await Promise.all([
    fetchAvatarBase64(handle),
    new Promise(res => setTimeout(res, 5000)),
  ]);
  currentAvatarB64 = avatarB64;

  const HALL_OF_FAME = ['thinkisick', 'dreiki10'];
  currentScore   = HALL_OF_FAME.includes(seed) ? 100 : Math.round(seededRand(seed, 'main') * 100);
  currentTier    = TIERS.find(t => currentScore >= t.min && currentScore <= t.max) || TIERS[TIERS.length - 1];
  currentRarity  = RARITIES.find(r => currentScore >= r.min && currentScore <= r.max) || RARITIES[RARITIES.length - 1];
  currentTitle   = randPick(TITLES);
  currentAbility = randPick(ABILITIES);
  currentFlavor  = randPick(FLAVORS);
  currentStats   = STATS.map(s => ({ label: s.label, raw: Math.round(seededRand(seed, s.key) * 100), fmt: s.fmt }));

  btn.disabled = false;
  btn.innerHTML = `Rate me <img src="${FACE_IMG}" class="btn-face-icon" alt="">`;
  document.getElementById('scanningBlock').classList.add('hidden');

  prepareResult();
  showScreen('resultScreen');
}

// Prepare card data without showing it yet (tap-to-reveal)
function prepareResult() {
  renderResult();
  // Show ONLY the reveal overlay, everything else hidden
  document.getElementById('revealOverlay').classList.remove('hidden', 'dismissing');
  document.getElementById('cardDropWrap').classList.add('hidden');
  document.getElementById('shareButtons').classList.add('hidden');
  document.getElementById('retryBtn').classList.add('hidden');
  document.getElementById('resultDisclaimer').classList.add('hidden');
}

function revealCard() {
  const overlay = document.getElementById('revealOverlay');
  overlay.classList.add('dismissing');
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.getElementById('cardDropWrap').classList.remove('hidden');
    document.getElementById('shareButtons').classList.remove('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
    document.getElementById('resultDisclaimer').classList.remove('hidden');
  }, 350);
}

function renderResult() {
  const wrap = document.getElementById('cardDropWrap');

  // Apply rarity class
  wrap.className = `card-drop-wrap rarity-${currentRarity.id}`;

  // Top row
  document.getElementById('resultHandle').textContent = '@' + currentHandle;
  document.getElementById('scoreBig').textContent     = currentScore + '%';

  // Avatar — base64 for html2canvas; fallback to direct URL for display
  const av = document.getElementById('resultAvatar');
  const img = document.createElement('img');
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  if (currentAvatarB64) {
    img.src = currentAvatarB64;
  } else {
    img.src = `https://unavatar.io/x/${encodeURIComponent(currentHandle)}`;
    img.onerror = () => { img.src = FACE_IMG; img.style.objectFit = 'contain'; img.style.padding = '4px'; };
  }
  av.innerHTML = ''; av.appendChild(img);

  // Texts
  document.getElementById('cardTitle').textContent   = currentTitle;
  document.getElementById('scoreTier').textContent   = currentTier.tier;
  document.getElementById('cardAbility').textContent = currentAbility;
  document.getElementById('cardFlavor').textContent  = currentFlavor;
  document.getElementById('cardRarityBar').textContent = currentRarity.label;

  // Stats
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';
  currentStats.forEach(s => {
    const d = document.createElement('div');
    d.className = 'card-stat';
    d.innerHTML = `
      <div class="card-stat-label">${s.label}</div>
      <div class="card-stat-value">${s.fmt(s.raw)}</div>
      <div class="card-stat-bar-wrap"><div class="card-stat-bar" style="width:${s.raw}%"></div></div>`;
    grid.appendChild(d);
  });

  // Legendary particles
  spawnParticles(currentRarity.id === 'legendary');

  // Score pill rarity color
  const pill = document.getElementById('scoreBig');
  const pillColors = {
    legendary: 'linear-gradient(135deg,#f59e0b,#a855f7)',
    mythic:    'linear-gradient(135deg,#ec4899,#a855f7)',
    epic:      'linear-gradient(135deg,#f97316,#ec4899)',
    rare:      'linear-gradient(135deg,#6366f1,#8b5cf6)',
    common:    'rgba(255,255,255,0.1)',
  };
  pill.style.background = pillColors[currentRarity.id] || pillColors.common;
}

function spawnParticles(active) {
  const container = document.getElementById('cardParticles');
  container.innerHTML = '';
  if (!active) return;
  const colors = ['#f59e0b','#fbbf24','#a855f7','#f472b6','#fff'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left    = Math.random() * 100 + '%';
    p.style.bottom  = '0';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width   = (3 + Math.random() * 4) + 'px';
    p.style.height  = p.style.width;
    p.style.animationDuration  = (3 + Math.random() * 4) + 's';
    p.style.animationDelay     = (Math.random() * 3) + 's';
    container.appendChild(p);
  }
}

function goHome() {
  document.getElementById('revealOverlay').classList.add('hidden');
  showScreen('homeScreen');
}

function showScreen(id) {
  ['homeScreen','resultScreen'].forEach(s =>
    document.getElementById(s).classList.toggle('hidden', s !== id));
}

// ── Input listeners ──
const handleInputEl = document.getElementById('handleInput');
const rateBtnEl     = document.getElementById('rateBtn');
handleInputEl.addEventListener('input', () => {
  rateBtnEl.classList.toggle('active', handleInputEl.value.trim().length > 0);
});
handleInputEl.addEventListener('keydown', e => { if (e.key === 'Enter') rateHandle(); });

// ── Download card via html2canvas ──
// Avatar is already base64 in the DOM, so no CORS issues
function downloadCard() {
  const btn = document.querySelector('.btn-download');
  btn.textContent = '⏳ Generating...'; btn.disabled = true;

  html2canvas(document.getElementById('resultCard'), {
    scale: 2, backgroundColor: '#0f0820', useCORS: false, logging: false,
  }).then(canvas => {
    const a = document.createElement('a');
    a.download = 'r3tard3d-card.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
    btn.textContent = '⬇ Download Card'; btn.disabled = false;
  }).catch(() => { btn.textContent = '⬇ Download Card'; btn.disabled = false; });
}

// ── Share / Copy ──
function shareTwitter() {
  const text = encodeURIComponent(
    `I got ${currentScore}% — ${currentTitle} (${currentTier.tier}) ${currentFlavor}\n\nHow R3tard3d are you?`
  );
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function copyResult() {
  const text = `@${currentHandle} — ${currentScore}% ${currentRarity.label}\n${currentTitle} · ${currentAbility}\n${currentFlavor}`;
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
