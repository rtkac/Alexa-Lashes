import { Review } from '@alexa-lashes/contracts/reviews';
import { baseLocale, type Locale } from '@alexa-lashes/types/locales';
import { createFileRoute, Link } from '@tanstack/react-router';

import { AboutUs } from '@/components/AboutUs';
import Cta from '@/components/Cta';
import HomeHero from '@/components/HomeHero';
import PreviewGallery from '@/components/PreviewGallery';
import Reviews from '@/components/Reviews';
import reviewsJson from '@/data/reviews.json';
import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';
import type { Gallery } from '@/types';
import { ogImage } from '@/utils';
import { personSchema, salonSchema, websiteSchema } from '@/utils/schema';

const reviewsByLocale = reviewsJson as Record<Locale, Review[]>;
const enabledReviews = reviewsByLocale[baseLocale].filter((review) => review.enabled);
const reviewCount = enabledReviews.length;
const averageRating = reviewCount
  ? enabledReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
  : 5;

const canonicalUrls: Record<Locale, string> = {
  sk: 'https://alexalashes.sk/',
  en: 'https://alexalashes.sk/en',
  ru: 'https://alexalashes.sk/ru',
};

const facts = () => [
  { title: m.home_fact_1_title(), description: m.home_fact_1_desc() },
  { title: m.home_fact_2_title(), description: m.home_fact_2_desc() },
  { title: m.home_fact_3_title(), description: m.home_fact_3_desc() },
];

const gallery = (): Gallery[] => [
  {
    src: '/14.webp',
    name: m.home_gallery_1_alt(),
  },
  {
    src: '/12.webp',
    name: m.home_gallery_2_alt(),
  },
  {
    src: '/7.webp',
    name: m.home_gallery_3_alt(),
  },
  {
    src: '/2.webp',
    name: m.home_gallery_4_alt(),
  },
  {
    src: '/6.webp',
    name: m.home_gallery_5_alt(),
  },
];

const RouteComponent = () => {
  const reviews = reviewsByLocale[getLocale()];

  const filteredReviews = reviews.filter((review) => review.enabled);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <HomeHero />
      <dl className="mb-20 grid gap-6 border-primary-line border-y py-8 sm:grid-cols-3 sm:gap-10 md:mb-28">
        {facts().map((fact) => (
          <div key={fact.title}>
            <dt className="mb-1.5 font-bold">{fact.title}</dt>
            <dd className="text-pretty text-neutral-600 text-sm leading-relaxed">
              {fact.description}
            </dd>
          </div>
        ))}
      </dl>
      <section className="mb-20 md:mb-28">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-8">
          <h2 className="text-balance font-bold text-3xl md:text-4xl">{m.home_gallery_title()}</h2>
          <Link to="/gallery/" className="font-medium">
            {m.home_gallery_link()}
          </Link>
        </div>
        <PreviewGallery gallery={gallery()} />
      </section>
      {filteredReviews.length > 0 && (
        <div className="mb-20 md:mb-28">
          <Reviews reviews={filteredReviews} title={m.home_reviews_title()} />
        </div>
      )}
      <div className="mb-20 md:mb-28">
        <AboutUs />
      </div>
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
      ...ogImage('og-umele-mihalnice-bratislava.jpg', m.og_image_alt_home()),
      { property: 'og:url', content: canonicalUrls[getLocale()] },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrls[getLocale()] },
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
          '@graph': [
            websiteSchema(),
            salonSchema({ value: averageRating, count: reviewCount }),
            personSchema(),
          ],
        }),
      },
    ],
  }),
  component: RouteComponent,
});
