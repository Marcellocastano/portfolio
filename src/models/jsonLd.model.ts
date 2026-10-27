import { i18n } from './i18n.model';
import { profile } from './profile.model';
import { projects } from './projects/projects.model';
import { seo } from './seo.model';
import { COMMITS } from './stack/career.model';
import { SKILLS } from './stack/skillsData.model';

const id = (fragment: string) => `${seo.canonical}#${fragment}`;
const current = COMMITS.find((c) => c.head);
const fullName = `${profile.firstName} ${profile.lastName}`;

function projectList() {
  return {
    '@type': 'ItemList',
    '@id': id('projects'),
    name: i18n.seo.jsonLd.projectsName(fullName),
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        description: `${p.tagline} ${p.description}`,
        genre: i18n.seo.jsonLd.projectGenre,
        author: { '@id': id('person') },
        url: p.links.app ?? id(`progetto-${p.id}`),
      },
    })),
  };
}

/** Dati strutturati schema.org: sito, pagina profilo, persona e progetti, collegati tra loro tramite @id. */
export function buildJsonLd() {
  const skills = [...new Set([...SKILLS.map((s) => s.name), ...profile.skills])];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url: seo.canonical,
        name: seo.siteName,
        inLanguage: 'it-IT',
        publisher: { '@id': id('person') },
      },
      {
        '@type': 'ProfilePage',
        '@id': id('webpage'),
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: 'it-IT',
        isPartOf: { '@id': id('website') },
        about: { '@id': id('person') },
        mainEntity: { '@id': id('person') },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: seo.image.url,
          width: seo.image.width,
          height: seo.image.height,
        },
        hasPart: { '@id': id('projects') },
      },
      {
        '@type': 'Person',
        '@id': id('person'),
        name: fullName,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.role,
        description: profile.summary,
        url: seo.canonical,
        image: seo.photo,
        address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: profile.countryCode },
        ...(current?.company && { worksFor: { '@type': 'Organization', name: current.company } }),
        hasOccupation: {
          '@type': 'Occupation',
          name: profile.role,
          occupationLocation: { '@type': 'City', name: profile.city },
          skills: skills.join(', '),
        },
        knowsAbout: skills,
        knowsLanguage: profile.languages,
        sameAs: profile.socials,
      },
      projectList(),
    ],
  };
}
