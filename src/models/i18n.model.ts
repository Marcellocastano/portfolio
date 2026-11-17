/**
 * Testi in italiano utilizzati nel portfolio.
 * Le chiavi e le funzioni restano compatibili con le view esistenti.
 */

const i18n = {
  nav: {
    homeAria: (fullName: string) => `${fullName}, home`,
    primaryAria: 'Principale',
    menuOpen: 'Menu',
    menuClose: 'Chiudi',
    links: [
      { label: 'Chi sono', href: '#chi-sono' },
      { label: 'Progetti', href: '#progetti' },
      { label: 'Stack', href: '#stack' },
      { label: 'Contatti', href: '#contatti' },
    ],
    themeToggle: { toLight: 'Attiva tema chiaro', toDark: 'Attiva tema scuro' },
  },
  hero: {
    role: 'Full-Stack Developer',
    headline: 'Sviluppo applicazioni web.',
    // headlineAccent: 'E continuo a imparare.',
    intro:
      "Lavoro come full-stack developer dal 2018. Qui trovi un po' del mio percorso e i progetti a cui lavoro nel tempo libero.",
    titleAria: (fullName: string, role: string) => `${fullName}, ${role}`,
    ctaProjects: 'Vedi i progetti',
    ctaContact: 'Scrivimi',
  },

  /** Mondo in miniatura dell'hero: descrizione e suggerimenti sugli oggetti interattivi. */
  world: {
    aria: (firstName: string) =>
      `La piccola izakaya-studio di ${firstName}: un locale giapponese di notte, con lanterne, noren, un distributore automatico e un ciliegio in fiore. Scorrendo, la casa ruota e la facciata si apre sullo studio, dove ${firstName} lavora alla scrivania e Olivia, la sua cagnolina, dorme arrotolata nella cuccia.`,
    openProject: (name: string) => `Apri ${name}`,
    lightOff: 'Spegni la luce',
    lightOn: 'Accendi la luce',
    dog: 'Lei è Olivia',
  },
  about: {
    title: (firstName: string) => `Ciao, sono ${firstName}`,
    bio: [
      "Ho iniziato a lavorare come sviluppatore nel 2018, con WordPress e PHP. Poco dopo sono entrato in 4Dem, che in seguito è diventata Positive, e ci sono rimasto circa sei anni. Lì ho messo le mani un po' su tutto: Vue, Node.js e Laravel, il passaggio ai microservizi, lo shop con Stripe e un design system partito da zero.",
      'Da dicembre 2024 sono in digit, dove sviluppo applicazioni web soprattutto in Vue e TypeScript. Ho usato anche React, per esempio sui siti ufficiali del Venezia FC e della Saudi Pro League.',
      'Oggi mi considero un full-stack developer, anche se il front-end resta la parte che preferisco.',
      "Nel lavoro di tutti i giorni uso anche strumenti di AI, soprattutto per le attività ripetitive e per scrivere i test. Controllo sempre il codice generato, e spesso è l'occasione per approfondire qualcosa che conosco poco.",
    ],
    factsTitle: 'In breve',
    facts: {
      sede: 'Sede',
      oggi: 'Oggi',
      esperienza: 'Esperienza',
      formazione: 'Formazione',
      lingue: 'Lingue',
      sedeValue: (city: string) => `${city}, ibrido`,
      esperienzaValue: (firstYear: number) => `Dal ${firstYear}`,
      formazioneValue: 'Master Web & Mobile Development presso Artoo Campus',
      lingueValue: 'Italiano, inglese',
    },
    photoAlt: (fullName: string, role: string) => `${fullName}, ${role}, in versione cartoon`,
  },
  projects: {
    title: 'Progetti',
    lede: "Quando mi viene un'idea, di solito finisco per provare a costruirla. Questi sono alcuni progetti nati nel tempo libero, e puoi provarli direttamente da qui.",
    openApp: "Apri l'app",
    code: 'Codice',
    status: { online: 'Online', dev: 'In sviluppo' },
    list: {
      fantaclash: {
        tagline: 'Il fantacalcio, ma con i giocatori delle vecchie stagioni.',
        description:
          "Ti ricordi quel giocatore che anni fa prendevi sempre al fantacalcio? Qui lo ritrovi. Scegli una stagione dal 2003-04 al 2025-26, fai l'asta con 100 crediti contro sette bot e metti insieme una squadra di otto giocatori, poi provi a vincere la coppa con partite simulate minuto per minuto. Ogni annata ha le sue statistiche e ogni bot ha un carattere diverso. Se preferisci sfidare gli amici, c'è anche il multiplayer in tempo reale.",
      },
      'che-si-mangia': {
        tagline: 'Per rispondere alla solita domanda: che mangiamo oggi?',
        description:
          "Ogni settimana la stessa storia: cosa facciamo a pranzo? E a cena? Ho fatto quest'app per organizzare i pasti senza doverci pensare ogni giorno. È un'app personale, senza account né login: un database raccoglie ricette e piatti da ordinare, e un algoritmo compone il menù giorno per giorno in base alle mie esigenze. Pensa anche alla schiscetta da portare in ufficio.",
      },
      'stipendio-netto': {
        tagline: 'Quanto resta in busta paga, partendo dalla RAL?',
        description:
          "Quando si parla di stipendio, la RAL da sola dice poco. Qui ti fai un'idea del netto mensile e annuale, vedi le trattenute voce per voce e cambi gli importi con un cursore. Per me è stato anche un modo per capire finalmente come funzionano tasse e contributi.",
      },
      playdev: {
        tagline: "Un po' di pratica con JavaScript, senza i soliti esercizi su carta.",
        description:
          "L'ho iniziata per studiare e ripassare JavaScript in modo più pratico, e magari anche divertente. È ancora in sviluppo: voglio migliorare gli esercizi, aggiungere altri linguaggi e integrare anche l'AI.",
      },
    },
  },
  demos: {
    fantaclash: {
      journeyAria: 'Percorso di gioco',
      journey: ['Asta', 'Sorteggio', 'Quarti', 'Semifinale', 'Finale'],
      roles: { P: 'Portiere', D: 'Difensore', C: 'Centrocampista', A: 'Attaccante' },
      rolesPlural: { P: 'Portieri', D: 'Difensori', C: 'Centrocampisti', A: 'Attaccanti' },
      tiers: { bronze: 'Bronzo', silver: 'Argento', gold: 'Oro', elite: 'Fuoriclasse' },
      stage: { live: "All'asta", yours: 'È tuo!', sold: 'Aggiudicato' },
      stats: { reparto: 'Reparto', crediti: 'Crediti' },
      yourTeam: 'La tua squadra',
      stamp: { yours: 'TUO!', sold: 'VENDUTO' },
      bid: {
        time: 'Tempo',
        to: (amount: number) => `a ${amount}`,
        leading: 'Sei in testa. Attendi la fine del conto alla rovescia.',
        max: (max: number) => `Puoi offrire fino a ${max} crediti.`,
        roleDone: 'Hai completato questo reparto.',
        next: 'Prossimo giocatore',
      },
      history: {
        aria: 'Ultimi rilanci',
        title: 'Ultimi rilanci',
        lead: 'In testa',
        opens: 'apre',
        offers: (count: number) => `${count} ${count === 1 ? 'offerta' : 'offerte'}`,
      },
      teams: { title: 'Squadre', leading: 'in testa', outbids: 'rilancia', credits: 'crediti' },
      price: {
        soldYou: 'Aggiudicato a te',
        soldTo: (name: string) => `Aggiudicato a ${name}`,
        outbid: (name: string) => `${name} ha rilanciato`,
        youLead: 'Sei in testa',
        lead: 'In testa',
        base: 'Prezzo base',
        noBids: 'Nessuna offerta',
      },
    },
    menu: {
      title: 'Menù settimanale',
      regenerate: 'Rigenera menù',
      today: 'Oggi',
      days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì'],
      meals: ['Pranzo', 'Cena'],
      categories: {
        primi: 'Primi',
        legumi: 'Legumi',
        pesce: 'Pesce',
        'carne-bianca': 'Carne bianca',
        uova: 'Uova',
        formaggi: 'Formaggi',
        'carne-rossa': 'Carne rossa',
        verdure: 'Verdure',
      },
      dishes: {
        'insalata-di-riso': 'Insalata di riso',
        tabule: 'Tabulè',
        'riso-al-forno': 'Riso al forno',
        'pasta-melanzane-pesto': 'Pasta melanzane e pesto',
        'cous-cous': 'Cous cous vegetale',
        'nugget-soia': 'Nugget di soia',
        sgombero: 'Sgombero grigliato',
        'seppie-piselli': 'Seppie con piselli',
        salmone: 'Salmone al vapore',
        'vellutata-tofu': 'Vellutata con tofu',
        lenticchie: 'Zuppa di lenticchie',
        falafel: 'Falafel al forno',
        'frittata-zucchine': 'Frittata di zucchine',
        'uova-purgatorio': 'Uova in purgatorio',
        spinaci: 'Spinaci in padella',
        'zucchine-grigliate': 'Zucchine grigliate',
        tagliata: 'Tagliata di manzo',
        caprese: 'Caprese',
      },
    },
    playdev: {
      level: (level: string) => `Livello ${level}`,
      run: 'Esegui',
      consoleLine: '3 test superati in 12ms',
      statuses: { active: 'In corso', soon: 'Prossimamente' },
      exercise: {
        title: 'La tua prima funzione',
        prompt: 'Scrivi una funzione somma(a, b) che restituisca la somma dei due numeri.',
      },
    },
    stipendio: {
      ralLabel: 'Retribuzione Annua Lorda (RAL)',
      ralAria: 'RAL',
      mensilita: 'Mensilità',
      mensilitaValue: (m: number) => `${m} mensilità`,
      note: 'Stima semplificata',
      netAnnual: 'Netto annuale',
      ofRal: (pct: string) => `${pct}% della RAL`,
      netMonthly: 'Netto mensile',
      overMonths: (m: number) => `su ${m} mensilità`,
      deductions: 'Trattenute',
      detail: 'Dettaglio calcolo',
      rows: {
        inps: { label: 'Contributi INPS', hint: '9,19% della RAL' },
        irpef: { label: 'IRPEF netta', hint: 'Imposta sul reddito' },
        addReg: { label: 'Add. regionale', hint: '1,73%' },
        addCom: { label: 'Add. comunale', hint: '0,8%' },
      },
      donut: { netto: 'Netto', inps: 'INPS', irpef: 'IRPEF', addizionali: 'Addizionali', ral: 'RAL' },
    },
  },
  stack: {
    title: 'Stack',
    lede: "Gli strumenti con cui ho lavorato in questi anni. Scegli un'azienda e vedi quali usavo in quel periodo.",
    legendAria: 'Esperienze',
    pickCompany: "Scegli un'azienda per vedere cosa usavo lì.",
    categories: { frontend: 'Frontend', backend: 'Backend', dati: 'Dati', strumenti: 'Strumenti' },
    today: 'oggi',
    years: (n: number) => (n === 1 ? '1 anno' : `${n} anni`),
    tip: {
      since: (from: number, until?: number) => (until ? `Dal ${from} al ${until}` : `Dal ${from}`),
      inCompany: 'In azienda',
      inProjects: 'Nei progetti',
      personalOnly: 'Solo progetti personali',
      aria: (name: string) => `Dettagli ${name}`,
    },

    /** Commit di carriera leggibili, per hash. Periodi nel formato 'Mmm YYYY - Mmm YYYY|oggi'. */
    career: {
      e7b2c04: { message: 'Senior Software Developer in digit', period: 'Dic 2024 - oggi', detail: 'Torino, ibrido' },
      b82a7d5: {
        message: '4Dem diventa Positive, ruolo Full Stack Developer',
        period: 'Mar 2023 - Nov 2024',
        detail: 'Torino, ibrido',
        skills: ['TypeScript', 'Sviluppo software'],
      },
      '61af3d4': {
        message: 'Web Software Developer in 4Dem',
        period: 'Set 2018 - Mar 2023',
        detail: 'Digital & Email Marketing',
        skills: ['Vue.js', 'Debug'],
      },
      '0a4b7c2': {
        message: 'IT Software Developer in EcoSafe Srl',
        period: 'Gen 2018 - Lug 2018',
        detail: 'Torino',
        skills: ['Debug', 'Bootstrap'],
      },
    } as Record<string, { message: string; period: string; detail: string; skills?: string[] }>,
    stickers: {
      note: 'Uno degli strumenti che uso o che ho usato nei miei progetti.',
      intro: 'Sul mio portatile gli adesivi non mancano: qui ho messo quelli delle tecnologie che uso.',
      drag: 'Trascinali',
      or: 'o',
      click: 'cliccali',
      since: (year: number) => `dal ${year}`,
      usedIn: 'Usato in:',
      close: 'Rimetti',
    },
  },

  /** Abbreviazioni dei mesi per i periodi di carriera e parola chiave per la data corrente. */
  dates: {
    months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    today: 'oggi',
  },
  contacts: {
    title: 'Contatti',
    lede: 'Valuto nuove opportunità come sviluppatore front-end o full-stack. Se hai qualcosa da propormi, parliamone.',
    cardTitle: 'Mi trovi su LinkedIn',
    text: "Per proposte di lavoro, per il CV o per parlarmi di un progetto, scrivimi lì. Su GitHub invece c'è il codice dei miei progetti.",
    avatarAlt: 'Marcello in versione cartoon mentre saluta',
    tileAria: (fullName: string, label: string, handle: string) => `${fullName} su ${label}: ${handle}`,
  },
  footer: {
    toTop: 'Torna su',
    copyright: (year: number, fullName: string) => `© ${year} ${fullName}`,
  },
  profile: {
    role: 'Full-Stack Developer',
    summary:
      'Sono uno sviluppatore web di Torino e lavoro nel settore dal 2018. Negli anni ho usato Vue, React, TypeScript, Node.js e Laravel; oggi sono in digit, dove mi occupo soprattutto di front-end.',
    skills: [
      'Front-end development',
      'Vue.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'PHP',
      'Laravel',
      'Tailwind CSS',
      'Design system',
      'API RESTful',
      'Microservizi',
    ],
  },
  seo: {
    title: (fullName: string, role: string, city: string) => `${fullName} | ${role} a ${city}, React e Vue`,
    description: (fullName: string, city: string) =>
      `${fullName}, sviluppatore web full-stack a ${city} dal 2018: applicazioni web con Vue, React, TypeScript, Node.js, PHP e Laravel. Progetti, stack ed esperienze.`,
    imageAlt: (fullName: string, role: string, city: string) => `${fullName}, ${role} a ${city}`,
    jsonLd: {
      projectsName: (fullName: string) => `Progetti di ${fullName}`,
      projectGenre: 'Applicazione web',
    },
  },
};

export { i18n };

export type I18n = typeof i18n;
