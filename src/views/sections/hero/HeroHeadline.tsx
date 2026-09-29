import { useRotatingWord } from '../../../controllers/useRotatingWord';
import type { Profile } from '../../../models/profile.model';
import './HeroHeadline.css';

type Props = Pick<Profile, 'headline' | 'headlineLead' | 'rotatingWords'>;

export function HeroHeadline({ headline, headlineLead, rotatingWords }: Props) {
  const word = useRotatingWord(rotatingWords);

  return (
    <p className="hero-headline">
      <span>{headline}</span>
      <span className="hero-headline__line">
        {headlineLead}{' '}
        <span className="hero-headline__rotator">
          <span className="sr-only">{rotatingWords.join(', ')}</span>
          <span aria-hidden="true">{word}</span>
          <span className="hero-headline__caret" aria-hidden="true" />
        </span>
      </span>
    </p>
  );
}
