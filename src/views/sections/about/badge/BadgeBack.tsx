import { about } from '../../../../models/about.model';
import { profile } from '../../../../models/profile.model';
import './BadgeBack.css';

export function BadgeBack({ hidden }: { hidden: boolean }) {
  return (
    <div className="bface bface--back paper-sheet" aria-hidden={hidden}>
      <p className="bface__back-title">{about.badge.backTitle}</p>
      <ul className="bface__skills">
        {about.competences.map((c) => (
          <li key={c.title}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="9" />
              <path d="M6 10.2l2.6 2.6L14 7.5" />
            </svg>
            <span>
              <strong>{c.title}</strong>
              <small>{c.detail}</small>
            </span>
          </li>
        ))}
      </ul>
      <p className="bface__sign">
        {profile.firstName}
        <small>
          {profile.role}, {profile.city}
        </small>
      </p>
    </div>
  );
}
