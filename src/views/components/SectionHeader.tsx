import { BouncingPeriod } from './BouncingPeriod';
import { SplitText } from './SplitText';
import './SectionHeader.css';

interface Props {
  id: string;
  title: string;
  lede?: string;
  revealed: boolean;
  size?: 'lg' | 'md';
}

/** Intestazione condivisa delle sezioni: titolo animato + lede, sicura senza JS. */
export function SectionHeader({ id, title, lede, revealed, size = 'lg' }: Props) {
  return (
    <header className="section-header" data-revealed={revealed} data-size={size}>
      <h2 id={id} className="section-header__title" aria-label={`${title}.`}>
        <SplitText text={title} className="section-header__title-text" />
        <BouncingPeriod />
      </h2>
      {lede && <p className="section-header__lede">{lede}</p>}
    </header>
  );
}
