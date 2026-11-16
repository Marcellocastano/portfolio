import { useRef } from 'react';
import { useSelectionScrub } from '../../../controllers/useSelectionScrub';
import './AboutLead.css';

/** Primo paragrafo della bio, parola per parola: lo scroll lo "seleziona" come in un editor. */
export function AboutLead({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useSelectionScrub(ref, '.about-lead__word');
  const words = text.split(' ');

  return (
    <p ref={ref} className="about-lead">
      {words.map((word, i) => (
        <span key={i} className="about-lead__word">
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </p>
  );
}
