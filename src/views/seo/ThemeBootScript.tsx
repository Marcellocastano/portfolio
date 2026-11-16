import { THEME_STORAGE_KEY } from '../../models/theme.model';

/**
 * Prima del primo paint: tema salvato (o di sistema) e, se il 3D dell'hero partirà (stesse condizioni di
 * `useWorldMode`, tranne WebGL2 che si verifica dopo), `data-world="live"`: così il poster non compare per poi
 * sparire. Se poi il 3D non parte, `useWorldMode` toglie l'attributo e il poster torna.
 */
const script = `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;var c=navigator.hardwareConcurrency;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&(!c||c>=4))document.documentElement.dataset.world='live'}catch(e){}})();`;

export function ThemeBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
