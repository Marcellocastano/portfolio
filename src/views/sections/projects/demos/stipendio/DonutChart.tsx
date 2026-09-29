import { formatEuro, type NetBreakdown } from '../../../../../models/projects/stipendio.model';
import './DonutChart.css';

const R = 52;
const C = 2 * Math.PI * R;

const SEGMENTS = [
  { key: 'netto', color: 'var(--p-fg)', label: 'Netto' },
  { key: 'inps', color: '#c9a227', label: 'INPS' },
  { key: 'irpef', color: '#b4552d', label: 'IRPEF' },
  { key: 'addizionali', color: '#c94b5a', label: 'Addizionali' },
] as const;

type DonutBreakdown = NetBreakdown & { addizionali: number };

export function DonutChart({ breakdown, ral }: { breakdown: DonutBreakdown; ral: number }) {
  let offset = 0;
  return (
    <div className="stip-donut">
      <div className="stip-donut__figure">
        <svg viewBox="0 0 140 140" className="stip-donut__svg" aria-hidden="true">
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="color-mix(in srgb, var(--p-fg) 8%, transparent)"
            strokeWidth="20"
          />
          {SEGMENTS.map((seg) => {
            const frac = breakdown[seg.key] / ral;
            const dash = `${Math.max(0, frac * C - 1.5)} ${C}`;
            const el = (
              <circle
                key={seg.key}
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={dash}
                strokeDashoffset={-offset * C}
                transform="rotate(-90 70 70)"
              />
            );
            offset += frac;
            return el;
          })}
        </svg>
        <div className="stip-donut__center">
          <span>RAL</span>
          <b>{formatEuro(ral)}</b>
        </div>
      </div>
      <ul className="stip-donut__legend">
        {SEGMENTS.map((seg) => (
          <li key={seg.key}>
            <i style={{ background: seg.color }} /> {seg.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
