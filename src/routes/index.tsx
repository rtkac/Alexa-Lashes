import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: m.meta_index_title() },
      { name: "description", content: m.meta_index_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_index_title() },
      { property: "og:description", content: m.meta_index_desc() },
      { property: "og:image", content: "https://placehold.co/1500x800/656e6c/656e6c" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Banner
        title={m.banner_title()}
        description={m.banner_desc()}
        primaryAction={{ link: "/services", label: m.banner_link_services() }}
        secondaryAction={{ link: "/contact", label: m.banner_link_contact() }}
      />
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h2 className="mb-2.5 font-bold text-xl md:text-3xl dark:text-primary">
          {m.home_welcome_title()}
        </h2>
        <p>{m.home_welcome_desc()}</p>
      </div>
      <div className="mb-18">
        <Benefits data={benefits} />
      </div>
      <div className="mb-18">
        <div className="mb-6">
          <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
            {m.home_gallery_title()}
          </h2>
          <PreviewGallery />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery" className="btn-primary">
            {m.home_gallery_link()}
          </Link>
        </div>
      </div>
      <div className="mb-18">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
          {m.home_reviews_title()}
        </h2>
        <Reviews data={reviews} />
      </div>
      <Cta />
    </div>
  );
}
