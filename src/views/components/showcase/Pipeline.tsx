import type { CSSProperties } from 'react';
import { stageInfo } from '../../../models/showcase/pipeline.model';
import { stageDurations, type PipelineStep } from '../../../models/showcase/timeline.model';
import { StageIcon } from '../icons/StageIcon';
import './Pipeline.css';

export function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <ol className="pipeline" aria-hidden="true">
      {steps.map(({ id, state }) => (
        <li
          key={id}
          className="pipeline__step"
          data-state={state}
          style={{ '--duration': `${stageDurations[id]}ms` } as CSSProperties}
        >
          <span className="pipeline__node">
            <StageIcon stage={id} />
          </span>
          <span className="pipeline__text">
            <strong>{stageInfo[id].label}</strong>
            <span>{stageInfo[id].output}</span>
          </span>
          <span className="pipeline__progress" />
        </li>
      ))}
    </ol>
  );
}
