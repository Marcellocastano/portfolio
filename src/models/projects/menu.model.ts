import { i18n } from '../i18n.model';
import type { Rng } from '../../lib/prng';
import { pick, pickInt } from '../../lib/prng';

type CategoryId = keyof typeof i18n.demos.menu.categories;
type DishId = keyof typeof i18n.demos.menu.dishes;

export interface Dish {
  id: DishId;
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

export const DAY_NAMES = i18n.demos.menu.days;
export const MEAL_NAMES = i18n.demos.menu.meals;
export const DAYS = 4;
export const MEALS = 2;

const cat = (id: CategoryId, emoji: string, target: number): CategoryTarget => ({
  category: i18n.demos.menu.categories[id],
  emoji,
  target,
});

export const CATEGORY_TARGETS: CategoryTarget[] = [
  cat('legumi', '🫘', 2),
  cat('pesce', '🐟', 2),
  cat('carne-bianca', '🍗', 2),
  cat('uova', '🥚', 1),
  cat('formaggi', '🧀', 1),
  cat('carne-rossa', '🥩', 1),
];

const dish = (id: DishId, emoji: string, category: CategoryId, minutes: number): Dish => ({
  id,
  name: i18n.demos.menu.dishes[id],
  emoji,
  category: i18n.demos.menu.categories[category],
  minutes,
});

export const DISHES: Dish[] = [
  dish('insalata-di-riso', '🥗', 'primi', 30),
  dish('tabule', '🥙', 'primi', 25),
  dish('riso-al-forno', '🍚', 'primi', 40),
  dish('pasta-melanzane-pesto', '🍝', 'primi', 30),
  dish('cous-cous', '🍲', 'primi', 20),
  dish('nugget-soia', '🍗', 'carne-bianca', 25),
  dish('sgombero', '🐟', 'pesce', 5),
  dish('seppie-piselli', '🦑', 'pesce', 30),
  dish('salmone', '🐠', 'pesce', 18),
  dish('vellutata-tofu', '🥣', 'legumi', 25),
  dish('lenticchie', '🍜', 'legumi', 35),
  dish('falafel', '🧆', 'legumi', 30),
  dish('frittata-zucchine', '🍳', 'uova', 15),
  dish('uova-purgatorio', '🍅', 'uova', 20),
  dish('spinaci', '🥬', 'verdure', 12),
  dish('zucchine-grigliate', '🥒', 'verdure', 15),
  dish('tagliata', '🥩', 'carne-rossa', 15),
  dish('caprese', '🧀', 'formaggi', 10),
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
