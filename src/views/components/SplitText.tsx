import { Fragment, type CSSProperties } from 'react';
import './SplitText.css';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

/** Lettere animabili una a una (`--i`), raggruppate per parola così il titolo va a capo solo tra le parole. */
export function SplitText({ text, className, delay = 0 }: Props) {
  let index = delay;
  return (
    <span className={className}>
      {text.split(' ').map((word, w) => (
        <Fragment key={w}>
          {w > 0 && ' '}
          <span className="split-word">
            {[...word].map((char) => {
              const i = index++;
              return (
                <span key={i} className="split-char" style={{ '--i': i } as CSSProperties}>
                  {char}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
