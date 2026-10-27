import { i18n } from '../i18n.model';

export type ColumnId = 'idee' | 'sviluppo';

export interface BoardColumn {
  id: ColumnId;
  title: string;
}

export const boardColumns: BoardColumn[] = [
  { id: 'idee', title: i18n.showcase.columns.idee },
  { id: 'sviluppo', title: i18n.showcase.columns.sviluppo },
];

export const boardCard = { title: 'Portfolio', initials: 'MC' };

export const statusLabel: Record<ColumnId, string> = {
  idee: i18n.showcase.status.idee,
  sviluppo: i18n.showcase.status.sviluppo,
};

export const boardFiles = { design: 'Board.fig', code: 'Board.tsx', url: 'localhost:3000' };
