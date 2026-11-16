import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type MutableRefObject } from 'react';
import { Color, MathUtils, type DirectionalLight, type HemisphereLight } from 'three';
import type { Theme } from '../../../../models/theme.model';
import { IZAKAYA_DAY, IZAKAYA_LIGHTS, MOOD } from '../../../../models/world/izakaya.model';

const { hemi, moon, facade, rim } = IZAKAYA_LIGHTS;

interface Props {
  theme: Theme;
  /** 1 sera (tema scuro), 0 giorno (tema chiaro): scritto qui con smorzamento, letto dal modello. */
  mood: MutableRefObject<number>;
}

const pair = (night: string, day: string) => ({ night: new Color(night), day: new Color(day) });

/**
 * Luci di scena che sostituiscono quelle ad area di Blender (assenti in glTF). Di sera: cielo e luna blu notte
 * con le ombre, luce calda sulla facciata e controluce. Di giorno: cielo chiaro e sole caldo dalla stessa
 * direzione della luna, così ombre e volumi non saltano. Il tema fa scivolare tutto da un'atmosfera all'altra.
 */
export function IzakayaLighting({ theme, mood }: Props) {
  const sky = useRef<HemisphereLight>(null);
  const key = useRef<DirectionalLight>(null);
  const warm = useRef<DirectionalLight>(null);
  const back = useRef<DirectionalLight>(null);
  const colors = useMemo(
    () => ({
      sky: pair(hemi.sky, IZAKAYA_DAY.hemi.sky),
      ground: pair(hemi.ground, IZAKAYA_DAY.hemi.ground),
      key: pair(moon.color, IZAKAYA_DAY.sun.color),
      warm: pair(facade.color, IZAKAYA_DAY.facade.color),
      back: pair(rim.color, IZAKAYA_DAY.rim.color),
    }),
    [],
  );

  useFrame((_, delta) => {
    mood.current = MathUtils.damp(mood.current, theme === 'dark' ? 1 : 0, MOOD.damping, delta);
    const m = mood.current;
    const lerp = (a: number, b: number) => MathUtils.lerp(b, a, m);
    if (sky.current) {
      sky.current.intensity = lerp(hemi.intensity, IZAKAYA_DAY.hemi.intensity);
      sky.current.color.lerpColors(colors.sky.day, colors.sky.night, m);
      sky.current.groundColor.lerpColors(colors.ground.day, colors.ground.night, m);
    }
    if (key.current) {
      key.current.intensity = lerp(moon.intensity, IZAKAYA_DAY.sun.intensity);
      key.current.color.lerpColors(colors.key.day, colors.key.night, m);
    }
    if (warm.current) {
      warm.current.intensity = lerp(facade.intensity, IZAKAYA_DAY.facade.intensity);
      warm.current.color.lerpColors(colors.warm.day, colors.warm.night, m);
    }
    if (back.current) {
      back.current.intensity = lerp(rim.intensity, IZAKAYA_DAY.rim.intensity);
      back.current.color.lerpColors(colors.back.day, colors.back.night, m);
    }
  });

  return (
    <>
      <hemisphereLight ref={sky} args={[hemi.sky, hemi.ground, hemi.intensity]} />
      <directionalLight
        ref={key}
        position={moon.position}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0008}
        shadow-normalBias={0.04}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />
      <directionalLight ref={warm} position={facade.position} />
      <directionalLight ref={back} position={rim.position} />
    </>
  );
}
