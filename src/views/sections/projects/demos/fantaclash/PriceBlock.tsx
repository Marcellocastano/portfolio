import { i18n } from '../../../../../models/i18n.model';
import { LOT_MS, leader, userLeads, type AuctionState } from '../../../../../models/projects/auction.model';
import { TeamBadge } from './TeamBadge';
import './PriceBlock.css';

interface Props {
  state: AuctionState;
  outbid: boolean;
}

type PriceTone = 'highlight' | 'ink' | 'whistle' | 'canvas';

function priceLabel(state: AuctionState, mine: boolean, outbid: boolean, leadName: string): string {
  const t = i18n.demos.fantaclash.price;
  if (state.phase === 'sold') return mine ? t.soldYou : t.soldTo(leadName);
  if (outbid) return t.outbid(leadName);
  if (mine) return t.youLead;
  return leadName ? t.lead : t.base;
}

function toneOf(live: boolean, mine: boolean, outbid: boolean): PriceTone {
  if (!live) return mine ? 'highlight' : 'ink';
  if (outbid) return 'whistle';
  return mine ? 'highlight' : 'canvas';
}

function barTone(low: boolean, mine: boolean): 'low' | 'mine' | 'bot' {
  if (low) return 'low';
  return mine ? 'mine' : 'bot';
}

/** Blocco prezzo: il colore racconta la situazione, la barra il tempo rimasto. */
export function PriceBlock({ state, outbid }: Props) {
  const live = state.phase === 'live';
  const lead = leader(state);
  const mine = userLeads(state);
  const low = live && state.timeLeft < 2000;
  const leadName = lead?.name ?? '';

  return (
    <div className="fc-price" data-tone={toneOf(live, mine, outbid)} data-shake={outbid}>
      <div className="fc-price__row">
        <div className="fc-price__info">
          <span className="fc-price__label">{priceLabel(state, mine, outbid, leadName)}</span>
          <span className="fc-price__team">
            {lead && <TeamBadge name={lead.name} kit={lead.kit} size="md" />}
            <span className="fc-price__name">
              {mine ? i18n.demos.fantaclash.yourTeam : leadName || i18n.demos.fantaclash.price.noBids}
            </span>
          </span>
        </div>
        <div className="fc-price__amount">
          <span className="fc-price__bid" key={state.bid}>
            {state.bid}
          </span>
          <span className="fc-price__cr">Cr</span>
        </div>
      </div>
      {live && (
        <div className="fc-price__bar">
          <i data-tone={barTone(low, mine)} style={{ width: `${(state.timeLeft / LOT_MS) * 100}%` }} />
        </div>
      )}
    </div>
  );
}
