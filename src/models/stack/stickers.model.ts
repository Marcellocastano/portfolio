import type { SimpleIcon } from 'simple-icons';

export type StickerCategory = 'frontend' | 'backend' | 'dati' | 'strumenti';
export type StickerShape = 'hex' | 'circle' | 'die-cut';
export type StickerSize = 's' | 'm' | 'l';

export interface Sticker {
  id: string;
  name: string;
  icon: SimpleIcon;
  /** Colori del vinile: sfondo e glifo (scelti per il contrasto reale del logo). */
  bg: string;
  fg: string;
  category: StickerCategory;
  since: number;
  description: string;
  /** id dei progetti in models/projects (placeholder). */
  usedIn: string[];
  /** Posizione sul coperchio in %, rotazione in gradi, dimensione e forma. */
  x: number;
  y: number;
  rotate: number;
  size: StickerSize;
  shape: StickerShape;
}

export const CATEGORIES: { id: StickerCategory; label: string; color: string }[] = [
  { id: 'frontend', label: 'Frontend', color: '#61DAFB' },
  { id: 'backend', label: 'Backend', color: '#FF2D20' },
  { id: 'dati', label: 'Dati', color: '#47A248' },
  { id: 'strumenti', label: 'Strumenti', color: '#F5A623' },
];

const NOTE = 'Uno dei mattoni con cui costruisco ogni giorno: qui andrà una nota su come lo uso e perché mi piace.';

/** Compatta gli adesivi: (id, icona, bg, fg, categoria, dal, progetti, x, y, rot, size, forma). */
export const s = (
  id: string,
  icon: SimpleIcon,
  bg: string,
  fg: string,
  category: StickerCategory,
  since: number,
  usedIn: string[],
  x: number,
  y: number,
  rotate: number,
  size: StickerSize,
  shape: StickerShape,
): Sticker => ({
  id,
  name: icon.title,
  icon,
  bg,
  fg,
  category,
  since,
  description: NOTE,
  usedIn,
  x,
  y,
  rotate,
  size,
  shape,
});
