import { useCountUp } from '../../../../../controllers/useCountUp';
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

  const rows = [
    { label: 'Contributi INPS', hint: '9,19% della RAL', value: inps },
    { label: 'IRPEF netta', hint: 'Imposta sul reddito', value: irpef },
    { label: 'Add. regionale', hint: '1,73%', value: addReg },
    { label: 'Add. comunale', hint: '0,8%', value: addCom },
  ];

  return (
    <ul className="salary-breakdown">
      <li className="salary-breakdown__head">Dettaglio calcolo</li>
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
