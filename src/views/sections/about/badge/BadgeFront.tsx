import { about } from '../../../../models/about.model';
import { i18n } from '../../../../models/i18n.model';
import { profile } from '../../../../models/profile.model';
import './BadgeFront.css';

export function BadgeFront({ hidden }: { hidden: boolean }) {
  return (
    <div className="bface bface--front paper-sheet" aria-hidden={hidden}>
      <header className="bface__head">
        <span>
          <strong>{about.badge.label}</strong>
        </span>
      </header>
      <img
        className="bface__photo"
        src="/images/io-cartoon.png"
        width={1024}
        height={1307}
        alt={i18n.about.badge.photoAlt(`${profile.firstName} ${profile.lastName}`, profile.role)}
        loading="lazy"
      />
      <p className="bface__name">
        {profile.firstName} {profile.lastName}
      </p>
      <p className="bface__role">{profile.role}</p>
      <dl className="bface__fields">
        {about.badge.fields.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="bface__foot">
        <i className="bface__barcode" />
      </div>
    </div>
  );
}
