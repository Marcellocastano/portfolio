import type { Sticker as StickerDef } from '../../../../models/stack/stickers.model';

/** Skin vinile condivisa: fronte dell'adesivo sul coperchio e della card. */
export function StickerFace({ sticker }: { sticker: StickerDef }) {
  return (
    <>
      <span className="stk__skin" style={{ background: sticker.bg, color: sticker.fg }}>
        <svg className="stk__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d={sticker.icon.path} fill="currentColor" />
        </svg>
        {sticker.shape === 'die-cut' && <b className="stk__name">{sticker.name}</b>}
      </span>
      <span className="stk__fold" aria-hidden="true" />
    </>
  );
}
