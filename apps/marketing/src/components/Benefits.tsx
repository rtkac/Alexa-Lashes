import type { Benefit } from '@/types';

type BenefitsProps = {
  data: Benefit[];
};

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div className="grid gap-4 text-center md:grid-cols-3">
      {data.map((benefit) => (
        <div key={benefit.title} className="card flex flex-col items-center px-5 py-6">
          <span
            className="mb-3 inline-flex size-9 flex-none items-center justify-center rounded-full bg-primary-light dark:bg-tertiary-light"
            aria-hidden="true"
          >
            {benefit.icon}
          </span>
          <h3 className="mb-1.5 text-balance font-bold leading-snug tracking-[-0.01em]">
            {benefit.title}
          </h3>
          <p className="text-pretty text-foreground/80 text-sm leading-[1.55]">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
