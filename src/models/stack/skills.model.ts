import { COMMITS } from './career.model';

export type SkillCategory = 'frontend' | 'backend' | 'dati' | 'strumenti';
export type CompanyId = 'ecosafe' | '4dem' | 'positive' | 'digit';

export interface Company {
  id: CompanyId;
  name: string;
  role: string;
  period: string;
  color: string;
  /** Anni frazionari (2018.5 = luglio 2018). */
  start: number;
  end: number;
}

export interface Skill {
  id: string;
  name: string;
  /** Path SVG simple-icons (viewBox 24x24) e colore brand. */
  path: string;
  color: string;
  category: SkillCategory;
  since: number;
  until?: number;
  companies: CompanyId[];
  /** Frase nel tooltip, opzionale. */
  note?: string;
  /** id dei progetti in models/projects. */
  usedIn: string[];
}

/** Fine dell'asse: fissa per non avere differenze tra pre-rendering e client. Da aggiornare. */
export const TODAY = 2026 + 9 / 12;
export const TIMELINE_START = 2018;

export const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'dati', label: 'Dati' },
  { id: 'strumenti', label: 'Strumenti' },
];

const MONTHS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
const IDS: Record<string, CompanyId> = {
  digit: 'digit',
  Positive: 'positive',
  '4Dem': '4dem',
  'EcoSafe Srl': 'ecosafe',
};

/** "Set 2018" -> 2018.67; "oggi" -> TODAY. `end` include il mese intero. */
export function parseMonth(text: string, end = false): number {
  const [m, y] = text.trim().split(' ');
  if (!y) return TODAY;
  return Number(y) + (MONTHS.indexOf(m) + (end ? 1 : 0)) / 12;
}

/* Le aziende derivano dai dati reali di carriera, dalla più vecchia alla più recente. */
export const COMPANIES: Company[] = COMMITS.filter((c) => c.company && c.period)
  .map((c) => {
    const [from, to] = (c.period ?? '').split(' - ');
    return {
      id: IDS[c.company ?? ''],
      name: c.company ?? '',
      role: c.message.split(' in ')[0].replace(/^4Dem diventa Positive, ruolo /, ''),
      period: c.period ?? '',
      color: c.color ?? '#888',
      start: parseMonth(from),
      end: parseMonth(to, true),
    };
  })
  .reverse();

const SPAN = TODAY - TIMELINE_START;

/** Posizione sull'asse in percentuale. */
export function toPct(year: number): number {
  return ((Math.min(Math.max(year, TIMELINE_START), TODAY) - TIMELINE_START) / SPAN) * 100;
}

export function yearsLabel(skill: Skill): string {
  const years = Math.max(1, Math.round((skill.until ?? TODAY) - skill.since));
  return years === 1 ? '1 anno' : `${years} anni`;
}

/** Tratto della barra che cade nel periodo dell'azienda, se la tecnologia è stata usata lì. */
export function overlap(skill: Skill, company: Company): { from: number; to: number } | null {
  if (!skill.companies.includes(company.id)) return null;
  const from = Math.max(skill.since, company.start);
  const to = Math.min(skill.until ?? TODAY, company.end);
  return to > from ? { from: toPct(from), to: toPct(to) } : null;
}

export const YEARS = Array.from({ length: Math.floor(TODAY) - TIMELINE_START + 1 }, (_, i) => TIMELINE_START + i);
