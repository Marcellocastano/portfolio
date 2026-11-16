import { useEffect, type RefObject } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';

/** Il titolo emerge dalla maschera di ogni parola seguendo lo scroll, prendendo peso lettera per lettera. */
export function useTitleScrub(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      const chars = root.querySelectorAll('.split-char');
      gsap.fromTo(
        chars,
        // `y: 0` esplicito: se un refresh rilegge la trasformazione a metà, GSAP la salverebbe come `y` in pixel e
        // le lettere resterebbero giù anche a titolo completo (animando solo `yPercent`).
        { y: 0, yPercent: 105, fontWeight: 300, rotate: 6 },
        {
          y: 0,
          yPercent: 0,
          fontWeight: 700,
          rotate: 0,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: { trigger: root, start: 'top 92%', end: 'top 55%', scrub: 0.7 },
        },
      );
    });

    return () => mm.revert();
  }, [ref]);
}
