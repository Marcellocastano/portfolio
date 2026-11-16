import type { ProjectTheme } from '../../models/projects/projects.model';

const SANS = '"Space Grotesk Variable", system-ui, sans-serif';

/** Rettangolo arrotondato pieno. */
export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

/** Valore tra 0 e 1 che oscilla dolcemente nel tempo, sfasato da `phase`. */
const wave = (t: number, speed: number, phase = 0) => 0.5 + 0.5 * Math.sin(t * speed + phase);

function paintNav(ctx: CanvasRenderingContext2D, w: number, theme: ProjectTheme, name: string) {
  ctx.fillStyle = theme.surface;
  ctx.fillRect(0, 0, w, 44);
  ctx.fillStyle = theme.accent;
  roundRect(ctx, 18, 14, 16, 16, 4);
  ctx.fillStyle = theme.fg;
  ctx.font = `700 17px ${theme.fontDisplay ?? SANS}`;
  ctx.fillText(name, 44, 28);
  ctx.fillStyle = theme.muted;
  [0, 1, 2].forEach((i) => roundRect(ctx, w - 150 + i * 44, 19, 32, 6, 3));
}

function paintHero(ctx: CanvasRenderingContext2D, theme: ProjectTheme, t: number) {
  ctx.fillStyle = theme.fg;
  roundRect(ctx, 24, 72, 220, 18, 5);
  roundRect(ctx, 24, 98, 170, 18, 5);
  ctx.fillStyle = theme.muted;
  roundRect(ctx, 24, 130, 200, 7, 3);
  roundRect(ctx, 24, 144, 160, 7, 3);
  ctx.fillStyle = theme.accent;
  roundRect(ctx, 24, 166, 88 + wave(t, 2) * 6, 28, 7);
}

/** Grafico a barre che respira: l'app è viva anche senza nessuno davanti. */
function paintChart(ctx: CanvasRenderingContext2D, w: number, theme: ProjectTheme, t: number) {
  const x = w - 228;
  ctx.fillStyle = theme.surface;
  roundRect(ctx, x, 66, 204, 132, 10);
  for (let i = 0; i < 7; i++) {
    const hgt = 22 + wave(t, 1.3, i * 0.9) * 68;
    ctx.fillStyle = i === 4 ? theme.accent : theme.muted;
    ctx.globalAlpha = i === 4 ? 1 : 0.45;
    roundRect(ctx, x + 18 + i * 26, 184 - hgt, 16, hgt, 4);
  }
  ctx.globalAlpha = 1;
}

function paintCards(ctx: CanvasRenderingContext2D, w: number, theme: ProjectTheme, t: number) {
  const cw = (w - 72) / 3;
  const active = Math.floor(t / 1.6) % 3;
  for (let i = 0; i < 3; i++) {
    const x = 24 + i * (cw + 12);
    ctx.fillStyle = theme.surface;
    roundRect(ctx, x, 218, cw, 76, 9);
    if (i === active) {
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(x + 1, 219, cw - 2, 74, 9);
      ctx.stroke();
    }
    ctx.fillStyle = theme.muted;
    roundRect(ctx, x + 12, 234, cw * 0.55, 8, 3);
    roundRect(ctx, x + 12, 250, cw * 0.8, 6, 3);
    ctx.fillStyle = i === active ? theme.accent : theme.muted;
    roundRect(ctx, x + 12, 272, cw * (0.3 + wave(t, 1.8, i) * 0.5), 8, 4);
  }
}

/** Puntatore che si muove tra i contenuti, come se qualcuno stesse usando l'app. */
function paintPointer(ctx: CanvasRenderingContext2D, w: number, t: number) {
  const x = w * (0.35 + 0.3 * Math.sin(t * 0.7));
  const y = 150 + 60 * Math.sin(t * 1.1 + 1);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#1b1f27';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + 18);
  ctx.lineTo(x + 5, y + 14);
  ctx.lineTo(x + 12, y + 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

/**
 * Mini app sul monitor nei colori del progetto. `cycle` va da 0 a 1 nel tempo dedicato al progetto:
 * all'inizio una tendina nel colore d'accento rivela la nuova schermata.
 */
export function paintScreen(
  ctx: CanvasRenderingContext2D,
  size: { w: number; h: number },
  project: { name: string; theme: ProjectTheme },
  t: number,
  cycle: number,
) {
  const { w, h } = size;
  const { theme } = project;
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, w, h);
  paintNav(ctx, w, theme, project.name);
  paintHero(ctx, theme, t);
  paintChart(ctx, w, theme, t);
  paintCards(ctx, w, theme, t);
  paintPointer(ctx, w, t);
  if (cycle < 0.12) {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(w * (cycle / 0.12), 0, w, h);
  }
}
