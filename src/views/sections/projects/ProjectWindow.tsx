import { cloneElement, isValidElement, type ReactNode } from 'react';
import { useDomainTyping } from '../../../controllers/useDomainTyping';
import { WindowLights } from '../../components/showcase/Window';
import './ProjectWindow.css';

interface Props {
  domain: string;
  open: boolean;
  children: ReactNode;
}

/** Finestra del browser con i colori dell'app: il dominio si digita all'apertura del libro. */
export function ProjectWindow({ domain, open, children }: Props) {
  const typed = useDomainTyping(domain, open);
  const demo = isValidElement<{ running: boolean }>(children)
    ? cloneElement(children, { running: Boolean(children.props.running && open) })
    : children;

  return (
    <div className="pwin">
      <header className="pwin__bar">
        <WindowLights />
        <span className="pwin__domain">
          {typed.shown}
          <span className="pwin__caret" data-on={typed.caret} />
        </span>
      </header>
      <div className="pwin__demo">{demo}</div>
    </div>
  );
}
