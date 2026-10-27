import { i18n } from '../../../../../models/i18n.model';
import {
  BID_STEPS,
  currentLot,
  maxBid,
  needsRole,
  userLeads,
  you,
  type AuctionState,
} from '../../../../../models/projects/auction.model';
import './BidControls.css';

interface Props {
  state: AuctionState;
  onBid: (inc: number) => void;
  onNext: () => void;
}

const SECONDS_LOW = 2000;

function NextButton({ lotIndex, onNext }: { lotIndex: number; onNext: () => void }) {
  return (
    <button type="button" className="fc-next" onClick={onNext}>
      <span className="fc-next__drain" key={lotIndex} aria-hidden="true" />
      {i18n.demos.fantaclash.bid.next}
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </button>
  );
}

function hint(leads: boolean, max: number): string {
  return leads ? i18n.demos.fantaclash.bid.leading : i18n.demos.fantaclash.bid.max(max);
}

/** Pulsanti di rilancio o, a lotto chiuso, il pulsante per il giocatore successivo. */
export function BidControls({ state, onBid, onNext }: Props) {
  if (state.phase === 'sold') return <NextButton lotIndex={state.lotIndex} onNext={onNext} />;

  const me = you(state);
  const max = maxBid(me);
  const leads = userLeads(state);
  const canRole = needsRole(me, currentLot(state).role);
  const seconds = Math.max(0, state.timeLeft / 1000);
  const low = state.timeLeft < SECONDS_LOW;

  return (
    <div className="fc-bid">
      <div className="fc-bid__time">
        <span className="fc-bid__label">{i18n.demos.fantaclash.bid.time}</span>
        <b className="fc-bid__sec" data-low={low} key={low ? Math.ceil(seconds) : 'ok'}>
          {seconds.toFixed(1)}
        </b>
      </div>
      {canRole ? (
        <div>
          <div className="fc-bid__row">
            {BID_STEPS.map((inc) => {
              const next = state.bid + inc;
              return (
                <button
                  key={inc}
                  type="button"
                  className="fc-bid__btn"
                  onClick={() => onBid(inc)}
                  disabled={leads || next > max}
                >
                  <span className="fc-bid__inc">+{inc}</span>
                  <span className="fc-bid__to">{i18n.demos.fantaclash.bid.to(next)}</span>
                </button>
              );
            })}
          </div>
          <p className="fc-bid__hint">{hint(leads, max)}</p>
        </div>
      ) : (
        <p className="fc-bid__hint">{i18n.demos.fantaclash.bid.roleDone}</p>
      )}
    </div>
  );
}
