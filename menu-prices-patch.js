// menu-prices-patch.js
//
// Live price overrides from the admin panel's Menu tab. Reads Firestore's
// `menuPrices` collection and applies it on top of the hardcoded default
// prices in ITEMS / BAR_ITEMS / PKG_CONFIG / house-wine pricing.
//
// Add this ONE line near the other patch scripts at the bottom of
// index.html (after the main inline <script> block, same pattern as
// i18n_patch.js etc.):
//
//   <script src="menu-prices-patch.js"></script>
//
// Must load AFTER the main inline script, since it reuses that script's
// globals (db, ITEMS, BAR_ITEMS, PKG_CONFIG, HOUSE_WINES,
// HOUSE_WINE_KIND_PRICES, renderAllBarSections) rather than redefining
// them — nothing in the main file needs to change.

(function () {
  // Finds the on-screen "€45,00" element for a given package key, since
  // that text is hand-written in the HTML rather than rendered from
  // PKG_CONFIG — it has to be located and patched directly.
  function findPkgPriceEl(pkgKey) {
    if (pkgKey === 'lago_bin') {
      const qtyEl = document.getElementById('qty-pkg-lago_bin');
      return qtyEl ? qtyEl.closest('.pkg-right')?.querySelector('.pkg-price') : null;
    }
    const acc = document.getElementById('acc-' + pkgKey);
    if (acc && acc.previousElementSibling) {
      return acc.previousElementSibling.querySelector('.pkg-price');
    }
    return null;
  }

  async function applyMenuPrices() {
    try {
      const snap = await db.collection('menuPrices').get();

      snap.forEach(doc => {
        const price = doc.data().price;
        if (typeof price !== 'number') return;
        const id = doc.id;
        const priceText = '€' + price.toFixed(2).replace('.', ',');

        // Regular dishes (antipasti/primi/secondi/contorni/dolci/gelato)
        if (typeof ITEMS !== 'undefined' && ITEMS[id]) {
          ITEMS[id].price = price;
          const el = document.querySelector('#item-' + id + ' .item-price');
          if (el) el.textContent = priceText;
        }

        // Bar / Bevande items — rendered dynamically, renderAllBarSections()
        // below picks the new price up automatically, no DOM patch needed.
        if (typeof BAR_ITEMS !== 'undefined' && BAR_ITEMS[id]) {
          BAR_ITEMS[id].price = price;
        }

        // Set menu packages — updates both the cart price AND the visible
        // "€45,00" text on the package card.
        if (typeof PKG_CONFIG !== 'undefined') {
          const pkgMap = { pkg_lago_bin: 'lago_bin', pkg_gastro: 'gastro', pkg_degu: 'degu', pkg_bambini: 'bambini' };
          if (pkgMap[id] && PKG_CONFIG[pkgMap[id]]) {
            PKG_CONFIG[pkgMap[id]].price = price;
            const priceEl = findPkgPriceEl(pkgMap[id]);
            if (priceEl) priceEl.textContent = priceText;
          }
        }

        // Vino della Casa (glass/carafe tiers)
        if (typeof HOUSE_WINE_KIND_PRICES !== 'undefined') {
          if (id === 'housewine_calice') HOUSE_WINE_KIND_PRICES['calice'] = price;
          if (id === 'housewine_05') HOUSE_WINE_KIND_PRICES['0.5'] = price;
          if (id === 'housewine_025') HOUSE_WINE_KIND_PRICES['0.25'] = price;
        }
        if (typeof HOUSE_WINES !== 'undefined') {
          if (id === 'housewine_prosecco' && HOUSE_WINES['prosecco']) HOUSE_WINES['prosecco'].price = price;
          if (id === 'housewine_bollicine' && HOUSE_WINES['bollicine']) HOUSE_WINES['bollicine'].price = price;
        }
      });

      if (typeof renderAllBarSections === 'function') renderAllBarSections();
    } catch (err) {
      console.error('menu-prices-patch: could not load prices:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMenuPrices);
  } else {
    applyMenuPrices();
  }
})();
