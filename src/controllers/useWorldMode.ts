import { useEffect, useState, type RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export type WorldMode = 'poster' | 'live';

function supportsWebGL() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'));
  } catch {
    return false;
  }
}

/** Dispositivi troppo deboli per la scena (pochi core): meglio il poster. Se il dato non c'è, si prova il 3D. */
function capable() {
  return !navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 4;
}

/**
 * Decide se mostrare il mondo 3D o l'immagine statica: 3D a ogni larghezza (anche su telefono), con WebGL2, senza
 * reduced motion e su un dispositivo non troppo debole.
 * Parte sempre da 'poster' (pre-rendering) e mette in pausa il rendering quando la scena esce dallo schermo.
 */
export function useWorldMode(ref: RefObject<HTMLElement>) {
  const [mode, setMode] = useState<WorldMode>('poster');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const live = !prefersReducedMotion() && supportsWebGL() && capable();
    // Lo script di avvio (ThemeBootScript) lo ha già previsto: qui la decisione definitiva, poster compreso.
    if (live) document.documentElement.dataset.world = 'live';
    else delete document.documentElement.dataset.world;
    if (live) setMode('live');
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return { mode, visible };
}
