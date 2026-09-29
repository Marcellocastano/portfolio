import { useRef, type ComponentType, type CSSProperties } from 'react';
import { useInView } from '../../../controllers/useInView';
import { useProjectRequests } from '../../../controllers/useProjectRequests';
import { useRevealOnce } from '../../../controllers/useRevealOnce';
import { useScrollChapters } from '../../../controllers/useScrollChapters';
import { projectCssVars, projects } from '../../../models/projects/projects.model';
import { SectionHeader } from '../../components/SectionHeader';
import { FantArcadeDemo } from './demos/fantarcade/FantArcadeDemo';
import { MenuDemo } from './demos/menu/MenuDemo';
import { PlaydevDemo } from './demos/playdev/PlaydevDemo';
import { StipendioDemo } from './demos/stipendio/StipendioDemo';
import { ProjectChapter } from './ProjectChapter';
import { ProjectNav } from './ProjectNav';
import './Projects.css';

const DEMOS: Record<string, ComponentType<{ running: boolean }>> = {
  'che-si-mangia': MenuDemo,
  'stipendio-netto': StipendioDemo,
  playdev: PlaydevDemo,
  fantarcade: FantArcadeDemo,
};

const PROJECT_IDS = projects.map((p) => p.id);

export function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  const { active, stacked, goTo } = useScrollChapters(ref, projects.length);
  useProjectRequests(PROJECT_IDS, stacked, goTo);
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
      style={{ '--count': projects.length, ...projectCssVars(projects[active]) } as CSSProperties}
      aria-labelledby="projects-title"
    >
      <div className="projects__sticky">
        <SectionHeader
          id="projects-title"
          title="Progetti"
          lede="Quattro app nate da problemi veri. Le anteprime sono interattive: provale."
          revealed={reveal.revealed}
        />
        <div className="projects__glow" aria-hidden="true" />
        <div className="projects__grid">
          <ProjectNav projects={projects} active={active} onSelect={goTo} />
          {projects.map((project, i) => {
            const isActive = stacked || i === active;
            const Demo = DEMOS[project.id];
            return (
              <ProjectChapter
                key={project.id}
                project={project}
                active={isActive}
                first={i === 0}
                revealed={reveal.revealed}
                demo={<Demo running={inView && isActive && reveal.revealed} />}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
