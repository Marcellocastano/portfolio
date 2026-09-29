import type { Branch } from '../../../../models/stack/career.model';

export const MAIN_X = 16;
const BEND = 14;

/** Uscita orizzontale, tratto verticale sulla corsia, rientro orizzontale nel merge. */
export function lanePath(yFork: number, yMerge: number, lx: number): string {
  const d = Math.min(BEND, (yFork - yMerge) / 4);
  return (
    `M ${MAIN_X} ${yFork} C ${lx} ${yFork}, ${lx} ${yFork}, ${lx} ${yFork - d} ` +
    `L ${lx} ${yMerge + d} C ${lx} ${yMerge}, ${MAIN_X - 2} ${yMerge}, ${MAIN_X} ${yMerge}`
  );
}

function overlaps(a: Branch, b: Branch): boolean {
  return a.merge <= b.fork && b.merge <= a.fork;
}

/** Corsia più esterna tra quelle i cui rami si sovrappongono in altezza a b (per l'etichetta). */
export function outerLane(b: Branch, all: Branch[]): number {
  let max = b.lane;
  for (const o of all) if (o !== b && overlaps(o, b) && o.lane > max) max = o.lane;
  return max;
}
