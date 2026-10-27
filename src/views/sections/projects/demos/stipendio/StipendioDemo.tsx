import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { useStipendioDemo } from '../../../../../controllers/useStipendioDemo';
import { i18n } from '../../../../../models/i18n.model';
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
          <span>{i18n.demos.stipendio.netAnnual}</span>
          <strong>{formatEuro(d.shown)}</strong>
          <small>{i18n.demos.stipendio.ofRal(String(Math.round((breakdown.netto / ral) * 1000) / 10))}</small>
        </div>
        <div className="stip-demo__row">
          <div>
            <span>{i18n.demos.stipendio.netMonthly}</span>
            <b>{formatEuro(breakdown.netto / d.mensilita)}</b>
            <small>{i18n.demos.stipendio.overMonths(d.mensilita)}</small>
          </div>
          <div>
            <span>{i18n.demos.stipendio.deductions}</span>
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
