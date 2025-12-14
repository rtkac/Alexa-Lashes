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
      {
        title: m.meta_contact_title(),
      },
      {
        name: "description",
        content: m.meta_contact_desc(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-2xl md:text-4xl">{m.contact_title()}</h1>
        <p className="mb-10">{m.contact_desc()}</p>
      </div>
      <div className="mb-18 grid gap-15 md:grid-cols-7">
        <div className="md:col-span-4">
          <ContactForm />
        </div>
        <div className="space-y-10 md:col-span-3">
          <div className="space-y-10">
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
          <div>
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
          <div>
            <h2 className="mb-3 font-bold text-lg">{m.contact_socials()}</h2>
            <Socials />
          </div>
        </div>
      </div>
      <div className="mb-10 grid gap-15 md:grid-cols-7">
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
