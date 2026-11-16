import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, type MutableRefObject } from 'react';
import { MathUtils, PointLight, type Object3D } from 'three';
import { applyCutaway, revealAt } from '../lib/world/izakayaCutaway';
import { applyGlows } from '../lib/world/izakayaGlow';
import { applyIdle } from '../lib/world/izakayaIdle';
import { applyMood } from '../lib/world/izakayaMood';
import { prepareIzakaya } from '../lib/world/izakayaParts';
import { IZAKAYA, IZAKAYA_DAY, IZAKAYA_LIGHTS } from '../models/world/izakaya.model';

function makePointLight({ color, position }: { color: string; position: [number, number, number] }) {
  const light = new PointLight(color, 0, 9, 2);
  light.position.set(...position);
  return light;
}

/**
 * Carica l'izakaya (glTF + Draco) e la anima a ogni frame: con lo scroll la facciata si apre in sezione, le luci
 * esterne si spengono e quella della stanza si accende; intanto pannelli, lanterne e petali si muovono piano.
 * `mood` (1 sera, 0 giorno, dal tema del sito) spegne di giorno lanterne, shoji, insegna e aloni.
 */
export function useIzakaya(focus: MutableRefObject<number>, mood: MutableRefObject<number>) {
  const { scene } = useGLTF(IZAKAYA.url, IZAKAYA.draco);
  const parts = useMemo(() => prepareIzakaya(scene), [scene]);
  const fadeOf = useMemo(() => {
    const byObj = new Map(parts.cutaway.map((p) => [p.obj, p]));
    return (obj: Object3D) => byObj.get(obj)?.fade ?? 1;
  }, [parts]);
  const lights = useMemo(
    () => ({ interior: makePointLight(IZAKAYA_LIGHTS.interior), door: makePointLight(IZAKAYA_LIGHTS.door) }),
    [],
  );

  useFrame((state) => {
    const reveal = revealAt(focus.current);
    const m = mood.current;
    applyCutaway(parts, reveal);
    applyMood(parts, m);
    applyIdle(parts, state.clock.elapsedTime);
    applyGlows(parts.glows, fadeOf, m);
    // Di giorno la stanza aperta resta un po' illuminata; la luce della porta è solo serale.
    lights.interior.intensity = IZAKAYA_LIGHTS.interior.intensity * reveal * MathUtils.lerp(IZAKAYA_DAY.interior, 1, m);
    lights.door.intensity = IZAKAYA_LIGHTS.door.intensity * (1 - reveal) * m;
  });

  return { scene, parts, lights };
}

useGLTF.preload(IZAKAYA.url, IZAKAYA.draco);
