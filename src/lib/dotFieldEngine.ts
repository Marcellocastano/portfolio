interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  heat: number;
}

export interface DotFieldColors {
  dot: string;
  accent: string;
}

const GAP = 26;
const RADIUS = 170;
const PUSH = 22;
const POINTER_EASE = 0.08;
const DOT_EASE = 0.14;
const IDLE_INTENSITY = 0.55;

export function createDotFieldEngine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, colors: DotFieldColors) {
  let dots: Dot[] = [];
  let width = 0;
  let height = 0;
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    const offsetX = (width % GAP) / 2;
    const offsetY = (height % GAP) / 2;
    for (let y = offsetY; y <= height; y += GAP) {
      for (let x = offsetX; x <= width; x += GAP) dots.push({ x, y, ox: 0, oy: 0, heat: 0 });
    }
  };

  const followPointer = (time: number) => {
    if (!pointer.active) {
      pointer.tx = width * (0.72 + 0.18 * Math.sin(time * 0.00035));
      pointer.ty = height * (0.5 + 0.32 * Math.sin(time * 0.0006));
    }
    pointer.x += (pointer.tx - pointer.x) * POINTER_EASE;
    pointer.y += (pointer.ty - pointer.y) * POINTER_EASE;
  };

  const drawDot = (dot: Dot, intensity: number) => {
    const dx = dot.x - pointer.x;
    const dy = dot.y - pointer.y;
    const dist = Math.hypot(dx, dy) || 1;
    const force = dist < RADIUS ? (1 - dist / RADIUS) ** 2 : 0;

    dot.ox += ((dx / dist) * force * PUSH * intensity - dot.ox) * DOT_EASE;
    dot.oy += ((dy / dist) * force * PUSH * intensity - dot.oy) * DOT_EASE;
    dot.heat += (force * intensity - dot.heat) * DOT_EASE;

    ctx.globalAlpha = 0.35 + dot.heat * 0.65;
    ctx.fillStyle = dot.heat > 0.04 ? colors.accent : colors.dot;
    ctx.beginPath();
    ctx.arc(dot.x + dot.ox, dot.y + dot.oy, 1 + dot.heat * 2.4, 0, Math.PI * 2);
    ctx.fill();
  };

  const draw = (time: number) => {
    followPointer(time);
    ctx.clearRect(0, 0, width, height);
    const intensity = pointer.active ? 1 : IDLE_INTENSITY;
    for (const dot of dots) drawDot(dot, intensity);
    ctx.globalAlpha = 1;
  };

  const setPointer = (x: number, y: number) => {
    pointer.active = true;
    pointer.tx = x;
    pointer.ty = y;
  };

  const releasePointer = () => {
    pointer.active = false;
  };

  return { resize, draw, setPointer, releasePointer };
}
