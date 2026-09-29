import { profile } from '../../models/profile.model';
import { buildJsonLd, seo } from '../../models/seo.model';

const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function SeoHead() {
  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={seo.canonical} />

      <meta name="theme-color" media="(prefers-color-scheme: light)" content={seo.themeColor.light} />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content={seo.themeColor.dark} />
      <meta name="color-scheme" content="light dark" />

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:type" content="profile" />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.image.url} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(seo.image.width)} />
      <meta property="og:image:height" content={String(seo.image.height)} />
      <meta property="og:image:alt" content={seo.image.alt} />
      <meta property="profile:first_name" content={profile.firstName} />
      <meta property="profile:last_name" content={profile.lastName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image.url} />
      <meta name="twitter:image:alt" content={seo.image.alt} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
    </>
  );
}
