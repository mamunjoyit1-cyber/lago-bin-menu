/**
 * i18n_patch_extra.js
 * ---------------------------------------------------------------
 * Adds translations for recent menu changes to the existing
 * window.I18N_PATCH object (30 extra languages beyond IT/FR/EN/DE):
 *   1. "Pescato" / "Gamberoni" sauce options (Pescato o Gamberoni item)
 *   2. "nota_label" / "nota_ph" — the per-dish note field
 *   3. Fix pkg_degu_warn — remove "Saturday EVENING" -> "Saturday"
 *      (matches the same fix already made in the 4 core languages)
 *
 * Load this AFTER i18n_patch.js and BEFORE apply_i18n_patch.js /
 * connect_menu_i18n.js, so the merged data is available when the
 * page applies translations.
 * ---------------------------------------------------------------
 */
(function () {
  if (typeof window.I18N_PATCH === 'undefined') {
    console.warn('[i18n_patch_extra] window.I18N_PATCH not found — load this AFTER i18n_patch.js.');
    return;
  }

  // 1) Pescato / Gamberoni sauce translations (word for "Fish" / "Prawns")
  var SAUCE_ADD = {
    tr: { Pescato: 'Balık', Gamberoni: 'Karides' },
    bg: { Pescato: 'Риба', Gamberoni: 'Скариди' },
    sk: { Pescato: 'Ryba', Gamberoni: 'Krevety' },
    hr: { Pescato: 'Riba', Gamberoni: 'Kozice' },
    sr: { Pescato: 'Риба', Gamberoni: 'Шкампи' },
    sl: { Pescato: 'Riba', Gamberoni: 'Kozice' },
    ar: { Pescato: 'سمك', Gamberoni: 'جمبري' },
    'zh-CN': { Pescato: '鱼', Gamberoni: '虾' },
    ja: { Pescato: '魚', Gamberoni: '海老' },
    ko: { Pescato: '생선', Gamberoni: '새우' },
    hi: { Pescato: 'मछली', Gamberoni: 'झींगे' },
    bn: { Pescato: 'মাছ', Gamberoni: 'চিংড়ি' },
    ur: { Pescato: 'مچھلی', Gamberoni: 'جھینگے' },
    fa: { Pescato: 'ماهی', Gamberoni: 'میگو' },
    es: { Pescato: 'Pescado', Gamberoni: 'Langostinos' },
    pt: { Pescato: 'Peixe', Gamberoni: 'Camarões' },
    ru: { Pescato: 'Рыба', Gamberoni: 'Креветки' },
    nl: { Pescato: 'Vis', Gamberoni: 'Garnalen' },
    pl: { Pescato: 'Ryba', Gamberoni: 'Krewetki' },
    uk: { Pescato: 'Риба', Gamberoni: 'Креветки' },
    ro: { Pescato: 'Pește', Gamberoni: 'Creveți' },
    sv: { Pescato: 'Fisk', Gamberoni: 'Räkor' },
    da: { Pescato: 'Fisk', Gamberoni: 'Rejer' },
    no: { Pescato: 'Fisk', Gamberoni: 'Reker' },
    fi: { Pescato: 'Kala', Gamberoni: 'Katkaravut' },
    el: { Pescato: 'Ψάρι', Gamberoni: 'Γαρίδες' },
    cs: { Pescato: 'Ryba', Gamberoni: 'Krevety' },
    hu: { Pescato: 'Hal', Gamberoni: 'Garnélarák' },
    vi: { Pescato: 'Cá', Gamberoni: 'Tôm' },
    th: { Pescato: 'ปลา', Gamberoni: 'กุ้ง' }
  };

  // 2) Note field label / placeholder ("Note (optional)" / "e.g. no onion...")
  var NOTE_ADD = {
    tr: { nota_label: '📝 Not (isteğe bağlı)', nota_ph: 'Örn. soğansız...' },
    bg: { nota_label: '📝 Забележка (незадължително)', nota_ph: 'Напр. без лук...' },
    sk: { nota_label: '📝 Poznámka (voliteľné)', nota_ph: 'Napr. bez cibule...' },
    hr: { nota_label: '📝 Napomena (neobavezno)', nota_ph: 'Npr. bez luka...' },
    sr: { nota_label: '📝 Напомена (опционо)', nota_ph: 'Нпр. без лука...' },
    sl: { nota_label: '📝 Opomba (neobvezno)', nota_ph: 'Npr. brez čebule...' },
    ar: { nota_label: '📝 ملاحظة (اختياري)', nota_ph: 'مثال: بدون بصل...' },
    'zh-CN': { nota_label: '📝 备注（可选）', nota_ph: '例如：不要洋葱...' },
    ja: { nota_label: '📝 メモ（任意）', nota_ph: '例：玉ねぎ抜き...' },
    ko: { nota_label: '📝 메모 (선택 사항)', nota_ph: '예: 양파 빼고...' },
    hi: { nota_label: '📝 नोट (वैकल्पिक)', nota_ph: 'जैसे बिना प्याज...' },
    bn: { nota_label: '📝 নোট (ঐচ্ছিক)', nota_ph: 'যেমন পেঁয়াজ ছাড়া...' },
    ur: { nota_label: '📝 نوٹ (اختیاری)', nota_ph: 'مثلاً پیاز کے بغیر...' },
    fa: { nota_label: '📝 یادداشت (اختیاری)', nota_ph: 'مثلاً بدون پیاز...' },
    es: { nota_label: '📝 Nota (opcional)', nota_ph: 'Ej. sin cebolla...' },
    pt: { nota_label: '📝 Nota (opcional)', nota_ph: 'Ex. sem cebola...' },
    ru: { nota_label: '📝 Примечание (необязательно)', nota_ph: 'Напр. без лука...' },
    nl: { nota_label: '📝 Notitie (optioneel)', nota_ph: 'Bijv. zonder ui...' },
    pl: { nota_label: '📝 Notatka (opcjonalnie)', nota_ph: 'Np. bez cebuli...' },
    uk: { nota_label: '📝 Примітка (необов\'язково)', nota_ph: 'Напр. без цибулі...' },
    ro: { nota_label: '📝 Notă (opțional)', nota_ph: 'Ex. fără ceapă...' },
    sv: { nota_label: '📝 Anteckning (valfritt)', nota_ph: 'T.ex. utan lök...' },
    da: { nota_label: '📝 Note (valgfrit)', nota_ph: 'F.eks. uden løg...' },
    no: { nota_label: '📝 Notat (valgfritt)', nota_ph: 'F.eks. uten løk...' },
    fi: { nota_label: '📝 Huomautus (valinnainen)', nota_ph: 'Esim. ilman sipulia...' },
    el: { nota_label: '📝 Σημείωση (προαιρετικό)', nota_ph: 'π.χ. χωρίς κρεμμύδι...' },
    cs: { nota_label: '📝 Poznámka (nepovinné)', nota_ph: 'Např. bez cibule...' },
    hu: { nota_label: '📝 Megjegyzés (opcionális)', nota_ph: 'Pl. hagyma nélkül...' },
    vi: { nota_label: '📝 Ghi chú (không bắt buộc)', nota_ph: 'VD: không hành...' },
    th: { nota_label: '📝 หมายเหตุ (ไม่บังคับ)', nota_ph: 'เช่น ไม่ใส่หัวหอม...' }
  };

  // 3) pkg_degu_warn fix — remove the "Saturday EVENING" wording where present,
  //    matching the change already made to the 4 core languages (Sabato Sera -> Sabato).
  var DEGU_WARN_FIX = {
    bg: '⚠️ (*) Не се сервира в събота, неделя на обяд и в празничните дни.',
    sk: '⚠️ (*) Nepodáva sa v sobotu, v nedeľu na obed a počas sviatkov.',
    hr: '⚠️ (*) Ne poslužuje se subotom, nedjeljom u podne i praznikom.',
    sr: '⚠️ (*) Не служи се суботом, недељом за ручак и празницима.',
    sl: '⚠️ (*) Ni na voljo v soboto, nedeljo opoldne in ob praznikih.',
    ar: '⚠️ (*) لا يُقدَّم يوم السبت، وظهر الأحد، وأيام العطلات.',
    es: '⚠️ (*) No se sirve sábado, domingo a mediodía ni festivos.',
    pt: '⚠️ (*) Não servido ao sábado, domingo ao almoço e feriados.',
    ru: '⚠️ (*) Не подаётся в субботу, воскресенье днём и в праздники.',
    nl: '⚠️ (*) Niet geserveerd op zaterdag, zondagmiddag en feestdagen.',
    pl: '⚠️ (*) Niepodawane w sobotę, niedzielny obiad i w święta.',
    uk: '⚠️ (*) Не подається в суботу, неділю вдень та у свята.',
    ro: '⚠️ (*) Nu se servește sâmbătă, duminică la prânz și în sărbători.',
    sv: '⚠️ (*) Serveras ej lördag, söndagslunch och helgdagar.',
    da: '⚠️ (*) Serveres ikke lørdag, søndag frokost og på helligdage.',
    no: '⚠️ (*) Serveres ikke lørdag, søndag lunsj og på helligdager.',
    fi: '⚠️ (*) Ei tarjolla lauantaisin, sunnuntailounaalla eikä pyhäpäivinä.',
    el: '⚠️ (*) Δεν σερβίρεται Σάββατο, Κυριακή μεσημέρι και αργίες.',
    cs: '⚠️ (*) Neservíruje se v sobotu, v neděli k obědu a o svátcích.',
    hu: '⚠️ (*) Szombaton, vasárnap ebédidőben és ünnepnapokon nem szolgáljuk fel.'
  };

  // 4) "misc" — a generic Italian-text -> translation dictionary for
  //    static data-it labels that the connector's applyStaticUi() doesn't
  //    cover (bar sub-tabs, wine glass label, uve/grape labels, badge).
  //    connect_menu_i18n_extra.js reads this and swaps any [data-it]
  //    element whose current data-it value matches a key here.
  var MISC_ADD = {
    tr: { '🥤 Bibite': '🥤 İçecekler', '🍺 Birre': '🍺 Biralar', '🍸 Cocktail & Aperitivi': '🍸 Kokteyl & Aperitif', '☕ Caffetteria': '☕ Kafeterya', '⭐ Consigliato': '⭐ Önerilen' },
    bg: { '🥤 Bibite': '🥤 Напитки', '🍺 Birre': '🍺 Бири', '🍸 Cocktail & Aperitivi': '🍸 Коктейли & Аперитиви', '☕ Caffetteria': '☕ Кафе', '⭐ Consigliato': '⭐ Препоръчано' },
    sk: { '🥤 Bibite': '🥤 Nápoje', '🍺 Birre': '🍺 Pivá', '🍸 Cocktail & Aperitivi': '🍸 Koktaily & Aperitívy', '☕ Caffetteria': '☕ Kaviareň', '⭐ Consigliato': '⭐ Odporúčané' },
    hr: { '🥤 Bibite': '🥤 Pića', '🍺 Birre': '🍺 Piva', '🍸 Cocktail & Aperitivi': '🍸 Kokteli & Aperitivi', '☕ Caffetteria': '☕ Kafić', '⭐ Consigliato': '⭐ Preporučeno' },
    sr: { '🥤 Bibite': '🥤 Пића', '🍺 Birre': '🍺 Пива', '🍸 Cocktail & Aperitivi': '🍸 Коктели & Аперитиви', '☕ Caffetteria': '☕ Кафе', '⭐ Consigliato': '⭐ Препоручено' },
    sl: { '🥤 Bibite': '🥤 Pijače', '🍺 Birre': '🍺 Piva', '🍸 Cocktail & Aperitivi': '🍸 Kokteli & Aperitivi', '☕ Caffetteria': '☕ Kavarna', '⭐ Consigliato': '⭐ Priporočeno' },
    ar: { '🥤 Bibite': '🥤 مشروبات', '🍺 Birre': '🍺 بيرة', '🍸 Cocktail & Aperitivi': '🍸 كوكتيلات ومقبلات', '☕ Caffetteria': '☕ مقهى', '⭐ Consigliato': '⭐ موصى به' },
    'zh-CN': { '🥤 Bibite': '🥤 饮料', '🍺 Birre': '🍺 啤酒', '🍸 Cocktail & Aperitivi': '🍸 鸡尾酒和开胃酒', '☕ Caffetteria': '☕ 咖啡厅', '⭐ Consigliato': '⭐ 推荐' },
    ja: { '🥤 Bibite': '🥤 ドリンク', '🍺 Birre': '🍺 ビール', '🍸 Cocktail & Aperitivi': '🍸 カクテル & アペリティフ', '☕ Caffetteria': '☕ カフェ', '⭐ Consigliato': '⭐ おすすめ' },
    ko: { '🥤 Bibite': '🥤 음료', '🍺 Birre': '🍺 맥주', '🍸 Cocktail & Aperitivi': '🍸 칵테일 & 아페리티프', '☕ Caffetteria': '☕ 카페', '⭐ Consigliato': '⭐ 추천' },
    hi: { '🥤 Bibite': '🥤 पेय', '🍺 Birre': '🍺 बीयर', '🍸 Cocktail & Aperitivi': '🍸 कॉकटेल और एपेरिटिफ़', '☕ Caffetteria': '☕ कैफ़े', '⭐ Consigliato': '⭐ अनुशंसित' },
    bn: { '🥤 Bibite': '🥤 পানীয়', '🍺 Birre': '🍺 বিয়ার', '🍸 Cocktail & Aperitivi': '🍸 ককটেল ও এপেরিটিফ', '☕ Caffetteria': '☕ ক্যাফে', '⭐ Consigliato': '⭐ প্রস্তাবিত' },
    ur: { '🥤 Bibite': '🥤 مشروبات', '🍺 Birre': '🍺 بیئر', '🍸 Cocktail & Aperitivi': '🍸 کاکٹیل اور ایپریٹف', '☕ Caffetteria': '☕ کیفے', '⭐ Consigliato': '⭐ تجویز کردہ' },
    fa: { '🥤 Bibite': '🥤 نوشیدنی‌ها', '🍺 Birre': '🍺 آبجو', '🍸 Cocktail & Aperitivi': '🍸 کوکتل و اپریتیف', '☕ Caffetteria': '☕ کافه', '⭐ Consigliato': '⭐ پیشنهادی' },
    es: { '🥤 Bibite': '🥤 Bebidas', '🍺 Birre': '🍺 Cervezas', '🍸 Cocktail & Aperitivi': '🍸 Cócteles & Aperitivos', '☕ Caffetteria': '☕ Cafetería', '⭐ Consigliato': '⭐ Recomendado' },
    pt: { '🥤 Bibite': '🥤 Bebidas', '🍺 Birre': '🍺 Cervejas', '🍸 Cocktail & Aperitivi': '🍸 Cocktails & Aperitivos', '☕ Caffetteria': '☕ Cafetaria', '⭐ Consigliato': '⭐ Recomendado' },
    ru: { '🥤 Bibite': '🥤 Напитки', '🍺 Birre': '🍺 Пиво', '🍸 Cocktail & Aperitivi': '🍸 Коктейли & Аперитивы', '☕ Caffetteria': '☕ Кафе', '⭐ Consigliato': '⭐ Рекомендуем' },
    nl: { '🥤 Bibite': '🥤 Dranken', '🍺 Birre': '🍺 Bieren', '🍸 Cocktail & Aperitivi': '🍸 Cocktails & Aperitieven', '☕ Caffetteria': '☕ Café', '⭐ Consigliato': '⭐ Aanbevolen' },
    pl: { '🥤 Bibite': '🥤 Napoje', '🍺 Birre': '🍺 Piwa', '🍸 Cocktail & Aperitivi': '🍸 Koktajle & Aperitify', '☕ Caffetteria': '☕ Kawiarnia', '⭐ Consigliato': '⭐ Polecane' },
    uk: { '🥤 Bibite': '🥤 Напої', '🍺 Birre': '🍺 Пиво', '🍸 Cocktail & Aperitivi': '🍸 Коктейлі & Аперитиви', '☕ Caffetteria': '☕ Кафе', '⭐ Consigliato': '⭐ Рекомендовано' },
    ro: { '🥤 Bibite': '🥤 Băuturi', '🍺 Birre': '🍺 Beri', '🍸 Cocktail & Aperitivi': '🍸 Cocktailuri & Aperitive', '☕ Caffetteria': '☕ Cafenea', '⭐ Consigliato': '⭐ Recomandat' },
    sv: { '🥤 Bibite': '🥤 Drycker', '🍺 Birre': '🍺 Öl', '🍸 Cocktail & Aperitivi': '🍸 Cocktails & Aperitif', '☕ Caffetteria': '☕ Café', '⭐ Consigliato': '⭐ Rekommenderas' },
    da: { '🥤 Bibite': '🥤 Drikkevarer', '🍺 Birre': '🍺 Øl', '🍸 Cocktail & Aperitivi': '🍸 Cocktails & Aperitif', '☕ Caffetteria': '☕ Café', '⭐ Consigliato': '⭐ Anbefales' },
    no: { '🥤 Bibite': '🥤 Drikke', '🍺 Birre': '🍺 Øl', '🍸 Cocktail & Aperitivi': '🍸 Cocktailer & Aperitiff', '☕ Caffetteria': '☕ Kafé', '⭐ Consigliato': '⭐ Anbefales' },
    fi: { '🥤 Bibite': '🥤 Juomat', '🍺 Birre': '🍺 Oluet', '🍸 Cocktail & Aperitivi': '🍸 Cocktailit & Aperitiivit', '☕ Caffetteria': '☕ Kahvila', '⭐ Consigliato': '⭐ Suositeltu' },
    el: { '🥤 Bibite': '🥤 Αναψυκτικά', '🍺 Birre': '🍺 Μπύρες', '🍸 Cocktail & Aperitivi': '🍸 Κοκτέιλ & Απεριτίφ', '☕ Caffetteria': '☕ Καφετέρια', '⭐ Consigliato': '⭐ Προτεινόμενο' },
    cs: { '🥤 Bibite': '🥤 Nápoje', '🍺 Birre': '🍺 Piva', '🍸 Cocktail & Aperitivi': '🍸 Koktejly & Aperitivy', '☕ Caffetteria': '☕ Kavárna', '⭐ Consigliato': '⭐ Doporučeno' },
    hu: { '🥤 Bibite': '🥤 Üdítők', '🍺 Birre': '🍺 Sörök', '🍸 Cocktail & Aperitivi': '🍸 Koktélok & Aperitifek', '☕ Caffetteria': '☕ Kávézó', '⭐ Consigliato': '⭐ Ajánlott' },
    vi: { '🥤 Bibite': '🥤 Đồ Uống', '🍺 Birre': '🍺 Bia', '🍸 Cocktail & Aperitivi': '🍸 Cocktail & Khai Vị', '☕ Caffetteria': '☕ Quán Cà Phê', '⭐ Consigliato': '⭐ Đề Xuất' },
    th: { '🥤 Bibite': '🥤 เครื่องดื่ม', '🍺 Birre': '🍺 เบียร์', '🍸 Cocktail & Aperitivi': '🍸 ค็อกเทล & อาเปอริทีฟ', '☕ Caffetteria': '☕ คาเฟ่', '⭐ Consigliato': '⭐ แนะนำ' }
  };

  Object.keys(MISC_ADD).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) return;
    if (!window.I18N_PATCH[lang].misc) window.I18N_PATCH[lang].misc = {};
    Object.keys(MISC_ADD[lang]).forEach(function (key) {
      window.I18N_PATCH[lang].misc[key] = MISC_ADD[lang][key];
    });
  });

  var langsFixed = 0, sauceCount = 0, noteCount = 0, warnCount = 0;

  Object.keys(SAUCE_ADD).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) return;
    if (!window.I18N_PATCH[lang].sauces) window.I18N_PATCH[lang].sauces = {};
    Object.keys(SAUCE_ADD[lang]).forEach(function (key) {
      window.I18N_PATCH[lang].sauces[key] = SAUCE_ADD[lang][key];
      sauceCount++;
    });
  });

  Object.keys(NOTE_ADD).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) return;
    window.I18N_PATCH[lang].nota_label = NOTE_ADD[lang].nota_label;
    window.I18N_PATCH[lang].nota_ph = NOTE_ADD[lang].nota_ph;
    noteCount++;
  });

  Object.keys(DEGU_WARN_FIX).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) return;
    window.I18N_PATCH[lang].pkg_degu_warn = DEGU_WARN_FIX[lang];
    warnCount++;
  });


  // 5) Custom alert/confirm popup messages (order sent, table required,
  //    no beverage, offline, error, clear cart, added-to-cart toast, etc.)
  //    These are read via the menu's tMsg() helper for any language beyond
  //    the 4 core ones, falling back straight into this pack's top level.
  var MSG_ADD = {
    'tr': { msg_added_cart: '✓ Sepete eklendi', msg_clear_cart_q: 'Sepeti boşalt?', msg_clear_yes: '✓ Evet, boşalt', msg_cancel: 'İptal', msg_items_word: 'ürün', msg_note_title: '📝 Not', msg_table_occupied: 'ℹ️ Bu masa dolu görünüyor — eğer orada oturuyorsanız sorun yok.', msg_offline: '📡 İnternet bağlantısı yok. Tekrar çevrimiçi olduğunuzda deneyin.', msg_table_required: '⚠️ Göndermeden önce masa numaranızı seçin!', msg_no_beverage: '⚠️ Herhangi bir içecek eklemediniz. Yine de siparişi göndermek istiyor musunuz?', msg_send_anyway: '✓ Evet, yine de gönder', msg_go_back: 'Geri dön', msg_order_sent: 'Sipariş başarıyla gönderildi! Garson kısa süre içinde alacak.', msg_modal_ok: '✓ Anladım', msg_order_error: '❌ Gönderim sırasında hata oluştu. Tekrar deneyin.' },
    'bg': { msg_added_cart: '✓ Добавено в количката', msg_clear_cart_q: 'Да изпразня ли количката?', msg_clear_yes: '✓ Да, изпразни', msg_cancel: 'Отказ', msg_items_word: 'артикула', msg_note_title: '📝 Забележка', msg_table_occupied: 'ℹ️ Тази маса изглежда вече заета — ако сте вие, всичко е наред.', msg_offline: '📡 Няма интернет връзка. Опитайте отново, когато сте онлайн.', msg_table_required: '⚠️ Изберете номер на маса преди да изпратите!', msg_no_beverage: '⚠️ Не сте добавили напитка. Искате ли все пак да изпратите поръчката?', msg_send_anyway: '✓ Да, изпрати въпреки това', msg_go_back: 'Назад', msg_order_sent: 'Поръчката е изпратена успешно! Сервитьорът ще я получи скоро.', msg_modal_ok: '✓ Разбрах', msg_order_error: '❌ Грешка при изпращането. Опитайте отново.' },
    'sk': { msg_added_cart: '✓ Pridané do košíka', msg_clear_cart_q: 'Vyprázdniť košík?', msg_clear_yes: '✓ Áno, vyprázdniť', msg_cancel: 'Zrušiť', msg_items_word: 'položiek', msg_note_title: '📝 Poznámka', msg_table_occupied: 'ℹ️ Tento stôl sa zdá byť obsadený — ak ste to vy, všetko je v poriadku.', msg_offline: '📡 Žiadne internetové pripojenie. Skúste to znova, keď budete online.', msg_table_required: '⚠️ Pred odoslaním vyberte číslo stola!', msg_no_beverage: '⚠️ Nepridali ste žiadny nápoj. Chcete napriek tomu odoslať objednávku?', msg_send_anyway: '✓ Áno, odoslať napriek tomu', msg_go_back: 'Späť', msg_order_sent: 'Objednávka bola úspešne odoslaná! Čašník ju čoskoro dostane.', msg_modal_ok: '✓ Rozumiem', msg_order_error: '❌ Chyba pri odosielaní. Skúste to znova.' },
    'hr': { msg_added_cart: '✓ Dodano u košaricu', msg_clear_cart_q: 'Isprazniti košaricu?', msg_clear_yes: '✓ Da, isprazni', msg_cancel: 'Odustani', msg_items_word: 'stavki', msg_note_title: '📝 Napomena', msg_table_occupied: 'ℹ️ Čini se da je ovaj stol već zauzet — ako ste to vi, sve je u redu.', msg_offline: '📡 Nema internetske veze. Pokušajte ponovno kada budete online.', msg_table_required: '⚠️ Odaberite broj stola prije slanja!', msg_no_beverage: '⚠️ Niste dodali piće. Želite li ipak poslati narudžbu?', msg_send_anyway: '✓ Da, ipak pošalji', msg_go_back: 'Natrag', msg_order_sent: 'Narudžba je uspješno poslana! Konobar će je uskoro primiti.', msg_modal_ok: '✓ Razumijem', msg_order_error: '❌ Greška prilikom slanja. Pokušajte ponovno.' },
    'sr': { msg_added_cart: '✓ Додато у корпу', msg_clear_cart_q: 'Испразнити корпу?', msg_clear_yes: '✓ Да, испразни', msg_cancel: 'Откажи', msg_items_word: 'ставки', msg_note_title: '📝 Напомена', msg_table_occupied: 'ℹ️ Овај сто изгледа већ заузет — ако сте то ви, све је у реду.', msg_offline: '📡 Нема интернет везе. Покушајте поново када будете онлајн.', msg_table_required: '⚠️ Изаберите број стола пре слања!', msg_no_beverage: '⚠️ Нисте додали пиће. Желите ли ипак да пошаљете наруџбину?', msg_send_anyway: '✓ Да, ипак пошаљи', msg_go_back: 'Назад', msg_order_sent: 'Наруџбина је успешно послата! Конобар ће је ускоро примити.', msg_modal_ok: '✓ Разумем', msg_order_error: '❌ Грешка при слању. Покушајте поново.' },
    'sl': { msg_added_cart: '✓ Dodano v košarico', msg_clear_cart_q: 'Izprazniti košarico?', msg_clear_yes: '✓ Da, izprazni', msg_cancel: 'Prekliči', msg_items_word: 'artiklov', msg_note_title: '📝 Opomba', msg_table_occupied: 'ℹ️ Ta miza je videti že zasedena — če ste to vi, je vse v redu.', msg_offline: '📡 Ni internetne povezave. Poskusite znova, ko boste spet povezani.', msg_table_required: '⚠️ Pred pošiljanjem izberite številko mize!', msg_no_beverage: '⚠️ Niste dodali pijače. Ali želite kljub temu poslati naročilo?', msg_send_anyway: '✓ Da, vseeno pošlji', msg_go_back: 'Nazaj', msg_order_sent: 'Naročilo je bilo uspešno poslano! Natakar ga bo kmalu prejel.', msg_modal_ok: '✓ Razumem', msg_order_error: '❌ Napaka pri pošiljanju. Poskusite znova.' },
    'ar': { msg_added_cart: '✓ تمت الإضافة إلى السلة', msg_clear_cart_q: 'إفراغ السلة؟', msg_clear_yes: '✓ نعم، أفرغ', msg_cancel: 'إلغاء', msg_items_word: 'عناصر', msg_note_title: '📝 ملاحظة', msg_table_occupied: 'ℹ️ تبدو هذه الطاولة مشغولة بالفعل — إذا كنت أنت الجالس هنا، فلا مشكلة.', msg_offline: '📡 لا يوجد اتصال بالإنترنت. حاول مرة أخرى عند العودة للاتصال.', msg_table_required: '⚠️ يرجى اختيار رقم الطاولة قبل الإرسال!', msg_no_beverage: '⚠️ لم تقم بإضافة أي مشروب. هل تريد إرسال الطلب على أي حال؟', msg_send_anyway: '✓ نعم، أرسل على أي حال', msg_go_back: 'رجوع', msg_order_sent: 'تم إرسال الطلب بنجاح! سيستلمه النادل قريبًا.', msg_modal_ok: '✓ فهمت', msg_order_error: '❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.' },
    'zh-CN': { msg_added_cart: '✓ 已加入购物车', msg_clear_cart_q: '清空购物车？', msg_clear_yes: '✓ 是的，清空', msg_cancel: '取消', msg_items_word: '项', msg_note_title: '📝 备注', msg_table_occupied: 'ℹ️ 此桌似乎已被占用——如果是您坐在这里，没有问题。', msg_offline: '📡 没有网络连接。重新联网后请再试一次。', msg_table_required: '⚠️ 发送前请先选择桌号！', msg_no_beverage: '⚠️ 您还没有添加饮品。仍要发送订单吗？', msg_send_anyway: '✓ 是的，仍然发送', msg_go_back: '返回', msg_order_sent: '订单发送成功！服务员很快会收到。', msg_modal_ok: '✓ 知道了', msg_order_error: '❌ 发送时出错，请重试。' },
    'ja': { msg_added_cart: '✓ カートに追加しました', msg_clear_cart_q: 'カートを空にしますか？', msg_clear_yes: '✓ はい、空にする', msg_cancel: 'キャンセル', msg_items_word: '点', msg_note_title: '📝 メモ', msg_table_occupied: 'ℹ️ このテーブルはすでに使用中のようです — ご本人であれば問題ありません。', msg_offline: '📡 インターネット接続がありません。オンラインに戻ってから再試行してください。', msg_table_required: '⚠️ 送信前にテーブル番号を選択してください！', msg_no_beverage: '⚠️ 飲み物が追加されていません。それでも注文を送信しますか？', msg_send_anyway: '✓ はい、それでも送信する', msg_go_back: '戻る', msg_order_sent: 'ご注文が送信されました！スタッフがまもなく確認します。', msg_modal_ok: '✓ 了解', msg_order_error: '❌ 送信中にエラーが発生しました。もう一度お試しください。' },
    'ko': { msg_added_cart: '✓ 장바구니에 추가됨', msg_clear_cart_q: '장바구니를 비우시겠습니까?', msg_clear_yes: '✓ 예, 비우기', msg_cancel: '취소', msg_items_word: '개', msg_note_title: '📝 메모', msg_table_occupied: 'ℹ️ 이 테이블은 이미 사용 중인 것 같습니다 — 본인이라면 문제 없습니다.', msg_offline: '📡 인터넷 연결이 없습니다. 다시 온라인 상태가 되면 시도해 주세요.', msg_table_required: '⚠️ 전송하기 전에 테이블 번호를 선택하세요!', msg_no_beverage: '⚠️ 음료를 추가하지 않았습니다. 그래도 주문을 보내시겠습니까?', msg_send_anyway: '✓ 예, 그래도 보내기', msg_go_back: '뒤로', msg_order_sent: '주문이 성공적으로 전송되었습니다! 곧 직원이 확인합니다.', msg_modal_ok: '✓ 확인', msg_order_error: '❌ 전송 중 오류가 발생했습니다. 다시 시도하세요.' },
    'hi': { msg_added_cart: '✓ कार्ट में जोड़ा गया', msg_clear_cart_q: 'कार्ट खाली करें?', msg_clear_yes: '✓ हां, खाली करें', msg_cancel: 'रद्द करें', msg_items_word: 'आइटम', msg_note_title: '📝 नोट', msg_table_occupied: 'ℹ️ यह टेबल पहले से ही व्याप्त दिख रही है — अगर आप वहीं बैठे हैं तो कोई समस्या नहीं।', msg_offline: '📡 इंटरनेट कनेक्शन नहीं है। ऑनलाइन होने पर पुनः प्रयास करें।', msg_table_required: '⚠️ भेजने से पहले टेबल नंबर चुनें!', msg_no_beverage: '⚠️ आपने कोई पेय नहीं जोड़ा। क्या फिर भी ऑर्डर भेजना चाहते हैं?', msg_send_anyway: '✓ हां, फिर भी भेजें', msg_go_back: 'वापस जाएं', msg_order_sent: 'ऑर्डर सफलतापूर्वक भेजा गया! वेटर जल्द ही प्राप्त करेगा।', msg_modal_ok: '✓ समझ गया', msg_order_error: '❌ भेजने में त्रुटि हुई। पुनः प्रयास करें।' },
    'bn': { msg_added_cart: '✓ কার্টে যোগ হয়েছে', msg_clear_cart_q: 'কার্ট খালি করবেন?', msg_clear_yes: '✓ হ্যাঁ, খালি করুন', msg_cancel: 'বাতিল', msg_items_word: 'আইটেম', msg_note_title: '📝 নোট', msg_table_occupied: 'ℹ️ এই টেবিলটি ইতিমধ্যে ব্যবহৃত মনে হচ্ছে — যদি আপনি এখানে বসে থাকেন, তাহলে কোনো সমস্যা নেই।', msg_offline: '📡 কোনো ইন্টারনেট সংযোগ নেই। আবার অনলাইনে এলে চেষ্টা করুন।', msg_table_required: '⚠️ পাঠানোর আগে টেবিল নম্বর নির্বাচন করুন!', msg_no_beverage: '⚠️ আপনি কোনো পানীয় যোগ করেননি। তবুও অর্ডার পাঠাতে চান?', msg_send_anyway: '✓ হ্যাঁ, তবুও পাঠান', msg_go_back: 'ফিরে যান', msg_order_sent: 'অর্ডার সফলভাবে পাঠানো হয়েছে! ওয়েটার শীঘ্রই পাবেন।', msg_modal_ok: '✓ বুঝেছি', msg_order_error: '❌ পাঠাতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।' },
    'ur': { msg_added_cart: '✓ کارٹ میں شامل کر دیا گیا', msg_clear_cart_q: 'کارٹ خالی کریں؟', msg_clear_yes: '✓ ہاں، خالی کریں', msg_cancel: 'منسوخ کریں', msg_items_word: 'اشیاء', msg_note_title: '📝 نوٹ', msg_table_occupied: 'ℹ️ یہ میز پہلے سے مصروف دکھائی دے رہی ہے — اگر آپ یہاں بیٹھے ہیں تو کوئی مسئلہ نہیں۔', msg_offline: '📡 انٹرنیٹ کنکشن نہیں ہے۔ دوبارہ آن لائن ہونے پر کوشش کریں۔', msg_table_required: '⚠️ بھیجنے سے پہلے میز نمبر منتخب کریں!', msg_no_beverage: '⚠️ آپ نے کوئی مشروب شامل نہیں کیا۔ کیا آپ پھر بھی آرڈر بھیجنا چاہتے ہیں؟', msg_send_anyway: '✓ ہاں، پھر بھی بھیجیں', msg_go_back: 'واپس جائیں', msg_order_sent: 'آرڈر کامیابی سے بھیج دیا گیا! ویٹر جلد ہی وصول کرے گا۔', msg_modal_ok: '✓ سمجھ گیا', msg_order_error: '❌ بھیجنے میں خرابی ہوئی۔ دوبارہ کوشش کریں۔' },
    'fa': { msg_added_cart: '✓ به سبد خرید اضافه شد', msg_clear_cart_q: 'سبد خرید خالی شود؟', msg_clear_yes: '✓ بله، خالی کن', msg_cancel: 'لغو', msg_items_word: 'مورد', msg_note_title: '📝 یادداشت', msg_table_occupied: 'ℹ️ به نظر می‌رسد این میز قبلاً اشغال شده — اگر شما آنجا نشسته‌اید مشکلی نیست.', msg_offline: '📡 اتصال اینترنت وجود ندارد. پس از اتصال دوباره تلاش کنید.', msg_table_required: '⚠️ لطفاً قبل از ارسال شماره میز را انتخاب کنید!', msg_no_beverage: '⚠️ نوشیدنی‌ای اضافه نکرده‌اید. آیا با این حال می‌خواهید سفارش را ارسال کنید؟', msg_send_anyway: '✓ بله، به هر حال ارسال کن', msg_go_back: 'بازگشت', msg_order_sent: 'سفارش با موفقیت ارسال شد! گارسون به‌زودی آن را دریافت می‌کند.', msg_modal_ok: '✓ متوجه شدم', msg_order_error: '❌ خطا در ارسال. دوباره تلاش کنید.' },
    'es': { msg_added_cart: '✓ Añadido al carrito', msg_clear_cart_q: '¿Vaciar el carrito?', msg_clear_yes: '✓ Sí, vaciar', msg_cancel: 'Cancelar', msg_items_word: 'artículos', msg_note_title: '📝 Nota', msg_table_occupied: 'ℹ️ Esta mesa parece estar ya ocupada — si eres tú quien está sentado aquí, no hay problema.', msg_offline: '📡 Sin conexión a internet. Vuelve a intentarlo cuando estés en línea.', msg_table_required: '⚠️ ¡Selecciona el número de mesa antes de enviar!', msg_no_beverage: '⚠️ No has añadido ninguna bebida. ¿Quieres enviar el pedido de todos modos?', msg_send_anyway: '✓ Sí, enviar de todos modos', msg_go_back: 'Volver', msg_order_sent: '¡Pedido enviado con éxito! El camarero lo recibirá en breve.', msg_modal_ok: '✓ Entendido', msg_order_error: '❌ Error al enviar. Inténtalo de nuevo.' },
    'pt': { msg_added_cart: '✓ Adicionado ao carrinho', msg_clear_cart_q: 'Esvaziar o carrinho?', msg_clear_yes: '✓ Sim, esvaziar', msg_cancel: 'Cancelar', msg_items_word: 'itens', msg_note_title: '📝 Nota', msg_table_occupied: 'ℹ️ Esta mesa já parece estar ocupada — se for você que está aqui, tudo bem.', msg_offline: '📡 Sem conexão à internet. Tente novamente quando estiver online.', msg_table_required: '⚠️ Selecione o número da mesa antes de enviar!', msg_no_beverage: '⚠️ Não adicionou nenhuma bebida. Deseja enviar o pedido mesmo assim?', msg_send_anyway: '✓ Sim, enviar mesmo assim', msg_go_back: 'Voltar', msg_order_sent: 'Pedido enviado com sucesso! O garçom irá recebê-lo em breve.', msg_modal_ok: '✓ Entendi', msg_order_error: '❌ Erro ao enviar. Tente novamente.' },
    'ru': { msg_added_cart: '✓ Добавлено в корзину', msg_clear_cart_q: 'Очистить корзину?', msg_clear_yes: '✓ Да, очистить', msg_cancel: 'Отмена', msg_items_word: 'позиций', msg_note_title: '📝 Примечание', msg_table_occupied: 'ℹ️ Этот стол уже занят — если это вы здесь сидите, всё в порядке.', msg_offline: '📡 Нет подключения к интернету. Повторите попытку, когда снова будете онлайн.', msg_table_required: '⚠️ Выберите номер стола перед отправкой!', msg_no_beverage: '⚠️ Вы не добавили напитки. Всё равно отправить заказ?', msg_send_anyway: '✓ Да, всё равно отправить', msg_go_back: 'Назад', msg_order_sent: 'Заказ успешно отправлен! Официант скоро его получит.', msg_modal_ok: '✓ Понятно', msg_order_error: '❌ Ошибка при отправке. Попробуйте снова.' },
    'nl': { msg_added_cart: '✓ Toegevoegd aan winkelwagen', msg_clear_cart_q: 'Winkelwagen leegmaken?', msg_clear_yes: '✓ Ja, leegmaken', msg_cancel: 'Annuleren', msg_items_word: 'items', msg_note_title: '📝 Notitie', msg_table_occupied: 'ℹ️ Deze tafel lijkt al bezet — als u hier zit, is dat geen probleem.', msg_offline: '📡 Geen internetverbinding. Probeer het opnieuw zodra u weer online bent.', msg_table_required: '⚠️ Selecteer eerst uw tafelnummer voordat u verzendt!', msg_no_beverage: '⚠️ U heeft geen drankje toegevoegd. Wilt u de bestelling toch verzenden?', msg_send_anyway: '✓ Ja, toch verzenden', msg_go_back: 'Terug', msg_order_sent: 'Bestelling succesvol verzonden! De ober ontvangt deze binnenkort.', msg_modal_ok: '✓ Begrepen', msg_order_error: '❌ Fout bij het verzenden. Probeer het opnieuw.' },
    'pl': { msg_added_cart: '✓ Dodano do koszyka', msg_clear_cart_q: 'Opróżnić koszyk?', msg_clear_yes: '✓ Tak, opróżnij', msg_cancel: 'Anuluj', msg_items_word: 'pozycji', msg_note_title: '📝 Notatka', msg_table_occupied: 'ℹ️ Ten stolik wydaje się już zajęty — jeśli to Ty tu siedzisz, wszystko w porządku.', msg_offline: '📡 Brak połączenia z internetem. Spróbuj ponownie, gdy będziesz online.', msg_table_required: '⚠️ Wybierz numer stolika przed wysłaniem!', msg_no_beverage: '⚠️ Nie dodałeś żadnego napoju. Czy mimo to wysłać zamówienie?', msg_send_anyway: '✓ Tak, wyślij mimo to', msg_go_back: 'Wstecz', msg_order_sent: 'Zamówienie zostało pomyślnie wysłane! Kelner wkrótce je otrzyma.', msg_modal_ok: '✓ Rozumiem', msg_order_error: '❌ Błąd podczas wysyłania. Spróbuj ponownie.' },
    'uk': { msg_added_cart: '✓ Додано в кошик', msg_clear_cart_q: 'Очистити кошик?', msg_clear_yes: '✓ Так, очистити', msg_cancel: 'Скасувати', msg_items_word: 'позицій', msg_note_title: '📝 Примітка', msg_table_occupied: 'ℹ️ Цей стіл вже здається зайнятим — якщо це ви тут сидите, все гаразд.', msg_offline: '📡 Немає підключення до інтернету. Спробуйте знову, коли будете онлайн.', msg_table_required: '⚠️ Виберіть номер столу перед відправкою!', msg_no_beverage: '⚠️ Ви не додали напій. Все одно надіслати замовлення?', msg_send_anyway: '✓ Так, все одно надіслати', msg_go_back: 'Назад', msg_order_sent: 'Замовлення успішно надіслано! Офіціант скоро його отримає.', msg_modal_ok: '✓ Зрозуміло', msg_order_error: '❌ Помилка під час надсилання. Спробуйте ще раз.' },
    'ro': { msg_added_cart: '✓ Adăugat în coș', msg_clear_cart_q: 'Goliți coșul?', msg_clear_yes: '✓ Da, golește', msg_cancel: 'Anulează', msg_items_word: 'articole', msg_note_title: '📝 Notă', msg_table_occupied: 'ℹ️ Această masă pare deja ocupată — dacă sunteți dvs. aici, nu e nicio problemă.', msg_offline: '📡 Nu există conexiune la internet. Încercați din nou când reveniți online.', msg_table_required: '⚠️ Selectați numărul mesei înainte de a trimite!', msg_no_beverage: '⚠️ Nu ați adăugat nicio băutură. Doriți totuși să trimiteți comanda?', msg_send_anyway: '✓ Da, trimite oricum', msg_go_back: 'Înapoi', msg_order_sent: 'Comanda a fost trimisă cu succes! Chelnerul o va primi în curând.', msg_modal_ok: '✓ Am înțeles', msg_order_error: '❌ Eroare la trimitere. Încercați din nou.' },
    'sv': { msg_added_cart: '✓ Tillagd i varukorgen', msg_clear_cart_q: 'Töm varukorgen?', msg_clear_yes: '✓ Ja, töm', msg_cancel: 'Avbryt', msg_items_word: 'artiklar', msg_note_title: '📝 Anteckning', msg_table_occupied: 'ℹ️ Det här bordet verkar redan vara upptaget — om det är du som sitter här är allt bra.', msg_offline: '📡 Ingen internetanslutning. Försök igen när du är online.', msg_table_required: '⚠️ Välj bordsnummer innan du skickar!', msg_no_beverage: '⚠️ Du har inte lagt till någon dryck. Vill du skicka beställningen ändå?', msg_send_anyway: '✓ Ja, skicka ändå', msg_go_back: 'Tillbaka', msg_order_sent: 'Beställningen har skickats! Servitören tar emot den inom kort.', msg_modal_ok: '✓ Uppfattat', msg_order_error: '❌ Fel vid skickning. Försök igen.' },
    'da': { msg_added_cart: '✓ Tilføjet til kurven', msg_clear_cart_q: 'Tøm kurven?', msg_clear_yes: '✓ Ja, tøm', msg_cancel: 'Annuller', msg_items_word: 'varer', msg_note_title: '📝 Note', msg_table_occupied: 'ℹ️ Dette bord ser allerede optaget ud — hvis det er dig, der sidder her, er alt fint.', msg_offline: '📡 Ingen internetforbindelse. Prøv igen, når du er online igen.', msg_table_required: '⚠️ Vælg bordnummer, før du sender!', msg_no_beverage: '⚠️ Du har ikke tilføjet nogen drikkevarer. Vil du sende bestillingen alligevel?', msg_send_anyway: '✓ Ja, send alligevel', msg_go_back: 'Tilbage', msg_order_sent: 'Bestillingen blev sendt! Tjeneren modtager den snart.', msg_modal_ok: '✓ Forstået', msg_order_error: '❌ Fejl under afsendelse. Prøv igen.' },
    'no': { msg_added_cart: '✓ Lagt til i handlekurven', msg_clear_cart_q: 'Tøm handlekurven?', msg_clear_yes: '✓ Ja, tøm', msg_cancel: 'Avbryt', msg_items_word: 'varer', msg_note_title: '📝 Notat', msg_table_occupied: 'ℹ️ Dette bordet ser allerede opptatt ut — hvis det er deg som sitter her, er alt greit.', msg_offline: '📡 Ingen internettforbindelse. Prøv igjen når du er online igjen.', msg_table_required: '⚠️ Velg bordnummer før du sender!', msg_no_beverage: '⚠️ Du har ikke lagt til noen drikke. Vil du sende bestillingen likevel?', msg_send_anyway: '✓ Ja, send likevel', msg_go_back: 'Tilbake', msg_order_sent: 'Bestillingen ble sendt! Kelneren mottar den snart.', msg_modal_ok: '✓ Forstått', msg_order_error: '❌ Feil under sending. Prøv igjen.' },
    'fi': { msg_added_cart: '✓ Lisätty ostoskoriin', msg_clear_cart_q: 'Tyhjennä ostoskori?', msg_clear_yes: '✓ Kyllä, tyhjennä', msg_cancel: 'Peruuta', msg_items_word: 'tuotetta', msg_note_title: '📝 Huomautus', msg_table_occupied: 'ℹ️ Tämä pöytä vaikuttaa jo varatulta — jos istut siinä itse, kaikki on hyvin.', msg_offline: '📡 Ei internetyhteyttä. Yritä uudelleen, kun olet taas verkossa.', msg_table_required: '⚠️ Valitse pöytänumero ennen lähettämistä!', msg_no_beverage: '⚠️ Et ole lisännyt juomaa. Haluatko silti lähettää tilauksen?', msg_send_anyway: '✓ Kyllä, lähetä silti', msg_go_back: 'Takaisin', msg_order_sent: 'Tilaus lähetetty onnistuneesti! Tarjoilija saa sen pian.', msg_modal_ok: '✓ Selvä', msg_order_error: '❌ Virhe lähetyksessä. Yritä uudelleen.' },
    'el': { msg_added_cart: '✓ Προστέθηκε στο καλάθι', msg_clear_cart_q: 'Άδειασμα καλαθιού;', msg_clear_yes: '✓ Ναι, άδειασμα', msg_cancel: 'Ακύρωση', msg_items_word: 'είδη', msg_note_title: '📝 Σημείωση', msg_table_occupied: 'ℹ️ Αυτό το τραπέζι φαίνεται ήδη κατειλημμένο — αν κάθεστε εσείς εδώ, δεν υπάρχει πρόβλημα.', msg_offline: '📡 Δεν υπάρχει σύνδεση στο διαδίκτυο. Δοκιμάστε ξανά όταν συνδεθείτε.', msg_table_required: '⚠️ Επιλέξτε αριθμό τραπεζιού πριν την αποστολή!', msg_no_beverage: '⚠️ Δεν έχετε προσθέσει ποτό. Θέλετε να στείλετε την παραγγελία ούτως ή άλλως;', msg_send_anyway: '✓ Ναι, στείλε ούτως ή άλλως', msg_go_back: 'Επιστροφή', msg_order_sent: 'Η παραγγελία στάλθηκε με επιτυχία! Ο σερβιτόρος θα την παραλάβει σύντομα.', msg_modal_ok: '✓ Κατάλαβα', msg_order_error: '❌ Σφάλμα κατά την αποστολή. Δοκιμάστε ξανά.' },
    'cs': { msg_added_cart: '✓ Přidáno do košíku', msg_clear_cart_q: 'Vyprázdnit košík?', msg_clear_yes: '✓ Ano, vyprázdnit', msg_cancel: 'Zrušit', msg_items_word: 'položek', msg_note_title: '📝 Poznámka', msg_table_occupied: 'ℹ️ Tento stůl se zdá být již obsazený — pokud jste to vy, kdo tu sedí, není to problém.', msg_offline: '📡 Žádné internetové připojení. Zkuste to znovu, až budete online.', msg_table_required: '⚠️ Před odesláním vyberte číslo stolu!', msg_no_beverage: '⚠️ Nepřidali jste žádný nápoj. Chcete přesto odeslat objednávku?', msg_send_anyway: '✓ Ano, přesto odeslat', msg_go_back: 'Zpět', msg_order_sent: 'Objednávka byla úspěšně odeslána! Číšník ji brzy obdrží.', msg_modal_ok: '✓ Rozumím', msg_order_error: '❌ Chyba při odesílání. Zkuste to znovu.' },
    'hu': { msg_added_cart: '✓ Hozzáadva a kosárhoz', msg_clear_cart_q: 'Kiüríti a kosarat?', msg_clear_yes: '✓ Igen, ürítsd ki', msg_cancel: 'Mégse', msg_items_word: 'tétel', msg_note_title: '📝 Megjegyzés', msg_table_occupied: 'ℹ️ Úgy tűnik, ez az asztal már foglalt — ha ön ül itt, minden rendben.', msg_offline: '📡 Nincs internetkapcsolat. Próbálja újra, amint újra online lesz.', msg_table_required: '⚠️ Küldés előtt válassza ki az asztal számát!', msg_no_beverage: '⚠️ Nem adott hozzá italt. Mindenképpen elküldi a rendelést?', msg_send_anyway: '✓ Igen, mindenképpen küldd el', msg_go_back: 'Vissza', msg_order_sent: 'A rendelés sikeresen elküldve! A pincér hamarosan megkapja.', msg_modal_ok: '✓ Értem', msg_order_error: '❌ Hiba történt a küldés során. Próbálja újra.' },
    'vi': { msg_added_cart: '✓ Đã thêm vào giỏ hàng', msg_clear_cart_q: 'Xóa giỏ hàng?', msg_clear_yes: '✓ Có, xóa', msg_cancel: 'Hủy', msg_items_word: 'món', msg_note_title: '📝 Ghi chú', msg_table_occupied: 'ℹ️ Bàn này có vẻ đã có người — nếu đó là bạn đang ngồi đây thì không sao.', msg_offline: '📡 Không có kết nối internet. Vui lòng thử lại khi có mạng.', msg_table_required: '⚠️ Vui lòng chọn số bàn trước khi gửi!', msg_no_beverage: '⚠️ Bạn chưa thêm đồ uống nào. Bạn vẫn muốn gửi đơn hàng chứ?', msg_send_anyway: '✓ Có, vẫn gửi', msg_go_back: 'Quay lại', msg_order_sent: 'Đơn hàng đã được gửi thành công! Nhân viên sẽ nhận được sớm.', msg_modal_ok: '✓ Đã hiểu', msg_order_error: '❌ Lỗi khi gửi. Vui lòng thử lại.' },
    'th': { msg_added_cart: '✓ เพิ่มลงตะกร้าแล้ว', msg_clear_cart_q: 'ล้างตะกร้าหรือไม่?', msg_clear_yes: '✓ ใช่ ล้างเลย', msg_cancel: 'ยกเลิก', msg_items_word: 'รายการ', msg_note_title: '📝 หมายเหตุ', msg_table_occupied: 'ℹ️ โต๊ะนี้ดูเหมือนจะมีคนใช้อยู่แล้ว — หากเป็นคุณที่นั่งอยู่ที่นี่ก็ไม่มีปัญหา', msg_offline: '📡 ไม่มีการเชื่อมต่ออินเทอร์เน็ต กรุณาลองใหม่เมื่อกลับมาออนไลน์', msg_table_required: '⚠️ กรุณาเลือกหมายเลขโต๊ะก่อนส่ง!', msg_no_beverage: '⚠️ คุณยังไม่ได้เพิ่มเครื่องดื่ม ต้องการส่งคำสั่งซื้อต่อไปหรือไม่?', msg_send_anyway: '✓ ใช่ ส่งต่อไป', msg_go_back: 'ย้อนกลับ', msg_order_sent: 'ส่งคำสั่งซื้อสำเร็จแล้ว! พนักงานจะได้รับในไม่ช้า', msg_modal_ok: '✓ เข้าใจแล้ว', msg_order_error: '❌ เกิดข้อผิดพลาดขณะส่ง กรุณาลองใหม่' }
  };
  Object.keys(MSG_ADD).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) return;
    Object.keys(MSG_ADD[lang]).forEach(function (key) {
      window.I18N_PATCH[lang][key] = MSG_ADD[lang][key];
    });
  });

  console.log('[i18n_patch_extra] Added Pescato/Gamberoni sauces for ' + sauceCount / 2 + ' languages, note field for ' + noteCount + ' languages, fixed pkg_degu_warn (Sabato Sera) for ' + warnCount + ' languages, misc labels for ' + Object.keys(MISC_ADD).length + ' languages, custom popup messages for ' + Object.keys(MSG_ADD).length + ' languages.');
})();
