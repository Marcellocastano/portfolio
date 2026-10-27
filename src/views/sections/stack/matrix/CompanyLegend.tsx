import type { CSSProperties } from 'react';
import { i18n } from '../../../../models/i18n.model';
import type { Company, CompanyId } from '../../../../models/stack/skills.model';
import './CompanyLegend.css';

interface Props {
  companies: Company[];
  lit: CompanyId[];
  onHover: (id: CompanyId | null) => void;
}

/** Aziende in ordine cronologico: al passaggio accendono le tecnologie usate lì. */
export function CompanyLegend({ companies, lit, onHover }: Props) {
  return (
    <ul className="legend" aria-label={i18n.stack.legendAria}>
      {companies.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            className="legend__item"
            data-lit={lit.includes(c.id)}
            style={{ '--c': c.color } as CSSProperties}
            onPointerEnter={() => onHover(c.id)}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onHover(c.id)}
            onBlur={() => onHover(null)}
          >
            <i aria-hidden="true" />
            <span>
              <strong>{c.name}</strong>
              <small>
                {c.role}, {c.period}
              </small>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
