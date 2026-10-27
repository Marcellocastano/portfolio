import { i18n } from '../i18n.model';

export type ProjectStatus = keyof typeof i18n.projects.status;

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
  id: keyof typeof i18n.projects.list;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  /** `app` solo per i progetti pubblici; `code` punta al repository. */
  links: { app?: string; code: string };
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
    tagline: i18n.projects.list.fantaclash.tagline,
    description: i18n.projects.list.fantaclash.description,
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vitest'],
    status: 'online',
    links: { app: 'https://www.fantaclash.it', code: 'https://github.com/Marcellocastano/fantaclash' },
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
    tagline: i18n.projects.list['che-si-mangia'].tagline,
    description: i18n.projects.list['che-si-mangia'].description,
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    status: 'online',
    links: { code: 'https://github.com/Marcellocastano/recipe-planner' },
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
    tagline: i18n.projects.list['stipendio-netto'].tagline,
    description: i18n.projects.list['stipendio-netto'].description,
    stack: ['Vue', 'TypeScript', 'Vite'],
    status: 'online',
    links: { code: 'https://github.com/Marcellocastano/salary-calculator' },
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
    tagline: i18n.projects.list.playdev.tagline,
    description: i18n.projects.list.playdev.description,
    stack: ['React', 'TypeScript', 'Node.js', 'Vitest'],
    status: 'dev',
    links: { code: 'https://github.com/Marcellocastano/play-and-dev' },
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
