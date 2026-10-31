import {
  siBootstrap,
  siDocker,
  siGit,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPhp,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siWordpress,
  type SimpleIcon,
} from 'simple-icons';
import type { CompanyId, Skill, SkillCategory } from './skills.model';

const CSM = 'che-si-mangia';
const SN = 'stipendio-netto';
const PD = 'playdev';
const FC = 'fantaclash';

const ALL: CompanyId[] = ['ecosafe', '4dem', 'positive', 'digit'];

interface Extra {
  note?: string;
  until?: number;
  usedIn?: string[];
}

const k = (icon: SimpleIcon, category: SkillCategory, since: number, companies: CompanyId[], extra: Extra): Skill => ({
  id: icon.slug,
  name: icon.title,
  path: icon.path,
  color: `#${icon.hex}`,
  category,
  since,
  companies,
  note: extra.note,
  usedIn: extra.usedIn ?? [],
  until: extra.until,
});

/* ATTENZIONE: anni, aziende e progetti sono placeholder, da verificare. */
export const SKILLS: Skill[] = [
  k(siJavascript, 'frontend', 2018, ALL, {
    usedIn: [CSM, SN, PD, FC],
  }),
  k(siVuedotjs, 'frontend', 2019, ['4dem', 'positive', 'digit'], {
    usedIn: [SN],
  }),
  k(siTypescript, 'frontend', 2021, ['4dem', 'positive', 'digit'], {
    usedIn: [CSM, SN, PD, FC],
  }),
  k(siReact, 'frontend', 2025, ['digit'], {
    usedIn: [CSM, PD, FC],
  }),
  k(siTailwindcss, 'frontend', 2022, ['4dem', 'positive', 'digit'], {
    usedIn: [CSM, FC],
  }),
  k(siBootstrap, 'frontend', 2018, ['ecosafe', '4dem'], {
    until: 2021.5,
  }),
  k(siNodedotjs, 'backend', 2020, ['4dem', 'positive', 'digit'], {
    usedIn: [PD, FC],
  }),
  k(siPhp, 'backend', 2018, ['ecosafe', '4dem'], {
    until: 2021.5,
  }),
  k(siLaravel, 'backend', 2019, ['4dem', 'positive'], {
    until: 2021,
  }),
  k(siWordpress, 'backend', 2019, ['4dem'], {
    until: 2021.5,
  }),
  k(siMysql, 'dati', 2018, ['ecosafe', '4dem', 'positive', 'digit'], {
    usedIn: [SN],
  }),
  k(siMongodb, 'dati', 2020, ['positive'], {
    usedIn: [CSM],
  }),
  k(siGit, 'strumenti', 2018, ALL, {
    usedIn: [CSM, SN, PD, FC],
  }),
  k(siDocker, 'strumenti', 2021, ['4dem', 'positive'], {
    until: 2024,
  }),
];
