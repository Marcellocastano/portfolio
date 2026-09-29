import { profile } from './profile.model';
import { THEME_COLOR } from './theme.model';

const FALLBACK_URL = 'http://localhost:4173';

const siteUrl = (import.meta.env.VITE_SITE_URL || FALLBACK_URL).replace(/\/+$/, '');
export const isPlaceholderUrl = siteUrl === FALLBACK_URL;

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).href;

const fullName = `${profile.firstName} ${profile.lastName}`;

export const seo = {
  lang: 'it',
  locale: 'it_IT',
  siteName: fullName,
  title: `${fullName}, ${profile.role} a ${profile.city}`,
  description: `Portfolio di ${fullName}, ${profile.role} a ${profile.city} con focus sul front-end: Vue, React e TypeScript. Progetti personali ed esperimenti web.`,
  author: fullName,
  canonical: absoluteUrl('/'),
  image: {
    url: absoluteUrl('/og-image.png'),
    width: 1200,
    height: 630,
    alt: `${fullName}, ${profile.role}`,
  },
  themeColor: THEME_COLOR,
};

export function buildJsonLd() {
  const website = `${seo.canonical}#website`;
  const person = `${seo.canonical}#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': website,
        url: seo.canonical,
        name: seo.siteName,
        inLanguage: 'it-IT',
        publisher: { '@id': person },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: 'it-IT',
        isPartOf: { '@id': website },
        mainEntity: { '@id': person },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: seo.image.url,
          width: seo.image.width,
          height: seo.image.height,
        },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: fullName,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.role,
        description: profile.intro,
        url: seo.canonical,
        address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: profile.countryCode },
        knowsAbout: profile.skills,
        knowsLanguage: profile.languages,
        ...(profile.socials.length && { sameAs: profile.socials }),
      },
    ],
  };
}
