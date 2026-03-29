import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const AboutUs = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
      <div>
        <img
          src="https://placehold.co/540x350/c4ad72/c4ad72"
          alt="Alexa Lashes salon"
          className="w-full rounded-md"
        />
      </div>
      <div className="text-center sm:text-left">
        <div className="mb-8 space-y-5">
          <h2 className="font-bold text-xl md:text-2xl dark:text-primary">
            {m.home_about_us_title()}
          </h2>
          <p className="text-neutral-600 leading-6">{m.home_about_us_desc_1()}</p>
          <p className="text-neutral-600 leading-6">{m.home_about_us_desc_2()}</p>
        </div>
        <Link to="/about" className="btn-outline-primary">
          {m.home_about_us_link()}
        </Link>
      </div>
    </div>
  );
};
