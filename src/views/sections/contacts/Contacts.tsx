import { i18n } from '../../../models/i18n.model';
import { profile } from '../../../models/profile.model';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { SectionHeader } from '../../components/SectionHeader';
import { ContactLink } from './ContactLink';
import './Contacts.css';

/** Sezione Contatti: solo canali pubblici, nessuna email. */
export function Contacts() {
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="contatti"
      className="contacts"
      ref={reveal.ref}
      data-revealed={reveal.revealed}
      aria-labelledby="contacts-title"
    >
      <SectionHeader
        id="contacts-title"
        title={i18n.contacts.title}
        lede={i18n.contacts.lede}
        revealed={reveal.revealed}
      />

      <div className="contacts__card">
        <div className="contacts__body">
          <h3 className="contacts__title">{i18n.contacts.cardTitle}</h3>
          <p className="contacts__text">{i18n.contacts.text}</p>
          <ul className="contacts__links">
            {profile.contacts.map((c) => (
              <li key={c.id}>
                <ContactLink contact={c} />
              </li>
            ))}
          </ul>
        </div>

        <div className="contacts__visual">
          <div className="contacts__blob" aria-hidden="true" />
          <img
            className="contacts__img"
            src="/images/contact-me-400.webp"
            width={200}
            height={522}
            loading="lazy"
            alt={i18n.contacts.avatarAlt}
          />
        </div>
      </div>
    </section>
  );
}
