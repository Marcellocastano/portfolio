import { Vector3, type Light, type Material, type Mesh, type MeshStandardMaterial, type Object3D } from 'three';
import { IZAKAYA_LIGHTS, IZAKAYA_NODES } from '../../models/world/izakaya.model';
import { cutPiece, type CutPiece } from './izakayaCutaway';
import { prepareGlows, type Glow } from './izakayaGlow';
import { idleItem, type IdleItem } from './izakayaIdle';
import { collectEmissive, type EmissiveRef } from './izakayaMood';

export interface LightRef {
  light: Light;
  base: number;
  /** Facciata (si spegne all'apertura), stanza (si accende) o il resto (sempre uguale). */
  kind: 'cut' | 'interior' | 'other';
}

/** Ciò che serve ad animare la scena glTF, raccolto una volta sola al caricamento. */
export interface IzakayaParts {
  cutaway: CutPiece[];
  cutLights: LightRef[];
  interiorLights: LightRef[];
  /** Tutte le luci del modello, per gli aloni. */
  lights: LightRef[];
  glows: Glow[];
  /** Materiali luminosi, spenti di giorno. */
  emissive: EmissiveRef[];
  idle: IdleItem[];
  screen: Mesh | null;
}

/** Fase deterministica (0-1) da un nome: niente Math.random, la scena è sempre uguale. */
export const hashOf = (name: string) => ([...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 997, 7) % 97) / 97;

function lightKind(light: Light): LightRef['kind'] {
  if (light.userData.cutaway) return 'cut';
  return IZAKAYA_NODES.interiorLight.test(light.name) ? 'interior' : 'other';
}

function prepareLight(light: Light, parts: IzakayaParts) {
  light.intensity *= IZAKAYA_LIGHTS.punctualScale;
  if ('decay' in light) light.decay = 2;
  if ('distance' in light) light.distance = IZAKAYA_LIGHTS.punctualRange;
  light.castShadow = false;
  const kind = lightKind(light);
  const ref: LightRef = { light, base: light.intensity, kind };
  parts.lights.push(ref);
  if (kind === 'cut') parts.cutLights.push(ref);
  if (kind === 'interior') parts.interiorLights.push(ref);
}

const tuned = new WeakSet<Material>();

function prepareMesh(mesh: Mesh, parts: IzakayaParts) {
  for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
    // Materiali condivisi tra più mesh: si regolano una volta sola.
    if (tuned.has(m) || !('emissiveIntensity' in m)) continue;
    (m as MeshStandardMaterial).emissiveIntensity *= IZAKAYA_LIGHTS.emissiveScale;
    tuned.add(m);
  }
  mesh.castShadow = !IZAKAYA_NODES.noShadow.test(mesh.name);
  mesh.receiveShadow = !/Holo|Screen/.test(mesh.name);
  if (/Holo/.test(mesh.name)) {
    (mesh.material as Material).depthWrite = false;
    mesh.renderOrder = 10;
  }
  if (mesh.name === IZAKAYA_NODES.screen) parts.screen = mesh;
}

/** Analizza la scena glTF: luci, ombre, pezzi della facciata da aprire, oggetti animati e schermo del monitor. */
export function prepareIzakaya(root: Object3D): IzakayaParts {
  const parts: IzakayaParts = {
    cutaway: [],
    cutLights: [],
    interiorLights: [],
    lights: [],
    glows: [],
    emissive: [],
    idle: [],
    screen: null,
  };
  root.updateMatrixWorld(true);
  // Centro della pianta: i pezzi della facciata si allontanano da qui.
  const center = new Vector3(0, 0, -0.5).applyMatrix4(root.matrixWorld);
  root.traverse((o) => {
    if ((o as Light).isLight) prepareLight(o as Light, parts);
    else if ((o as Mesh).isMesh) prepareMesh(o as Mesh, parts);
  });
  root.traverse((o) => {
    if (!(o as Light).isLight && o.userData.cutaway) {
      const piece = cutPiece(o, center, hashOf(o.name));
      if (piece) parts.cutaway.push(piece);
    }
    const idle = idleItem(o, hashOf(o.name));
    if (idle) parts.idle.push(idle);
  });
  // Dopo i pezzi della facciata: gli aloni aggiunti come figli non devono allargarne i bounding box.
  parts.glows = prepareGlows(root, parts.lights);
  parts.emissive = collectEmissive(root);
  return parts;
}
