import { i18n } from '../../../../models/i18n.model';
import { CATEGORIES, type StickerCategory } from '../../../../models/stack/stickers.model';
import { CategoryRow } from './CategoryRow';
import './StickerPanel.css';

interface Props {
  activeCat: StickerCategory | null;
  onCat: (c: StickerCategory | null) => void;
}

/** Il foglio degli adesivi: intro + una riga per categoria. */
export function StickerPanel({ activeCat, onCat }: Props) {
  return (
    <aside className="sp paper-sheet">
      <p className="sp__intro">
        {i18n.stack.stickers.intro} <mark>{i18n.stack.stickers.drag}</mark> {i18n.stack.stickers.or}{' '}
        <mark>{i18n.stack.stickers.click}</mark>.
      </p>
      <ul className="sp__legend">
        {CATEGORIES.map((c) => (
          <CategoryRow key={c.id} cat={c} active={activeCat === c.id} onCat={onCat} />
        ))}
      </ul>
    </aside>
  );
}
