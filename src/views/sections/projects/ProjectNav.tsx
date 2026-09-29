import type { CSSProperties } from 'react';
import type { Project } from '../../../models/projects/projects.model';
import './ProjectNav.css';

interface Props {
  projects: Project[];
  active: number;
  onSelect: (index: number) => void;
}

export function ProjectNav({ projects, active, onSelect }: Props) {
  return (
    <nav className="projects-nav" aria-label="Progetti">
      <ul className="projects-nav__list">
        {projects.map((project, i) => (
          <li key={project.id} style={{ '--i': i } as CSSProperties}>
            <button
              type="button"
              className="projects-nav__item"
              data-active={i === active}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => onSelect(i)}
            >
              <span className="projects-nav__icon" style={{ background: project.theme.accent }} aria-hidden="true" />
              <span className="projects-nav__name">{project.name}</span>
              <span className="projects-nav__bar" aria-hidden="true">
                <i />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
