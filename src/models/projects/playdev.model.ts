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

export const EXERCISE: PlayExercise = {
  title: 'La tua prima funzione',
  prompt: 'Scrivi una funzione somma(a, b) che restituisca la somma dei due numeri.',
  code: ['function somma(a, b) {', '  return a + b;', '}'],
  tests: [{ label: 'somma(2, 3) === 5' }, { label: 'somma(-1, 1) === 0' }, { label: 'somma(0.5, 0.5) === 1' }],
  xpReward: 20,
  level: 5,
  levelStart: 55,
  levelEnd: 70,
};

export const PATHS = [
  { name: 'JavaScript', tag: 'JS', status: 'In corso' },
  { name: 'Vue', tag: 'Vue', status: 'Prossimamente' },
  { name: 'React', tag: 'React', status: 'Prossimamente' },
];

export const CONSOLE_LINE = '3 test superati in 12ms';

/** Stati del test in sequenza: indice del test in esecuzione, -1 = nessuno. */
export function testState(phase: PlayPhase, runningIndex: number, testIndex: number): 'wait' | 'run' | 'pass' {
  if (phase === 'done') return 'pass';
  if (phase === 'typing' || testIndex > runningIndex) return 'wait';
  return testIndex === runningIndex ? 'run' : 'pass';
}
