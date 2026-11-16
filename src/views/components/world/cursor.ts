/** Cursore "mano" sugli oggetti cliccabili della scena (stesso SVG del resto del sito). */
export function setCursor(pointer: boolean) {
  document.body.style.cursor = pointer ? 'var(--cursor-pointer)' : '';
}
