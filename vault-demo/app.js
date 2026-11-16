(() => {
  const asset = name => `../assets/cards/pokemon/${name}.webp`;
  const cards = [
    { id: 'gengar', name: 'Gengar', number: '94/102', set: 'Triumphant · Prime', detail: 'Holofoil', image: asset('gengar'), market: 623.74, trend: 11.2, trendWindow: '30d', marketDate: 'Nov 10, 2026', marketSource: 'https://tickermint.cards/card/85679/gengar-prime-94' },
    { id: 'charizard', name: 'Charizard', number: '4/102', set: 'Celebrations · Classic Collection', detail: 'Holofoil', image: asset('charizard'), market: 120.36, trend: -14, trendWindow: '30d', marketDate: 'Nov 9, 2026', marketSource: 'https://tcgwatchtower.com/pokemon/sets/sword-shield/celebrations/cards/charizard-CC4' },
    { id: 'lugia', name: 'Lugia', number: '149/147', set: '30th Anniversary · Classic Collection', detail: 'Holofoil', image: asset('lugia'), market: 149.58, trend: -26.1, trendWindow: '30d', marketDate: 'Nov 15, 2026', marketSource: 'https://tcgindex.io/pokemon/card/pokemon-me-30th-celebration-classic-collection-lugia-classic-collection' },
    { id: 'magikarp', name: 'Magikarp', number: '203/193', set: 'Paldea Evolved · Illustration Rare', detail: 'Holofoil', image: asset('magikarp'), market: 289.66, trend: -22, trendWindow: '41d', marketDate: 'Nov 14, 2026', marketSource: 'https://nookdex.com/en/sets/paldea-evolved/magikarp-203' },
    { id: 'mew-vmax', name: 'Mew VMAX', number: '114/264', set: 'Fusion Strike · Ultra Rare', detail: 'Holofoil', image: asset('mew-vmax'), market: 15.24, trend: 1.9, trendWindow: '24d', marketDate: 'Nov 15, 2026', marketSource: 'https://mytcgvalue.com/card/pokemon/swsh08-fusion-strike/114/mew-vmax' },
  ];
  let savedDemo = {};
  try { savedDemo = JSON.parse(localStorage.getItem('graded-vault-demo') || '{}') || {}; } catch {}
  const makeDraftId=()=>`card-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const restoredDraft=(savedDemo.added||[]).map(item=>{const id=typeof item==='string'?item:item?.cardId||item?.id;const card=cards.find(candidate=>candidate.id===id);return card?{...card,draftId:typeof item==='object'&&item?.draftId?item.draftId:makeDraftId()}:null;}).filter(Boolean);
  const state = { tab: 'vault', screen: 'vault', previousScreen: 'vault', scenario: 'match', result: null, chosen: null, vaulted: savedDemo.vaulted || ['lugia','gengar'], added: restoredDraft, unmatched: savedDemo.unmatched || [], orders: savedDemo.orders || [], sound: savedDemo.sound !== false, search: '', query: '', filter: 'all', filtersOpen: false, showAll: false, sort: 'newest', sessionActive: false, pendingUnmatchedId: null };
  const photoDatabase = new Promise((resolve,reject)=>{if(!('indexedDB' in window)){reject(new Error('Photo storage is not available'));return;}const request=indexedDB.open('graded-vault-demo-photos',1);request.onupgradeneeded=()=>request.result.createObjectStore('photos',{keyPath:'key'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});
  function photoStore(mode,operation){return photoDatabase.then(db=>new Promise((resolve,reject)=>{const tx=db.transaction('photos',mode);let request;try{request=operation(tx.objectStore('photos'));}catch(error){reject(error);return;}request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);}));}
  const listPhotos=cardId=>photoStore('readonly',store=>store.getAll()).then(rows=>rows.filter(photo=>photo.cardId===cardId).sort((a,b)=>a.created-b.created));
  const savePhoto=(cardId,blob)=>{const key=`${cardId}:${Date.now()}:${Math.random().toString(36).slice(2,8)}`;return photoStore('readwrite',store=>store.put({key,cardId,blob,created:Date.now()}));};
  const deletePhoto=key=>photoStore('readwrite',store=>store.delete(key));
  const draftPhotoUrls=new Set();
  function clearDraftPhotoUrls(){for(const url of draftPhotoUrls)URL.revokeObjectURL(url);draftPhotoUrls.clear();}
  async function hydrateDraftPhotos(){for(const card of state.added){const host=screen.querySelector(`[data-photo-list="${card.draftId}"]`);if(!host)continue;try{const photos=await listPhotos(card.draftId);if(!host.isConnected)continue;host.replaceChildren();for(const photo of photos){const wrap=document.createElement('span');wrap.className='draft-photo';const image=document.createElement('img');image.src=URL.createObjectURL(photo.blob);draftPhotoUrls.add(image.src);image.alt=`Photo of ${card.name}`;const remove=document.createElement('button');remove.type='button';remove.className='draft-photo-remove';remove.dataset.removePhoto=photo.key;remove.setAttribute('aria-label',`Remove photo of ${card.name}`);remove.textContent='×';wrap.append(image,remove);host.append(wrap);}}catch{toast('Photo storage is unavailable in this browser');}}}
  async function hydrateRequestPhotoCounts(entries=state.added){for(const entry of entries){const host=screen.querySelector(`[data-photo-count="${entry.draftId}"]`);if(!host)continue;try{const count=(await listPhotos(entry.draftId)).length;host.textContent=`${count} ${count===1?'photo':'photos'}`;}catch{host.textContent='Photos unavailable';}}}
  async function compressPhoto(file){if(!('createImageBitmap' in window))return file;const bitmap=await createImageBitmap(file);const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close?.();return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not process photo')),'image/jpeg',.84));}
  function saveDemoState() {
    try { localStorage.setItem('graded-vault-demo', JSON.stringify({ vaulted: state.vaulted, added: state.added.map(card => ({cardId:card.id,draftId:card.draftId})), unmatched: state.unmatched, orders: state.orders, sound: state.sound })); } catch {}
  }
  const screen = document.querySelector('#screen');
  const dialog = document.querySelector('#cardDialog');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const iconSearch = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>';
  const marketLine = card => `<span class="market-line"><span>Est. $${card.market.toFixed(2)}</span><span class="market-trend ${card.trend>=0?'is-bull':'is-bear'}" title="${card.trendWindow} market trend" aria-label="${card.trend>=0?'Bullish':'Bearish'} trend, ${Math.abs(card.trend)} percent over ${card.trendWindow}">${card.trend>=0?'Bull':'Bear'} · ${card.trend>=0?'+':''}${card.trend}%</span></span>`;
  const cardButton = card => `<button class="collection-card" type="button" data-card="${escape(card.id)}" aria-label="Inspect ${escape(card.name)}, estimated market value ${card.market} US dollars, ${card.trend>=0?'bullish':'bearish'} trend"><span class="card-image-wrap"><img src="${escape(card.image)}" alt="${escape(card.name)} Pokémon card" loading="lazy"></span><span class="collection-title">${escape(card.name)}</span><span class="collection-meta">${escape(card.set)} · #${escape(card.number)}</span>${marketLine(card)}</button>`;
  const cardRow = card => `<button class="search-result" type="button" data-choose="${escape(card.id)}"><img src="${escape(card.image)}" alt=""><span><strong>${escape(card.name)}</strong><small>${escape(card.set)} · #${escape(card.number)}</small>${marketLine(card)}</span><span class="arrow" aria-hidden="true">›</span></button>`;
  const backButton = () => `<button class="back-button" type="button" data-action="back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>Back</button>`;
  function renderVault() {
    let filtered = cards.filter(card=>state.vaulted.includes(card.id));
    const query = (state.search || '').toLowerCase().trim();
    if (query) filtered = filtered.filter(c => `${c.name} ${c.set} ${c.number} ${c.detail}`.toLowerCase().includes(query));
    if (state.sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    const vaultValue=cards.filter(card=>state.vaulted.includes(card.id)).reduce((sum,card)=>sum+card.market,0);
    screen.innerHTML = `<div class="vault-head"><div><p class="eyebrow">Your cards, secured with Graded</p><h1>Your vault</h1><p class="screen-subtitle">${state.vaulted.length} ${state.vaulted.length===1?'card':'cards'} · $${vaultValue.toFixed(2)} USD raw market est.</p></div><span class="collection-count">Digital vault</span></div>
      <label class="searchbar">${iconSearch}<input id="vaultSearch" type="search" placeholder="Search vaulted cards" value="${escape(state.search || '')}" autocomplete="off"></label>
      ${state.added.length || state.unmatched.length ? `<div class="draft-banner"><p><strong>${state.added.length} ready to vault</strong>${state.unmatched.length?` · ${state.unmatched.length} unmatched`:''}</p><button type="button" data-action="shipping">Review list</button></div>` : ''}
      <div class="section-label"><h2>${state.search ? 'Search results' : 'Vaulted cards'}</h2><button class="text-link" type="button" data-action="sort" aria-label="Sort cards, currently ${state.sort==='newest'?'newest first':'name A to Z'}">Sort · ${state.sort==='newest'?'newest':'A–Z'}</button></div>
      <p class="market-disclaimer">Raw market references in USD · condition and edition affect value</p>
      <div class="card-grid">${filtered.map(cardButton).join('') || `<div class="no-results"><strong>${state.search?'No cards found':'Your vault is ready for your cards'}</strong><p>${state.search?'Try another card name, set or number.':'Scan or search to prepare cards for vaulting.'}</p><button class="text-link" type="button" data-action="scan">Add cards</button></div>`}</div><div class="floating-space"></div>`;
  }
  function renderOrders() {
    const progress=(step,percent,label)=>`<span class="order-progress-meta"><span>${label}</span><strong>${step} of 4 steps</strong></span><span class="order-progress-track" role="progressbar" aria-label="Vaulting progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="--progress:${percent}%"></span></span>`;
    screen.innerHTML = `<div class="screen-heading"><p class="eyebrow">Your activity</p><h1>Orders</h1><p class="screen-subtitle">Track cards from shipment to vault.</p></div>
      ${state.orders.map(order=>`<button class="order-card" type="button" data-order-id="${escape(order.id)}"><span class="order-status is-saved">Request saved</span><strong>Vaulting shipment · ${order.cards.length} ${order.cards.length===1?'card':'cards'}</strong><small>Created ${escape(order.date)} · Local preview</small>${progress(1,16,'Preview progress')}<span class="order-eta">Your request is saved</span><span class="order-arrow" aria-hidden="true">›</span></button>`).join('')}
      <div class="order-list"><button class="order-card" type="button" data-order="sample"><span class="order-status">Card review</span><strong>Vaulting shipment · 20 cards</strong>${progress(2,58,'Card review')}<span class="order-eta">Estimated vaulting · 3–5 business days</span><span class="order-arrow" aria-hidden="true">›</span></button></div><p class="orders-note">Preview status and timing are illustrative.</p>`;
  }
  function renderOrderDetails() {
    screen.innerHTML = `<div class="camera-head">${backButton()}<span class="demo-tag">Shipment · GR-042-831</span></div>
      <div class="screen-heading"><p class="eyebrow">20 cards · Received by Graded</p><h1>Shipment in progress</h1><p class="screen-subtitle">Your cards are being checked before they are added to your digital vault.</p></div>
      <section class="shipment-progress" aria-label="Vaulting progress"><div class="progress-meta"><span>Card review</span><strong>2 of 4 steps</strong></div><div class="progress-track" role="progressbar" aria-label="Shipment progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="58"><span></span></div><div class="eta-row"><span>Estimated vaulting</span><strong>3–5 business days</strong></div><small class="estimate-note">Preview estimate · timing may vary after physical intake</small></section>
      <section class="timeline" aria-label="Shipment timeline"><div class="timeline-step is-done"><span></span><strong>Cards received</strong><small>Shipment checked in</small></div><div class="timeline-step is-current"><span></span><strong>Card review</strong><small>Authenticity and condition review</small></div><div class="timeline-step"><span></span><strong>Grading</strong><small>Preparation and grading</small></div><div class="timeline-step"><span></span><strong>Added to your vault</strong><small>Digital records and values become available</small></div></section>
      <p class="orders-note">Local preview only · No physical shipment is connected.</p>`;
  }
  function renderAccount() {
    screen.innerHTML = `<div class="screen-heading"><p class="eyebrow">Your Graded account</p><h1>Account</h1></div>
      <div class="account-card"><img class="avatar" src="../assets/brand/graded-collector-avatar.png" alt="Anime-inspired collector avatar"><span><strong>Collector</strong><small>Demo account · Local preview</small></span></div>
      <div class="settings-row"><span>Personal details</span><span>›</span></div><div class="settings-row"><span>Notifications</span><span>›</span></div><div class="settings-row"><span>Privacy &amp; security</span><span>›</span></div><div class="settings-row"><span>Help &amp; support</span><span>›</span></div>
      <button class="settings-toggle" type="button" data-action="toggle-sound" aria-pressed="${state.sound}"><span><strong>Sound effects</strong><small>Subtle scan and touch feedback</small></span><span class="toggle-state">${state.sound?'On':'Off'}</span></button>
      <p class="screen-footer">Demo · Your vaulting stack and sound settings stay in this browser.</p>`;
  }
  function renderDraft() {
    const matched=state.added;
    const total=matched.length+state.unmatched.length;
    const unmatchedRows=state.unmatched.map(item=>`<article class="unmatched-item"><span class="unmatched-icon" aria-hidden="true">?</span><span class="unmatched-copy"><strong>Needs a match</strong><small>Search by name or scan this card again.</small></span><span class="unmatched-actions"><button class="icon-action" type="button" data-resolve-unmatched="${escape(item.id)}" aria-label="Search for unmatched card" title="Search">${iconSearch}</button><button class="icon-action" type="button" data-rescan-unmatched="${escape(item.id)}" aria-label="Scan unmatched card again" title="Scan again"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4m0 0h4M4 4l4 4M20 16v4m0 0h-4m4 0-4-4M8 20h8a3 3 0 0 0 3-3v-2M16 4H8a3 3 0 0 0-3 3v2"></path></svg></button></span></article>`).join('');
    screen.innerHTML = `<div class="camera-head">${backButton()}<span class="demo-tag">${total} ${total===1?'card':'cards'} · ${matched.length} matched</span></div>
      <div class="screen-heading"><p class="eyebrow">Review every card before sending</p><h1>Ready for vaulting</h1><p class="screen-subtitle">Your stack stays here while you scan, search, and add photos.</p></div>
      <section class="review-metrics" aria-label="Card review summary"><div><strong>${total}</strong><span>Cards in stack</span></div><div><strong>${matched.length}</strong><span>Matched</span></div><div><strong>${state.unmatched.length}</strong><span>Need a match</span></div></section>
      ${state.unmatched.length?`<section class="unmatched-list"><div class="section-label"><h2>Needs a match</h2><span>${state.unmatched.length}</span></div>${unmatchedRows}</section>`:''}
      <section class="matched-list"><div class="section-label"><h2>Matched cards</h2><span>${matched.length}</span></div><div class="draft-list">${matched.map(card => `<article class="draft-item"><img class="draft-card-art" src="${escape(card.image)}" alt="${escape(card.name)} Pokémon card"><span class="draft-item-copy"><strong>${escape(card.name)}</strong><small>${escape(card.set)} · #${escape(card.number)}</small>${marketLine(card)}</span><span class="draft-card-actions"><button class="draft-add-photos" type="button" data-add-photos="${escape(card.draftId)}" aria-label="Add photos of ${escape(card.name)}" title="Add photos"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="10" r="1.5"></circle><path d="m5 17 5-5 3 3 2-2 4 4"></path></svg></button><button class="draft-remove" type="button" data-remove-card="${escape(card.draftId)}" aria-label="Remove ${escape(card.name)} from stack" title="Remove"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"></path></svg></button><input class="draft-photo-input" type="file" accept="image/*" multiple data-photo-input="${escape(card.draftId)}" aria-label="Choose photos for ${escape(card.name)}" hidden></span><span class="draft-photo-strip" data-photo-list="${escape(card.draftId)}" aria-label="Photos of ${escape(card.name)}"></span></article>`).join('') || `<div class="no-results"><strong>No matched cards yet</strong><p>Scan a card or search by name to add it to the stack.</p></div>`}</div></section>
      <div class="draft-actions"><button class="button button-secondary" type="button" data-action="scan">Add cards</button><button class="button" type="button" data-action="continue-draft" ${matched.length&&!state.unmatched.length?'':'disabled'}>Review shipment</button>${state.unmatched.length?'<p class="stack-blocked-note">Match or scan again every card before reviewing the shipment.</p>':''}<button class="text-link" type="button" data-action="vault">Back to vault</button></div>`;
  }
  function renderDraftReview() {
    const unmatched=state.unmatched.map(item=>`<article class="unmatched-item"><span class="unmatched-icon" aria-hidden="true">?</span><span class="unmatched-copy"><strong>Needs a match</strong><small>Search by name or scan this card again.</small></span><span class="unmatched-actions"><button class="icon-action" type="button" data-resolve-unmatched="${escape(item.id)}" aria-label="Search for unmatched card">${iconSearch}</button><button class="icon-action" type="button" data-rescan-unmatched="${escape(item.id)}" aria-label="Scan unmatched card again"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4m0 0h4M4 4l4 4M20 16v4m0 0h-4m4 0-4-4M8 20h8a3 3 0 0 0 3-3v-2M16 4H8a3 3 0 0 0-3 3v2"></path></svg></button></span></article>`).join('');
    const rawValue=state.added.reduce((sum,card)=>sum+card.market,0);
    screen.innerHTML = `<div class="camera-head"><button class="back-button" type="button" data-action="shipping">‹&nbsp; Edit stack</button><span class="demo-tag">Before shipping</span></div>
      <div class="screen-heading"><p class="eyebrow">Check the whole stack</p><h1>Review your cards</h1><p class="screen-subtitle">${state.added.length+state.unmatched.length} cards · ${state.added.length} matched · ${state.unmatched.length} need a match</p></div>
      ${state.unmatched.length?`<section class="unmatched-list"><div class="section-label"><h2>Needs a match</h2><span>${state.unmatched.length}</span></div>${unmatched}</section>`:''}
      <section class="matched-list"><div class="section-label"><h2>Matched cards</h2><span>${state.added.length}</span></div><div class="request-summary">${state.added.map(card=>`<div class="request-item"><img src="${escape(card.image)}" alt=""><span><strong>${escape(card.name)}</strong><small>${escape(card.set)} · #${escape(card.number)}</small>${marketLine(card)}<span class="request-photo-count" data-photo-count="${escape(card.draftId)}">Photos</span></span></div>`).join('')}</div></section>
      <div class="review-note"><strong>Estimated raw market value · $${rawValue.toFixed(2)} USD</strong><br>Market references are ungraded estimates. Condition, language, edition, and final verification can change the value.</div>
      <div class="review-actions"><button class="button" type="button" data-action="create-request" ${state.added.length&&state.unmatched.length===0?'':'disabled'}>Save demo shipment request</button><button class="text-link" type="button" data-action="shipping">Edit stack</button></div>`;
  }
  function renderRequestDone() {
    const order=state.orders[0];
    screen.innerHTML=`<div class="empty-state"><span class="empty-icon"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"></path></svg></span><p class="eyebrow">Shipping request saved</p><h1>Your vaulting journey has started.</h1><p>Your ${order?.cards.length||0} cards are in Orders. Add shipping details there; after intake and grading, they will appear in your digital vault.</p><button class="button" type="button" data-action="orders">View Orders</button><button class="text-link" type="button" data-action="vault">Back to vault</button></div>`;
  }
  function renderRequestDetails(){const order=state.orders.find(item=>item.id===state.currentOrderId)||state.orders[0];const entries=(order?.cards||[]).map(value=>typeof value==='string'?{cardId:value,draftId:value}:value);screen.innerHTML=`<div class="camera-head"><button class="back-button" type="button" data-action="orders">‹&nbsp; Orders</button><span class="demo-tag">Local demo</span></div><div class="screen-heading"><p class="eyebrow">${escape(order?.id||'Demo request')}</p><h1>Request details</h1><p class="screen-subtitle">${entries.length} ${entries.length===1?'card':'cards'} · Created ${escape(order?.date||'today')}</p></div><div class="request-summary">${entries.map(entry=>{const card=cards.find(item=>item.id===entry.cardId);return card?`<div class="request-item"><img src="${escape(card.image)}" alt=""><span><strong>${escape(card.name)}</strong><small>${escape(card.set)} · #${escape(card.number)}</small>${marketLine(card)}</span><span class="request-photo-count" data-photo-count="${escape(entry.draftId)}">Photos</span></div>`:''}).join('')}</div><div class="review-note"><strong>Next step</strong><br>Complete shipping details and send your cards to Graded. They will be added to the digital vault after intake and grading. This is a local demo request.</div>`;state.currentOrderEntries=entries;}
  function renderScan() {
    const match = state.result === 'match';
    const sample = cards.find(c => c.id === 'charizard');
    const query=(state.query||'').toLowerCase().trim();
    const matches=query?cards.filter(card=>`${card.name} ${card.set} ${card.number} ${card.detail}`.toLowerCase().includes(query)):[];
    const noMatchToast=!state.scanning&&state.result==='fallback'?'<div class="scan-toast" role="status"><strong>No exact match</strong><span>This card stays in “Needs a match” until it’s identified.</span></div>':'';
    const matchResult=!state.scanning&&match?`<div class="scan-result"><span class="result-mark" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-9"></path></svg></span><span class="scan-result-copy"><strong>Possible match · Charizard</strong><small>Celebrations · #4/102 · $120.36 USD</small></span></div>`:'';
    const scanActions=query?'':state.scanning?'<p class="scan-progress" role="status">Checking card…</p>':match?`<div class="scan-batch-actions"><button class="button button-scan-next" type="button" data-action="add-next">Add &amp; scan next</button><button class="button button-review-card" type="button" data-action="review">Review card</button><button class="text-link" type="button" data-action="finish-scan">Review stack</button></div>`:state.result==='fallback'?`<div class="scan-batch-actions"><button class="button button-search-card" type="button" data-action="search">Search this card</button><button class="button button-rescan-card" type="button" data-action="scan-next-unmatched">Scan again</button><button class="text-link" type="button" data-action="finish-scan">Review stack</button></div>`:`<div class="scan-batch-actions"><button class="button button-secondary" type="button" data-action="scan-now">Scan demo card</button></div>`;
    screen.innerHTML = `<div class="camera-head">${backButton()}<span class="demo-tag">Mock scanner</span></div>
      <div class="camera-title"><h1>Scan or search</h1><p>Add cards to one stack. Nothing is sent until you confirm.</p></div>
      <div class="scenario" role="group" aria-label="Mock scan result"><span>Simulate</span><button type="button" data-scenario="match" class="${state.scenario==='match'?'is-selected':''}" aria-pressed="${state.scenario==='match'}">Match</button><button type="button" data-scenario="fallback" class="${state.scenario==='fallback'?'is-selected':''}" aria-pressed="${state.scenario==='fallback'}">No match</button></div>
      <div class="camera-frame ${state.cardVisible?'has-card':''} ${state.scanning?'is-scanning':''}" id="cameraFrame"><img class="camera-card" src="${sample.image}" alt="Mock Charizard card in the scan frame"><span class="scan-corners"></span><span class="camera-sweep"></span><span class="camera-caption">Demo frame · No camera access</span></div>
      ${noMatchToast}
      <div class="search-in-scan"><div class="scan-search-heading"><span class="scan-search-rule"></span><span>Or search by name</span><span class="scan-search-rule"></span></div><label class="searchbar">${iconSearch}<input id="manualSearch" type="search" placeholder="Name, set or card number" value="${escape(state.query||'')}" autocomplete="off"></label>${query?`<div class="search-results">${matches.map(cardRow).join('')||'<div class="no-results"><strong>No matching card</strong><p>Try a different name, set, or number.</p></div>'}</div>`:'<p class="scan-search-hint">Search by card name, set, or number. Your scan stays in this stack.</p>'}</div>
      ${matchResult}${scanActions}<div class="floating-space"></div>`;
  }
  function renderSearch() {
    const query = (state.query || '').toLowerCase().trim();
    const found = cards.filter(c => !query || c.name.toLowerCase().includes(query) || c.set.toLowerCase().includes(query) || c.number.includes(query) || c.detail.toLowerCase().includes(query));
    screen.innerHTML = `<div class="camera-head">${backButton()}<button class="demo-tag flow-switch" type="button" data-action="scan">Switch to scanner</button></div><div class="screen-heading"><p class="eyebrow">Your vaulting stack stays saved</p><h1>Find your card</h1><p class="screen-subtitle">Search by card name, set, or number, then add it to your stack.</p></div>
      <label class="searchbar">${iconSearch}<input id="manualSearch" type="search" placeholder="Name or card number" value="${escape(state.query||'')}" autocomplete="off"></label>
      <div class="search-results">${found.map(cardRow).join('') || '<div class="no-results"><strong>No matching cards</strong><p>Try another spelling, set name, or card number. Your vaulting stack stays saved while you switch flows.</p></div>'}</div><div class="floating-space"></div>`;
  }
  function renderReview() {
    const card = state.chosen || cards.find(c => c.id === 'charizard'); state.chosen = card;
    screen.innerHTML = `<div class="camera-head">${backButton()}<span class="demo-tag">Review card</span></div><div class="screen-heading"><p class="eyebrow">Check before you continue</p><h1>Is this your card?</h1><p class="screen-subtitle">We found a possible match. Take a moment to check it.</p></div>
      <button class="review-slab" type="button" data-card="${escape(card.id)}"><img src="${escape(card.image)}" alt="${escape(card.name)} Pokémon card"><span class="review-slab-copy"><strong>${escape(card.name)}</strong><span>${escape(card.set)} · #${escape(card.number)}</span><span class="status-pill is-draft">Possible match</span></span></button>
      <div class="review-note"><strong>Before adding</strong><br>Confirm the card details. You can attach photos to it in your vaulting stack.</div>
      <div class="review-actions"><button class="button" type="button" data-action="confirm">Add to stack</button><button class="text-link" type="button" data-action="search">Choose a different card</button></div>`;
  }
  function renderDone() {
    const card = state.chosen || cards[0];
    screen.innerHTML = `<div class="empty-state"><span class="empty-icon"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"></path></svg></span><p class="eyebrow">Added to your stack</p><h1>${escape(card.name)} is matched.</h1><p>Your card is ready for vaulting. Continue adding cards or review the list when you're done.</p><button class="button" type="button" data-action="scan">Continue scanning</button><button class="text-link" type="button" data-action="shipping">Review card list</button></div>`;
  }
  function render() {
    document.querySelectorAll('.tab').forEach(button => { const active = button.dataset.tab === state.tab; button.classList.toggle('is-active', active); active ? button.setAttribute('aria-current','page') : button.removeAttribute('aria-current'); });
    screen.dataset.view=state.screen;
    const scanButton=document.querySelector('.scan-fab');
    const dockScan=state.screen==='orders'||state.screen==='account';
    scanButton.hidden=!['vault','orders','account'].includes(state.screen);
    scanButton.classList.toggle('is-docked',dockScan);
    const tabbar=document.querySelector('.tabbar');
    tabbar.hidden = false;
    tabbar.classList.toggle('has-scan',dockScan);
    clearDraftPhotoUrls();
    ({vault:renderVault,orders:renderOrders,account:renderAccount,draft:renderDraft,'draft-review':renderDraftReview,'draft-done':renderRequestDone,'request-details':renderRequestDetails,scan:renderScan,search:renderSearch,review:renderReview,done:renderDone,order:renderOrderDetails}[state.screen] || renderVault)();
    const content=document.createElement('div');content.className='screen-content';while(screen.firstChild)content.append(screen.firstChild);screen.append(content);
    if(state.screen==='draft')hydrateDraftPhotos();
    if(state.screen==='draft-review')hydrateRequestPhotoCounts();
    if(state.screen==='request-details')hydrateRequestPhotoCounts(state.currentOrderEntries||[]);
  }
  let scanTimers = [];
  let soundContext;
  function playSound(kind='tap') {
    if(!state.sound)return;
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
    try {
      soundContext ||= new Audio();if(soundContext.state==='suspended')soundContext.resume();
      const now=soundContext.currentTime;const notes=kind==='scan'?[392,523]:kind==='success'?[659,880]:kind==='flip'?[523,392]:[440];
      notes.forEach((frequency,index)=>{const osc=soundContext.createOscillator(),gain=soundContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(frequency,now+index*.055);gain.gain.setValueAtTime(.0001,now+index*.055);gain.gain.exponentialRampToValueAtTime(kind==='scan'?.025:.018,now+index*.055+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+index*.055+.13);osc.connect(gain);gain.connect(soundContext.destination);osc.start(now+index*.055);osc.stop(now+index*.055+.14);});
    } catch {}
  }
  function closeOpening(){const opening=document.querySelector('#vaultOpening');if(!opening||opening.classList.contains('is-closed'))return;opening.classList.add('is-closing');setTimeout(()=>opening.classList.add('is-closed'),520);}
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setTimeout(closeOpening,1650);else closeOpening();
  function clearScanTimers(){scanTimers.forEach(clearTimeout);scanTimers=[];}
  function runSampleScan(){
    clearScanTimers();state.result=null;state.cardVisible=true;state.scanning=true;render();
    scanTimers.push(setTimeout(()=>{state.cardVisible=true;render();},360));
    scanTimers.push(setTimeout(()=>{state.scanning=false;state.result=state.scenario;state.chosen=state.scenario==='match'?cards.find(c=>c.id==='charizard'):null;if(state.result==='fallback'&&!state.pendingUnmatchedId)queueUnmatched();playSound('success');render();},1450));
  }
  function startScan() {
    clearScanTimers(); if(state.screen!=='scan')state.previousScreen=state.screen;state.sessionActive=true;state.screen='scan';state.result=null;state.cardVisible=false;state.scanning=false;render();runSampleScan();
  }
  function queueUnmatched(){if(state.pendingUnmatchedId)return state.pendingUnmatchedId;const item={id:`unmatched-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`};state.unmatched.push(item);state.pendingUnmatchedId=item.id;saveDemoState();return item.id;}
  function addCurrentAndContinue(){if(state.chosen){state.added.unshift({...state.chosen,draftId:makeDraftId()});if(state.pendingUnmatchedId){state.unmatched=state.unmatched.filter(item=>item.id!==state.pendingUnmatchedId);state.pendingUnmatchedId=null;}saveDemoState();}state.result=null;state.chosen=null;runSampleScan();}
  function finishScanning(){if(state.result==='fallback')queueUnmatched();else if(state.result==='match'&&state.chosen){state.added.unshift({...state.chosen,draftId:makeDraftId()});if(state.pendingUnmatchedId)state.unmatched=state.unmatched.filter(item=>item.id!==state.pendingUnmatchedId);}state.sessionActive=false;state.pendingUnmatchedId=null;state.result=null;state.chosen=null;state.tab='vault';state.screen='draft';saveDemoState();render();}
  function openCard(card) {
    if (!card) return;
    dialog.innerHTML = `<div class="dialog-head"><button class="close-button" type="button" data-close aria-label="Close card details">×</button></div><div class="preview-stage"><button class="interactive-card" id="interactiveCard" type="button" aria-label="Flip ${escape(card.name)} card"><span class="interactive-card-inner"><span class="interactive-face interactive-face--front"><img src="${escape(card.image)}" alt="${escape(card.name)} card front" draggable="false"></span><span class="interactive-face interactive-face--back"><img class="back-frame" src="../assets/cards/figma-179-2/graded-card-reverse-frame.png" alt="" draggable="false"><img class="back-art" src="../assets/cards/figma-179-2/graded-card-reverse-art.png" alt="Graded card back" draggable="false"></span></span></button></div><p class="preview-hint">Drag to catch the light · tap to flip</p><h2 class="dialog-title">${escape(card.name)}</h2><p class="dialog-meta">${escape(card.set)} · #${escape(card.number)}</p><section class="card-market-detail"><span class="market-eyebrow">Raw market estimate</span><strong>$${card.market.toFixed(2)} USD</strong>${marketLine(card)}<small>Reference updated ${escape(card.marketDate)} · Condition and printing affect value.</small><a href="${escape(card.marketSource)}" target="_blank" rel="noreferrer">View market source ↗</a></section>`;
    dialog.showModal();
    const interactive = dialog.querySelector('#interactiveCard');
    let pointer = null, dragged = false;
    interactive.addEventListener('pointermove',event=>{if(event.pointerType==='touch'&&!pointer)return;if(pointer&&event.buttons>0&&Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>8)dragged=true;const rect=interactive.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width;const y=(event.clientY-rect.top)/rect.height;interactive.style.setProperty('--tilt-y',`${(x-.5)*18}deg`);interactive.style.setProperty('--tilt-x',`${(.5-y)*18}deg`);interactive.style.setProperty('--light-x',`${x*100}%`);interactive.style.setProperty('--light-y',`${y*100}%`);});
    interactive.addEventListener('pointerleave',()=>{interactive.style.setProperty('--tilt-x','0deg');interactive.style.setProperty('--tilt-y','0deg');});
    interactive.addEventListener('pointerdown',event=>{pointer={x:event.clientX,y:event.clientY};dragged=false;});
    interactive.addEventListener('pointerup',()=>{pointer=null;});
    interactive.addEventListener('click',event=>{if(dragged){dragged=false;event.preventDefault();return;}interactive.classList.toggle('is-flipped');playSound('flip');interactive.setAttribute('aria-pressed',String(interactive.classList.contains('is-flipped')));});
  }
  document.addEventListener('click',event=>{
    const appPointer=event.target.closest('.app');if(appPointer&&!event.target.closest('[data-action=toggle-sound]'))playSound(event.target.closest('[data-action=scan]')?'scan':'tap');
    const skip=event.target.closest('[data-action=skip-opening]');if(skip){closeOpening();return;}
    const tab=event.target.closest('[data-tab]'); if(tab){clearScanTimers();state.sessionActive=false;state.pendingUnmatchedId=null;state.tab=tab.dataset.tab;state.screen=state.tab;state.search='';render();return;}
    const scenario=event.target.closest('[data-scenario]');if(scenario){state.scenario=scenario.dataset.scenario;if(state.result)runSampleScan();else render();return;}
    const cardButtonEl=event.target.closest('[data-card]');if(cardButtonEl){openCard(cards.find(c=>c.id===cardButtonEl.dataset.card));return;}
    const choose=event.target.closest('[data-choose]');if(choose){clearScanTimers();state.scanning=false;state.previousScreen=state.screen;state.chosen=cards.find(c=>c.id===choose.dataset.choose);state.screen='review';render();return;}
    const order=event.target.closest('[data-order]');if(order){state.previousScreen=state.screen;if(order.dataset.order==='draft'){state.tab='vault';state.screen='draft';}else state.screen='order';render();return;}
    const resolveUnmatched=event.target.closest('[data-resolve-unmatched]');if(resolveUnmatched){state.pendingUnmatchedId=resolveUnmatched.dataset.resolveUnmatched;state.sessionActive=false;state.previousScreen='draft';state.screen='scan';state.result=null;state.query='';render();document.querySelector('#manualSearch')?.focus();return;}
    const rescanUnmatched=event.target.closest('[data-rescan-unmatched]');if(rescanUnmatched){state.pendingUnmatchedId=rescanUnmatched.dataset.rescanUnmatched;state.sessionActive=false;state.previousScreen='draft';state.screen='scan';state.query='';render();runSampleScan();return;}
    const requestOrder=event.target.closest('[data-order-id]');if(requestOrder){state.currentOrderId=requestOrder.dataset.orderId;state.previousScreen='orders';state.tab='orders';state.screen='request-details';render();return;}
    const addPhotos=event.target.closest('[data-add-photos]');if(addPhotos){document.querySelector(`[data-photo-input="${addPhotos.dataset.addPhotos}"]`)?.click();return;}
    const removePhoto=event.target.closest('[data-remove-photo]');if(removePhoto){deletePhoto(removePhoto.dataset.removePhoto).then(()=>render()).catch(()=>toast('Could not remove this photo'));return;}
    const action=event.target.closest('[data-action]')?.dataset.action;
    if(action==='scan'){if(state.screen==='search')state.pendingUnmatchedId=null;startScan();return;}
    if(action==='toggle-sound'){state.sound=!state.sound;saveDemoState();render();if(state.sound)playSound('tap');return;}
    if(action==='back'){clearScanTimers();state.screen=state.previousScreen||'vault';state.previousScreen='vault';if(['vault','orders','account'].includes(state.screen))state.tab=state.screen;render();return;}
    if(action==='retry'){startScan();return;}
    if(action==='add-next'){addCurrentAndContinue();return;}
    if(action==='scan-next-unmatched'){if(!state.pendingUnmatchedId)queueUnmatched();saveDemoState();runSampleScan();return;}
    if(action==='scan-now'){runSampleScan();return;}
    if(action==='finish-scan'){finishScanning();return;}
    if(action==='review'){state.previousScreen=state.screen;state.screen='review';render();return;}
    if(action==='search'){if(state.screen==='scan'&&state.result==='fallback')queueUnmatched();if(state.screen!=='scan'){state.previousScreen=state.screen;state.screen='scan';}render();document.querySelector('#manualSearch')?.focus();return;}
    if(action==='confirm'){playSound('success');if(state.chosen)state.added.unshift({...state.chosen,draftId:makeDraftId()});if(state.pendingUnmatchedId){state.unmatched=state.unmatched.filter(item=>item.id!==state.pendingUnmatchedId);state.pendingUnmatchedId=null;}saveDemoState();if(state.sessionActive){state.screen='scan';state.result=null;state.chosen=null;runSampleScan();}else{state.screen='draft';render();toast('Card added to vaulting stack');}return;}
    if(action==='vault'){state.tab='vault';state.screen='vault';state.search='';render();return;}
    if(action==='draft'||action==='shipping'){state.previousScreen='vault';state.tab='vault';state.sessionActive=false;state.screen='draft';render();return;}
    if(action==='continue-draft'){if(!state.added.length){toast('Add a matched card before continuing');return;}if(state.unmatched.length){toast('Match or scan again every card before continuing');return;}state.screen='draft-review';render();return;}
    if(action==='create-request'){
      if(state.unmatched.length){toast('Match or rescan every card before continuing');state.screen='draft-review';render();return;}
      const date=new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric'}).format(new Date());
      state.orders.unshift({id:`GR-${Date.now().toString().slice(-6)}`,date,cards:state.added.map(card=>({cardId:card.id,draftId:card.draftId}))});state.added=[];state.unmatched=[];saveDemoState();state.screen='draft-done';state.tab='orders';render();return;
    }
    if(action==='orders'){state.tab='orders';state.screen='orders';render();return;}
    if(action==='help'){toast('Local preview · the mock scanner does not request camera access');return;}
    if(action==='filters'){state.filtersOpen=!state.filtersOpen;render();return;}
    if(action==='sort'){state.sort=state.sort==='newest'?'name':'newest';render();return;}
    const remove=event.target.closest('[data-remove-card]');if(remove){const entry=state.added.find(card=>card.draftId===remove.dataset.removeCard);state.added=state.added.filter(card=>card.draftId!==remove.dataset.removeCard);if(entry)listPhotos(entry.draftId).then(photos=>Promise.all(photos.map(photo=>deletePhoto(photo.key)))).catch(()=>{});saveDemoState();render();toast('Card removed from stack');return;}
    const filter=event.target.closest('[data-filter]')?.dataset.filter;if(filter){state.filter=filter;state.showAll=filter==='all';state.filtersOpen=false;render();return;}
    if(event.target.closest('[data-close]'))dialog.close();
  });
  document.querySelector('#app').addEventListener('pointermove',event=>{
    const card=event.target.closest('.collection-card');if(card){const box=card.querySelector('.card-image-wrap').getBoundingClientRect();card.style.setProperty('--foil-x',`${((event.clientX-box.left)/box.width)*100}%`);card.style.setProperty('--foil-y',`${((event.clientY-box.top)/box.height)*100}%`);}
  },{passive:true});
  document.addEventListener('input',event=>{
    if(event.target.id==='vaultSearch'){state.search=event.target.value;const pos=event.target.selectionStart;renderVault();const next=document.querySelector('#vaultSearch');next.focus();next.setSelectionRange(pos,pos);}
    if(event.target.id==='manualSearch'){state.query=event.target.value;const pos=event.target.selectionStart;(state.screen==='scan'?renderScan:renderSearch)();const next=document.querySelector('#manualSearch');next.focus();next.setSelectionRange(pos,pos);}
  });
  document.addEventListener('change',async event=>{
    const input=event.target.closest('[data-photo-input]');if(!input||!input.files?.length)return;
    const cardId=input.dataset.photoInput;let saved=0;
    try{for(const file of [...input.files]){if(!file.type.startsWith('image/'))continue;await savePhoto(cardId,await compressPhoto(file));saved++;}input.value='';render();toast(`${saved} ${saved===1?'photo':'photos'} attached to this card`);}
    catch{toast('Could not save these photos. Try smaller image files.');}
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&state.screen==='scan'){clearScanTimers();state.screen='vault';state.tab='vault';render();}});
  let toastTimer;function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('is-visible'),2300);}
  render();
})();
