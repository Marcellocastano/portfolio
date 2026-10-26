import type { Profile } from '../../../models/profile.model';
import './HeroHeadline.css';

type Props = Pick<Profile, 'headline' | 'headlineAccent'>;

export function HeroHeadline({ headline, headlineAccent }: Props) {
  return (
    <p className="hero-headline">
      <span>{headline}</span> <span className="hero-headline__accent">{headlineAccent}</span>
    </p>
  );
}
