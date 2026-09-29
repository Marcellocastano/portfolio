import { useCallback, useEffect, useRef, useState } from 'react';
import { mulberry32 } from '../lib/prng';
import {
  botBid,
  initialAuction,
  nextPlayer,
  PLAYERS,
  tickAuction,
  userBid,
  type AuctionState,
  type Difficulty,
} from '../models/projects/auction.model';
import { useCountUp } from './useCountUp';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const SEED = 7;
const TICK_MS = 1000;
const SOLD_MS = 2600;

export function useAuctionDemo(running: boolean) {
  const rngRef = useRef(mulberry32(SEED));
  const [state, setState] = useState<AuctionState>(() => initialAuction(SEED));
  const [difficulty, setDifficulty] = useState<Difficulty>('normale');
  const reduced = useReducedMotion();

  useInterval(
    () => {
      setState((s) => botBid(tickAuction(s), difficulty, rngRef.current));
    },
    TICK_MS,
    running && !reduced,
  );

  useEffect(() => {
    if (!running || state.phase !== 'sold') return;
    const id = window.setTimeout(() => setState((s) => nextPlayer(s)), reduced ? TICK_MS : SOLD_MS);
    return () => window.clearTimeout(id);
  }, [running, state.phase, reduced]);

  const bid = useCallback((inc: number) => setState((s) => userBid(s, inc)), []);
  const shownPrice = useCountUp(state.price, running);

  return { state, player: PLAYERS[state.playerIndex], shownPrice, difficulty, setDifficulty, bid };
}
