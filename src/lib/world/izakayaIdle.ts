import type { Object3D } from 'three';
import { IZAKAYA_NODES } from '../../models/world/izakaya.model';
import type { IzakayaParts } from './izakayaParts';

/** Un oggetto con un movimento lento e continuo. */
export interface IdleItem {
  obj: Object3D;
  kind: 'bob' | 'sway' | 'drift';
  base: number;
  phase: number;
}

/** Riconosce gli oggetti animati: pannelli olografici, lanterne appese e petali. */
export function idleItem(obj: Object3D, hash: number): IdleItem | null {
  const phase = hash * Math.PI * 2;
  if (IZAKAYA_NODES.holo.test(obj.name)) return { obj, kind: 'bob', base: obj.position.y, phase };
  if (IZAKAYA_NODES.lantern.test(obj.name)) return { obj, kind: 'sway', base: obj.rotation.z, phase };
  if (obj.name === IZAKAYA_NODES.petals) return { obj, kind: 'drift', base: obj.position.y, phase };
  return null;
}

/** Pannelli che fluttuano, lanterne che oscillano, petali che scendono. */
export function applyIdle(parts: IzakayaParts, t: number) {
  for (const it of parts.idle) {
    if (it.kind === 'bob') it.obj.position.y = it.base + Math.sin(t * 1.4 + it.phase) * 0.025;
    if (it.kind === 'sway') it.obj.rotation.z = it.base + Math.sin(t * 0.9 + it.phase) * 0.035;
    if (it.kind === 'drift') it.obj.position.y = it.base - ((t * 0.05) % 0.3);
  }
}
