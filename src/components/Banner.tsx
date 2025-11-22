import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

const Banner = () => {
  return (
    <div className="mb-13 flex min-h-100 items-center justify-center rounded-md bg-[url(https://placehold.co/1500x800/656e6c/656e6c)] bg-center bg-cover p-6 text-center text-white md:min-h-130">
      <div className="h-full">
        <h1 className="mb-3 font-bold text-2xl md:text-4xl">{m.banner_title()}</h1>
        <p className="mb-6">{m.banner_desc()}</p>
        <div className="space-y-4">
          <Link to="/services" className="btn-primary mx-2">
            {m.banner_link_services()}
          </Link>
          <Link to="/contact" className="btn-secondary mx-2">
            {m.banner_link_contact()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
