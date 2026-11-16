import type { ReactNode } from 'react';
import { useDomainTyping } from '../../../controllers/useDomainTyping';
import { WindowLights } from '../../components/showcase/Window';
import './ProjectWindow.css';

interface Props {
  domain: string;
  children: ReactNode;
}

/** Finestra del browser con i colori dell'app: il dominio si digita quando la finestra compare. */
export function ProjectWindow({ domain, children }: Props) {
  const typed = useDomainTyping(domain, true);

  return (
    <div className="pwin">
      <header className="pwin__bar">
        <WindowLights />
        <span className="pwin__domain">
          {typed.shown}
          <span className="pwin__caret" data-on={typed.caret} />
        </span>
      </header>
      <div className="pwin__demo" data-lenis-prevent>
        {children}
      </div>
    </div>
  );
}
