export interface NavLink {
  label: string;
  href: string;
}

export interface Contact {
  id: 'github' | 'linkedin';
  label: string;
  href: string;
  handle: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  role: string;
  city: string;
  countryCode: string;
  headline: string;
  /** Seconda riga del sottotitolo, in coral. */
  headlineAccent: string;
  intro: string;
  /** Riassunto professionale per i dati strutturati (JSON-LD). */
  summary: string;
  skills: string[];
  languages: string[];
  /** URL pubblici (LinkedIn, GitHub, ...) usati nei dati strutturati come `sameAs`. */
  socials: string[];
  /** Canali di contatto pubblici. L'email non va mai pubblicata: spam e bot. */
  contacts: Contact[];
}

export const profile: Profile = {
  firstName: 'Marcello',
  lastName: 'Castano',
  role: 'Full-Stack Developer',
  city: 'Torino',
  countryCode: 'IT',
  headline: 'Sviluppo web dal 2018,',
  headlineAccent: 'oggi in digit.',
  intro:
    'Qui sotto trovi le app che ho costruito per conto mio, fuori dal lavoro. Ognuna ha un’anteprima che puoi usare senza uscire dalla pagina.',
  summary:
    'Full-Stack Developer a Torino. Dal 2018 sviluppo applicazioni web con Vue, TypeScript, Node.js e Laravel; oggi lavoro in digit su progetti per clienti enterprise.',
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
  languages: ['it', 'en'],
  socials: ['https://github.com/Marcellocastano', 'https://www.linkedin.com/in/marcellocastano'],
  contacts: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Marcellocastano',
      handle: '@Marcellocastano',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      // TODO: verificare URL
      href: 'https://www.linkedin.com/in/marcellocastano',
      handle: '/in/marcellocastano',
    },
  ],
};

/* Testi della sezione Contatti. */
export const contactsCopy = {
  lede: 'Sono aperto a nuove opportunità come Full-Stack o Front-end Developer.',
  title: 'Il modo più rapido è LinkedIn.',
  text: 'Scrivimi lì per un colloquio o per ricevere il CV completo. Su GitHub trovi il codice dei progetti che vedi in questa pagina.',
  avatarAlt: 'Illustrazione di Marcello che fa il saluto',
  footerYear: 2026,
};

export const navLinks: NavLink[] = [
  { label: 'Chi sono', href: '#chi-sono' },
  { label: 'Progetti', href: '#progetti' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contatti', href: '#contatti' },
];
