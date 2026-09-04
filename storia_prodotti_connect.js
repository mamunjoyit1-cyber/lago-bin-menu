/**
 * storia_prodotti_connect.js
 * -----------------------------------------------------------------
 * Applies the Storia/Prodotti keys added by storia_prodotti_i18n_patch.js
 * to the DOM, for the 30 extended languages. Follows the same wrapping
 * pattern connect_menu_i18n.js already uses for openViniModal(),
 * applyLang(), renderPopupPersons(), etc — no new translation engine,
 * no touching of existing keys or elements.
 *
 * MUST load AFTER connect_menu_i18n.js, because it needs
 * window.setPatchLang and window.LAGOBIN_TRANSLATIONS to already exist.
 *
 * Also applies the full storia_full_text / why_name_text translations
 * added by storia_prodotti_i18n_patch.js when available for the active
 * language, so the 30 extended languages now get the full narrative
 * (not just the short UI strings).
 * -----------------------------------------------------------------
 */
(function () {
  if (typeof window.setPatchLang !== 'function' || !window.LAGOBIN_TRANSLATIONS) {
    console.warn('[storia_prodotti_connect] connect_menu_i18n.js not loaded before this file.');
    return;
  }
  var translations = window.LAGOBIN_TRANSLATIONS;

  function setText(sel, val) {
    if (val === undefined || val === null) return;
    var el = document.querySelector(sel);
    if (el) el.textContent = val;
  }
  function setAllText(sel, val) {
    if (val === undefined || val === null) return;
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = val; });
  }

  function applyStoriaProdottiPatch(pack) {
    if (!pack) return;
    try {
      // STORIA overlay
      setText('#storia-overlay .overlay-sub', pack.storia_title);
      setText('#storia-overlay .storia-hero-subtitle', pack.storia_subtitle);
      setText('#storia-overlay .storia-name-card-title', pack.why_name_title);
      setText('#storia-overlay .overlay-close', pack.overlay_close);
      if (pack.storia_full_text) setText('#storia-full-text', pack.storia_full_text);
      if (pack.why_name_text) setText('#why-name-body', pack.why_name_text);

      // PRODOTTI overlay
      setText('#prodotti-overlay .overlay-sub', pack.prodotti_title);
      setText('#prodotti-overlay .prodotti-subtitle', pack.prodotti_subtitle);
      setText('#prodotti-overlay .overlay-close', pack.overlay_close);

      // Product cards are rebuilt by renderProdotti() in PRODUCTS array order
      // (olio, limoncello, marmellata) — match that order here.
      var descs = document.querySelectorAll('.product-card-desc');
      var descVals = [pack.product_olio_desc, pack.product_limoncello_desc, pack.product_marmellata_desc];
      descs.forEach(function (el, i) { if (descVals[i]) el.textContent = descVals[i]; });

      if (pack.seasonal_badge) setAllText('.product-seasonal-badge', pack.seasonal_badge);
      if (pack.seasonal_note) setAllText('.product-seasonal-note', pack.seasonal_note);
      if (pack.reception_tag) setAllText('.product-reception-tag', pack.reception_tag);
    } catch (e) {
      console.warn('[storia_prodotti_connect] apply failed, continuing:', e);
    }
  }

  // Re-run whenever an extended language is chosen from the dropdown
  var _origSetPatchLang = window.setPatchLang;
  window.setPatchLang = function (code) {
    _origSetPatchLang.apply(this, arguments);
    var pack = translations[code] || {};
    applyStoriaProdottiPatch(pack);
    // mirror connect_menu_i18n's own defensive re-pass timing
    setTimeout(function () {
      if (typeof currentLang !== 'undefined' && currentLang !== code) return;
      applyStoriaProdottiPatch(pack);
    }, 220);
  };

  // Re-run whenever the Storia/Prodotti overlays are opened, in case the
  // active language is one of the 30 extended ones and renderProdotti()
  // just rebuilt the product cards with fresh Italian-only markup.
  if (typeof window.openStoriaOverlay === 'function') {
    var _origOpenStoria = window.openStoriaOverlay;
    window.openStoriaOverlay = function () {
      _origOpenStoria.apply(this, arguments);
      if (typeof currentLang !== 'undefined' && translations[currentLang]) {
        applyStoriaProdottiPatch(translations[currentLang]);
      }
    };
  }
  if (typeof window.openProdottiOverlay === 'function') {
    var _origOpenProdotti = window.openProdottiOverlay;
    window.openProdottiOverlay = function () {
      _origOpenProdotti.apply(this, arguments);
      if (typeof currentLang !== 'undefined' && translations[currentLang]) {
        applyStoriaProdottiPatch(translations[currentLang]);
      }
    };
  }
})();
