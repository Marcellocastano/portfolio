import type { Ref } from 'react';
import { boardCard, statusLabel, type ColumnId } from '../../../models/showcase/board.model';

interface Props {
  column: ColumnId;
  shown: boolean;
  lifted: boolean;
  cardRef: Ref<HTMLDivElement>;
}

export function BoardCard({ column, shown, lifted, cardRef }: Props) {
  return (
    <div ref={cardRef} className="board__card" data-on={shown} data-moved={column === 'sviluppo'} data-lifted={lifted}>
      <span className="board__avatar">{boardCard.initials}</span>
      <span className="board__card-text">
        <strong>{boardCard.title}</strong>
        <span key={column}>{statusLabel[column]}</span>
      </span>
    </div>
  );
}
