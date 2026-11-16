import { ContactShadows } from '@react-three/drei';
import { Suspense, useRef, type MutableRefObject } from 'react';
import type { Drag } from '../../../controllers/useWorldDrag';
import type { Pointer } from '../../../controllers/useWorldInputs';
import type { Theme } from '../../../models/theme.model';
import { Appear } from './Appear';
import { CameraRig } from './CameraRig';
import { Izakaya } from './izakaya/Izakaya';
import { IzakayaLighting } from './izakaya/IzakayaLighting';
import { Rig } from './Rig';

interface Props {
  pointer: MutableRefObject<Pointer>;
  /** Avanzamento dello scroll dell'hero (0-1): ruota la casa e la apre in sezione sullo studio. */
  scroll: MutableRefObject<number>;
  /** Rotazione a mano nella vista iniziale. */
  drag: MutableRefObject<Drag>;
  /** Tema scuro = sera con le luci accese, tema chiaro = giorno con le luci spente. */
  theme: Theme;
  onReady: () => void;
}

/**
 * L'izakaya-studio: un locale giapponese di notte su un basamento con il bordo luminoso. A riposo si vede di tre
 * quarti dal lato del ciliegio; allo scroll ruota verso la camera e la facciata si apre sullo studio.
 */
export function WorldScene({ pointer, scroll, drag, theme, onReady }: Props) {
  const focus = useRef(0);
  // Parte già nell'atmosfera giusta: nessuna transizione al primo caricamento.
  const mood = useRef(theme === 'dark' ? 1 : 0);

  return (
    <>
      <IzakayaLighting theme={theme} mood={mood} />
      <CameraRig scroll={scroll} focus={focus} />
      <Suspense fallback={null}>
        <Rig pointer={pointer} focus={focus} drag={drag}>
          <Appear delay={0}>
            <Izakaya focus={focus} mood={mood} onReady={onReady} />
          </Appear>
        </Rig>
      </Suspense>
      <ContactShadows
        position={[0, -0.42, 0]}
        opacity={0.45}
        scale={9}
        blur={2.6}
        far={1.5}
        resolution={512}
        color="#10121a"
      />
    </>
  );
}
