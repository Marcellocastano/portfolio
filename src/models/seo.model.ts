import { i18n } from './i18n.model';
import { profile } from './profile.model';
import { THEME_COLOR } from './theme.model';

/** Dominio di produzione: VITE_SITE_URL lo sovrascrive (es. per un ambiente di staging). */
const PRODUCTION_URL = 'https://www.marcellocastano.it';

const siteUrl = (import.meta.env.VITE_SITE_URL || PRODUCTION_URL).replace(/\/+$/, '');
export const isPlaceholderUrl = !/^https:\/\//.test(siteUrl);

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).href;

const fullName = `${profile.firstName} ${profile.lastName}`;

export const seo = {
  lang: 'it',
  locale: 'it_IT',
  siteName: fullName,
  /* ~60 caratteri: nome per le ricerche dirette, ruolo, città e tecnologie principali. */
  title: i18n.seo.title(fullName, profile.role, profile.city),
  /* ~155 caratteri: chi sono, da quando, cosa uso, cosa si trova nel sito. */
  description: i18n.seo.description(fullName, profile.city),
  author: fullName,
  canonical: absoluteUrl('/'),
  photo: absoluteUrl('/images/io-cartoon.png'),
  image: {
    url: absoluteUrl('/og-image.png'),
    width: 1200,
    height: 630,
    alt: i18n.seo.imageAlt(fullName, profile.role, profile.city),
  },
  verification: {
    google: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION,
    bing: import.meta.env.VITE_BING_SITE_VERIFICATION,
  },
  themeColor: THEME_COLOR,
};
