import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { CATEGORIES, type Sticker } from '../../../../models/stack/stickers.model';
import { projects } from '../../../../models/projects/projects.model';
import { requestProject } from '../../../../lib/projectNav';
import { useReducedMotion } from '../../../../controllers/useReducedMotion';
import type { PeelState } from '../../../../controllers/useStickerPeel';
import { StickerFace } from './StickerFace';
import './StickerCard.css';
import './StickerCardBack.css';

const FRAC = { s: 9, m: 12, l: 15 } as const;
const MAX_W = 380;
const MAX_H_RATIO = 0.82;

const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

type CloseFn = (after?: () => void) => void;

function PaperBody({ s, onClose, inert }: { s: Sticker; onClose: CloseFn; inert?: boolean }) {
  const cat = CATEGORIES.find((c) => c.id === s.category);
  return (
    <>
      <header className="sc__head">
        <svg className="sc__icon" viewBox="0 0 24 24" style={{ color: `#${s.icon.hex}` }} aria-hidden="true">
          <path d={s.icon.path} fill="currentColor" />
        </svg>
        <div>
          <p className="sc__name" id={inert ? undefined : 'sc-title'}>
            {s.name}
          </p>
          <p className="sc__meta">
            <i className="sc__dot" style={{ background: cat?.color }} />
            {cat?.label} <span className="sc__since">dal {s.since}</span>
          </p>
        </div>
      </header>
      <p className="sc__desc">{s.description}</p>
      <div className="sc__foot">
        {s.usedIn.length > 0 && (
          <p className="sc__used">
            Usato in:
            {s.usedIn.map((id) => (
              <a
                key={id}
                href={`#progetto-${id}`}
                tabIndex={inert ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  onClose(() => requestProject(id));
                }}
              >
                {projectName(id)}
              </a>
            ))}
          </p>
        )}
        <button type="button" className="sc__close" tabIndex={inert ? -1 : 0} onClick={() => onClose()}>
          Rimetti
        </button>
      </div>
    </>
  );
}

/** Card che si stacca dal coperchio: vola al centro e si gira mostrando il retro. */
export function StickerCard({ peel, onClose }: { peel: PeelState; onClose: CloseFn }) {
  const reduced = useReducedMotion();
  const mRef = useRef<HTMLDivElement>(null);
  const [finalH, setFinalH] = useState(0);
  const { sticker: s, start } = peel;
  const phase = reduced && peel.phase !== 'closing' ? 'open' : peel.phase;
  const W = Math.min(window.innerWidth * 0.88, MAX_W);

  useLayoutEffect(() => {
    const h = mRef.current?.offsetHeight ?? W;
    setFinalH(Math.min(h, window.innerHeight * MAX_H_RATIO));
  }, [W]);

  const atSticker = !reduced && (phase === 'peel' || phase === 'closing');
  const H = finalH || W;
  const style: CSSProperties = atSticker
    ? { left: start.x, top: start.y, width: start.w, height: start.h, transform: `rotate(${start.rot}deg)` }
    : {
        left: (window.innerWidth - W) / 2,
        top: (window.innerHeight - H) / 2,
        width: W,
        height: H,
        transform: 'rotate(0deg)',
      };

  return createPortal(
    <div className="sc" data-phase={phase} data-reduced={reduced}>
      <div className="sc__backdrop" onClick={() => onClose()} />
      <div className="sc__card" role="dialog" aria-modal="true" aria-labelledby="sc-title" style={style}>
        <div className="sc__flip">
          <div className="sc__face sc__front" data-shape={s.shape} aria-hidden="true">
            <div className="sc__lid" style={{ '--f': FRAC[s.size] } as CSSProperties}>
              <span
                className="stk sc__stk"
                data-shape={s.shape}
                data-size={s.size}
                style={{ '--r': '0deg' } as CSSProperties}
              >
                <StickerFace sticker={s} />
              </span>
            </div>
          </div>
          <div className="sc__face sc__back">
            <div className="sc__paper" style={{ '--bc': `#${s.icon.hex}` } as CSSProperties}>
              <span className="sc__band" aria-hidden="true" />
              <PaperBody s={s} onClose={onClose} />
            </div>
            <svg className="sc__wm" viewBox="0 0 24 24" aria-hidden="true">
              <path d={s.icon.path} fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <div className="sc__measure" aria-hidden="true" style={{ width: W }}>
        <div ref={mRef} className="sc__paper">
          <PaperBody s={s} onClose={() => {}} inert />
        </div>
      </div>
    </div>,
    document.body,
  );
}
