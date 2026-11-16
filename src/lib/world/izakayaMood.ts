import type { Material, Mesh, MeshStandardMaterial, Object3D } from 'three';
import type { IzakayaParts } from './izakayaParts';

/** Un materiale che emette luce (shoji, lanterne, insegna, distributore...) e la sua emissione di sera. */
export interface EmissiveRef {
  mat: MeshStandardMaterial;
  base: number;
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
      out.push({ mat, base: mat.emissiveIntensity });
    }
  });
  return out;
}

/**
 * Sera (1) o giorno (0): le luci del modello e l'emissione dei materiali si abbassano insieme. Va chiamata dopo
 * `applyCutaway`, che ha già scritto le intensità della facciata e della stanza per questo frame.
 */
export function applyMood(parts: IzakayaParts, m: number) {
  for (const ref of parts.lights) {
    if (ref.kind === 'other') ref.light.intensity = ref.base;
    ref.light.intensity *= m;
  }
  for (const e of parts.emissive) e.mat.emissiveIntensity = e.base * m;
}
