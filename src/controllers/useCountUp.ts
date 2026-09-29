import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const DURATION = 700;

/** Interpola un numero verso il target con rAF; istantaneo con reduced motion. */
export function useCountUp(target: number, enabled: boolean): number {
  const [value, setValue] = useState(target);
  const shownRef = useRef(target);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || shownRef.current === target) {
      shownRef.current = target;
      setValue(target);
      return;
    }
    const from = shownRef.current;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      shownRef.current = from + (target - from) * eased;
      setValue(shownRef.current);
      if (t < 1) frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [target, enabled, reduced]);

  return value;
}
