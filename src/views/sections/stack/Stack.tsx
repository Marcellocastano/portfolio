import { useRef } from 'react';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { SectionHeader } from '../../components/SectionHeader';
import { Stickers } from './stickers/Stickers';
import { CareerTimeline } from './career/CareerTimeline';
import { ProfileCard } from './career/ProfileCard';
import './Stack.css';

export function Stack() {
  const ref = useRef<HTMLElement | null>(null);
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });
  const setRefs = (el: HTMLElement | null) => {
    ref.current = el;
    reveal.ref.current = el;
  };

  return (
    <section id="stack" className="stack" data-revealed={reveal.revealed} ref={setRefs} aria-labelledby="stack-title">
      <SectionHeader
        id="stack-title"
        title="Stack"
        lede="Con cosa costruisco, e dove l'ho imparato."
        revealed={reveal.revealed}
      />
      <Stickers />
      <h3 className="stack__subtitle">
        Percorso <code className="stack__cmd">git log --graph</code>
      </h3>
      <div className="stack__career">
        <ProfileCard />
        <CareerTimeline />
      </div>
    </section>
  );
}
