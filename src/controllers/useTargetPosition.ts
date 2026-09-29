import { useEffect, useState, type RefObject } from 'react';

interface Position {
  x: number;
  y: number;
  visible: boolean;
}

const ANCHOR = { x: 0.62, y: 0.6 };
const PARKING = { x: 0.94, y: 0.96 };

export function useTargetPosition(stageRef: RefObject<HTMLElement>, target: RefObject<HTMLElement> | null) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const update = () => {
      const stage = stageRef.current?.getBoundingClientRect();
      if (!stage) return;
      const rect = target?.current?.getBoundingClientRect();
      if (!rect?.width) return setPosition({ x: stage.width * PARKING.x, y: stage.height * PARKING.y, visible: false });
      setPosition({
        x: rect.left - stage.left + rect.width * ANCHOR.x,
        y: rect.top - stage.top + rect.height * ANCHOR.y,
        visible: true,
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [stageRef, target]);

  return position;
}
