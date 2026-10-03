import { Button } from '@alexa-lashes/ui/shadcn';
import { Clock4Icon, MapPinIcon, UsersIcon } from 'lucide-react';

import { TrainingFormModal } from './TrainingFormModal';

import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';

type TrainingPriceProps = {
  duration: string;
  price: number;
};

const TrainingPrice = ({ duration, price }: TrainingPriceProps) => {
  const formattedPrice = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="grid md:grid-cols-5">
      <div className="card space-y-3.5 rounded-b-none p-8 md:col-span-3 md:rounded-tr-none md:rounded-bl-md">
        <h2 className="font-bold text-2xl">{m.training_information_title()}</h2>
        <div className="space-y-3.5">
          <div className="flex items-center space-x-2">
            <Clock4Icon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">{m.training_duration_label()}</span>&nbsp;{duration}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">{m.training_group_size_label()}</span>&nbsp;
              {m.training_group_size()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">{m.training_location_label()}</span>&nbsp;
              <a
                href="https://maps.app.goo.gl/mTVDSACYUsSW4yN17"
                target="_blank"
                rel="noopener noreferrer"
              >
                {m.training_location()}
                <span className="sr-only"> {m.link_new_tab()}</span>
              </a>
            </p>
          </div>
          <p className="text-neutral-500 text-xs italic">{m.training_agreement()}</p>
        </div>
      </div>
      <div className="rounded-br-md rounded-bl-md bg-primary px-10 py-8 text-center text-primary-ink md:col-span-2 md:rounded-tr-md md:rounded-bl-none">
        <p className="mb-1 text-sm">{m.training_price()}</p>
        <p className="font-extrabold text-4xl tabular-nums">{formattedPrice}</p>
        <p className="mb-4 text-xs">{m.training_deposit()}</p>
        <TrainingFormModal
          trigger={<Button variant="secondary">{m.training_link_interest()}</Button>}
        />
      </div>
    </div>
  );
};

export default TrainingPrice;
