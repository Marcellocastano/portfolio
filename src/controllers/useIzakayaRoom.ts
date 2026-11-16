import type { ThreeEvent } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Object3D } from 'three';
import { IZAKAYA_NODES } from '../models/world/izakaya.model';
import { setCursor } from '../views/components/world/cursor';

export type RoomTarget = 'switch' | 'dog';

/** Al tocco (senza hover) l'etichetta di Olivia resta visibile per un attimo. */
const TAP_LABEL_MS = 2200;

/** Bilanciere e placca contano entrambi come interruttore. */
function targetOf(obj: Object3D): RoomTarget | null {
  if (obj.name.startsWith(IZAKAYA_NODES.lightSwitch)) return 'switch';
  return obj.name === IZAKAYA_NODES.dog ? 'dog' : null;
}

/**
 * La stanza aperta: l'interruttore sulla parete accende e spegne la luce (a luce spenta mi addormento alla
 * scrivania), e passando su Olivia compare il suo nome. Come per il monitor, i raggi del puntatore arrivano a
 * questi oggetti solo a facciata aperta.
 */
export function useIzakayaRoom() {
  const [lightOn, setLightOn] = useState(true);
  const lightRef = useRef(true);
  const [hovered, setHovered] = useState<RoomTarget | null>(null);
  const tapTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  const onOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    const target = targetOf(e.object);
    if (!target) return;
    e.stopPropagation();
    setHovered(target);
    setCursor(target === 'switch');
  }, []);
  const onOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!targetOf(e.object)) return;
    setHovered(null);
    setCursor(false);
  }, []);
  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    const target = targetOf(e.object);
    if (!target) return;
    e.stopPropagation();
    if (target === 'switch') {
      lightRef.current = !lightRef.current;
      setLightOn(lightRef.current);
      return;
    }
    // Sul touch non c'è hover: il tocco mostra il nome per un attimo.
    setHovered('dog');
    window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => setHovered(null), TAP_LABEL_MS);
  }, []);

  return { lightOn, lightRef, hovered, handlers: { onPointerOver: onOver, onPointerOut: onOut, onClick } };
}
