import { countChars } from '../code.model';
import type { ColumnId } from './board.model';
import { BOARD_LINE, boardCode } from './boardCode.model';

export type ShowcasePhase = 'design' | 'code' | 'approach' | 'grab' | 'drag' | 'drop' | 'reset';
export type ShowcaseStage = 'design' | 'code' | 'browser';
export type StepState = 'todo' | 'active' | 'done';
export type CursorTarget = 'card' | 'drop';

export interface PipelineStep {
  id: ShowcaseStage;
  state: StepState;
}

const STAGES: ShowcaseStage[] = ['design', 'code', 'browser'];
export const TYPING = { speed: 26, startDelay: 250 };
export const INITIAL_PHASE: ShowcasePhase = 'design';
export const REDUCED_MOTION_PHASE: ShowcasePhase = 'drop';

interface PhaseConfig {
  stage: ShowcaseStage;
  next: ShowcasePhase;
  delay: number;
  cursor?: CursorTarget;
}

export const PHASES: Record<ShowcasePhase, PhaseConfig> = {
  design: { stage: 'design', next: 'code', delay: 2600 },
  code: { stage: 'code', next: 'approach', delay: 700 },
  approach: { stage: 'browser', next: 'grab', delay: 1000, cursor: 'card' },
  grab: { stage: 'browser', next: 'drag', delay: 350, cursor: 'card' },
  drag: { stage: 'browser', next: 'drop', delay: 1000, cursor: 'drop' },
  drop: { stage: 'browser', next: 'reset', delay: 3000, cursor: 'drop' },
  reset: { stage: 'browser', next: 'design', delay: 700 },
};

const totalDelay = (...phases: ShowcasePhase[]) => phases.reduce((sum, phase) => sum + PHASES[phase].delay, 0);

export const stageDurations: Record<ShowcaseStage, number> = {
  design: totalDelay('design'),
  code: TYPING.startDelay + countChars(boardCode) * TYPING.speed + totalDelay('code'),
  browser: totalDelay('approach', 'grab', 'drag', 'drop'),
};

const MOVED_PHASES: ShowcasePhase[] = ['drag', 'drop', 'reset'];
const LIFTED_PHASES: ShowcasePhase[] = ['grab', 'drag'];

export const cardColumn = (phase: ShowcasePhase): ColumnId => (MOVED_PHASES.includes(phase) ? 'sviluppo' : 'idee');
export const isCardLifted = (phase: ShowcasePhase) => LIFTED_PHASES.includes(phase);
export const flashLinesFor = (phase: ShowcasePhase): number[] =>
  phase === 'drop' ? [BOARD_LINE.kanban, BOARD_LINE.state] : [];

function stepState(index: number, current: number, phase: ShowcasePhase): StepState {
  if (phase === 'reset' || index < current) return 'done';
  return index === current ? 'active' : 'todo';
}

export function pipelineFor(phase: ShowcasePhase): PipelineStep[] {
  const current = STAGES.indexOf(PHASES[phase].stage);
  return STAGES.map((id, index) => ({ id, state: stepState(index, current, phase) }));
}
