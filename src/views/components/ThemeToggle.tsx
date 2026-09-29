import type { Theme } from '../../models/theme.model';
import './ThemeToggle.css';

interface Props {
  theme: Theme;
  onToggle: (origin: { x: number; y: number }) => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      data-dark={isDark}
      aria-label={isDark ? 'Attiva tema chiaro' : 'Attiva tema scuro'}
      aria-pressed={isDark}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="theme-toggle-mask">
          <rect width="24" height="24" fill="white" />
          <circle className="theme-toggle__bite" cx="24" cy="4" r="7" fill="black" />
        </mask>
        <circle className="theme-toggle__core" cx="12" cy="12" r="5" mask="url(#theme-toggle-mask)" />
        <g className="theme-toggle__rays">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
