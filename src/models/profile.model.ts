import { i18n } from './i18n.model';

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
  // headlineAccent: string;
  intro: string;
  /** Riassunto professionale per i dati strutturati (JSON-LD). */
  summary: string;
  skills: string[];
  languages: string[];
  /** URL pubblici (LinkedIn, GitHub, ...) usati nei dati strutturati come `sameAs`. */
  socials: string[];
  /** Canali di contatto pubblici, LinkedIn per primo (è il canale per il lavoro). L'email non va mai pubblicata. */
  contacts: Contact[];
}

export const profile: Profile = {
  firstName: 'Marcello',
  lastName: 'Castano',
  role: i18n.profile.role,
  city: 'Torino',
  countryCode: 'IT',
  headline: i18n.hero.headline,
  // headlineAccent: i18n.hero.headlineAccent,
  intro: i18n.hero.intro,
  summary: i18n.profile.summary,
  skills: i18n.profile.skills,
  languages: ['it', 'en'],
  socials: ['https://github.com/Marcellocastano', 'https://www.linkedin.com/in/marcello-castano'],
  contacts: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/marcello-castano',
      handle: '/in/marcello-castano',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Marcellocastano',
      handle: '@Marcellocastano',
    },
  ],
};

/** Anno fisso del copyright nel footer (SSR-safe, da aggiornare a mano). */
export const footerYear = 2026;

export const navLinks: NavLink[] = i18n.nav.links;
