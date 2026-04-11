import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const AboutUs = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
      <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-md sm:max-h-full md:max-h-105">
        <img
          src="/salon-alexa.webp"
          alt="Salón Alexa Lashes"
          className="w-full rounded-md"
          loading="lazy"
        />
      </div>
      <div className="text-center sm:text-left">
        <div className="mb-8 space-y-5">
          <h2 className="font-bold text-xl md:text-2xl dark:text-primary">
            {m.home_about_us_title()}
          </h2>
          <p className="text-neutral-600 leading-6">
            <ParaglideMessage
              message={m.home_about_us_desc_1}
              inputs={{}}
              markup={{
                link: ({ children }) => <Link to="/prices/">{children}</Link>,
              }}
            />
          </p>
          <p className="text-neutral-600 leading-6">{m.home_about_us_desc_2()}</p>
        </div>
        <Link to="/about/" className="btn-outline-primary">
          {m.home_about_us_link()}
        </Link>
      </div>
    </div>
  );
};
