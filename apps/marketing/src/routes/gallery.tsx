import { createFileRoute } from '@tanstack/react-router';

import Cta from '@/components/Cta';
import Gallery from '@/components/Gallery';
import { m } from '@/paraglide/messages';
import { ogImage, pageLinks, pageUrl } from '@/utils';

const RouteComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-4 text-balance font-bold text-4xl md:text-5xl">{m.gallery_title()}</h1>
        <p className="text-pretty text-lg text-neutral-600">{m.gallery_desc()}</p>
      </div>
      <div className="mb-18 md:mb-25">
        <Gallery />
      </div>
      <Cta title={m.cta_gallery_title()} buttonLabel={m.cta_gallery_button()} />
    </div>
  );
};

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: m.meta_gallery_title() },
      { name: 'description', content: m.meta_gallery_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_gallery_title() },
      { property: 'og:description', content: m.meta_gallery_desc() },
      ...ogImage('og-predlzenie-mihalnic-alexa-lashes.jpg', m.og_image_alt_work()),
      { property: 'og:url', content: pageUrl('/gallery/') },
    ],
    links: pageLinks('/gallery/'),
  }),
  component: RouteComponent,
});
