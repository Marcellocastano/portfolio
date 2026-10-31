import type { Profile } from '../../../models/profile.model';
import './HeroHeadline.css';

type Props = Pick<Profile, 'headline'>;

export function HeroHeadline({ headline }: Props) {
  return (
    <p className="hero-headline">
      <span>{headline}</span>
    </p>
  );
}
