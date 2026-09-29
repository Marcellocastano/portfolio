import { BouncingPeriod } from './BouncingPeriod';
import { SplitText } from './SplitText';
import './SectionHeader.css';

interface Props {
  id: string;
  title: string;
  lede: string;
  revealed: boolean;
}

/** Intestazione condivisa delle sezioni: titolo animato + lede, sicura senza JS. */
export function SectionHeader({ id, title, lede, revealed }: Props) {
  return (
    <header className="section-header" data-revealed={revealed}>
      <h2 id={id} className="section-header__title" aria-label={`${title}.`}>
        <SplitText text={title} className="section-header__title-text" />
        <BouncingPeriod />
      </h2>
      <p className="section-header__lede">{lede}</p>
    </header>
  );
}
