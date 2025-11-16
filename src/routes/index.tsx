import { createFileRoute } from "@tanstack/react-router";
import { AwardIcon, HeartIcon, ShieldCheckIcon } from "lucide-react";

import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import Cta from "@/components/Cta";
import { m } from "@/paraglide/messages";

const benefits = [
  {
    icon: <AwardIcon className="text-primary mb-4" />,
    title: m.benefits_1_title(),
    desc: m.benefits_1_desc(),
  },
  {
    icon: <ShieldCheckIcon className="text-primary mb-4" />,
    title: m.benefits_2_title(),
    desc: m.benefits_2_desc(),
  },
  {
    icon: <HeartIcon className="text-primary mb-4" />,
    title: m.benefits_3_title(),
    desc: m.benefits_3_desc(),
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: m.meta_index_title(),
      },
      {
        name: "description",
        content: m.meta_index_desc(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Banner />
      <div className="max-w-180 mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2.5">{m.home_welcome_title()}</h2>
        <p>{m.home_welcome_desc()}</p>
      </div>
      <Benefits data={benefits} />
      <Cta />
    </div>
  );
}
