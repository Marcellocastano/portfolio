import type { Rng } from '../../lib/prng';
import { pick, pickInt } from '../../lib/prng';
import { BOT_NAMES, PLAYERS, TEAM_BUDGET, TEAMS, YOU } from './auctionData.model';

export type { Player } from './auctionData.model';
export { PLAYERS, YOU } from './auctionData.model';

export interface Bid {
  by: string;
  amount: number;
  you: boolean;
}

export interface TeamRecap {
  name: string;
  budget: number;
  spent: number;
}

export type Difficulty = 'facile' | 'normale' | 'difficile';
export type AuctionPhase = 'live' | 'sold';

export interface AuctionState {
  playerIndex: number;
  price: number;
  timeLeft: number;
  bids: Bid[];
  teams: TeamRecap[];
  phase: AuctionPhase;
  winner: string | null;
  seed: number;
}

export const AUCTION_SECONDS = 24;
export const BID_STEPS = [1, 5, 10];
export const DIFFICULTIES: Difficulty[] = ['facile', 'normale', 'difficile'];

const BOT_CHANCE: Record<Difficulty, number> = { facile: 0.14, normale: 0.3, difficile: 0.5 };
const BOT_CAP: Record<Difficulty, number> = { facile: 0.7, normale: 1.05, difficile: 1.6 };

function initialTeams(): TeamRecap[] {
  return TEAMS.map((name) => ({ name, budget: TEAM_BUDGET, spent: 0 }));
}

/** Parte con due rilanci bot già in cronologia: l'asta è subito viva. */
export function initialAuction(seed: number): AuctionState {
  const base = PLAYERS[0].basePrice;
  const bids: Bid[] = [
    { by: TEAMS[2], amount: base + 3, you: false },
    { by: TEAMS[1], amount: base + 1, you: false },
  ];
  return {
    playerIndex: 0,
    price: base + 3,
    timeLeft: AUCTION_SECONDS - 4,
    bids,
    teams: initialTeams(),
    phase: 'live',
    winner: null,
    seed,
  };
}

function withBid(state: AuctionState, by: string, inc: number, you: boolean): AuctionState {
  const bid: Bid = { by, amount: state.price + inc, you };
  return { ...state, price: bid.amount, timeLeft: AUCTION_SECONDS, bids: [bid, ...state.bids].slice(0, 5) };
}

export function userBid(state: AuctionState, inc: number): AuctionState {
  return state.phase === 'live' ? withBid(state, YOU, inc, true) : state;
}

export function tickAuction(state: AuctionState): AuctionState {
  if (state.phase !== 'live') return state;
  const timeLeft = state.timeLeft - 1;
  if (timeLeft > 0) return { ...state, timeLeft };
  return { ...state, timeLeft: 0, phase: 'sold', winner: state.bids[0]?.by ?? 'Nessuno' };
}

/** Giocatore successivo; il vincitore spende il prezzo nel recap squadre. */
export function nextPlayer(state: AuctionState): AuctionState {
  const playerIndex = (state.playerIndex + 1) % PLAYERS.length;
  const player = PLAYERS[playerIndex];
  const base = player.basePrice;
  const teams = state.teams.map((t) => (t.name === state.winner ? { ...t, spent: t.spent + state.price } : t));
  const bids: Bid[] = [
    { by: pickBotName(playerIndex), amount: base + 2, you: false },
    { by: TEAMS[3], amount: base + 1, you: false },
  ];
  return {
    ...state,
    playerIndex,
    price: base + 2,
    timeLeft: AUCTION_SECONDS - 3,
    bids,
    teams,
    phase: 'live',
    winner: null,
  };
}

function pickBotName(playerIndex: number): string {
  return TEAMS[1 + (playerIndex % (TEAMS.length - 1))];
}

/** Decisione bot pura: rilancia se sotto il tetto e il rng lo permette. */
export function botBid(state: AuctionState, difficulty: Difficulty, rng: Rng): AuctionState {
  if (state.phase !== 'live' || rng() > BOT_CHANCE[difficulty]) return state;
  const cap = PLAYERS[state.playerIndex].value * BOT_CAP[difficulty];
  if (state.price >= cap) return state;
  return withBid(state, pick(rng, BOT_NAMES), pickInt(rng, 1, 3), false);
}
