import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ---------------------------------------------------------------- tunables
const CFG = {
  exposure: 0.95,
  punctualScale: 0.0016,      // glTF lights arrive in candela; scale to scene
  bloom: { strength: 0.35, radius: 0.4, threshold: 1.0 },
  reveal: [0.30, 0.78],       // scroll range in which the facade lifts away
  turn: { from: 0.85, to: 0, range: [0.0, 0.8] },  // model rotation (radians) over scroll
  parallax: 0.35,
};
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- renderer
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = CFG.exposure;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color().setRGB(0.018, 0.02, 0.04, THREE.LinearSRGBColorSpace);

const camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 0.1, 200);

// ---------------------------------------------------------------- post
const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
const composer = new EffectComposer(renderer, rt);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), CFG.bloom.strength, CFG.bloom.radius, CFG.bloom.threshold);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---------------------------------------------------------------- lights that replace Blender's area lights
const hemi = new THREE.HemisphereLight(
  new THREE.Color().setRGB(0.20, 0.22, 0.42, THREE.LinearSRGBColorSpace),
  new THREE.Color().setRGB(0.05, 0.035, 0.03, THREE.LinearSRGBColorSpace), 0.45);
scene.add(hemi);

// Blender (x, y, z) -> glTF/three (x, z, -y)
const b2t = (x, y, z) => new THREE.Vector3(x, z, -y);

const moon = new THREE.DirectionalLight(new THREE.Color().setRGB(0.55, 0.62, 1.0, THREE.LinearSRGBColorSpace), 1.1);
moon.position.copy(b2t(-6, -7, 9));
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
Object.assign(moon.shadow.camera, { left: -6, right: 6, top: 7, bottom: -5, near: 1, far: 30 });
moon.shadow.bias = -0.0008;
moon.shadow.normalBias = 0.04;
scene.add(moon);

const facadeWarm = new THREE.DirectionalLight(new THREE.Color().setRGB(1.0, 0.62, 0.38, THREE.LinearSRGBColorSpace), 0.9);
facadeWarm.position.copy(b2t(3.5, -6.5, 2.2));
scene.add(facadeWarm);

const rim = new THREE.DirectionalLight(new THREE.Color().setRGB(0.5, 0.45, 1.0, THREE.LinearSRGBColorSpace), 0.9);
rim.position.copy(b2t(2, 8, 7));
scene.add(rim);

const interiorFill = new THREE.PointLight(new THREE.Color().setRGB(1.0, 0.68, 0.42, THREE.LinearSRGBColorSpace), 0, 9, 2);
interiorFill.position.copy(b2t(0.2, 0.4, 3.2));
scene.add(interiorFill);

const doorSpill = new THREE.PointLight(new THREE.Color().setRGB(1.0, 0.6, 0.3, THREE.LinearSRGBColorSpace), 6, 5, 2);
doorSpill.position.copy(b2t(0.1, -1.9, 1.1));
scene.add(doorSpill);

// ---------------------------------------------------------------- load
const pivot = new THREE.Group();
const draco = new DRACOLoader().setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/');
const loader = new GLTFLoader().setDRACOLoader(draco);
const bar = document.getElementById('bar');

const cutaway = [];       // { obj, base, offset, delay, mats }
const cutLights = [];     // { light, base }
const interiorLights = [];
const idle = [];          // { obj, kind, base, phase }
let shot = null;          // camera poses

loader.load('./izakaya.glb', (gltf) => {
  const root = gltf.scene;
  // building centre: the diorama turns around this vertical axis while scrolling
  const bldCenter = b2t(0, 0.5, 0);
  pivot.position.copy(bldCenter);
  root.position.sub(bldCenter);
  pivot.add(root);
  // scene-side lights travel with the model
  for (const l of [interiorFill, doorSpill]) { l.position.sub(bldCenter); pivot.add(l); }
  scene.add(pivot);
  scene.updateMatrixWorld(true);

  root.traverse((o) => {
    // lights exported from Blender (KHR_lights_punctual)
    if (o.isLight) {
      o.intensity *= CFG.punctualScale;
      o.decay = 2;
      o.distance = 7;
      o.castShadow = false;
      // GLTFLoader turns a light-only node into the light itself (or wraps it): check both
      const node = o.userData && o.userData.cutaway !== undefined ? o : (o.parent || o);
      const name = o.name || node.name || '';
      if (node.userData && node.userData.cutaway) cutLights.push({ light: o, base: o.intensity });
      else if (/^LGT_(Int|INT|Holo|DeskLamp)/.test(name) || /^LGT_(Int|INT|Holo|DeskLamp)/.test(node.name)) interiorLights.push({ light: o, base: o.intensity });
      return;
    }
    if (o.isMesh) {
      const emissive = o.material && o.material.emissiveIntensity > 0 && o.material.emissive && o.material.emissive.getHex() !== 0;
      o.castShadow = !emissive && !/Petal|Holo|Screen|Blossom/.test(o.name);
      o.receiveShadow = !/Holo|Screen/.test(o.name);
      if (/Holo/.test(o.name)) { o.material.depthWrite = false; o.renderOrder = 10; }
    }
  });

  // facade pieces that lift away (tag comes from glTF extras -> userData)
  root.traverse((o) => {
    if (!o.userData || !o.userData.cutaway || o.isLight) return;
    if (o.children.some((c) => c.isLight)) return; // light holder empties handled above
    const box = new THREE.Box3().setFromObject(o);
    if (box.isEmpty()) return;
    const c = box.getCenter(new THREE.Vector3());
    const dir = new THREE.Vector3(c.x - bldCenter.x, 0, c.z - bldCenter.z);
    if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
    dir.normalize();
    const mats = [];
    o.traverse((m) => {
      if (m.isMesh) {
        m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone();
        (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => { mats.push({ mat: x, op: x.opacity, tr: x.transparent }); });
      }
    });
    cutaway.push({
      obj: o,
      base: o.position.clone(),
      // world-space offset converted to parent space
      offset: dir.multiplyScalar(2.2).add(new THREE.Vector3(0, 2.4 + c.y * 0.15, 0)),
      delay: THREE.MathUtils.clamp(0.35 - c.y * 0.05, 0, 0.35) * Math.random() + 0.05 * Math.random(),
      mats,
    });
  });

  // gentle idle motion
  root.traverse((o) => {
    if (/^INT_Holo_/.test(o.name)) idle.push({ obj: o, kind: 'bob', base: o.position.clone(), phase: Math.random() * 6.28 });
    if (/^(LAN_(Big_Kaihatsu|Door_[LR])$|INT_Lantern_Ceiling)/.test(o.name)) idle.push({ obj: o, kind: 'sway', base: o.rotation.clone(), phase: Math.random() * 6.28 });
    if (o.name === 'VEG_Petals') idle.push({ obj: o, kind: 'drift', base: o.position.clone(), phase: 0 });
  });

  // camera poses from Blender's CAM_Main
  const camNode = gltf.cameras.find((c) => c.name === 'CAM_Main');
  const p0 = new THREE.Vector3(); camNode.getWorldPosition(p0);
  // targets sit a little low so the diorama frames above the captions
  const t0 = b2t(0.2, 0.3, 2.0);
  const t1 = b2t(-0.15, 1.0, 1.1);
  const dir = p0.clone().sub(t0).normalize();
  const p1 = t1.clone().add(dir.clone().multiplyScalar(20)).add(new THREE.Vector3(0, -1.0, 0));
  shot = { p0, t0, p1, t1, fov: THREE.MathUtils.radToDeg(camNode.fov !== undefined ? camNode.fov * 1 : 27) };
  camera.fov = camNode.fov || 27;
  camera.updateProjectionMatrix();

  document.getElementById('loader').classList.add('done');
}, (e) => {
  if (e.total) bar.style.width = `${Math.round((e.loaded / e.total) * 100)}%`;
}, (err) => {
  console.error(err);
  document.querySelector('#loader div').textContent = 'Impossibile caricare il modello.';
});

// debug handles for live tuning in the console
window.__izakaya = { CFG, renderer, bloom, hemi, moon, facadeWarm, rim, interiorFill, doorSpill, cutLights, interiorLights, scene, pivot, getP: () => scrollSmooth };

// ---------------------------------------------------------------- input
let scrollTarget = 0, scrollSmooth = 0;
// debug only: ?debug&p=0.7 pins the transition (handy for screenshots and tuning)
const qs = new URLSearchParams(location.search);
const pParam = qs.has('debug') ? qs.get('p') : null;
const forcedP = pParam !== null && !isNaN(parseFloat(pParam)) ? THREE.MathUtils.clamp(parseFloat(pParam), 0, 1) : null;
const readScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollTarget = max > 0 ? window.scrollY / max : 0;
};
window.addEventListener('scroll', readScroll, { passive: true });
readScroll();

const pointer = new THREE.Vector2();
window.addEventListener('pointermove', (e) => {
  pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
}, { passive: true });

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// ---------------------------------------------------------------- helpers
const smooth = (a, b, x) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const easeIn = (t) => t * t * t;
const caps = [document.getElementById('cap-0'), document.getElementById('cap-1')];
const hint = document.getElementById('hint');
const tmpP = new THREE.Vector3(), tmpT = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3();
const clock = new THREE.Clock();
let par = new THREE.Vector2();

// ---------------------------------------------------------------- loop
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  if (forcedP !== null) scrollSmooth = forcedP;
  else scrollSmooth += (scrollTarget - scrollSmooth) * (reduceMotion ? 1 : 0.08);
  const p = scrollSmooth;
  const reveal = smooth(CFG.reveal[0], CFG.reveal[1], p);

  if (shot) {
    // model turns from the sakura side to the cutaway angle
    const turn = smooth(CFG.turn.range[0], CFG.turn.range[1], p);
    const idleTurn = reduceMotion ? 0 : Math.sin(t * 0.25) * 0.06 * (1 - smooth(0, 0.08, p));
    pivot.rotation.y = THREE.MathUtils.lerp(CFG.turn.from, CFG.turn.to, turn) + idleTurn;

    // camera: dolly from the exterior shot to the interior shot
    const k = smooth(0.25, 0.92, p);
    tmpP.lerpVectors(shot.p0, shot.p1, k);
    tmpT.lerpVectors(shot.t0, shot.t1, k);
    // portrait screens: step back so the diorama fits
    const fit = Math.max(1, 1.45 / camera.aspect);
    tmpP.sub(tmpT).multiplyScalar(Math.pow(fit, 0.55)).add(tmpT);
    if (!reduceMotion) {
      par.lerp(pointer, 0.05);
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      up.setFromMatrixColumn(camera.matrixWorld, 1);
      tmpP.addScaledVector(right, par.x * CFG.parallax).addScaledVector(up, -par.y * CFG.parallax * 0.6);
    }
    camera.position.copy(tmpP);
    camera.lookAt(tmpT);

    // facade lifts away piece by piece
    for (const c of cutaway) {
      const l = THREE.MathUtils.clamp((reveal - c.delay) / 0.6, 0, 1);
      const e = easeIn(l);
      c.obj.position.copy(c.base).addScaledVector(c.offset, e);
      c.obj.visible = l < 0.999;
      for (const m of c.mats) {
        const fading = l > 0.001;
        m.mat.transparent = fading || m.tr;
        m.mat.opacity = m.op * (1 - smooth(0.15, 1.0, l));
        m.mat.depthWrite = !fading;
      }
    }
    for (const c of cutLights) c.light.intensity = c.base * (1 - reveal);
    for (const c of interiorLights) c.light.intensity = c.base * (0.55 + 0.45 * reveal);
    interiorFill.intensity = 7 * reveal;
    doorSpill.intensity = 6 * (1 - reveal);
    facadeWarm.intensity = 0.9 - 0.35 * reveal;

    // idle motion
    if (!reduceMotion) {
      for (const it of idle) {
        if (it.kind === 'bob') it.obj.position.y = it.base.y + Math.sin(t * 1.4 + it.phase) * 0.025;
        if (it.kind === 'sway') it.obj.rotation.z = it.base.z + Math.sin(t * 0.9 + it.phase) * 0.035;
        if (it.kind === 'drift') it.obj.position.y = it.base.y - ((t * 0.05) % 0.3);
      }
    }
  }

  caps[0].classList.toggle('on', p < 0.1 && !!shot);
  caps[1].classList.toggle('on', p > 0.78);
  hint.style.opacity = p > 0.04 ? 0 : 1;

  composer.render();
});
