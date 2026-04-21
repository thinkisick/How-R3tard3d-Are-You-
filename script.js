'use strict';

const FACE_IMG = 'Pictures/face.png';

// ── Floating faces ──
const FACE_SLOTS = [
  { top: '6%',  left: '3%',  delay: '0s',   dur: '7.2s', w: 130 },
  { top: '4%',  right: '3%', delay: '1.4s', dur: '8.8s', w: 112 },
  { top: '38%', left: '1%',  delay: '0.6s', dur: '6.6s', w: 124 },
  { top: '58%', right: '2%', delay: '2.1s', dur: '9.2s', w: 118 },
  { top: '76%', left: '4%',  delay: '1.9s', dur: '7.8s', w: 108 },
  { top: '80%', right: '5%', delay: '0.8s', dur: '8.2s', w: 126 },
];

// Mobile: 2 top, 2 bottom — clear of content and ticker
const FACE_SLOTS_MOBILE = [
  { top: '4%',  left: '2%',  delay: '0s',   dur: '7.2s', w: 66 },
  { top: '3%',  right: '2%', delay: '1.4s', dur: '8.8s', w: 60 },
  { top: '77%', left: '3%',  delay: '1.9s', dur: '7.8s', w: 58 },
  { top: '79%', right: '3%', delay: '0.8s', dur: '8.2s', w: 62 },
];

function spawnFaces() {
  const c = document.getElementById('facesContainer');
  const mobile = window.innerWidth <= 480;
  const slots = mobile ? FACE_SLOTS_MOBILE : FACE_SLOTS;
  slots.forEach(s => {
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
    `<img src="Pictures/donottouchitr3tard.png" style="width:100%;max-width:280px;border-radius:16px;">`;
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup() { document.getElementById('popupOverlay').classList.remove('active'); }
document.getElementById('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

function openImprovePopup() { document.getElementById('improvePopupOverlay').classList.add('active'); }
function closeImprovePopup() { document.getElementById('improvePopupOverlay').classList.remove('active'); }
document.getElementById('improvePopupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeImprovePopup();
});

function playLaughSound() {
  try {
    const audio = new Audio('Sounds/johnwrich.mp3');
    audio.play().catch(() => {});
  } catch(e) {}
}

function openHahahaPopup() {
  document.getElementById('hahahaPopup').classList.add('active');
  playLaughSound();
}
function closeHahahaPopup() { document.getElementById('hahahaPopup').classList.remove('active'); }
document.getElementById('hahahaPopup').addEventListener('click', function(e) {
  if (e.target === this) closeHahahaPopup();
});

// ── Hash / seeded random ──
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h / 4294967295;
}
function seededRand(seed, salt) { return hashStr(seed + salt); }
function seededPick(seed, salt, arr) { return arr[Math.floor(seededRand(seed, salt) * arr.length)]; }

// ── Scan text rotation ──
const SCAN_MSGS = [
  'Scanning your r3tard3d energy...',
  'Checking on-chain activity...',
  'Analyzing posting frequency...',
  'Consulting the council of r3tards...',
  'Calculating r3tardness...',
  'Cross-referencing the rug pull database...',
  'Measuring degen levels...',
  'Almost done r3tard...',
];

// ── Content pools (random each time for virality) ──
const TITLES   = ['Diamond Paws','Floor Goblin','Cope Machine','Unwashed Holder','NPC Destroyer','On-Chain Menace','Frog-Brained','Definitely Not Selling','Smoothbrain Supreme','Ape-In Protocol'];
const ABILITIES = ['💎 Diamond Grip','🐸 Frog Brain Active','📉 Buy High Sell Never','🤝 Rug Accepted','🧠 Smoothbrain Mode','🎰 Ape In Protocol','💀 Still Not Selling','⛓️ On-Chain Forever','🔮 Cope and Hold','🤡 Trust the Vision'];
const FLAVORS  = [
  '"sent it before looking"','"floor is for quitters"','"the vision is still intact"',
  '"not financial advice, just vibes"','"bought the top, staying put"',
  '"brain smooth, hands strong"','"if it goes to zero at least i have the art"',
  '"roadmap: hold. that\'s it"','"ngmi but at least i\'m early"','"sold? never heard of her"',
];
function randPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── Rarity system ──
const RARITIES = [
  { id: 'legendary', min: 95,  max: 100, label: '✦ NEVER SELLING ✦'     },
  { id: 'mythic',    min: 80,  max: 94,  label: '✦ BASED ✦'             },
  { id: 'epic',      min: 60,  max: 79,  label: '✦ DEGEN ✦'             },
  { id: 'rare',      min: 35,  max: 59,  label: '✦ RARE ✦'              },
  { id: 'common',    min: 10,  max: 34,  label: '✦ COMMON ✦'            },
  { id: 'secret',    min: 0,   max: 9,   label: '? FLOOR IS A FEELING ?' },
];

const TIERS = [
  { min: 0,   max: 14,  tier: 'j33t',                  desc: "Sold at the bottom. Blocked by the community." },
  { min: 15,  max: 34,  tier: 'Paper Hands',            desc: "Would fold at the first red candle." },
  { min: 35,  max: 59,  tier: 'R3tard',                 desc: "Officially one of us. Occasionally unhinged." },
  { min: 60,  max: 79,  tier: 'Certified Degen',        desc: "Made choices. No regrets. Respectable." },
  { min: 80,  max: 94,  tier: 'Diamond Hand R3tard',    desc: "Held through everything. Absolute unit." },
  { min: 95,  max: 100, tier: 'LEGENDARY R3TARD',       desc: "Never sold. Never will. You are the art." },
];

const STATS = [
  { key: 'degen',      label: 'Degen Level',        fmt: p => p + '%' },
  { key: 'braincell',  label: 'Brain Cells Left',   fmt: p => p + ' / 100' },
  { key: 'touchgrass', label: 'Touch Grass',        fmt: p => p + '%' },
  { key: 'hodl',       label: 'HODL Strength',      fmt: p => p + '%' },
  { key: 'posting',    label: 'Unhinged Posts/Day', fmt: p => (p / 10).toFixed(1) },
  { key: 'nft',        label: 'Rug Pull Survivor',  fmt: p => p + '%' },
];

const RARITY_BG = {
  legendary: 'radial-gradient(ellipse at 50% 40%, rgba(245,158,11,0.22) 0%, rgba(168,85,247,0.18) 55%, transparent 80%)',
  mythic:    'radial-gradient(ellipse at 50% 40%, rgba(236,72,153,0.22) 0%, rgba(168,85,247,0.18) 55%, transparent 80%)',
  epic:      'radial-gradient(ellipse at 50% 40%, rgba(249,115,22,0.2) 0%, rgba(236,72,153,0.15) 55%, transparent 80%)',
  rare:      'radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.22) 0%, rgba(59,130,246,0.14) 55%, transparent 80%)',
  common:    'radial-gradient(ellipse at 50% 40%, rgba(155,109,208,0.1) 0%, transparent 80%)',
  secret:    'radial-gradient(ellipse at 50% 40%, rgba(100,116,139,0.22) 0%, rgba(30,58,95,0.18) 55%, transparent 80%)',
};

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
  // Request at 400px — canvas drawn at 400×400 so download quality is sharp
  const candidates = [
    `https://wsrv.nl/?url=unavatar.io%2Fx%2F${encoded}&w=400&h=400&fit=cover&output=jpg`,
    `https://wsrv.nl/?url=unavatar.io%2Ftwitter%2F${encoded}&w=400&h=400&fit=cover&output=jpg`,
    `https://wsrv.nl/?url=unavatar.io%2Fx%2F${encoded}&w=400&h=400&output=png`,
  ];
  function tryNext(i) {
    if (i >= candidates.length) return Promise.resolve(null);
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          // Draw at native size to avoid upscale blur
          c.width = img.naturalWidth || 400;
          c.height = img.naturalHeight || 400;
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', 0.95));
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

  // Special intercept — show laugh popup after fake scan
  if (handle.toLowerCase() === 'johnwrichkid') {
    await new Promise(r => setTimeout(r, 2200));
    btn.disabled = false;
    btn.innerHTML = `Rate me <img src="${FACE_IMG}" class="btn-face-icon" alt="">`;
    document.getElementById('scanningBlock').classList.add('hidden');
    openHahahaPopup();
    return;
  }

  // Rotate scan messages during the wait
  const scanEl = document.querySelector('.scanning-text');
  let scanMsgIdx = 0;
  const scanInterval = setInterval(() => {
    scanMsgIdx = (scanMsgIdx + 1) % SCAN_MSGS.length;
    if (scanEl) scanEl.textContent = SCAN_MSGS[scanMsgIdx];
  }, 900);

  // Run 5s delay and avatar fetch in parallel
  const [avatarB64] = await Promise.all([
    fetchAvatarBase64(handle),
    new Promise(res => setTimeout(res, 5000)),
  ]);
  clearInterval(scanInterval);
  if (scanEl) scanEl.textContent = SCAN_MSGS[0];
  currentAvatarB64 = avatarB64;

  const HALL_OF_FAME = ['thinkisick', 'dreiki10', 'exsay07'];
  currentScore   = HALL_OF_FAME.includes(seed) ? 100 : Math.round(Math.pow(seededRand(seed, 'main'), 0.6) * 100);
  currentTier    = TIERS.find(t => currentScore >= t.min && currentScore <= t.max) || TIERS[TIERS.length - 1];
  currentRarity  = RARITIES.find(r => currentScore >= r.min && currentScore <= r.max) || RARITIES[RARITIES.length - 1];
  currentTitle   = randPick(TITLES);
  currentAbility = randPick(ABILITIES);
  currentFlavor  = randPick(FLAVORS);
  currentStats   = STATS.map(s => ({ label: s.label, raw: Math.round(seededRand(seed, s.key) * 100), fmt: s.fmt }));

  btn.disabled = false;
  btn.innerHTML = `Rate me <img src="${FACE_IMG}" class="btn-face-icon" alt="">`;
  document.getElementById('scanningBlock').classList.add('hidden');

  addLeaderboardEntry(handle, currentScore, currentTier.tier, currentRarity.id);
  updateCounter();

  prepareResult();
  showScreen('resultScreen');
}

// Prepare card — show back face of flip, hide share buttons
function prepareResult() {
  renderResult();
  const inner = document.getElementById('cardFlipInner');
  inner.style.transition = 'none';       // instant reset (no animation when re-entering)
  inner.classList.remove('flipped');
  // Restore back-face visibility for the next reveal
  document.querySelector('.card-flip-back').style.visibility = '';
  document.getElementById('cardFlipScene').classList.remove('hidden');
  document.getElementById('shareButtons').classList.add('hidden');
  document.getElementById('retryBtn').classList.add('hidden');
  document.getElementById('resultDisclaimer').classList.add('hidden');
  document.getElementById('leaderboardSection').classList.add('hidden');
}

// Tap — 3D flip the card over, then show share buttons
function revealCard() {
  const inner = document.getElementById('cardFlipInner');
  document.querySelector('.card-flip-back').style.visibility = 'hidden';
  if (navigator.vibrate) navigator.vibrate(20);
  inner.style.transition = 'transform 0.75s cubic-bezier(0.4,0.2,0.2,1)';
  inner.classList.add('flipped');
  setTimeout(() => {
    if (navigator.vibrate) navigator.vibrate([50, 30, 100]);
    const topTiers = ['legendary', 'mythic', 'epic'];
    const snd = new Audio(topTiers.includes(currentRarity.id) ? 'Sounds/r3tard alert.mp3' : 'Sounds/r3tard3d.mp3');
    snd.play().catch(() => {});
    const overlay = document.getElementById('bgOverlay');
    overlay.style.background = RARITY_BG[currentRarity.id] || '';
    overlay.classList.add('visible');
    document.getElementById('shareButtons').classList.remove('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
    document.getElementById('resultDisclaimer').classList.remove('hidden');
    renderLeaderboard(currentHandle);
    document.getElementById('leaderboardSection').classList.remove('hidden');
  }, 750);
}

function renderResult() {
  const wrap = document.getElementById('cardDropWrap');
  wrap.className = `card-flip-front card-drop-wrap rarity-${currentRarity.id}`;

  document.getElementById('cardTitle').textContent     = currentTitle;
  document.getElementById('scoreBig').textContent      = currentScore + '%';
  document.getElementById('resultHandle').textContent  = '@' + currentHandle;
  document.getElementById('scoreTier').textContent     = currentTier.tier;
  document.getElementById('cardAbility').textContent   = currentAbility;
  document.getElementById('tierDesc').textContent      = currentTier.desc;
  document.getElementById('cardFlavor').textContent    = currentFlavor;
  document.getElementById('cardRarityBar').textContent = currentRarity.label;

  // Avatar — rectangular art area
  const av = document.getElementById('resultAvatar');
  const img = document.createElement('img');
  if (currentAvatarB64) {
    img.src = currentAvatarB64;
  } else {
    img.src = `https://unavatar.io/x/${encodeURIComponent(currentHandle)}`;
    img.onerror = () => { img.src = FACE_IMG; img.style.objectFit = 'contain'; img.style.padding = '10px'; };
  }
  av.innerHTML = ''; av.appendChild(img);

  // Stats — 2 rows of 3, Pokémon weakness/resistance/retreat style
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';
  [currentStats.slice(0, 3), currentStats.slice(3, 6)].forEach(rowStats => {
    const row = document.createElement('div');
    row.className = 'pkm-stats-row';
    rowStats.forEach(s => {
      const cell = document.createElement('div');
      cell.className = 'pkm-stat-cell';
      cell.innerHTML = `<span class="pkm-stat-label">${s.label}</span><span class="pkm-stat-val">${s.fmt(s.raw)}</span>`;
      row.appendChild(cell);
    });
    grid.appendChild(row);
  });

  spawnParticles(currentRarity.id === 'legendary');
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
  document.getElementById('bgOverlay').classList.remove('visible');
  document.getElementById('cardFlipScene').classList.add('hidden');
  document.getElementById('leaderboardSection').classList.add('hidden');
  showScreen('homeScreen');
}

function showScreen(id) {
  ['homeScreen','resultScreen'].forEach(s =>
    document.getElementById(s).classList.toggle('hidden', s !== id));
  const isHome = id === 'homeScreen';
  document.getElementById('facesContainer').style.display = isHome ? '' : 'none';
}

// ── Input listeners ──
const handleInputEl = document.getElementById('handleInput');
const rateBtnEl     = document.getElementById('rateBtn');
handleInputEl.addEventListener('input', () => {
  rateBtnEl.classList.toggle('active', handleInputEl.value.trim().length > 0);
});
handleInputEl.addEventListener('keydown', e => { if (e.key === 'Enter') rateHandle(); });

// ── Download card via html2canvas ──
async function downloadCard() {
  const btn = document.querySelector('.btn-download');
  btn.textContent = '⏳ Generating...'; btn.disabled = true;

  // If avatar is a direct URL (not base64), try once more to get base64
  const avImg = document.querySelector('#resultAvatar img');
  if (avImg && avImg.src && !avImg.src.startsWith('data:') && avImg.src !== location.href) {
    const b64 = await fetchAvatarBase64(currentHandle);
    if (b64) { avImg.src = b64; await new Promise(r => setTimeout(r, 80)); }
  }

  const card    = document.getElementById('resultCard');
  const spinEl  = document.getElementById('cardBorderSpin');
  const titleEl = document.getElementById('cardTitle');

  // Patch DOM so html2canvas renders correctly
  // (backdrop-filter, gradient text, spinning transforms all break it)
  const restores = [];
  function patch(el, prop, val) {
    restores.push([el, prop, el.style[prop]]);
    el.style[prop] = val;
  }
  // Neutralise 3D flip transforms so html2canvas sees a flat card
  const flipInner = document.getElementById('cardFlipInner');
  const flipFront = document.getElementById('cardDropWrap');
  patch(flipInner, 'transform',      'none');
  patch(flipInner, 'transformStyle', 'flat');
  patch(flipFront, 'transform',      'none');
  patch(flipFront, 'position',       'relative');
  patch(card,    'backdropFilter',       'none');
  patch(card,    'webkitBackdropFilter', 'none');
  patch(card,    'background',           'rgb(15,8,30)');
  patch(spinEl,  'animation',            'none');
  patch(spinEl,  'transform',            'none');
  patch(titleEl, 'webkitTextFillColor',  '#fff');
  patch(titleEl, 'backgroundImage',      'none');

  const restore = () => restores.forEach(([el, prop, orig]) => { el.style[prop] = orig; });

  html2canvas(card, { scale: 2, backgroundColor: '#0f0820', useCORS: true, logging: false })
    .then(canvas => {
      restore();
      const a = document.createElement('a');
      a.download = 'r3tard3d-card.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
      btn.textContent = '⬇ Download Card'; btn.disabled = false;
    })
    .catch(() => { restore(); btn.textContent = '⬇ Download Card'; btn.disabled = false; });
}

// ── Share / Copy ──
function shareTwitter() {
  const text = encodeURIComponent(
    `I got ${currentScore}% — ${currentTitle} (${currentTier.tier}) ${currentFlavor}\n\nHow R3tard3d are you? 👉 https://r3tard3dscore.vercel.app/`
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

// ── Confetti ──
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:9000;pointer-events:none;';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const cols = ['#f59e0b','#fbbf24','#a855f7','#ec4899','#fff','#f97316','#34d399','#60a5fa'];
  const particles = Array.from({ length: 140 }, () => ({
    x:  canvas.width  * (0.25 + Math.random() * 0.5),
    y:  canvas.height * 0.45,
    vx: (Math.random() - 0.5) * 14,
    vy: -9 - Math.random() * 9,
    w:  5 + Math.random() * 9,
    h:  4 + Math.random() * 5,
    color: cols[Math.floor(Math.random() * cols.length)],
    rot:  Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.18,
    alpha: 1,
  }));
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.28; p.vx *= 0.99;
      p.rot += p.rotV; p.alpha -= 0.007;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(animate); else canvas.remove();
  }
  animate();
}

// ── Counter ──
function updateCounter() {
  const el = document.getElementById('scanCounter');
  if (el) el.textContent = (4806 + lbData.length).toLocaleString() + ' degens rated';
}

const TICKER_SEED = ['floor_goblin','degen_monk','wagmi_never','paperhands_pete',
  'rugged_again','frog_maxi','gm_gm_gm','diamond_ape','npc_slayer',
  'cope_machine','smoothbrain','rug_survivor'];

// ── Leaderboard ──
const LB_KEY = 'r3tard_lb_v1';
const LB_COLOR = { legendary:'#f59e0b', mythic:'#ec4899', epic:'#f97316', rare:'#818cf8', common:'#a78bfa', secret:'#94a3b8' };

function seedLb() {
  const hof = ['thinkisick','dreiki10','exsay07'].map((h, i) => ({
    handle: h, score: 100, tier: 'LEGENDARY R3TARD', rarity: 'legendary', ts: i,
  }));
  const rest = TICKER_SEED.map((h, i) => {
    const score  = Math.round(seededRand(h, 'main') * 100);
    const tier   = TIERS.find(t => score >= t.min && score <= t.max) || TIERS[TIERS.length-1];
    const rarity = RARITIES.find(r => score >= r.min && score <= r.max) || RARITIES[RARITIES.length-1];
    return { handle: h, score, tier: tier.tier, rarity: rarity.id, ts: i + 10 };
  });
  return [...hof, ...rest].sort((a, b) => b.score - a.score);
}

let lbData = [];
try { lbData = JSON.parse(localStorage.getItem(LB_KEY)) || seedLb(); }
catch(e) { lbData = seedLb(); }

function addLeaderboardEntry(handle, score, tier, rarity) {
  lbData = lbData.filter(e => e.handle.toLowerCase() !== handle.toLowerCase());
  lbData.push({ handle, score, tier, rarity, ts: Date.now() });
  lbData.sort((a, b) => b.score - a.score);
  if (lbData.length > 60) lbData = lbData.slice(0, 60);
  try { localStorage.setItem(LB_KEY, JSON.stringify(lbData)); } catch(e) {}
}

function renderLeaderboard(highlightHandle) {
  const list  = document.getElementById('lbList');
  const count = document.getElementById('lbCount');
  if (count) count.textContent = lbData.length + ' r3tards rated';
  if (!list) return;
  list.innerHTML = '';
  lbData.forEach((entry, i) => {
    const rank  = i + 1;
    const sym   = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
    const rc    = rank === 1 ? 'lb-rank-gold' : rank === 2 ? 'lb-rank-silver' : rank === 3 ? 'lb-rank-bronze' : '';
    const color = LB_COLOR[entry.rarity] || '#a78bfa';
    const isNew = highlightHandle && entry.handle.toLowerCase() === highlightHandle.toLowerCase();
    const el = document.createElement('div');
    el.className = 'lb-entry' + (isNew ? ' lb-entry-new' : '');
    el.style.borderLeftColor = color;
    el.innerHTML =
      `<span class="lb-rank ${rc}">${sym}</span>` +
      `<span class="lb-handle">@${entry.handle}</span>` +
      `<span class="lb-score" style="color:${color}">${entry.score}%</span>` +
      `<span class="lb-tier">${entry.tier}</span>`;
    list.appendChild(el);
  });
}

// ── Init ──
spawnFaces();
updateCounter();

