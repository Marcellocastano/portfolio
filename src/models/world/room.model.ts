type Vec3 = [number, number, number];

/**
 * La luce della stanza, con l'interruttore sulla parete sinistra: spenta, lampade e andon della stanza si spengono
 * (lo schermo e gli ologrammi restano accesi) e sopra la mia testa compare la nuvoletta del sonno. Coordinate del
 * modello (come le luci in `IZAKAYA_LIGHTS`).
 */
export const ROOM = {
  /** Lampade della stanza: mesh luminose e luci glTF che l'interruttore spegne. */
  lamps: /^INT_(Andon|Lantern_Ceiling|OrbLamp|DeskLamp)/,
  lights: /^LGT_(Int|INT|DeskLamp)/,
  /** Quanto resta acceso a luce spenta (0-1) e velocità del passaggio. */
  off: 0.04,
  damping: 5,
  /** Inclinazione del bilanciere dell'interruttore (radianti): su acceso, giù spento. */
  tilt: 0.32,
  /** Sopra la testa dell'avatar, un po' di lato: lì compare la nuvoletta. */
  bubble: [-0.2, 2.3, -1.1] as Vec3,
};
