import { pageUrl } from './index';
import { m } from '@/paraglide/messages';
import {
  email,
  geoCoordinates,
  instagramUrl,
  mapsUrl,
  telephoneNumber,
  tiktokUrl,
  youtubeUrl,
} from '@/types';

/**
 * Shared schema.org entities. Each one has a stable `@id`, so JSON-LD on any page can reference the
 * same salon, website and lash master instead of repeating unlinked copies.
 */

const siteUrl = 'https://alexalashes.sk';

export const salonId = `${siteUrl}/#salon`;
export const websiteId = `${siteUrl}/#website`;
export const personId = `${siteUrl}/#oleksandra`;

/** Languages spoken in the salon and used in training. */
const languages = ['sk', 'ru', 'uk'];

/** Minimal salon reference for `provider`/`publisher`/`worksFor`. */
export const salonRef = {
  '@type': 'BeautySalon',
  '@id': salonId,
  name: 'Alexa Lashes',
  url: siteUrl,
};

/** Minimal lash master reference for `founder`/`instructor`. */
export const personRef = {
  '@type': 'Person',
  '@id': personId,
  name: 'Oleksandra Afanasieva',
};

export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Pajštúnska 1',
  addressLocality: 'Bratislava',
  addressRegion: 'Bratislava',
  postalCode: '85101',
  addressCountry: 'SK',
};

const bratislava = {
  '@type': 'City',
  name: 'Bratislava',
  sameAs: 'https://www.wikidata.org/wiki/Q1780',
};

export const areaServed = bratislava;

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': websiteId,
  url: siteUrl,
  name: 'Alexa Lashes',
  inLanguage: ['sk', 'en', 'ru'],
  publisher: { '@id': salonId },
});

export const personSchema = () => ({
  ...personRef,
  jobTitle: 'Lash Stylist',
  description: m.lash_master_desc_2(),
  image: `${siteUrl}/alexa-lashes-stylist.webp`,
  url: pageUrl('/about/'),
  worksFor: { '@id': salonId },
  knowsAbout: [m.meta_schema_prices_title(), m.meta_schema_training_basic_title()],
  knowsLanguage: languages,
  sameAs: [instagramUrl],
});

type Rating = {
  value: number;
  count: number;
};

export const salonSchema = (rating: Rating) => ({
  ...salonRef,
  description: m.meta_index_desc(),
  telephone: telephoneNumber,
  email,
  image: [
    `${siteUrl}/banner-main-desktop.webp`,
    `${siteUrl}/salon-alexa.webp`,
    `${siteUrl}/reception.webp`,
    `${siteUrl}/salon-2.webp`,
    `${siteUrl}/salon-3.webp`,
    `${siteUrl}/salon-4.webp`,
    `${siteUrl}/salon-5.webp`,
  ],
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
  },
  founder: { '@id': personId },
  address: postalAddress,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: geoCoordinates.lat,
    longitude: geoCoordinates.lng,
  },
  hasMap: mapsUrl,
  areaServed,
  knowsLanguage: languages,
  currenciesAccepted: 'EUR',
  priceRange: '€€',
  hasOfferCatalog: { '@id': `${siteUrl}/prices/#offers` },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: telephoneNumber,
    url: pageUrl('/contact/'),
    availableLanguage: languages,
  },
  ...(rating.count > 0 && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(rating.value.toFixed(1)),
      bestRating: 5,
      worstRating: 1,
      reviewCount: rating.count,
    },
  }),
  sameAs: [instagramUrl, tiktokUrl, youtubeUrl],
});
