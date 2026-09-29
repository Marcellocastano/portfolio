import type { CSSProperties } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className, delay = 0 }: Props) {
  return (
    <span className={className}>
      {[...text].map((char, i) => (
        <span key={i} className="split-char" style={{ '--i': i + delay } as CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}
