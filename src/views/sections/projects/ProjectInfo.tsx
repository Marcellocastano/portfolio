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
        <i aria-hidden="true" /> {project.status}
      </p>
      <div className="pinfo__links">
        <ButtonLink href={project.links.app} variant="accent">
          Apri l&apos;app
        </ButtonLink>
        <ButtonLink href={project.links.code} variant="ghost">
          Codice
        </ButtonLink>
      </div>
    </div>
  );
}
