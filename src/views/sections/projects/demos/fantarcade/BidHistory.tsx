import type { Bid } from '../../../../../models/projects/auction.model';
import './BidHistory.css';

export function BidHistory({ bids, basePrice }: { bids: Bid[]; basePrice: number }) {
  return (
    <ul className="fa-bids">
      <li className="fa-bids__head">Cronologia rilanci</li>
      {bids.length === 0 && <li className="fa-bids__empty">Nessun rilancio ancora</li>}
      {bids.map((b, i) => (
        <li key={`${b.by}-${b.amount}-${i}`} data-you={b.you}>
          <span>{b.by}</span>
          <b>+{b.amount - (bids[i + 1]?.amount ?? basePrice)} Cr</b>
        </li>
      ))}
    </ul>
  );
}
