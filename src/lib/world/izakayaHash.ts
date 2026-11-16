/** Fase deterministica (0-1) da un nome: niente Math.random, la scena è sempre uguale. */
export const hashOf = (name: string) => ([...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 997, 7) % 97) / 97;
