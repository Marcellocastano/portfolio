import type { Rng } from '../../lib/prng';
import { pick, pickInt } from '../../lib/prng';

export interface Dish {
  name: string;
  emoji: string;
  category: string;
  minutes: number;
}

export interface CategoryTarget {
  category: string;
  emoji: string;
  target: number;
}

export const DAY_NAMES = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì'];
export const MEAL_NAMES = ['Pranzo', 'Cena'];
export const DAYS = 4;
export const MEALS = 2;

export const CATEGORY_TARGETS: CategoryTarget[] = [
  { category: 'Legumi', emoji: '🫘', target: 2 },
  { category: 'Pesce', emoji: '🐟', target: 2 },
  { category: 'Carne bianca', emoji: '🍗', target: 2 },
  { category: 'Uova', emoji: '🥚', target: 1 },
  { category: 'Formaggi', emoji: '🧀', target: 1 },
  { category: 'Carne rossa', emoji: '🥩', target: 1 },
];

export const DISHES: Dish[] = [
  { name: 'Insalata di riso', emoji: '🥗', category: 'Primi', minutes: 30 },
  { name: 'Tabulè', emoji: '🥙', category: 'Primi', minutes: 25 },
  { name: 'Riso al forno', emoji: '🍚', category: 'Primi', minutes: 40 },
  { name: 'Pasta melanzane e pesto', emoji: '🍝', category: 'Primi', minutes: 30 },
  { name: 'Cous cous vegetale', emoji: '🍲', category: 'Primi', minutes: 20 },
  { name: 'Nugget di soia', emoji: '🍗', category: 'Carne bianca', minutes: 25 },
  { name: 'Sgombero grigliato', emoji: '🐟', category: 'Pesce', minutes: 5 },
  { name: 'Seppie con piselli', emoji: '🦑', category: 'Pesce', minutes: 30 },
  { name: 'Salmone al vapore', emoji: '🐠', category: 'Pesce', minutes: 18 },
  { name: 'Vellutata con tofu', emoji: '🥣', category: 'Legumi', minutes: 25 },
  { name: 'Zuppa di lenticchie', emoji: '🍜', category: 'Legumi', minutes: 35 },
  { name: 'Falafel al forno', emoji: '🧆', category: 'Legumi', minutes: 30 },
  { name: 'Frittata di zucchine', emoji: '🍳', category: 'Uova', minutes: 15 },
  { name: 'Uova in purgatorio', emoji: '🍅', category: 'Uova', minutes: 20 },
  { name: 'Spinaci in padella', emoji: '🥬', category: 'Verdure', minutes: 12 },
  { name: 'Zucchine grigliate', emoji: '🥒', category: 'Verdure', minutes: 15 },
  { name: 'Tagliata di manzo', emoji: '🥩', category: 'Carne rossa', minutes: 15 },
  { name: 'Caprese', emoji: '🧀', category: 'Formaggi', minutes: 10 },
];

export type Week = Dish[][];

/** Regola: niente stessa categoria due volte nello stesso giorno. */
export function generateWeek(rng: Rng): Week {
  const week: Week = [];
  for (let day = 0; day < DAYS; day += 1) {
    const lunch = pick(rng, DISHES);
    const dinnerPool = DISHES.filter((d) => d.category !== lunch.category);
    week.push([lunch, pick(rng, dinnerPool)]);
  }
  return week;
}

export function countByCategory(week: Week): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const day of week) for (const dish of day) counts[dish.category] = (counts[dish.category] ?? 0) + 1;
  return counts;
}

/** Striscia per l'effetto slot: piatti casuali con quello finale in coda. */
export function spinStrip(rng: Rng, finalDish: Dish, length = 7): Dish[] {
  const strip: Dish[] = [];
  for (let i = 0; i < length - 1; i += 1) strip.push(pick(rng, DISHES));
  strip.push(finalDish);
  return strip;
}

export function spinDelay(rng: Rng, index: number): number {
  return index * 70 + pickInt(rng, 0, 40);
}
