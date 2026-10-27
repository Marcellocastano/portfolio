/**
 * Testi in italiano utilizzati nel portfolio.
 * Le chiavi e le funzioni restano compatibili con le view esistenti.
 */

const i18n = {
  nav: {
    homeAria: (fullName: string) => `${fullName}, home`,
    primaryAria: 'Principale',
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
    headline: 'Scrivo codice dal 2018.',
    headlineAccent: 'E continuo a imparare.',
    intro:
      'Sono uno sviluppatore web e questo è il mio piccolo spazio, la mia fabbrica dei mostri. Ci trovi qualcosa su di me e alcuni progetti nati nel tempo libero.',
    titleAria: (fullName: string, role: string) => `${fullName}, ${role}`,
    ctaProjects: 'Vedi i progetti',
    ctaContact: 'Scrivimi',
    showcaseAria: (firstName: string) =>
      `Il flusso di lavoro di ${firstName}: un design diventa codice React e poi un'interfaccia funzionante nel browser, dove una card viene trascinata da Idee a In sviluppo`,
  },

  /** Scena dell'hero: colonne kanban, fasi pipeline e label del frame di design. */
  showcase: {
    columns: { idee: 'Idee', sviluppo: 'In sviluppo' },
    status: { idee: 'Idea', sviluppo: 'In sviluppo' },
    stages: { design: 'Design', code: 'Code', browser: 'Browser' },
    design: { board: 'Board', card: 'Card' },
  },
  about: {
    title: (firstName: string) => `Ciao, sono ${firstName}`,
    bio: [
      'Ho iniziato a lavorare come sviluppatore nel 2018, tra WordPress e PHP. Poi sono arrivato in 4Dem (diventata successivamente Positive), dove sono rimasto circa sei anni. Lì ho avuto modo di mettere mano a un po’ di tutto: Vue, Node.js, Laravel, il passaggio ai microservizi, la costruzione dello shop con Stripe e anche un design system costruito da zero.',
      'Da dicembre 2024 lavoro in digit. Mi occupo di applicazioni web, soprattutto con Vue e TypeScript. Ho lavorato anche con React, tra le altre cose sui siti ufficiali del Venezia FC e della Saudi Pro League.',
      'Dopo questi anni mi ritengo un full-stack developer, con una speciale predilezione per il front-end.',
      "Uso sempre più spesso l'AI nel lavoro di tutti i giorni. Mi aiuta a velocizzare le attività più ripetitive, trovare soluzioni ai problemi e sperimentare nuove idee. È uno strumento che mi permette di lavorare meglio e dedicare più tempo agli aspetti dello sviluppo che richiedono maggiore attenzione.",
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
    badge: {
      label: 'Developer ID',
      sub: 'Portfolio 2026',
      fields: { dal: 'Dal', sede: 'Sede', stack: 'Stack' },
      stackValue: 'Vue, React',
      backTitle: 'Competenze',
      hint: 'Gira il badge',
      flipToBack: 'Gira il badge per vedere le competenze',
      flipToFront: 'Mostra il fronte del badge',
      photoAlt: (fullName: string, role: string) => `${fullName}, ${role}`,
    },
    competences: [
      { title: 'Front-end', detail: 'Vue, TypeScript, React' },
      { title: 'Back-end e API', detail: 'Node.js, Laravel, PHP' },
      { title: 'AI', detail: 'Claude Code, Codex, Devin' },
      { title: 'Database', detail: 'MySQL, MongoDB' },
      { title: 'Strumenti', detail: 'Docker, Git, Agile, Jira' },
    ],
  },
  projects: {
    title: 'Progetti',
    lede: "Quando mi viene un'idea, spesso finisco per provare a realizzarla. Questi sono alcuni dei progetti a cui ho dedicato il tempo libero. Puoi provarli direttamente da qui.",
    openApp: "Apri l'app",
    code: 'Codice',
    status: { online: 'Online', dev: 'In sviluppo' },
    list: {
      fantaclash: {
        tagline: 'Il fantacalcio, ma con i giocatori delle vecchie stagioni.',
        description:
          "Ti ricordi quel giocatore che anni fa prendevi sempre al fantacalcio? Qui puoi ritrovarlo. Scegli una stagione dal 2003-04 al 2025-26, fai l'asta contro sette bot con 100 crediti e crea la tua squadra di otto giocatori. Poi provi a vincere la coppa, con partite simulate minuto per minuto. Il progetto contiene dati statistici per ogni annata, bot intelligenti e con varie personalità. C'è anche la modalità multiplayer dove puoi sfidare amici in tempo reale.",
      },
      'che-si-mangia': {
        tagline: 'Un aiuto per rispondere alla solita domanda: che mangiamo oggi?',
        description:
          'Ogni settimana la stessa domanda: cosa prepariamo per pranzo? e per cena? Ho creato questa app per organizzare i pasti senza doverci pensare ogni giorno. Applicazione personale, senza utenze o autenticazione, un db che raccoglie ricette e piatti da delivery e un algoritmo che compone giorno dopo giorno secondo le mie esigenze. Pensando per me anche la schiscetta da portare in ufficio.',
      },
      'stipendio-netto': {
        tagline: 'Quanto diventano, in busta paga, quei soldi di RAL?',
        description:
          'Quando si parla di stipendio, la RAL da sola dice poco. Qui puoi farti un’idea del netto mensile e annuale, vedere le trattenute e cambiare gli importi con un cursore. È stato un esercizio carino per capire come funzionano le tasse e le trattenute.',
      },
      playdev: {
        tagline: 'Un po’ di pratica JavaScript, senza i soliti esercizi su carta.',
        description:
          "Questa applicazione nasce dall'idea di studiare/ripassare JavaScript in modo divertente e pratico. È ancora in sviluppo, l'idea è quella di ottimizzare gli esercizi e aggiungere altri linguaggi di programmazione, implementando anche l'AI.",
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
    lede: "Qui trovi gli strumenti con cui ho lavorato negli anni. Se passi su un'azienda, puoi vedere quali usavo in quel periodo.",
    legendAria: 'Esperienze',
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
      e7b2c04: { message: 'Software Developer in digit', period: 'Dic 2024 - oggi', detail: 'Torino, ibrido' },
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
      intro: 'Sul mio portatile gli adesivi non mancano. Qui ne ho raccolti alcuni delle tecnologie che uso.',
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
    lede: 'Sono aperto a nuove opportunità come sviluppatore front-end o full-stack. Se hai qualcosa da propormi, parliamone!',
    cardTitle: 'Mi trovi su LinkedIn',
    text: 'Se vuoi contattarmi per lavoro, chiedermi il CV o parlarmi di un progetto, scrivimi lì. Su GitHub trovi invece il codice dei miei progetti.',
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
      'Sono uno sviluppatore web a Torino. Lavoro nel settore dal 2018 e negli anni ho usato Vue, React, TypeScript, Node.js e Laravel. Oggi lavoro in digit, soprattutto su applicazioni front-end.',
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
