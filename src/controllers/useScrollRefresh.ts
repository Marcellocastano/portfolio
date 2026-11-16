import { useEffect } from 'react';
import { getGsap } from '../lib/gsap';

/** Ricalcola le posizioni di ScrollTrigger quando un cambio di layout (es. una fisarmonica) ha finito di animare. */
export function useScrollRefresh(dep: unknown, delayMs = 650) {
  useEffect(() => {
    const id = window.setTimeout(() => getGsap().ScrollTrigger.refresh(), delayMs);
    return () => window.clearTimeout(id);
  }, [dep, delayMs]);
}
