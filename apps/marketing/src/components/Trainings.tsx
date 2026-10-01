import { Button, buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';
import { CircleCheckIcon, ClockIcon } from 'lucide-react';

import { TrainingFormModal } from './TrainingFormModal';

import { m } from '@/paraglide/messages';

const Trainings = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-7">
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="mb-1.5 font-bold text-primary-strong text-sm">
              {m.training_basic_title()}
            </p>
            <h2 className="mb-2 text-balance font-bold text-xl md:text-2xl">
              {m.training_basic_subtitle()}
            </h2>
            <p className="mb-6 text-sm">{m.training_basic_desc()}</p>
            <div className="mb-6 h-50 overflow-hidden rounded-md sm:h-90 lg:h-70">
              <img
                src="/basic-training-banner.webp"
                alt={m.training_basic_image_alt()}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-4 border-primary-light border-b pb-4">
              <h3 className="mb-4 font-bold">{m.training_basic_skills_title()}</h3>
              <ul className="grid gap-2 text-primary-strong text-sm sm:grid-cols-2">
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_basic_skills_1()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_basic_skills_2()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_basic_skills_3()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_basic_skills_4()}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-5 sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <ClockIcon size="20" className="shrink-0" />
              <p className="text-sm">
                {m.training_basic_duration_label()}&nbsp;{m.training_basic_duration()}
              </p>
            </div>
            <Link
              to="/training/basic/"
              className={buttonVariants({ className: 'w-full sm:w-auto' })}
            >
              {m.training_basic_link_label()}
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-7">
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="mb-1.5 font-bold text-primary-strong text-sm">
              {m.training_advanced_title()}
            </p>
            <h2 className="mb-2 text-balance font-bold text-xl md:text-2xl">
              {m.training_advanced_subtitle()}
            </h2>
            <p className="mb-6 text-sm">{m.training_advanced_desc()}</p>
            <div className="mb-6 h-50 overflow-hidden rounded-md sm:h-90 lg:h-70">
              <img
                src="/advanced-training-banner.webp"
                alt={m.training_advanced_image_alt()}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-4 border-primary-light border-b pb-4">
              <h3 className="mb-4 font-bold">{m.training_advanced_skills_title()}</h3>
              <ul className="grid gap-2 text-primary-strong text-sm sm:grid-cols-2">
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_advanced_skills_1()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_advanced_skills_2()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_advanced_skills_3()}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CircleCheckIcon size="15" className="shrink-0" />
                  <span>{m.training_advanced_skills_4()}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-5 sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <ClockIcon size="20" className="shrink-0" />
              <p className="text-sm">
                {m.training_advanced_duration_label()}&nbsp;{m.training_advanced_duration()}
              </p>
            </div>
            <TrainingFormModal
              trigger={
                <Button variant="secondary" className="w-full sm:w-auto">
                  {m.cta_training_button()}
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainings;
