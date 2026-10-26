import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { SectionHeader } from '../../components/SectionHeader';
import { SkillMatrix } from './matrix/SkillMatrix';
import './Stack.css';

export function Stack() {
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });

  return (
    <section
      id="stack"
      className="stack"
      data-revealed={reveal.revealed}
      ref={reveal.ref}
      aria-labelledby="stack-title"
    >
      <SectionHeader
        id="stack-title"
        title="Stack"
        lede="Le tecnologie che uso, da quando e in quale azienda. Passa su un'azienda per vedere cosa usavo lì."
        revealed={reveal.revealed}
      />
      <SkillMatrix />
    </section>
  );
}
