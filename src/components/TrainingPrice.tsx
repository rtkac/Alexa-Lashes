import { Link } from "@tanstack/react-router";
import { Clock4Icon, MapPinIcon, UsersIcon } from "lucide-react";

const TrainingPrice = () => {
  return (
    <div className="grid md:grid-cols-5">
      <div className="space-y-3.5 rounded-tl-md rounded-tr-md border border-primary-light bg-white p-8 md:col-span-3 md:rounded-tr-0 md:rounded-tr-none md:rounded-bl-md">
        <h2 className="font-bold text-2xl">Informacie o kurze</h2>
        <div className="space-y-3.5">
          <div className="flex items-center space-x-2">
            <Clock4Icon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">Trvanie:</span>&nbsp;2 dni (16 hodin)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">Velkost skupiny:</span>&nbsp;1 ucastnicka
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="shrink-0 text-primary" size="18" />
            <p className="text-sm">
              <span className="font-bold">Miesto:</span>&nbsp;Salon Alexa Lashes (Pajstunska 1,
              Bratislava)
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-br-md rounded-bl-md bg-primary p-8 text-center text-white md:col-span-2 md:rounded-tr-md md:rounded-bl-none">
        <p className="mb-1 text-sm">CENA KURZU</p>
        <p className="font-extrabold text-4xl">450 €</p>
        <p className="mb-4 text-xs">Vratane startovacieho balicka vhodnote 120 €</p>
        <Link to="/contact" className="btn-secondary">
          Mam zaujem
        </Link>
      </div>
    </div>
  );
};

export default TrainingPrice;
