import '@fontsource-variable/big-shoulders/wght.css';
import '@fontsource-variable/public-sans/wght.css';
import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { useAuctionDemo } from '../../../../../controllers/useAuctionDemo';
import {
  JOURNEY_STEPS,
  ROLE_PLURAL,
  currentLot,
  userLeads,
  you,
  type AuctionState,
} from '../../../../../models/projects/auction.model';
import { BidControls } from './BidControls';
import { BidHistory } from './BidHistory';
import { FcLogo } from './FcLogo';
import { PlayerCard } from './PlayerCard';
import { PriceBlock } from './PriceBlock';
import { SoldStamp } from './SoldStamp';
import { TeamsRecap } from './TeamsRecap';
import './FantaClashDemo.css';

const stageTitle = (state: AuctionState): string => {
  if (state.phase !== 'sold') return "All'asta";
  return userLeads(state) ? 'È tuo!' : 'Aggiudicato';
};

function FcNav({ role, credits }: { role: string; credits: number }) {
  return (
    <header className="fc-nav">
      <span className="fc-nav__brand">
        <FcLogo className="fc-nav__mark" />
        <span className="fc-nav__word">FantaClash</span>
      </span>
      <ol className="fc-nav__trail" aria-label="Percorso di gioco">
        {JOURNEY_STEPS.map((step, i) => (
          <li key={step} className="fc-nav__step">
            {i > 0 && <i className="fc-nav__sep" aria-hidden="true" />}
            <span className="fc-nav__label" data-active={i === 0} aria-current={i === 0 ? 'step' : undefined}>
              {step}
            </span>
          </li>
        ))}
      </ol>
      <div className="fc-nav__side">
        <span className="fc-nav__stat">
          <small>Reparto</small>
          <b>{role}</b>
        </span>
        <span className="fc-nav__stat">
          <small>Crediti</small>
          <b>{credits}</b>
        </span>
      </div>
    </header>
  );
}

export function FantaClashDemo({ running }: { running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { state, outbid, outbidKey, bid, next } = useAuctionDemo(running && inView);
  const player = currentLot(state);
  const sold = state.phase === 'sold';

  return (
    <div className="fc-shell" ref={ref}>
      <div className="fc-demo">
        <FcNav role={ROLE_PLURAL[player.role]} credits={you(state).credits} />
        <div className="fc-body">
          <section className="fc-stage">
            <h3 className="fc-stage__title">{stageTitle(state)}</h3>
            <div className="fc-stage__card" key={state.lotIndex}>
              <PlayerCard player={player} />
              {sold && <SoldStamp yours={userLeads(state)} />}
            </div>
            <PriceBlock state={state} outbid={outbid} key={outbid ? `outbid-${outbidKey}` : 'price'} />
            <BidControls state={state} onBid={bid} onNext={next} />
            <BidHistory state={state} />
          </section>
          <aside className="fc-side">
            <TeamsRecap teams={state.teams} bidderId={state.bidderId} />
          </aside>
        </div>
      </div>
    </div>
  );
}
