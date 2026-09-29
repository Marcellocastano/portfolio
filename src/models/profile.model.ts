export interface NavLink {
  label: string;
  href: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  city: string;
  countryCode: string;
  headline: string;
  headlineLead: string;
  rotatingWords: string[];
  intro: string;
  skills: string[];
  languages: string[];
  /** URL pubblici (LinkedIn, GitHub, ...) usati nei dati strutturati come `sameAs`. */
  socials: string[];
}

export const profile: Profile = {
  firstName: 'Marcello',
  lastName: 'Castano',
  role: 'Full-Stack Developer',
  email: 'marcello.castano@gmail.com',
  city: 'Torino',
  countryCode: 'IT',
  headline: 'Trasformo sfide complesse',
  headlineLead: 'in interfacce',
  rotatingWords: ['performanti.', 'scalabili.', 'accessibili.', 'curate al pixel.'],
  intro:
    'Dal 2018 progetto e sviluppo prodotti web con Vue, React, TypeScript e Node, dai design system ai microservizi. Qui raccolgo i progetti che costruisco per curiosità, fuori dall’orario di lavoro.',
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
  socials: [],
};

export const navLinks: NavLink[] = [
  { label: 'Progetti', href: '#progetti' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contatti', href: '#contatti' },
];
