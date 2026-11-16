import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Desktop senza reduced motion: l'unico contesto in cui si bloccano sezioni allo scroll o si reagisce al mouse. */
export const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
/** Qualunque schermo, purché senza reduced motion. */
export const ANY_MOTION = '(prefers-reduced-motion: no-preference)';

/** GSAP con ScrollTrigger registrato. Da chiamare solo in effect o handler (mai durante il render SSR). */
export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
