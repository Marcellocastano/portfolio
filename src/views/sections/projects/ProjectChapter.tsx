import { cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react';
import { useDomainTyping } from '../../../controllers/useDomainTyping';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { projectCssVars, type Project } from '../../../models/projects/projects.model';
import { WindowLights } from '../../components/showcase/Window';
import { ProjectInfo } from './ProjectInfo';
import './ProjectChapter.css';

interface Props {
  project: Project;
  active: boolean;
  first: boolean;
  revealed: boolean;
  demo: ReactNode;
}

export function ProjectChapter({ project, active, first, revealed, demo }: Props) {
  const chapter = useRevealOnce<HTMLDivElement>({ threshold: 0.15 });
  const shown = chapter.revealed && revealed;
  const domain = useDomainTyping(project.domain, shown && active);
  const gatedDemo = isValidElement<{ running: boolean }>(demo)
    ? cloneElement(demo, { running: Boolean(demo.props.running && shown) })
    : demo;

  return (
    <article
      id={`progetto-${project.id}`}
      className="chapter"
      data-active={active}
      data-first={first}
      data-chapter-revealed={chapter.revealed}
      style={projectCssVars(project) as CSSProperties}
      aria-hidden={!active}
      {...(active ? {} : { inert: '' })}
    >
      <ProjectInfo project={project} />
      <div className="chapter__stage" ref={chapter.ref}>
        <header className="chapter__bar">
          <WindowLights />
          <span className="chapter__domain">
            {domain.shown}
            <span className="chapter__caret" data-on={domain.caret} />
          </span>
        </header>
        <div className="chapter__demo">{gatedDemo}</div>
      </div>
    </article>
  );
}
