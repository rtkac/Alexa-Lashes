import { Clock4Icon, WalletIcon } from "lucide-react";

import type { Service } from "@/types";

type ServicesProps = {
  data: Service[];
};

const Services = ({ data }: ServicesProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map((service) => (
        <div className="rounded-md border border-primary-light bg-white p-5" key={service.name}>
          <h3 className="mb-1 font-bold text-lg">{service.name}</h3>
          <p className="mb-3 text-neutral-600 text-sm">{service.description}</p>
          <div className="flex space-x-5">
            <div className="flex items-center justify-center space-x-1.5">
              <Clock4Icon size="15" className="text-primary" />
              <span className="text-sm">{service.duration} min</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <WalletIcon size="15" className="text-primary" />
              <span className="text-sm">{service.price} €</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
