document.documentElement.classList.add('has-js');

const editions = [
  { key: 'basic', name: 'Basic' },
  { key: 'pro', name: 'Pro' },
  { key: 'legend', name: 'Legend' },
  { key: 'premium', name: 'Premium' },
  { key: 'elite', name: 'Elite' },
  { key: 'apex', name: 'Apex' },
];
const sampleMarkets = {
  charizard: { price: 72.5, change: 5.4, history: [28, 34, 31, 43, 48, 51, 63] },
  gengar: { price: 18.4, change: -2.1, history: [55, 58, 53, 51, 54, 50, 49] },
  lugia: { price: 9.8, change: 1.7, history: [44, 41, 43, 45, 42, 46, 47] },
  magikarp: { price: 95, change: 8.2, history: [23, 26, 29, 27, 40, 45, 58] },
  'mew-vmax': { price: 38.75, change: 3.1, history: [45, 43, 48, 49, 52, 50, 56] },
  delcatty: { price: 6.25, change: -1.3, history: [53, 55, 54, 51, 52, 49, 50] },
  'dark-tyranitar': { price: 21.9, change: 4.6, history: [31, 34, 32, 39, 42, 41, 49] },
  sneasel: { price: 4.15, change: -3.8, history: [60, 57, 55, 58, 51, 48, 43] },
  'pikachu-zekrom-gx': { price: 46.5, change: 2.6, history: [49, 52, 50, 55, 56, 54, 60] },
  'greninja-break': { price: 17.2, change: -0.8, history: [52, 54, 49, 51, 50, 53, 52] },
  uxie: { price: 5.6, change: 1.2, history: [45, 44, 47, 46, 48, 47, 50] },
  raikou: { price: 24.8, change: 6.7, history: [24, 29, 30, 37, 35, 46, 54] },
  pikachu: { price: 1.25, change: -1.9, history: [59, 58, 56, 57, 53, 54, 51] },
  'rayquaza-ex': { price: 34.9, change: 3.8, history: [42, 45, 43, 51, 49, 54, 58] },
  'arceus-vstar': { price: 29.6, change: -2.7, history: [59, 57, 60, 55, 54, 52, 49] },
};
const pokemonCards = [
  { key: 'charizard', name: 'Charizard', number: '4', image: './assets/cards/pokemon/charizard.webp', type: 'Fire', hp: 120, form: 'Stage 2', rarity: 'Rare Holo', artist: 'Mitsuhiro Arita', feature: 'Fire Spin · 100' },
  { key: 'gengar', name: 'Gengar', number: '94', image: './assets/cards/pokemon/gengar.webp', type: 'Psychic', hp: 130, form: 'Stage 2', rarity: 'Rare Prime', artist: 'Takashi Yamaguchi', feature: 'Cursed Drop · 4 damage counters' },
  { key: 'lugia', name: 'Lugia', number: '149', image: './assets/cards/pokemon/lugia.webp', type: 'Colorless', hp: 80, form: 'Basic', rarity: 'Rare Secret', artist: 'Naoyo Kimura', feature: 'Steam Blast · 50' },
  { key: 'magikarp', name: 'Magikarp', number: '203', image: './assets/cards/pokemon/magikarp.webp', type: 'Water', hp: 30, form: 'Basic', rarity: 'Illustration Rare', artist: 'Shinji Kanda', feature: 'Expert Splasher · coin flip' },
  { key: 'mew-vmax', name: 'Mew VMAX', number: '114', image: './assets/cards/pokemon/mew-vmax.webp', type: 'Psychic', hp: 310, form: 'VMAX', rarity: 'Holo Rare VMAX', artist: '5ban Graphics', feature: 'Max Miracle · 130' },
  { key: 'delcatty', name: 'Delcatty', number: '5', image: './assets/cards/pokemon/me55c-5.webp', type: 'Colorless', hp: 70, form: 'Stage 1', rarity: 'Rare Holo', artist: 'Atsuko Nishida', feature: 'Max Energy Source · 10× Energy' },
  { key: 'dark-tyranitar', name: 'Dark Tyranitar', number: '19', image: './assets/cards/pokemon/me55c-19.webp', type: 'Darkness', hp: 120, form: 'Stage 2', rarity: 'Rare', artist: 'Nakaoka', feature: 'Grind · 10+ per Energy' },
  { key: 'sneasel', name: 'Sneasel', number: '25', image: './assets/cards/pokemon/me55c-25.webp', type: 'Darkness', hp: 60, form: 'Basic', rarity: 'Rare', artist: 'Ken Sugimori', feature: 'Fury Swipes · coin flip' },
  { key: 'pikachu-zekrom-gx', name: 'Pikachu & Zekrom-GX', number: '33', image: './assets/cards/pokemon/me55c-33.webp', type: 'Lightning', hp: 240, form: 'Basic · GX · TAG TEAM', rarity: 'Rare Holo GX', artist: 'Mitsuhiro Arita', feature: 'Full Blitz · 150' },
  { key: 'greninja-break', name: 'Greninja BREAK', number: '41', image: './assets/cards/pokemon/me55c-41.webp', type: 'Water', hp: 170, form: 'BREAK', rarity: 'Rare BREAK', artist: '5ban Graphics', feature: 'Giant Water Shuriken · Ability' },
  { key: 'uxie', name: 'Uxie', number: '43', image: './assets/cards/pokemon/me55c-43.webp', type: 'Psychic', hp: 70, form: 'Basic', rarity: 'Rare', artist: 'Ken Sugimori', feature: 'Psychic Restore · 20' },
  { key: 'raikou', name: 'Raikou', number: '50', image: './assets/cards/pokemon/me55c-50.webp', type: 'Lightning', hp: 110, form: 'Basic', rarity: 'Amazing Rare', artist: 'Hideki Ishikawa', feature: 'Amazing Shot · 120' },
  { key: 'pikachu', name: 'Pikachu', number: '58', image: './assets/cards/pokemon/me55c-58.webp', type: 'Lightning', hp: 40, form: 'Basic', rarity: 'Common', artist: 'Mitsuhiro Arita', feature: 'Gnaw · 10' },
  { key: 'rayquaza-ex', name: 'Rayquaza-EX', number: '85', image: './assets/cards/pokemon/me55c-85.webp', type: 'Dragon', hp: 170, form: 'Basic · EX', rarity: 'Rare Holo EX', artist: 'Eske Yoshinob', feature: 'Dragon Burst · 60× Energy' },
  { key: 'arceus-vstar', name: 'Arceus VSTAR', number: '123', image: './assets/cards/pokemon/me55c-123.webp', type: 'Colorless', hp: 280, form: 'VSTAR', rarity: 'Holo Rare VSTAR', artist: '5ban Graphics', feature: 'Trinity Nova · 200' },
].map(card => ({ ...card, set: '30th Celebration: Classic Collection', market: sampleMarkets[card.key] }));
const componentLibrary = window.GradedComponents;
document.querySelector('#heroActionSlot').replaceChildren(componentLibrary.actionButton({
  label: 'Rip Now', className: 'button button-acid', attributes: { 'data-open-demo': '' },
}));
document.querySelector('#demoOpenSlot').replaceChildren(componentLibrary.actionButton({
  label: 'Try a demo rip', className: 'text-action', attributes: { 'data-open-demo': '' },
}));
document.querySelector('#continueShoppingSlot').replaceChildren(componentLibrary.actionButton({
  id: 'continueShopping', label: 'Keep exploring', className: 'button button-acid cart-continue',
}));
document.querySelector('#demoActionSlot').replaceChildren(componentLibrary.actionButton({
  id: 'demoAction', label: 'Rip', className: 'button button-acid demo-action',
}));
document.querySelector('#heroCategoriesSlot').innerHTML = componentLibrary.heroCategories();
document.querySelector('#grailCardShelf').innerHTML = pokemonCards
  .map((card, index) => componentLibrary.grailCard(card, index === 0)).join('');
editions.forEach(item => { item.poster = `./assets/packs/${item.key}-poster.webp`; });
document.querySelector('#packSelector').innerHTML = editions
  .map(item => componentLibrary.packCard(item, item.key === 'apex')).join('');
document.querySelector('#cartCloseSlot').replaceChildren(componentLibrary.closeButton({
  id: 'cartClose', label: 'Close cart', className: 'cart-close',
}));
document.querySelector('#demoCloseSlot').replaceChildren(componentLibrary.closeButton({
  id: 'demoClose', label: 'Close reveal', className: 'demo-close',
}));
document.querySelector('#bidCloseSlot').replaceChildren(componentLibrary.closeButton({
  id: 'bidClose', label: 'Close bid preview', className: 'bid-close',
}));
document.querySelector('#previewCloseSlot').replaceChildren(componentLibrary.closeButton({
  id: 'previewClose', label: 'Close card preview', className: 'preview-close',
}));
const slotKeys = ['apex', 'basic', 'legend', 'premium', 'elite', 'pro', 'apex', 'basic', 'legend', 'premium', 'elite', 'pro'];
const TAU = Math.PI * 2;
const STEP = TAU / slotKeys.length;
const baseSpeed = TAU / 19000;
const stage = document.querySelector('#packStage');
const fanButtons = [...document.querySelectorAll('.fan-pack')];
fanButtons.forEach(button => {
  const edition = editions.find(item => item.key === button.dataset.pack);
  button.setAttribute('aria-label', `Select ${edition?.name ?? 'Graded'} pack; wheel keeps rotating`);
});
const rail = document.querySelector('#packSelector');
const motionButton = document.querySelector('#motionToggle');
const soundButton = document.querySelector('#soundToggle');
const demo = document.querySelector('#demo');
const demoPack = document.querySelector('#demoPack');
const demoTear = document.querySelector('#demoTear');
const demoCard = document.querySelector('#demoCard');
const demoPokemonFront = document.querySelector('#demoPokemonFront');
const demoAction = document.querySelector('#demoAction');
const demoObject = document.querySelector('#demoObject');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const posterPath = item => `./assets/packs/${item.key}-poster.webp`;
const cartToggle = document.querySelector('#cartToggle');
const cartDrawer = document.querySelector('#cartDrawer');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartItems = document.querySelector('#cartItems');
const cartStorageKey = 'graded-market-cart-v2';
const legacyCartStorageKey = 'graded-pack-cart-v1';

let angle = -Math.PI / 2;
let selectedPackKey = slotKeys[0];
let selectedPokemonCardKey = pokemonCards[0].key;
let paused = reducedMotion.matches;
let visible = true;
let frame = null;
let lastFrame = 0;
let lastFocus = null;
let demoPhase = 0;
let pausedBeforeDemo = false;
let swipeStart = null;
let suppressClick = false;
let ripSoundPlayed = false;
let audioContext = null;
let soundEnabled = true;
let buildUpNodes = [];
let glowFrame = null;
let glowTarget = { x: 50, y: 42 };
let glowPosition = { x: 50, y: 42 };
let packQuantities = Object.fromEntries(editions.map(item => [item.key, 1]));
let cart = readCart();
let cartFocusReturn = null;
let cartToastTimer = null;

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartStorageKey) || localStorage.getItem(legacyCartStorageKey) || '{}');
    const validKeys = new Set([...editions.map(item => item.key), ...pokemonCards.map(card => `card:${card.key}`)]);
    return Object.fromEntries(Object.entries(saved)
      .filter(([key, quantity]) => validKeys.has(key) && Number.isInteger(quantity) && quantity > 0)
      .map(([key, quantity]) => [key, Math.min(99, quantity)]));
  } catch { return {}; }
}

function saveCart() {
  try { localStorage.setItem(cartStorageKey, JSON.stringify(cart)); } catch { /* Storage is optional. */ }
}

function cartCount() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function cartProducts() {
  return [
    ...editions.map(item => ({ ...item, kind: 'pack' })),
    ...pokemonCards.map(card => ({ ...card, key: `card:${card.key}`, kind: 'card' })),
  ];
}

function animateNumber(node) {
  node.classList.remove('is-popping');
  void node.offsetWidth;
  node.classList.add('is-popping');
}

function renderCart(newlyAddedKey = null) {
  const total = cartCount();
  const packTotal = editions.reduce((sum, item) => sum + (cart[item.key] || 0), 0);
  const cardTotal = pokemonCards.reduce((sum, card) => sum + (cart[`card:${card.key}`] || 0), 0);
  const countNode = document.querySelector('#cartCount');
  const headingCount = document.querySelector('#cartHeadingCount');
  countNode.textContent = String(total);
  headingCount.textContent = String(total);
  countNode.setAttribute('aria-label', `${total} ${total === 1 ? 'item' : 'items'} in cart`);
  const summary = [packTotal && `${packTotal} ${packTotal === 1 ? 'pack' : 'packs'}`, cardTotal && `${cardTotal} ${cardTotal === 1 ? 'single card' : 'single cards'}`].filter(Boolean);
  document.querySelector('#cartSummary').textContent = total ? `${summary.join(' · ')} in your cart.` : 'Pick a pack or a card to begin.';
  cartItems.innerHTML = cartProducts().filter(item => cart[item.key])
    .map(item => componentLibrary.cartLine(item, cart[item.key], item.key === newlyAddedKey)).join('');
  if (!total) cartItems.innerHTML = '<p class="cart-empty">Your cart is clear. Pick a pack or a single card.</p>';
}

function openCart() {
  cartFocusReturn = document.activeElement;
  cartDrawer.inert = false;
  cartBackdrop.inert = false;
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartBackdrop.setAttribute('aria-hidden', 'false');
  cartDrawer.classList.add('is-open');
  cartBackdrop.classList.add('is-open');
  cartToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('cart-open');
  document.querySelector('#cartClose').focus({ preventScroll: true });
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartBackdrop.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartBackdrop.setAttribute('aria-hidden', 'true');
  cartDrawer.inert = true;
  cartBackdrop.inert = true;
  cartToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('cart-open');
  cartFocusReturn?.focus?.({ preventScroll: true });
}

function announceCart(message) {
  const toast = document.querySelector('#cartToast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(cartToastTimer);
  cartToastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

document.querySelectorAll('[data-coming-soon]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    announceCart(`${link.childNodes[0].textContent.trim()} isn't open in this preview yet.`);
  });
});

function playSound(kind = 'tap', intensity = 1) {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ??= new AudioContextClass();
    if (audioContext.state === 'suspended') audioContext.resume();
    const ctx = audioContext;
    const now = ctx.currentTime;
    if (kind === 'build') {
      stopBuildUp();
      const level = Math.max(.12, Math.min(1, intensity));
      const duration = 1.6 + 1.5 * level;
      const low = ctx.createOscillator();
      const lowGain = ctx.createGain();
      const lowFilter = ctx.createBiquadFilter();
      low.type = 'sawtooth';
      low.frequency.setValueAtTime(44, now);
      low.frequency.exponentialRampToValueAtTime(92, now + duration);
      lowFilter.type = 'lowpass';
      lowFilter.frequency.setValueAtTime(95, now);
      lowFilter.frequency.exponentialRampToValueAtTime(680, now + duration);
      lowGain.gain.setValueAtTime(.0001, now);
      lowGain.gain.exponentialRampToValueAtTime(.065 * level, now + duration * .88);
      lowGain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      low.connect(lowFilter).connect(lowGain).connect(ctx.destination);
      low.start(now);
      low.stop(now + duration + .02);

      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(164, now + .15);
      shimmer.frequency.exponentialRampToValueAtTime(740, now + duration);
      shimmerGain.gain.setValueAtTime(.0001, now);
      shimmerGain.gain.exponentialRampToValueAtTime(.028 * level, now + duration * .9);
      shimmerGain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      shimmer.connect(shimmerGain).connect(ctx.destination);
      shimmer.start(now + .1);
      shimmer.stop(now + duration + .02);

      const length = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) samples[i] = (Math.random() * 2 - 1) * (i / length) ** 1.8;
      const rush = ctx.createBufferSource();
      const rushFilter = ctx.createBiquadFilter();
      const rushGain = ctx.createGain();
      rush.buffer = buffer;
      rushFilter.type = 'bandpass';
      rushFilter.Q.value = .55;
      rushFilter.frequency.setValueAtTime(260, now);
      rushFilter.frequency.exponentialRampToValueAtTime(3600, now + duration);
      rushGain.gain.setValueAtTime(.0001, now);
      rushGain.gain.exponentialRampToValueAtTime(.036 * level, now + duration * .92);
      rushGain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      rush.connect(rushFilter).connect(rushGain).connect(ctx.destination);
      rush.start(now);
      rush.stop(now + duration + .02);
      buildUpNodes = [low, shimmer, rush];
      return;
    }
    if (kind === 'rip') {
      const addTear = ({ duration, start, end, peak, type = 'bandpass', q = .7, delay = 0 }) => {
        const length = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i += 1) {
          const t = i / length;
          const crackle = Math.random() > .94 ? .35 : 1;
          data[i] = (Math.random() * 2 - 1) * crackle * (1 - t) ** .5;
        }
        const noise = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        const startAt = now + delay;
        noise.buffer = buffer;
        filter.type = type;
        filter.frequency.setValueAtTime(start, startAt);
        filter.frequency.exponentialRampToValueAtTime(end, startAt + duration * .9);
        filter.Q.value = q;
        gain.gain.setValueAtTime(.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(peak, startAt + .025);
        gain.gain.exponentialRampToValueAtTime(.0001, startAt + duration);
        noise.connect(filter).connect(gain).connect(ctx.destination);
        noise.start(startAt);
        noise.stop(startAt + duration + .01);
      };
      // Broad foil rasp, a papery crinkle, then a small low seam-release thud.
      addTear({ duration: .36, start: 1850, end: 520, peak: .105 });
      addTear({ duration: .24, start: 4200, end: 1250, peak: .045, q: .45, delay: .09 });
      addTear({ duration: .12, start: 260, end: 110, peak: .055, type: 'lowpass', q: .7, delay: .2 });
      return;
    }
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const isReveal = kind === 'reveal';
    oscillator.type = isReveal ? 'sine' : 'triangle';
    oscillator.frequency.setValueAtTime(isReveal ? 640 : 390, now);
    oscillator.frequency.exponentialRampToValueAtTime(isReveal ? 980 : 240, now + (isReveal ? .28 : .09));
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(isReveal ? .075 : .045, now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + (isReveal ? .32 : .12));
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + (isReveal ? .34 : .14));
    if (isReveal) {
      const length = Math.floor(ctx.sampleRate * .2);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 1.2;
      const slide = ctx.createBufferSource();
      const lowPass = ctx.createBiquadFilter();
      const slideGain = ctx.createGain();
      slide.buffer = buffer;
      lowPass.type = 'lowpass';
      lowPass.frequency.setValueAtTime(1600, now + .025);
      lowPass.frequency.exponentialRampToValueAtTime(460, now + .2);
      slideGain.gain.setValueAtTime(.0001, now + .025);
      slideGain.gain.exponentialRampToValueAtTime(.055, now + .05);
      slideGain.gain.exponentialRampToValueAtTime(.0001, now + .22);
      slide.connect(lowPass).connect(slideGain).connect(ctx.destination);
      slide.start(now + .025);
      slide.stop(now + .23);
    }
  } catch { /* Audio is optional where Web Audio is unavailable. */ }
}

function revealTier(card = pokemonCards.find(item => item.key === selectedPokemonCardKey)) {
  const rarity = card?.rarity.toLowerCase() || '';
  let cardTier = 0;
  if (/common|uncommon|basic/.test(rarity)) cardTier = 0;
  else if (/amazing|illustration|secret|rainbow|gold|special illustration/.test(rarity)) cardTier = 4;
  else if (/vmax|vstar|gx|\bex\b|prime|break|holo/.test(rarity)) cardTier = 3;
  else if (/rare/.test(rarity)) cardTier = 1;
  const packTier = { basic: 0, pro: 1, legend: 2, premium: 3, elite: 4, apex: 5 }[selectedPackKey] || 0;
  return Math.max(cardTier, packTier);
}

function playRarityReveal(tier) {
  if (!soundEnabled || tier <= 0) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ??= new AudioContextClass();
    if (audioContext.state === 'suspended') audioContext.resume();
    const ctx = audioContext;
    const now = ctx.currentTime;
    const level = tier / 5;
    const duration = .16 + level * .44;
    const master = ctx.createGain();
    master.gain.value = .45 + level * .45;
    master.connect(ctx.destination);
    const notes = tier >= 5 ? [523, 784, 1046, 1568] : tier >= 3 ? [587, 880, 1174] : [659, 988];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + index * (tier >= 5 ? .045 : .025);
      oscillator.type = index === 0 && tier >= 4 ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(frequency * (.96 + level * .04), start);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * (1.18 + level * .12), start + duration);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime((.012 + level * .022) / (index + 1), start + .018);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration + .08);
      oscillator.connect(gain).connect(master);
      oscillator.start(start);
      oscillator.stop(start + duration + .09);
    });
    if (tier >= 3) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(tier >= 5 ? 92 : 138, now);
      oscillator.frequency.exponentialRampToValueAtTime(tier >= 5 ? 46 : 72, now + .32);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(tier >= 5 ? .095 : .045, now + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .38);
      oscillator.connect(gain).connect(master);
      oscillator.start(now);
      oscillator.stop(now + .4);
    }
  } catch { /* Audio is optional where Web Audio is unavailable. */ }
}

function stopBuildUp() {
  if (!buildUpNodes.length || !audioContext) return;
  const now = audioContext.currentTime;
  buildUpNodes.forEach(node => {
    try { node.stop(now + .015); } catch { /* Sound may have completed already. */ }
  });
  buildUpNodes = [];
}

function updateStatus() {
  const item = editions.find(edition => edition.key === selectedPackKey) || editions[0];
  if (demoPack.dataset.edition !== item.key) {
    demoPack.src = posterPath(item);
    demoPack.alt = `${item.name} Graded pack`;
    demoTear.src = posterPath(item);
    demoPack.dataset.edition = item.key;
    demoTear.dataset.edition = item.key;
  }
  motionButton.textContent = paused ? 'Resume wheel' : 'Pause wheel';
  motionButton.setAttribute('aria-label', paused ? 'Resume wheel' : 'Pause wheel');
  motionButton.setAttribute('aria-pressed', String(paused));
  fanButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pack === selectedPackKey)));
  document.querySelectorAll('#packSelector .pack-select[data-pack]').forEach(button => {
    const selected = button.dataset.pack === selectedPackKey;
    button.closest('.pack-option').classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-pack-quantity]').forEach(node => {
    node.textContent = String(packQuantities[node.dataset.packQuantity]);
    const decrement = rail.querySelector(`[data-pack-qty="${node.dataset.packQuantity}"][data-step="-1"]`);
    decrement.disabled = packQuantities[node.dataset.packQuantity] <= 1;
  });
}

function renderWheel() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  // Match the Figma composition: the orbit's centre sits below the fold,
  // leaving the upper arc visible. Scale the packet art from the stage height.
  const mobile = width <= 700;
  const radius = height * .77;
  const orbitCenterY = height * (mobile ? 1.09 : 1.14);
  const cardHeight = height * (mobile ? .548 : .70);
  const cardWidth = cardHeight * .557;
  fanButtons.forEach((button, i) => {
    const a = angle + i * STEP;
    const x = Math.cos(a) * radius;
    const y = orbitCenterY + Math.sin(a) * radius;
    const radialTurn = a + Math.PI / 2;
    button.style.left = '50%';
    button.style.top = '0';
    button.style.width = `${cardWidth}px`;
    button.style.height = `${cardHeight}px`;
    button.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${radialTurn}rad)`;
    button.style.opacity = '1';
  });
}

// Give every pack a permanent depth layer based on its starting orbit slot.
// The wheel continues to rotate, but packs never trade front/back z-order.
fanButtons
  .map((button, i) => ({ button, depth: Math.sin(-Math.PI / 2 + i * STEP) }))
  .sort((a, b) => a.depth - b.depth)
  .forEach(({ button }, rank, ordered) => {
    button.style.zIndex = String(ordered.length - rank);
  });

function shouldAnimate() {
  return visible && !document.hidden && !paused;
}
function schedule() {
  if (frame === null && shouldAnimate()) frame = requestAnimationFrame(tick);
}
function tick(now) {
  frame = null;
  const dt = Math.min(48, lastFrame ? now - lastFrame : 16);
  lastFrame = now;
  if (!paused) {
    angle = (angle + baseSpeed * dt) % TAU;
    if (angle < 0) angle += TAU;
  }
  renderWheel();
  schedule();
}

fanButtons.forEach(button => button.addEventListener('click', () => {
  selectedPackKey = button.dataset.pack;
  updateStatus();
  playSound('tap');
}));
function changePackQuantity(key, step) {
  packQuantities[key] = Math.max(1, Math.min(99, packQuantities[key] + step));
  const value = rail.querySelector(`[data-pack-quantity="${key}"]`);
  value.textContent = String(packQuantities[key]);
  rail.querySelector(`[data-pack-qty="${key}"][data-step="-1"]`).disabled = packQuantities[key] <= 1;
  animateNumber(value);
}

function changeCartQuantity(key, step) {
  if (!cart[key]) return;
  cart[key] = Math.min(99, cart[key] + step);
  if (cart[key] <= 0) delete cart[key];
  saveCart();
  renderCart();
  animateNumber(document.querySelector('#cartCount'));
  const value = cartItems.querySelector(`[data-cart-item="${key}"] .cart-line-controls > span`);
  if (value) animateNumber(value);
}

rail.addEventListener('click', event => {
  const quantity = event.target.closest('[data-pack-qty]');
  if (quantity) {
    changePackQuantity(quantity.dataset.packQty, Number(quantity.dataset.step));
    playSound('tap');
    return;
  }
  const addButton = event.target.closest('[data-add-pack]');
  if (addButton) {
    const key = addButton.dataset.addPack;
    const item = editions.find(edition => edition.key === key);
    cart[key] = Math.min(99, (cart[key] || 0) + packQuantities[key]);
    saveCart();
    renderCart(key);
    animateNumber(document.querySelector('#cartCount'));
    addButton.textContent = 'Added';
    setTimeout(() => { addButton.textContent = 'Add to cart'; }, 1100);
    playSound('tap');
    announceCart(`${item.name} × ${packQuantities[key]} added`);
    openCart();
    return;
  }
  const button = event.target.closest('.pack-select[data-pack]');
  if (!button) return;
  selectedPackKey = button.dataset.pack;
  updateStatus();
  playSound('tap');
});
rail.addEventListener('keydown', event => {
  if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
  const current = event.target.closest('.pack-select[data-pack]');
  if (!current) return;
  event.preventDefault();
  const selectedIndex = editions.findIndex(item => item.key === selectedPackKey);
  const next = (selectedIndex + (event.key === 'ArrowRight' ? 1 : -1) + editions.length) % editions.length;
  selectedPackKey = editions[next].key;
  updateStatus();
  playSound('tap');
  rail.querySelectorAll('.pack-select[data-pack]')[next].focus();
});
cartToggle.addEventListener('click', () => {
  playSound('tap');
  openCart();
});
document.querySelector('#cartClose').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
document.querySelector('#continueShopping').addEventListener('click', () => {
  closeCart();
  document.querySelector('#packSelector').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
});
cartItems.addEventListener('click', event => {
  const remove = event.target.closest('[data-cart-remove]');
  if (remove) {
    delete cart[remove.dataset.cartRemove];
    saveCart();
    renderCart();
    announceCart('Pack removed from your cart.');
    return;
  }
  const quantity = event.target.closest('[data-cart-key]');
  if (quantity) {
    changeCartQuantity(quantity.dataset.cartKey, Number(quantity.dataset.cartStep));
    playSound('tap');
  }
});
document.addEventListener('keydown', event => {
  if (!cartDrawer.classList.contains('is-open')) return;
  if (event.key === 'Escape') { closeCart(); return; }
  if (event.key !== 'Tab') return;
  const focusable = [...cartDrawer.querySelectorAll('button:not(:disabled)')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
document.querySelector('#railPrev').addEventListener('click', () => {
  playSound('tap');
  rail.scrollBy({ left: -rail.clientWidth * .7, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
document.querySelector('#railNext').addEventListener('click', () => {
  playSound('tap');
  rail.scrollBy({ left: rail.clientWidth * .7, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
motionButton.addEventListener('click', () => {
  playSound('tap');
  paused = !paused;
  updateStatus();
  renderWheel();
  schedule();
});
soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = soundEnabled ? 'Sound on' : 'Sound off';
  soundButton.setAttribute('aria-label', soundEnabled ? 'Turn sound off' : 'Turn sound on');
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
  if (!soundEnabled) stopBuildUp();
  if (soundEnabled) playSound('tap');
});
reducedMotion.addEventListener('change', event => {
  paused = event.matches;
  updateStatus();
  renderWheel();
  schedule();
});
new IntersectionObserver(entries => {
  visible = entries[0]?.isIntersecting ?? false;
  if (!visible && frame !== null) { cancelAnimationFrame(frame); frame = null; lastFrame = 0; }
  else schedule();
}, { threshold: .02 }).observe(stage);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && frame !== null) { cancelAnimationFrame(frame); frame = null; lastFrame = 0; }
  else schedule();
});
window.addEventListener('resize', renderWheel);
updateStatus();
renderCart();
renderWheel();
schedule();

document.querySelector('#grailCardShelf').addEventListener('click', event => {
  const card = event.target.closest('[data-grail-card]');
  if (!card) return;
  selectPokemonCard(card.dataset.grailCard);
  playSound('tap');
  document.querySelector('#cardPreviewDialog').showModal();
});

document.querySelector('#cardMarketSlot').addEventListener('click', event => {
  const buyButton = event.target.closest('[data-buy-card]');
  const bidButton = event.target.closest('[data-bid-card]');
  const key = buyButton?.dataset.buyCard || bidButton?.dataset.bidCard;
  if (!key) return;
  const card = pokemonCards.find(item => item.key === key);
  if (!card) return;
  if (buyButton) {
    const cartKey = `card:${card.key}`;
    cart[cartKey] = Math.min(99, (cart[cartKey] || 0) + 1);
    saveCart();
    renderCart(cartKey);
    animateNumber(document.querySelector('#cartCount'));
    playSound('tap');
    announceCart(`${card.name} added to cart · $${card.market.price.toFixed(2)} sample price.`);
    openCart();
    return;
  }
  document.querySelector('#bidCardName').textContent = `${card.name} · #${card.number} · sample price $${card.market.price.toFixed(2)}`;
  const amount = document.querySelector('#bidAmount');
  amount.value = (card.market.price * .9).toFixed(2);
  amount.max = (card.market.price * 3).toFixed(2);
  document.querySelector('#bidDialog').showModal();
  playSound('tap');
  amount.focus();
});

document.querySelector('#bidClose').addEventListener('click', () => document.querySelector('#bidDialog').close());
document.querySelector('#bidForm').addEventListener('submit', event => {
  event.preventDefault();
  const cardName = document.querySelector('#bidCardName').textContent.split(' · ')[0];
  const amount = Number(document.querySelector('#bidAmount').value);
  document.querySelector('#bidDialog').close();
  playSound('tap');
  announceCart(`Preview only: $${amount.toFixed(2)} bid for ${cardName}. Nothing was submitted.`);
});

document.querySelector('#previewClose').addEventListener('click', () => document.querySelector('#cardPreviewDialog').close());
document.querySelector('#cardPreviewSlot').addEventListener('click', event => {
  const card = event.target.closest('#previewCard');
  if (card) {
    card.classList.toggle('is-flipped');
    const name = pokemonCards.find(item => item.key === selectedPokemonCardKey)?.name || 'card';
    card.setAttribute('aria-label', card.classList.contains('is-flipped') ? `Flip ${name} to see the Pokémon card front` : `Flip ${name} to see the Graded card back`);
    playSound('tap');
    return;
  }
  if (event.target.closest('[data-preview-market]')) {
    document.querySelector('#cardPreviewDialog').close();
    document.querySelector('#marketplace').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
  }
});
document.querySelector('#cardPreviewSlot').addEventListener('pointermove', event => {
  const card = event.target.closest('#previewCard');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1)));
  const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1)));
  card.style.setProperty('--tilt-x', `${-y * 11}deg`);
  card.style.setProperty('--tilt-y', `${x * 14}deg`);
});
document.querySelector('#cardPreviewSlot').addEventListener('pointerout', event => {
  const card = event.target.closest('#previewCard');
  if (!card || card.contains(event.relatedTarget)) return;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
});

function renderDemo() {
  const card = pokemonCards.find(item => item.key === selectedPokemonCardKey) || pokemonCards[0];
  const tier = revealTier(card);
  demo.classList.remove(...[...demo.classList].filter(name => name.startsWith('rarity-tier-')));
  demo.classList.add(`rarity-tier-${tier}`);
  demo.dataset.revealTier = String(tier);
  demo.classList.toggle('is-peeled', demoPhase === 1);
  demo.classList.toggle('is-revealed', demoPhase === 2);
  document.querySelector('#demoTitle').textContent = ['Rip it open.', 'Pull it free.', 'Card details'][demoPhase];
  demoAction.textContent = ['Rip', 'Reveal', 'Rip again'][demoPhase];
  demoAction.setAttribute('aria-label', ['Rip pack', 'Reveal card details', 'Rip another pack'][demoPhase]);
  document.querySelector('#demoRecord').hidden = demoPhase < 2;
  demoCard.setAttribute('aria-hidden', String(demoPhase === 0));
  demoCard.setAttribute('aria-label', `${card.name} Pokémon trading card`);
  demoPokemonFront.src = card.image;
  demoPokemonFront.alt = `${card.name} Pokémon card front`;
  document.querySelector('#demoRecord').innerHTML = componentLibrary.cardFacts(card, true);
  demoObject.setAttribute('aria-label', demoPhase >= 2 ? 'Card details revealed' : 'Rip the pack');
  demoObject.setAttribute('aria-disabled', String(demoPhase >= 2));
}

function renderCardPreview(card) {
  document.querySelector('#cardPreviewSlot').innerHTML = componentLibrary.cardPreview(card);
}

function selectPokemonCard(key) {
  const card = pokemonCards.find(item => item.key === key);
  if (!card) return;
  selectedPokemonCardKey = card.key;
  document.querySelectorAll('[data-grail-card]').forEach(button => {
    const selected = button.dataset.grailCard === card.key;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#cardStatsSlot').innerHTML = componentLibrary.cardFacts(card);
  document.querySelector('#cardMarketSlot').innerHTML = componentLibrary.cardMarket(card);
  renderCardPreview(card);
  renderDemo();
}
selectPokemonCard(selectedPokemonCardKey);
function advanceDemo({ ripAlreadyPlayed = false } = {}) {
  const tier = revealTier();
  if (demoPhase === 0) {
    if (!ripAlreadyPlayed) playSound('rip');
    if (tier > 0) playSound('build', tier / 5);
  }
  else if (demoPhase === 1) { stopBuildUp(); playRarityReveal(tier); }
  else { stopBuildUp(); playSound('tap'); }
  demoPhase = demoPhase === 2 ? 0 : demoPhase + 1;
  if (demoPhase === 0) updateTear(0);
  if (demoPhase >= 1) updateTear(1);
  renderDemo();
}
function openDemo() {
  lastFocus = document.activeElement;
  pausedBeforeDemo = paused;
  paused = true;
  updateStatus();
  demoPhase = 0;
  renderDemo();
  demo.hidden = false;
  document.body.classList.add('demo-open');
  demoAction.focus({ preventScroll: true });
  demo.scrollTop = 0;
  if (glowFrame === null) glowFrame = requestAnimationFrame(animateDemoGlow);
}
function closeDemo() {
  stopBuildUp();
  demo.hidden = true;
  demo.scrollTop = 0;
  document.body.classList.remove('demo-open');
  paused = pausedBeforeDemo;
  updateStatus();
  schedule();
  lastFocus?.focus();
}
function animateDemoGlow(time) {
  if (demo.hidden) { glowFrame = null; return; }
  const organicX = Math.sin(time * .00034) * 3.5 + Math.sin(time * .00011) * 2.2;
  const organicY = Math.cos(time * .00027) * 4 + Math.sin(time * .00009) * 1.6;
  glowPosition.x += (glowTarget.x + organicX - glowPosition.x) * .045;
  glowPosition.y += (glowTarget.y + organicY - glowPosition.y) * .045;
  demo.style.setProperty('--pointer-x', `${glowPosition.x.toFixed(2)}%`);
  demo.style.setProperty('--pointer-y', `${glowPosition.y.toFixed(2)}%`);
  demo.style.setProperty('--secondary-x', `${(69 + Math.sin(time * .00019) * 9).toFixed(2)}%`);
  demo.style.setProperty('--secondary-y', `${(24 + Math.cos(time * .00023) * 8).toFixed(2)}%`);
  glowFrame = requestAnimationFrame(animateDemoGlow);
}
function updateTear(progress) {
  const smallScreen = innerWidth <= 600;
  demo.style.setProperty('--tear-progress', String(progress));
  demo.style.setProperty('--tear-shift-x', `${(smallScreen ? 12 : 16) * progress}px`);
  demo.style.setProperty('--tear-lift', `${(smallScreen ? -8 : -24) * progress}px`);
  demo.style.setProperty('--tear-tilt', `${(smallScreen ? -15 : -18) * progress}deg`);
  demo.style.setProperty('--tear-fold', `${(smallScreen ? -52 : -58) * progress}deg`);
}
document.querySelectorAll('[data-open-demo]').forEach(button => button.addEventListener('click', () => {
  playSound('tap');
  openDemo();
}));
document.querySelector('#demoClose').addEventListener('click', () => {
  playSound('tap');
  closeDemo();
});
demoAction.addEventListener('click', advanceDemo);
demoObject.addEventListener('click', () => {
  if (suppressClick) { suppressClick = false; return; }
  if (demoPhase < 2) advanceDemo();
});
demoObject.addEventListener('keydown', event => {
  if (demoPhase >= 2 || !['Enter', ' '].includes(event.key)) return;
  event.preventDefault();
  advanceDemo();
});
document.addEventListener('keydown', event => {
  if (demo.hidden) return;
  if (event.key === 'Escape') { closeDemo(); return; }
  if (event.key !== 'Tab') return;
  const focusable = [document.querySelector('#demoClose'), demoObject, demoAction];
  const current = focusable.indexOf(document.activeElement);
  if (event.shiftKey && current === 0) { event.preventDefault(); focusable.at(-1).focus(); }
  else if (!event.shiftKey && current === focusable.length - 1) { event.preventDefault(); focusable[0].focus(); }
});
demoObject.addEventListener('pointerdown', event => {
  if (demo.hidden || demoPhase >= 2) return;
  swipeStart = { x: event.clientX, y: event.clientY };
  ripSoundPlayed = false;
  suppressClick = false;
  demo.classList.add('is-dragging');
  demoObject.setPointerCapture(event.pointerId);
});
demoObject.addEventListener('pointermove', event => {
  if (!swipeStart || demo.hidden) return;
  const dx = event.clientX - swipeStart.x;
  const progress = Math.max(0, Math.min(1, Math.abs(dx) / 130));
  updateTear(progress);
  if (progress > .06 && !ripSoundPlayed) { playSound('rip'); ripSoundPlayed = true; }
});
demoObject.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  swipeStart = null;
  demo.classList.remove('is-dragging');
  if (Math.abs(dx) > 72 && Math.abs(dx) > Math.abs(dy) * .8) {
    suppressClick = true;
    advanceDemo({ ripAlreadyPlayed: ripSoundPlayed });
  } else updateTear(0);
});
demoObject.addEventListener('pointercancel', () => {
  swipeStart = null;
  demo.classList.remove('is-dragging');
  updateTear(0);
});
demo.addEventListener('pointermove', event => {
  glowTarget.x = event.clientX / innerWidth * 100;
  glowTarget.y = event.clientY / innerHeight * 100;
  const objectRect = demoObject.getBoundingClientRect();
  const objectX = Math.max(0, Math.min(100, (event.clientX - objectRect.left) / objectRect.width * 100));
  const objectY = Math.max(0, Math.min(100, (event.clientY - objectRect.top) / objectRect.height * 100));
  demoObject.style.setProperty('--object-light-x', `${objectX.toFixed(1)}%`);
  demoObject.style.setProperty('--object-light-y', `${objectY.toFixed(1)}%`);
  const rect = demoCard.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1)));
  const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1)));
  demoCard.style.setProperty('--card-rx', `${-y * 3.5}deg`);
  demoCard.style.setProperty('--card-ry', `${x * 3.5}deg`);
  demoCard.style.setProperty('--card-light-x', `${(x + 1) * 50}%`);
  demoCard.style.setProperty('--card-light-y', `${(y + 1) * 50}%`);
});

const hero = document.querySelector('.hero');
let exitTick = false;
function updateHeroExit() {
  exitTick = false;
  const rect = hero.getBoundingClientRect();
  const travel = Math.max(1, rect.height - innerHeight * .35);
  const progress = Math.max(0, Math.min(1, -rect.top / travel));
  stage.style.setProperty('--exit-opacity', String(1 - progress));
  stage.style.setProperty('--exit-scale', String(1 - .14 * progress));
}
window.addEventListener('scroll', () => {
  if (!exitTick) { exitTick = true; requestAnimationFrame(updateHeroExit); }
}, { passive: true });
updateHeroExit();

const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('#menuToggle');
function setMenuOpen(open) {
  siteHeader.classList.toggle('is-menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});
siteHeader.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
