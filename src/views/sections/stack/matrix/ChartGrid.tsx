import type { CSSProperties } from 'react';
import { i18n } from '../../../../models/i18n.model';
import { toPct, YEARS, type Company, type CompanyId } from '../../../../models/stack/skills.model';
import './ChartGrid.css';

interface Props {
  companies: Company[];
  lit: CompanyId[];
}

/** Sfondo del grafico: asse degli anni e fasce delle aziende, allineati alla colonna delle barre. */
export function ChartGrid({ companies, lit }: Props) {
  return (
    <div className="grid" aria-hidden="true">
      <div className="grid__axis">
        {YEARS.map((y) => (
          <span key={y} style={{ '--x': `${toPct(y)}%` } as CSSProperties}>
            {y}
          </span>
        ))}
        <span className="grid__today" style={{ '--x': '100%' } as CSSProperties}>
          {i18n.stack.today}
        </span>
      </div>
      <div className="grid__plot">
        {companies.map((c, i) => (
          <i
            key={c.id}
            className="grid__band"
            data-lit={lit.includes(c.id)}
            style={
              {
                '--c': c.color,
                '--from': `${toPct(c.start)}%`,
                '--to': `${toPct(c.end)}%`,
                '--i': i,
              } as CSSProperties
            }
          />
        ))}
        {YEARS.map((y) => (
          <b key={y} className="grid__line" style={{ '--x': `${toPct(y)}%` } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
