import type { Project } from '../../../models/projects/projects.model';
import { ButtonLink } from '../../components/ButtonLink';
import './ProjectInfo.css';

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="chapter__info">
      <h3 className="chapter__name">
        <span className="chapter__name-text">{project.name}</span>
      </h3>
      <p className="chapter__tagline">{project.tagline}</p>
      <p className="chapter__desc">{project.description}</p>
      <ul className="chapter__stack">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="chapter__status">
        <i aria-hidden="true" /> {project.status}
      </p>
      <div className="chapter__links">
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
