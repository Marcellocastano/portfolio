import { Box3, MathUtils, type Mesh, type Object3D } from 'three';
import { BUILD } from '../../models/world/izakaya.model';
import { hashOf } from './izakayaHash';

/** Un tassello del diorama che scende al suo posto all'avvio. */
interface BuildPiece {
  obj: Object3D;
  baseY: number;
  delay: number;
  /** Posizione già scritta a ogni frame da altri (facciata apribile, oggetti che fluttuano): qui si somma. */
  managed: boolean;
}

export interface Build {
  pieces: BuildPiece[];
  /** Secondi dall'inizio della composizione; null finché il modello non è sullo schermo. */
  start: number | null;
  done: boolean;
}

/** Testi, occhi e immagini arrivano insieme al pezzo a cui appartengono. */
const groupOf = (name: string) => name.replace(/_(Text(_[LR])?|Image|Fuji|Eye_[LR]|Body)$/, '');

/** Ogni mesh è un tassello: prima il basamento, poi via via verso l'alto, con un po' di varietà dal nome. */
export function prepareBuild(root: Object3D, managed: Set<Object3D>): Build {
  const meshes: Mesh[] = [];
  root.traverse((o) => {
    if ((o as Mesh).isMesh) meshes.push(o as Mesh);
  });
  const lows = new Map<string, number>();
  for (const m of meshes) {
    const low = new Box3().setFromObject(m).min.y;
    const key = groupOf(m.name);
    lows.set(key, Math.min(lows.get(key) ?? Infinity, low));
  }
  const values = [...lows.values()];
  const [min, max] = [Math.min(...values), Math.max(...values)];
  const pieces = meshes.map((obj) => {
    const key = groupOf(obj.name);
    const high = (lows.get(key)! - min) / Math.max(max - min, 1e-3);
    const delay = BUILD.spread * MathUtils.clamp(high * (1 - BUILD.jitter) + hashOf(key) * BUILD.jitter, 0, 1);
    return { obj, baseY: obj.position.y, delay, managed: managed.has(obj) };
  });
  return { pieces, start: null, done: false };
}

/** Scende veloce e si posa con un piccolo rimbalzo. */
const settle = (x: number) => 1 + 2.4 * (x - 1) ** 3 + 1.4 * (x - 1) ** 2;

/**
 * Compone il diorama: ogni tassello compare e scende al suo posto dopo il suo ritardo. Va chiamata dopo chi scrive
 * le posizioni (facciata, oggetti animati). Restituisce quanto è completa (0-1): le luci si accendono alla fine.
 */
export function applyBuild(build: Build, t: number) {
  if (build.done) return 1;
  build.start ??= t + BUILD.delay;
  const elapsed = t - build.start;
  for (const p of build.pieces) {
    const k = MathUtils.clamp((elapsed - p.delay) / BUILD.duration, 0, 1);
    const drop = (1 - settle(k)) * BUILD.drop;
    p.obj.position.y = (p.managed ? p.obj.position.y : p.baseY) + drop;
    if (k <= 0) p.obj.visible = false;
    else if (!p.managed) p.obj.visible = true;
  }
  const total = BUILD.spread + BUILD.duration;
  const lit = MathUtils.smoothstep(elapsed, total - BUILD.duration, total + BUILD.lightsOn);
  if (elapsed >= total + BUILD.lightsOn) {
    for (const p of build.pieces) if (!p.managed) p.obj.position.y = p.baseY;
    build.done = true;
  }
  return lit;
}
