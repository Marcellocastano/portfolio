export interface ProjectTheme {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  fontDisplay?: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  stack: string[];
  status: 'Online' | 'In sviluppo';
  links: { app: string; code: string };
  theme: ProjectTheme;
}

/** Tema del progetto come custom properties CSS (--p-*) da applicare via style. */
export function projectCssVars(project: Project): Record<string, string> {
  const t = project.theme;
  return {
    '--p-bg': t.bg,
    '--p-surface': t.surface,
    '--p-fg': t.fg,
    '--p-muted': t.muted,
    '--p-accent': t.accent,
    '--p-accent-fg': t.accentFg,
    '--p-font-display': t.fontDisplay ?? 'var(--font-sans)',
  };
}

export const projects: Project[] = [
  {
    id: 'fantaclash',
    name: 'FantaClash',
    domain: 'fantaclash.it',
    tagline: 'Asta e coppa di fantacalcio sulle stagioni storiche della Serie A.',
    description:
      "Scegli un'annata dal 2003-04 al 2025-26, sfidi sette bot all'asta con 100 crediti e costruisci una rosa di otto giocatori. Poi si gioca una coppa a eliminazione diretta, con partite simulate minuto per minuto.",
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vitest'],
    status: 'Online',
    links: { app: 'https://www.fantaclash.it', code: '#' },
    theme: {
      bg: '#F4EEDF',
      surface: '#EAE1CA',
      fg: '#15201A',
      muted: '#5C665F',
      accent: '#0B7A43',
      accentFg: '#FFFFFF',
      fontDisplay: '"Big Shoulders Variable", "Arial Narrow", sans-serif',
    },
  },
  {
    id: 'che-si-mangia',
    name: 'Che si mangia',
    domain: 'chesimangia.app',
    tagline: 'Il menù settimanale che si rigenera da solo.',
    description:
      'Pianifica pranzi e cene rispettando target nutrizionali e cadence degli ingredienti: un click e la settimana cambia, restano i vincoli.',
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    status: 'Online',
    links: { app: '#', code: '#' },
    theme: {
      bg: '#fdf3ef',
      surface: '#ffffff',
      fg: '#5b3040',
      muted: '#a97f88',
      accent: '#e5486f',
      accentFg: '#ffffff',
      fontDisplay: 'ui-serif, Georgia, "Times New Roman", serif',
    },
  },
  {
    id: 'stipendio-netto',
    name: 'Calcolatore stipendio netto',
    domain: 'stipendionetto.app',
    tagline: 'Dalla RAL al netto in busta paga, in chiaro.',
    description:
      'Sposta il cursore e vedi subito netto annuale, mensile e il dettaglio delle trattenute: INPS, IRPEF e addizionali.',
    stack: ['Vue', 'TypeScript', 'Vite'],
    status: 'Online',
    links: { app: '#', code: '#' },
    theme: {
      bg: '#d5dfda',
      surface: '#ffffff',
      fg: '#1d4d47',
      muted: '#5f7d78',
      accent: '#1d4d47',
      accentFg: '#eaf4ef',
    },
  },
  {
    id: 'playdev',
    name: 'Play&Dev',
    domain: 'playanddev.app',
    tagline: 'Impara JavaScript giocando, un livello alla volta.',
    description:
      'Esercizi in un mini editor, test che diventano verdi uno a uno e XP che salgono: il percorso avanza a ogni esecuzione riuscita.',
    stack: ['React', 'TypeScript', 'Node.js', 'Vitest'],
    status: 'In sviluppo',
    links: { app: '#', code: '#' },
    theme: {
      bg: '#f7f6ef',
      surface: '#ffffff',
      fg: '#3c3a28',
      muted: '#8a8468',
      accent: '#f7d547',
      accentFg: '#3c3a28',
    },
  },
];
