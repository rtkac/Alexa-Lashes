import { Link } from '@tanstack/react-router';

import Socials from './Socials';

import { m } from '@/paraglide/messages';
import { address, email, telephoneNumber } from '@/types';

export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="border-primary-light border-t py-8">
        <div className="mx-auto flex max-w-6xl justify-center">
          <Socials />
        </div>
      </div>
      <div className="border-primary-light border-t py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 text-center text-neutral-600 md:grid-cols-3 md:text-left">
          <div>
            <p className="mb-3 font-bold text-foreground">{m.footer_alexa_lashes_title()}</p>
            <p className="leading-relaxed">{m.footer_alexa_lashes_desc()}</p>
          </div>
          <div>
            <p className="mb-2 font-bold text-foreground">{m.footer_contact_title()}</p>
            <ul>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-block py-1.5 hover:text-primary-strong break-all"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${telephoneNumber}`}
                  className="inline-block py-1.5 hover:text-primary-strong"
                >
                  {telephoneNumber}
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/mTVDSACYUsSW4yN17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 hover:text-primary-strong"
                >
                  {address}
                  <span className="sr-only"> {m.link_new_tab()}</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-foreground">{m.footer_opening_hours_title()}</p>
            <ul className="space-y-1.5">
              <li>{m.footer_opening_hours_weekdays()}</li>
              <li>{m.footer_opening_hours_saturday()}</li>
              <li>{m.footer_opening_hours_sunday()}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-primary-light border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-neutral-600 text-sm">
          <Link to="/privacy-policy/" className="inline-block py-1.5 hover:text-primary-strong">
            {m.footer_privacy_policy_link()}
          </Link>
          <p className="mt-1 text-sm">{m.footer_rights({ date: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};
