import { useEffect, type RefObject } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';

/** La selezione dell'editor avanza parola per parola mentre il paragrafo attraversa lo schermo. */
export function useSelectionScrub(ref: RefObject<HTMLElement>, selector: string) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      gsap.fromTo(
        root.querySelectorAll(selector),
        { backgroundSize: '0% 100%' },
        {
          backgroundSize: '100% 100%',
          ease: 'none',
          duration: 1,
          stagger: 1,
          scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 42%', scrub: 0.4 },
        },
      );
    });

    return () => mm.revert();
  }, [ref, selector]);
}
