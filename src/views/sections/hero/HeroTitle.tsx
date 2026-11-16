import { i18n } from '../../../models/i18n.model';
import type { Profile } from '../../../models/profile.model';
import { BouncingPeriod } from '../../components/BouncingPeriod';
import { SplitText } from '../../components/SplitText';
import './HeroTitle.css';

type Props = Pick<Profile, 'firstName' | 'lastName' | 'role'>;

/** Nome su due righe e ruolo evidenziato come una selezione nell'editor, con il caret alla fine. */
export function HeroTitle({ firstName, lastName, role }: Props) {
  return (
    <h1 id="hero-title" className="hero-title" aria-label={i18n.hero.titleAria(`${firstName} ${lastName}`, role)}>
      <SplitText text={firstName} className="hero-title__name" />{' '}
      <span className="hero-title__row">
        <SplitText text={lastName} className="hero-title__name" delay={firstName.length} />
        <BouncingPeriod />
      </span>{' '}
      <span className="hero-title__role">
        <span className="hero-title__role-text">{role}</span>
        <span className="hero-title__caret" aria-hidden="true" />
      </span>
    </h1>
  );
}
