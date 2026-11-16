import { Box3, MathUtils, Mesh, Vector3, type Material, type Object3D } from 'three';
import { CUTAWAY } from '../../models/world/izakaya.model';
import type { IzakayaParts } from './izakayaParts';

interface FadeMaterial {
  mat: Material;
  opacity: number;
  transparent: boolean;
}

/** Un pezzo della facciata che si solleva quando la casa si apre in sezione. */
export interface CutPiece {
  obj: Object3D;
  base: Vector3;
  offset: Vector3;
  delay: number;
  mats: FadeMaterial[];
  meshes: Mesh[];
  /** Quanto è ancora visibile (1 al suo posto, 0 sparito): lo leggono gli aloni legati al pezzo. */
  fade: number;
}

const smooth = (a: number, b: number, x: number) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Materiali propri del pezzo: quelli condivisi con le pareti che restano non devono sbiadire con lui. */
function ownMaterials(obj: Object3D) {
  const mats: FadeMaterial[] = [];
  obj.traverse((m) => {
    const mesh = m as Mesh;
    if (!mesh.isMesh) return;
    const own = (mesh.material as Material).clone();
    mesh.material = own;
    mats.push({ mat: own, opacity: own.opacity, transparent: own.transparent });
  });
  return mats;
}

/** Prepara un pezzo: direzione di uscita (via dal centro e in alto) e ritardo; i pezzi bassi partono prima. */
export function cutPiece(obj: Object3D, center: Vector3, hash: number): CutPiece | null {
  const box = new Box3().setFromObject(obj);
  if (box.isEmpty()) return null;
  const c = box.getCenter(new Vector3());
  const dir = new Vector3(c.x - center.x, 0, c.z - center.z);
  if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
  const offset = dir
    .normalize()
    .multiplyScalar(CUTAWAY.spread)
    .add(new Vector3(0, CUTAWAY.lift + c.y * 0.15, 0));
  // Prima i pezzi bassi (insegne, porta, distributore), poi via via quelli in alto; un po' di varietà dal nome.
  const high = MathUtils.clamp(c.y / 5, 0, 1);
  const delay = CUTAWAY.stagger * MathUtils.clamp(high * 0.75 + hash * 0.25, 0, 1);
  const meshes: Mesh[] = [];
  obj.traverse((m) => (m as Mesh).isMesh && meshes.push(m as Mesh));
  return { obj, base: obj.position.clone(), offset, delay, mats: ownMaterials(obj), meshes, fade: 1 };
}

const noRaycast = () => {};

/** Quanto è aperta la casa (0-1) per un dato avanzamento dello scroll. */
export const revealAt = (focus: number) => smooth(CUTAWAY.range[0], CUTAWAY.range[1], focus);

/** Accelera e frena dolcemente: il pezzo si stacca piano, senza lo scatto finale che lo fa "volare via". */
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Posiziona e sfuma i pezzi della facciata, spegne le luci esterne e accende quelle interne. */
export function applyCutaway(parts: IzakayaParts, reveal: number) {
  for (const piece of parts.cutaway) {
    const l = MathUtils.clamp((reveal - piece.delay) / CUTAWAY.duration, 0, 1);
    piece.obj.position.copy(piece.base).addScaledVector(piece.offset, easeInOut(l));
    piece.obj.visible = l < 0.999;
    // Un pezzo sparito non deve fermare il puntatore: dietro ci sono monitor, interruttore e Olivia.
    for (const mesh of piece.meshes) mesh.raycast = piece.obj.visible ? Mesh.prototype.raycast : noRaycast;
    const fading = l > 0.001;
    piece.fade = 1 - smooth(0.05, 0.9, l);
    for (const m of piece.mats) {
      m.mat.transparent = fading || m.transparent;
      m.mat.opacity = m.opacity * piece.fade;
      m.mat.depthWrite = !fading;
    }
  }
  for (const l of parts.cutLights) l.light.intensity = l.base * (1 - reveal);
  for (const l of parts.interiorLights) l.light.intensity = l.base * (0.55 + 0.45 * reveal);
}
