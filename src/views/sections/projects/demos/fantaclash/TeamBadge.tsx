import { monogram, type Kit } from '../../../../../models/projects/auction.model';
import './TeamBadge.css';

type BadgeSize = 'sm' | 'md';

interface Props {
  name: string;
  kit: Kit;
  size?: BadgeSize;
}

/** Stemma della squadra: sigla su quadrato bicolore (primario + banda in basso). */
export function TeamBadge({ name, kit, size = 'sm' }: Props) {
  return (
    <span
      className="fc-badge"
      data-size={size}
      style={{ backgroundColor: kit.primary, color: kit.on }}
      aria-hidden="true"
    >
      <span className="fc-badge__band" style={{ backgroundColor: kit.secondary }} />
      <span className="fc-badge__mono">{monogram(name)}</span>
    </span>
  );
}
