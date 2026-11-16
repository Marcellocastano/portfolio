import type { CSSProperties, ReactNode } from 'react';
import { projectCssVars, type Project } from '../../../models/projects/projects.model';
import { ProjectInfo } from './ProjectInfo';
import './ProjectEntry.css';

interface Props {
  project: Project;
  index: number;
  open: boolean;
  onOpen: (index: number) => void;
  /** Su mobile la finestra demo sta dentro la voce aperta; su desktop è a fianco dell'indice. */
  children?: ReactNode;
}

/** Voce dell'indice: nome e tagline sempre visibili, dettagli e link quando è aperta. */
export function ProjectEntry({ project, index, open, onOpen, children }: Props) {
  const panelId = `progetto-${project.id}-dettagli`;

  return (
    <article
      id={`progetto-${project.id}`}
      className="pentry"
      data-open={open}
      style={projectCssVars(project) as CSSProperties}
    >
      <h3 className="pentry__heading">
        <button
          type="button"
          className="pentry__head"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpen(index)}
        >
          <i className="pentry__mark" aria-hidden="true" />
          <span className="pentry__name">{project.name}</span>
          <span className="pentry__tagline">{project.tagline}</span>
        </button>
      </h3>
      <div className="pentry__panel" id={panelId} {...(open ? {} : { inert: '' })}>
        <div className="pentry__inner">
          <ProjectInfo project={project} />
          {children}
        </div>
      </div>
    </article>
  );
}
