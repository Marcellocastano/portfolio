import { useCallback, useRef, type PointerEvent } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--px', `${(event.clientX - rect.left) / rect.width - 0.5}`);
    el.style.setProperty('--py', `${(event.clientY - rect.top) / rect.height - 0.5}`);
  }, []);

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty('--px', '0');
    ref.current?.style.setProperty('--py', '0');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
