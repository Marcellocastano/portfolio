import { siDocker, siReact, siTypescript, siVuedotjs } from 'simple-icons';
import { i18n } from '../i18n.model';

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

/* Dati di carriera reali. 4Dem e Positive sono la stessa azienda rinominata.
   Messaggi, periodi e dettagli leggibili sono in i18n.stack.career (per hash);
   i commit 'merge' hanno come messaggio il nome del ramo. */
export const COMMITS: Commit[] = [
  {
    hash: 'e7b2c04',
    type: 'feat',
    message: i18n.stack.career['e7b2c04'].message,
    company: 'digit',
    color: '#a6c93a',
    mark: 'd',
    period: i18n.stack.career['e7b2c04'].period,
    detail: i18n.stack.career['e7b2c04'].detail,
    head: true,
  },
  { hash: '9c1d8a2', type: 'merge', message: 'react' },
  { hash: 'f04e6b1', type: 'merge', message: 'typescript' },
  {
    hash: 'b82a7d5',
    type: 'refactor',
    message: i18n.stack.career['b82a7d5'].message,
    company: 'Positive',
    color: '#ff4f4f',
    mark: 'P',
    period: i18n.stack.career['b82a7d5'].period,
    detail: i18n.stack.career['b82a7d5'].detail,
    skills: i18n.stack.career['b82a7d5'].skills,
  },
  { hash: '3d7f1a9', type: 'merge', message: 'docker' },
  { hash: 'c5e92b8', type: 'merge', message: 'vue' },
  {
    hash: '61af3d4',
    type: 'feat',
    message: i18n.stack.career['61af3d4'].message,
    company: '4Dem',
    color: '#f26a3d',
    mark: '4D',
    detail: i18n.stack.career['61af3d4'].detail,
    period: i18n.stack.career['61af3d4'].period,
    skills: i18n.stack.career['61af3d4'].skills,
  },
  {
    hash: '0a4b7c2',
    type: 'init',
    message: i18n.stack.career['0a4b7c2'].message,
    company: 'EcoSafe Srl',
    color: '#3fa34d',
    mark: 'E',
    period: i18n.stack.career['0a4b7c2'].period,
    detail: i18n.stack.career['0a4b7c2'].detail,
    skills: i18n.stack.career['0a4b7c2'].skills,
  },
];

/* Corsie laterali: fork = indice commit di stacco, merge = indice di rientro, lane = corsia. */
export const BRANCHES: Branch[] = [
  { id: 'vue', fork: 6, merge: 5, lane: 0, color: '#4FC08D', icon: siVuedotjs.path },
  { id: 'docker', fork: 5, merge: 4, lane: 0, color: '#2496ED', icon: siDocker.path },
  { id: 'typescript', fork: 3, merge: 2, lane: 0, color: '#3178C6', icon: siTypescript.path },
  { id: 'react', fork: 3, merge: 1, lane: 1, color: '#61DAFB', icon: siReact.path },
];
