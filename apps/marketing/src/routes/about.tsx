import { ParaglideMessage } from '@inlang/paraglide-js-react';
import { createFileRoute, Link } from '@tanstack/react-router';

import Banner from '@/components/Banner';
import Cta from '@/components/Cta';
import { LashMaster } from '@/components/LashMaster';
import PreviewGallery from '@/components/PreviewGallery';
import { m } from '@/paraglide/messages';
import type { Gallery } from '@/types';
import { pageLinks, pageUrl } from '@/utils';
import { personSchema, salonRef } from '@/utils/schema';

const gallery = (): Gallery[] => [
  {
    src: '/reception.webp',
    name: m.about_gallery_1_alt(),
  },
  {
    src: '/salon-4.webp',
    name: m.about_gallery_2_alt(),
  },
  {
    src: '/salon-2.webp',
    name: m.about_gallery_3_alt(),
  },
  {
    src: '/salon-3.webp',
    name: m.about_gallery_4_alt(),
  },
  {
    src: '/salon-5.webp',
    name: m.about_gallery_5_alt(),
  },
];

const RouteComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="md:mb-25">
        <Banner
          title={m.about_banner_title()}
          description={m.about_banner_desc()}
          image="bg-[url(/salon-2.webp)]"
          isDark
        />
      </div>
      <div className="mb-18 grid gap-8 sm:grid-cols-2 md:mb-25 md:gap-12">
        <div className="text-center sm:text-left">
          <div className="space-y-5">
            <h2 className="text-balance font-bold text-xl md:text-3xl">{m.about_title()}</h2>
            <p className="leading-6">{m.about_desc_1()}</p>
            <p className="leading-6">
              <ParaglideMessage
                message={m.about_desc_2}
                inputs={{}}
                markup={{
                  link: ({ children }) => <Link to="/training/">{children}</Link>,
                }}
              />
            </p>
            <p className="rounded-xl bg-primary-light p-5 font-bold text-primary-strong italic">
              {m.about_desc_label()}
            </p>
          </div>
        </div>
        <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-xl sm:max-h-full md:max-h-105">
          <img
            src="/salon-alexa.webp"
            alt={m.home_about_us_image_alt()}
            width={1000}
            height={1333}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
      <div className="mb-18 md:mb-25">
        <h2 className="mb-6 text-balance text-center font-bold text-xl md:text-3xl">
          {m.about_gallery_title()}
        </h2>
        <PreviewGallery gallery={gallery()} />
      </div>
      <div className="mb-18 md:mb-25">
        <LashMaster
          title={m.lash_master_title()}
          desc_1={
            <ParaglideMessage
              message={m.lash_master_desc_1}
              inputs={{}}
              markup={{
                link: ({ children }) => <Link to="/">{children}</Link>,
              }}
            />
          }
          desc_2={m.lash_master_desc_2()}
        />
      </div>
      <Cta />
    </div>
  );
};

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: m.meta_about_title() },
      { name: 'description', content: m.meta_about_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_about_title() },
      { property: 'og:description', content: m.meta_about_desc() },
      { property: 'og:image', content: 'https://alexalashes.sk/salon-2.webp' },
      { property: 'og:url', content: pageUrl('/about/') },
    ],
    links: pageLinks('/about/'),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: m.meta_about_title(),
          description: m.meta_about_desc(),
          url: pageUrl('/about/'),
          about: salonRef,
          mainEntity: personSchema(),
        }),
      },
    ],
  }),
  component: RouteComponent,
});
