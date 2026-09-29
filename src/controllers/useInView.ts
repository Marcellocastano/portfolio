import { useEffect, useState, type RefObject } from 'react';

/** true quando l'elemento entra nel viewport (IntersectionObserver, solo in effect). */
export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}
