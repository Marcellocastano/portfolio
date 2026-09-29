export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'mc-theme';
export const THEME_COLOR: Record<Theme, string> = { light: '#e6e6e6', dark: '#1c212b' };

export const themeModel = {
  fallback: 'light' as Theme,
  read(): Theme | null {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  },
  save(theme: Theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  },
  system(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  initial(): Theme {
    return themeModel.read() ?? themeModel.system();
  },
  apply(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute('content', THEME_COLOR[theme]));
  },
  opposite(theme: Theme): Theme {
    return theme === 'dark' ? 'light' : 'dark';
  },
};
