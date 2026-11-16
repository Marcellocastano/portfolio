import type { ReactNode } from 'react';
import { useStageEnter } from '../../../controllers/useStageEnter';
import type { Project } from '../../../models/projects/projects.model';
import { projectCssVars } from '../../../models/projects/projects.model';
import { ProjectWindow } from './ProjectWindow';

interface Props {
  project: Project;
  children: ReactNode;
}

/** Finestra della demo del progetto aperto: a ogni cambio rientra e ridigita il dominio. */
export function ProjectStage({ project, children }: Props) {
  const ref = useStageEnter<HTMLDivElement>(project.id);

  return (
    <div ref={ref} className="projects__stage" style={projectCssVars(project)}>
      <ProjectWindow key={project.id} domain={project.domain}>
        {children}
      </ProjectWindow>
      <i className="projects__wipe" aria-hidden="true" />
    </div>
  );
}
