import { createFileRoute } from '@tanstack/react-router';

import Cta from '@/components/Cta';
import LashPriceCard from '@/components/LashPriceCard';
import Services from '@/components/Services';
import { m } from '@/paraglide/messages';
import type { LashPrice } from '@/types';
import { pageLinks, pageUrl } from '@/utils';
import { areaServed, salonRef } from '@/utils/schema';

const lashesClassic = (): LashPrice[] => [
  {
    name: m.prices_lashes_item_1(),
    price: 60,
  },
  {
    name: m.prices_lashes_item_2(),
    price: 40,
  },
  {
    name: m.prices_lashes_item_3(),
    price: 45,
  },
  {
    name: m.prices_lashes_item_4(),
    price: 50,
  },
];

const lashes2D = (): LashPrice[] => [
  {
    name: m.prices_lashes_item_1(),
    price: 70,
  },
  {
    name: m.prices_lashes_item_2(),
    price: 45,
  },
  {
    name: m.prices_lashes_item_3(),
    price: 50,
  },
  {
    name: m.prices_lashes_item_4(),
    price: 55,
  },
];

const lashes34D = (): LashPrice[] => [
  {
    name: m.prices_lashes_item_1(),
    price: 80,
  },
  {
    name: m.prices_lashes_item_2(),
    price: 50,
  },
  {
    name: m.prices_lashes_item_3(),
    price: 55,
  },
  {
    name: m.prices_lashes_item_4(),
    price: 60,
  },
];

const lashes56D = (): LashPrice[] => [
  {
    name: m.prices_lashes_item_1(),
    price: 90,
  },
  {
    name: m.prices_lashes_item_2(),
    price: 55,
  },
  {
    name: m.prices_lashes_item_3(),
    price: 60,
  },
  {
    name: m.prices_lashes_item_4(),
    price: 65,
  },
];

const lashesAdditional = (): LashPrice[] => [
  {
    name: m.prices_additional_lashes_item_1(),
    price: 5,
  },
  {
    name: m.prices_additional_lashes_item_2(),
    price: 5,
  },
  {
    name: m.prices_additional_lashes_item_3(),
    price: 15,
  },
  {
    name: m.prices_additional_lashes_item_4(),
    price: 5,
  },
];

const itemListElement = (prices: LashPrice[]) =>
  prices.map(({ name, price }) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name,
    },
    priceCurrency: 'EUR',
    price,
  }));

const RouteComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-12 max-w-180 text-center">
        <h1 className="mb-3 text-balance font-bold text-2xl md:text-4xl">{m.prices_title()}</h1>
        <p className="leading-6">{m.prices_desc()}</p>
      </div>
      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <LashPriceCard title={m.prices_classic_lashes_title()} data={lashesClassic()} />
        <LashPriceCard title={m.prices_2d_lashes_title()} data={lashes2D()} />
        <LashPriceCard title={m.prices_34d_lashes_title()} data={lashes34D()} />
        <LashPriceCard title={m.prices_56d_lashes_title()} data={lashes56D()} />
      </div>
      <div className="mb-18">
        <h2 className="mb-5 text-balance font-bold text-xl md:text-2xl">
          {m.prices_additional_lashes_title()}
        </h2>
        <Services data={lashesAdditional()} />
      </div>
      <Cta
        title={m.cta_prices_title()}
        description={m.cta_prices_desc()}
        buttonLabel={m.cta_prices_button()}
      />
    </div>
  );
};

export const Route = createFileRoute('/prices')({
  head: () => ({
    meta: [
      { title: m.meta_prices_title() },
      { name: 'description', content: m.meta_prices_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_prices_title() },
      { property: 'og:description', content: m.meta_prices_desc() },
      { property: 'og:image', content: 'https://alexalashes.sk/salon-2.webp' },
      { property: 'og:url', content: pageUrl('/prices/') },
    ],
    links: pageLinks('/prices/'),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: m.meta_schema_prices_title(),
          url: pageUrl('/prices/'),
          areaServed,
          provider: salonRef,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            '@id': 'https://alexalashes.sk/prices/#offers',
            name: m.meta_schema_prices_offers_title(),
            itemListElement: [
              {
                '@type': 'OfferCatalog',
                name: m.prices_classic_lashes_title(),
                itemListElement: itemListElement(lashesClassic()),
              },
              {
                '@type': 'OfferCatalog',
                name: m.prices_2d_lashes_title(),
                itemListElement: itemListElement(lashes2D()),
              },
              {
                '@type': 'OfferCatalog',
                name: m.prices_34d_lashes_title(),
                itemListElement: itemListElement(lashes34D()),
              },
              {
                '@type': 'OfferCatalog',
                name: m.prices_56d_lashes_title(),
                itemListElement: itemListElement(lashes56D()),
              },
              {
                '@type': 'OfferCatalog',
                name: m.prices_additional_lashes_title(),
                itemListElement: itemListElement(lashesAdditional()),
              },
            ],
          },
        }),
      },
    ],
  }),
  component: RouteComponent,
});
