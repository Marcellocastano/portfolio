import { useRef } from 'react';
import { useDotField } from '../../controllers/useDotField';
import type { Theme } from '../../models/theme.model';
import './DotField.css';

export function DotField({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotField(canvasRef, theme);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
