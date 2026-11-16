import type Lenis from 'lenis';
import { prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Porta in vista un elemento. Lo spazio sotto la navbar lo decide solo lo `scroll-margin-top` CSS dell'elemento,
 * che Lenis rispetta come lo scroll nativo: nessun offset in JS, altrimenti i due si sommerebbero.
 */
export function scrollToElement(el: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(el);
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
