import { getLocale } from '@/paraglide/runtime';
import type { LashPrice } from '@/types';
import { formatPrice } from '@/utils';

type ServicesProps = {
  data: LashPrice[];
};

const Services = ({ data }: ServicesProps) => {
  const locale = getLocale();

  return (
    <dl className="card grid px-6 py-2 md:grid-cols-2 md:gap-x-12">
      {data.map((service) => (
        <div
          className="flex items-baseline gap-3 border-primary-light py-4 not-first:border-t md:nth-2:border-t-0"
          key={service.name}
        >
          <dt className="flex flex-1 items-baseline gap-3">
            {service.name}
            <span aria-hidden="true" className="flex-1 border-primary/50 border-b border-dotted" />
          </dt>
          <dd className="font-bold text-primary-strong text-xl tabular-nums">
            {formatPrice(service.price, locale)}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Services;
