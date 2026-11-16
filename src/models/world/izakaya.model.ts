type Vec3 = [number, number, number];

/**
 * L'izakaya-studio modellata in Blender ed esportata in glTF (Draco). Il file è in `public/models`, il decoder
 * Draco in `public/draco` (servito dal sito, nessun CDN esterno). Coordinate in metri, asse Y in alto: la
 * facciata guarda +z, il lato aperto in sezione è quello frontale e il fianco destro (+x).
 */
export const IZAKAYA = {
  url: '/models/izakaya.glb',
  draco: '/draco/',
  /** Il centro della pianta della casa sta a z = -0.5: lo si porta sull'asse di rotazione del Rig. */
  offset: [0, 0, 0.5] as Vec3,
};

/**
 * Apertura in sezione, letta dall'avanzamento smorzato dello scroll (0-1): i pezzi della facciata marcati in
 * Blender (`cutaway`) si sollevano di poco e sfumano uno dopo l'altro, così si vede l'interno comparire.
 */
export const CUTAWAY = {
  /** Dentro la seconda fase della camera (`SCROLL_PHASES.open`): a sezione aperta parte l'avvicinamento. */
  range: [0.12, 0.64] as [number, number],
  lift: 1.1,
  spread: 0.9,
  /** Ritardo massimo (in frazione dell'apertura) tra il primo e l'ultimo pezzo. */
  stagger: 0.55,
  /** Durata del movimento di ogni pezzo (in frazione dell'apertura): stagger + duration = 1. */
  duration: 0.45,
};

/**
 * Composizione all'avvio: ogni mesh del modello è un tassello che scende al suo posto, dal basamento verso il
 * tetto. Tempi in secondi; `jitter` mescola un po' l'ordine (0 = rigorosamente dal basso), `drop` in metri.
 */
export const BUILD = {
  delay: 0.3,
  spread: 2.4,
  duration: 0.6,
  drop: 1.4,
  jitter: 0.3,
  /** Le luci si accendono negli ultimi tasselli e finiscono di accendersi dopo l'ultimo. */
  lightsOn: 0.6,
};

/**
 * Luci. Quelle puntiformi arrivano dal glTF in candele (unità fisiche): `punctualScale` le riporta in scala con
 * la scena. Le luci ad area di Blender non esistono in glTF e sono ricreate qui (direzionali e puntiformi).
 */
export const IZAKAYA_LIGHTS = {
  /** Lanterne, insegna e andon fanno le pozze di luce calda sul selciato e sulle pareti. */
  punctualScale: 0.0026,
  punctualRange: 6,
  exposure: 1.0,
  /** Emissione dei materiali (shoji, lanterne, insegna) riportata sotto la soglia in cui il colore si sbianca. */
  emissiveScale: 0.55,
  /** Notte: cielo e luna blu notte tenui (non lilla: sul tetto grigio-blu diventerebbero viola), così dominano le luci calde. */
  hemi: { sky: '#56658a', ground: '#3a2a24', intensity: 0.5 },
  moon: { color: '#b3c2de', intensity: 1.0, position: [-6, 9, 7] as Vec3 },
  facade: { color: '#ffae70', intensity: 1.05, position: [3.5, 2.2, 6.5] as Vec3 },
  rim: { color: '#98a9cc', intensity: 0.8, position: [2, 7, -8] as Vec3 },
  /** Luce calda dentro la stanza, accesa man mano che la facciata si apre (coordinate del modello). */
  interior: { color: '#ffd4ac', intensity: 7, position: [0.2, 3.2, -0.4] as Vec3 },
  /** Luce che esce dalla porta sul selciato, spenta quando la facciata se ne va. */
  door: { color: '#ffc58f', intensity: 6, position: [0.1, 1.1, 1.9] as Vec3 },
};

/**
 * Giorno, col tema chiaro: lanterne, shoji, insegna e andon spenti, la casa illuminata da un sole caldo e da un
 * cielo chiaro. Il tema scuro è la sera (`IZAKAYA_LIGHTS`). Il passaggio tra i due è graduale (`MOOD.damping`).
 */
export const IZAKAYA_DAY = {
  hemi: { sky: '#dfe8ff', ground: '#8a7766', intensity: 1.3 },
  sun: { color: '#fff2de', intensity: 2.6 },
  facade: { color: '#ffe4c8', intensity: 0.45 },
  rim: { color: '#d6e0ff', intensity: 0.6 },
  /** Di giorno la stanza aperta resta un po' illuminata, ma meno della sera. */
  interior: 0.45,
};
export const MOOD = { damping: 1.8 };

/**
 * Aloni additivi (al posto del bloom, che sul canvas trasparente non si può usare): sulle luci del modello,
 * scelte per nome, e davanti alle superfici di carta illuminate. `size` in metri.
 */
export const IZAKAYA_GLOW = {
  lights: [
    { match: /^LGT_Lan_Big/, size: 1.15, opacity: 0.42 },
    { match: /^LGT_Lan_Door/, size: 1.0, opacity: 0.65 },
    { match: /^LGT_Sign/, size: 0.9, opacity: 0.16 },
    { match: /^LGT_Vending/, size: 0.9, opacity: 0.18 },
    { match: /^LGT_Toro/, size: 0.8, opacity: 0.6 },
    { match: /^LGT_INT_Andon/, size: 0.9, opacity: 0.45 },
    { match: /^LGT_Int_Lantern/, size: 1.3, opacity: 0.5 },
    { match: /^LGT_Int_Orb/, size: 0.5, opacity: 0.5 },
  ],
  surfaces: {
    names: ['BLD_Door_Shoji', 'BLD_Window_Shoji', 'BLD_SideWindow_Shoji', 'INT_LeftWall_Shoji'],
    color: '#ffb76b',
    opacity: 0.22,
  },
};

/** Nomi dei nodi glTF che hanno un ruolo nella scena. */
export const IZAKAYA_NODES = {
  screen: 'INT_Screen',
  interiorLight: /^LGT_(Int|INT|Holo|DeskLamp)/,
  holo: /^INT_Holo_/,
  lantern: /^(LAN_(Big_Kaihatsu|Door_[LR])|INT_Lantern_Ceiling)$/,
  petals: 'VEG_Petals',
  /** Mesh che non proiettano ombre: superfici luminose e particelle. */
  noShadow: /Petal|Holo|Screen|Blossom/,
};
