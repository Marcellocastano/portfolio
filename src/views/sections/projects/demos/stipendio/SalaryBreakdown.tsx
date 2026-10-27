import { useCountUp } from '../../../../../controllers/useCountUp';
import { i18n } from '../../../../../models/i18n.model';
import { formatEuro, type NetBreakdown } from '../../../../../models/projects/stipendio.model';
import './SalaryBreakdown.css';

interface Props {
  breakdown: NetBreakdown;
  running: boolean;
}

export function SalaryBreakdown({ breakdown, running }: Props) {
  const inps = useCountUp(breakdown.inps, running);
  const irpef = useCountUp(breakdown.irpef, running);
  const addReg = useCountUp(breakdown.addReg, running);
  const addCom = useCountUp(breakdown.addCom, running);

  const t = i18n.demos.stipendio.rows;
  const rows = [
    { label: t.inps.label, hint: t.inps.hint, value: inps },
    { label: t.irpef.label, hint: t.irpef.hint, value: irpef },
    { label: t.addReg.label, hint: t.addReg.hint, value: addReg },
    { label: t.addCom.label, hint: t.addCom.hint, value: addCom },
  ];

  return (
    <ul className="salary-breakdown">
      <li className="salary-breakdown__head">{i18n.demos.stipendio.detail}</li>
      {rows.map((row) => (
        <li key={row.label}>
          <span>
            {row.label}
            <small>{row.hint}</small>
          </span>
          <b>{formatEuro(row.value)}</b>
        </li>
      ))}
    </ul>
  );
}
