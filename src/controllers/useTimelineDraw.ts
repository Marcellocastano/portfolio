import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/** Scrive --draw (0..1) sull'elemento in base allo scroll, via rAF, senza state. */
export function useTimelineDraw(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--draw', '1');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const topDoc = r.top + window.scrollY;
      const start = topDoc - vh * 0.85;
      const docBottom = document.documentElement.scrollHeight - vh;
      const end = Math.min(topDoc + r.height - vh * 0.45, docBottom);
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      el.style.setProperty('--draw', p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [ref]);
}
