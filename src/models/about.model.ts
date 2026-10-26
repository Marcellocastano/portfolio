import { COMMITS } from './stack/career.model';
import { profile } from './profile.model';

export interface Fact {
  label: string;
  value: string;
}

export interface Competence {
  title: string;
  detail: string;
}

const current = COMMITS.find((c) => c.head);
const firstYear = COMMITS.filter((c) => c.period)
  .map((c) => Number(c.period?.match(/\d{4}/)?.[0]))
  .reduce((min, y) => Math.min(min, y), Infinity);

export const about = {
  title: `Ciao, sono ${profile.firstName}`,
  bio: [
    'Ho iniziato nel 2018 con WordPress e PHP. Nei sei anni in 4Dem, poi diventata Positive, sono passato allo sviluppo full-stack di prodotti interni con Vue, Node.js e Laravel: ho lavorato alla migrazione verso i microservizi e ho costruito da zero il design system dell’azienda.',
    'Da dicembre 2024 sono in digit, dove sviluppo applicazioni web per clienti enterprise in Vue e TypeScript. In React ho lavorato al front-end dei siti ufficiali del Venezia FC e della Saudi Pro League.',
    'La parte che preferisco è il front-end, ma seguo volentieri una funzionalità fino all’API e al database.',
  ],
  facts: [
    { label: 'Sede', value: `${profile.city}, ibrido` },
    { label: 'Oggi', value: current?.message ?? profile.role },
    { label: 'Esperienza', value: `Dal ${firstYear}` },
    { label: 'Formazione', value: 'Master Web & Mobile' },
    { label: 'Lingue', value: 'Italiano, inglese' },
  ] satisfies Fact[],
  badge: {
    label: 'Developer ID',
    sub: 'Portfolio 2026',
    fields: [
      { label: 'Dal', value: String(firstYear) },
      { label: 'Sede', value: profile.city },
      { label: 'Stack', value: 'Vue, React' },
    ] satisfies Fact[],
    backTitle: 'Competenze',
    hint: 'Clicca per girarlo',
  },
  competences: [
    { title: 'Front-end', detail: 'Vue, TypeScript, React' },
    { title: 'Back-end e API', detail: 'Node.js, Laravel, REST' },
    { title: 'Design system', detail: 'Componenti, Tailwind CSS' },
    { title: 'Database', detail: 'MySQL, MongoDB' },
    { title: 'Strumenti', detail: 'Docker, Git, Agile' },
  ] satisfies Competence[],
};
