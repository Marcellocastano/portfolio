import { useEffect } from 'react';
import { onProjectRequest } from '../lib/projectNav';
import { scrollToElement } from '../lib/scroll';

/**
 * Richieste da altre sezioni (monitor dell'hero, Stack): seleziona il progetto e porta in vista l'inizio della
 * sezione Progetti, sempre lo stesso punto, qualunque sia il progetto scelto.
 */
export function useProjectRequests(ids: string[], open: (index: number) => void) {
  useEffect(
    () =>
      onProjectRequest((id) => {
        const index = ids.indexOf(id);
        if (index < 0) return;
        open(index);
        const section = document.getElementById('progetti');
        if (section) scrollToElement(section);
        history.replaceState(null, '', '#progetti');
      }),
    [ids, open],
  );
}
