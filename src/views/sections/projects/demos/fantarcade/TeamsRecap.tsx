import type { TeamRecap } from '../../../../../models/projects/auction.model';
import './TeamsRecap.css';

export function TeamsRecap({ teams }: { teams: TeamRecap[] }) {
  return (
    <ul className="fa-teams">
      <li className="fa-teams__head">Recap squadre</li>
      {teams.map((t) => {
        const left = t.budget - t.spent;
        return (
          <li key={t.name}>
            <div className="fa-teams__row">
              <span>{t.name}</span>
              <b>{left} Cr</b>
            </div>
            <div className="fa-teams__bar">
              <i style={{ width: `${(left / t.budget) * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
