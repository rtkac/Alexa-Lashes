import type { Benefit } from "@/types";

type BenefitsProps = {
  data: Benefit[];
};

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div className="mb-18 grid gap-4 md:grid-cols-3">
      {data.map((benefit) => (
        <div key={benefit.title} className="rounded-md border border-primary-light bg-white p-5">
          {benefit.icon}
          <h3 className="mb-1 font-bold">{benefit.title}</h3>
          <p className="text-neutral-600 text-sm">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
