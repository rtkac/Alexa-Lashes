import type { Benefit } from "@/types";

type BenefitsProps = {
  data: Benefit[];
};

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-18">
      {data.map((benefit) => (
        <div key={benefit.title} className="bg-white rounded-md border border-primary-light p-4">
          {benefit.icon}
          <h3 className="font-bold mb-1">{benefit.title}</h3>
          <p className="text-neutral-600 text-sm">{benefit.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
