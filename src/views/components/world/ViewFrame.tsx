import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import { MathUtils, type PerspectiveCamera } from 'three';
import { CAMERA } from '../../../models/world/world.model';

interface Props {
  /** Il riquadro dell'hero in cui va inquadrato il modello (con le trasformazioni dello scroll). */
  frame: RefObject<HTMLElement>;
}

const HALF = Math.tan(MathUtils.degToRad(CAMERA.fov / 2));

/**
 * Il canvas copre tutta la scena dell'hero, ma il modello va inquadrato nel riquadro: si costruisce un frustum
 * "virtuale" centrato sul riquadro, con il campo visivo di CAMERA riferito alla sua altezza, e se ne disegna
 * solo la parte che cade sul canvas (setViewOffset). Il riquadro si legge a ogni frame con getBoundingClientRect,
 * che include translate e scale di GSAP: quando lo scroll lo porta al centro e lo ingrandisce, il modello lo segue
 * a piena risoluzione, e ciò che sborda dal riquadro resta visibile invece di essere tagliato.
 */
export function ViewFrame({ frame }: Props) {
  useFrame(({ camera, gl }) => {
    const box = frame.current?.getBoundingClientRect();
    const canvas = gl.domElement.getBoundingClientRect();
    if (!box || box.height < 1 || canvas.width < 1) return;
    const cam = camera as PerspectiveCamera;
    const cx = box.left + box.width / 2 - canvas.left;
    const cy = box.top + box.height / 2 - canvas.top;
    const fullW = 2 * Math.max(cx, canvas.width - cx);
    const fullH = 2 * Math.max(cy, canvas.height - cy);
    cam.fov = MathUtils.radToDeg(2 * Math.atan((HALF * fullH) / box.height));
    cam.aspect = fullW / fullH;
    cam.setViewOffset(fullW, fullH, fullW / 2 - cx, fullH / 2 - cy, canvas.width, canvas.height);
  });

  return null;
}
