import { useEffect } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { onProjectRequest } from '../lib/projectNav';

/** Porta in vista il progetto richiesto da altre sezioni: step del palco su desktop, chapter su mobile. */
export function useProjectRequests(ids: string[], stacked: boolean, goTo: (index: number) => void) {
  useEffect(
    () =>
      onProjectRequest((id) => {
        const index = ids.indexOf(id);
        if (index < 0) return;
        if (stacked) {
          const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
          document.getElementById(`progetto-${id}`)?.scrollIntoView({ behavior });
        } else goTo(index);
        history.replaceState(null, '', '#progetti');
      }),
    [ids, stacked, goTo],
  );
}
