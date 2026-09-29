import { useRef, useState } from 'react';
import { useStickerDrag } from '../../../../controllers/useStickerDrag';
import { useStickerPeel } from '../../../../controllers/useStickerPeel';
import type { Sticker as StickerDef, StickerCategory } from '../../../../models/stack/stickers.model';
import { STICKERS } from '../../../../models/stack/stickersData.model';
import { Laptop } from './Laptop';
import { Sticker } from './Sticker';
import { StickerCard } from './StickerCard';
import { StickerPanel } from './StickerPanel';
import './Stickers.css';

/** Il coperchio con gli adesivi + pannello laterale. */
export function Stickers() {
  const lid = useRef<HTMLDivElement>(null);
  const drag = useStickerDrag(STICKERS, lid);
  const peel = useStickerPeel();
  const [cat, setCat] = useState<StickerCategory | null>(null);

  const onSelect = (s: StickerDef, el: HTMLElement) => {
    if (drag.wasDragged(s.id)) return;
    peel.open(s, el);
  };

  return (
    <div className="stick">
      <div ref={lid} className="stick__desk">
        <Laptop>
          {STICKERS.map((s, i) => (
            <Sticker
              key={s.id}
              sticker={s}
              index={i}
              x={drag.pos[s.id]?.x ?? s.x}
              y={drag.pos[s.id]?.y ?? s.y}
              ghost={peel.state?.sticker.id === s.id}
              dim={cat !== null && s.category !== cat}
              lift={cat === s.category}
              dragging={drag.draggingId === s.id}
              drop={drag.dropId === s.id || peel.attachId === s.id}
              top={drag.topId === s.id}
              onPointerDown={drag.onPointerDown}
              onSelect={onSelect}
            />
          ))}
        </Laptop>
      </div>
      <StickerPanel activeCat={cat} onCat={setCat} />
      {peel.state && <StickerCard peel={peel.state} onClose={peel.close} />}
    </div>
  );
}
