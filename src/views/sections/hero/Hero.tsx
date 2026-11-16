import { useRef } from 'react';
import { useHeroScroll } from '../../../controllers/useHeroScroll';
import { useVariableProximity } from '../../../controllers/useVariableProximity';
import { i18n } from '../../../models/i18n.model';
import type { Profile } from '../../../models/profile.model';
import type { Theme } from '../../../models/theme.model';
import { ButtonLink } from '../../components/ButtonLink';
import { DotField } from '../../components/DotField';
import { WorldStage } from '../../components/world/WorldStage';
import { HeroTitle } from './HeroTitle';
import './Hero.css';

interface Props {
  profile: Profile;
  theme: Theme;
}

export function Hero({ profile, theme }: Props) {
  const ref = useRef<HTMLElement>(null);
  useHeroScroll(ref);
  useVariableProximity(ref, '.hero-title__name .split-char');

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <DotField theme={theme} />
        <div className="hero__vignette" aria-hidden="true" />

        <div className="hero__grid">
          <div className="hero__copy">
            <HeroTitle {...profile} />
            <p className="hero__intro">
              <strong>{profile.headline}</strong> {profile.intro}
            </p>
            <div className="hero__actions">
              <ButtonLink href="#progetti">{i18n.hero.ctaProjects}</ButtonLink>
              <ButtonLink href="#contatti" variant="ghost">
                {i18n.hero.ctaContact}
              </ButtonLink>
            </div>
          </div>

          <div className="hero__visual">
            <WorldStage theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}
