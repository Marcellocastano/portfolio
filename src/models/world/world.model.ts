import { projects, type Project } from '../projects/projects.model';

type Vec3 = [number, number, number];

/** Ogni quanti secondi il monitor passa al progetto successivo. */
export const SCREEN_CYCLE = 6;
export const SCREEN_PROJECTS: Project[] = projects;

/**
 * Inquadratura dell'izakaya (`izakaya.model.ts`), in tre tempi lungo lo scroll dell'hero:
 * 1. CAMERA, a riposo: la casa è girata (REST) e si vede di tre quarti dal lato del ciliegio, chioma compresa;
 * 2. FOCUS, entro `SCROLL_PHASES.open`: la casa ruota fino all'angolo della sezione, la facciata si apre e si vede
 *    tutto il modello quasi a schermo intero;
 * 3. CLOSE, fino alla fine: la camera entra nella stanza verso la scrivania e l'interno riempie quasi lo schermo,
 *    poi l'hero scorre via verso la sezione successiva.
 */
export const REST_Y = 0.85;
export const CAMERA = { position: [9.81, 9.88, 15.58] as Vec3, target: [0.2, 2.9, 0.2] as Vec3, fov: 27 };
export const FOCUS = {
  rotationY: 0,
  position: [9.95, 9.93, 15.67] as Vec3,
  target: [-0.15, 2.4, -0.5] as Vec3,
};
export const CLOSE = {
  position: [7.13, 7.68, 12.01] as Vec3,
  target: [-0.1, 1.96, -0.57] as Vec3,
};

/** Dove finisce la seconda fase (0-1 dello scroll smorzato): dopo, solo l'avvicinamento alla scrivania. */
export const SCROLL_PHASES = { open: 0.68 };

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Avanzamento delle due fasi della camera per un dato scroll: apertura (0-1) e avvicinamento (0-1). */
export const phasesAt = (focus: number) => ({
  open: smoothstep(0, SCROLL_PHASES.open, focus),
  close: smoothstep(SCROLL_PHASES.open, 1, focus),
});

/**
 * Rotazione a mano nella vista iniziale: `speed` sono i radianti per una larghezza intera del riquadro trascinata,
 * `friction` lo smorzamento dell'inerzia, `rest` sotto quale avanzamento dello scroll il trascinamento è attivo.
 * Appena si scorre la casa torna (per la via più breve) all'angolo previsto dall'animazione.
 */
export const DRAG = { speed: Math.PI * 1.4, friction: 3.5, rest: 0.04, settle: 4 };

/** Immagine statica della scena (pre-rendering, mobile, reduced motion): stesse proporzioni del canvas. */
export const WORLD_POSTER = { src: '/images/world-poster-izakaya.webp', width: 1100, height: 1100 };
/** La stessa vista di giorno, con le luci spente: la mostra il tema chiaro. */
export const WORLD_POSTER_DAY = { src: '/images/world-poster-izakaya-day.webp', width: 1100, height: 1100 };
