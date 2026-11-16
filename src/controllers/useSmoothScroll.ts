import Lenis from 'lenis';
import { useEffect } from 'react';
import { getGsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { setLenis } from '../lib/scroll';

/**
 * Scroll fluido con Lenis, guidato dal ticker di GSAP così ScrollTrigger legge sempre la posizione aggiornata.
 * Con reduced motion resta lo scroll nativo.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    // Gli anchor usano lo scroll-margin-top delle sezioni, come lo scroll nativo.
    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      setLenis(null);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
