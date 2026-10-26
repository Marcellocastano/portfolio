import { useCallback, useEffect, useRef, useState } from 'react';
import { mulberry32 } from '../lib/prng';
import { TICK_MS } from '../models/projects/auctionData.model';
import { initialAuction, isOutbid, openLot, tick, userBid, type AuctionState } from '../models/projects/auction.model';
import { botTick } from '../models/projects/auctionBots.model';
import { useInterval } from './useInterval';
import { useReducedMotion } from './useReducedMotion';

const SEED = 7;
const SOLD_MS = 2400;

export function useAuctionDemo(running: boolean) {
  const rngRef = useRef(mulberry32(SEED));
  const [state, setState] = useState<AuctionState>(initialAuction);
  const [outbidKey, setOutbidKey] = useState(0);
  const wasOutbid = useRef(false);
  const reduced = useReducedMotion();

  useInterval(() => setState((s) => botTick(tick(s), rngRef.current)), TICK_MS, running && !reduced);

  useEffect(() => {
    if (!running || reduced || state.phase !== 'sold') return;
    const id = window.setTimeout(() => setState((s) => openLot(s, s.lotIndex + 1)), SOLD_MS);
    return () => window.clearTimeout(id);
  }, [running, state.phase, reduced]);

  const outbid = isOutbid(state);
  useEffect(() => {
    if (outbid && !wasOutbid.current) setOutbidKey((k) => k + 1);
    wasOutbid.current = outbid;
  }, [outbid]);

  const bid = useCallback((inc: number) => setState((s) => userBid(s, inc)), []);
  const next = useCallback(() => setState((s) => (s.phase === 'sold' ? openLot(s, s.lotIndex + 1) : s)), []);

  return { state, outbid, outbidKey, bid, next };
}
