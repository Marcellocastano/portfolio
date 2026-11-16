import type { Material, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { ROOM } from '../../models/world/room.model';
import type { IzakayaParts } from './izakayaParts';

/** Un materiale che emette luce (shoji, lanterne, insegna, distributore...) e la sua emissione di sera. */
export interface EmissiveRef {
  mat: MeshStandardMaterial;
  base: number;
  /** Lampada della stanza: segue anche l'interruttore. */
  room: boolean;
}

/** Schermo e pannelli olografici restano accesi anche di giorno: sono "elettronica", non luci del locale. */
const ALWAYS_ON = /Holo|Screen/;

/**
 * Raccoglie i materiali luminosi una volta sola, dopo che i pezzi della facciata hanno i loro materiali propri:
 * così spegnendo le luci di giorno si spengono anche le copie.
 */
export function collectEmissive(root: Object3D): EmissiveRef[] {
  const seen = new Set<Material>();
  const out: EmissiveRef[] = [];
  root.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh || ALWAYS_ON.test(mesh.name)) return;
    for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      const mat = m as MeshStandardMaterial;
      if (seen.has(m) || !mat.emissive || mat.emissiveIntensity <= 0 || mat.emissive.getHex() === 0) continue;
      seen.add(m);
      out.push({ mat, base: mat.emissiveIntensity, room: ROOM.lamps.test(mesh.name) });
    }
  });
  return out;
}

/**
 * Sera (1) o giorno (0): le luci del modello e l'emissione dei materiali si abbassano insieme; `room` (0-1) è
 * l'interruttore della stanza e spegne solo le sue lampade. Va chiamata dopo
 * `applyCutaway`, che ha già scritto le intensità della facciata e della stanza per questo frame.
 */
export function applyMood(parts: IzakayaParts, m: number, room = 1) {
  for (const ref of parts.lights) {
    if (ref.kind === 'other') ref.light.intensity = ref.base;
    ref.light.intensity *= m * (ROOM.lights.test(ref.light.name) ? room : 1);
  }
  for (const e of parts.emissive) e.mat.emissiveIntensity = e.base * m * (e.room ? room : 1);
}
