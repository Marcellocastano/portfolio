import { ROLE_NAME, TIER_NAME, splitName, tierOf, type Player } from '../../../../../models/projects/auction.model';
import './PlayerCard.css';

/** Card stile figurina: overall e ruolo in alto, cognome grande, tre numeri. */
export function PlayerCard({ player }: { player: Player }) {
  const tier = tierOf(player.overall);
  const { surname, firstName } = splitName(player.name);
  return (
    <div className="fc-pcard" data-tier={tier}>
      {tier === 'elite' && <span className="fc-pcard__frame" aria-hidden="true" />}
      <div className="fc-pcard__top">
        <div className="fc-pcard__ovr">
          <span className="fc-pcard__num">{player.overall}</span>
          <span className="fc-pcard__role" data-role={player.role}>
            {player.role}
          </span>
        </div>
        <div className="fc-pcard__head">
          <p className="fc-pcard__team">{player.team}</p>
          <p className="fc-pcard__sub">
            <span>{ROLE_NAME[player.role]}</span>
            <span>{TIER_NAME[tier]}</span>
          </p>
        </div>
      </div>
      <div className="fc-pcard__name">
        {firstName && <p className="fc-pcard__first">{firstName}</p>}
        <p className="fc-pcard__surname">{surname}</p>
      </div>
      <div className="fc-pcard__stats">
        {player.stats.map((s) => (
          <div key={s.label} className="fc-pcard__stat">
            <span className="fc-pcard__value">{s.value}</span>
            <span className="fc-pcard__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
