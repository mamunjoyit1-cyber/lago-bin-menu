/**
 * storia_prodotti_i18n_patch.js
 * -----------------------------------------------------------------
 * Adds La Nostra Storia / I Nostri Prodotti translation keys — now
 * including the full history narrative and the "Perché si chiama
 * Lago Bin?" text — to the 30 extended languages already defined in
 * window.I18N_PATCH (i18n_patch.js). Follows the same additive-merge
 * pattern as bar_trans_patch.js — it does not touch any existing key.
 *
 * MUST load AFTER i18n_patch.js and BEFORE connect_menu_i18n.js,
 * because connect_menu_i18n.js reads window.I18N_PATCH into its own
 * `translations` object the moment it runs.
 *
 * Content note: storia_full_text and why_name_text are direct
 * translations of the exact Italian source already approved for
 * IT/FR/EN/DE — no facts, dates, or claims have been added, removed,
 * or altered in any language. Paragraph breaks (\n\n) are preserved
 * so they render the same way the CSS (white-space:pre-line) already
 * displays the IT/FR/EN/DE version.
 * -----------------------------------------------------------------
 */
(function () {
  if (typeof window.I18N_PATCH !== 'object' || !window.I18N_PATCH) {
    console.warn('[storia_prodotti_i18n_patch] window.I18N_PATCH not found — load this AFTER i18n_patch.js.');
    return;
  }

  var SP_PATCH = {
    nl: {
      storia_title: 'Ons Verhaal',
      storia_subtitle: 'Familiepassie sinds 1956',
      why_name_title: 'Waarom heet het "Lago Bin"?',
      storia_full_text: "Lago Bin is ontstaan uit een familieverhaal, passie en gastvrijheid die teruggaan tot 1956.\n\nVoordat het de huidige hotelstructuur werd, stond Lago Bin vooral bekend als restaurant, verbonden met de lokale keuken en de tradities van het gebied.\n\nIn de loop der jaren is de structuur gegroeid en ook een hotel geworden, maar de band met de eigen geschiedenis, met de familie en met de smaken van de Valle Argentina is behouden gebleven.\n\nDe keuken blijft de streekproducten en een traditie die door de tijd heen is doorgegeven, waarderen.\n\nLago Bin is vandaag een plek waar gastvrijheid, keuken en traditie samenkomen in het hart van Rocchetta Nervina.",
      why_name_text: "De naam 'Lago Bin' is verbonden met het gebied van Rocchetta Nervina.\n\nOude lokale bronnen vermelden de naam 'Lago Bin' met betrekking tot een plek en een waterspiegel in de streek, die al vóór de huidige structuur onder deze naam bekend was.\n\nDe naam Lago Bin is daarom behouden gebleven als deel van de identiteit van de plek en de structuur.",
      prodotti_title: 'Onze Producten',
      prodotti_subtitle: 'Onze eigen specialiteiten, verkrijgbaar bij de receptie.',
      product_olio_desc: 'Extra vergine olijfolie van eigen productie.',
      product_limoncello_desc: 'Limoncello van eigen productie.',
      product_marmellata_desc: 'Zelfgemaakte jam, bereid met geselecteerd fruit, verkrijgbaar in verschillende smaken afhankelijk van het seizoen.',
      seasonal_badge: 'Seizoensgebonden smaken',
      seasonal_note: 'De beschikbare smaken kunnen variëren afhankelijk van het seizoen en de beschikbaarheid van fruit.',
      reception_tag: 'Verkrijgbaar bij de receptie'
    },
    es: {
      storia_title: 'Nuestra Historia',
      storia_subtitle: 'Pasión familiar desde 1956',
      why_name_title: '¿Por qué se llama "Lago Bin"?',
      storia_full_text: "Lago Bin nace de una historia de familia, pasión y hospitalidad que hunde sus raíces en 1956.\n\nAntes de convertirse en la actual estructura hotelera, Lago Bin era conocido sobre todo como restaurante, vinculado a la cocina del territorio y a las tradiciones locales.\n\nCon el paso de los años la estructura ha crecido, convirtiéndose también en hotel, pero manteniendo el vínculo con su propia historia, con la familia y con los sabores del Valle Argentina.\n\nLa cocina continúa valorando los productos del territorio y una tradición que se transmite a través del tiempo.\n\nLago Bin es hoy un lugar donde hospitalidad, cocina y tradición se encuentran en el corazón de Rocchetta Nervina.",
      why_name_text: "El nombre 'Lago Bin' está ligado al territorio de Rocchetta Nervina.\n\nAntiguas fuentes locales mencionan de hecho el nombre 'Lago Bin' referido a un lugar y a un espejo de agua de la zona, ya conocido con este nombre antes de la actual estructura.\n\nEl nombre Lago Bin se ha mantenido así como parte de la identidad del lugar y de la estructura.",
      prodotti_title: 'Nuestros Productos',
      prodotti_subtitle: 'Especialidades de producción propia, disponibles en Recepción.',
      product_olio_desc: 'Aceite de oliva virgen extra de producción propia.',
      product_limoncello_desc: 'Limoncello de producción propia.',
      product_marmellata_desc: 'Mermelada casera, preparada con fruta seleccionada y disponible en diferentes variedades según la temporada.',
      seasonal_badge: 'Variedades de temporada',
      seasonal_note: 'Las variedades disponibles pueden cambiar según la temporada y la disponibilidad de la fruta.',
      reception_tag: 'Disponible en Recepción'
    },
    pt: {
      storia_title: 'A Nossa História',
      storia_subtitle: 'Paixão de família desde 1956',
      why_name_title: 'Porque se chama "Lago Bin"?',
      storia_full_text: "O Lago Bin nasce de uma história de família, paixão e hospitalidade que mergulha as suas raízes em 1956.\n\nAntes de se tornar a atual estrutura hoteleira, o Lago Bin era conhecido sobretudo como restaurante, ligado à cozinha do território e às tradições locais.\n\nAo longo dos anos a estrutura cresceu, tornando-se também hotel, mas mantendo o vínculo com a sua história, com a família e com os sabores do Vale Argentina.\n\nA cozinha continua a valorizar os produtos do território e uma tradição transmitida ao longo do tempo.\n\nO Lago Bin é hoje um lugar onde hospitalidade, cozinha e tradição se encontram no coração de Rocchetta Nervina.",
      why_name_text: "O nome 'Lago Bin' está ligado ao território de Rocchetta Nervina.\n\nFontes locais antigas referem de facto o nome 'Lago Bin' associado a um lugar e a um espelho de água da zona, já conhecido com este nome antes da atual estrutura.\n\nO nome Lago Bin foi assim mantido como parte da identidade do lugar e da estrutura.",
      prodotti_title: 'Os Nossos Produtos',
      prodotti_subtitle: 'Especialidades de produção própria, disponíveis na Receção.',
      product_olio_desc: 'Azeite extra virgem de produção própria.',
      product_limoncello_desc: 'Limoncello de produção própria.',
      product_marmellata_desc: 'Compota caseira, preparada com fruta selecionada e disponível em diferentes variedades conforme a estação.',
      seasonal_badge: 'Variedades sazonais',
      seasonal_note: 'As variedades disponíveis podem mudar consoante a estação e a disponibilidade da fruta.',
      reception_tag: 'Disponível na Receção'
    },
    ru: {
      storia_title: 'Наша История',
      storia_subtitle: 'Семейная страсть с 1956 года',
      why_name_title: 'Почему называется «Lago Bin»?',
      storia_full_text: "История Lago Bin — это семейная история, страсть и гостеприимство, уходящие корнями в 1956 год.\n\nДо того как стать нынешним отельным комплексом, Lago Bin был известен прежде всего как ресторан, связанный с местной кухней и традициями региона.\n\nС годами структура расширилась, превратившись также в отель, но сохранив связь со своей историей, семьёй и вкусами долины Валле-Арджентина.\n\nКухня продолжает ценить местные продукты и традицию, передаваемую из поколения в поколение.\n\nСегодня Lago Bin — это место, где гостеприимство, кухня и традиции встречаются в сердце Роккетта-Нервина.",
      why_name_text: "Название «Lago Bin» связано с территорией Роккетта-Нервина.\n\nДревние местные источники упоминают название «Lago Bin» применительно к месту и водоёму в этой местности, уже известному под этим именем до появления нынешней структуры.\n\nТаким образом, название Lago Bin было сохранено как часть идентичности этого места и структуры.",
      prodotti_title: 'Наши Продукты',
      prodotti_subtitle: 'Фирменные продукты собственного производства, доступны на ресепшене.',
      product_olio_desc: 'Оливковое масло extra vergine собственного производства.',
      product_limoncello_desc: 'Лимончелло собственного производства.',
      product_marmellata_desc: 'Домашнее варенье из отборных фруктов, доступно в разных вариантах в зависимости от сезона.',
      seasonal_badge: 'Сезонные вкусы',
      seasonal_note: 'Доступные вкусы могут меняться в зависимости от сезона и наличия фруктов.',
      reception_tag: 'Доступно на ресепшене'
    },
    pl: {
      storia_title: 'Nasza Historia',
      storia_subtitle: 'Rodzinna pasja od 1956 roku',
      why_name_title: 'Dlaczego nazywa się "Lago Bin"?',
      storia_full_text: "Lago Bin narodziło się z rodzinnej historii, pasji i gościnności, sięgających korzeniami 1956 roku.\n\nZanim stało się obecnym obiektem hotelowym, Lago Bin było znane przede wszystkim jako restauracja, związana z kuchnią regionu i lokalnymi tradycjami.\n\nZ biegiem lat obiekt rozrósł się, stając się także hotelem, zachowując jednak więź z własną historią, rodziną i smakami Doliny Argentina.\n\nKuchnia nadal docenia produkty regionu oraz tradycję przekazywaną z pokolenia na pokolenie.\n\nLago Bin jest dziś miejscem, gdzie gościnność, kuchnia i tradycja spotykają się w sercu Rocchetta Nervina.",
      why_name_text: "Nazwa 'Lago Bin' jest związana z terytorium Rocchetta Nervina.\n\nDawne lokalne źródła wspominają bowiem nazwę 'Lago Bin' odnoszącą się do miejsca i zbiornika wodnego w tej okolicy, znanego pod tą nazwą jeszcze przed powstaniem obecnego obiektu.\n\nNazwa Lago Bin została więc zachowana jako część tożsamości miejsca i obiektu.",
      prodotti_title: 'Nasze Produkty',
      prodotti_subtitle: 'Specjały własnej produkcji, dostępne w recepcji.',
      product_olio_desc: 'Oliwa z oliwek extra vergine własnej produkcji.',
      product_limoncello_desc: 'Limoncello własnej produkcji.',
      product_marmellata_desc: 'Domowy dżem przygotowany z wyselekcjonowanych owoców, dostępny w różnych odmianach w zależności od sezonu.',
      seasonal_badge: 'Odmiany sezonowe',
      seasonal_note: 'Dostępne odmiany mogą się zmieniać w zależności od sezonu i dostępności owoców.',
      reception_tag: 'Dostępne w recepcji'
    },
    uk: {
      storia_title: 'Наша Історія',
      storia_subtitle: 'Сімейна пристрасть з 1956 року',
      why_name_title: 'Чому називається «Lago Bin»?',
      storia_full_text: "Lago Bin народився із сімейної історії, пристрасті та гостинності, що сягають корінням 1956 року.\n\nПерш ніж стати нинішнім готельним комплексом, Lago Bin був відомий насамперед як ресторан, пов'язаний із кухнею регіону та місцевими традиціями.\n\nЗ роками заклад розрісся, ставши також готелем, зберігаючи при цьому зв'язок із власною історією, родиною та смаками долини Валле-Арджентіна.\n\nКухня й донині цінує продукти цього краю та традицію, що передається крізь час.\n\nСьогодні Lago Bin — це місце, де гостинність, кухня та традиція зустрічаються в самому серці Роккетта-Нервіна.",
      why_name_text: "Назва «Lago Bin» пов'язана з територією Роккетта-Нервіна.\n\nДавні місцеві джерела згадують назву «Lago Bin» стосовно місця та водойми в цій місцевості, вже відомої під цією назвою ще до появи нинішнього закладу.\n\nТаким чином, назву Lago Bin було збережено як частину ідентичності цього місця та закладу.",
      prodotti_title: 'Наші Продукти',
      prodotti_subtitle: 'Фірмові продукти власного виробництва, доступні на рецепції.',
      product_olio_desc: 'Оливкова олія extra vergine власного виробництва.',
      product_limoncello_desc: 'Лімончелло власного виробництва.',
      product_marmellata_desc: 'Домашній джем з відібраних фруктів, доступний у різних варіантах залежно від сезону.',
      seasonal_badge: 'Сезонні смаки',
      seasonal_note: 'Доступні смаки можуть змінюватися залежно від сезону та наявності фруктів.',
      reception_tag: 'Доступно на рецепції'
    },
    ro: {
      storia_title: 'Povestea Noastră',
      storia_subtitle: 'Pasiune de familie din 1956',
      why_name_title: 'De ce se numește "Lago Bin"?',
      storia_full_text: "Lago Bin s-a născut dintr-o poveste de familie, pasiune și ospitalitate ale cărei rădăcini urcă până în 1956.\n\nÎnainte de a deveni actuala structură hotelieră, Lago Bin era cunoscut mai ales ca restaurant, legat de bucătăria teritoriului și de tradițiile locale.\n\nDe-a lungul anilor structura a crescut, devenind și hotel, dar păstrând legătura cu propria istorie, cu familia și cu gusturile Văii Argentina.\n\nBucătăria continuă să valorifice produsele teritoriului și o tradiție transmisă de-a lungul timpului.\n\nAstăzi, Lago Bin este un loc unde ospitalitatea, bucătăria și tradiția se întâlnesc în inima localității Rocchetta Nervina.",
      why_name_text: "Numele 'Lago Bin' este legat de teritoriul Rocchetta Nervina.\n\nVechi surse locale menționează de fapt numele 'Lago Bin' referitor la un loc și o oglindă de apă din zonă, cunoscută deja sub acest nume înainte de actuala structură.\n\nNumele Lago Bin a fost astfel păstrat ca parte a identității locului și a structurii.",
      prodotti_title: 'Produsele Noastre',
      prodotti_subtitle: 'Specialități de producție proprie, disponibile la Recepție.',
      product_olio_desc: 'Ulei de măsline extravirgin de producție proprie.',
      product_limoncello_desc: 'Limoncello de producție proprie.',
      product_marmellata_desc: 'Dulceață de casă, preparată din fructe selecționate, disponibilă în diverse soiuri în funcție de sezon.',
      seasonal_badge: 'Soiuri de sezon',
      seasonal_note: 'Soiurile disponibile se pot schimba în funcție de sezon și disponibilitatea fructelor.',
      reception_tag: 'Disponibil la Recepție'
    },
    sv: {
      storia_title: 'Vår Historia',
      storia_subtitle: 'Familjepassion sedan 1956',
      why_name_title: 'Varför heter det "Lago Bin"?',
      storia_full_text: "Lago Bin föddes ur en familjehistoria, passion och gästfrihet vars rötter går tillbaka till 1956.\n\nInnan det blev den nuvarande hotellanläggningen var Lago Bin mest känt som restaurang, kopplad till den lokala matlagningen och traditionerna i området.\n\nMed åren har anläggningen vuxit och blivit även ett hotell, men den har behållit sin koppling till sin historia, till familjen och till smakerna från Valle Argentina-dalen.\n\nKöket fortsätter att lyfta fram råvaror från trakten och en tradition som förts vidare genom tiden.\n\nLago Bin är idag en plats där gästfrihet, matlagning och tradition möts i hjärtat av Rocchetta Nervina.",
      why_name_text: "Namnet 'Lago Bin' är kopplat till området kring Rocchetta Nervina.\n\nGamla lokala källor nämner faktiskt namnet 'Lago Bin' med hänvisning till en plats och en vattenspegel i trakten, som redan var känd under detta namn innan den nuvarande anläggningen fanns.\n\nNamnet Lago Bin har därför bevarats som en del av platsens och anläggningens identitet.",
      prodotti_title: 'Våra Produkter',
      prodotti_subtitle: 'Egenproducerade specialiteter, tillgängliga i receptionen.',
      product_olio_desc: 'Extra jungfruolivolja av egen produktion.',
      product_limoncello_desc: 'Limoncello av egen produktion.',
      product_marmellata_desc: 'Hemgjord sylt tillagad med utvalda frukter, tillgänglig i olika sorter beroende på säsong.',
      seasonal_badge: 'Säsongssorter',
      seasonal_note: 'Tillgängliga sorter kan variera beroende på säsong och tillgång på frukt.',
      reception_tag: 'Tillgänglig i receptionen'
    },
    da: {
      storia_title: 'Vores Historie',
      storia_subtitle: 'Familiepassion siden 1956',
      why_name_title: 'Hvorfor hedder det "Lago Bin"?',
      storia_full_text: "Lago Bin er født ud af en familiehistorie, passion og gæstfrihed, hvis rødder går tilbage til 1956.\n\nFør det blev den nuværende hotelbygning, var Lago Bin mest kendt som restaurant, knyttet til den lokale mad og egnens traditioner.\n\nGennem årene er stedet vokset og er også blevet et hotel, men har bevaret båndet til sin egen historie, til familien og til smagene fra Valle Argentina-dalen.\n\nKøkkenet fortsætter med at fremhæve lokale råvarer og en tradition, der er givet videre gennem tiden.\n\nLago Bin er i dag et sted, hvor gæstfrihed, mad og tradition mødes i hjertet af Rocchetta Nervina.",
      why_name_text: "Navnet 'Lago Bin' er knyttet til området omkring Rocchetta Nervina.\n\nGamle lokale kilder nævner faktisk navnet 'Lago Bin' i forbindelse med et sted og et vandspejl i egnen, som allerede var kendt under dette navn før den nuværende bygning.\n\nNavnet Lago Bin er derfor blevet bevaret som en del af stedets og bygningens identitet.",
      prodotti_title: 'Vores Produkter',
      prodotti_subtitle: 'Specialiteter fra egen produktion, tilgængelige i receptionen.',
      product_olio_desc: 'Ekstra jomfru olivenolie fra egen produktion.',
      product_limoncello_desc: 'Limoncello fra egen produktion.',
      product_marmellata_desc: 'Hjemmelavet marmelade tilberedt med udvalgte frugter, tilgængelig i forskellige varianter afhængigt af sæsonen.',
      seasonal_badge: 'Sæsonvarianter',
      seasonal_note: 'De tilgængelige varianter kan ændre sig afhængigt af sæsonen og adgangen til frugt.',
      reception_tag: 'Tilgængelig i receptionen'
    },
    no: {
      storia_title: 'Vår Historie',
      storia_subtitle: 'Familiepasjon siden 1956',
      why_name_title: 'Hvorfor heter det "Lago Bin"?',
      storia_full_text: "Lago Bin oppsto fra en familiehistorie, lidenskap og gjestfrihet med røtter tilbake til 1956.\n\nFør det ble dagens hotellanlegg, var Lago Bin mest kjent som restaurant, knyttet til den lokale matlagingen og tradisjonene i området.\n\nGjennom årene har stedet vokst og også blitt et hotell, men har beholdt båndet til sin egen historie, til familien og til smakene fra Valle Argentina-dalen.\n\nKjøkkenet fortsetter å fremheve lokale råvarer og en tradisjon som er ført videre gjennom tiden.\n\nLago Bin er i dag et sted hvor gjestfrihet, mat og tradisjon møtes i hjertet av Rocchetta Nervina.",
      why_name_text: "Navnet 'Lago Bin' er knyttet til området rundt Rocchetta Nervina.\n\nGamle lokale kilder nevner faktisk navnet 'Lago Bin' i forbindelse med et sted og et vannspeil i traktene, allerede kjent under dette navnet før dagens anlegg.\n\nNavnet Lago Bin er derfor blitt bevart som en del av stedets og anleggets identitet.",
      prodotti_title: 'Våre Produkter',
      prodotti_subtitle: 'Spesialiteter fra egen produksjon, tilgjengelig i resepsjonen.',
      product_olio_desc: 'Ekstra virgin olivenolje fra egen produksjon.',
      product_limoncello_desc: 'Limoncello fra egen produksjon.',
      product_marmellata_desc: 'Hjemmelaget syltetøy laget med utvalgt frukt, tilgjengelig i ulike varianter avhengig av sesong.',
      seasonal_badge: 'Sesongvarianter',
      seasonal_note: 'Tilgjengelige varianter kan endres avhengig av sesong og tilgang på frukt.',
      reception_tag: 'Tilgjengelig i resepsjonen'
    },
    fi: {
      storia_title: 'Tarinamme',
      storia_subtitle: 'Perheen intohimo vuodesta 1956',
      why_name_title: 'Miksi nimi on "Lago Bin"?',
      storia_full_text: "Lago Bin sai alkunsa perheen tarinasta, intohimosta ja vieraanvaraisuudesta, joiden juuret ulottuvat vuoteen 1956.\n\nEnnen kuin siitä tuli nykyinen hotellirakennus, Lago Bin tunnettiin ennen kaikkea ravintolana, joka liittyi alueen keittiöön ja paikallisiin perinteisiin.\n\nVuosien saatossa laitos on kasvanut ja siitä on tullut myös hotelli, mutta yhteys omaan historiaan, perheeseen ja Valle Argentinan laakson makuihin on säilynyt.\n\nKeittiö arvostaa edelleen alueen tuotteita ja perinnettä, joka on siirtynyt ajan myötä sukupolvelta toiselle.\n\nLago Bin on nykyään paikka, jossa vieraanvaraisuus, keittiö ja perinne kohtaavat Rocchetta Nervinan sydämessä.",
      why_name_text: "Nimi 'Lago Bin' liittyy Rocchetta Nervinan alueeseen.\n\nVanhat paikalliset lähteet mainitsevat nimen 'Lago Bin' viitaten alueen paikkaan ja vesialtaaseen, joka tunnettiin tällä nimellä jo ennen nykyistä rakennusta.\n\nNimi Lago Bin on näin säilytetty osana paikan ja rakennuksen identiteettiä.",
      prodotti_title: 'Tuotteemme',
      prodotti_subtitle: 'Omia erikoisuuksiamme, saatavilla vastaanotosta.',
      product_olio_desc: 'Omaa tuotantoa oleva ekstra-neitsytoliiviöljy.',
      product_limoncello_desc: 'Omaa tuotantoa oleva limoncello.',
      product_marmellata_desc: 'Kotitekoinen hillo valikoiduista hedelmistä, saatavilla eri makuina vuodenajan mukaan.',
      seasonal_badge: 'Kausimaut',
      seasonal_note: 'Saatavilla olevat maut voivat vaihdella vuodenajan ja hedelmien saatavuuden mukaan.',
      reception_tag: 'Saatavilla vastaanotosta'
    },
    el: {
      storia_title: 'Η Ιστορία μας',
      storia_subtitle: 'Οικογενειακό πάθος από το 1956',
      why_name_title: 'Γιατί ονομάζεται "Lago Bin";',
      storia_full_text: "Το Lago Bin γεννήθηκε από μια οικογενειακή ιστορία, πάθος και φιλοξενία που έχουν τις ρίζες τους στο 1956.\n\nΠριν γίνει η σημερινή ξενοδοχειακή μονάδα, το Lago Bin ήταν γνωστό κυρίως ως εστιατόριο, συνδεδεμένο με την τοπική κουζίνα και τις παραδόσεις της περιοχής.\n\nΜε τα χρόνια η δομή μεγάλωσε, γίνοντας και ξενοδοχείο, διατηρώντας όμως τον δεσμό με τη δική της ιστορία, με την οικογένεια και με τις γεύσεις της κοιλάδας Valle Argentina.\n\nΗ κουζίνα συνεχίζει να αναδεικνύει τα προϊόντα της περιοχής και μια παράδοση που μεταδίδεται στον χρόνο.\n\nΤο Lago Bin είναι σήμερα ένας τόπος όπου φιλοξενία, κουζίνα και παράδοση συναντιούνται στην καρδιά του Rocchetta Nervina.",
      why_name_text: "Το όνομα 'Lago Bin' συνδέεται με την περιοχή του Rocchetta Nervina.\n\nΠαλιές τοπικές πηγές αναφέρουν πράγματι το όνομα 'Lago Bin' αναφερόμενο σε έναν τόπο και μια υδάτινη επιφάνεια της περιοχής, ήδη γνωστή με αυτό το όνομα πριν από τη σημερινή δομή.\n\nΤο όνομα Lago Bin διατηρήθηκε έτσι ως μέρος της ταυτότητας του τόπου και της δομής.",
      prodotti_title: 'Τα Προϊόντα μας',
      prodotti_subtitle: 'Ειδικότητες δικής μας παραγωγής, διαθέσιμες στη Ρεσεψιόν.',
      product_olio_desc: 'Εξαιρετικό παρθένο ελαιόλαδο δικής μας παραγωγής.',
      product_limoncello_desc: 'Limoncello δικής μας παραγωγής.',
      product_marmellata_desc: 'Σπιτική μαρμελάδα από επιλεγμένα φρούτα, διαθέσιμη σε διάφορες ποικιλίες ανάλογα με την εποχή.',
      seasonal_badge: 'Εποχιακές ποικιλίες',
      seasonal_note: 'Οι διαθέσιμες ποικιλίες ενδέχεται να αλλάζουν ανάλογα με την εποχή και τη διαθεσιμότητα φρούτων.',
      reception_tag: 'Διαθέσιμο στη Ρεσεψιόν'
    },
    cs: {
      storia_title: 'Náš Příběh',
      storia_subtitle: 'Rodinná vášeň od roku 1956',
      why_name_title: 'Proč se jmenuje "Lago Bin"?',
      storia_full_text: "Lago Bin vzniklo z rodinného příběhu, vášně a pohostinnosti, jejichž kořeny sahají do roku 1956.\n\nNež se stalo dnešním hotelovým zařízením, bylo Lago Bin známé především jako restaurace spjatá s místní kuchyní a tradicemi regionu.\n\nV průběhu let se zařízení rozrostlo a stalo se také hotelem, přičemž si zachovalo vazbu na vlastní historii, rodinu a chutě údolí Valle Argentina.\n\nKuchyně nadále ctí místní produkty a tradici předávanou v čase.\n\nLago Bin je dnes místem, kde se pohostinnost, kuchyně a tradice setkávají v srdci Rocchetta Nervina.",
      why_name_text: "Název 'Lago Bin' je spjat s územím Rocchetta Nervina.\n\nStaré místní prameny totiž uvádějí název 'Lago Bin' ve vztahu k místu a vodní ploše v okolí, které bylo pod tímto názvem známé již před vznikem dnešního zařízení.\n\nNázev Lago Bin tak byl zachován jako součást identity místa a zařízení.",
      prodotti_title: 'Naše Produkty',
      prodotti_subtitle: 'Speciality vlastní výroby, dostupné na recepci.',
      product_olio_desc: 'Extra panenský olivový olej vlastní výroby.',
      product_limoncello_desc: 'Limoncello vlastní výroby.',
      product_marmellata_desc: 'Domácí marmeláda připravená z vybraného ovoce, dostupná v různých druzích podle sezóny.',
      seasonal_badge: 'Sezónní druhy',
      seasonal_note: 'Dostupné druhy se mohou měnit podle sezóny a dostupnosti ovoce.',
      reception_tag: 'Dostupné na recepci'
    },
    hu: {
      storia_title: 'A Történetünk',
      storia_subtitle: 'Családi szenvedély 1956 óta',
      why_name_title: 'Miért hívják "Lago Bin"-nek?',
      storia_full_text: "A Lago Bin egy családi történetből, szenvedélyből és vendégszeretetből született, amelynek gyökerei 1956-ig nyúlnak vissza.\n\nMielőtt a mai szállodai létesítménnyé vált volna, a Lago Bin elsősorban étteremként volt ismert, a vidék konyhájához és a helyi hagyományokhoz kötődve.\n\nAz évek során a létesítmény bővült, szállodává is vált, de megőrizte kapcsolatát saját történetével, a családdal és a Valle Argentina völgy ízeivel.\n\nA konyha továbbra is a vidék termékeit és egy időben áthagyományozott hagyományt ápol.\n\nA Lago Bin ma egy olyan hely, ahol a vendégszeretet, a konyha és a hagyomány találkozik Rocchetta Nervina szívében.",
      why_name_text: "A 'Lago Bin' név Rocchetta Nervina területéhez kötődik.\n\nRégi helyi források valóban megemlítik a 'Lago Bin' nevet, amely a térség egy helyére és egy vízfelületére utal, amelyet már a mai létesítmény előtt is ezen a néven ismertek.\n\nA Lago Bin nevet így megőrizték a hely és a létesítmény identitásának részeként.",
      prodotti_title: 'Termékeink',
      prodotti_subtitle: 'Saját termelésű különlegességeink, a recepción kaphatók.',
      product_olio_desc: 'Saját termelésű extra szűz olívaolaj.',
      product_limoncello_desc: 'Saját termelésű limoncello.',
      product_marmellata_desc: 'Házi lekvár válogatott gyümölcsökből, évszaktól függően különböző fajtákban kapható.',
      seasonal_badge: 'Szezonális fajták',
      seasonal_note: 'Az elérhető fajták az évszaktól és a gyümölcs elérhetőségétől függően változhatnak.',
      reception_tag: 'A recepción kapható'
    },
    bg: {
      storia_title: 'Нашата История',
      storia_subtitle: 'Семейна страст от 1956 г.',
      why_name_title: 'Защо се казва "Lago Bin"?',
      storia_full_text: "Lago Bin се ражда от семейна история, страст и гостоприемство, чиито корени стигат до 1956 г.\n\nПреди да се превърне в днешния хотелски комплекс, Lago Bin е бил известен най-вече като ресторант, свързан с местната кухня и традициите на региона.\n\nПрез годините структурата се разраства, превръщайки се и в хотел, но запазвайки връзката със собствената си история, със семейството и с вкусовете на долината Валле Ардженти́на.\n\nКухнята продължава да цени продуктите на региона и традиция, предавана през времето.\n\nLago Bin днес е място, където гостоприемство, кухня и традиция се срещат в сърцето на Рокета Нервина.",
      why_name_text: "Името 'Lago Bin' е свързано с територията на Рокета Нервина.\n\nСтари местни източници всъщност споменават името 'Lago Bin', отнасящо се до едно място и воден басейн в района, известен под това име още преди днешния комплекс.\n\nПо този начин името Lago Bin е запазено като част от идентичността на мястото и комплекса.",
      prodotti_title: 'Нашите Продукти',
      prodotti_subtitle: 'Специалитети от собствено производство, налични на рецепцията.',
      product_olio_desc: 'Зехтин extra vergine от собствено производство.',
      product_limoncello_desc: 'Лимончело от собствено производство.',
      product_marmellata_desc: 'Домашно сладко от подбрани плодове, налично в различни разновидности според сезона.',
      seasonal_badge: 'Сезонни разновидности',
      seasonal_note: 'Наличните разновидности могат да се променят според сезона и наличността на плодове.',
      reception_tag: 'Налично на рецепцията'
    },
    sk: {
      storia_title: 'Náš Príbeh',
      storia_subtitle: 'Rodinná vášeň od roku 1956',
      why_name_title: 'Prečo sa volá "Lago Bin"?',
      storia_full_text: "Lago Bin sa zrodilo z rodinného príbehu, vášne a pohostinnosti, ktorých korene siahajú do roku 1956.\n\nPredtým, ako sa stalo dnešným hotelovým zariadením, bolo Lago Bin známe predovšetkým ako reštaurácia spojená s miestnou kuchyňou a tradíciami regiónu.\n\nV priebehu rokov sa zariadenie rozrástlo a stalo sa aj hotelom, pričom si zachovalo väzbu na vlastnú históriu, rodinu a chute údolia Valle Argentina.\n\nKuchyňa naďalej oceňuje miestne produkty a tradíciu odovzdávanú v čase.\n\nLago Bin je dnes miestom, kde sa pohostinnosť, kuchyňa a tradícia stretávajú v srdci Rocchetta Nervina.",
      why_name_text: "Názov 'Lago Bin' je spojený s územím Rocchetta Nervina.\n\nStaré miestne pramene totiž uvádzajú názov 'Lago Bin' vo vzťahu k miestu a vodnej ploche v okolí, ktoré bolo pod týmto názvom známe už pred vznikom dnešného zariadenia.\n\nNázov Lago Bin bol takto zachovaný ako súčasť identity miesta a zariadenia.",
      prodotti_title: 'Naše Produkty',
      prodotti_subtitle: 'Špeciality vlastnej výroby, dostupné na recepcii.',
      product_olio_desc: 'Extra panenský olivový olej vlastnej výroby.',
      product_limoncello_desc: 'Limoncello vlastnej výroby.',
      product_marmellata_desc: 'Domáci džem pripravený z vybraného ovocia, dostupný v rôznych druhoch podľa sezóny.',
      seasonal_badge: 'Sezónne druhy',
      seasonal_note: 'Dostupné druhy sa môžu meniť podľa sezóny a dostupnosti ovocia.',
      reception_tag: 'Dostupné na recepcii'
    },
    hr: {
      storia_title: 'Naša Priča',
      storia_subtitle: 'Obiteljska strast od 1956.',
      why_name_title: 'Zašto se zove "Lago Bin"?',
      storia_full_text: "Lago Bin nastao je iz obiteljske priče, strasti i gostoljubivosti čiji korijeni sežu u 1956. godinu.\n\nPrije nego što je postao današnji hotelski objekt, Lago Bin je bio poznat prije svega kao restoran, povezan s kuhinjom kraja i lokalnim tradicijama.\n\nTijekom godina objekt je rastao, postavši i hotel, ali zadržavajući vezu s vlastitom poviješću, obitelji i okusima doline Valle Argentina.\n\nKuhinja i dalje njeguje proizvode kraja i tradiciju koja se prenosi kroz vrijeme.\n\nLago Bin je danas mjesto gdje se gostoljubivost, kuhinja i tradicija susreću u srcu Rocchetta Nervina.",
      why_name_text: "Ime 'Lago Bin' povezano je s područjem Rocchetta Nervina.\n\nStari lokalni izvori zapravo spominju ime 'Lago Bin' u vezi s mjestom i vodenom površinom u tom kraju, već poznatom pod tim imenom prije nego što je nastao današnji objekt.\n\nIme Lago Bin tako je sačuvano kao dio identiteta mjesta i objekta.",
      prodotti_title: 'Naši Proizvodi',
      prodotti_subtitle: 'Specijaliteti vlastite proizvodnje, dostupni na recepciji.',
      product_olio_desc: 'Ekstra djevičansko maslinovo ulje vlastite proizvodnje.',
      product_limoncello_desc: 'Limoncello vlastite proizvodnje.',
      product_marmellata_desc: 'Domaći džem pripremljen od odabranog voća, dostupan u različitim vrstama ovisno o sezoni.',
      seasonal_badge: 'Sezonske vrste',
      seasonal_note: 'Dostupne vrste mogu se mijenjati ovisno o sezoni i dostupnosti voća.',
      reception_tag: 'Dostupno na recepciji'
    },
    sr: {
      storia_title: 'Наша Прича',
      storia_subtitle: 'Породична страст од 1956.',
      why_name_title: 'Зашто се зове „Lago Bin"?',
      storia_full_text: "Lago Bin је настао из породичне приче, страсти и гостопримства чији корени сежу у 1956. годину.\n\nПре него што је постао данашњи хотелски објекат, Lago Bin је био познат пре свега као ресторан, повезан са кухињом краја и локалним традицијама.\n\nТоком година објекат је растао, постајући и хотел, али задржавајући везу са сопственом историјом, породицом и укусима долине Valle Argentina.\n\nКухиња и даље негује производе краја и традицију која се преноси кроз време.\n\nLago Bin је данас место где се гостопримство, кухиња и традиција сусрећу у срцу Rocchetta Nervina.",
      why_name_text: "Име 'Lago Bin' повезано је са подручјем Rocchetta Nervina.\n\nСтари локални извори заправо помињу име 'Lago Bin' у вези са местом и водном површином у том крају, већ познатом под тим именом пре него што је настао данашњи објекат.\n\nИме Lago Bin је тако сачувано као део идентитета места и објекта.",
      prodotti_title: 'Наши Производи',
      prodotti_subtitle: 'Специјалитети сопствене производње, доступни на рецепцији.',
      product_olio_desc: 'Маслиново уље extra vergine сопствене производње.',
      product_limoncello_desc: 'Лимончело сопствене производње.',
      product_marmellata_desc: 'Домаћи џем припремљен од одабраног воћа, доступан у различитим врстама у зависности од сезоне.',
      seasonal_badge: 'Сезонске врсте',
      seasonal_note: 'Доступне врсте могу се мењати у зависности од сезоне и доступности воћа.',
      reception_tag: 'Доступно на рецепцији'
    },
    sl: {
      storia_title: 'Naša Zgodba',
      storia_subtitle: 'Družinska strast od leta 1956',
      why_name_title: 'Zakaj se imenuje "Lago Bin"?',
      storia_full_text: "Lago Bin je nastal iz družinske zgodbe, strasti in gostoljubnosti, katerih korenine segajo v leto 1956.\n\nPreden je postal današnji hotelski objekt, je bil Lago Bin znan predvsem kot restavracija, povezana s kuhinjo kraja in lokalnimi tradicijami.\n\nSkozi leta se je objekt razširil in postal tudi hotel, a je ohranil povezavo s svojo zgodovino, z družino in z okusi doline Valle Argentina.\n\nKuhinja še naprej ceni pridelke kraja in tradicijo, ki se prenaša skozi čas.\n\nLago Bin je danes kraj, kjer se gostoljubnost, kuhinja in tradicija srečujejo v srcu Rocchetta Nervina.",
      why_name_text: "Ime 'Lago Bin' je povezano z območjem Rocchetta Nervina.\n\nStari lokalni viri namreč omenjajo ime 'Lago Bin', ki se nanaša na kraj in vodno površino v tem območju, znano pod tem imenom že pred nastankom današnjega objekta.\n\nIme Lago Bin je bilo tako ohranjeno kot del identitete kraja in objekta.",
      prodotti_title: 'Naši Izdelki',
      prodotti_subtitle: 'Specialitete lastne pridelave, na voljo na recepciji.',
      product_olio_desc: 'Ekstra deviško oljčno olje lastne pridelave.',
      product_limoncello_desc: 'Limoncello lastne pridelave.',
      product_marmellata_desc: 'Domača marmelada, pripravljena iz izbranega sadja, na voljo v različnih vrstah glede na sezono.',
      seasonal_badge: 'Sezonske vrste',
      seasonal_note: 'Razpoložljive vrste se lahko spreminjajo glede na sezono in razpoložljivost sadja.',
      reception_tag: 'Na voljo na recepciji'
    },
    tr: {
      storia_title: 'Bizim Hikayemiz',
      storia_subtitle: "1956'dan beri aile tutkusu",
      why_name_title: 'Neden "Lago Bin" deniyor?',
      storia_full_text: "Lago Bin, kökleri 1956'ya uzanan bir aile hikayesinden, tutkudan ve misafirperverlikten doğmuştur.\n\nBugünkü otel yapısı haline gelmeden önce Lago Bin, öncelikle bölge mutfağına ve yerel geleneklere bağlı bir restoran olarak tanınıyordu.\n\nYıllar içinde tesis büyüyerek otele de dönüştü, ancak kendi tarihiyle, aileyle ve Valle Argentina vadisinin lezzetleriyle olan bağını korudu.\n\nMutfak, bölgenin ürünlerini ve zaman içinde aktarılan bir geleneği değerlendirmeye devam ediyor.\n\nLago Bin bugün, misafirperverliğin, mutfağın ve geleneğin Rocchetta Nervina'nın kalbinde buluştuğu bir yerdir.",
      why_name_text: "'Lago Bin' adı, Rocchetta Nervina bölgesiyle bağlantılıdır.\n\nEski yerel kaynaklar, bugünkü yapıdan önce de bu isimle bilinen bölgedeki bir yer ve su birikintisiyle ilgili olarak 'Lago Bin' adından bahsetmektedir.\n\nBu nedenle Lago Bin adı, yerin ve yapının kimliğinin bir parçası olarak korunmuştur.",
      prodotti_title: 'Ürünlerimiz',
      prodotti_subtitle: "Kendi üretimimiz olan özel ürünler, Resepsiyon'da mevcuttur.",
      product_olio_desc: 'Kendi üretimimiz sızma zeytinyağı.',
      product_limoncello_desc: 'Kendi üretimimiz limoncello.',
      product_marmellata_desc: 'Seçilmiş meyvelerle hazırlanan ev yapımı reçel, mevsime göre farklı çeşitlerde bulunur.',
      seasonal_badge: 'Mevsimlik çeşitler',
      seasonal_note: 'Mevcut çeşitler mevsime ve meyve bulunabilirliğine göre değişebilir.',
      reception_tag: 'Resepsiyonda mevcuttur'
    },
    ar: {
      storia_title: 'قصتنا',
      storia_subtitle: 'شغف عائلي منذ عام 1956',
      why_name_title: 'لماذا يُسمى "Lago Bin"؟',
      storia_full_text: "وُلِد Lago Bin من قصة عائلية وشغف وكرم ضيافة تعود جذورها إلى عام 1956.\n\nقبل أن يصبح المنشأة الفندقية الحالية، كان Lago Bin معروفًا في المقام الأول كمطعم، مرتبطًا بمطبخ المنطقة وتقاليدها المحلية.\n\nعلى مر السنين نمت المنشأة، لتصبح فندقًا أيضًا، مع الحفاظ على ارتباطها بتاريخها الخاص وبالعائلة وبنكهات وادي فالي أرجنتينا.\n\nلا يزال المطبخ يقدّر منتجات المنطقة وتقليدًا يُتوارث عبر الزمن.\n\nيُعد Lago Bin اليوم مكانًا تلتقي فيه الضيافة والمطبخ والتقاليد في قلب روكيتا نيرفينا.",
      why_name_text: "يرتبط اسم 'Lago Bin' بمنطقة روكيتا نيرفينا.\n\nفبالفعل، تذكر مصادر محلية قديمة اسم 'Lago Bin' في إشارة إلى مكان ومسطح مائي في المنطقة، كان معروفًا بهذا الاسم قبل المنشأة الحالية.\n\nوهكذا تم الحفاظ على اسم Lago Bin كجزء من هوية المكان والمنشأة.",
      prodotti_title: 'منتجاتنا',
      prodotti_subtitle: 'منتجات من إنتاجنا الخاص، متوفرة في الاستقبال.',
      product_olio_desc: 'زيت زيتون بكر ممتاز من إنتاجنا الخاص.',
      product_limoncello_desc: 'ليمونشيلو من إنتاجنا الخاص.',
      product_marmellata_desc: 'مربى منزلي محضر من فواكه مختارة، متوفر بأنواع مختلفة حسب الموسم.',
      seasonal_badge: 'أنواع موسمية',
      seasonal_note: 'قد تتغير الأنواع المتوفرة حسب الموسم وتوفر الفاكهة.',
      reception_tag: 'متوفر في الاستقبال'
    },
    'zh-CN': {
      storia_title: '我们的故事',
      storia_subtitle: '自1956年起的家族热情',
      why_name_title: '为什么叫"Lago Bin"？',
      storia_full_text: "Lago Bin 诞生于一段可追溯到1956年的家族历史、热情与好客传统。\n\n在成为如今的酒店建筑之前，Lago Bin 主要以餐厅闻名，与当地美食及传统紧密相连。\n\n多年来，这座建筑不断发展，也成为了一家酒店，但始终保持着与自身历史、家族以及阿根蒂纳山谷风味的联系。\n\n厨房至今仍然珍视本地食材，并延续着代代相传的传统。\n\n如今，Lago Bin 是一个让好客、美食与传统在罗凯塔·内尔维纳的中心相遇的地方。",
      why_name_text: "'Lago Bin' 这个名字与罗凯塔·内尔维纳地区有关。\n\n古老的当地资料确实提到了'Lago Bin'这一名称，指的是该地区的一个地点和一处水域，在如今的建筑出现之前就已以此名闻名。\n\n因此，Lago Bin 这个名字得以保留，成为这个地方及建筑身份的一部分。",
      prodotti_title: '我们的产品',
      prodotti_subtitle: '自家生产的特色产品，可在前台购买。',
      product_olio_desc: '自家生产的特级初榨橄榄油。',
      product_limoncello_desc: '自家生产的柠檬甜酒。',
      product_marmellata_desc: '选用精选水果自制的果酱，口味依季节而定。',
      seasonal_badge: '季节限定口味',
      seasonal_note: '可选口味可能因季节和水果供应情况而变化。',
      reception_tag: '可在前台购买'
    },
    ja: {
      storia_title: '私たちの物語',
      storia_subtitle: '1956年からの家族の情熱',
      why_name_title: 'なぜ「Lago Bin」と呼ばれるのか？',
      storia_full_text: "Lago Binは、1956年にルーツを持つ家族の物語、情熱、そしてもてなしの心から生まれました。\n\n現在のホテル施設になる前、Lago Binは主にレストランとして知られ、地域の料理と地元の伝統に結びついていました。\n\n長年にわたり施設は成長し、ホテルにもなりましたが、自らの歴史、家族、そしてヴァッレ・アルジェンティーナの味との結びつきは保たれています。\n\n厨房は今もなお、この地域の産物と、時を超えて受け継がれてきた伝統を大切にしています。\n\nLago Binは今日、もてなし、料理、伝統がロッケッタ・ネルヴィーナの中心で出会う場所です。",
      why_name_text: "「Lago Bin」という名前は、ロッケッタ・ネルヴィーナの土地に由来しています。\n\n実際、古い地元の資料には、現在の施設ができる以前からその名で知られていた、この地域のある場所と水域を指す「Lago Bin」という名前が記されています。\n\nこうして、Lago Binという名前は、この場所と施設のアイデンティティの一部として受け継がれてきました。",
      prodotti_title: '私たちの製品',
      prodotti_subtitle: '自家製の逸品、レセプションでお求めいただけます。',
      product_olio_desc: '自家製のエキストラバージンオリーブオイル。',
      product_limoncello_desc: '自家製のリモンチェッロ。',
      product_marmellata_desc: '厳選した果物で作った自家製ジャム。季節により種類が異なります。',
      seasonal_badge: '季節の味',
      seasonal_note: '取り扱う種類は季節や果物の入荷状況により変わることがあります。',
      reception_tag: 'レセプションでお求めいただけます'
    },
    ko: {
      storia_title: '우리의 이야기',
      storia_subtitle: '1956년부터 이어온 가족의 열정',
      why_name_title: '왜 "Lago Bin"이라고 부를까요?',
      storia_full_text: "Lago Bin은 1956년에 뿌리를 둔 가족의 이야기와 열정, 그리고 환대에서 시작되었습니다.\n\n지금의 호텔 시설이 되기 전, Lago Bin은 무엇보다 이 지역의 요리와 지역 전통에 뿌리를 둔 레스토랑으로 알려져 있었습니다.\n\n세월이 흐르면서 시설은 성장하여 호텔로도 발전했지만, 자신의 역사, 가족, 그리고 발레 아르젠티나 계곡의 맛과의 연결은 계속 유지되었습니다.\n\n주방은 지금도 이 지역의 식재료와 시간을 거쳐 전해 내려온 전통을 소중히 여기고 있습니다.\n\n오늘날 Lago Bin은 환대, 요리, 전통이 로케타 네르비나의 중심에서 만나는 장소입니다.",
      why_name_text: "'Lago Bin'이라는 이름은 로케타 네르비나 지역과 관련이 있습니다.\n\n실제로 오래된 지역 자료에는 'Lago Bin'이라는 이름이 지금의 시설이 생기기 전부터 이미 이 이름으로 알려져 있던 지역의 한 장소와 수역을 가리키며 언급되어 있습니다.\n\n이렇게 하여 Lago Bin이라는 이름은 이 장소와 시설의 정체성의 일부로 이어져 왔습니다.",
      prodotti_title: '저희 제품',
      prodotti_subtitle: '자체 생산한 특산품, 리셉션에서 구매 가능합니다.',
      product_olio_desc: '자체 생산한 엑스트라 버진 올리브 오일.',
      product_limoncello_desc: '자체 생산한 리몬첼로.',
      product_marmellata_desc: '엄선된 과일로 만든 수제 잼으로, 계절에 따라 다양한 종류로 제공됩니다.',
      seasonal_badge: '계절 한정 종류',
      seasonal_note: '제공되는 종류는 계절과 과일 수급 상황에 따라 달라질 수 있습니다.',
      reception_tag: '리셉션에서 구매 가능'
    },
    hi: {
      storia_title: 'हमारी कहानी',
      storia_subtitle: '1956 से पारिवारिक जुनून',
      why_name_title: 'इसे "Lago Bin" क्यों कहा जाता है?',
      storia_full_text: "Lago Bin की शुरुआत एक पारिवारिक कहानी, जुनून और आतिथ्य से हुई, जिसकी जड़ें 1956 तक जाती हैं।\n\nवर्तमान होटल संरचना बनने से पहले, Lago Bin मुख्य रूप से एक रेस्तरां के रूप में जाना जाता था, जो क्षेत्र के भोजन और स्थानीय परंपराओं से जुड़ा था।\n\nवर्षों के साथ यह संरचना बढ़ी और होटल भी बनी, लेकिन इसने अपने इतिहास, परिवार और वाले अर्जेंटीना घाटी के स्वादों के साथ अपना संबंध बनाए रखा।\n\nरसोई आज भी क्षेत्र की उपज और समय के साथ चली आ रही परंपरा को महत्व देती है।\n\nआज Lago Bin एक ऐसी जगह है जहाँ आतिथ्य, भोजन और परंपरा रोकेत्ता नेरविना के हृदय में मिलते हैं।",
      why_name_text: "'Lago Bin' नाम रोकेत्ता नेरविना क्षेत्र से जुड़ा है।\n\nपुराने स्थानीय स्रोत वास्तव में 'Lago Bin' नाम का उल्लेख करते हैं, जो इस क्षेत्र के एक स्थान और जल-क्षेत्र को दर्शाता है, जो वर्तमान संरचना से पहले भी इसी नाम से जाना जाता था।\n\nइस प्रकार Lago Bin नाम इस स्थान और संरचना की पहचान के हिस्से के रूप में बना रहा।",
      prodotti_title: 'हमारे उत्पाद',
      prodotti_subtitle: 'हमारे अपने उत्पादन की विशेषताएँ, रिसेप्शन पर उपलब्ध।',
      product_olio_desc: 'हमारे अपने उत्पादन का एक्स्ट्रा वर्जिन जैतून तेल।',
      product_limoncello_desc: 'हमारे अपने उत्पादन की लिमोनचेल्लो।',
      product_marmellata_desc: 'चुने हुए फलों से बना घर का जैम, मौसम के अनुसार विभिन्न किस्मों में उपलब्ध।',
      seasonal_badge: 'मौसमी किस्में',
      seasonal_note: 'उपलब्ध किस्में मौसम और फलों की उपलब्धता के अनुसार बदल सकती हैं।',
      reception_tag: 'रिसेप्शन पर उपलब्ध'
    },
    bn: {
      storia_title: 'আমাদের গল্প',
      storia_subtitle: '১৯৫৬ সাল থেকে পারিবারিক ভালোবাসা',
      why_name_title: 'কেন এর নাম "Lago Bin"?',
      storia_full_text: "Lago Bin একটি পারিবারিক গল্প, ভালোবাসা এবং আতিথেয়তা থেকে জন্ম নিয়েছে, যার শিকড় ১৯৫৬ সাল পর্যন্ত বিস্তৃত।\n\nবর্তমান হোটেল কাঠামো হওয়ার আগে, Lago Bin মূলত একটি রেস্তোরাঁ হিসেবে পরিচিত ছিল, যা এই অঞ্চলের রান্না ও স্থানীয় ঐতিহ্যের সাথে যুক্ত ছিল।\n\nবছরের পর বছর ধরে এই স্থাপনা বেড়ে উঠেছে, হোটেলেও পরিণত হয়েছে, তবে নিজের ইতিহাস, পরিবার এবং ভালে আর্জেন্তিনা উপত্যকার স্বাদের সাথে সম্পর্ক বজায় রেখেছে।\n\nরান্নাঘর আজও এই অঞ্চলের ফসল এবং সময়ের সাথে চলে আসা ঐতিহ্যকে মূল্য দিয়ে থাকে।\n\nআজ Lago Bin এমন এক জায়গা যেখানে আতিথেয়তা, রান্না এবং ঐতিহ্য রোকেত্তা নেরভিনার হৃদয়ে মিলিত হয়।",
      why_name_text: "'Lago Bin' নামটি রোকেত্তা নেরভিনা অঞ্চলের সাথে সম্পর্কিত।\n\nপুরনো স্থানীয় সূত্রগুলো আসলে 'Lago Bin' নামটির উল্লেখ করে, যা এই এলাকার একটি স্থান ও জলাশয়কে নির্দেশ করে, যা বর্তমান স্থাপনা তৈরি হওয়ার আগেও এই নামে পরিচিত ছিল।\n\nএভাবে Lago Bin নামটি এই স্থান ও স্থাপনার পরিচয়ের অংশ হিসেবে সংরক্ষিত হয়েছে।",
      prodotti_title: 'আমাদের পণ্য',
      prodotti_subtitle: 'আমাদের নিজস্ব উৎপাদনের বিশেষত্ব, রিসেপশনে পাওয়া যায়।',
      product_olio_desc: 'আমাদের নিজস্ব উৎপাদনের এক্সট্রা ভার্জিন অলিভ অয়েল।',
      product_limoncello_desc: 'আমাদের নিজস্ব উৎপাদনের লিমনচেল্লো।',
      product_marmellata_desc: 'নির্বাচিত ফল দিয়ে তৈরি ঘরোয়া জ্যাম, ঋতু অনুযায়ী বিভিন্ন ধরনের পাওয়া যায়।',
      seasonal_badge: 'মৌসুমি বৈচিত্র্য',
      seasonal_note: 'উপলব্ধ বৈচিত্র্য ঋতু এবং ফলের প্রাপ্যতার ওপর নির্ভর করে বদলাতে পারে।',
      reception_tag: 'রিসেপশনে পাওয়া যায়'
    },
    ur: {
      storia_title: 'ہماری کہانی',
      storia_subtitle: '1956 سے خاندانی جذبہ',
      why_name_title: 'اسے "Lago Bin" کیوں کہا جاتا ہے؟',
      storia_full_text: "Lago Bin ایک خاندانی کہانی، جذبے اور مہمان نوازی سے وجود میں آیا، جس کی جڑیں 1956 تک جاتی ہیں۔\n\nموجودہ ہوٹل کی عمارت بننے سے پہلے، Lago Bin بنیادی طور پر ایک ریستوران کے طور پر جانا جاتا تھا، جو علاقے کے کھانوں اور مقامی روایات سے جڑا ہوا تھا۔\n\nبرسوں کے دوران یہ عمارت بڑھی اور ہوٹل بھی بنی، لیکن اس نے اپنی تاریخ، خاندان اور ویلے آرجنتینا وادی کے ذائقوں سے اپنا تعلق برقرار رکھا۔\n\nباورچی خانہ آج بھی علاقے کی پیداوار اور وقت کے ساتھ چلی آنے والی روایت کو اہمیت دیتا ہے۔\n\nآج Lago Bin ایک ایسی جگہ ہے جہاں مہمان نوازی، کھانا اور روایت روکیتا نروینا کے قلب میں ملتے ہیں۔",
      why_name_text: "'Lago Bin' کا نام روکیتا نروینا کے علاقے سے جڑا ہوا ہے۔\n\nپرانے مقامی ذرائع دراصل 'Lago Bin' کے نام کا ذکر کرتے ہیں، جو اس علاقے کی ایک جگہ اور پانی کے ایک ذخیرے کی طرف اشارہ کرتا ہے، جو موجودہ عمارت سے پہلے بھی اسی نام سے جانا جاتا تھا۔\n\nاس طرح Lago Bin کا نام اس جگہ اور عمارت کی شناخت کے حصے کے طور پر محفوظ رکھا گیا۔",
      prodotti_title: 'ہماری مصنوعات',
      prodotti_subtitle: 'ہماری اپنی پیداوار کی خصوصیات، ریسیپشن پر دستیاب۔',
      product_olio_desc: 'ہماری اپنی پیداوار کا ایکسٹرا ورجن زیتون کا تیل۔',
      product_limoncello_desc: 'ہماری اپنی پیداوار کا لیمونچیلو۔',
      product_marmellata_desc: 'منتخب پھلوں سے بنا گھریلو جیم، موسم کے مطابق مختلف اقسام میں دستیاب۔',
      seasonal_badge: 'موسمی اقسام',
      seasonal_note: 'دستیاب اقسام موسم اور پھلوں کی دستیابی کے مطابق تبدیل ہو سکتی ہیں۔',
      reception_tag: 'ریسیپشن پر دستیاب'
    },
    fa: {
      storia_title: 'داستان ما',
      storia_subtitle: 'اشتیاق خانوادگی از سال 1956',
      why_name_title: 'چرا نامش "Lago Bin" است؟',
      storia_full_text: "Lago Bin از یک داستان خانوادگی، اشتیاق و مهمان‌نوازی زاده شده که ریشه‌های آن به سال ۱۹۵۶ بازمی‌گردد.\n\nپیش از آنکه به مجموعه هتلی امروزی تبدیل شود، Lago Bin بیشتر به‌عنوان یک رستوران شناخته می‌شد که با آشپزی منطقه و سنت‌های محلی پیوند داشت.\n\nبا گذشت سال‌ها این مجموعه رشد کرد و به هتل نیز تبدیل شد، اما پیوند خود را با تاریخ، خانواده و طعم‌های دره واله آرجنتینا حفظ کرد.\n\nآشپزخانه همچنان به محصولات منطقه و سنتی که در طول زمان منتقل شده ارزش می‌دهد.\n\nLago Bin امروز مکانی است که در آن مهمان‌نوازی، آشپزی و سنت در قلب روکتا نروینا به هم می‌رسند.",
      why_name_text: "نام «Lago Bin» به منطقه روکتا نروینا مرتبط است.\n\nمنابع محلی قدیمی در واقع به نام «Lago Bin» اشاره می‌کنند که مربوط به مکانی و سطح آبی در این منطقه است که پیش از وجود مجموعه امروزی نیز با همین نام شناخته می‌شد.\n\nبدین ترتیب نام Lago Bin به‌عنوان بخشی از هویت این مکان و مجموعه حفظ شده است.",
      prodotti_title: 'محصولات ما',
      prodotti_subtitle: 'محصولات تولید خودمان، در پذیرش موجود است.',
      product_olio_desc: 'روغن زیتون فرابکر تولید خودمان.',
      product_limoncello_desc: 'لیموانچلو تولید خودمان.',
      product_marmellata_desc: 'مربای خانگی تهیه شده از میوه‌های منتخب، بسته به فصل در انواع مختلف موجود است.',
      seasonal_badge: 'انواع فصلی',
      seasonal_note: 'انواع موجود ممکن است بسته به فصل و در دسترس بودن میوه تغییر کند.',
      reception_tag: 'در پذیرش موجود است'
    },
    vi: {
      storia_title: 'Câu Chuyện Của Chúng Tôi',
      storia_subtitle: 'Đam mê gia đình từ năm 1956',
      why_name_title: 'Tại sao gọi là "Lago Bin"?',
      storia_full_text: "Lago Bin ra đời từ câu chuyện gia đình, niềm đam mê và lòng hiếu khách có nguồn gốc từ năm 1956.\n\nTrước khi trở thành cơ sở khách sạn như hiện nay, Lago Bin được biết đến chủ yếu như một nhà hàng, gắn liền với ẩm thực vùng và các truyền thống địa phương.\n\nQua nhiều năm, cơ sở đã phát triển, cũng trở thành khách sạn, nhưng vẫn giữ mối liên kết với lịch sử của mình, với gia đình và với hương vị của thung lũng Valle Argentina.\n\nNhà bếp tiếp tục tôn vinh các sản vật của vùng và một truyền thống được lưu truyền qua thời gian.\n\nNgày nay, Lago Bin là nơi lòng hiếu khách, ẩm thực và truyền thống gặp nhau tại trái tim của Rocchetta Nervina.",
      why_name_text: "Tên gọi 'Lago Bin' gắn liền với vùng đất Rocchetta Nervina.\n\nCác nguồn tư liệu địa phương cổ xưa thực sự đề cập đến tên 'Lago Bin' để chỉ một địa điểm và một mặt nước trong khu vực, đã được biết đến với tên này trước cả khi cơ sở hiện nay ra đời.\n\nVì vậy, tên gọi Lago Bin đã được giữ lại như một phần bản sắc của nơi này và cơ sở.",
      prodotti_title: 'Sản Phẩm Của Chúng Tôi',
      prodotti_subtitle: 'Đặc sản tự sản xuất, có bán tại Lễ tân.',
      product_olio_desc: 'Dầu ô liu extra vergine tự sản xuất.',
      product_limoncello_desc: 'Limoncello tự sản xuất.',
      product_marmellata_desc: 'Mứt tự làm từ trái cây chọn lọc, có nhiều loại khác nhau tùy theo mùa.',
      seasonal_badge: 'Loại theo mùa',
      seasonal_note: 'Các loại có sẵn có thể thay đổi tùy theo mùa và nguồn trái cây.',
      reception_tag: 'Có bán tại Lễ tân'
    },
    th: {
      storia_title: 'เรื่องราวของเรา',
      storia_subtitle: 'ความหลงใหลของครอบครัวตั้งแต่ปี 1956',
      why_name_title: 'ทำไมถึงชื่อ "Lago Bin"?',
      storia_full_text: "Lago Bin ถือกำเนิดจากเรื่องราวของครอบครัว ความหลงใหล และการต้อนรับที่มีรากฐานมาตั้งแต่ปี 1956\n\nก่อนที่จะกลายเป็นอาคารโรงแรมในปัจจุบัน Lago Bin เป็นที่รู้จักกันดีในฐานะร้านอาหาร ซึ่งผูกพันกับอาหารประจำถิ่นและประเพณีท้องถิ่น\n\nตลอดหลายปีที่ผ่านมา สถานที่แห่งนี้ได้เติบโตขึ้น กลายเป็นโรงแรมด้วยเช่นกัน แต่ยังคงรักษาความผูกพันกับประวัติศาสตร์ของตนเอง กับครอบครัว และกับรสชาติของหุบเขาวัลเล อาร์เจนตินา\n\nครัวยังคงให้ความสำคัญกับผลผลิตในท้องถิ่นและประเพณีที่สืบทอดกันมาตามกาลเวลา\n\nปัจจุบัน Lago Bin เป็นสถานที่ที่การต้อนรับ อาหาร และประเพณีมาบรรจบกัน ณ ใจกลางของรอกเก็ตตา แนร์วีนา",
      why_name_text: "ชื่อ 'Lago Bin' เกี่ยวข้องกับพื้นที่รอกเก็ตตา แนร์วีนา\n\nแหล่งข้อมูลท้องถิ่นเก่าแก่ได้กล่าวถึงชื่อ 'Lago Bin' ซึ่งหมายถึงสถานที่และแหล่งน้ำแห่งหนึ่งในพื้นที่นี้ ซึ่งเป็นที่รู้จักในชื่อนี้มาก่อนที่จะมีอาคารในปัจจุบัน\n\nดังนั้นชื่อ Lago Bin จึงได้รับการรักษาไว้ในฐานะส่วนหนึ่งของอัตลักษณ์ของสถานที่และอาคารแห่งนี้",
      prodotti_title: 'ผลิตภัณฑ์ของเรา',
      prodotti_subtitle: 'ผลิตภัณฑ์ที่เราผลิตเอง มีจำหน่ายที่แผนกต้อนรับ',
      product_olio_desc: 'น้ำมันมะกอกเอ็กซ์ตร้าเวอร์จินที่เราผลิตเอง',
      product_limoncello_desc: 'ลิมอนเชลโลที่เราผลิตเอง',
      product_marmellata_desc: 'แยมโฮมเมดทำจากผลไม้คัดสรร มีหลายรสชาติตามฤดูกาล',
      seasonal_badge: 'รสชาติตามฤดูกาล',
      seasonal_note: 'รสชาติที่มีอาจเปลี่ยนแปลงตามฤดูกาลและผลผลิตผลไม้',
      reception_tag: 'มีจำหน่ายที่แผนกต้อนรับ'
    }
  };

  var mergedCount = 0;
  Object.keys(SP_PATCH).forEach(function (lang) {
    if (!window.I18N_PATCH[lang]) window.I18N_PATCH[lang] = {};
    Object.keys(SP_PATCH[lang]).forEach(function (key) {
      window.I18N_PATCH[lang][key] = SP_PATCH[lang][key];
      mergedCount++;
    });
  });
  console.log('[storia_prodotti_i18n_patch] Merged ' + mergedCount + ' Storia/Prodotti keys (including full story text) across ' + Object.keys(SP_PATCH).length + ' languages into window.I18N_PATCH.');
})();
