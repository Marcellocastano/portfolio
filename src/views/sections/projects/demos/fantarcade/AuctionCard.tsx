import type { CSSProperties } from 'react';
import { AUCTION_SECONDS, type AuctionState, type Player } from '../../../../../models/projects/auction.model';
import { SoldStamp } from './SoldStamp';
import './AuctionCard.css';

interface Props {
  state: AuctionState;
  player: Player;
  shownPrice: number;
}

export function AuctionCard({ state, player, shownPrice }: Props) {
  const sold = state.phase === 'sold';
  return (
    <div className="fa-card" data-shake={sold}>
      <div className="fa-card__top">
        <span className="fa-card__role">
          <b>P</b> {player.role}
        </span>
        <span className="fa-card__value">
          <small>Valore</small> {player.value}
        </span>
      </div>
      <h5 className="fa-card__player">{player.name}</h5>
      <span className="fa-card__team">{player.team}</span>
      <ul className="fa-card__stats">
        {player.stats.map((s) => (
          <li key={s.label}>
            <small>{s.label}</small>
            {s.value}
          </li>
        ))}
      </ul>
      <div className="fa-card__live">
        <div>
          <small>LIVE PRICE</small>
          <b>{Math.round(shownPrice)} Cr</b>
        </div>
        <div className="fa-card__timer">
          <small>FINE ASTA</small>
          <b>{state.timeLeft}</b>
        </div>
      </div>
      <div className="fa-card__countdown">
        <i style={{ '--w': `${(state.timeLeft / AUCTION_SECONDS) * 100}%` } as CSSProperties} />
      </div>
      {sold && <SoldStamp winner={state.winner} stampKey={state.playerIndex} />}
    </div>
  );
}
