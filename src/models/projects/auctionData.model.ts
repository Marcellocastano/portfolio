export interface Player {
  name: string;
  role: string;
  team: string;
  basePrice: number;
  value: number;
  stats: { label: string; value: string }[];
}

const gk = (name: string, team: string, basePrice: number, value: number, aff: string): Player => ({
  name,
  team,
  basePrice,
  value,
  role: 'Portiere',
  stats: [
    { label: 'AVG', value: '6.3' },
    { label: 'GOL', value: '0%' },
    { label: 'ASS', value: '0%' },
    { label: 'AFF', value: aff },
  ],
});

export const PLAYERS: Player[] = [
  gk('Mike Maignan', 'Milan', 13, 35, '90%'),
  gk('Yann Sommer', 'Inter', 10, 30, '88%'),
  gk('Wojciech Szczęsny', 'Juventus', 9, 26, '85%'),
  gk('Alex Meret', 'Napoli', 7, 22, '84%'),
];

export const YOU = 'Tu';
export const TEAMS = [YOU, 'Cambia la tua vita con un glik', 'Lacazette in Canada', 'Cosenza Sold Out'];
export const BOT_NAMES = ['Vinicius Caposse la', 'Vojvodina Red Bull', ...TEAMS.slice(1)];
export const TEAM_BUDGET = 500;
