import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { i18n } from '../../../models/i18n.model';
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
      <SectionHeader id="stack-title" title={i18n.stack.title} lede={i18n.stack.lede} revealed={reveal.revealed} />
      <SkillMatrix />
    </section>
  );
}
