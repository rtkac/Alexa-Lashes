import type { LashPrice } from "@/types";

type ServicesProps = {
  data: LashPrice[];
};

const Services = ({ data }: ServicesProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {data.map((service) => (
        <div
          className="rounded-md border border-primary-light bg-white p-5 dark:border-tertiary-light dark:bg-tertiary"
          key={service.name}
        >
          <h3 className="mb-1 text-sm sm:text-md">{service.name}</h3>
          <div className="flex space-x-5">
            <div className="flex items-center justify-center space-x-1.5">
              <span className="font-bold text-2xl text-primary">{service.price} €</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
