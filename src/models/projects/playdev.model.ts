import { i18n } from '../i18n.model';

export interface PlayTest {
  label: string;
}

export interface PlayExercise {
  title: string;
  prompt: string;
  code: string[];
  tests: PlayTest[];
  xpReward: number;
  level: number;
  levelStart: number;
  levelEnd: number;
}

export type PlayPhase = 'typing' | 'running' | 'done';
export type PathStatus = keyof typeof i18n.demos.playdev.statuses;

export const EXERCISE: PlayExercise = {
  title: i18n.demos.playdev.exercise.title,
  prompt: i18n.demos.playdev.exercise.prompt,
  code: ['function somma(a, b) {', '  return a + b;', '}'],
  tests: [{ label: 'somma(2, 3) === 5' }, { label: 'somma(-1, 1) === 0' }, { label: 'somma(0.5, 0.5) === 1' }],
  xpReward: 20,
  level: 5,
  levelStart: 55,
  levelEnd: 70,
};

export const PATHS: { name: string; tag: string; status: PathStatus }[] = [
  { name: 'JavaScript', tag: 'JS', status: 'active' },
  { name: 'Vue', tag: 'Vue', status: 'soon' },
  { name: 'React', tag: 'React', status: 'soon' },
];

export const CONSOLE_LINE = i18n.demos.playdev.consoleLine;

/** Stati del test in sequenza: indice del test in esecuzione, -1 = nessuno. */
export function testState(phase: PlayPhase, runningIndex: number, testIndex: number): 'wait' | 'run' | 'pass' {
  if (phase === 'done') return 'pass';
  if (phase === 'typing' || testIndex > runningIndex) return 'wait';
  return testIndex === runningIndex ? 'run' : 'pass';
}
