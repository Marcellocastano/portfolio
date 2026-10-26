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
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siWordpress,
} from 'simple-icons';
import { s, type Sticker } from './stickers.model';

const CSM = 'che-si-mangia';
const SN = 'stipendio-netto';
const PD = 'playdev';
const FA = 'fantaclash';
const ALL = [CSM, SN, PD, FA];

/* ATTENZIONE: gli anni "dal AAAA" sono placeholder, da verificare. */
export const STICKERS: Sticker[] = [
  s('javascript', siJavascript, '#F7DF1E', '#1f2430', 'frontend', 2018, ALL, 15, 14, -8, 'l', 'hex'),
  s('vue', siVuedotjs, '#ffffff', '#4FC08D', 'frontend', 2018, [SN], 33, 10, 6, 'm', 'die-cut'),
  s('php', siPhp, '#777BB4', '#ffffff', 'backend', 2018, [SN], 68, 12, -7, 'm', 'die-cut'),
  s('laravel', siLaravel, '#FF2D20', '#ffffff', 'backend', 2019, [SN], 84, 18, 12, 'm', 'circle'),
  s('wordpress', siWordpress, '#21759B', '#ffffff', 'backend', 2019, [], 63, 28, 4, 's', 'circle'),
  s('react', siReact, '#20232a', '#61DAFB', 'frontend', 2023, [CSM, PD, FA], 12, 33, 10, 'm', 'circle'),
  s('typescript', siTypescript, '#3178C6', '#ffffff', 'frontend', 2023, [CSM, PD, FA], 29, 31, -5, 'm', 'hex'),
  s('python', siPython, '#ffffff', '#3776AB', 'backend', 2022, [PD], 83, 37, -9, 'm', 'die-cut'),
  s('bootstrap', siBootstrap, '#7952B3', '#ffffff', 'frontend', 2018, [], 36, 56, -12, 's', 'circle'),
  s('tailwind', siTailwindcss, '#06B6D4', '#ffffff', 'frontend', 2022, [CSM, FA], 18, 60, 5, 'm', 'die-cut'),
  s('mysql', siMysql, '#ffffff', '#4479A1', 'dati', 2018, [SN], 40, 72, -6, 'm', 'die-cut'),
  s('mongodb', siMongodb, '#47A248', '#ffffff', 'dati', 2021, [CSM, PD], 64, 64, -8, 'm', 'circle'),
  s('git', siGit, '#F05033', '#ffffff', 'strumenti', 2018, ALL, 83, 60, 7, 'm', 'hex'),
  s('docker', siDocker, '#ffffff', '#2496ED', 'strumenti', 2021, ALL, 70, 80, -4, 'l', 'die-cut'),
  s('node', siNodedotjs, '#5FA04E', '#ffffff', 'backend', 2020, [CSM, FA], 22, 80, 8, 'l', 'hex'),
];
