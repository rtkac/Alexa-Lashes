import { Button, buttonVariants } from '@alexa-lashes/ui/shadcn';
import { createFileRoute, Link } from '@tanstack/react-router';

import Cta from '@/components/Cta';
import PreviewGallery from '@/components/PreviewGallery';
import { TrainingFormModal } from '@/components/TrainingFormModal';
import Trainings from '@/components/Trainings';
import { m } from '@/paraglide/messages';
import type { Gallery } from '@/types';
import { pageLinks, pageUrl } from '@/utils';
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
    src: '/course-3.webp',
    name: m.training_gallery_3_alt(),
  },
  {
    src: '/course-4.webp',
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
        <h1 className="mb-3 text-balance font-bold text-2xl md:text-4xl">{m.training_title()}</h1>
        <p className="leading-6">{m.training_desc()}</p>
      </div>

      <div className="mb-18">
        <Trainings />
      </div>

      <div className="mb-18">
        <h2 className="mb-6 text-balance text-center font-bold text-xl md:text-3xl">
          {m.training_gallery_title()}
        </h2>
        <div className="mb-6">
          <PreviewGallery gallery={gallery()} />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery/" className={buttonVariants({ variant: 'outline' })}>
            {m.training_gallery_link()}
          </Link>
        </div>
      </div>

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
      { property: 'og:image', content: 'https://alexalashes.sk/basic-training-banner.webp' },
      { property: 'og:image:width', content: '1119' },
      { property: 'og:image:height', content: '649' },
      { property: 'og:image:alt', content: m.training_basic_image_alt() },
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
