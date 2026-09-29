import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { useStipendioDemo } from '../../../../../controllers/useStipendioDemo';
import { formatEuro, trattenuteTotali } from '../../../../../models/projects/stipendio.model';
import { ControlsCard } from './ControlsCard';
import { DonutChart } from './DonutChart';
import { SalaryBreakdown } from './SalaryBreakdown';
import './StipendioDemo.css';

export function StipendioDemo({ running }: { running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const d = useStipendioDemo(running && inView);
  const { ral, breakdown } = d;
  const trattenute = trattenuteTotali(breakdown);
  const donutData = { ...breakdown, addizionali: breakdown.addReg + breakdown.addCom };

  return (
    <div className="stip-demo" ref={ref}>
      <ControlsCard d={d} />
      <div className="stip-demo__results">
        <div className="stip-demo__net">
          <span>Netto annuale</span>
          <strong>{formatEuro(d.shown)}</strong>
          <small>{Math.round((breakdown.netto / ral) * 1000) / 10}% della RAL</small>
        </div>
        <div className="stip-demo__row">
          <div>
            <span>Netto mensile</span>
            <b>{formatEuro(breakdown.netto / d.mensilita)}</b>
            <small>su {d.mensilita} mensilità</small>
          </div>
          <div>
            <span>Trattenute</span>
            <b className="stip-demo__cost">{formatEuro(trattenute)}</b>
            <small>{Math.round((trattenute / ral) * 1000) / 10}%</small>
          </div>
        </div>
        <div className="stip-demo__detail">
          <DonutChart breakdown={donutData} ral={ral} />
          <SalaryBreakdown breakdown={breakdown} running={running && inView} />
        </div>
      </div>
    </div>
  );
}
