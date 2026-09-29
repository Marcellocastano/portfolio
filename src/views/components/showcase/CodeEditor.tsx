import type { CodeLine } from '../../../models/code.model';
import './CodeEditor.css';

interface Props {
  lines: CodeLine[];
  rows: number;
  activeLine: number;
  idle: boolean;
  flashLines: number[];
}

export function CodeEditor({ lines, rows, activeLine, idle, flashLines }: Props) {
  return (
    <pre className="code-editor">
      <code>
        {Array.from({ length: rows }, (_, i) => (
          <span
            key={i}
            className="code-line"
            data-active={i === activeLine && !idle}
            data-flash={flashLines.includes(i)}
          >
            <span className="code-line__no">{i + 1}</span>
            <span className="code-line__content">
              {lines[i]?.map((token, j) => (
                <span key={j} className={`tok tok--${token.kind}`}>
                  {token.text}
                </span>
              ))}
              {i === activeLine && <span className="caret" data-idle={idle} />}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}
