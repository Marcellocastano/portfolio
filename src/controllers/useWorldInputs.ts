import { useEffect, useRef, type RefObject } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';

export interface Pointer {
  x: number;
  y: number;
}

/**
 * Ingressi del mondo 3D, come ref mutabili lette a ogni frame (nessun re-render):
 * - `pointer`: posizione del mouse sulla sezione, -1..1;
 * - `scroll`: avanzamento della fase sticky dell'hero, 0..1 (solo desktop; altrove resta 0).
 */
export function useWorldInputs(area: RefObject<HTMLElement>) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const el = area.current?.closest('section') ?? area.current;
    if (!el || !matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 };
    };
    const onLeave = () => (pointer.current = { x: 0, y: 0 });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [area]);

  useEffect(() => {
    const section = area.current?.closest('section');
    if (!section) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => (scroll.current = self.progress),
      });
      scroll.current = st.progress;
      return () => (scroll.current = 0);
    });
    return () => mm.revert();
  }, [area]);

  return { pointer, scroll };
}
