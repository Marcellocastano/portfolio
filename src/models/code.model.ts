export type TokenKind = 'kw' | 'type' | 'var' | 'prop' | 'str' | 'fn' | 'punc';

export interface CodeToken {
  kind: TokenKind;
  text: string;
}

export type CodeLine = CodeToken[];

interface TypedLine {
  tokens: CodeLine;
  active: boolean;
}

export const tk = (kind: TokenKind, text: string): CodeToken => ({ kind, text });

const lineLength = (line: CodeLine) => line.reduce((sum, token) => sum + token.text.length, 0);

export const countChars = (lines: CodeLine[]) => lines.reduce((sum, line) => sum + lineLength(line) + 1, 0);

export function sliceTypedCode(lines: CodeLine[], typed: number) {
  let budget = typed;
  let completedLines = 0;
  const visibleLines: TypedLine[] = [];

  for (const line of lines) {
    if (budget <= 0) break;
    const tokens: CodeLine = [];
    for (const token of line) {
      if (budget <= 0) break;
      tokens.push({ ...token, text: token.text.slice(0, budget) });
      budget -= token.text.length;
    }
    budget -= 1;
    if (budget >= 0) completedLines++;
    visibleLines.push({ tokens, active: budget < 0 });
  }

  const last = visibleLines[visibleLines.length - 1];
  if (last && !visibleLines.some((line) => line.active)) last.active = true;
  return { visibleLines, completedLines };
}
