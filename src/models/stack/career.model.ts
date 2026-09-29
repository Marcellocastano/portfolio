import { siDocker, siReact, siTypescript, siVuedotjs } from 'simple-icons';

export type CommitType = 'feat' | 'refactor' | 'init' | 'merge';

export interface Commit {
  hash: string;
  type: CommitType;
  message: string;
  company?: string;
  /** Colore azienda e iniziale del badge. */
  color?: string;
  mark?: string;
  detail?: string;
  period?: string;
  skills?: string[];
  head?: boolean;
}

export interface Branch {
  id: string;
  fork: number;
  merge: number;
  lane: number;
  color: string;
  icon: string;
}

/* Dati di carriera reali. 4Dem e Positive sono la stessa azienda rinominata. */
export const COMMITS: Commit[] = [
  {
    hash: 'e7b2c04',
    type: 'feat',
    message: 'Software Developer in digit',
    company: 'digit',
    color: '#a6c93a',
    mark: 'd',
    period: 'Dic 2024 - oggi',
    detail: 'Torino, ibrido',
    head: true,
  },
  { hash: '9c1d8a2', type: 'merge', message: 'react' },
  { hash: 'f04e6b1', type: 'merge', message: 'typescript' },
  {
    hash: 'b82a7d5',
    type: 'refactor',
    message: '4Dem diventa Positive, ruolo Full Stack Developer',
    company: 'Positive',
    color: '#ff4f4f',
    mark: 'P',
    period: 'Mar 2023 - Nov 2024',
    detail: 'Torino, ibrido',
    skills: ['TypeScript', 'Sviluppo software'],
  },
  { hash: '3d7f1a9', type: 'merge', message: 'docker' },
  { hash: 'c5e92b8', type: 'merge', message: 'vue' },
  {
    hash: '61af3d4',
    type: 'feat',
    message: 'Web Software Developer in 4Dem',
    company: '4Dem',
    color: '#f26a3d',
    mark: '4D',
    detail: 'Digital & Email Marketing',
    period: 'Set 2018 - Mar 2023',
    skills: ['Vue.js', 'Debug'],
  },
  {
    hash: '0a4b7c2',
    type: 'init',
    message: 'IT Software Developer in EcoSafe Srl',
    company: 'EcoSafe Srl',
    color: '#3fa34d',
    mark: 'E',
    period: 'Gen 2018 - Lug 2018',
    detail: 'Torino',
    skills: ['Debug', 'Bootstrap'],
  },
];

/* Corsie laterali: fork = indice commit di stacco, merge = indice di rientro, lane = corsia. */
export const BRANCHES: Branch[] = [
  { id: 'vue', fork: 6, merge: 5, lane: 0, color: '#4FC08D', icon: siVuedotjs.path },
  { id: 'docker', fork: 5, merge: 4, lane: 0, color: '#2496ED', icon: siDocker.path },
  { id: 'typescript', fork: 3, merge: 2, lane: 0, color: '#3178C6', icon: siTypescript.path },
  { id: 'react', fork: 3, merge: 1, lane: 1, color: '#61DAFB', icon: siReact.path },
];
