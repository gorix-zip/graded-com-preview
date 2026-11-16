/* Small, dependency-free UI component library for the Graded concept. */
(() => {
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);

  function closeButton({ id, label, className }) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = id;
    button.className = `icon-button icon-button--close ${className || ''}`.trim();
    button.setAttribute('aria-label', label);
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    return button;
  }

  function actionButton({ id, label, className, attributes = {} }) {
    const button = document.createElement('button');
    button.type = 'button';
    if (id) button.id = id;
    button.className = className;
    button.textContent = label;
    Object.entries(attributes).forEach(([name, value]) => button.setAttribute(name, value));
    return button;
  }

  function quantityControl(item) {
    const name = escapeHTML(item.name);
    const key = escapeHTML(item.key);
    return `<div class="quantity-control" role="group" aria-label="Quantity for ${name}">
      <button type="button" data-pack-qty="${key}" data-step="-1" aria-label="Remove one ${name} pack">−</button>
      <span class="quantity-value" data-pack-quantity="${key}" aria-live="polite">1</span>
      <button type="button" data-pack-qty="${key}" data-step="1" aria-label="Add one ${name} pack">+</button>
    </div>`;
  }

  function packCard(item, selected = false) {
    const name = escapeHTML(item.name);
    const key = escapeHTML(item.key);
    const poster = escapeHTML(item.poster);
    return `<article class="pack-option${selected ? ' is-selected' : ''}" data-pack="${key}">
      <button class="pack-select" type="button" data-pack="${key}" aria-pressed="${selected}" aria-label="Select ${name} pack">
        <img src="${poster}" alt="" width="600" height="1080" loading="lazy"><strong>${name}</strong>
      </button>
      <div class="pack-buy-row">${quantityControl(item)}<button class="add-to-cart" type="button" data-add-pack="${key}">Add to cart</button></div>
    </article>`;
  }

  function cartLine(item, quantity, isNew = false) {
    const name = escapeHTML(item.name);
    const key = escapeHTML(item.key);
    const isCard = item.kind === 'card';
    const image = escapeHTML(isCard ? item.image : item.poster);
    const descriptor = isCard ? 'Single card' : 'Graded pack';
    const unit = isCard ? 'card' : 'pack';
    const price = isCard ? `<span class="cart-line-price">$${item.market.price.toFixed(2)} sample price</span>` : '';
    return `<article class="cart-line${isCard ? ' cart-line--card' : ''}${isNew ? ' is-new' : ''}" data-cart-item="${key}">
      <img src="${image}" alt="${name} ${descriptor}" width="600" height="1080">
      <div class="cart-line-main"><strong>${name}</strong><span>${descriptor}</span>${price}
        <div class="cart-line-controls" role="group" aria-label="Quantity for ${name}">
          <button type="button" data-cart-key="${key}" data-cart-step="-1" aria-label="Remove one ${name} ${unit}">−</button>
          <span>${quantity}</span>
          <button type="button" data-cart-key="${key}" data-cart-step="1" aria-label="Add one ${name} ${unit}">+</button>
          <button class="cart-remove" type="button" data-cart-remove="${key}" aria-label="Remove ${name} from cart">Remove</button>
        </div>
      </div>
    </article>`;
  }

  function heroCategories() {
    return `<ul class="hero-categories" aria-label="Collectible categories">
      <li><span class="category-icon" aria-hidden="true"><img src="./assets/icons/graded-card.svg" width="10.8" height="10.8" alt=""></span><span>Cards</span></li>
      <li class="is-disabled" aria-disabled="true"><span class="category-icon" aria-hidden="true"><img src="./assets/icons/graded-watch.svg" width="12" height="12" alt=""></span><span>Watches</span></li>
      <li class="is-disabled" aria-disabled="true"><span class="category-icon" aria-hidden="true"><img src="./assets/icons/graded-collectable.svg" width="12" height="12" alt=""></span><span>Collectibles</span></li>
    </ul>`;
  }

  function grailCard(card, selected = false) {
    const name = escapeHTML(card.name);
    const key = escapeHTML(card.key);
    const image = escapeHTML(card.image);
    const set = escapeHTML(card.set);
    const number = escapeHTML(card.number);
    const market = card.market;
    const trendUp = market.change >= 0;
    const change = `${trendUp ? '+' : '−'}${Math.abs(market.change).toFixed(1)}%`;
    return `<button class="grail-card${selected ? ' is-selected' : ''}" type="button" data-grail-card="${key}" aria-pressed="${selected}" aria-label="Select ${name}, card ${number}, from ${set}">
      <img src="${image}" alt="${name} Pokémon card front" width="654" height="914" loading="lazy">
      <span class="grail-card-copy"><strong>${name}</strong><small>${set} · #${number}</small><span class="grail-market-tag"><span>$${market.price.toFixed(2)}</span><b class="${trendUp ? 'is-up' : 'is-down'}">${change}<small>7D</small></b><em>Sample</em></span></span>
    </button>`;
  }

  function cardFacts(card, includeIdentity = false) {
    const facts = [
      ['Type', card.type], ['HP', `${card.hp}`], ['Form', card.form],
      ['Rarity', card.rarity], ['Set no.', `#${card.number}`], ['Artist', card.artist],
    ];
    const icons = {
      Type: '<path d="m8 1.7 6 3.4v5.8l-6 3.4-6-3.4V5.1l6-3.4Z"/><path d="m2 5.1 6 3.5 6-3.5M8 8.6v5.6"/>',
      HP: '<path d="M8 13.7S2 10.1 2 6.5a3 3 0 0 1 5.4-1.8A3 3 0 0 1 13 6.5c0 3.6-5 7.2-5 7.2Z"/><path d="M8 5.8v4.4M5.8 8h4.4"/>',
      Form: '<rect x="2" y="2.5" width="7" height="10" rx="1.1"/><path d="M5 4.5h2M10 4.5h4v8h-4M11.5 6.5h1"/>',
      Rarity: '<path d="m8 1.6 1.8 4.5 4.6 1.8-4.6 1.8L8 14.3l-1.8-4.6L1.6 8l4.6-1.9L8 1.6Z"/>',
      'Set no.': '<path d="M5 2 3.5 14M10.5 2 9 14M2 6h11M1.3 10h11"/>',
      Artist: '<path d="m2 10.8 7.9-7.9 3.2 3.2-7.9 7.9-3.6.5.4-3.7Z"/><path d="m8.5 4.2 3.2 3.2M2 14.2h5"/>',
      Move: '<path d="M9.1 1.8 3.8 8h3.6l-.5 5.9L12.2 7H8.7l.4-5.2Z"/>',
    };
    const label = (name, icon) => `<span class="card-fact-label"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">${icons[icon]}</svg>${name}</span>`;
    return `<div class="card-fact-panel" role="group" aria-label="${escapeHTML(card.name)} card information">
      ${includeIdentity ? `<div class="card-fact-identity"><strong>${escapeHTML(card.name)}</strong><span>${escapeHTML(card.set)} · #${escapeHTML(card.number)}</span></div>` : ''}
      <div class="card-fact-grid">
        ${facts.map(([name, value]) => `<div class="card-fact">${label(escapeHTML(name), name)}<strong>${escapeHTML(value)}</strong></div>`).join('')}
        <div class="card-feature">${label('Featured move', 'Move')}<strong>${escapeHTML(card.feature)}</strong></div>
      </div>
    </div>`;
  }

  function cardMarket(card) {
    const market = card.market;
    const values = market.history;
    const low = Math.min(...values);
    const high = Math.max(...values);
    const range = Math.max(1, high - low);
    const points = values.map((value, index) => `${(index / (values.length - 1) * 160).toFixed(1)},${(44 - (value - low) / range * 34).toFixed(1)}`).join(' ');
    const positive = market.change >= 0;
    const change = `${positive ? '+' : '−'}${Math.abs(market.change).toFixed(1)}%`;
    const escapedKey = escapeHTML(card.key);
    const escapedName = escapeHTML(card.name);
    const price = `$${market.price.toFixed(2)}`;
    return `<section class="card-market-panel" id="marketplace" aria-label="${escapedName} market preview">
      <div class="market-heading"><div><span class="market-kicker">Single card · market</span><h5>Market value</h5></div><span class="market-sample">Sample</span></div>
      <div class="market-main"><div class="market-quote"><strong>${price}</strong><span class="market-change ${positive ? 'is-up' : 'is-down'}">${change} <small>7D</small></span></div>
        <svg class="market-sparkline ${positive ? 'is-up' : 'is-down'}" viewBox="0 0 160 52" preserveAspectRatio="none" role="img" aria-label="Sample seven-day card value ${positive ? 'rising' : 'falling'} ${change}"><polyline points="${points}"/></svg>
      </div>
      <div class="market-actions"><button type="button" class="button button-acid market-buy" data-buy-card="${escapedKey}">Add to cart · ${price}</button><button type="button" class="button button-ghost market-bid" data-bid-card="${escapedKey}">Preview bid</button></div>
      <p class="market-footnote">Sample USD trend · not a live quote or offer.</p>
    </section>`;
  }

  function cardPreview(card) {
    const name = escapeHTML(card.name);
    const image = escapeHTML(card.image);
    const set = escapeHTML(card.set);
    const number = escapeHTML(card.number);
    const rarity = escapeHTML(card.rarity);
    const price = `$${card.market.price.toFixed(2)}`;
    const up = card.market.change >= 0;
    const change = `${up ? '+' : '−'}${Math.abs(card.market.change).toFixed(1)}%`;
    return `<div class="preview-layout">
      <div class="preview-stage" aria-label="Interactive 3D card preview">
        <div class="preview-light" aria-hidden="true"></div>
        <button class="preview-card" id="previewCard" type="button" aria-label="Flip ${name} to see the Graded card back">
          <span class="preview-card-inner">
            <span class="preview-card-face preview-card-front"><img src="${image}" alt="${name} Pokémon card front" width="654" height="914" draggable="false"></span>
            <span class="preview-card-face preview-card-back"><img class="preview-back-frame" src="./assets/cards/figma-179-2/graded-card-reverse-frame.png" alt="" width="1060" height="1484"><img class="preview-back-art" src="./assets/cards/figma-179-2/graded-card-reverse-art.png" alt="" width="941" height="1312"></span>
          </span>
        </button>
        <span class="preview-hint">DRAG TO TILT · TAP TO FLIP</span>
      </div>
      <div class="preview-details">
        <span class="market-kicker">3D card preview</span>
        <h2 id="previewTitle">${name}</h2>
        <p class="preview-set">${set} · #${number}</p>
        <p class="preview-market-tag"><strong>${price}</strong><b class="market-change ${up ? 'is-up' : 'is-down'}">${change} <small>7D</small></b><em>Sample</em></p>
        <p class="preview-rarity">${rarity}</p>
        <div class="preview-card-facts">${cardFacts(card)}</div>
        <button class="button button-acid preview-market-button" type="button" data-preview-market>View market</button>
      </div>
    </div>`;
  }

  window.GradedComponents = Object.freeze({ actionButton, closeButton, packCard, cartLine, heroCategories, grailCard, cardFacts, cardMarket, cardPreview });
})();
