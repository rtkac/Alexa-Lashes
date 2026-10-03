import { getLocale } from '@/paraglide/runtime';
import type { LashPrice } from '@/types';
import { formatPrice } from '@/utils';

type LashPriceCardProps = {
  title: string;
  data: LashPrice[];
};

// The first item is the new set (the headline price); the rest are refills.
const LashPriceCard = ({ title, data }: LashPriceCardProps) => {
  const locale = getLocale();
  const [newSet, ...refills] = data;

  if (!newSet) return null;

  return (
    <article className="card row-span-2 grid grid-rows-subgrid gap-0 overflow-hidden">
      <div className="flex flex-col bg-primary-light px-6 pt-6 pb-5">
        <h2 className="mb-5 text-balance font-bold text-lg leading-snug">{title}</h2>
        <div className="mt-auto">
          <p className="text-sm">{newSet.name}</p>
          <p className="font-extrabold text-5xl text-primary-strong tabular-nums tracking-tight">
            {formatPrice(newSet.price, locale)}
          </p>
        </div>
      </div>
      <dl className="divide-y divide-primary-line px-6 py-2">
        {refills.map((refill) => (
          <div className="flex items-baseline justify-between gap-4 py-3" key={refill.name}>
            <dt className="text-sm">{refill.name}</dt>
            <dd className="font-bold text-lg tabular-nums">{formatPrice(refill.price, locale)}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

export default LashPriceCard;
