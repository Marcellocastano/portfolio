import type { StickerCategory } from '../../../../models/stack/stickers.model';
import { STICKERS } from '../../../../models/stack/stickersData.model';
import './CategoryRow.css';

interface Cat {
  id: StickerCategory;
  label: string;
  color: string;
}

interface Props {
  cat: Cat;
  active: boolean;
  onCat: (c: StickerCategory | null) => void;
}

const lum = (hex: string): number => {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
};

/* Inchiostro leggibile sull'etichetta: scuro su colori chiari, carta su scuri. */
const inkFor = (hex: string): string => (lum(hex) > 0.5 ? '#1f2430' : '#f7f5ef');

/* Nei mini-adesivi il logo usa il colore brand; se troppo vicino al fondo, inchiostro. */
const fgOn = (bg: string, fg: string): string => (Math.abs(lum(bg) - lum(fg)) > 0.25 ? fg : inkFor(bg));

/** Riga del foglio: etichetta fustellata + mini-adesivi della categoria + conteggio. */
export function CategoryRow({ cat, active, onCat }: Props) {
  const minis = STICKERS.filter((s) => s.category === cat.id);
  return (
    <li>
      <button
        type="button"
        className="cr"
        data-active={active}
        onMouseEnter={() => onCat(cat.id)}
        onMouseLeave={() => onCat(null)}
        onFocus={() => onCat(cat.id)}
        onBlur={() => onCat(null)}
      >
        <span className="cr__tag" style={{ '--cc': cat.color, color: inkFor(cat.color) } as React.CSSProperties}>
          {cat.label}
        </span>
        <span className="cr__minis" aria-hidden="true">
          {minis.map((m, i) => (
            <span
              key={m.id}
              className="cr__mini"
              title={m.name}
              style={
                {
                  background: m.bg,
                  color: fgOn(m.bg, m.fg),
                  '--mr': `${(i % 2 ? -1 : 1) * (5 + ((i * 7) % 4))}deg`,
                } as React.CSSProperties
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={m.icon.path} fill="currentColor" />
              </svg>
            </span>
          ))}
        </span>
        <b className="cr__count">{minis.length}</b>
      </button>
    </li>
  );
}
