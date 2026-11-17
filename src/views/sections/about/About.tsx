import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { about } from '../../../models/about.model';
import { profile } from '../../../models/profile.model';
import { SectionHeader } from '../../components/SectionHeader';
import { ContactLink } from '../contacts/ContactLink';
import { AboutFacts } from './AboutFacts';
import { AboutLead } from './AboutLead';
import './About.css';

/** Presentazione: a sinistra foto e dati chiave (fermi mentre si legge), a destra la bio e i link. */
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
        <aside className="about__aside">
          <img
            className="about__photo"
            src={about.photo.src}
            width={about.photo.width}
            height={about.photo.height}
            alt={about.photo.alt}
            loading="lazy"
          />
          <AboutFacts facts={about.facts} />
        </aside>
        <div className="about__intro">
          <SectionHeader id="about-title" title={about.title} revealed={reveal.revealed} size="md" />
          <AboutLead text={lead} />
          <div className="about__bio">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
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
