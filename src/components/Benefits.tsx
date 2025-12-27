import type { Benefit } from "@/types";

type BenefitsProps = {
  data: Benefit[];
};

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div className="grid gap-4 text-center md:grid-cols-3">
      {data.map((benefit) => (
        <div
          key={benefit.title}
          className="rounded-md border border-primary-light bg-white p-5 dark:border-tertiary-light dark:bg-tertiary"
        >
          <span className="flex justify-center">{benefit.icon}</span>
          <h3 className="mb-1 font-bold">{benefit.title}</h3>
          <p className="text-neutral-600 text-sm dark:text-amber-50">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
