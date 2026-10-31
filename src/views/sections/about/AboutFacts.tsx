import type { CSSProperties } from 'react';
import { i18n } from '../../../models/i18n.model';
import type { Fact } from '../../../models/about.model';
import './AboutFacts.css';

export function AboutFacts({ facts }: { facts: Fact[] }) {
  return (
    <aside className="facts" aria-labelledby="facts-title">
      <div className="facts__sheet">
        <h3 id="facts-title" className="facts__title">
          {i18n.about.factsTitle}
        </h3>
        <dl className="facts__list">
          {facts.map((f, i) => (
            <div key={f.label} className="facts__row" style={{ '--i': i } as CSSProperties}>
              <dt>{f.label}</dt>
              <dd>
                <span className="facts__hl">{f.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
