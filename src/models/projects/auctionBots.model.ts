import { mulberry32, pick, type Rng } from '../../lib/prng';
import { LOT_MS } from './auctionData.model';
import { currentLot, maxBid, needsRole, type AuctionState, type Team } from './auction.model';

/** Sotto i 2.5 secondi i bot si agitano: rilanciano più spesso. */
const bidChance = (timeLeft: number): number => (timeLeft < 2500 ? 0.2 : 0.1);

const LIMIT_MIN = 0.6;
const LIMIT_SPREAD = 0.65;

const seedFor = (lotIndex: number, teamId: string): number => {
  const key = `${lotIndex}:${teamId}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** Tetto di spesa deterministico per (lotto, squadra): mai ricalcolato a caso. */
export function botLimit(state: AuctionState, team: Team): number {
  const factor = LIMIT_MIN + mulberry32(seedFor(state.lotIndex, team.id))() * LIMIT_SPREAD;
  return Math.min(Math.round(currentLot(state).value * factor), maxBid(team));
}

const botAmount = (state: AuctionState, team: Team): number => {
  const limit = botLimit(state, team);
  const inc = Math.max(1, Math.round(state.bid * 0.05), Math.floor((limit - state.bid) * 0.2));
  return Math.min(state.bid + inc, limit);
};

/** Ogni tick un bot può rilanciare: il timer riparte da capo a ogni offerta. */
export function botTick(state: AuctionState, rng: Rng): AuctionState {
  if (state.phase !== 'live' || rng() >= bidChance(state.timeLeft)) return state;
  const role = currentLot(state).role;
  const candidates = state.teams.filter(
    (t) => !t.you && t.id !== state.bidderId && needsRole(t, role) && botLimit(state, t) > state.bid,
  );
  if (candidates.length === 0) return state;
  const team = pick(rng, candidates);
  const amount = botAmount(state, team);
  return {
    ...state,
    bid: amount,
    bidderId: team.id,
    timeLeft: LOT_MS,
    bids: [...state.bids, { teamId: team.id, amount }],
  };
}
