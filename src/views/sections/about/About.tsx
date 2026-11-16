import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { about } from '../../../models/about.model';
import { profile } from '../../../models/profile.model';
import { SectionHeader } from '../../components/SectionHeader';
import { ContactLink } from '../contacts/ContactLink';
import { AboutFacts } from './AboutFacts';
import { AboutLead } from './AboutLead';
import { Badge } from './badge/Badge';
import './About.css';

/** Presentazione: badge appeso a sinistra, testo, dati in breve e link a destra. */
export function About() {
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });
  const [lead, ...bio] = about.bio;

  return (
    <section
      id="chi-sono"
      className="about"
      ref={reveal.ref}
      data-revealed={reveal.revealed}
      aria-labelledby="about-title"
    >
      <div className="about__grid">
        <div className="about__badge">
          <Badge />
        </div>
        <div className="about__intro">
          <SectionHeader id="about-title" title={about.title} revealed={reveal.revealed} size="md" />
          <AboutLead text={lead} />
          <div className="about__bio">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <AboutFacts facts={about.facts} />
          <div className="about__links">
            {profile.contacts.map((c) => (
              <ContactLink key={c.id} contact={c} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
