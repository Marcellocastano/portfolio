import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useWorldMode } from '../../../controllers/useWorldMode';
import { i18n } from '../../../models/i18n.model';
import { profile } from '../../../models/profile.model';
import type { Theme } from '../../../models/theme.model';
import { WORLD_POSTER, WORLD_POSTER_DAY } from '../../../models/world/world.model';
import './WorldStage.css';

const WorldCanvas = lazy(() => import('./WorldCanvas'));

interface Props {
  /** Tema del sito: scuro = sera con le luci accese, chiaro = giorno con le luci spente. */
  theme: Theme;
}

/**
 * "My little digital world": il diorama 3D dell'hero. Il pre-rendering e i dispositivi senza 3D (mobile, reduced
 * motion, niente WebGL2) mostrano l'immagine statica della stessa scena nel riquadro. Da tablet in su il canvas
 * copre tutta la scena dell'hero (montato lì con un portal, dietro al testo) e il riquadro fa da cornice di
 * riferimento: la camera inquadra il modello dove sta il riquadro, quindi allo scroll il modello può crescere fino
 * a quasi tutto lo schermo senza tagli e senza perdere nitidezza. Il box ha proporzioni fisse: nessuno spostamento.
 */
export function WorldStage({ theme }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { mode, visible } = useWorldMode(ref);
  const [ready, setReady] = useState(false);
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mode === 'live') setHost(ref.current?.closest<HTMLElement>('.hero__stage') ?? null);
  }, [mode]);

  return (
    <div ref={ref} className="world" data-ready={ready} role="img" aria-label={i18n.world.aria(profile.firstName)}>
      {/* Due poster, sera e giorno: li sceglie il CSS da data-theme, già impostato prima del primo paint. */}
      <img className="world__poster world__poster--night" alt="" decoding="async" draggable={false} {...WORLD_POSTER} />
      <img
        className="world__poster world__poster--day"
        alt=""
        decoding="async"
        draggable={false}
        {...WORLD_POSTER_DAY}
      />
      {host &&
        createPortal(
          <div className="world-canvas" data-ready={ready} aria-hidden="true">
            <Suspense fallback={null}>
              <WorldCanvas frame={ref} host={host} theme={theme} active={visible} onReady={() => setReady(true)} />
            </Suspense>
          </div>,
          host,
        )}
    </div>
  );
}
