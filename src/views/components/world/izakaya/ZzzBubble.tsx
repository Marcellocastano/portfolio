import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { revealAt } from '../../../../lib/world/izakayaCutaway';
import { ROOM } from '../../../../models/world/room.model';
import './ZzzBubble.css';

type Phase = 'hidden' | 'asleep' | 'pop';

/** Durata dello scoppio (deve coincidere con l'animazione `zzz-pop` in ZzzBubble.css). */
const POP_MS = 420;

interface Props {
  /** Luce spenta = addormentato. */
  asleep: boolean;
  /** Avanzamento dello scroll: la nuvoletta si vede solo a facciata aperta. */
  focus: MutableRefObject<number>;
}

/** La nuvoletta del sonno sopra la mia testa: compare a luce spenta e scoppia quando la luce si riaccende. */
export function ZzzBubble({ asleep, focus }: Props) {
  const [phase, setPhase] = useState<Phase>('hidden');
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (asleep) {
      setPhase('asleep');
      return;
    }
    setPhase((p) => (p === 'asleep' ? 'pop' : p));
    const id = window.setTimeout(() => setPhase('hidden'), POP_MS);
    return () => window.clearTimeout(id);
  }, [asleep]);

  useFrame(() => {
    if (wrap.current) wrap.current.style.opacity = String(revealAt(focus.current) > 0.7 ? 1 : 0);
  });

  if (phase === 'hidden') return null;
  return (
    <Html position={ROOM.bubble} center zIndexRange={[15, 0]} pointerEvents="none">
      <div ref={wrap} className="zzz" data-phase={phase} aria-hidden="true">
        <span className="zzz__cloud">
          <b>Z</b>
          <b>z</b>
          <b>z</b>
        </span>
        <i className="zzz__dot zzz__dot--1" />
        <i className="zzz__dot zzz__dot--2" />
      </div>
    </Html>
  );
}
