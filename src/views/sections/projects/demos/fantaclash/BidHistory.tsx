import { HISTORY_SIZE, type AuctionState, type Team } from '../../../../../models/projects/auction.model';
import { TeamBadge } from './TeamBadge';
import './BidHistory.css';

interface Row {
  teamId: string;
  amount: number;
  delta: number | null;
}

function rows(state: AuctionState): Row[] {
  return state.bids
    .map((b, i) => ({ ...b, delta: i > 0 ? b.amount - state.bids[i - 1].amount : null }))
    .slice(-HISTORY_SIZE)
    .reverse();
}

function RowItem({ row, team, top }: { row: Row; team: Team | undefined; top: boolean }) {
  const mine = Boolean(team?.you);
  return (
    <li className="fc-hist__item" data-top={top} data-mine={mine}>
      {team && <TeamBadge name={team.name} kit={team.kit} />}
      <span className="fc-hist__name">{mine ? 'La tua squadra' : team?.name}</span>
      {top && <span className="fc-hist__lead">In testa</span>}
      <span className="fc-hist__delta">{row.delta === null ? 'apre' : `+${row.delta}`}</span>
      <span className="fc-hist__amt">
        {row.amount} <small>Cr</small>
      </span>
    </li>
  );
}

/** Le ultime offerte del lotto, dalla più recente. */
export function BidHistory({ state }: { state: AuctionState }) {
  const list = rows(state);
  if (list.length === 0) return null;
  const count = state.bids.length;
  return (
    <section className="fc-hist" aria-label="Ultimi rilanci">
      <div className="fc-hist__head">
        <h3 className="fc-hist__title">Ultimi rilanci</h3>
        <span className="fc-hist__count">
          {count} {count === 1 ? 'offerta' : 'offerte'}
        </span>
      </div>
      <ol className="fc-hist__list">
        {list.map((r, i) => (
          <RowItem
            key={`${r.teamId}-${r.amount}-${i}`}
            row={r}
            team={state.teams.find((t) => t.id === r.teamId)}
            top={i === 0}
          />
        ))}
      </ol>
    </section>
  );
}
