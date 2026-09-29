import { useCallback, useEffect, useState } from 'react';
import { EXERCISE, testState, type PlayPhase } from '../models/projects/playdev.model';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const TYPE_MS = 40;
const TEST_MS = 550;
const DONE_MS = 3200;

const TOTAL_CHARS = EXERCISE.code.join('\n').length;

export function usePlaydevDemo(running: boolean) {
  const [phase, setPhase] = useState<PlayPhase>('typing');
  const [chars, setChars] = useState(0);
  const [runIndex, setRunIndex] = useState(-1);
  const [round, setRound] = useState(0);
  const reduced = useReducedMotion();

  const run = useCallback(() => {
    setChars(TOTAL_CHARS);
    setRunIndex(-1);
    setPhase('running');
  }, []);

  useInterval(() => setChars((c) => Math.min(TOTAL_CHARS, c + 2)), TYPE_MS, running && !reduced && phase === 'typing');
  useInterval(
    () => setRunIndex((i) => Math.min(EXERCISE.tests.length - 1, i + 1)),
    TEST_MS,
    running && phase === 'running',
  );

  useEffect(() => {
    if (!running) return;
    if (phase === 'typing' && chars >= TOTAL_CHARS) {
      const id = window.setTimeout(() => setPhase('running'), 500);
      return () => window.clearTimeout(id);
    }
    if (phase === 'running' && runIndex >= EXERCISE.tests.length - 1) {
      const id = window.setTimeout(() => setPhase('done'), TEST_MS);
      return () => window.clearTimeout(id);
    }
    if (phase === 'done') {
      const id = window.setTimeout(() => {
        setPhase('typing');
        setChars(0);
        setRunIndex(-1);
        setRound((r) => r + 1);
      }, DONE_MS);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [running, phase, chars, runIndex]);

  const effPhase: PlayPhase = reduced && phase === 'typing' ? 'done' : phase;
  return {
    exercise: EXERCISE,
    phase: effPhase,
    chars: effPhase === 'typing' ? chars : TOTAL_CHARS,
    running: effPhase === 'running',
    states: EXERCISE.tests.map((_, i) => testState(effPhase, runIndex, i)),
    round,
    run,
  };
}
