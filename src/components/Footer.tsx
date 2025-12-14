import Socials from "./Socials";

import { m } from "@/paraglide/messages";
import { address, email, telephoneNumber } from "@/types";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="border-primary-light border-t py-10">
        <div className="mx-auto flex max-w-6xl justify-center space-y-10">
          <Socials />
        </div>
      </div>
      <div className="border-primary-light border-t py-10">
        <div className="mx-auto max-w-6xl space-y-10 px-4 text-neutral-700 text-sm md:text-base">
          <div className="grid space-y-10 text-center md:grid-cols-3 md:space-x-10 md:space-y-0 md:text-left">
            <div>
              <p className="mb-2 font-bold">{m.footer_alexa_lashes_title()}</p>
              <p className="text-neutral-500 text-sm">{m.footer_alexa_lashes_desc()}</p>
            </div>
            <div>
              <p className="mb-2 font-bold">{m.footer_contact_title()}</p>
              <p className="mb-1 text-neutral-500 text-sm">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="mb-1 text-neutral-500 text-sm">
                <a href={`tel:${telephoneNumber}`}>{telephoneNumber}</a>
              </p>
              <p className="mb-1 text-neutral-500 text-sm">
                <a
                  href="https://maps.app.goo.gl/mTVDSACYUsSW4yN17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold">{m.footer_opening_hours_title()}</p>
              <p className="mb-1 text-neutral-500 text-sm">{m.footer_opening_hours_weekdays()}</p>
              <p className="mb-1 text-neutral-500 text-sm">{m.footer_opening_hours_saturday()}</p>
              <p className="mb-1 text-neutral-500 text-sm">{m.footer_opening_hours_sunday()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-primary-light border-t py-10">
        <div className="mx-auto max-w-6xl space-y-10 px-4 text-center text-neutral-700 text-sm md:text-base">
          <p className="text-neutral-400 text-sm">
            {m.footer_rights({ date: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
