import { CONSOLE_LINE, type PlayTest } from '../../../../../models/projects/playdev.model';
import './TestPanel.css';

type TestState = 'wait' | 'run' | 'pass';

function TestIcon({ state }: { state: TestState }) {
  return (
    <svg viewBox="0 0 24 24" className="pd-tests__icon" data-state={state} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      {state === 'pass' && (
        <path d="M8 12.5l2.7 2.7L16.5 9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function TestPanel({ tests, states, done }: { tests: PlayTest[]; states: TestState[]; done: boolean }) {
  return (
    <>
      <ul className="pd-tests">
        {tests.map((test, i) => (
          <li key={test.label} data-state={states[i]}>
            <TestIcon state={states[i]} /> {test.label}
          </li>
        ))}
      </ul>
      <p className="pd-tests__console" data-on={done}>
        {CONSOLE_LINE}
      </p>
    </>
  );
}
