const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
const whatsappNumber = "393495591277";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
let lastFocusedElement = null;

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const resetInitialHeroScroll = () => {
  const hash = window.location.hash;
  const isMobileViewport = window.matchMedia?.("(max-width: 760px)")?.matches ?? window.innerWidth <= 760;
  if (hash && hash !== "#top") {
    if (!isMobileViewport) return;
    window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const scheduleInitialHeroScrollReset = () => {
  resetInitialHeroScroll();
  window.requestAnimationFrame(resetInitialHeroScroll);
  window.setTimeout(resetInitialHeroScroll, 80);
  window.setTimeout(resetInitialHeroScroll, 260);
};

scheduleInitialHeroScrollReset();
window.addEventListener("pageshow", scheduleInitialHeroScrollReset);
window.addEventListener("load", scheduleInitialHeroScrollReset, { once: true });

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.restaurant": "Ristorante",
    "nav.location": "Location",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.menu": "Scopri il nostro menù",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "card.food": "Menù",
    "card.wine": "Carta dei Vini",
    "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. La carta può variare secondo stagione e disponibilità.",
    "card.wineNote": "Etichette e annate possono variare secondo disponibilità. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Bistrot - Ristorante",
    "hero.hours": "<span>Pranzo, cena &amp; convivialità</span> Cucina ligure · pasta fresca · pesce",
    "hero.edge": "Cucina ligure & pasta fresca",
    "hero.discover": "Scopri Tosca Bistrot",
    "restaurant.kicker": "01 · La nostra cucina",
    "restaurant.copy1": "Pasta fatta in casa, specialità di mare e sapori liguri in un bistrot intimo nel cuore di Monterosso.",
    "restaurant.copy2": "Una tavola familiare, pochi tavoli e piatti preparati con ingredienti freschi e stagionali.",
    "restaurant.mobileCopy": "Pasta fresca, pesce e sapori liguri nel cuore di Monterosso.",
    "food.catch": "Il piatto di casa",
    "food.gnocchi": "Gli gnocchi al pesto",
    "food.seafood": "Gli gnocchi con scampo",
    "food.pasta": "Il polpo",
    "food.ligurian": "Il pescato",
    "food.wine": "Il tiramisù",
    "location.kicker": "02 · A Monterosso",
    "location.copy1": "Via Roma 34, a pochi passi dal ritmo luminoso di Monterosso al Mare.",
    "location.copy2": "Sala, tavoli all'aperto e atmosfera informale per una sosta di gusto nelle Cinque Terre.",
    "location.front": "L'ingresso",
    "location.exterior": "La sala",
    "location.outdoor": "Il dehors",
    "location.room": "La sala",
    "location.table": "La cantina",
    "location.details": "Il borgo",
    "reviews.kicker": "03 · Recensioni",
    "reviews.title": "Cosa dicono di noi",
    "reviews.awards": "Canali recensioni",
    "reviews.cardLabel1": "Cucina",
    "reviews.cardLabel2": "Accoglienza",
    "reviews.cardLabel3": "Cinque Terre",
    "reviews.quote1": "Pasta fresca, pesce e piatti liguri pensati per una pausa intima a Monterosso.",
    "reviews.author1": "Tosca Bistrot · Ristorante",
    "reviews.quote2": "Accoglienza familiare, pochi tavoli e dettagli curati dal pranzo alla cena.",
    "reviews.author2": "Monterosso al Mare · SP",
    "reviews.quote3": "Una tappa autentica tra vicoli, mare e profumi della Riviera ligure.",
    "reviews.author3": "Via Roma 34",
    "reviews.read": "Leggi le recensioni",
    "reviews.leave": "Lascia una recensione",
    "contacts.kicker": "04 · Contatti",
    "contacts.title": "Contatti",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Da marzo a ottobre<br>pranzo e cena",
    "contacts.phone": "Telefono",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Apri su Google Maps",
    "footer.tagline": "Tosca in cucina,<br>l'anima delle Cinque Terre.",
    "footer.top": "Torna su",
    "form.kicker": "Scrivici su WhatsApp",
    "form.title": "Raccontaci<br><em>cosa desideri.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio e apriremo direttamente la chat WhatsApp con Tosca Bistrot.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.time": "Orario",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito.",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "In case of allergies or intolerances, please inform our staff before ordering. The menu may vary according to season and availability.",
    "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
    "hero.overline": "Bistro - Restaurant",
    "hero.hours": "<span>Lunch, dinner &amp; conviviality</span> Ligurian cuisine · fresh pasta · seafood",
    "hero.edge": "Ligurian cuisine & fresh pasta",
    "hero.discover": "Discover Tosca Bistrot",
    "restaurant.kicker": "01 · Our cuisine",
    "restaurant.copy1": "Homemade pasta, seafood specialities and Ligurian flavours in an intimate bistro in the heart of Monterosso.",
    "restaurant.copy2": "A family table, a handful of seats and dishes prepared with fresh seasonal ingredients.",
    "restaurant.mobileCopy": "Fresh pasta, seafood and Ligurian flavours in the heart of Monterosso.",
    "food.catch": "House plate",
    "food.gnocchi": "Gnocchi with pesto",
    "food.seafood": "Gnocchi with scampi",
    "food.pasta": "Octopus",
    "food.ligurian": "Catch of the day",
    "food.wine": "Tiramisu",
    "location.kicker": "02 · In Monterosso",
    "location.copy1": "Via Roma 34, close to the bright rhythm of Monterosso al Mare.",
    "location.copy2": "Dining room, outdoor tables and an informal mood for a tasteful stop in the Cinque Terre.",
    "location.front": "The entrance",
    "location.exterior": "The dining room",
    "location.outdoor": "The outdoor tables",
    "location.room": "The dining room",
    "location.table": "The cellar",
    "location.details": "The village",
    "reviews.kicker": "03 · Reviews",
    "reviews.title": "What guests say",
    "reviews.awards": "Review channels",
    "reviews.cardLabel1": "Cuisine",
    "reviews.cardLabel2": "Hospitality",
    "reviews.cardLabel3": "Cinque Terre",
    "reviews.quote1": "Fresh pasta, seafood and Ligurian dishes for an intimate stop in Monterosso.",
    "reviews.author1": "Tosca Bistrot · Restaurant",
    "reviews.quote2": "Family hospitality, a handful of tables and thoughtful details from lunch to dinner.",
    "reviews.author2": "Monterosso al Mare · SP",
    "reviews.quote3": "An authentic stop among narrow streets, the sea and the scents of the Ligurian Riviera.",
    "reviews.author3": "Via Roma 34",
    "reviews.read": "Read reviews",
    "reviews.leave": "Leave a review",
    "contacts.kicker": "04 · Contacts",
    "contacts.title": "Contacts",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "March to October<br>lunch and dinner",
    "contacts.phone": "Phone",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Monterosso al Mare · Cinque Terre",
    "contacts.openMap": "Open in Google Maps",
    "footer.tagline": "Tosca in the kitchen,<br>the soul of the Cinque Terre.",
    "footer.top": "Back to top",
    "form.kicker": "Message us on WhatsApp",
    "form.title": "Tell us<br><em>what you need.</em>",
    "form.intro": "Complete the fields: we will prepare your message and open a direct WhatsApp chat with Tosca Bistrot.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website.",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "Tosca · Piatti fatti in casa",
        title: "Piatti fatti<br><em>in casa.</em>",
        description: "Nel cuore delle Cinque Terre, Tosca propone una cucina italiana autentica ispirata alla tradizione ligure: pasta fresca preparata a mano, ingredienti locali, pesce e dolci artigianali.",
      },
      en: {
        kicker: "Tosca · Homemade dishes",
        title: "Homemade<br><em>dishes.</em>",
        description: "In the heart of the Cinque Terre, Tosca offers authentic Italian cuisine inspired by Ligurian tradition: handmade fresh pasta, local ingredients, seafood and homemade desserts.",
      },
    },
    sections: [
      {
        it: "Antipasti", en: "Starters",
        items: [
          { it: "Tris di acciughe", en: "Anchovy trio", subIt: "Acciughe marinate, salate, in carpione", subEn: "Marinated, salted and carpione anchovies", price: "€17" },
          { it: "Polpo e patate", en: "Octopus and potatoes", subIt: "Polpo, patate, olive taggiasche, pomodorini, emulsione al prezzemolo", subEn: "Octopus, potatoes, Taggiasca olives, cherry tomatoes, parsley emulsion", price: "€19" },
          { it: "Baccalà mantecato", en: "Creamed salt cod", subIt: "Quenelle di baccalà mantecato, sfoglia di pane croccante, pomodorini confit", subEn: "Creamed salt cod quenelle, crisp bread wafer, confit cherry tomatoes", price: "€17" },
          { it: "Muscoli alla marinara", en: "Mussels marinara", subIt: "Cozze del golfo di La Spezia alla marinara", subEn: "Mussels from the Gulf of La Spezia cooked marinara-style", price: "€18" },
          { it: "Caprese di burrata", en: "Burrata caprese", subIt: "Burrata, pomodori freschi, pesto fatto in casa", subEn: "Burrata, fresh tomatoes, homemade pesto", price: "€17" },
        ],
      },
      {
        it: "Pasta fatta in casa", en: "Homemade pasta",
        items: [
          { it: "Trenette acciughe, burro e limone", en: "Trenette with anchovies, butter and lemon", price: "€18" },
          { it: "Gnocchi fatti a mano con calamari, pomodorini, capperi e peperoncino", en: "Handmade gnocchi with squid, cherry tomatoes, capers and chilli", price: "€21" },
          { it: "Spaghetti allo scoglio", en: "Seafood spaghetti", price: "€22" },
          { it: "Spaghetti cacio e pepe con tartare di gamberi", en: "Cacio e pepe spaghetti with prawn tartare", price: "€22" },
          { it: "Trenette alle vongole veraci", en: "Trenette with clams", price: "€22" },
          { it: "Trenette al pesto", en: "Trenette with pesto", price: "€17" },
          { it: "Spaghetti al ragù", en: "Spaghetti with ragù", price: "€17" },
        ],
      },
      {
        it: "Secondi piatti", en: "Main courses",
        items: [
          { it: "Filetto di pesce del giorno alla ligure", en: "Ligurian-style fish fillet of the day", price: "€27" },
          { it: "Baccalà con crema di ceci e pomodori secchi", en: "Salt cod with chickpea cream and sun-dried tomatoes", price: "€25" },
          { it: "Polpo croccante, burrata, pomodori confit", en: "Crispy octopus, burrata, confit tomatoes", price: "€27" },
          { it: "Calamaro scottato, guanciale croccante, crema di piselli", en: "Seared squid, crispy guanciale, pea cream", price: "€25" },
          { it: "Vitello tonnato", en: "Veal with tuna sauce", price: "€24" },
          { it: "Parmigiana di melanzane", en: "Aubergine parmigiana", price: "€18" },
        ],
      },
      {
        it: "Contorni", en: "Side dishes",
        items: [
          { it: "Patate, fagiolini, pesto", en: "Potatoes, green beans, pesto", price: "€9" },
          { it: "Insalata mista con pomodorini e carote", en: "Mixed salad with cherry tomatoes and carrots", price: "€8" },
          { it: "Patate arrosto", en: "Roast potatoes", price: "€8" },
          { it: "Verdure grigliate", en: "Grilled vegetables", price: "€9" },
        ],
      },
      {
        it: "Le dolcezze di Tosca", en: "Tosca desserts",
        items: [
          { it: "Delizia al limone", en: "Lemon delight", subIt: "Ganache al limone e cioccolato bianco con ricotta e mandorle sabbiate", subEn: "Lemon and white chocolate ganache with ricotta and sugared almonds", price: "€10" },
          { it: "Pinolata ligure", en: "Ligurian pine-nut tart", subIt: "Crostata tipica con pinoli, mandorle e meringa", subEn: "Traditional tart with pine nuts, almonds and meringue", price: "€11" },
          { it: "Tiramisù di Tosca", en: "Tosca tiramisu", price: "€10" },
          { it: "Cremoso al pistacchio con frutti di bosco", en: "Pistachio cream with berries", price: "€11" },
          { it: "Panna cotta al cioccolato", en: "Chocolate panna cotta", price: "€9" },
          { it: "Sciacchetrà con biscottini della casa", en: "Sciacchetrà with house biscuits", price: "€12" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: {
        kicker: "Tosca Bistrot · La cantina",
        title: "Carta<br><em>dei Vini.</em>",
        description: "La carta dei vini valorizza i produttori locali delle Cinque Terre ed è completata da piccole aziende familiari delle regioni italiane vicine.",
      },
      en: {
        kicker: "Tosca Bistrot · The cellar",
        title: "Wine<br><em>list.</em>",
        description: "The wine list highlights local Cinque Terre producers and is completed by small family wineries from nearby Italian regions.",
      },
    },
    sections: [
      {
        it: "Cinque Terre", en: "Cinque Terre",
        items: [
          { it: "Produttori locali e vini del territorio", en: "Local producers and wines from the area" },
          { it: "Etichette autentiche legate alla costa ligure", en: "Authentic labels connected to the Ligurian coast" },
          { it: "Bianchi minerali per pasta fresca e pesce", en: "Mineral whites for fresh pasta and seafood" },
        ],
      },
      {
        it: "Piccole aziende", en: "Small wineries",
        items: [
          { it: "Selezione di cantine familiari italiane", en: "Selection of Italian family wineries" },
          { it: "Etichette delle regioni vicine", en: "Labels from nearby regions" },
          { it: "Vini gastronomici scelti per il menù", en: "Food-friendly wines chosen for the menu" },
        ],
      },
      {
        it: "Fine pasto", en: "After dinner",
        items: [
          { it: "Sciacchetrà e vini dolci secondo disponibilità", en: "Sciacchetrà and dessert wines according to availability" },
          { it: "Amari e distillati", en: "Bitters and spirits" },
          { it: "Chiedi il suggerimento del giorno", en: "Ask for today's recommendation" },
        ],
      },
    ],
  },
};

let currentLanguage = "it";

const getFocusableElements = (container) => {
  if (!container) return [];
  return [...container.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
};

const setBackgroundInert = (inert) => {
  backgroundRegions.forEach((region) => {
    if (inert) region.setAttribute("inert", "");
    else region.removeAttribute("inert");
  });
};

const trapFocus = (event, container) => {
  if (event.key !== "Tab") return;
  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    event.preventDefault();
    container?.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const setMenu = (open, restoreFocus = true) => {
  const wasOpen = body.classList.contains("menu-open");
  if (open && !wasOpen) lastFocusedElement = document.activeElement;
  body.classList.toggle("menu-open", open);
  mobileMenu?.classList.toggle("is-open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menù" : "Apri il menù");
  setBackgroundInert(open);

  if (open) {
    window.setTimeout(() => (getFocusableElements(mobileMenuPanel)[0] || mobileMenuPanel)?.focus(), 260);
  } else if (wasOpen && restoreFocus) {
    lastFocusedElement?.focus();
  }
};

menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const mobileStickyBook = document.querySelector(".mobile-sticky-book");
const stickyBookSections = [
  { element: document.querySelector("#top"), theme: "dark" },
  { element: document.querySelector("#ristorante"), theme: "dark" },
  { element: document.querySelector("#location"), theme: "light" },
  { element: document.querySelector("#recensioni"), theme: "light" },
  { element: document.querySelector("#contatti"), theme: "light" },
  { element: document.querySelector(".site-footer"), theme: "dark" },
].filter(({ element }) => element);

const setStickyBookTheme = (theme) => {
  if (!mobileStickyBook) return;
  const isOnLight = theme === "light";
  mobileStickyBook.classList.toggle("is-on-light", isOnLight);
  mobileStickyBook.classList.toggle("is-on-dark", !isOnLight);
};

const updateStickyBookTheme = () => {
  if (!stickyBookSections.length) return;
  const footerSection = stickyBookSections.find(({ element }) => element.matches(".site-footer"));
  const footerRect = footerSection?.element.getBoundingClientRect();
  if (footerRect && footerRect.top <= window.innerHeight * 0.72 && footerRect.bottom > 0) {
    setStickyBookTheme("dark");
    return;
  }

  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
  if (isAtPageEnd) {
    setStickyBookTheme("dark");
    return;
  }

  const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
  const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
  const activeSection = stickyBookSections.find(({ element }) => element.contains(sampleElement))
    || stickyBookSections.reduce((current, section) => {
      const rect = section.element.getBoundingClientRect();
      const distance = Math.abs(rect.top - sampleY);
      return distance < current.distance ? { section, distance } : current;
    }, { section: stickyBookSections[0], distance: Number.POSITIVE_INFINITY }).section;

  setStickyBookTheme(activeSection.theme);
};

if (mobileStickyBook) {
  setStickyBookTheme("dark");
  updateStickyBookTheme();
  window.addEventListener("scroll", updateStickyBookTheme, { passive: true });
  window.addEventListener("resize", updateStickyBookTheme);
}

const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
  const track = document.querySelector(trackSelector);
  const cards = [...document.querySelectorAll(cardSelector)];
  const current = document.querySelector(currentSelector);
  const previous = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  if (!track || !cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const updateCounter = () => {
    if (!current) return;
    const cardStep = step();
    const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
    current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
  };

  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateCounter, { passive: true });
};

setupCarousel({
  trackSelector: "[data-food-track]",
  cardSelector: ".food-card",
  currentSelector: "[data-food-current]",
  prevSelector: "[data-food-prev]",
  nextSelector: "[data-food-next]",
});

setupCarousel({
  trackSelector: "[data-location-track]",
  cardSelector: ".location-card",
  currentSelector: "[data-location-current]",
  prevSelector: "[data-location-prev]",
  nextSelector: "[data-location-next]",
});

const cardModal = document.querySelector("[data-card-modal]");
const cardDialog = cardModal?.querySelector(".card-dialog");
const cardBody = cardModal?.querySelector(".card-body");
const cardContent = cardModal?.querySelector("[data-card-content]");
const cardKicker = cardModal?.querySelector("[data-card-kicker]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
const cardDescription = cardModal?.querySelector("[data-card-description]");
const catalogNote = cardModal?.querySelector(".catalog-note");
let activeCardType = "food";
let cardCloseTimer;

const renderCatalog = () => {
  if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = catalog.sections.map((section) => `
    <section class="catalog-section">
      <h3>${section[currentLanguage]}<small>${section[currentLanguage === "it" ? "en" : "it"]}</small></h3>
      <div class="catalog-items">
        ${section.items.map((item) => `
          <article class="catalog-item">
            <div>
              <h4>${item[currentLanguage] || item.it}</h4>
              ${(() => {
                const alternateLanguage = currentLanguage === "it" ? "en" : "it";
                const itemDescription = item[currentLanguage === "it" ? "subIt" : "subEn"] || item.sub || item[alternateLanguage];
                return itemDescription ? `<p>${itemDescription}</p>` : "";
              })()}
            </div>
            ${item.price ? `<span>${item.price}</span>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
};

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "it";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderCatalog();
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const setCardType = (type) => {
  activeCardType = menuCatalogs[type] ? type : "food";
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    const active = button.dataset.cardTab === activeCardType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
  if (cardBody) cardBody.scrollTop = 0;
};

const openCardModal = (type, trigger) => {
  if (!cardModal || !cardDialog) return;
  window.clearTimeout(cardCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setCardType(type);
  cardModal.hidden = false;
  cardModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    cardModal.classList.add("is-open");
    window.setTimeout(() => cardModal.querySelector("[data-card-close]")?.focus(), 260);
  });
};

const closeCardModal = () => {
  if (!cardModal || cardModal.hidden) return;
  cardModal.classList.remove("is-open");
  cardModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  cardCloseTimer = window.setTimeout(() => {
    cardModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCardModal(trigger.dataset.cardTrigger, trigger);
  });
});

cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
  button.addEventListener("click", () => setCardType(button.dataset.cardTab));
});

const bookingModal = document.querySelector("[data-booking-modal]");
const bookingDialog = bookingModal?.querySelector(".booking-dialog");
const bookingForm = bookingModal?.querySelector("[data-contact-form]");
const contextInput = bookingForm?.querySelector("input[name='context']");
const dateInput = bookingForm?.querySelector("input[name='date']");
let closeModalTimer;

if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(closeModalTimer);
  lastFocusedElement = trigger;
  if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
  setMenu(false, false);
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => bookingModal.classList.add("is-open"));
  window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeBookingModal = () => {
  if (!bookingModal || bookingModal.hidden) return;
  bookingModal.classList.remove("is-open");
  bookingModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  closeModalTimer = window.setTimeout(() => {
    bookingModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

document.addEventListener("keydown", (event) => {
  if (bookingModal?.classList.contains("is-open")) trapFocus(event, bookingDialog);
  else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
  else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else setMenu(false);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const guests = String(data.get("guests") || "").trim();
  const note = String(data.get("message") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const details = isEnglish
    ? [
        guests ? `for ${guests} ${guests === "1" ? "person" : "people"}` : "",
        formattedDate ? `on ${formattedDate}` : "",
        time ? `at ${time}` : "",
      ].filter(Boolean).join(" ")
    : [
        guests ? `per ${guests} ${guests === "1" ? "persona" : "persone"}` : "",
        formattedDate ? `per il giorno ${formattedDate}` : "",
        time ? `alle ${time}` : "",
      ].filter(Boolean).join(" ");

  const message = isEnglish
    ? [
        `Hello Tosca Bistrot, my name is ${name} and I would like to book a table${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("")
    : [
        `Ciao Tosca Bistrot, sono ${name} e vorrei prenotare un tavolo${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const heroTitle = document.querySelector(".hero-title-wrap");
const heroSocials = document.querySelector(".hero-socials");
const scrollCue = document.querySelector(".scroll-cue");
let heroMotionFrame = null;

const updateHeroMotion = () => {
  heroMotionFrame = null;
  if (!hero || !heroImage || !heroTitle || reduceMotion) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

  if (progress < 0.002) {
    heroImage.style.removeProperty("transform");
    heroTitle.style.removeProperty("transform");
    heroTitle.style.removeProperty("opacity");
    heroSocials?.style.removeProperty("opacity");
    scrollCue?.style.removeProperty("opacity");
    return;
  }

  heroImage.style.transform = `translate3d(0, ${progress * 7}%, 0) scale(${1 + progress * 0.12})`;
  heroTitle.style.transform = `translate3d(0, ${progress * -11}vh, 0) scale(${1 - progress * 0.045})`;
  heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
  if (heroSocials) heroSocials.style.opacity = String(Math.max(0, 1 - progress * 1.7));
  if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2.1));
};

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (heroMotionFrame !== null) return;
    heroMotionFrame = requestAnimationFrame(updateHeroMotion);
  }, { passive: true });
}

const reveals = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}

applyLanguage("it");
renderCatalog();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
