import { siGithub } from 'simple-icons';
import type { Contact } from '../../../models/profile.model';
import './ContactLink.css';

/* simple-icons 16.32.0 non include più LinkedIn: glifo minimale inline. */
const LINKEDIN_PATH =
  'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z';

interface Props {
  contact: Contact;
}

/** Tile di contatto: logo brand, nome, handle in mono, freccia che ruota in hover. */
export function ContactLink({ contact }: Props) {
  const d = contact.id === 'github' ? siGithub.path : LINKEDIN_PATH;
  return (
    <a
      className="cl"
      data-id={contact.id}
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Marcello Castano su ${contact.label}: ${contact.handle}`}
    >
      <svg className="cl__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={d} fill="currentColor" />
      </svg>
      <span className="cl__name">{contact.label}</span>
      <span className="cl__handle">{contact.handle}</span>
      <svg className="cl__arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 17 17 7M17 7H8m9 0v9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
