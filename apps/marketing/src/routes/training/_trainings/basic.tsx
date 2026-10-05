import { Button } from '@alexa-lashes/ui/shadcn';
import { createFileRoute } from '@tanstack/react-router';

import Banner from '@/components/Banner';
import Includes from '@/components/Includes';
import { LashMaster } from '@/components/LashMaster';
import { Program } from '@/components/Program';
import { TrainingFormModal } from '@/components/TrainingFormModal';
import TrainingPrice from '@/components/TrainingPrice';
import { m } from '@/paraglide/messages';
import { pageLinks, pageUrl } from '@/utils';
import { basicCourseSchema, basicTrainingPrice } from '@/utils/training-schema';

const benefits = (): string[] => [
  m.training_basic_benefit_1_title(),
  m.training_basic_benefit_2_title(),
  m.training_basic_benefit_3_title(),
  m.training_basic_benefit_4_title(),
  m.training_basic_benefit_5_title(),
  m.training_basic_benefit_6_title(),
  m.training_basic_benefit_7_title(),
];

const includes = (): string[] => [
  m.training_basic_includes_1_title(),
  m.training_basic_includes_2_title(),
  m.training_basic_includes_3_title(),
  m.training_basic_includes_4_title(),
  m.training_basic_includes_5_title(),
];

const RouteComponent = () => {
  return (
    <>
      <Banner
        title={m.training_basic_banner_title()}
        description={m.training_basic_banner_desc()}
        image={{
          src: '/basic-training-banner.webp',
          width: 1119,
          height: 649,
          sizes: '(min-width: 72rem) 1120px, (min-width: 48rem) 100vw, 700px',
        }}
        isDark
        buttons={
          <TrainingFormModal trigger={<Button>{m.training_basic_banner_link_contact()}</Button>} />
        }
      />
      <div className="mx-auto mb-20 max-w-4xl text-center *:[p]:mx-auto *:[p]:max-w-3xl *:[p]:text-pretty">
        <h2 className="mb-6 text-balance font-bold text-primary-strong text-xl md:text-3xl">
          {m.training_basic_welcome_title()}
        </h2>
        <p className="mb-4">{m.training_basic_welcome_desc_1()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_2()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_3()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_4()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_5()}</p>
        <p className="mb-4 font-bold">{m.training_basic_welcome_desc_6()}</p>
      </div>
      <div className="mb-18">
        <h2 className="mb-10 text-balance text-center font-bold text-xl md:text-3xl">
          {m.training_basic_why_title()}
        </h2>
        <Includes data={benefits()} />
        <p className="text-center text-neutral-500 text-sm">{m.training_basic_why_desc()}</p>
      </div>
      <div className="mb-18">
        <h2 className="mb-10 text-balance text-center font-bold text-xl md:text-3xl">
          {m.training_basic_program_title()}
        </h2>
        <Program />
      </div>
      <div className="mb-18">
        <h2 className="mb-5 text-balance text-center font-bold text-xl md:text-3xl">
          {m.training_basic_includes_title()}
        </h2>
        <p className="mb-5 text-center">{m.training_basic_includes_desc()}</p>
        <Includes data={includes()} />
      </div>
      <div className="mb-18">
        <TrainingPrice duration={m.training_basic_duration()} price={basicTrainingPrice} />
      </div>
      <div className="mb-8">
        <LashMaster title={m.teacher_title()} desc_1={m.teacher_desc()} />
      </div>
    </>
  );
};

export const Route = createFileRoute('/training/_trainings/basic')({
  head: () => ({
    meta: [
      { title: m.meta_training_basic_title() },
      { name: 'description', content: m.meta_training_basic_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_training_basic_title() },
      { property: 'og:description', content: m.meta_training_basic_desc() },
      { property: 'og:image', content: 'https://alexalashes.sk/basic-training-banner.webp' },
      { property: 'og:image:width', content: '1119' },
      { property: 'og:image:height', content: '649' },
      { property: 'og:image:alt', content: m.training_basic_image_alt() },
      { property: 'og:url', content: pageUrl('/training/basic/') },
    ],
    links: pageLinks('/training/basic/'),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          ...basicCourseSchema(),
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: m.breadcrumbs_training(),
              item: pageUrl('/training/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: m.breadcrumbs_training_basic(),
              item: pageUrl('/training/basic/'),
            },
          ],
        }),
      },
    ],
  }),
  component: RouteComponent,
});
