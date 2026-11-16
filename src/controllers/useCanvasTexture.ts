import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

type Painter = (ctx: CanvasRenderingContext2D, time: number) => void;

/**
 * Texture disegnata su un canvas 2D e ridisegnata a `fps` limitati (gli schermi non serve aggiornarli a 60 fps).
 * Solo lato client: vive dentro la scena 3D, caricata dopo il montaggio.
 */
export function useCanvasTexture(size: { w: number; h: number }, paint: Painter, fps = 15) {
  const { canvas, texture } = useMemo(() => {
    const el = document.createElement('canvas');
    el.width = size.w;
    el.height = size.h;
    const tex = new CanvasTexture(el);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;
    return { canvas: el, texture: tex };
  }, [size.w, size.h]);
  const elapsed = useRef(Infinity);

  useFrame((state, delta) => {
    elapsed.current += delta;
    if (elapsed.current < 1 / fps) return;
    elapsed.current = 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    paint(ctx, state.clock.elapsedTime);
    texture.needsUpdate = true;
  });

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
