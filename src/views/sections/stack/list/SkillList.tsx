import { useState, type CSSProperties } from 'react';
import { i18n } from '../../../../models/i18n.model';
import { CATEGORIES, COMPANIES, toPct, TODAY, type CompanyId } from '../../../../models/stack/skills.model';
import { SKILLS } from '../../../../models/stack/skillsData.model';
import { CompanyChips } from './CompanyChips';
import { SkillLine } from './SkillLine';
import './SkillList.css';

/** Tacche dell'asse: un anno sì e uno no, più "oggi" in fondo. */
const TICKS = [2018, 2020, 2022, 2024].map((y) => ({ label: String(y), at: toPct(y) }));
TICKS.push({ label: i18n.stack.today, at: toPct(TODAY) });

/**
 * Lo Stack sui telefoni, con gli stessi dati della matrice: una riga a tutta larghezza per tecnologia, con la barra
 * dal 2018 a oggi colorata a tratti con l'azienda in cui la usavo. Toccando un'azienda si accendono le tecnologie
 * usate lì; toccando una riga si apre il suo dettaglio. Su schermi più larghi c'è la matrice (SkillMatrix).
 */
export function SkillList() {
  const [company, setCompany] = useState<CompanyId | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const active = COMPANIES.find((c) => c.id === company) ?? null;

  return (
    <div className="mstack" data-focus={Boolean(active)}>
      <CompanyChips
        companies={COMPANIES}
        active={company}
        onToggle={(id) => setCompany((c) => (c === id ? null : id))}
      />
      <p className="mstack__hint" aria-live="polite">
        {active ? `${active.role}, ${active.period}` : i18n.stack.pickCompany}
      </p>
      <ol className="mstack__axis" aria-hidden="true">
        {TICKS.map((t) => (
          <li key={t.label} style={{ '--x': `${t.at}%` } as CSSProperties}>
            {t.label}
          </li>
        ))}
      </ol>
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="mstack__group" aria-labelledby={`mcat-${cat.id}`}>
          <h3 id={`mcat-${cat.id}`} className="mstack__cat">
            {cat.label}
          </h3>
          <ul className="mstack__rows">
            {SKILLS.filter((s) => s.category === cat.id).map((s) => (
              <SkillLine
                key={s.id}
                skill={s}
                index={SKILLS.indexOf(s)}
                company={active}
                open={open === s.id}
                onToggle={() => setOpen((o) => (o === s.id ? null : s.id))}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
