import { createFileRoute } from "@tanstack/react-router";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import BusinessMap from "@/components/BusinessMap";
import ContactForm from "@/components/ContactForm";
import QrCode from "@/components/QrCode";
import Socials from "@/components/Socials";
import { m } from "@/paraglide/messages";
import { address, email, telephoneNumber } from "@/types";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: m.meta_contact_title() },
      { name: "description", content: m.meta_contact_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_contact_title() },
      { property: "og:description", content: m.meta_contact_desc() },
      { property: "og:image", content: "https://placehold.co/1500x800/656e6c/656e6c" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-2xl md:text-4xl dark:text-primary">
          {m.contact_title()}
        </h1>
        <p className="mb-10">{m.contact_desc()}</p>
      </div>
      <div className="mb-5 grid gap-5 md:mb-18 md:grid-cols-7 md:gap-15">
        <div className="md:col-span-4">
          <ContactForm />
        </div>
        <div className="space-y-5 md:col-span-3">
          <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary">
            <h2 className="mb-3 font-bold text-lg">{m.contact_info()}</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon size="20" className="text-primary" />
                <a
                  href="https://maps.app.goo.gl/mTVDSACYUsSW4yN17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon size="20" className="text-primary" />
                <a href={`tel:${telephoneNumber}`}>{telephoneNumber}</a>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon size="20" className="text-primary" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary">
            <h2 className="mb-3 font-bold text-lg">{m.contact_opening_hours()}</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{m.contact_opening_hours_weekdays()}</span>
                <p>{m.contact_opening_hours_weekdays_hours()}</p>
              </div>
              <div className="flex justify-between">
                <span>{m.contact_opening_hours_saturday()}</span>
                <p>{m.contact_opening_hours_saturday_hours()}</p>
              </div>
              <div className="flex justify-between">
                <span>{m.contact_opening_hours_sunday()}</span>
                <p>{m.contact_opening_hours_sunday_hours()}</p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary">
            <h2 className="mb-3 font-bold text-lg">{m.contact_socials()}</h2>
            <Socials />
          </div>
        </div>
      </div>
      <div className="mb-10 grid gap-5 md:grid-cols-7 md:gap-15">
        <div className="overflow-hidden rounded-md md:col-span-4">
          <BusinessMap />
        </div>
        <div className="md:col-span-3">
          <QrCode />
        </div>
      </div>
    </div>
  );
}
