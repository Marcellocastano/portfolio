import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from './App';
import { SeoHead } from './views/seo/SeoHead';
import { ThemeBootScript } from './views/seo/ThemeBootScript';

export { isPlaceholderUrl, absoluteUrl } from './models/seo.model';

export const renderApp = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

export const renderHead = () =>
  renderToStaticMarkup(
    <>
      <ThemeBootScript />
      <SeoHead />
    </>,
  );
