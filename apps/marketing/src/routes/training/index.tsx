import { Button } from '@alexa-lashes/ui/shadcn';
import { createFileRoute, Link } from '@tanstack/react-router';

import Cta from '@/components/Cta';
import PreviewGallery from '@/components/PreviewGallery';
import { TrainingFormModal } from '@/components/TrainingFormModal';
import Trainings from '@/components/Trainings';
import { m } from '@/paraglide/messages';
import type { Gallery } from '@/types';
import { ogImage, pageLinks, pageUrl } from '@/utils';
import { advancedCourseSchema, basicCourseSchema } from '@/utils/training-schema';

const gallery = (): Gallery[] => [
  {
    src: '/course-1.webp',
    name: m.training_gallery_1_alt(),
  },
  {
    src: '/course-2.webp',
    name: m.training_gallery_2_alt(),
  },
  {
    src: '/course-15.webp',
    name: m.training_gallery_3_alt(),
  },
  {
    src: '/course-25.webp',
    name: m.training_gallery_4_alt(),
  },
  {
    src: '/course-5.webp',
    name: m.training_gallery_5_alt(),
  },
];

const RouteComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-4 text-balance font-bold text-4xl md:text-5xl">{m.training_title()}</h1>
        <p className="text-pretty text-lg text-neutral-600">{m.training_desc()}</p>
      </div>

      <div className="mb-18">
        <Trainings />
      </div>

      <section className="mb-18">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-8">
          <h2 className="text-balance font-bold text-3xl md:text-4xl">
            {m.training_gallery_title()}
          </h2>
          <Link to="/gallery/" className="font-medium">
            {m.training_gallery_link()}
          </Link>
        </div>
        <PreviewGallery gallery={gallery()} />
      </section>

      <Cta
        title={m.cta_training_title()}
        description={m.cta_training_desc()}
        action={<TrainingFormModal trigger={<Button>{m.cta_training_button()}</Button>} />}
      />
    </div>
  );
};

export const Route = createFileRoute('/training/')({
  head: () => ({
    meta: [
      { title: m.meta_training_title() },
      { name: 'description', content: m.meta_training_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_training_title() },
      { property: 'og:description', content: m.meta_training_desc() },
      ...ogImage('og-training-alexa-lashes.jpg', m.og_image_alt_training()),
      { property: 'og:url', content: pageUrl('/training/') },
    ],
    links: pageLinks('/training/'),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [basicCourseSchema(), advancedCourseSchema()].map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item,
          })),
        }),
      },
    ],
  }),
  component: RouteComponent,
});
