import { useRef } from 'react';
import { useInView } from '../../../../../controllers/useInView';
import { useAuctionDemo } from '../../../../../controllers/useAuctionDemo';
import { BID_STEPS, DIFFICULTIES, type Difficulty } from '../../../../../models/projects/auction.model';
import { AuctionCard } from './AuctionCard';
import { BidHistory } from './BidHistory';
import { TeamsRecap } from './TeamsRecap';
import './FantArcadeDemo.css';

const DIFF_LABELS: Record<Difficulty, string> = { facile: 'Facile', normale: 'Normale', difficile: 'Difficile' };

export function FantArcadeDemo({ running }: { running: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { state, player, shownPrice, difficulty, setDifficulty, bid } = useAuctionDemo(running && inView);
  const sold = state.phase === 'sold';

  return (
    <div className="fa-demo" ref={ref}>
      <h4 className="fa-demo__logo">FantArcade</h4>
      <div className="fa-demo__body">
        <div className="fa-demo__left">
          <AuctionCard state={state} player={player} shownPrice={shownPrice} />
          <div className="fa-demo__bidrow">
            {BID_STEPS.map((step) => (
              <button key={step} type="button" onClick={() => bid(step)} disabled={sold}>
                +{step}
              </button>
            ))}
          </div>
          <div className="fa-demo__diff">
            {DIFFICULTIES.map((d) => (
              <button key={d} type="button" data-current={d === difficulty} onClick={() => setDifficulty(d)}>
                {DIFF_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
        <div className="fa-demo__right">
          <BidHistory bids={state.bids} basePrice={player.basePrice} />
          <TeamsRecap teams={state.teams} />
        </div>
      </div>
    </div>
  );
}
