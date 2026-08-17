// carta-vini-prices-patch.js
//
// Live price overrides from the admin panel's Menu → Vino tab. Reads
// Firestore's `menuPrices` collection (the SAME collection used by
// menu-prices-patch.js on index.html — one source, both sites read it)
// and applies it on top of the hardcoded prices in WINES /
// CASA_SIMPLE_WINES / HOUSE_WINE_KIND_PRICES.
//
// Add this ONE line right before </body>, after the main inline <script>
// block:
//
//   <script src="carta-vini-prices-patch.js"></script>
//
// Reuses this page's own globals (WINES, CASA_SIMPLE_WINES,
// HOUSE_WINE_KIND_PRICES, wineDb, renderAll) — nothing in
// carta-dei-vini.html itself needs to change.

(function () {
  async function applyWinePrices() {
    try {
      const snap = await wineDb.collection('menuPrices').get();

      snap.forEach(doc => {
        const price = doc.data().price;
        if (typeof price !== 'number') return;
        const id = doc.id;

        // Individual bottle wines (Carta dei Vini) — id matches WINES[].id
        if (typeof WINES !== 'undefined') {
          const wine = WINES.find(w => w.id === id);
          if (wine) wine.price = price;
        }

        // Vino della Casa — 5 individually priced house wines
        const casaMap = {
          housewine_prosecco: 'prosecco',
          housewine_bollicine: 'bollicine',
          housewine_rossese: 'rossese',
          housewine_vermentino: 'vermentino',
          housewine_pigato: 'pigato'
        };
        if (casaMap[id] && typeof CASA_SIMPLE_WINES !== 'undefined' && CASA_SIMPLE_WINES[casaMap[id]]) {
          CASA_SIMPLE_WINES[casaMap[id]].price = price;
        }

        // Vino della Casa — one shared price per size tier (calice / 0.5L /
        // 0.25L), applied the same across rosso/bianco/rosato
        if (typeof HOUSE_WINE_KIND_PRICES !== 'undefined') {
          if (id === 'vdc_calice') HOUSE_WINE_KIND_PRICES['calice'] = price;
          if (id === 'vdc_05') HOUSE_WINE_KIND_PRICES['0.5'] = price;
          if (id === 'vdc_025') HOUSE_WINE_KIND_PRICES['0.25'] = price;
        }
      });

      // renderAll() already refreshes the house-wine rows internally when
      // their containers exist in the DOM, so one call covers everything.
      if (typeof renderAll === 'function') renderAll();
    } catch (err) {
      console.error('carta-vini-prices-patch: could not load prices:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyWinePrices);
  } else {
    applyWinePrices();
  }
})();
