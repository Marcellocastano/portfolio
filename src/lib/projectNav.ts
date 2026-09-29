const EVENT = 'project:goto';

/** Chiede alla sezione Progetti di portare in vista un progetto (da qualunque punto della pagina). */
export function requestProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: id }));
}

export function onProjectRequest(handler: (id: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
