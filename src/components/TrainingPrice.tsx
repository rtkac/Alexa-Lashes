import { Link } from "@tanstack/react-router";
import { Clock4Icon, MapPinIcon, UsersIcon } from "lucide-react";

import { m } from "@/paraglide/messages";

type TrainingPriceProps = {
  duration: string;
  price: number;
};

const TrainingPrice = ({ duration, price }: TrainingPriceProps) => {
  return (
    <div className="grid md:grid-cols-5">
      <div className="space-y-3.5 rounded-tl-md rounded-tr-md border border-primary-light bg-white p-8 md:col-span-3 md:rounded-tr-0 md:rounded-tr-none md:rounded-bl-md dark:border-tertiary-light dark:bg-tertiary">
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
              {m.training_location()}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-br-md rounded-bl-md bg-primary p-8 text-center text-white md:col-span-2 md:rounded-tr-md md:rounded-bl-none">
        <p className="mb-1 text-sm">{m.training_price()}</p>
        <p className="font-extrabold text-4xl">{price} €</p>
        <p className="mb-4 text-xs">{m.training_addon()}</p>
        <Link to="/contact" className="btn-secondary">
          {m.training_link_interest()}
        </Link>
      </div>
    </div>
  );
};

export default TrainingPrice;
