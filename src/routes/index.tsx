import { createFileRoute, Link } from "@tanstack/react-router";
import { AwardIcon, HeartIcon, ShieldCheckIcon } from "lucide-react";

import { AboutUs } from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import Cta from "@/components/Cta";
import PreviewGallery from "@/components/PreviewGallery";
import Reviews from "@/components/Reviews";
import { m } from "@/paraglide/messages";
import {
  type Benefit,
  type Gallery,
  instagramUrl,
  type Review,
  telephoneNumber,
  tiktokUrl,
} from "@/types";

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

const gallery: Gallery[] = [
  {
    thumbSrc: "/1-thumb.JPG",
    src: "/1.JPG",
    name: "Gallery Image 1",
  },
  {
    thumbSrc: "/2-thumb.jpg",
    src: "/2.jpg",
    name: "Gallery Image 2",
  },
  {
    thumbSrc: "/3-thumb.jpg",
    src: "/3.jpg",
    name: "Gallery Image 3",
  },
  {
    thumbSrc: "/4-thumb.jpg",
    src: "/4.jpg",
    name: "Gallery Image 4",
  },
  {
    thumbSrc: "/5-thumb.jpg",
    src: "/5.jpg",
    name: "Gallery Image 5",
  },
];

const staticReviews: Review[] = [
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
  {
    name: m.reviews_4_name(),
    description: m.reviews_4_desc(),
  },
  {
    name: m.reviews_5_name(),
    description: m.reviews_5_desc(),
  },
  {
    name: m.reviews_6_name(),
    description: m.reviews_6_desc(),
  },
  {
    name: m.reviews_7_name(),
    description: m.reviews_7_desc(),
  },
  {
    name: m.reviews_8_name(),
    description: m.reviews_8_desc(),
  },
  {
    name: m.reviews_9_name(),
    description: m.reviews_9_desc(),
  },
  {
    name: m.reviews_10_name(),
    description: m.reviews_10_desc(),
  },
  {
    name: m.reviews_11_name(),
    description: m.reviews_11_desc(),
  },
  {
    name: m.reviews_12_name(),
    description: m.reviews_12_desc(),
  },
  {
    name: m.reviews_13_name(),
    description: m.reviews_13_desc(),
  },
  {
    name: m.reviews_14_name(),
    description: m.reviews_14_desc(),
  },
  {
    name: m.reviews_15_name(),
    description: m.reviews_15_desc(),
  },
  {
    name: m.reviews_16_name(),
    description: m.reviews_16_desc(),
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
      { property: "og:image", content: "https://alexalashes.sk/banner-main-desktop.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Alexa Lashes",
          description: m.meta_index_desc(),
          telephone: telephoneNumber,
          url: "https://alexalashes.sk",
          image: "https://alexalashes.sk/banner-main-desktop.jpg",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Pajštúnska 1",
            addressLocality: "Bratislava",
            postalCode: "85101",
            addressCountry: "SK",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "17:00",
            },
          ],
          geo: {
            "@type": "GeoCoordinates",
            latitude: 48.11161906921437,
            longitude: 17.102062243103443,
          },
          sameAs: [instagramUrl, tiktokUrl],
        }),
      },
    ],
  }),
  loader: () => {
    const copy = [...staticReviews];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 3);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const reviews = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Banner
        title={m.banner_title()}
        description={m.banner_desc()}
        primaryAction={{ link: { to: "/prices" }, label: m.banner_link_services() }}
        secondaryAction={{ link: { to: "/contact" }, label: m.banner_link_contact() }}
        image="bg-[url(/banner-main-mobile.jpg)] md:bg-[url(/banner-main-desktop.jpg)]"
      />
      <div className="mx-auto mb-10 max-w-180 text-center">
        <h2 className="mb-3 font-bold text-xl md:text-3xl dark:text-primary">
          {m.home_welcome_title()}
        </h2>
        <p className="leading-6">{m.home_welcome_desc()}</p>
      </div>
      <div className="mb-18 md:mb-25">
        <Benefits data={benefits} />
      </div>
      <div className="mb-18 md:mb-25">
        <AboutUs />
      </div>
      <div className="mb-18 md:mb-25">
        <div className="mb-6">
          <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
            {m.home_gallery_title()}
          </h2>
          <PreviewGallery gallery={gallery} />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery" className="btn-primary">
            {m.home_gallery_link()}
          </Link>
        </div>
      </div>
      <div className="mb-18 md:mb-25">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
          {m.home_reviews_title()}
        </h2>
        <Reviews data={reviews} />
      </div>
      <Cta />
    </div>
  );
}
