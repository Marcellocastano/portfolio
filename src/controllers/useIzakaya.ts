import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type MutableRefObject } from 'react';
import { MathUtils, PointLight, type Object3D } from 'three';
import { applyBuild } from '../lib/world/izakayaBuild';
import { applyCutaway, revealAt } from '../lib/world/izakayaCutaway';
import { applyGlows } from '../lib/world/izakayaGlow';
import { applyIdle } from '../lib/world/izakayaIdle';
import { applyMood } from '../lib/world/izakayaMood';
import { prepareIzakaya } from '../lib/world/izakayaParts';
import { IZAKAYA, IZAKAYA_DAY, IZAKAYA_LIGHTS } from '../models/world/izakaya.model';
import { ROOM } from '../models/world/room.model';

function makePointLight({ color, position }: { color: string; position: [number, number, number] }) {
  const light = new PointLight(color, 0, 9, 2);
  light.position.set(...position);
  return light;
}

/**
 * Carica l'izakaya (glTF + Draco) e la anima a ogni frame: con lo scroll la facciata si apre in sezione, le luci
 * esterne si spengono e quella della stanza si accende; intanto pannelli, lanterne e petali si muovono piano.
 * `mood` (1 sera, 0 giorno, dal tema del sito) spegne di giorno lanterne, shoji, insegna e aloni; `lightOn` è
 * l'interruttore della stanza.
 */
export function useIzakaya(
  focus: MutableRefObject<number>,
  mood: MutableRefObject<number>,
  lightOn: MutableRefObject<boolean>,
) {
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

  const room = useRef(1);

  useFrame((state, delta) => {
    // L'interruttore: la luce della stanza sfuma, il bilanciere scatta su o giù.
    room.current = MathUtils.damp(room.current, lightOn.current ? 1 : ROOM.off, ROOM.damping, delta);
    if (parts.lightSwitch) parts.lightSwitch.rotation.z = lightOn.current ? ROOM.tilt : -ROOM.tilt;
    const reveal = revealAt(focus.current);
    applyCutaway(parts, reveal);
    applyIdle(parts, state.clock.elapsedTime);
    // All'avvio il diorama si compone pezzo per pezzo e le luci si accendono a lavoro finito.
    const lit = applyBuild(parts.build, state.clock.elapsedTime);
    const m = mood.current * lit;
    applyMood(parts, m, room.current);
    applyGlows(parts.glows, fadeOf, m);
    // Di giorno la stanza aperta resta un po' illuminata; la luce della porta è solo serale.
    lights.interior.intensity =
      IZAKAYA_LIGHTS.interior.intensity *
      reveal *
      lit *
      room.current *
      MathUtils.lerp(IZAKAYA_DAY.interior, 1, mood.current);
    lights.door.intensity = IZAKAYA_LIGHTS.door.intensity * (1 - reveal) * m;
  });

  return { scene, parts, lights };
}

useGLTF.preload(IZAKAYA.url, IZAKAYA.draco);
