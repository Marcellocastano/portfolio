import { i18n } from '../../../models/i18n.model';
import type { Fact } from '../../../models/about.model';
import './AboutFacts.css';

/** Dati rapidi in una lista a due colonne, nella palette del sito. */
export function AboutFacts({ facts }: { facts: Fact[] }) {
  return (
    <section className="facts" aria-labelledby="facts-title">
      <h3 id="facts-title" className="facts__title">
        {i18n.about.factsTitle}
      </h3>
      <dl className="facts__list">
        {facts.map((f) => (
          <div key={f.label} className="facts__row">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
