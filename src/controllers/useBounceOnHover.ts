import { useCallback, useRef, useState } from 'react';

/** Rimbalza finché c'è hover; all'uscita completa il salto in corso e si ferma all'atterraggio. */
export function useBounceOnHover() {
  const [bouncing, setBouncing] = useState(false);
  const leaving = useRef(false);

  const onPointerEnter = useCallback(() => {
    leaving.current = false;
    setBouncing(true);
  }, []);

  const onPointerLeave = useCallback(() => {
    leaving.current = true;
  }, []);

  const onAnimationIteration = useCallback(() => {
    if (leaving.current) setBouncing(false);
  }, []);

  return { bouncing, hoverProps: { onPointerEnter, onPointerLeave }, onAnimationIteration };
}
