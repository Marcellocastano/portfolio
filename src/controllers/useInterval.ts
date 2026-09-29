import { useEffect, useRef } from 'react';

/** Interval che si ferma quando enabled è false o il documento è nascosto. */
export function useInterval(callback: () => void, delay: number, enabled: boolean) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!enabled) return;
    let id: number | undefined;
    const start = () => {
      if (id === undefined) id = window.setInterval(() => cbRef.current(), delay);
    };
    const stop = () => {
      window.clearInterval(id);
      id = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [delay, enabled]);
}
