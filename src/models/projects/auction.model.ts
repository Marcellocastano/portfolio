import {
  INITIAL_CREDITS,
  LOT_MS,
  LOTS,
  OPENING_BID,
  ROSTER,
  TEAM_DEFS,
  TICK_MS,
  type Kit,
  type Player,
  type Role,
} from './auctionData.model';

export * from './auctionData.model';
export { monogram, splitName, ROLE_NAME, ROLE_PLURAL, TIER_NAME } from './auctionNames.model';

export interface RosterEntry {
  role: Role;
  name: string;
  price: number;
}

export interface Team {
  id: string;
  name: string;
  kit: Kit;
  you: boolean;
  credits: number;
  roster: RosterEntry[];
}

export interface Bid {
  teamId: string;
  amount: number;
}

export type AuctionPhase = 'live' | 'sold';

export interface AuctionState {
  lotIndex: number;
  bid: number;
  bidderId: string | null;
  bids: Bid[];
  timeLeft: number;
  phase: AuctionPhase;
  teams: Team[];
}

const initialTeams = (): Team[] => TEAM_DEFS.map((d) => ({ ...d, credits: INITIAL_CREDITS, roster: [] }));

export const currentLot = (state: AuctionState): Player => LOTS[state.lotIndex % LOTS.length];

export const you = (state: AuctionState): Team => state.teams.find((t) => t.you) ?? state.teams[0];

export const leader = (state: AuctionState): Team | undefined => state.teams.find((t) => t.id === state.bidderId);

export const userLeads = (state: AuctionState): boolean => state.bidderId === you(state).id;

/** L'ultimo rilancio non è tuo e quello prima era tuo: ti hanno appena superato. */
export function isOutbid(state: AuctionState): boolean {
  const n = state.bids.length;
  return n >= 2 && state.bids[n - 1].teamId !== you(state).id && state.bids[n - 2].teamId === you(state).id;
}

export const rosterCount = (team: Team, role: Role): number => team.roster.filter((p) => p.role === role).length;

export const needsRole = (team: Team, role: Role): boolean => rosterCount(team, role) < ROSTER[role];

const remainingSlots = (team: Team): number => 8 - team.roster.length;

/** Massimo offribile: resta almeno 1 credito per ogni altro slot da riempire. */
export function maxBid(team: Team): number {
  const slots = remainingSlots(team);
  return slots <= 0 ? 0 : team.credits - (slots - 1);
}

function applyBid(state: AuctionState, teamId: string, amount: number): AuctionState {
  return { ...state, bid: amount, bidderId: teamId, timeLeft: LOT_MS, bids: [...state.bids, { teamId, amount }] };
}

/** Il chiamante è un bot che ha bisogno del ruolo, a rotazione per lotIndex. */
const callerId = (teams: Team[], role: Role, lotIndex: number): string | null => {
  const callers = teams.filter((t) => !t.you && needsRole(t, role));
  return callers.length === 0 ? null : callers[lotIndex % callers.length].id;
};

/** Apre il lotto: superato l'ultimo si riparte da capo con crediti e rose azzerate. */
export function openLot(state: AuctionState, lotIndex: number): AuctionState {
  const index = lotIndex % LOTS.length;
  const teams = index === 0 ? initialTeams() : state.teams;
  const player = LOTS[index];
  const bidderId = callerId(teams, player.role, index);
  const base: AuctionState = {
    lotIndex: index,
    bid: 0,
    bidderId: null,
    bids: [],
    timeLeft: LOT_MS,
    phase: 'live',
    teams,
  };
  return bidderId ? applyBid(base, bidderId, OPENING_BID) : base;
}

const FIRST_BIDS: [number, number][] = [
  [1, OPENING_BID],
  [3, 5],
  [5, 9],
];

/** Stato iniziale deterministico (SSR-safe): primo lotto già vivo con tre offerte. */
export function initialAuction(): AuctionState {
  const teams = initialTeams();
  const bids = FIRST_BIDS.map(([i, amount]) => ({ teamId: teams[i].id, amount }));
  const last = bids[bids.length - 1];
  return { lotIndex: 0, bid: last.amount, bidderId: last.teamId, bids, timeLeft: 3200, phase: 'live', teams };
}

/** Il timer scende; allo zero il lotto è aggiudicato al miglior offerente. */
export function tick(state: AuctionState): AuctionState {
  if (state.phase !== 'live') return state;
  const timeLeft = state.timeLeft - TICK_MS;
  if (timeLeft > 0) return { ...state, timeLeft };
  const player = currentLot(state);
  const teams = state.teams.map((t) =>
    t.id === state.bidderId
      ? {
          ...t,
          credits: t.credits - state.bid,
          roster: [...t.roster, { role: player.role, name: player.name, price: state.bid }],
        }
      : t,
  );
  return { ...state, timeLeft: 0, phase: 'sold', teams };
}

/** Rilancio dell'utente: solo da non in testa, con bisogno del ruolo e crediti sufficienti. */
export function userBid(state: AuctionState, inc: number): AuctionState {
  const me = you(state);
  if (state.phase !== 'live' || userLeads(state) || !needsRole(me, currentLot(state).role)) return state;
  const amount = state.bid + inc;
  return amount <= maxBid(me) ? applyBid(state, me.id, amount) : state;
}
