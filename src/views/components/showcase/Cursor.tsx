import type { RefObject } from 'react';
import { useTargetPosition } from '../../../controllers/useTargetPosition';
import './Cursor.css';

interface Props {
  stageRef: RefObject<HTMLElement>;
  target: RefObject<HTMLElement> | null;
  clicking: boolean;
  label: string;
}

export function Cursor({ stageRef, target, clicking, label }: Props) {
  const { x, y, visible } = useTargetPosition(stageRef, target);

  return (
    <div
      className="showcase-cursor"
      data-visible={visible}
      data-clicking={clicking}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3 L4 19.5 L8.6 15.2 L11.6 21.6 L14.6 20.2 L11.7 14 L18 14 Z" />
      </svg>
      <span className="showcase-cursor__label">{label}</span>
    </div>
  );
}
