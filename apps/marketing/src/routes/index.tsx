import { Review } from '@alexa-lashes/contracts/reviews';
import { baseLocale, type Locale } from '@alexa-lashes/types/locales';
import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { createFileRoute, Link } from '@tanstack/react-router';
import { AwardIcon, HeartIcon, ShieldCheckIcon } from 'lucide-react';

import { AboutUs } from '@/components/AboutUs';
import Banner from '@/components/Banner';
import Benefits from '@/components/Benefits';
import Cta from '@/components/Cta';
import PreviewGallery from '@/components/PreviewGallery';
import Reviews from '@/components/Reviews';
import reviewsJson from '@/data/reviews.json';
import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';
import {
  type Benefit,
  email,
  type Gallery,
  geoCoordinates,
  instagramUrl,
  telephoneNumber,
  tiktokUrl,
} from '@/types';

const reviewsByLocale = reviewsJson as Record<Locale, Review[]>;
const canonicalReviews = reviewsByLocale[baseLocale];
const averageRating = canonicalReviews.length
  ? canonicalReviews.reduce((sum, review) => sum + review.rating, 0) / canonicalReviews.length
  : 5;

const canonicalUrls: Record<Locale, string> = {
  sk: 'https://alexalashes.sk/',
  en: 'https://alexalashes.sk/en',
  ru: 'https://alexalashes.sk/ru',
};

const benefits = (): Benefit[] => [
  {
    icon: <AwardIcon className="mb-4 text-primary" />,
    title: m.benefits_1_title(),
    description: m.benefits_1_desc(),
  },
  {
    icon: <ShieldCheckIcon className="mb-4 text-primary" />,
    title: m.benefits_2_title(),
    description: m.benefits_2_desc(),
  },
  {
    icon: <HeartIcon className="mb-4 text-primary" />,
    title: m.benefits_3_title(),
    description: m.benefits_3_desc(),
  },
];

const gallery = (): Gallery[] => [
  {
    thumbSrc: '/1-thumb.jpg',
    src: '/1.webp',
    name: '2D mihalnice',
  },
  {
    thumbSrc: '/2-thumb.jpg',
    src: '/2.webp',
    name: '1D mihalnice',
  },
  {
    thumbSrc: '/3-thumb.jpg',
    src: '/3.webp',
    name: '3-4D mihalnice',
  },
  {
    thumbSrc: '/4-thumb.jpg',
    src: '/4.webp',
    name: '2D mihalnice mokrý efekt',
  },
  {
    thumbSrc: '/5-thumb.jpg',
    src: '/5.webp',
    name: '2D hnedé mihalnice mokrý efekt',
  },
];

const RouteComponent = () => {
  const reviews = reviewsByLocale[getLocale()];

  const filteredReviews = reviews.filter((review) => review.enabled);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Banner
        title={m.banner_title()}
        description={m.banner_desc()}
        image="bg-[url(/banner-main-mobile.webp)] md:bg-[url(/banner-main-desktop.webp)]"
        buttons={
          <>
            <Link to="/prices/" className={buttonVariants({ className: 'mx-2' })}>
              {m.banner_link_services()}
            </Link>
            <Link
              to="/contact/"
              className={buttonVariants({ variant: 'secondary', className: 'mx-2' })}
            >
              {m.banner_link_contact()}
            </Link>
          </>
        }
      />
      <div className="mx-auto mb-10 max-w-180 text-center">
        <h2 className="mb-3 text-balance font-bold text-xl md:text-3xl">
          {m.home_welcome_title()}
        </h2>
        <p className="leading-6">{m.home_welcome_desc()}</p>
      </div>
      <div className="mb-18 md:mb-25">
        <Benefits data={benefits()} />
      </div>
      <div className="mb-18 md:mb-25">
        <AboutUs />
      </div>
      <div className="mb-18 md:mb-25">
        <div className="mb-6">
          <h2 className="mb-6 text-balance text-center font-bold text-xl md:text-3xl">
            {m.home_gallery_title()}
          </h2>
          <PreviewGallery gallery={gallery()} />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery/" className={buttonVariants()}>
            {m.home_gallery_link()}
          </Link>
        </div>
      </div>
      {filteredReviews.length > 0 && (
        <div className="mb-18 md:mb-25">
          <h2 className="mb-6 text-balance text-center font-bold text-xl md:text-3xl">
            {m.home_reviews_title()}
          </h2>
          <Reviews reviews={filteredReviews} />
        </div>
      )}
      <Cta />
    </div>
  );
};

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: m.meta_index_title() },
      { name: 'description', content: m.meta_index_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_index_title() },
      { property: 'og:description', content: m.meta_index_desc() },
      { property: 'og:image', content: 'https://alexalashes.sk/banner-main-desktop.webp' },
      { property: 'og:url', content: canonicalUrls[getLocale()] },
      { name: 'twitter:image', content: 'https://alexalashes.sk/banner-main-desktop.webp' },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrls[getLocale()] },
      {
        rel: 'preload',
        as: 'image',
        href: '/banner-main-mobile.webp',
        media: '(max-width: 47.99rem)',
        fetchPriority: 'high',
      },
      {
        rel: 'preload',
        as: 'image',
        href: '/banner-main-desktop.webp',
        media: '(min-width: 48rem)',
        fetchPriority: 'high',
      },
      { rel: 'alternate', href: 'https://alexalashes.sk/', hrefLang: 'sk' },
      { rel: 'alternate', href: 'https://alexalashes.sk/en', hrefLang: 'en' },
      { rel: 'alternate', href: 'https://alexalashes.sk/ru', hrefLang: 'ru' },
      { rel: 'alternate', href: 'https://alexalashes.sk/', hrefLang: 'x-default' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BeautySalon',
          '@id': 'https://alexalashes.sk/#salon',
          name: 'Alexa Lashes',
          description: m.meta_index_desc(),
          telephone: telephoneNumber,
          email,
          url: 'https://alexalashes.sk',
          image: 'https://alexalashes.sk/banner-main-desktop.webp',
          logo: 'https://alexalashes.sk/logo.png',
          owner: {
            '@type': 'Person',
            jobTitle: 'Lash Stylist',
            name: 'Oleksandra Afanasieva',
            image: 'https://alexalashes.sk/alexa-lashes-stylist.webp',
            sameAs: instagramUrl,
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Pajštúnska 1',
            addressLocality: 'Bratislava',
            postalCode: '85101',
            addressCountry: 'SK',
          },
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
          hasMap: `https://www.google.com/maps/search/?api=1&query=${geoCoordinates.lat},${geoCoordinates.lng}`,
          areaServed: { '@type': 'City', name: 'Bratislava' },
          priceRange: '€€',
          aggregateRating: {
            '@type': 'AggregateRating',
            bestRating: '5',
            reviewCount: 52,
            ratingValue: averageRating.toFixed(1),
          },
          sameAs: [instagramUrl, tiktokUrl],
        }),
      },
    ],
  }),
  component: RouteComponent,
});
