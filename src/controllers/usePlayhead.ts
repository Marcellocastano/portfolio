import { useEffect, type RefObject } from 'react';
import { ANY_MOTION, getGsap } from '../lib/gsap';
import { i18n } from '../models/i18n.model';
import { COMPANIES, fromPct, toPct } from '../models/stack/skills.model';

const COMPANY_RANGES = COMPANIES.map((c) => [toPct(c.start), toPct(c.end)] as const);

/** Etichetta della testina: l'anno, oppure "oggi" quando arriva in fondo. */
const yearLabel = (play: number) => (play >= 99.5 ? i18n.stack.today : String(Math.floor(fromPct(play))));

/**
 * Testina sulla matrice dello Stack: lo scroll la porta dal 2018 a oggi. Le barre crescono fin dove è arrivata
 * (CSS legge `--play`) e si accendono fasce e legenda delle aziende che attraversa.
 */
export function usePlayhead(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    // Solo dove si vede la matrice: sui telefoni c'è la lista (SkillList).
    mm.add(`${ANY_MOTION} and (min-width: 768px)`, () => {
      const bands = chart.querySelectorAll<HTMLElement>('.grid__band');
      const legend = chart.closest('.matrix')?.querySelectorAll<HTMLElement>('.legend__item') ?? [];
      const labels = chart.querySelectorAll<HTMLElement>('[data-playhead-year]');
      const state = { play: 0 };
      const update = () => {
        chart.style.setProperty('--play', state.play.toFixed(2));
        labels.forEach((el) => (el.textContent = yearLabel(state.play)));
        COMPANY_RANGES.forEach(([from, to], i) => {
          const now = String(state.play > from && state.play <= to + 0.5);
          if (bands[i]) bands[i].dataset.now = now;
          if (legend[i]) legend[i].dataset.now = now;
        });
      };

      chart.dataset.playing = 'true';
      update();
      gsap.to(state, {
        play: 100,
        ease: 'none',
        onUpdate: update,
        // arriva a "oggi" appena il grafico è tutto in vista (il suo fondo entra nello schermo)
        scrollTrigger: { trigger: chart, start: 'top 70%', end: 'bottom bottom', scrub: 0.5 },
      });

      return () => {
        delete chart.dataset.playing;
        chart.style.removeProperty('--play');
        [...bands, ...legend].forEach((el) => delete el.dataset.now);
      };
    });

    return () => mm.revert();
  }, [ref]);
}
