import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mulberry32, type Rng } from '../lib/prng';
import {
  countByCategory,
  DAYS,
  generateWeek,
  MEALS,
  spinDelay,
  spinStrip,
  type Dish,
  type Week,
} from '../models/projects/menu.model';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const SEED = 20261004;
const SPIN_MS = 1500;
const AUTOPLAY_MS = 4500;

export interface SpinCell {
  strip: Dish[];
  delay: number;
}

export function useMenuDemo(running: boolean) {
  const rngRef = useRef<Rng>(mulberry32(SEED + 1));
  const [week, setWeek] = useState<Week>(() => generateWeek(mulberry32(SEED)));
  const [spinning, setSpinning] = useState(false);
  const [spinId, setSpinId] = useState(0);
  const reduced = useReducedMotion();

  const regenerate = useCallback(() => {
    const rng = rngRef.current;
    setWeek(generateWeek(rng));
    if (!reduced) {
      setSpinning(true);
      setSpinId((id) => id + 1);
    }
  }, [reduced]);

  useInterval(regenerate, AUTOPLAY_MS, running && !reduced);

  useEffect(() => {
    if (!spinning) return;
    const id = window.setTimeout(() => setSpinning(false), SPIN_MS);
    return () => window.clearTimeout(id);
  }, [spinning, spinId]);

  const cells = useMemo<SpinCell[] | null>(() => {
    if (!spinning) return null;
    const rng = rngRef.current;
    return week.flat().map((dish, i) => ({ strip: spinStrip(rng, dish), delay: spinDelay(rng, i) }));
  }, [spinning, week]);

  return { week, counts: countByCategory(week), spinning, spinId, cells, regenerate, cellCount: DAYS * MEALS };
}
