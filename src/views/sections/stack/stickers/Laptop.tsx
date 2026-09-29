import type { ReactNode } from 'react';
import { useParallax } from '../../../../controllers/useParallax';
import './Laptop.css';

/** Coperchio del portatile visto di fronte: alluminio, emblema inciso, cerniera. */
export function Laptop({ children }: { children: ReactNode }) {
  const { ref, onPointerMove, onPointerLeave } = useParallax<HTMLDivElement>();
  return (
    <div className="lap">
      <div className="lap__lid" ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <span className="lap__logo" aria-hidden="true">
          &lt;mc<b>.</b>/&gt;
        </span>
        {children}
      </div>
      <div className="lap__base" aria-hidden="true" />
    </div>
  );
}
