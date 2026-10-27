import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { useMenuDemo } from '../../../../../controllers/useMenuDemo';
import { i18n } from '../../../../../models/i18n.model';
import { CATEGORY_TARGETS, DAY_NAMES } from '../../../../../models/projects/menu.model';
import { MenuDay } from './MenuDay';
import './MenuDemo.css';

function CheckIcon({ ok }: { ok: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="menu-demo__check" data-ok={ok} aria-hidden="true">
      {ok ? (
        <path d="M4 12.5l5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path
          d="M12 8v5m0 3.5v.5M10.3 3.9L2.6 17a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function MenuDemo({ running }: { running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { week, counts, spinning, spinId, cells, regenerate } = useMenuDemo(running && inView);

  return (
    <div className="menu-demo" ref={ref}>
      <div className="menu-demo__top">
        <h4 className="menu-demo__title">{i18n.demos.menu.title}</h4>
        <button type="button" className="menu-demo__regen" onClick={regenerate} disabled={spinning}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M20 12a8 8 0 10-2.3 5.6M20 12V7m0 5h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {i18n.demos.menu.regenerate}
        </button>
      </div>

      <ul className="menu-demo__targets">
        {CATEGORY_TARGETS.map((t) => {
          const have = counts[t.category] ?? 0;
          return (
            <li key={t.category} data-ok={have >= t.target}>
              <span aria-hidden="true">{t.emoji}</span> {t.category}{' '}
              <b>
                {have}/{t.target}
              </b>
              <CheckIcon ok={have >= t.target} />
            </li>
          );
        })}
      </ul>

      <div className="menu-demo__grid">
        {week.map((day, di) => (
          <MenuDay key={DAY_NAMES[di]} name={DAY_NAMES[di]} index={di} dishes={day} cells={cells} spinId={spinId} />
        ))}
      </div>
    </div>
  );
}
