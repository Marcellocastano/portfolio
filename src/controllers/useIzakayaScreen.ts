import type { ThreeEvent } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MeshBasicMaterial, type Mesh } from 'three';
import { requestProject } from '../lib/projectNav';
import { paintScreen } from '../lib/world/screenPainter';
import { SCREEN_CYCLE, SCREEN_PROJECTS } from '../models/world/world.model';
import { setCursor } from '../views/components/world/cursor';
import { useCanvasTexture } from './useCanvasTexture';

/** Proporzioni dello schermo del monitor nel modello (0.74 × 0.425 m). */
const SCREEN = { w: 512, h: 294 };

/** Indice del progetto mostrato al tempo `t` e avanzamento (0-1) del suo turno. */
const projectAt = (t: number) => {
  const turn = t / SCREEN_CYCLE;
  return { index: Math.floor(turn) % SCREEN_PROJECTS.length, cycle: turn % 1 };
};

/**
 * Lo schermo del monitor nel modello glTF mostra a turno i progetti come mini app vive; al passaggio del mouse
 * compare l'etichetta e il clic apre in Progetti quello sullo schermo. Finché la facciata è chiusa i raggi del
 * puntatore si fermano sulle pareti: il monitor si usa solo a casa aperta.
 */
export function useIzakayaScreen(screen: Mesh | null) {
  const current = useRef(0);
  const isHovered = useRef(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const texture = useCanvasTexture(SCREEN, (ctx, t) => {
    const { index, cycle } = projectAt(t);
    if (index !== current.current && isHovered.current) setHovered(SCREEN_PROJECTS[index].name);
    current.current = index;
    paintScreen(ctx, SCREEN, SCREEN_PROJECTS[index], t, cycle);
  });

  useEffect(() => {
    if (!screen) return;
    // Le UV del glTF hanno l'origine in alto: il canvas va letto senza capovolgerlo.
    texture.flipY = false;
    const previous = screen.material;
    screen.material = new MeshBasicMaterial({ map: texture, toneMapped: false });
    return () => {
      (screen.material as MeshBasicMaterial).dispose();
      screen.material = previous;
    };
  }, [screen, texture]);

  const isScreen = useCallback((e: ThreeEvent<PointerEvent | MouseEvent>) => e.object === screen, [screen]);
  const onOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isScreen(e)) return;
      e.stopPropagation();
      isHovered.current = true;
      setHovered(SCREEN_PROJECTS[current.current].name);
      setCursor(true);
    },
    [isScreen],
  );
  const onOut = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isScreen(e)) return;
      isHovered.current = false;
      setHovered(null);
      setCursor(false);
    },
    [isScreen],
  );
  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (!isScreen(e)) return;
      e.stopPropagation();
      requestProject(SCREEN_PROJECTS[current.current].id);
    },
    [isScreen],
  );

  return { hovered, handlers: { onPointerOver: onOver, onPointerOut: onOut, onClick } };
}
