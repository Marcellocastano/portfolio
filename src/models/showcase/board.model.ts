export type ColumnId = 'idee' | 'sviluppo';

export interface BoardColumn {
  id: ColumnId;
  title: string;
}

export const boardColumns: BoardColumn[] = [
  { id: 'idee', title: 'Idee' },
  { id: 'sviluppo', title: 'In sviluppo' },
];

export const boardCard = { title: 'Portfolio', initials: 'MC' };

export const statusLabel: Record<ColumnId, string> = { idee: 'Idea', sviluppo: 'In sviluppo' };

export const boardFiles = { design: 'Board.fig', code: 'Board.tsx', url: 'localhost:3000' };
