import { useState } from 'react';
import { CATEGORIES, COMPANIES, type CompanyId } from '../../../../models/stack/skills.model';
import { SKILLS } from '../../../../models/stack/skillsData.model';
import { ChartGrid } from './ChartGrid';
import { CompanyLegend } from './CompanyLegend';
import { SkillRow } from './SkillRow';
import './SkillMatrix.css';

/** Matrice competenze nel tempo: una barra per tecnologia, fasce verticali per azienda. */
export function SkillMatrix() {
  const [company, setCompany] = useState<CompanyId | null>(null);
  const [skillId, setSkillId] = useState<string | null>(null);
  const skill = SKILLS.find((s) => s.id === skillId) ?? null;
  const activeCompany = COMPANIES.find((c) => c.id === company) ?? null;
  const lit = skill?.companies ?? (company ? [company] : []);

  return (
    <div className="matrix" data-focus={company || skill ? 'true' : 'false'}>
      <CompanyLegend companies={COMPANIES} lit={lit} onHover={setCompany} />
      <div className="matrix__chart">
        <ChartGrid companies={COMPANIES} lit={lit} />
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="matrix__group" aria-labelledby={`cat-${cat.id}`}>
            <h3 id={`cat-${cat.id}`} className="matrix__cat">
              {cat.label}
            </h3>
            <ul className="matrix__rows">
              {SKILLS.filter((s) => s.category === cat.id).map((s) => (
                <SkillRow
                  key={s.id}
                  skill={s}
                  index={SKILLS.indexOf(s)}
                  company={activeCompany}
                  active={skillId === s.id}
                  onActive={setSkillId}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
