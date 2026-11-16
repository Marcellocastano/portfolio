import {
  AdditiveBlending,
  Box3,
  CanvasTexture,
  Color,
  Sprite,
  SpriteMaterial,
  Vector3,
  type Light,
  type Object3D,
} from 'three';
import { IZAKAYA_GLOW } from '../../models/world/izakaya.model';
import type { LightRef } from './izakayaParts';

/** Un alone luminoso: segue una luce del modello o una superficie che brilla (shoji), e ne segue l'intensità. */
export interface Glow {
  sprite: Sprite;
  base: number;
  /** Luce a cui è legato: l'alone si spegne con lei. */
  light?: LightRef;
  /** Pezzo della facciata a cui è legato: l'alone sfuma con lui. */
  owner?: Object3D;
}

let texture: CanvasTexture | null = null;

/** Gradiente radiale morbido, disegnato una volta sola. */
function glowTexture() {
  if (texture) return texture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.35)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.08)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  texture = new CanvasTexture(canvas);
  return texture;
}

function makeSprite(color: Color, opacity: number) {
  const material = new SpriteMaterial({
    map: glowTexture(),
    color,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    opacity,
  });
  const sprite = new Sprite(material);
  sprite.renderOrder = 5;
  sprite.raycast = () => {}; // gli aloni non intercettano il puntatore
  return sprite;
}

/** Aloni sulle luci puntiformi del modello (lanterne, insegna, distributore, andon...). */
function lightGlows(lights: LightRef[]) {
  const glows: Glow[] = [];
  for (const ref of lights) {
    const rule = IZAKAYA_GLOW.lights.find((r) => r.match.test(ref.light.name));
    if (!rule) continue;
    const sprite = makeSprite((ref.light as Light).color.clone(), rule.opacity);
    sprite.scale.setScalar(rule.size);
    ref.light.add(sprite);
    glows.push({ sprite, base: rule.opacity, light: ref });
  }
  return glows;
}

/** Aloni larghi e tenui davanti alle superfici di carta illuminate. */
function surfaceGlows(root: Object3D) {
  const glows: Glow[] = [];
  for (const name of IZAKAYA_GLOW.surfaces.names) {
    const obj = root.getObjectByName(name);
    if (!obj) continue;
    const box = new Box3().setFromObject(obj);
    const size = box.getSize(new Vector3());
    const sprite = makeSprite(new Color(IZAKAYA_GLOW.surfaces.color), IZAKAYA_GLOW.surfaces.opacity);
    sprite.position.copy(obj.worldToLocal(box.getCenter(new Vector3())));
    sprite.scale.set(Math.max(size.x, size.z) * 1.5, size.y * 1.5, 1);
    obj.add(sprite);
    glows.push({ sprite, base: IZAKAYA_GLOW.surfaces.opacity, owner: obj.userData.cutaway ? obj : undefined });
  }
  return glows;
}

export function prepareGlows(root: Object3D, lights: LightRef[]) {
  return [...lightGlows(lights), ...surfaceGlows(root)];
}

/** Ogni alone segue la sua luce (già abbassata di giorno); quelli sulle superfici seguono pezzo e `mood`. */
export function applyGlows(glows: Glow[], fadeOf: (obj: Object3D) => number, mood = 1) {
  for (const g of glows) {
    let k = 1;
    if (g.light) k = g.light.base > 0 ? g.light.light.intensity / g.light.base : 0;
    // Gli aloni delle superfici non hanno una luce: seguono il pezzo della facciata e l'ora del giorno.
    else k = mood * (g.owner ? fadeOf(g.owner) : 1);
    (g.sprite.material as SpriteMaterial).opacity = g.base * k;
    g.sprite.visible = k > 0.01;
  }
}
