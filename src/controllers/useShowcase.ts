import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { boardCode } from '../models/showcase/boardCode.model';
import {
  cardColumn,
  flashLinesFor,
  INITIAL_PHASE,
  isCardLifted,
  PHASES,
  pipelineFor,
  REDUCED_MOTION_PHASE,
  TYPING,
  type ShowcasePhase,
} from '../models/showcase/timeline.model';
import { useCodeTyping } from './useCodeTyping';

function usePhaseState() {
  const [phase, setPhase] = useState<ShowcasePhase>(INITIAL_PHASE);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion()) return;
    setReduced(true);
    setPhase(REDUCED_MOTION_PHASE);
  }, []);

  return { phase, setPhase, reduced };
}

function usePhaseTimer(phase: ShowcasePhase, setPhase: (next: ShowcasePhase) => void, paused: boolean) {
  useEffect(() => {
    if (paused) return;
    const { next, delay } = PHASES[phase];
    const id = window.setTimeout(() => setPhase(next), delay);
    return () => window.clearTimeout(id);
  }, [phase, setPhase, paused]);
}

export function useShowcase() {
  const { phase, setPhase, reduced } = usePhaseState();
  const typing = useCodeTyping(boardCode, { enabled: phase !== 'design', ...TYPING });
  usePhaseTimer(phase, setPhase, reduced || (phase === 'code' && !typing.done));

  return {
    phase,
    stage: PHASES[phase].stage,
    pipeline: pipelineFor(phase),
    column: cardColumn(phase),
    lifted: isCardLifted(phase),
    cursorTarget: reduced ? undefined : PHASES[phase].cursor,
    reveal: typing.done ? Infinity : typing.completedLines,
    code: {
      lines: typing.visibleLines.map((line) => line.tokens),
      activeLine: typing.done ? boardCode.length - 1 : typing.visibleLines.findIndex((line) => line.active),
      idle: typing.done,
      flashLines: flashLinesFor(phase),
    },
  };
}
