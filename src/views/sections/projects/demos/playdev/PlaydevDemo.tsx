import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { usePlaydevDemo } from '../../../../../controllers/usePlaydevDemo';
import { i18n } from '../../../../../models/i18n.model';
import { JsCube } from './JsCube';
import { PathList } from './PathList';
import { TestPanel } from './TestPanel';
import './PlaydevDemo.css';

export function PlaydevDemo({ running }: { running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { exercise, phase, chars, running: executing, states, round, run } = usePlaydevDemo(running && inView);
  const typed = exercise.code.join('\n').slice(0, chars);
  const done = phase === 'done';
  const levelPct = done ? exercise.levelEnd : exercise.levelStart;

  return (
    <div className="pd-demo" ref={ref}>
      <div className="pd-demo__main">
        <div className="pd-demo__level">
          <span>{i18n.demos.playdev.level(String(exercise.level).padStart(2, '0'))}</span>
          <div className="pd-demo__levelbar">
            <i style={{ width: `${levelPct}%` }} />
          </div>
          <span>{levelPct}%</span>
        </div>
        <p className="pd-demo__prompt">{exercise.prompt}</p>
        <div className="pd-demo__editor">
          <header className="pd-demo__filebar">
            <span className="pd-demo__file">somma.js</span>
            <button type="button" className="pd-demo__run" onClick={run} disabled={executing || done}>
              {i18n.demos.playdev.run}
            </button>
          </header>
          <pre className="pd-demo__code">
            <code>
              {typed}
              <span className="pd-demo__caret" data-on={phase === 'typing'} />
            </code>
          </pre>
        </div>
        <TestPanel tests={exercise.tests} states={states} done={done} />
      </div>

      <div className="pd-demo__side">
        <div className="pd-demo__cubebox">
          <JsCube bounced={done ? round + 1 : 0} />
          <span key={`xp-${round}`} className="pd-xp" data-on={done}>
            +{exercise.xpReward} XP
          </span>
        </div>
        <PathList />
      </div>
    </div>
  );
}
