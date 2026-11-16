import { useFrame } from '@react-three/fiber';
import { useRef, type MutableRefObject, type ReactNode } from 'react';
import { MathUtils, type Group } from 'three';
import type { Pointer } from '../../../controllers/useWorldInputs';
import type { Drag } from '../../../controllers/useWorldDrag';
import { DRAG, FOCUS, REST_Y, phasesAt } from '../../../models/world/world.model';

const TAU = Math.PI * 2;

interface Props {
  pointer: MutableRefObject<Pointer>;
  /** Avanzamento dello scroll dell'hero, 0-1 (già smorzato da CameraRig). */
  focus: MutableRefObject<number>;
  /** Rotazione a mano nella vista iniziale. */
  drag: MutableRefObject<Drag>;
  children: ReactNode;
}

/**
 * Inerzia dopo il rilascio finché si è a riposo; appena si scorre la rotazione a mano torna a zero per la via
 * più breve. Il giro intero tolto a `yaw` si toglie anche al gruppo: stesso orientamento, nessun salto.
 */
function updateDrag(d: Drag, group: Group, focus: number, delta: number) {
  d.enabled = focus < DRAG.rest;
  if (d.dragging) return;
  if (d.enabled) {
    d.yaw += d.velocity * delta;
    d.velocity = MathUtils.damp(d.velocity, 0, DRAG.friction, delta);
    return;
  }
  d.velocity = 0;
  const turns = Math.round(d.yaw / TAU);
  if (turns !== 0) {
    d.yaw -= turns * TAU;
    group.rotation.y -= turns * TAU;
  }
  d.yaw = MathUtils.damp(d.yaw, 0, DRAG.settle, delta);
}

/**
 * Il mondo fluttua piano e si inclina seguendo il puntatore, con smorzamento; senza puntatore torna a riposo.
 * A riposo si può girare a mano trascinando; allo scroll ruota fino all'angolo della sezione sullo studio, e
 * puntatore e rotazione a mano contano sempre meno. Lo scroll della pagina non viene mai toccato.
 */
export function Rig({ pointer, focus, drag, children }: Props) {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const f = focus.current;
    const free = 1 - f;
    const d = drag.current;
    updateDrag(d, group, f, delta);
    // Mentre si trascina la parallasse del puntatore si spegne: comanda la mano, e la casa la segue da vicino.
    const parallax = d.dragging ? 0 : pointer.current.x * 0.32 * free;
    // La rotazione si completa con l'apertura: durante l'avvicinamento alla scrivania la casa resta ferma.
    const restY = MathUtils.lerp(REST_Y, FOCUS.rotationY, phasesAt(f).open) + d.yaw;
    group.rotation.y = MathUtils.damp(group.rotation.y, restY + parallax, d.dragging ? 12 : 2.5, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, pointer.current.y * 0.07 * free, 2.5, delta);
    group.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07 * free;
  });

  return <group ref={ref}>{children}</group>;
}
