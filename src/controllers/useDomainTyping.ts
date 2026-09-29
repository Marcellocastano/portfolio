import { useEffect, useRef, useState } from 'react';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const CHAR_MS = 22;
const FIRST_DELAY_MS = 550;
const SWITCH_DELAY_MS = 150;

/** Digita il dominio carattere per carattere quando `active` diventa true. */
export function useDomainTyping(text: string, active: boolean) {
  const [len, setLen] = useState(text.length);
  const [started, setStarted] = useState(false);
  const firstRun = useRef(true);
  const reduced = useReducedMotion();
  const typing = active && !reduced;

  useEffect(() => {
    if (!typing) return;
    setLen(0);
    setStarted(false);
    const delay = firstRun.current ? FIRST_DELAY_MS : SWITCH_DELAY_MS;
    firstRun.current = false;
    const id = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(id);
  }, [typing]);

  useInterval(() => setLen((l) => Math.min(text.length, l + 1)), CHAR_MS, started && len < text.length);

  const shown = typing ? text.slice(0, len) : text;
  return { shown, caret: typing && len < text.length };
}
