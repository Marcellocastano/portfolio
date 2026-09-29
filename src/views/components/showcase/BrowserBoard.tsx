import type { Ref } from 'react';
import { boardColumns, type ColumnId } from '../../../models/showcase/board.model';
import { BOARD_LINE } from '../../../models/showcase/boardCode.model';
import { BoardCard } from './BoardCard';
import './BrowserBoard.css';

interface Props {
  reveal: number;
  column: ColumnId;
  lifted: boolean;
  dragging: boolean;
  cardRef: Ref<HTMLDivElement>;
  dropRef: Ref<HTMLDivElement>;
}

const COLUMN_LINES = [BOARD_LINE.firstColumn, BOARD_LINE.secondColumn];
const SKELETON_CARDS = 1;

export function BrowserBoard({ reveal, column, lifted, dragging, cardRef, dropRef }: Props) {
  const shown = (line: number) => reveal > line;

  return (
    <div className="board" data-on={shown(BOARD_LINE.kanban)}>
      {boardColumns.map((col, i) => {
        const count = Number(column === col.id) + SKELETON_CARDS;
        return (
          <section key={col.id} className="board__column" data-on={shown(COLUMN_LINES[i])}>
            <header className="board__header">
              {col.title}
              <span key={count} className="board__count">
                {count}
              </span>
            </header>
            {i === 0 ? (
              <BoardCard column={column} shown={shown(BOARD_LINE.card)} lifted={lifted} cardRef={cardRef} />
            ) : (
              <div ref={dropRef} className="board__drop" data-hover={dragging} />
            )}
            <span className="board__skeleton" />
          </section>
        );
      })}
    </div>
  );
}
