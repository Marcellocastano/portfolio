import type { CSSProperties, PointerEvent } from 'react';
import type { Sticker as StickerDef } from '../../../../models/stack/stickers.model';
import { StickerFace } from './StickerFace';
import './Sticker.css';
import './StickerMotion.css';

interface Props {
  sticker: StickerDef;
  index: number;
  x: number;
  y: number;
  ghost: boolean;
  dim: boolean;
  lift: boolean;
  dragging: boolean;
  drop: boolean;
  top: boolean;
  onPointerDown: (e: PointerEvent, s: StickerDef) => void;
  onSelect: (s: StickerDef, el: HTMLElement) => void;
}

export function Sticker({
  sticker,
  index,
  x,
  y,
  ghost,
  dim,
  lift,
  dragging,
  drop,
  top,
  onPointerDown,
  onSelect,
}: Props) {
  let z = 1;
  if (top) z = 30;
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    zIndex: z,
    '--r': `${sticker.rotate}deg`,
    '--i': index,
  } as CSSProperties;
  return (
    <button
      type="button"
      className="stk"
      data-stk-id={sticker.id}
      data-shape={sticker.shape}
      data-size={sticker.size}
      data-ghost={ghost}
      data-dim={dim}
      data-lift={lift}
      data-dragging={dragging}
      data-drop={drop}
      style={style}
      aria-label={sticker.name}
      aria-pressed={ghost}
      onPointerDown={(e) => onPointerDown(e, sticker)}
      onClick={(e) => onSelect(sticker, e.currentTarget)}
    >
      <StickerFace sticker={sticker} />
    </button>
  );
}
