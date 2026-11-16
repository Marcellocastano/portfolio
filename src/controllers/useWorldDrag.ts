import { useEffect, useRef, type RefObject } from 'react';
import { DRAG } from '../models/world/world.model';

export interface Drag {
  /** Rotazione aggiunta dall'utente attorno all'asse verticale (radianti). */
  yaw: number;
  /** Velocità al rilascio (radianti al secondo): il Rig la usa per l'inerzia. */
  velocity: number;
  dragging: boolean;
  /** Scritto dal Rig: il trascinamento vale solo a riposo, prima che lo scroll faccia ruotare la casa. */
  enabled: boolean;
}

/**
 * Trascinamento orizzontale sul mondo 3D per girare la casa e vederne gli altri lati. Ref mutabile letta a ogni
 * frame (nessun re-render). In verticale la pagina continua a scorrere (`touch-action: pan-y` nel CSS).
 */
export function useWorldDrag(area: RefObject<HTMLElement>) {
  const drag = useRef<Drag>({ yaw: 0, velocity: 0, dragging: false, enabled: true });

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    let lastX = 0;
    let lastT = 0;

    const onDown = (e: PointerEvent) => {
      if (!drag.current.enabled || e.button !== 0) return;
      drag.current.dragging = true;
      drag.current.velocity = 0;
      lastX = e.clientX;
      lastT = e.timeStamp;
      el.dataset.dragging = 'true';
    };
    const onMove = (e: PointerEvent) => {
      // Il cursore "mano" compare solo quando la casa si può girare (CSS su data-draggable).
      const draggable = String(drag.current.enabled);
      if (el.dataset.draggable !== draggable) el.dataset.draggable = draggable;
      if (!drag.current.dragging) return;
      const step = ((e.clientX - lastX) / el.clientWidth) * DRAG.speed;
      const dt = Math.max(1, e.timeStamp - lastT) / 1000;
      drag.current.yaw += step;
      // Velocità smorzata: un ultimo movimento brusco non decide da solo l'inerzia.
      drag.current.velocity = drag.current.velocity * 0.6 + (step / dt) * 0.4;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag.current.dragging) return;
      drag.current.dragging = false;
      // Fermo da un po' prima di rilasciare: niente inerzia.
      if (e.timeStamp - lastT > 80) drag.current.velocity = 0;
      delete el.dataset.dragging;
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [area]);

  return drag;
}
