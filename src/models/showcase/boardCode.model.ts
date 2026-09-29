import { tk, type CodeLine } from '../code.model';

export const BOARD_LINE = { state: 1, kanban: 3, firstColumn: 4, secondColumn: 5, card: 6 } as const;

const indent = (level: number) => tk('punc', '  '.repeat(level));
const tag = (level: number, name: string) => [indent(level), tk('punc', '<'), tk('type', name)];
const closeTag = (level: number, name: string) => [indent(level), tk('punc', '</'), tk('type', name), tk('punc', '>')];
const attr = (name: string, value: string) => [tk('prop', ` ${name}`), tk('punc', '='), tk('str', `"${value}"`)];
const expr = (name: string, value: string) => [
  tk('prop', ` ${name}`),
  tk('punc', '={'),
  tk('var', value),
  tk('punc', '}'),
];

export const boardCode: CodeLine[] = [
  [tk('kw', 'export const '), tk('fn', 'Board'), tk('punc', ' = () => {')],
  [
    indent(1),
    tk('kw', 'const '),
    tk('punc', '['),
    tk('var', 'col'),
    tk('punc', ', '),
    tk('var', 'setCol'),
    tk('punc', '] = '),
    tk('fn', 'useState'),
    tk('punc', '('),
    tk('str', "'idee'"),
    tk('punc', ');'),
  ],
  [indent(1), tk('kw', 'return '), tk('punc', '(')],
  [...tag(2, 'Kanban'), ...expr('onDrop', 'setCol'), tk('punc', '>')],
  [...tag(3, 'Column'), ...attr('title', 'Idee'), tk('punc', ' />')],
  [...tag(3, 'Column'), ...attr('title', 'In sviluppo'), tk('punc', ' />')],
  [...tag(3, 'Card'), ...attr('title', 'Portfolio'), ...expr('col', 'col'), tk('punc', ' />')],
  closeTag(2, 'Kanban'),
  [indent(1), tk('punc', ');')],
  [tk('punc', '};')],
];
