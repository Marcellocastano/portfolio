import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import { projectCssVars, type Project } from '../../../models/projects/projects.model';
import { BookSpine } from './BookSpine';
import { ProjectInfo } from './ProjectInfo';
import { ProjectWindow } from './ProjectWindow';
import './ProjectBook.css';

interface Props {
  project: Project;
  index: number;
  open: boolean;
  onOpen: (index: number) => void;
  demo: ReactNode;
}

/** Un progetto come libro: costa verticale da chiuso, pagine con info e demo da aperto. */
export function ProjectBook({ project, index, open, onOpen, demo }: Props) {
  const contentId = `progetto-${project.id}-pagine`;
  // Solo movimento reale del mouse: lo scroll che porta un libro sotto il puntatore non lo apre.
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && !open && (e.movementX || e.movementY)) onOpen(index);
  };

  return (
    <article
      id={`progetto-${project.id}`}
      className="book"
      data-open={open}
      style={{ ...projectCssVars(project), '--i': index } as CSSProperties}
      onPointerMove={onPointerMove}
      aria-label={project.name}
    >
      <BookSpine name={project.name} open={open} controls={contentId} onOpen={() => onOpen(index)} />
      <div className="book__pages" id={contentId} aria-hidden={!open} {...(open ? {} : { inert: '' })}>
        <div className="book__inner">
          <ProjectInfo project={project} />
          <ProjectWindow domain={project.domain} open={open}>
            {demo}
          </ProjectWindow>
        </div>
      </div>
    </article>
  );
}
