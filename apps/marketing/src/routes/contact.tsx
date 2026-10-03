import { CatchBoundary, createFileRoute } from '@tanstack/react-router';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import BusinessMap from '@/components/BusinessMap';
import ContactForm from '@/components/ContactForm';
import QrCode from '@/components/QrCode';
import Socials from '@/components/Socials';
import { m } from '@/paraglide/messages';
import { address, email, telephoneNumber } from '@/types';
import { pageLinks, pageUrl } from '@/utils';

const RouteComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-3 text-balance font-bold text-2xl md:text-4xl">{m.contact_title()}</h1>
        <p className="leading-6">{m.contact_desc()}</p>
      </div>
      <div className="mb-5 grid gap-5 md:mb-15 md:grid-cols-7 md:gap-15">
        <div className="card divide-y divide-primary-line self-start md:col-span-3">
          <div className="p-6">
            <h2 className="mb-4 font-bold text-lg">{m.contact_info()}</h2>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="https://maps.app.goo.gl/mTVDSACYUsSW4yN17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-medium no-underline decoration-primary underline-offset-4 hover:text-primary-strong hover:underline"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-strong">
                    <MapPinIcon aria-hidden="true" size="16" />
                  </span>
                  {address}
                  <span className="sr-only"> {m.link_new_tab()}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${telephoneNumber}`}
                  className="flex items-center gap-3 font-medium no-underline decoration-primary underline-offset-4 hover:text-primary-strong hover:underline"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-strong">
                    <PhoneIcon aria-hidden="true" size="16" />
                  </span>
                  {telephoneNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 font-medium no-underline decoration-primary underline-offset-4 hover:text-primary-strong hover:underline break-all"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-strong">
                    <MailIcon aria-hidden="true" size="16" />
                  </span>
                  {email}
                </a>
              </li>
            </ul>
          </div>
          <div className="p-6">
            <h2 className="mb-2 font-bold text-lg">{m.contact_opening_hours()}</h2>
            <dl className="divide-y divide-primary-line">
              <div className="flex justify-between gap-4 py-2.5">
                <dt>{m.contact_opening_hours_weekdays()}</dt>
                <dd className="font-bold tabular-nums">
                  {m.contact_opening_hours_weekdays_hours()}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5 text-neutral-600">
                <dt>{m.contact_opening_hours_saturday()}</dt>
                <dd>{m.contact_opening_hours_saturday_hours()}</dd>
              </div>
              <div className="flex justify-between gap-4 pt-2.5 text-neutral-600">
                <dt>{m.contact_opening_hours_sunday()}</dt>
                <dd>{m.contact_opening_hours_sunday_hours()}</dd>
              </div>
            </dl>
          </div>
          <div className="px-6 pt-6 pb-4">
            <h2 className="mb-1 font-bold text-lg">{m.contact_socials()}</h2>
            <Socials />
          </div>
        </div>
        <div className="md:col-span-4">
          <ContactForm />
        </div>
      </div>
      <div className="mb-10 grid gap-5 md:grid-cols-7 md:gap-15">
        <div className="md:col-span-3">
          <QrCode />
        </div>
        <div className="overflow-hidden rounded-xl border border-primary-line md:col-span-4">
          <CatchBoundary getResetKey={() => 'reset'} errorComponent={() => null}>
            <BusinessMap />
          </CatchBoundary>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: m.meta_contact_title() },
      { name: 'description', content: m.meta_contact_desc() },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: m.meta_contact_title() },
      { property: 'og:description', content: m.meta_contact_desc() },
      { property: 'og:image', content: 'https://alexalashes.sk/salon-2.webp' },
      { property: 'og:url', content: pageUrl('/contact/') },
    ],
    links: pageLinks('/contact/'),
  }),
  component: RouteComponent,
});
