import { useRef } from 'react';
import { useTitleScrub } from '../../controllers/useTitleScrub';
import { SplitText } from './SplitText';
import './SectionHeader.css';

interface Props {
  id: string;
  title: string;
  lede?: string;
  revealed: boolean;
  size?: 'lg' | 'md';
}

/** Intestazione condivisa delle sezioni: titolo che emerge con lo scroll + lede, leggibile anche senza JS. */
export function SectionHeader({ id, title, lede, revealed, size = 'lg' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  useTitleScrub(ref);

  return (
    <header className="section-header" data-revealed={revealed} data-size={size}>
      <h2 ref={ref} id={id} className="section-header__title" aria-label={title}>
        <SplitText text={title} className="section-header__title-text" />
      </h2>
      {lede && <p className="section-header__lede">{lede}</p>}
    </header>
  );
}
