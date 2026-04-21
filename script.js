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
  const mobile = window.innerWidth <= 480;
  FACE_SLOTS.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'floating-face';
    const img = document.createElement('img');
    img.src = FACE_IMG;
    // On mobile shrink all faces and push the two middle ones below the content
    img.width = mobile ? Math.round(s.w * 0.52) : s.w;
    img.draggable = false;
    el.appendChild(img);
    const top = mobile && i === 2 ? '74%'
               : mobile && i === 3 ? '86%'
               : (s.top || 'auto');
    Object.assign(el.style, {
      top, left: s.left || 'auto',
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

function openImprovePopup() { document.getElementById('improvePopupOverlay').classList.add('active'); }
function closeImprovePopup() { document.getElementById('improvePopupOverlay').classList.remove('active'); }
document.getElementById('improvePopupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeImprovePopup();
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
  { id: 'legendary', min: 100, max: 100, label: '✦ NEVER SELLING ✦'     },
  { id: 'mythic',    min: 90,  max: 99,  label: '✦ BASED ✦'             },
  { id: 'epic',      min: 70,  max: 89,  label: '✦ DEGEN ✦'             },
  { id: 'rare',      min: 40,  max: 69,  label: '✦ RARE ✦'              },
  { id: 'common',    min: 10,  max: 39,  label: '✦ COMMON ✦'            },
  { id: 'secret',    min: 0,   max: 9,   label: '? FLOOR IS A FEELING ?' },
];

const TIERS = [
  { min: 0,   max: 19,  tier: 'j33t',                  desc: "Sold at the bottom. Blocked by the community." },
  { min: 20,  max: 39,  tier: 'Paper Hands',            desc: "Would fold at the first red candle." },
  { min: 40,  max: 59,  tier: 'R3tard',                 desc: "Officially one of us. Occasionally unhinged." },
  { min: 60,  max: 74,  tier: 'Certified Degen',        desc: "Made choices. No regrets. Respectable." },
  { min: 75,  max: 89,  tier: 'Elite R3tard',           desc: "Doctors cannot explain your risk tolerance." },
  { min: 90,  max: 99,  tier: 'Diamond Hand R3tard',    desc: "Held through everything. Absolute unit." },
  { min: 100, max: 100, tier: 'LEGENDARY R3TARD',       desc: "Never sold. Never will. You are the art." },
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

  // Run 5s delay and avatar fetch in parallel
  const [avatarB64] = await Promise.all([
    fetchAvatarBase64(handle),
    new Promise(res => setTimeout(res, 5000)),
  ]);
  currentAvatarB64 = avatarB64;

  const HALL_OF_FAME = ['thinkisick', 'dreiki10', 'exsay07'];
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

  history.replaceState(null, '', '?handle=' + encodeURIComponent(handle));
  addTickerEntry(handle, currentScore, currentTier.tier, currentRarity.id);

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
}

// Tap — 3D flip the card over, then show share buttons
function revealCard() {
  const inner = document.getElementById('cardFlipInner');
  document.querySelector('.card-flip-back').style.visibility = 'hidden';
  if (navigator.vibrate) navigator.vibrate(20);

  // Create AudioContext inside user gesture so iOS allows audio playback
  let audioCtx = null;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    // Silent buffer unlocks audio on iOS Safari
    const buf = audioCtx.createBuffer(1, 1, 22050);
    const src = audioCtx.createBufferSource();
    src.buffer = buf; src.connect(audioCtx.destination); src.start(0);
  } catch(e) { audioCtx = null; }

  inner.style.transition = 'transform 0.75s cubic-bezier(0.4,0.2,0.2,1)';
  inner.classList.add('flipped');
  setTimeout(() => {
    if (navigator.vibrate) navigator.vibrate([50, 30, 100]);
    if (audioCtx) playRevealSound(audioCtx, currentRarity.id);
    const overlay = document.getElementById('bgOverlay');
    overlay.style.background = RARITY_BG[currentRarity.id] || '';
    overlay.classList.add('visible');
    document.getElementById('shareButtons').classList.remove('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
    document.getElementById('resultDisclaimer').classList.remove('hidden');
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
  history.replaceState(null, '', location.pathname);
  showScreen('homeScreen');
}

function showScreen(id) {
  ['homeScreen','resultScreen'].forEach(s =>
    document.getElementById(s).classList.toggle('hidden', s !== id));
  const isHome = id === 'homeScreen';
  document.getElementById('facesContainer').style.display = isHome ? '' : 'none';
  document.getElementById('tickerWrap').style.display = isHome ? '' : 'none';
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

// ── Sound ──
function playNote(ctx, freq, start, dur, type, vol) {
  const osc = ctx.createOscillator();
  const g   = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(vol, start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function playRevealSound(ctx, rarityId) {
  const t = ctx.currentTime + 0.05;
  try {
    switch (rarityId) {
      case 'legendary':
        // Fast ascending arp → triumphant chord
        [262, 330, 392, 523, 659].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.07, 0.4, 'sine', 0.22));
        [523, 659, 784].forEach(f =>
          playNote(ctx, f, t + 0.42, 1.4, 'sine', 0.18));
        break;
      case 'mythic':
        [392, 494, 622, 784].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.1, 0.55, 'sine', 0.2));
        break;
      case 'epic':
        [330, 415, 523, 659].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.1, 0.45, 'sine', 0.18));
        break;
      case 'rare':
        [330, 415, 494].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.12, 0.4, 'sine', 0.18));
        break;
      case 'secret':
        // Sad descending — wah wah feel
        [440, 370, 311, 262].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.18, 0.55, 'triangle', 0.15));
        break;
      default: // common
        [440, 554].forEach((f, i) =>
          playNote(ctx, f, t + i * 0.12, 0.35, 'sine', 0.18));
    }
    setTimeout(() => { try { ctx.close(); } catch(e) {} }, 4000);
  } catch(e) {}
}

// ── Ticker ──
const TICKER_RARITY_COLOR = {
  legendary: '#f59e0b', mythic: '#ec4899', epic: '#f97316',
  rare: '#818cf8', common: '#a78bfa', secret: '#94a3b8',
};

const TICKER_SEED = ['floor_goblin','degen_monk','wagmi_never','paperhands_pete',
  'rugged_again','frog_maxi','gm_gm_gm','diamond_ape','npc_slayer',
  'cope_machine','smoothbrain','rug_survivor'];

const tickerEntries = TICKER_SEED.map(h => {
  const score  = Math.round(seededRand(h, 'main') * 100);
  const tier   = TIERS.find(t => score >= t.min && score <= t.max) || TIERS[TIERS.length - 1];
  const rarity = RARITIES.find(r => score >= r.min && score <= r.max) || RARITIES[RARITIES.length - 1];
  return { handle: h, score, tier: tier.tier, rarity: rarity.id };
});

function addTickerEntry(handle, score, tier, rarity) {
  tickerEntries.unshift({ handle, score, tier, rarity });
  renderTicker();
}

function renderTicker() {
  const track = document.getElementById('tickerTrack');
  const html = tickerEntries.map(e =>
    `<span class="ticker-item">` +
    `<span class="ticker-handle">@${e.handle}</span>` +
    ` — <span style="color:${TICKER_RARITY_COLOR[e.rarity]||'#a78bfa'}">${e.score}%</span>` +
    ` · ${e.tier}` +
    `</span><span class="ticker-sep">✦</span>`
  ).join('');
  track.innerHTML = html + html;
  track.style.animation = 'none';
  track.offsetWidth;
  const dur = Math.max(25, tickerEntries.length * 3.5);
  track.style.animation = `tickerScroll ${dur}s linear infinite`;
}

// ── Init ──
spawnFaces();
renderTicker();

// Auto-scan from ?handle=xxx shareable URL
(function () {
  const h = new URLSearchParams(location.search).get('handle');
  if (h) {
    const inp = document.getElementById('handleInput');
    inp.value = h;
    inp.dispatchEvent(new Event('input'));
    rateHandle();
  }
}());
