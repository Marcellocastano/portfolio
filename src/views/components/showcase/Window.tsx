import type { CSSProperties, ReactNode } from 'react';
import './Window.css';

interface WindowProps {
  className: string;
  active: boolean;
  depth: number;
  bar: ReactNode;
  variant?: 'code';
  children: ReactNode;
}

export function Window({ className, active, depth, bar, variant, children }: WindowProps) {
  const classes = ['window', variant && `window--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-active={active} style={{ '--depth': depth } as CSSProperties}>
      <header className="window__bar">{bar}</header>
      {children}
    </div>
  );
}

export const WindowLights = () => (
  <span className="window__lights">
    <i />
    <i />
    <i />
  </span>
);

export const WindowTab = ({ children }: { children: ReactNode }) => <span className="window__tab">{children}</span>;

export function WindowUrl({ url, reloadKey, reloading }: { url: string; reloadKey: number; reloading: boolean }) {
  return (
    <span className="window__url">
      {url}
      <span key={reloadKey} className="window__reload" data-on={reloading} />
    </span>
  );
}
