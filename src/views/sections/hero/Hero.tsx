import type { Profile } from '../../../models/profile.model';
import type { Theme } from '../../../models/theme.model';
import { ButtonLink } from '../../components/ButtonLink';
import { DotField } from '../../components/DotField';
import { Showcase } from '../../components/showcase/Showcase';
import { HeroHeadline } from './HeroHeadline';
import { HeroTitle } from './HeroTitle';
import './Hero.css';

interface Props {
  profile: Profile;
  theme: Theme;
}

export function Hero({ profile, theme }: Props) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <DotField theme={theme} />
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__copy">
          <HeroTitle {...profile} />
          <HeroHeadline {...profile} />
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <ButtonLink href="#progetti">Vedi i progetti</ButtonLink>
            <ButtonLink href="#contatti" variant="ghost">
              Scrivimi
            </ButtonLink>
          </div>
        </div>

        <div className="hero__visual">
          <Showcase cursorLabel={profile.firstName} />
        </div>
      </div>
    </section>
  );
}
