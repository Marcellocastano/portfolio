import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTimelineDraw } from '../../../../controllers/useTimelineDraw';
import { COMMITS, type Commit } from '../../../../models/stack/career.model';
import { TimelineGraph } from './TimelineGraph';
import './CareerTimeline.css';
import './CommitRow.css';

function CommitRow({ commit, at }: { commit: Commit; at: number }) {
  return (
    <li
      className="tl__commit"
      data-type={commit.type}
      style={{ '--at': at, '--cc': commit.color ?? 'var(--coral)' } as CSSProperties}
    >
      <span className="tl__hash">{commit.hash}</span>
      {commit.head && <span className="tl__ref">HEAD -&gt; main</span>}
      <p className="tl__msg">
        <b className="tl__type">{commit.type}:</b> {commit.message}
      </p>
      {commit.company && (
        <p className="tl__meta">
          {commit.mark && (
            <span className="tl__mark" style={{ background: commit.color }}>
              {commit.mark}
            </span>
          )}
          {commit.company}
          {commit.period && `, ${commit.period}`}
          {commit.detail && `, ${commit.detail}`}
        </p>
      )}
      {commit.skills && (
        <p className="tl__skills">
          {commit.skills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
      )}
    </li>
  );
}

/** Timeline "git log": main in coral, corsie dei rami, disegno guidato da --draw. */
export function CareerTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  useTimelineDraw(ref);
  const [geom, setGeom] = useState<{ ys: number[]; h: number; w: number }>({ ys: [], h: 0, w: 0 });
  const n = COMMITS.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const base = el.getBoundingClientRect();
      const ys = [...el.querySelectorAll<HTMLElement>('.tl__commit')].map(
        (r) => r.getBoundingClientRect().top - base.top + 10,
      );
      setGeom({ ys, h: base.height, w: base.width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="tl" ref={ref}>
      {geom.ys.length === n && <TimelineGraph ys={geom.ys} h={geom.h} w={geom.w} />}
      <ol className="tl__list">
        {COMMITS.map((c, i) => (
          <CommitRow key={c.hash} commit={c} at={i / (n - 1)} />
        ))}
      </ol>
    </div>
  );
}
