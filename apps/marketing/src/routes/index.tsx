import { Review } from '@alexa-lashes/contracts/reviews';
import { baseLocale, type Locale } from '@alexa-lashes/types/locales';
import { cn } from '@alexa-lashes/ui/lib/utils';
import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { ParaglideMessage } from '@inlang/paraglide-js-react';
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
import type { Benefit, Gallery } from '@/types';
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

const benefits = (): Benefit[] => [
  {
    icon: <AwardIcon className="size-5 text-primary-strong" />,
    title: m.benefits_1_title(),
    description: m.benefits_1_desc(),
  },
  {
    icon: <ShieldCheckIcon className="size-5 text-primary-strong" />,
    title: m.benefits_2_title(),
    description: m.benefits_2_desc(),
  },
  {
    icon: <HeartIcon className="size-5 text-primary-strong" />,
    title: m.benefits_3_title(),
    description: m.benefits_3_desc(),
  },
];

const gallery = (): Gallery[] => [
  {
    src: '/1.webp',
    name: m.home_gallery_1_alt(),
  },
  {
    src: '/2.webp',
    name: m.home_gallery_2_alt(),
  },
  {
    src: '/3.webp',
    name: m.home_gallery_3_alt(),
  },
  {
    src: '/4.webp',
    name: m.home_gallery_4_alt(),
  },
  {
    src: '/5.webp',
    name: m.home_gallery_5_alt(),
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
        hideDescriptionOnMobile
        image={{
          src: '/banner-main-desktop.webp',
          width: 1120,
          height: 1086,
          mobile: {
            src: '/banner-main-mobile.webp',
            width: 1120,
            height: 1400,
            sizes: 'max(100vw, 560px)',
          },
          className: cn(
            'inset-auto top-[calc(344px-max(62svw,347px))] left-1/2 h-auto w-[max(100svw,560px)] max-w-none -translate-x-1/2',
            'md:inset-0 md:size-full md:max-w-full md:translate-x-0 md:object-[center_30%] lg:object-center',
          ),
        }}
        buttons={
          <>
            <Link to="/prices/" className={buttonVariants()}>
              {m.banner_link_services()}
            </Link>
            <Link to="/contact/" className={buttonVariants({ variant: 'secondary' })}>
              {m.banner_link_contact()}
            </Link>
          </>
        }
      />
      <div className="mx-auto mb-10 max-w-180 text-center">
        <h2 className="mb-3 text-balance font-bold text-xl md:text-3xl">
          {m.home_welcome_title()}
        </h2>
        <p className="leading-6">
          <ParaglideMessage
            message={m.home_welcome_desc}
            markup={{
              b: ({ children }) => <b>{children}</b>,
            }}
          />
        </p>
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
