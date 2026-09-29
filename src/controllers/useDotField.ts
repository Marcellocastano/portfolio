import { useEffect, type RefObject } from 'react';
import { createDotFieldEngine } from '../lib/dotFieldEngine';
import { prefersReducedMotion } from '../lib/motion';
import type { Theme } from '../models/theme.model';

const readColors = () => {
  const styles = getComputedStyle(document.documentElement);
  return { dot: styles.getPropertyValue('--dot').trim(), accent: styles.getPropertyValue('--accent').trim() };
};

export function useDotField(canvasRef: RefObject<HTMLCanvasElement>, theme: Theme) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const engine = createDotFieldEngine(canvas, ctx, readColors());
    const reduced = prefersReducedMotion();
    let frame = 0;
    let visible = true;

    const loop = (time: number) => {
      engine.draw(time);
      if (visible) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside = event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (inside && event.pointerType === 'mouse')
        engine.setPointer(event.clientX - rect.left, event.clientY - rect.top);
      else engine.releasePointer();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(loop);
    });

    const resize = new ResizeObserver(() => {
      engine.resize();
      if (reduced) engine.draw(0);
    });

    resize.observe(canvas);
    if (!reduced) {
      visibility.observe(canvas);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', engine.releasePointer);
    }

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', engine.releasePointer);
    };
  }, [canvasRef, theme]);
}
