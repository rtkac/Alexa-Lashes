import { createFileRoute } from "@tanstack/react-router";
import { AwardIcon, HeartIcon, ShieldCheckIcon } from "lucide-react";

import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import Cta from "@/components/Cta";
import PreviewGallery from "@/components/PreviewGallery";
import Reviews from "@/components/Reviews";
import { m } from "@/paraglide/messages";
import type { Benefit, Review } from "@/types";

const benefits: Benefit[] = [
  {
    icon: <AwardIcon className="mb-4 text-primary" />,
    title: m.benefits_1_title(),
    description: m.benefits_1_desc(),
  },
  {
    icon: <ShieldCheckIcon className="mb-4 text-primary" />,
    title: m.benefits_2_title(),
    description: m.benefits_2_desc(),
  },
  {
    icon: <HeartIcon className="mb-4 text-primary" />,
    title: m.benefits_3_title(),
    description: m.benefits_3_desc(),
  },
];

const reviews: Review[] = [
  {
    name: m.reviews_1_name(),
    description: m.reviews_1_desc(),
  },
  {
    name: m.reviews_2_name(),
    description: m.reviews_2_desc(),
  },
  {
    name: m.reviews_3_name(),
    description: m.reviews_3_desc(),
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Banner />
      <div className="mb-8 max-w-180">
        <h2 className="mb-2.5 font-bold text-xl md:text-3xl">{m.home_welcome_title()}</h2>
        <p>{m.home_welcome_desc()}</p>
      </div>
      <Benefits data={benefits} />
      <div>
        <h2 className="mb-6 font-bold text-xl md:text-2xl">{m.home_gallery_title()}</h2>
        <PreviewGallery />
      </div>
      <div>
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl">{m.home_reviews_title()}</h2>
        <Reviews data={reviews} />
      </div>
      <Cta />
    </div>
  );
}
