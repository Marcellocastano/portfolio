import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Options {
  /** Raggio d'influenza in px. */
  radius?: number;
  /** Peso delle lettere sotto il puntatore e a riposo (asse wght del font variabile). */
  near?: number;
  far?: number;
}

/**
 * Effetto lente sul testo: le lettere vicine al puntatore cambiano peso in modo continuo.
 * Solo con mouse e senza reduced motion; i rettangoli si rileggono a ogni frame perché il testo può muoversi.
 */
export function useVariableProximity(ref: RefObject<HTMLElement>, selector: string, options: Options = {}) {
  const { radius = 220, near = 300, far = 700 } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || !matchMedia('(pointer: fine)').matches) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const paint = () => {
      frame = 0;
      for (const el of chars) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        el.style.fontWeight = String(Math.round(far + (near - far) * t * t * (3 - 2 * t)));
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      chars.forEach((el) => el.style.removeProperty('font-weight'));
    };
  }, [ref, selector, radius, near, far]);
}
