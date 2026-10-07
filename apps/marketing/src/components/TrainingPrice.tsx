import { Button } from '@alexa-lashes/ui/shadcn';
import { Clock4Icon, MapPinIcon, UsersIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { TrainingFormModal } from './TrainingFormModal';

import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';
import { mapsUrl } from '@/types';

type TrainingPriceProps = {
  duration: string;
  price: number;
};

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

/** Labels in messages end with a colon for inline use; the stacked layout drops it. */
const stripColon = (label: string) => label.replace(/\s*:\s*$/, '');

const InfoRow = ({ icon, label, children }: InfoRowProps) => (
  <div className="flex items-start gap-4 py-4">
    <span
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-strong"
      aria-hidden="true"
    >
      {icon}
    </span>
    <div className="min-w-0">
      <dt className="text-neutral-600 text-sm">{stripColon(label)}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  </div>
);

const TrainingPrice = ({ duration, price }: TrainingPriceProps) => {
  const formattedPrice = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="grid overflow-hidden rounded-xl border border-primary-line bg-white md:grid-cols-5">
      <div className="p-6 md:col-span-3 md:p-10">
        <h2 className="mb-2 text-balance font-bold text-3xl md:text-4xl">
          {m.training_information_title()}
        </h2>
        <dl className="divide-y divide-primary-line">
          <InfoRow icon={<Clock4Icon className="size-4.5" />} label={m.training_duration_label()}>
            {duration}
          </InfoRow>
          <InfoRow icon={<UsersIcon className="size-4.5" />} label={m.training_group_size_label()}>
            {m.training_group_size()}
          </InfoRow>
          <InfoRow icon={<MapPinIcon className="size-4.5" />} label={m.training_location_label()}>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {m.training_location()}
              <span className="sr-only"> {m.link_new_tab()}</span>
            </a>
          </InfoRow>
        </dl>
        <p className="mt-4 text-neutral-600 text-sm">{m.training_agreement()}</p>
      </div>
      <div className="flex flex-col items-center justify-center border-primary-line border-t bg-primary-light px-6 py-10 text-center md:col-span-2 md:border-t-0 md:border-l md:px-10">
        <p className="font-semibold text-primary-strong text-xs uppercase tracking-[0.14em]">
          {m.training_price()}
        </p>
        <p className="mt-3 mb-5 font-extrabold text-6xl text-primary-strong tabular-nums leading-none tracking-tight md:text-7xl">
          {formattedPrice}
        </p>
        <span className="mb-5 h-px w-12 bg-primary" aria-hidden="true" />
        <p className="mb-7 max-w-[32ch] text-pretty text-neutral-600 text-sm leading-relaxed">
          {m.training_deposit()}
        </p>
        <TrainingFormModal
          trigger={
            <Button size="lg" className="w-full sm:w-auto">
              {m.training_link_interest()}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default TrainingPrice;
