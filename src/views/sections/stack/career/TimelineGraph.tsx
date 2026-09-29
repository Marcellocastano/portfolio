import type { CSSProperties } from 'react';
import { BRANCHES, COMMITS, type Commit } from '../../../../models/stack/career.model';
import { lanePath, MAIN_X, outerLane } from './laneGeometry';

interface Props {
  ys: number[];
  h: number;
  w: number;
}

function dotRadius(c: Commit): number {
  if (c.head) return 7;
  return c.type === 'merge' ? 3.5 : 5;
}

/** Segmenti di main colorati per era aziendale (il colore del commit più recente sopra). */
function segmentColors(): string[] {
  const out: string[] = [];
  let cur = 'var(--coral)';
  for (const c of COMMITS) {
    if (c.color) cur = c.color;
    out.push(cur);
  }
  return out;
}

/** Grafo SVG: main a segmenti per azienda, corsie brand con icone, cerchi dei commit. */
export function TimelineGraph({ ys, h, w }: Props) {
  const n = COMMITS.length;
  const segs = segmentColors();
  const laneX = (l: number) => (w < 520 ? 28 + l * 14 : 40 + l * 20);
  return (
    <svg className="tl__graph" style={{ height: h }} aria-hidden="true">
      {ys.slice(0, -1).map((y, i) => (
        <path
          key={COMMITS[i].hash}
          className="tl__main"
          pathLength={1}
          style={{ '--at': i / (n - 1), '--seg': n - 1, stroke: segs[i] } as CSSProperties}
          d={`M ${MAIN_X} ${y} L ${MAIN_X} ${ys[i + 1]}`}
        />
      ))}
      {BRANCHES.map((b) => {
        const at = b.fork / (n - 1);
        const lx = laneX(outerLane(b, BRANCHES)) + 5;
        const ly = (ys[b.fork] + ys[b.merge]) / 2;
        return (
          <g key={b.id}>
            <path
              className="tl__branch"
              pathLength={1}
              style={{ '--at': at, '--bc': b.color } as CSSProperties}
              d={lanePath(ys[b.fork], ys[b.merge], laneX(b.lane))}
            />
            <g className="tl__blabel" style={{ '--at': at, '--bc': b.color } as CSSProperties}>
              <path d={b.icon} transform={`translate(${lx}, ${ly - 8}) scale(0.4)`} fill={b.color} />
              <text x={lx + 13} y={ly + 3}>
                {b.id}
              </text>
            </g>
          </g>
        );
      })}
      {ys.map((y, i) => (
        <circle
          key={COMMITS[i].hash}
          className="tl__dot"
          data-type={COMMITS[i].type}
          data-head={COMMITS[i].head ?? false}
          cx={MAIN_X}
          cy={y}
          r={dotRadius(COMMITS[i])}
          style={{ '--at': i / (n - 1), '--cc': COMMITS[i].color ?? 'var(--fg-muted)' } as CSSProperties}
        />
      ))}
    </svg>
  );
}
