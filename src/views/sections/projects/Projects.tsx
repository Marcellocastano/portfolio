import { useRef, useState, type ComponentType, type CSSProperties } from 'react';
import { useInView } from '../../../controllers/useInView';
import { useMediaQuery } from '../../../controllers/useMediaQuery';
import { useProjectRequests } from '../../../controllers/useProjectRequests';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { useScrollRefresh } from '../../../controllers/useScrollRefresh';
import { i18n } from '../../../models/i18n.model';
import { projects } from '../../../models/projects/projects.model';
import { SectionHeader } from '../../components/SectionHeader';
import { FantaClashDemo } from './demos/fantaclash/FantaClashDemo';
import { MenuDemo } from './demos/menu/MenuDemo';
import { PlaydevDemo } from './demos/playdev/PlaydevDemo';
import { StipendioDemo } from './demos/stipendio/StipendioDemo';
import { ProjectEntry } from './ProjectEntry';
import { ProjectStage } from './ProjectStage';
import './Projects.css';

const DEMOS: Record<string, ComponentType<{ running: boolean }>> = {
  'che-si-mangia': MenuDemo,
  'stipendio-netto': StipendioDemo,
  playdev: PlaydevDemo,
  fantaclash: FantaClashDemo,
};

const PROJECT_IDS = projects.map((p) => p.id);
const COMPACT_QUERY = '(max-width: 1023px)';

/** Indice di tutti i progetti e finestra con la demo di quello aperto (dentro la voce su mobile). */
export function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(0);
  const compact = useMediaQuery(COMPACT_QUERY);
  useProjectRequests(PROJECT_IDS, setOpen);
  // La voce aperta cambia l'altezza dell'indice: le sezioni sotto si spostano.
  useScrollRefresh(`${open}-${compact}`);
  const inView = useInView(ref);
  const reveal = useRevealOnce<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -20% 0px' });
  const setRefs = (el: HTMLElement | null) => {
    ref.current = el;
    reveal.ref.current = el;
  };
  const current = projects[open];
  const Demo = DEMOS[current.id];
  const stage = (
    <ProjectStage project={current}>
      <Demo running={inView && reveal.revealed} />
    </ProjectStage>
  );

  return (
    <section
      id="progetti"
      ref={setRefs}
      className="projects"
      style={{ '--glow': current.theme.accent } as CSSProperties}
      data-revealed={reveal.revealed}
      aria-labelledby="projects-title"
    >
      <SectionHeader
        id="projects-title"
        title={i18n.projects.title}
        lede={i18n.projects.lede}
        revealed={reveal.revealed}
      />
      <div className="projects__layout">
        <div className="projects__index">
          {projects.map((project, i) => (
            <ProjectEntry key={project.id} project={project} index={i} open={i === open} onOpen={setOpen}>
              {compact && i === open ? stage : null}
            </ProjectEntry>
          ))}
        </div>
        {!compact && stage}
      </div>
    </section>
  );
}
