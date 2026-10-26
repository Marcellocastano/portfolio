import './BookSpine.css';

interface Props {
  name: string;
  open: boolean;
  controls: string;
  onOpen: () => void;
}

/** Costa del libro: titolo verticale su desktop, intestazione della fisarmonica su mobile. */
export function BookSpine({ name, open, controls, onOpen }: Props) {
  return (
    <button type="button" className="spine" aria-expanded={open} aria-controls={controls} onClick={onOpen}>
      <i className="spine__mark" aria-hidden="true" />
      <span className="spine__title">{name}</span>
      <span className="spine__plus" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M8 3.5v9M3.5 8h9" />
        </svg>
      </span>
    </button>
  );
}
