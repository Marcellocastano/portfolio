import { useEffect } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { onProjectRequest } from '../lib/projectNav';

const ACCORDION_QUERY = '(max-width: 1023px)';
const ACCORDION_MS = 900;

/** Apre il progetto richiesto da altre sezioni e lo porta in vista. */
export function useProjectRequests(ids: string[], open: (index: number) => void) {
  useEffect(
    () =>
      onProjectRequest((id) => {
        const index = ids.indexOf(id);
        if (index < 0) return;
        open(index);
        const reduced = prefersReducedMotion();
        const scroll = () =>
          document.getElementById(`progetto-${id}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        // Su mobile la fisarmonica cambia altezza: si scrolla a transizione finita.
        const accordion = !reduced && matchMedia(ACCORDION_QUERY).matches;
        if (accordion) window.setTimeout(scroll, ACCORDION_MS);
        else requestAnimationFrame(scroll);
        history.replaceState(null, '', '#progetti');
      }),
    [ids, open],
  );
}
