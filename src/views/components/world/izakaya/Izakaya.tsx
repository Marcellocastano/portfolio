import { useEffect, type MutableRefObject } from 'react';
import { useIzakaya } from '../../../../controllers/useIzakaya';
import { useIzakayaScreen } from '../../../../controllers/useIzakayaScreen';
import { i18n } from '../../../../models/i18n.model';
import { IZAKAYA } from '../../../../models/world/izakaya.model';
import { HoverLabel } from '../HoverLabel';

interface Props {
  /** Avanzamento smorzato dello scroll (0-1): apre la facciata in sezione. */
  focus: MutableRefObject<number>;
  /** 1 sera, 0 giorno: luci e materiali luminosi del modello lo seguono. */
  mood: MutableRefObject<number>;
  /** Chiamata quando il modello è caricato e disegnato: il canvas può sostituire il poster. */
  onReady: () => void;
}

/**
 * L'izakaya-studio modellata in Blender: di notte, con lanterne, noren e ciliegio; allo scroll la facciata si
 * solleva a pezzi e dentro c'è lo studio, con me alla scrivania e il cane sul cuscino.
 */
export function Izakaya({ focus, mood, onReady }: Props) {
  const { scene, parts, lights } = useIzakaya(focus, mood);
  const { hovered, handlers } = useIzakayaScreen(parts.screen);
  const label = parts.screen?.position;

  useEffect(() => {
    // Due frame: il primo compila i materiali, il secondo è quello che si vede.
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  return (
    <group position={IZAKAYA.offset}>
      <primitive object={scene} {...handlers} />
      <primitive object={lights.interior} />
      <primitive object={lights.door} />
      {hovered && label && (
        <HoverLabel position={[label.x, label.y + 0.42, label.z]} text={i18n.world.openProject(hovered)} />
      )}
    </group>
  );
}
