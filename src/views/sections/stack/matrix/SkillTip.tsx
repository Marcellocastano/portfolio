import type { MouseEvent } from 'react';
import { requestProject } from '../../../../lib/projectNav';
import { projects } from '../../../../models/projects/projects.model';
import { COMPANIES, type Skill } from '../../../../models/stack/skills.model';
import './SkillTip.css';

function since(skill: Skill): string {
  const from = Math.floor(skill.since);
  return skill.until ? `Dal ${from} al ${Math.floor(skill.until)}` : `Dal ${from}`;
}

/** Dettaglio della tecnologia: popover su desktop, pannello in linea su mobile. */
export function SkillTip({ id, skill }: { id: string; skill: Skill }) {
  const used = projects.filter((p) => skill.usedIn.includes(p.id));
  const where = COMPANIES.filter((c) => skill.companies.includes(c.id)).map((c) => c.name);
  const go = (e: MouseEvent, projectId: string) => {
    e.preventDefault();
    requestProject(projectId);
  };

  return (
    <div className="stip" id={id} role="region" aria-label={`Dettagli ${skill.name}`}>
      <p className="stip__head">
        <strong>{skill.name}</strong> <span>{since(skill)}</span>
      </p>
      {skill.note && <p className="stip__note">{skill.note}</p>}
      <dl className="stip__meta">
        <div>
          <dt>In azienda</dt>
          <dd>{where.length ? where.join(', ') : 'Solo progetti personali'}</dd>
        </div>
        {used.length > 0 && (
          <div>
            <dt>Nei progetti</dt>
            <dd>
              {used.map((p) => (
                <a key={p.id} href={`#progetto-${p.id}`} onClick={(e) => go(e, p.id)}>
                  {p.name}
                </a>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
