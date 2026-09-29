export interface NetBreakdown {
  netto: number;
  inps: number;
  irpef: number;
  addReg: number;
  addCom: number;
}

export const RAL_MIN = 15000;
export const RAL_MAX = 100000;
export const QUICK_RALS = [15000, 30000, 50000, 80000];
export const MENSILITA_OPTIONS = [13, 14];
export const AUTOPLAY_RALS = [30000, 50000, 80000];

const INPS_RATE = 0.0919;
const ADD_REGIONALE = 0.0173;
const ADD_COMUNALE = 0.008;

const BRACKETS = [
  { upTo: 28000, rate: 0.23 },
  { upTo: 50000, rate: 0.35 },
  { upTo: Infinity, rate: 0.43 },
];

function computeIrpef(imponibile: number): number {
  let tax = 0;
  let prev = 0;
  for (const { upTo, rate } of BRACKETS) {
    const slice = Math.min(imponibile, upTo) - prev;
    if (slice <= 0) break;
    tax += slice * rate;
    prev = upTo;
  }
  return tax;
}

function detrazione(ral: number): number {
  if (ral <= 15000) return 1955;
  if (ral <= 28000) return 1910 + (1190 * (28000 - ral)) / 13000;
  if (ral <= 50000) return (1910 * (50000 - ral)) / 22000;
  return 0;
}

/** Stima semplificata del netto da RAL (dipendente). */
export function computeNet(ral: number): NetBreakdown {
  const inps = ral * INPS_RATE;
  const imponibile = ral - inps;
  const irpef = Math.max(0, computeIrpef(imponibile) - detrazione(ral));
  const addReg = imponibile * ADD_REGIONALE;
  const addCom = imponibile * ADD_COMUNALE;
  const netto = ral - inps - irpef - addReg - addCom;
  return { netto, inps, irpef, addReg, addCom };
}

export function trattenuteTotali(b: NetBreakdown): number {
  return b.inps + b.irpef + b.addReg + b.addCom;
}

export function formatEuro(value: number): string {
  return `€ ${Math.round(value).toLocaleString('it-IT')}`;
}
