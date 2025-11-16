import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

const Banner = () => {
  return (
    <div className="bg-[url(https://placehold.co/1500x800/656e6c/656e6c)] bg-cover bg-center rounded-md text-center text-white min-h-100 md:min-h-130 flex items-center justify-center p-6">
      <div className="h-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">{m.banner_title()}</h1>
        <p className="mb-6">{m.banner_desc()}</p>
        <div className="space-x-4">
          <Link to="/services" className="btn-primary">
            {m.banner_link_services()}
          </Link>
          <Link to="/contact" className="btn-secondary">
            {m.banner_link_contact()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
