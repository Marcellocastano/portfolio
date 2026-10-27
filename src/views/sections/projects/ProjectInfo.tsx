import { i18n } from '../../../models/i18n.model';
import type { Project } from '../../../models/projects/projects.model';
import { ButtonLink } from '../../components/ButtonLink';
import './ProjectInfo.css';

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="pinfo">
      <h3 className="pinfo__name">{project.name}</h3>
      <p className="pinfo__tagline">{project.tagline}</p>
      <p className="pinfo__desc">{project.description}</p>
      <ul className="pinfo__stack">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="pinfo__status">
        <i aria-hidden="true" /> {i18n.projects.status[project.status]}
      </p>
      <div className="pinfo__links">
        {project.links.app && (
          <ButtonLink href={project.links.app} variant="accent">
            {i18n.projects.openApp}
          </ButtonLink>
        )}
        <ButtonLink href={project.links.code} variant="ghost">
          {i18n.projects.code}
        </ButtonLink>
      </div>
    </div>
  );
}
