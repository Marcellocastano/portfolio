import { THEME_STORAGE_KEY } from '../../models/theme.model';

const script = `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}})();`;

export function ThemeBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
