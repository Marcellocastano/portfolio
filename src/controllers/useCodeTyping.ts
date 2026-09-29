import { useEffect, useMemo, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { countChars, sliceTypedCode, type CodeLine } from '../models/code.model';

interface TypingOptions {
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

export function useCodeTyping(lines: CodeLine[], { speed = 24, startDelay = 900, enabled = true }: TypingOptions = {}) {
  const total = useMemo(() => countChars(lines), [lines]);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return setTyped(total);
    setTyped(0);
    if (!enabled) return;

    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTyped((value) => {
          if (value >= total) window.clearInterval(interval);
          return Math.min(value + 1, total);
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [total, speed, startDelay, enabled]);

  const slice = useMemo(() => sliceTypedCode(lines, typed), [lines, typed]);
  return { ...slice, done: typed >= total };
}
