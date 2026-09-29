import { useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import type { Sticker } from '../models/stack/stickers.model';

interface Pt {
  x: number;
  y: number;
}

/** Drag degli adesivi con il mouse dentro il coperchio; posizioni solo in state. */
export function useStickerDrag(stickers: Sticker[], lidRef: RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState<Record<string, Pt>>(() =>
    Object.fromEntries(stickers.map((s) => [s.id, { x: s.x, y: s.y }])),
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [topId, setTopId] = useState<string | null>(null);
  const [dropId, setDropId] = useState<string | null>(null);
  const session = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const draggedIds = useRef(new Set<string>());

  const onPointerDown = (e: ReactPointerEvent, s: Sticker) => {
    if (e.pointerType !== 'mouse' || session.current) return;
    const lid = lidRef.current?.querySelector<HTMLElement>('.lap__lid') ?? lidRef.current;
    if (!lid) return;
    const p = pos[s.id];
    session.current = { id: s.id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, moved: false };

    const move = (ev: PointerEvent) => {
      const d = session.current;
      if (!d) return;
      const r = lid.getBoundingClientRect();
      if (Math.abs(ev.clientX - d.sx) + Math.abs(ev.clientY - d.sy) > 3) d.moved = true;
      if (!d.moved) return;
      if (d.id === session.current?.id) {
        setDraggingId(d.id);
        setTopId(d.id);
      }
      const nx = Math.min(96, Math.max(4, d.ox + ((ev.clientX - d.sx) / r.width) * 100));
      const ny = Math.min(92, Math.max(4, d.oy + ((ev.clientY - d.sy) / r.height) * 100));
      setPos((prev) => ({ ...prev, [d.id]: { x: nx, y: ny } }));
    };
    const up = () => {
      const d = session.current;
      window.removeEventListener('pointermove', move);
      if (d?.moved) {
        draggedIds.current.add(d.id);
        setDropId(d.id);
        window.setTimeout(() => setDropId((v) => (v === d.id ? null : v)), 300);
        window.setTimeout(() => draggedIds.current.delete(d.id), 300);
      }
      session.current = null;
      setDraggingId(null);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  };

  /** Vero se il click appena avvenuto era in realtà un drag: consuma il flag. */
  const wasDragged = (id: string) => {
    const had = draggedIds.current.has(id);
    draggedIds.current.delete(id);
    return had;
  };

  return { pos, draggingId, topId, dropId, onPointerDown, wasDragged };
}
