import { useFrame } from '@react-three/fiber';
import { useMemo, type MutableRefObject } from 'react';
import { MathUtils, Vector3 } from 'three';
import { CAMERA, CLOSE, FOCUS, phasesAt } from '../../../models/world/world.model';

interface Props {
  /** Avanzamento grezzo dello scroll (0-1), scritto da ScrollTrigger. */
  scroll: MutableRefObject<number>;
  /** Avanzamento smorzato, condiviso con il Rig e con l'apertura della facciata. */
  focus: MutableRefObject<number>;
}

const shot = (s: { position: [number, number, number]; target: [number, number, number] }) => ({
  pos: new Vector3(...s.position),
  look: new Vector3(...s.target),
});

/**
 * Camera in tre tempi seguendo lo scroll con smorzamento: dalla vista a tre quarti a tutto il modello aperto in
 * sezione (FOCUS), poi dentro la stanza verso la scrivania (CLOSE).
 */
export function CameraRig({ scroll, focus }: Props) {
  const shots = useMemo(() => ({ rest: shot(CAMERA), focus: shot(FOCUS), close: shot(CLOSE) }), []);
  const look = useMemo(() => new Vector3(), []);
  const pos = useMemo(() => new Vector3(), []);

  useFrame(({ camera }, delta) => {
    focus.current = MathUtils.damp(focus.current, scroll.current, 6, delta);
    const { open, close } = phasesAt(focus.current);
    pos.lerpVectors(shots.rest.pos, shots.focus.pos, open).lerp(shots.close.pos, close);
    look.lerpVectors(shots.rest.look, shots.focus.look, open).lerp(shots.close.look, close);
    camera.position.copy(pos);
    camera.lookAt(look);
  });

  return null;
}
