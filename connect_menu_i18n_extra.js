/**
 * connect_menu_i18n_extra.js
 * ---------------------------------------------------------------
 * Applies translations for elements that connect_menu_i18n.js's
 * applyStaticUi() doesn't cover: the Bar sub-tab labels (Bibite /
 * Birre / Cocktail & Aperitivi / Caffetteria) and the "⭐ Consigliato"
 * signature-dish badge.
 *
 * How it works: these elements already carry a `data-it="..."`
 * attribute (the site's own 4-language IT/FR/EN/DE system), but for
 * the 30 extra languages connect_menu_i18n.js's own applyLang()
 * override skips all [data-it] elements entirely. This script reads
 * the translation from window.I18N_PATCH[code].misc — an Italian
 * text -> translated text lookup added by i18n_patch_extra.js — and
 * applies it directly, generically, to any [data-it] element whose
 * current value matches a key in that lookup.
 *
 * Does NOT touch connect_menu_i18n.js — it wraps window.setPatchLang
 * the same way that file itself wraps applyLang/openViniModal/etc.
 *
 * Load this AFTER connect_menu_i18n.js.
 * ---------------------------------------------------------------
 */
(function () {
  if (typeof window.setPatchLang !== 'function') {
    console.warn('[connect_menu_i18n_extra] window.setPatchLang not found — load this AFTER connect_menu_i18n.js.');
    return;
  }

  function applyMisc(code) {
    var pack = window.I18N_PATCH && window.I18N_PATCH[code];
    if (!pack || !pack.misc) return;
    document.querySelectorAll('[data-it]').forEach(function (el) {
      if (el.classList.contains('sub-trans')) return; // handled separately by dish-subtitle logic
      var it = el.getAttribute('data-it');
      if (!it) return;
      var translated = pack.misc[it];
      if (translated) el.textContent = translated;
    });
  }

  var _origSetPatchLang = window.setPatchLang;
  window.setPatchLang = function (code) {
    _origSetPatchLang(code);
    applyMisc(code);
    // Defensive re-pass for anything rendered slightly late (same timing
    // pattern connect_menu_i18n.js itself already uses elsewhere).
    setTimeout(function () { applyMisc(code); }, 250);
  };

  console.log('[connect_menu_i18n_extra] Ready — will translate Bar sub-tabs and the "Consigliato" badge for all extra languages.');
})();
