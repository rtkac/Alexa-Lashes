import { getLocale } from '@/paraglide/runtime';
import type { LashPrice } from '@/types';

type ServicesProps = {
  data: LashPrice[];
};

const Services = ({ data }: ServicesProps) => {
  const formatPrice = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format;

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {data.map((service) => (
        <li className="card p-5" key={service.name}>
          <p className="mb-1 text-sm sm:text-base">{service.name}</p>
          <p className="font-bold text-2xl text-primary-strong tabular-nums">
            {formatPrice(service.price)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Services;
