import { i18n } from '../i18n.model';
import type { Role, Tier } from './auctionData.model';

/** Nomi dei calciatori, sigle di squadra e etichette (come nel dominio di FantaClash). */

const isUpperWord = (w: string) => w.length > 1 && w === w.toUpperCase() && /\p{Lu}/u.test(w);

/**
 * Maiuscola a inizio parola, dopo spazio o trattino, e dopo l'apostrofo
 * solo se prima c'è una singola lettera (D'Ambrosio, L'Aquila).
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase())
    .replace(/(^|[\s-])(\p{L})'(\p{L})/gu, (_, sep: string, a: string, b: string) => `${sep}${a}'${b.toUpperCase()}`);
}

/** Cognome e nome separati da nomi in forma 'SURNAME Firstname' o 'Firstname Surname'. */
export function splitName(name: string): { surname: string; firstName: string } {
  const words = name.trim().split(/\s+/);
  if (isUpperWord(words[0])) {
    const surname: string[] = [];
    let i = 0;
    while (i < words.length && isUpperWord(words[i])) surname.push(words[i++]);
    return { surname: titleCase(surname.join(' ')), firstName: words.slice(i).join(' ') };
  }
  if (words.length === 1) return { surname: words[0], firstName: '' };
  return { surname: words[words.length - 1], firstName: words.slice(0, -1).join(' ') };
}

export const ROLE_NAME: Record<Role, string> = i18n.demos.fantaclash.roles;

export const ROLE_PLURAL: Record<Role, string> = i18n.demos.fantaclash.rolesPlural;

export const TIER_NAME: Record<Tier, string> = i18n.demos.fantaclash.tiers;

/** Sigla di 2 lettere per lo stemma della squadra. */
export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0] ?? '?').slice(0, 2).toUpperCase();
}
