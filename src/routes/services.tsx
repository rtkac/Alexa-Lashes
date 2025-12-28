import { createFileRoute } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import Services from "@/components/Services";
import { m } from "@/paraglide/messages";
import type { Service } from "@/types";

const services: Service[] = [
  {
    name: "Classic Lash Extensions",
    description:
      "Enhance your natural beauty with our classic lash extensions, providing a timeless and elegant look.",
    duration: "60-90",
    price: "50",
  },
  {
    name: "Lash 2D Volume",
    description:
      "Enhance your natural beauty with our classic lash extensions, providing a timeless and elegant look.",
    duration: "90",
    price: "60",
  },
  {
    name: "Lash 3D Volume",
    description:
      "Enhance your natural beauty with our classic lash extensions, providing a timeless and elegant look.",
    duration: "90",
    price: "70",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: m.meta_services_title() },
      { name: "description", content: m.meta_services_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_services_title() },
      { property: "og:description", content: m.meta_services_desc() },
      { property: "og:image", content: "https://placehold.co/1500x800/656e6c/656e6c" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-2xl md:text-4xl dark:text-primary">
          {m.services_title()}
        </h1>
        <p>{m.services_desc()}</p>
      </div>
      <div className="mb-14">
        <h2 className="mb-4 border-primary-light border-b pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.services_primary_title()}
        </h2>
        <Services data={services} />
      </div>
      <div className="mb-18">
        <h2 className="mb-4 border-primary-light border-b pb-2 font-bold text-xl md:text-2xl dark:text-primary">
          {m.services_secondary_title()}
        </h2>
        <Services data={services} />
      </div>
      <Cta
        title={m.cta_services_title()}
        description={m.cta_services_desc()}
        buttonLabel={m.cta_services_button()}
      />
    </div>
  );
}
