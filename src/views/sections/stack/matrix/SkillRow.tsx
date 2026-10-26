import type { CSSProperties, FocusEvent, MouseEvent } from 'react';
import { overlap, toPct, TODAY, yearsLabel, type Company, type Skill } from '../../../../models/stack/skills.model';
import { SkillTip } from './SkillTip';
import './SkillRow.css';

interface Props {
  skill: Skill;
  index: number;
  company: Company | null;
  active: boolean;
  onActive: (id: string | null) => void;
}

/** Riga della matrice: etichetta con logo e anni, barra dal primo utilizzo a oggi. */
export function SkillRow({ skill, index, company, active, onActive }: Props) {
  const seg = company ? overlap(skill, company) : null;
  const tipId = `skill-${skill.id}-tip`;
  // Col mouse decide l'hover; il clic serve a tocco e tastiera.
  const onClick = (e: MouseEvent) => {
    if ((e.nativeEvent as PointerEvent).pointerType !== 'mouse') onActive(active ? null : skill.id);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) onActive(null);
  };
  const style = {
    '--c': skill.color,
    '--from': `${toPct(skill.since)}%`,
    '--to': `${toPct(skill.until ?? TODAY)}%`,
    '--i': index,
  } as CSSProperties;

  return (
    <li
      className="srow"
      style={style}
      data-active={active}
      data-dim={Boolean(company && !seg)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onActive(skill.id)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onActive(null)}
      onFocus={(e) => e.target.matches(':focus-visible') && onActive(skill.id)}
      onBlur={onBlur}
    >
      <button type="button" className="srow__label" aria-expanded={active} aria-controls={tipId} onClick={onClick}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={skill.path} />
        </svg>
        <span className="srow__text">
          <span className="srow__name">{skill.name}</span>
          <small className="srow__years">{yearsLabel(skill)}</small>
        </span>
      </button>
      <div className="srow__track">
        <i className="srow__bar" data-faded={Boolean(seg)} />
        {seg && <i className="srow__seg" style={{ '--from': `${seg.from}%`, '--to': `${seg.to}%` } as CSSProperties} />}
      </div>
      <SkillTip id={tipId} skill={skill} />
    </li>
  );
}
