import { i18n } from '../i18n.model';

/** Dati della demo FantaClash: lotti della stagione 2025-26, squadre, ruoli e fasce. */

export type Role = 'P' | 'D' | 'C' | 'A';
export type Tier = 'bronze' | 'silver' | 'gold' | 'elite';

export const LOT_MS = 5000;
export const TICK_MS = 100;
export const INITIAL_CREDITS = 100;
export const OPENING_BID = 1;
export const HISTORY_SIZE = 5;
export const BID_STEPS = [1, 5, 10];
export const ROSTER: Record<Role, number> = { P: 1, D: 2, C: 3, A: 2 };
export const ROLE_ORDER: Role[] = ['P', 'D', 'C', 'A'];
export const JOURNEY_STEPS = i18n.demos.fantaclash.journey;

export interface PlayerStat {
  label: string;
  value: string;
}

export interface Player {
  name: string;
  role: Role;
  team: string;
  overall: number;
  value: number;
  stats: PlayerStat[];
}

const s = (label: string, value: string): PlayerStat => ({ label, value });

const p = (name: string, role: Role, team: string, overall: number, value: number, stats: PlayerStat[]): Player => ({
  name,
  role,
  team,
  overall,
  value,
  stats,
});

export const LOTS: Player[] = [
  p('CARNESECCHI Marco', 'P', 'Atalanta', 94, 27, [s('MV', '6.97'), s('PRES', '37'), s('RIG', '50%')]),
  p('CAPRILE Elia', 'P', 'Cagliari', 79, 12, [s('MV', '6.47'), s('PRES', '38'), s('RIG', '0%')]),
  p('DIMARCO Federico', 'D', 'Inter', 92, 26, [s('MV', '6.90'), s('GOL', '19%'), s('ASS', '44%')]),
  p('MANCINI Gianluca', 'D', 'Roma', 86, 19, [s('MV', '6.70'), s('GOL', '11%'), s('ASS', '6%')]),
  p("BARELLA Nicolo'", 'C', 'Inter', 88, 29, [s('MV', '6.77'), s('GOL', '9%'), s('ASS', '24%')]),
  p('ATTA Arthur', 'C', 'Udinese', 83, 22, [s('MV', '6.60'), s('GOL', '16%'), s('ASS', '9%')]),
  p('MARTINEZ Lautaro', 'A', 'Inter', 91, 46, [s('MV', '6.87'), s('GOL', '57%'), s('ASS', '20%')]),
  p('DAVIS Keinan', 'A', 'Udinese', 82, 28, [s('MV', '6.57'), s('GOL', '33%'), s('ASS', '13%')]),
];

export interface Kit {
  primary: string;
  secondary: string;
  on: string;
}

export interface TeamDef {
  id: string;
  name: string;
  you: boolean;
  kit: Kit;
}

const t = (id: string, name: string, you: boolean, primary: string, secondary: string, on: string): TeamDef => ({
  id,
  name,
  you,
  kit: { primary, secondary, on },
});

export const TEAM_DEFS: TeamDef[] = [
  t('you', 'IL SESTO ASENSIO', true, '#1A3E8C', '#FFD23F', '#FFFFFF'),
  t('kb', 'KILL BILLING', false, '#C8102E', '#111111', '#FFFFFF'),
  t('gl', 'CAMBIA LA TUA VITA CON UN GLIK', false, '#5B2A86', '#FFFFFF', '#FFFFFF'),
  t('dh', "AL D'HILAL", false, '#1D8FD8', '#FFFFFF', '#FFFFFF'),
  t('aa', 'AMBRA ANJORIN', false, '#8E1F2F', '#F5B500', '#FFFFFF'),
  t('dl', 'DYBALA COI LUPI', false, '#0B7A43', '#111111', '#FFFFFF'),
  t('ks', 'KEAN SHIRO', false, '#111111', '#FFFFFF', '#FFFFFF'),
  t('mm', 'MESSI MALEN', false, '#FFFFFF', '#C8102E', '#15201A'),
];

export function tierOf(overall: number): Tier {
  if (overall >= 90) return 'elite';
  if (overall >= 85) return 'gold';
  if (overall >= 80) return 'silver';
  return 'bronze';
}
