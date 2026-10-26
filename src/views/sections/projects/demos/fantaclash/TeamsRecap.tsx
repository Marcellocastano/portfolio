import { ROLE_ORDER, ROSTER, rosterCount, type Team } from '../../../../../models/projects/auction.model';
import { TeamBadge } from './TeamBadge';
import './TeamsRecap.css';

interface Props {
  teams: Team[];
  bidderId: string | null;
}

const sorted = (teams: Team[]): Team[] =>
  [...teams].sort((a, b) => {
    if (a.you !== b.you) return a.you ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

type RowTone = 'idle' | 'mine' | 'bot';

function statusOf(team: Team, bidding: boolean): string | null {
  if (!bidding) return null;
  return team.you ? 'in testa' : 'rilancia';
}

function toneOf(team: Team, bidding: boolean): RowTone {
  if (!bidding) return 'idle';
  return team.you ? 'mine' : 'bot';
}

function TeamRow({ team, bidding }: { team: Team; bidding: boolean }) {
  const status = statusOf(team, bidding);
  const tone = toneOf(team, bidding);
  return (
    <li className="fc-teams__row" data-tone={tone}>
      <div className="fc-teams__main">
        <TeamBadge name={team.name} kit={team.kit} size="md" />
        <span className="fc-teams__id">
          <span className="fc-teams__name" data-you={team.you} title={team.name}>
            {team.you ? 'La tua squadra' : team.name}
          </span>
          {status ? (
            <span className="fc-teams__status" data-tone={tone}>
              {status}
            </span>
          ) : (
            team.you && <span className="fc-teams__sub">{team.name}</span>
          )}
        </span>
        <span className="fc-teams__credits">
          <b>{team.credits}</b>
          <small>crediti</small>
        </span>
      </div>
      <span className="fc-teams__slots">
        {ROLE_ORDER.flatMap((role) =>
          Array.from({ length: ROSTER[role] }, (_, i) => (
            <i
              key={`${role}${i}`}
              className="fc-teams__slot"
              data-role={role}
              data-filled={i < rosterCount(team, role)}
            />
          )),
        )}
      </span>
    </li>
  );
}

/** Le otto rose: crediti e una casella colorata per ogni posto comprato. */
export function TeamsRecap({ teams, bidderId }: Props) {
  return (
    <section className="fc-teams">
      <h3 className="fc-teams__title">Squadre</h3>
      <ul className="fc-teams__list">
        {sorted(teams).map((t) => (
          <TeamRow key={t.id} team={t} bidding={t.id === bidderId} />
        ))}
      </ul>
    </section>
  );
}
