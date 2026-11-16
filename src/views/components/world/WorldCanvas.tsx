import { Canvas } from '@react-three/fiber';
import { useMemo, type RefObject } from 'react';
import { NeutralToneMapping } from 'three';
import { useWorldDrag } from '../../../controllers/useWorldDrag';
import { useWorldInputs } from '../../../controllers/useWorldInputs';
import type { Theme } from '../../../models/theme.model';
import { IZAKAYA_LIGHTS } from '../../../models/world/izakaya.model';
import { CAMERA } from '../../../models/world/world.model';
import { ViewFrame } from './ViewFrame';
import { WorldScene } from './WorldScene';

interface Props {
  /** Riquadro dell'hero: dove va inquadrato il modello; puntatore, scroll e trascinamento si leggono da qui. */
  frame: RefObject<HTMLElement>;
  /** La scena dell'hero che contiene il canvas: riceve gli eventi del puntatore (il canvas li lascia passare). */
  host: HTMLElement;
  theme: Theme;
  /** false quando la scena è fuori schermo: il rendering si ferma. */
  active: boolean;
  onReady: () => void;
}

/**
 * Canvas del mondo in miniatura, grande quanto la scena dell'hero. Caricato a parte (React.lazy): three.js non
 * pesa sul primo caricamento. Non intercetta i clic (testo e pulsanti restano usabili): gli eventi 3D si leggono
 * dalla scena con le coordinate del client.
 */
export default function WorldCanvas({ frame, host, theme, active, onReady }: Props) {
  const { pointer, scroll } = useWorldInputs(frame);
  const drag = useWorldDrag(frame);
  // Sui telefoni niente ombre in tempo reale: la scena resta fluida (il componente gira solo nel browser).
  const phone = useMemo(() => matchMedia('(max-width: 767px)').matches, []);

  return (
    <Canvas
      shadows={phone ? false : 'soft'}
      resize={{ offsetSize: true, debounce: 0 }}
      dpr={[1, 1.5]}
      eventSource={host}
      eventPrefix="client"
      frameloop={active ? 'always' : 'never'}
      camera={{ position: CAMERA.position, fov: CAMERA.fov, near: 0.1, far: 80 }}
      gl={{
        antialias: true,
        alpha: true,
        // Neutral (Khronos PBR) conserva tinta e saturazione: lanterne rosse e shoji arancioni restano tali.
        toneMapping: NeutralToneMapping,
        toneMappingExposure: IZAKAYA_LIGHTS.exposure,
        powerPreference: 'high-performance',
      }}
      onCreated={({ camera }) => camera.lookAt(...CAMERA.target)}
    >
      <ViewFrame frame={frame} />
      {/* onReady arriva dalla scena quando il modello è caricato: fino ad allora resta il poster. */}
      <WorldScene pointer={pointer} scroll={scroll} drag={drag} theme={theme} onReady={onReady} />
    </Canvas>
  );
}
