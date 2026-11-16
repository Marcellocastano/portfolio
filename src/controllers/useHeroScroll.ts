import { useEffect, type RefObject } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';

/** Quanta altezza della scena occupa il riquadro del mondo 3D a fine corsa. */
const FOCUS_FILL = 0.9;
/** Il centro a fine corsa scende di poco: in alto c'è la navbar. */
const NAV_SHIFT = 0.03;
/** Quanta larghezza può occupare a fine corsa, sugli schermi verticali. */
const FOCUS_FILL_WIDTH = 0.98;

/** Stesso punto di rottura di Hero.css: sotto, testo e diorama stanno in una colonna. */
const twoColumns = () => window.matchMedia('(min-width: 1025px)').matches;

/** Posizione di `el` dentro `ancestor` sommando gli offset (ignorano i transform: stabili a scroll avviato). */
function offsetIn(el: HTMLElement, ancestor: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
}

/**
 * Scroll dell'hero (a ogni larghezza, senza reduced motion), nella fase in cui il suo contenuto resta fermo (sticky, vedi Hero.css): il testo
 * scivola via e il riquadro del mondo 3D si porta al centro della scena crescendo fino a quasi tutta la sua
 * altezza. Il canvas copre già tutta la scena e inquadra il modello nel riquadro (ViewFrame): il modello diventa
 * grande e resta nitido, mentre ruota e si apre sullo studio (useWorldInputs). Poi l'hero scorre via normalmente.
 */
export function useHeroScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      const stage = hero.querySelector<HTMLElement>('.hero__stage');
      const copy = hero.querySelector<HTMLElement>('.hero__copy');
      const visual = hero.querySelector<HTMLElement>('.hero__visual');
      const dots = hero.querySelector<HTMLElement>('.dot-field');
      if (!stage || !copy || !visual) return;
      const center = () => {
        const { left, top } = offsetIn(visual, stage);
        return {
          x: stage.clientWidth / 2 - (left + visual.offsetWidth / 2),
          y: stage.clientHeight * (0.5 + NAV_SHIFT) - (top + visual.offsetHeight / 2),
        };
      };
      // In verticale (telefono) il limite è la larghezza: il riquadro è quadrato.
      const fill = () =>
        Math.min(stage.clientHeight * FOCUS_FILL, stage.clientWidth * FOCUS_FILL_WIDTH) / visual.offsetHeight;

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // Timeline lunga 1 = tutta la corsa: il riquadro arriva al centro con l'apertura (SCROLL_PHASES.open),
        // nell'ultimo tratto resta fermo mentre la camera entra nella stanza.
        .to({}, { duration: 1 }, 0)
        // Su due colonne il testo esce a sinistra; su una colonna (sopra al diorama) sale verso l'alto.
        .to(
          copy,
          {
            x: () => (twoColumns() ? -hero.clientWidth * 0.08 : 0),
            y: () => (twoColumns() ? 0 : -stage.clientHeight * 0.12),
            autoAlpha: 0,
            duration: 0.3,
          },
          0,
        )
        .to(visual, { x: () => center().x, y: () => center().y, scale: fill, duration: 0.62, ease: 'power1.inOut' }, 0)
        .to(dots, { autoAlpha: 0.35, duration: 0.5 }, 0.1);
    });

    return () => mm.revert();
  }, [ref]);
}
