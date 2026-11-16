import { useEffect, useRef } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';

/**
 * Cambio progetto: una tendina nel colore dell'app entra da sinistra, copre la finestra ed esce a destra
 * scoprendo la nuova demo che si assesta. `key` identifica il progetto mostrato.
 */
export function useStageEnter<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    // Al primo render il contenuto è già quello del pre-rendering: niente animazione.
    if (first.current || !el) {
      first.current = false;
      return;
    }
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const wipe = el.querySelector('.projects__wipe');
      const win = el.querySelector('.pwin');
      gsap
        .timeline()
        .set(win, { autoAlpha: 0, scale: 0.97 })
        .fromTo(wipe, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.32, ease: 'power3.in' })
        .set(wipe, { transformOrigin: '100% 50%' })
        .set(win, { autoAlpha: 1 })
        .to(wipe, { scaleX: 0, duration: 0.55, ease: 'power4.out' })
        .to(win, { scale: 1, duration: 0.7, ease: 'power3.out' }, '<');
    });
    return () => mm.revert();
  }, [key]);

  return ref;
}
