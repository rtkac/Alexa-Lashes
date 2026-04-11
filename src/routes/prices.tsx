import { createFileRoute } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import Services from "@/components/Services";
import { m } from "@/paraglide/messages";
import type { LashPrice } from "@/types";

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
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
    },
    priceCurrency: "EUR",
    price,
  }));

export const Route = createFileRoute("/prices")({
  head: ({ match }) => ({
    meta: [
      { title: m.meta_prices_title() },
      { name: "description", content: m.meta_prices_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_prices_title() },
      { property: "og:description", content: m.meta_prices_desc() },
      { property: "og:image", content: "https://alexalashes.sk/salon-2.jpg" },
    ],
    links: [
      { rel: "alternate", href: `https://alexalashes.sk${match.pathname}/`, hrefLang: "sk" },
      { rel: "alternate", href: `https://alexalashes.sk/en${match.pathname}/`, hrefLang: "en" },
      {
        rel: "alternate",
        href: `https://alexalashes.sk${match.pathname}/`,
        hrefLang: "x-default",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: m.meta_schema_prices_title(),
          provider: {
            "@type": "BeautySalon",
            name: "Alexa Lashes",
            url: "https://alexalashes.sk",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: m.meta_schema_prices_offers_title(),
            itemListElement: [
              {
                "@type": "OfferCatalog",
                name: m.prices_classic_lashes_title(),
                itemListElement: itemListElement(lashesClassic()),
              },
              {
                "@type": "OfferCatalog",
                name: m.prices_2d_lashes_title(),
                itemListElement: itemListElement(lashes2D()),
              },
              {
                "@type": "OfferCatalog",
                name: m.prices_34d_lashes_title(),
                itemListElement: itemListElement(lashes34D()),
              },
              {
                "@type": "OfferCatalog",
                name: m.prices_56d_lashes_title(),
                itemListElement: itemListElement(lashes56D()),
              },
              {
                "@type": "OfferCatalog",
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

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-3 font-bold text-2xl md:text-4xl dark:text-primary">
          {m.prices_title()}
        </h1>
        <p className="leading-6">{m.prices_desc()}</p>
      </div>
      <div className="mb-14">
        <h2 className="mb-4 pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.prices_classic_lashes_title()}
        </h2>
        <Services data={lashesClassic()} />
      </div>
      <div className="mb-14">
        <h2 className="mb-4 pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.prices_2d_lashes_title()}
        </h2>
        <Services data={lashes2D()} />
      </div>
      <div className="mb-14">
        <h2 className="mb-4 pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.prices_34d_lashes_title()}
        </h2>
        <Services data={lashes34D()} />
      </div>
      <div className="mb-14">
        <h2 className="mb-4 pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.prices_56d_lashes_title()}
        </h2>
        <Services data={lashes56D()} />
      </div>
      <div className="mb-18">
        <h2 className="mb-4 pb-2 font-bold text-xl md:text-2xl dark:text-primary">
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
}
