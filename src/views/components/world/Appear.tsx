import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode } from 'react';
import type { Group } from 'three';
import { INTRO } from '../../../models/world/world.model';

const easeOutBack = (x: number) => 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2;
const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;

/** Ingresso di un gruppo: cresce con un piccolo rimbalzo e si posa dall'alto, dopo `delay` secondi. */
export function Appear({ delay, children }: { delay: number; children: ReactNode }) {
  const ref = useRef<Group>(null);
  const done = useRef(false);
  // Il tempo parte dal primo frame del gruppo, non dall'avvio del canvas: i modelli caricati dopo entrano lo stesso.
  const start = useRef<number | null>(null);

  useFrame((state) => {
    const group = ref.current;
    if (!group || done.current) return;
    start.current ??= state.clock.elapsedTime;
    const p = Math.min(1, Math.max(0, (state.clock.elapsedTime - start.current - delay) / INTRO.duration));
    group.scale.setScalar(Math.max(0.0001, easeOutBack(p)));
    group.position.y = (1 - easeOutCubic(p)) * 0.5;
    if (p === 1) done.current = true;
  });

  return (
    <group ref={ref} scale={0.0001}>
      {children}
    </group>
  );
}
