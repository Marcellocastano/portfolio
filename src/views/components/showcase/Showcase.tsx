import { useRef } from 'react';
import { useParallax } from '../../../controllers/useParallax';
import { useShowcase } from '../../../controllers/useShowcase';
import { i18n } from '../../../models/i18n.model';
import { profile } from '../../../models/profile.model';
import { Cursor } from './Cursor';
import { Pipeline } from './Pipeline';
import { BrowserWindow, CodeWindow, DesignWindow } from './ShowcaseWindows';
import './Showcase.css';

const DESCRIPTION = i18n.hero.showcaseAria(profile.firstName);

export function Showcase({ cursorLabel }: { cursorLabel: string }) {
  const parallax = useParallax<HTMLDivElement>();
  const targets = { card: useRef<HTMLDivElement>(null), drop: useRef<HTMLDivElement>(null) };
  const { phase, stage, pipeline, column, lifted, cursorTarget, reveal, code } = useShowcase();

  return (
    <div className="showcase-wrap">
      <Pipeline steps={pipeline} />

      <div className="showcase" data-phase={phase} role="img" aria-label={DESCRIPTION} {...parallax}>
        <DesignWindow active={stage === 'design'} />
        <CodeWindow active={stage === 'code'} {...code} />
        <BrowserWindow
          active={stage === 'browser'}
          reloading={stage === 'code' && reveal > 0}
          reveal={reveal}
          column={column}
          lifted={lifted}
          dragging={phase === 'drag'}
          cardRef={targets.card}
          dropRef={targets.drop}
        />
        <Cursor
          stageRef={parallax.ref}
          target={cursorTarget ? targets[cursorTarget] : null}
          clicking={lifted}
          label={cursorLabel}
        />
      </div>
    </div>
  );
}
