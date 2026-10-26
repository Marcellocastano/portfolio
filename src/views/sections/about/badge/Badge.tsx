import { useState, type KeyboardEvent } from 'react';
import { useParallax } from '../../../../controllers/useParallax';
import { about } from '../../../../models/about.model';
import { profile } from '../../../../models/profile.model';
import { BadgeBack } from './BadgeBack';
import { BadgeFront } from './BadgeFront';
import './Badge.css';

/** Badge appeso al cordino: si inclina seguendo il mouse e al clic si gira mostrando le competenze. */
export function Badge() {
  const [flipped, setFlipped] = useState(false);
  const tilt = useParallax<HTMLDivElement>();
  const flip = () => setFlipped((f) => !f);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    flip();
  };

  return (
    <div className="badge">
      <div className="badge__lanyard" aria-hidden="true">
        <span>
          {profile.firstName} {profile.lastName}
        </span>
      </div>
      <i className="badge__clip" aria-hidden="true" />
      <div
        ref={tilt.ref}
        className="badge__swing"
        data-flipped={flipped}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
      >
        <div
          role="button"
          tabIndex={0}
          className="badge__card"
          aria-pressed={flipped}
          aria-label={flipped ? 'Mostra il fronte del badge' : 'Gira il badge per vedere le competenze'}
          onClick={flip}
          onKeyDown={onKeyDown}
        >
          <BadgeFront hidden={flipped} />
          <BadgeBack hidden={!flipped} />
        </div>
      </div>
      <p className="badge__hint">{about.badge.hint}</p>
    </div>
  );
}
