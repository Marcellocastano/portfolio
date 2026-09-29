import { useCallback, useEffect, useRef, useState } from 'react';
import type { Sticker } from '../models/stack/stickers.model';

export type PeelPhase = 'peel' | 'fly' | 'open' | 'closing';

export interface PeelBox {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
}

export interface PeelState {
  sticker: Sticker;
  phase: PeelPhase;
  start: PeelBox;
}

const boxFrom = (r: { left: number; top: number; width: number; height: number }, rot: number): PeelBox => ({
  x: r.left,
  y: r.top,
  w: r.width,
  h: r.height,
  rot,
});

/** Focus trap minimale: Tab cicla tra i focusabili della card. */
function trapTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return;
  const els = document.querySelectorAll<HTMLElement>('.sc__card a[href], .sc__card button');
  if (els.length === 0) return;
  if (e.shiftKey && document.activeElement === els[0]) {
    e.preventDefault();
    els[els.length - 1].focus();
  } else if (!e.shiftKey && document.activeElement === els[els.length - 1]) {
    e.preventDefault();
    els[0].focus();
  }
}

/** Stato del peel: adesivo che si stacca, vola al centro e si gira. */
export function useStickerPeel() {
  const [state, setState] = useState<PeelState | null>(null);
  const [attachId, setAttachId] = useState<string | null>(null);
  const cur = useRef<PeelState | null>(null);
  const timers = useRef<number[]>([]);

  const sync = (v: PeelState | null) => {
    cur.current = v;
    setState(v);
  };
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  const open = useCallback((s: Sticker, el: HTMLElement) => {
    if (cur.current) return;
    sync({ sticker: s, phase: 'peel', start: boxFrom(el.getBoundingClientRect(), s.rotate) });
    later(170, () => sync(cur.current ? { ...cur.current, phase: 'fly' } : null));
    later(650, () => sync(cur.current ? { ...cur.current, phase: 'open' } : null));
  }, []);

  /** Chiude la card; `after` parte quando la card è smontata e lo scroll è sbloccato. */
  const close = useCallback((after?: () => void) => {
    const v = cur.current;
    if (!v || v.phase === 'closing') return;
    const el = document.querySelector<HTMLElement>(`[data-stk-id="${v.sticker.id}"]`);
    const rect = el?.getBoundingClientRect();
    sync({ ...v, phase: 'closing', start: rect ? boxFrom(rect, v.sticker.rotate) : v.start });
    const id = v.sticker.id;
    later(400, () => {
      sync(null);
      setAttachId(id);
      document.querySelector<HTMLElement>(`[data-stk-id="${id}"]`)?.focus({ preventScroll: true });
      later(320, () => setAttachId((a) => (a === id ? null : a)));
      if (after) window.requestAnimationFrame(after);
    });
  }, []);

  const isOpen = state !== null;

  /* Scroll lock, focus iniziale e focus trap finché la card è montata. */
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const prevO = body.style.overflow;
    const prevP = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    document.querySelector<HTMLElement>('.sc__close')?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else trapTab(e);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      body.style.overflow = prevO;
      body.style.paddingRight = prevP;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return { state, attachId, open, close };
}
