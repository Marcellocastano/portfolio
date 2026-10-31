import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { about } from '../../../models/about.model';
import { profile } from '../../../models/profile.model';
import { SectionHeader } from '../../components/SectionHeader';
import { ContactLink } from '../contacts/ContactLink';
import { AboutFacts } from './AboutFacts';
import { Badge } from './badge/Badge';
import './About.css';

/** Presentazione: testo a sinistra, badge da sviluppatore al centro, dati rapidi a destra. */
export function About() {
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });

  return (
    <section
      id="chi-sono"
      className="about"
      ref={reveal.ref}
      data-revealed={reveal.revealed}
      aria-labelledby="about-title"
    >
      <div className="about__grid">
        <div className="about__intro">
          <SectionHeader id="about-title" title={about.title} revealed={reveal.revealed} size="md" />
          {about.bio.map((p) => (
            <p key={p} className="about__bio">
              {p}
            </p>
          ))}
          <div className="about__links">
            {profile.contacts.map((c) => (
              <ContactLink key={c.id} contact={c} compact />
            ))}
          </div>
        </div>
        <Badge />
        <AboutFacts facts={about.facts} />
      </div>
    </section>
  );
}
