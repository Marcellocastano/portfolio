import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, type MutableRefObject } from 'react';
import type { Vector3 } from 'three';
import { useIzakaya } from '../../../../controllers/useIzakaya';
import { useIzakayaRoom } from '../../../../controllers/useIzakayaRoom';
import { useIzakayaScreen } from '../../../../controllers/useIzakayaScreen';
import { i18n } from '../../../../models/i18n.model';
import { IZAKAYA } from '../../../../models/world/izakaya.model';
import { HoverLabel } from '../HoverLabel';
import { ZzzBubble } from './ZzzBubble';

interface Props {
  /** Avanzamento smorzato dello scroll (0-1): apre la facciata in sezione. */
  focus: MutableRefObject<number>;
  /** 1 sera, 0 giorno: luci e materiali luminosi del modello lo seguono. */
  mood: MutableRefObject<number>;
  /** Chiamata quando il modello è caricato e disegnato: il canvas può sostituire il poster. */
  onReady: () => void;
}

type Handlers = ReturnType<typeof useIzakayaScreen>['handlers'];

/** Monitor e stanza ascoltano lo stesso modello: ognuno risponde solo ai suoi oggetti. */
const merge = (a: Handlers, b: Handlers): Handlers => ({
  onPointerOver: (e: ThreeEvent<PointerEvent>) => (a.onPointerOver(e), b.onPointerOver(e)),
  onPointerOut: (e: ThreeEvent<PointerEvent>) => (a.onPointerOut(e), b.onPointerOut(e)),
  onClick: (e: ThreeEvent<MouseEvent>) => (a.onClick(e), b.onClick(e)),
});

const above = (p: Vector3, dy: number): [number, number, number] => [p.x, p.y + dy, p.z];

/**
 * L'izakaya-studio modellata in Blender: di notte, con lanterne, noren e ciliegio; allo scroll la facciata si
 * solleva a pezzi e dentro c'è lo studio, con me alla scrivania e Olivia che dorme sul cuscino. L'interruttore
 * sulla parete spegne la stanza, e io mi addormento.
 */
export function Izakaya({ focus, mood, onReady }: Props) {
  const room = useIzakayaRoom();
  const { scene, parts, lights } = useIzakaya(focus, mood, room.lightRef);
  const screen = useIzakayaScreen(parts.screen);
  const label = parts.screen?.position;

  useEffect(() => {
    // Due frame: il primo compila i materiali, il secondo è quello che si vede.
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  return (
    <group position={IZAKAYA.offset}>
      <primitive object={scene} {...merge(screen.handlers, room.handlers)} />
      <primitive object={lights.interior} />
      <primitive object={lights.door} />
      {screen.hovered && label && (
        <HoverLabel position={above(label, 0.42)} text={i18n.world.openProject(screen.hovered)} />
      )}
      {room.hovered === 'switch' && parts.lightSwitch && (
        <HoverLabel
          position={above(parts.lightSwitch.position, 0.3)}
          text={room.lightOn ? i18n.world.lightOff : i18n.world.lightOn}
        />
      )}
      {room.hovered === 'dog' && parts.dog && (
        <HoverLabel position={above(parts.dog.position, 0.42)} text={i18n.world.dog} />
      )}
      <ZzzBubble asleep={!room.lightOn} focus={focus} />
    </group>
  );
}
