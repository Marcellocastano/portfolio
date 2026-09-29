import { CATEGORIES, type StickerCategory } from '../../../../models/stack/stickers.model';
import { STICKERS } from '../../../../models/stack/stickersData.model';
import './StickerPanel.css';

interface Props {
  activeCat: StickerCategory | null;
  onCat: (c: StickerCategory | null) => void;
}

/** Pannello laterale: intro + legenda delle categorie che evidenzia gli adesivi. */
export function StickerPanel({ activeCat, onCat }: Props) {
  return (
    <aside className="sp">
      <div className="sp__intro">
        <p>Il mio portatile, come quello di ogni sviluppatore: pieno di adesivi. Trascinali o cliccali.</p>
        <ul className="sp__legend">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="sp__cat"
                data-active={activeCat === c.id}
                onMouseEnter={() => onCat(c.id)}
                onMouseLeave={() => onCat(null)}
                onFocus={() => onCat(c.id)}
                onBlur={() => onCat(null)}
              >
                <i className="sp__dot" style={{ background: c.color }} />
                {c.label}
                <b className="sp__count">{STICKERS.filter((s) => s.category === c.id).length}</b>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
