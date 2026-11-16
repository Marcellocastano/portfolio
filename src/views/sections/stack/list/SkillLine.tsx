import type { CSSProperties } from 'react';
import {
  COMPANIES,
  overlap,
  toPct,
  TODAY,
  yearsLabel,
  type Company,
  type Skill,
} from '../../../../models/stack/skills.model';
import { SkillTip } from '../matrix/SkillTip';
import './SkillLine.css';

interface Props {
  skill: Skill;
  index: number;
  /** Azienda scelta: le tecnologie non usate lì si attenuano. */
  company: Company | null;
  open: boolean;
  onToggle: () => void;
}

/** Riga della lista mobile: logo, nome e anni, sotto la barra nel tempo a tratti colorati per azienda. */
export function SkillLine({ skill, index, company, open, onToggle }: Props) {
  const tipId = `skill-${skill.id}-tip-m`;
  const segments = COMPANIES.flatMap((c) => {
    const seg = overlap(skill, c);
    return seg ? [{ company: c, ...seg }] : [];
  });
  const style = { '--c': skill.color, '--i': index } as CSSProperties;
  const span = {
    '--from': `${toPct(skill.since)}%`,
    '--to': `${toPct(skill.until ?? TODAY)}%`,
  } as CSSProperties;

  return (
    <li className="mskill" style={style} data-open={open} data-dim={Boolean(company && !overlap(skill, company))}>
      <button type="button" className="mskill__head" aria-expanded={open} aria-controls={tipId} onClick={onToggle}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={skill.path} />
        </svg>
        <span className="mskill__name">{skill.name}</span>
        <small className="mskill__years">{yearsLabel(skill)}</small>
        <i className="mskill__chev" aria-hidden="true" />
      </button>
      <div className="mskill__track" aria-hidden="true">
        <i className="mskill__span" style={span} />
        {segments.map((s) => (
          <i
            key={s.company.id}
            className="mskill__seg"
            data-lit={!company || company.id === s.company.id}
            style={{ '--from': `${s.from}%`, '--to': `${s.to}%`, '--company': s.company.color } as CSSProperties}
          />
        ))}
      </div>
      <SkillTip id={tipId} skill={skill} />
    </li>
  );
}
