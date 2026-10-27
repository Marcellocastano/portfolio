import type { CSSProperties } from 'react';
import type { SpinCell } from '../../../../../controllers/useMenuDemo';
import { i18n } from '../../../../../models/i18n.model';
import { MEAL_NAMES, type Dish } from '../../../../../models/projects/menu.model';
import './MenuDay.css';

const DAY_COLORS = ['#e5486f', '#f2b53d', '#2ea38f', '#4d7dd1'];
const STRIP_LEN = 7;

function DishLine({ dish }: { dish: Dish }) {
  return (
    <div className="menu-dish">
      <span className="menu-dish__emoji" aria-hidden="true">
        {dish.emoji}
      </span>
      <div className="menu-dish__text">
        <span className="menu-dish__name">{dish.name}</span>
        <span className="menu-dish__meta">
          <span>{dish.category}</span>
          <span>{dish.minutes} min</span>
        </span>
      </div>
    </div>
  );
}

function Slot({ dish, cell, spinId }: { dish: Dish; cell: SpinCell | undefined; spinId: number }) {
  if (!cell) return <DishLine dish={dish} />;
  const shift = `${(-(STRIP_LEN - 1) / STRIP_LEN) * 100}%`;
  return (
    <div
      key={spinId}
      className="menu-dish__strip"
      style={{ '--delay': `${cell.delay}ms`, '--shift': shift } as CSSProperties}
    >
      {cell.strip.map((d, i) => (
        <DishLine key={i} dish={d} />
      ))}
    </div>
  );
}

interface Props {
  name: string;
  index: number;
  dishes: Dish[];
  cells: SpinCell[] | null;
  spinId: number;
}

export function MenuDay({ name, index, dishes, cells, spinId }: Props) {
  return (
    <div className="menu-day" style={{ '--day-color': DAY_COLORS[index % DAY_COLORS.length] } as CSSProperties}>
      <div className="menu-day__head">
        <span className="menu-day__name">{name}</span>
        {index === 1 && <span className="menu-day__today">{i18n.demos.menu.today}</span>}
      </div>
      {dishes.map((dish, mi) => (
        <div className="menu-day__meal" key={mi}>
          <span className="menu-day__mealname">{MEAL_NAMES[mi]}</span>
          <div className="menu-day__slot">
            <Slot dish={dish} cell={cells?.[index * 2 + mi]} spinId={spinId} />
          </div>
        </div>
      ))}
    </div>
  );
}
