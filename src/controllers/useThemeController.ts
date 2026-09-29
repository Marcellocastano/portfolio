import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { themeModel, type Theme } from '../models/theme.model';
import { prefersReducedMotion } from '../lib/motion';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function useThemeController() {
  const [theme, setTheme] = useState<Theme>(themeModel.fallback);

  useEffect(() => {
    setTheme(themeModel.initial());
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (themeModel.read()) return;
      const next = themeModel.system();
      themeModel.apply(next);
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next = themeModel.opposite(theme);
      const commit = () => {
        flushSync(() => setTheme(next));
        themeModel.apply(next);
        themeModel.save(next);
      };

      const doc = document as ViewTransitionDocument;
      if (!doc.startViewTransition || prefersReducedMotion()) return commit();

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      doc.startViewTransition(commit).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
        );
      });
    },
    [theme],
  );

  return { theme, toggleTheme };
}
