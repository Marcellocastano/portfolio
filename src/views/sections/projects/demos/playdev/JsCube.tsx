import { useParallax } from '../../../../../controllers/useParallax';
import './JsCube.css';

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

export function JsCube({ bounced }: { bounced: number }) {
  const parallax = useParallax<HTMLDivElement>();

  return (
    <div className="pd-cube__scene" {...parallax}>
      <div className="pd-cube" key={bounced} data-bounce={bounced > 0}>
        {FACES.map((face) => (
          <span key={face} className={`pd-cube__face pd-cube__face--${face}`}>
            {face === 'front' ? 'JS' : null}
          </span>
        ))}
      </div>
      <span className="pd-cube__shadow" aria-hidden="true" />
    </div>
  );
}
