import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

/** Osserva l'elemento e restituisce true una sola volta quando entra nel viewport. */
export function useRevealOnce<T extends HTMLElement>(options: Options = {}) {
  const { threshold = 0.2, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, revealed };
}
