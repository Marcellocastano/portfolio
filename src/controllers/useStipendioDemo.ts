import { useCallback, useRef, useState } from 'react';
import {
  AUTOPLAY_RALS,
  computeNet,
  MENSILITA_OPTIONS,
  QUICK_RALS,
  RAL_MAX,
  RAL_MIN,
} from '../models/projects/stipendio.model';
import { useCountUp } from './useCountUp';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const AUTOPLAY_MS = 3600;

export function useStipendioDemo(running: boolean) {
  const [ral, setRal] = useState(30000);
  const [mensilita, setMensilita] = useState(13);
  const [touched, setTouched] = useState(false);
  const stepRef = useRef(0);
  const reduced = useReducedMotion();

  const autoplay = useCallback(() => {
    stepRef.current = (stepRef.current + 1) % AUTOPLAY_RALS.length;
    setRal(AUTOPLAY_RALS[stepRef.current]);
  }, []);
  useInterval(autoplay, AUTOPLAY_MS, running && !touched && !reduced);

  const touch = useCallback(() => setTouched(true), []);
  const onSlider = useCallback(
    (value: number) => {
      touch();
      setRal(value);
    },
    [touch],
  );

  const breakdown = computeNet(ral);
  const shown = useCountUp(breakdown.netto, running);

  return {
    ral,
    breakdown,
    shown,
    mensilita,
    setMensilita,
    touched,
    onSlider,
    touch,
    QUICK_RALS,
    RAL_MIN,
    RAL_MAX,
    MENSILITA_OPTIONS,
  };
}
