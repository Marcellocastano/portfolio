import type { CSSProperties } from 'react';
import { i18n } from '../../../../models/i18n.model';
import type { Company, CompanyId } from '../../../../models/stack/skills.model';

interface Props {
  companies: Company[];
  active: CompanyId | null;
  onToggle: (id: CompanyId) => void;
}

/** Aziende come interruttori: un tocco accende le tecnologie usate lì, un secondo tocco torna a tutte. */
export function CompanyChips({ companies, active, onToggle }: Props) {
  return (
    <ul className="mchips" aria-label={i18n.stack.legendAria}>
      {companies.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            className="mchips__item"
            aria-pressed={active === c.id}
            style={{ '--c': c.color } as CSSProperties}
            onClick={() => onToggle(c.id)}
          >
            <i aria-hidden="true" />
            {c.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
