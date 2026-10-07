import { Button, buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';
import { CheckIcon, ClockIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { TrainingFormModal } from './TrainingFormModal';

import { m } from '@/paraglide/messages';
import { cdnSrc, cdnSrcSet } from '@/utils/image';

/** Card image width: half of the 1120px container on `lg`, full container width below. */
const cardImageSizes =
  '(min-width: 72rem) 548px, (min-width: 64rem) calc(50vw - 28px), calc(100vw - 32px)';
const cardImageWidths = [480, 640, 960];

type TrainingCardProps = {
  level: string;
  title: string;
  description: string;
  image: { src: string; width: number; height: number; alt: string; position: string };
  skillsTitle: string;
  skills: string[];
  duration: string;
  action: ReactNode;
};

const TrainingCard = ({
  level,
  title,
  description,
  image,
  skillsTitle,
  skills,
  duration,
  action,
}: TrainingCardProps) => {
  return (
    <article className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden sm:aspect-21/9 lg:aspect-2/1 bg-primary-light">
        <img
          src={cdnSrc(image.src, 640, 80)}
          srcSet={cdnSrcSet(image.src, image.width, cardImageWidths, 80)}
          sizes={cardImageSizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={`h-full w-full object-cover ${image.position} transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]`}
        />
        <span className="absolute top-4 left-4 rounded-full bg-white px-3.5 py-1.5 font-semibold text-primary-ink text-sm shadow-[0_2px_10px_rgb(43_36_24/0.12)]">
          {level}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-2 text-balance font-bold text-2xl leading-tight md:text-3xl">{title}</h2>
        <p className="mb-5 text-pretty text-neutral-600">{description}</p>
        <h3 className="mb-2.5 font-semibold text-sm">{skillsTitle}</h3>
        <ul className="mb-6 grid gap-x-6 gap-y-2 text-neutral-700 text-sm sm:grid-cols-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-start gap-2.5">
              <span
                className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-strong"
                aria-hidden="true"
              >
                <CheckIcon className="size-3" strokeWidth={3} />
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 border-primary-line border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-neutral-600 text-sm">
            <ClockIcon className="size-4.5 shrink-0 text-primary-strong" aria-hidden="true" />
            {duration}
          </p>
          {action}
        </div>
      </div>
    </article>
  );
};

const Trainings = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <TrainingCard
        level={m.training_basic_title()}
        title={m.training_basic_subtitle()}
        description={m.training_basic_desc()}
        image={{
          src: '/basic-training-banner.webp',
          width: 1119,
          height: 649,
          alt: m.training_basic_image_alt(),
          position: 'object-center',
        }}
        skillsTitle={m.training_basic_skills_title()}
        skills={[
          m.training_basic_skills_1(),
          m.training_basic_skills_2(),
          m.training_basic_skills_3(),
          m.training_basic_skills_4(),
        ]}
        duration={`${m.training_basic_duration_label()} ${m.training_basic_duration()}`}
        action={
          <Link to="/training/basic/" className={buttonVariants({ className: 'w-full sm:w-auto' })}>
            {m.training_basic_link_label()}
          </Link>
        }
      />
      <TrainingCard
        level={m.training_advanced_title()}
        title={m.training_advanced_subtitle()}
        description={m.training_advanced_desc()}
        image={{
          src: '/advanced-training-banner.webp',
          width: 1120,
          height: 1407,
          alt: m.training_advanced_image_alt(),
          position: 'object-[center_35%]',
        }}
        skillsTitle={m.training_advanced_skills_title()}
        skills={[
          m.training_advanced_skills_1(),
          m.training_advanced_skills_2(),
          m.training_advanced_skills_3(),
          m.training_advanced_skills_4(),
        ]}
        duration={`${m.training_advanced_duration_label()} ${m.training_advanced_duration()}`}
        action={
          <TrainingFormModal
            trigger={
              <Button variant="outline" className="w-full sm:w-auto">
                {m.cta_training_button()}
              </Button>
            }
          />
        }
      />
    </div>
  );
};

export default Trainings;
