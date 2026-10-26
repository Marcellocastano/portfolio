import { useRef, useState, type ComponentType, type CSSProperties } from 'react';
import { useInView } from '../../../controllers/useInView';
import { useProjectRequests } from '../../../controllers/useProjectRequests';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { projects } from '../../../models/projects/projects.model';
import { SectionHeader } from '../../components/SectionHeader';
import { FantaClashDemo } from './demos/fantaclash/FantaClashDemo';
import { MenuDemo } from './demos/menu/MenuDemo';
import { PlaydevDemo } from './demos/playdev/PlaydevDemo';
import { StipendioDemo } from './demos/stipendio/StipendioDemo';
import { ProjectBook } from './ProjectBook';
import './Projects.css';

const DEMOS: Record<string, ComponentType<{ running: boolean }>> = {
  'che-si-mangia': MenuDemo,
  'stipendio-netto': StipendioDemo,
  playdev: PlaydevDemo,
  fantaclash: FantaClashDemo,
};

const PROJECT_IDS = projects.map((p) => p.id);

/** Libreria dei progetti: un libro aperto, gli altri chiusi di costa. */
export function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(0);
  useProjectRequests(PROJECT_IDS, setOpen);
  const inView = useInView(ref);
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });
  const setRefs = (el: HTMLElement | null) => {
    ref.current = el;
    reveal.ref.current = el;
  };

  return (
    <section
      id="progetti"
      ref={setRefs}
      className="projects"
      data-revealed={reveal.revealed}
      aria-labelledby="projects-title"
    >
      <SectionHeader
        id="projects-title"
        title="Progetti"
        lede="Quattro app che ho costruito nel tempo libero, dall'idea al rilascio. Apri un progetto e prova l'anteprima."
        revealed={reveal.revealed}
      />
      <div className="shelf" style={{ '--books': projects.length } as CSSProperties}>
        {projects.map((project, i) => {
          const Demo = DEMOS[project.id];
          const isOpen = i === open;
          return (
            <ProjectBook
              key={project.id}
              project={project}
              index={i}
              open={isOpen}
              onOpen={setOpen}
              demo={<Demo running={inView && isOpen && reveal.revealed} />}
            />
          );
        })}
      </div>
    </section>
  );
}
