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

const benefits = (): Benefit[] => [
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

const gallery = (): Gallery[] => [
  {
    thumbSrc: "/1-thumb.jpg",
    src: "/1.JPG",
    name: "2D mihalnice",
  },
  {
    thumbSrc: "/2-thumb.jpg",
    src: "/2.jpg",
    name: "1D mihalnice",
  },
  {
    thumbSrc: "/3-thumb.jpg",
    src: "/3.jpg",
    name: "3-4D mihalnice",
  },
  {
    thumbSrc: "/4-thumb.jpg",
    src: "/4.jpg",
    name: "2D mihalnice mokrý efekt",
  },
  {
    thumbSrc: "/5-thumb.jpg",
    src: "/5.jpg",
    name: "2D hnedé mihalnice mokrý efekt",
  },
];

const reviews = (): Review[] => [
  {
    name: m.reviews_19_name(),
    description: m.reviews_19_desc(),
    url: "https://maps.app.goo.gl/L5QS66EeYfRnRoiq8",
  },
  {
    name: m.reviews_18_name(),
    description: m.reviews_18_desc(),
    url: "https://maps.app.goo.gl/sz1r3DqWFAgmaVK89",
  },
  {
    name: m.reviews_2_name(),
    description: m.reviews_2_desc(),
    url: "https://maps.app.goo.gl/1ChGUGpWm3f2oPKV9",
  },
  {
    name: m.reviews_5_name(),
    description: m.reviews_5_desc(),
    url: "https://maps.app.goo.gl/PzXfC4WNqBCgfn9r9",
  },
  {
    name: m.reviews_4_name(),
    description: m.reviews_4_desc(),
    url: "https://maps.app.goo.gl/CJiMfJo38iBBn6gP9",
  },
  {
    name: m.reviews_1_name(),
    description: m.reviews_1_desc(),
    url: "https://maps.app.goo.gl/9U6Q9Fw7bVGKxefV6",
  },
  {
    name: m.reviews_11_name(),
    description: m.reviews_11_desc(),
    url: "https://maps.app.goo.gl/uoQgh5BpxLn5nJh27",
  },
  {
    name: m.reviews_14_name(),
    description: m.reviews_14_desc(),
    url: "https://maps.app.goo.gl/wC1sH7urBxwtb5cm6",
  },
  {
    name: m.reviews_12_name(),
    description: m.reviews_12_desc(),
    url: "https://maps.app.goo.gl/aqFucHQW7k1EZbWc9",
  },
  {
    name: m.reviews_7_name(),
    description: m.reviews_7_desc(),
    url: "https://maps.app.goo.gl/hWDEp5Pt6HqMaBrT9",
  },
  {
    name: m.reviews_6_name(),
    description: m.reviews_6_desc(),
    url: "https://maps.app.goo.gl/zeNuoPXuUqx3cHm58",
  },
  {
    name: m.reviews_10_name(),
    description: m.reviews_10_desc(),
    url: "https://maps.app.goo.gl/qEgJ9S8Coxc4M2vK7",
  },
  {
    name: m.reviews_9_name(),
    description: m.reviews_9_desc(),
    url: "https://maps.app.goo.gl/96i4JNDxeSG5Cc3u5",
  },
  {
    name: m.reviews_3_name(),
    description: m.reviews_3_desc(),
    url: "https://maps.app.goo.gl/XvL2rC2Hbme8WoSVA",
  },
  {
    name: m.reviews_8_name(),
    description: m.reviews_8_desc(),
    url: "https://maps.app.goo.gl/hEJVQ3TfhVejWRaP8",
  },
  {
    name: m.reviews_13_name(),
    description: m.reviews_13_desc(),
    url: "https://maps.app.goo.gl/vFo2gkCTN1oz5pWk6",
  },
  {
    name: m.reviews_17_name(),
    description: m.reviews_17_desc(),
    url: "https://maps.app.goo.gl/9jb1H8f8TQSr3dxF8",
  },
  {
    name: m.reviews_16_name(),
    description: m.reviews_16_desc(),
    url: "https://maps.app.goo.gl/Vqxnw1UhbK29byDj6",
  },
  {
    name: m.reviews_15_name(),
    description: m.reviews_15_desc(),
    url: "https://maps.app.goo.gl/AZojrnuhEGdrjw1J7",
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
    links: [
      { rel: "alternate", href: "https://alexalashes.sk/sk/", hrefLang: "sk" },
      { rel: "alternate", href: "https://alexalashes.sk/en/", hrefLang: "en" },
      { rel: "alternate", href: "https://alexalashes.sk/sk/", hrefLang: "x-default" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "@id": "https://alexalashes.sk/#salon",
          name: "Alexa Lashes",
          description: m.meta_index_desc(),
          telephone: telephoneNumber,
          url: "https://alexalashes.sk",
          image: "https://alexalashes.sk/banner-main-desktop.jpg",
          logo: "https://alexalashes.sk/logo.png",
          owner: {
            "@type": "Person",
            jobTitle: "Lash Stylist",
            name: "Oleksandra Afanasieva",
            image: "https://alexalashes.sk/alexa-lashes-stylist.jpg",
            sameAs: instagramUrl,
          },
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
          priceRange: "€€",
          aggregateRating: {
            "@type": "AggregateRating",
            bestRating: "5",
            reviewCount: "35",
            ratingValue: "5",
          },
          sameAs: [instagramUrl, tiktokUrl],
        }),
      },
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
        image="bg-[url(/banner-main-mobile.jpg)] md:bg-[url(/banner-main-desktop.jpg)]"
        buttons={
          <>
            <Link to="/prices/" className="btn-primary mx-2">
              {m.banner_link_services()}
            </Link>
            <Link to="/contact/" className="btn-secondary mx-2">
              {m.banner_link_contact()}
            </Link>
          </>
        }
      />
      <div className="mx-auto mb-10 max-w-180 text-center">
        <h2 className="mb-3 font-bold text-xl md:text-3xl dark:text-primary">
          {m.home_welcome_title()}
        </h2>
        <p className="leading-6">{m.home_welcome_desc()}</p>
      </div>
      <div className="mb-18 md:mb-25">
        <Benefits data={benefits()} />
      </div>
      <div className="mb-18 md:mb-25">
        <AboutUs />
      </div>
      <div className="mb-18 md:mb-25">
        <div className="mb-6">
          <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
            {m.home_gallery_title()}
          </h2>
          <PreviewGallery gallery={gallery()} />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery/" className="btn-primary">
            {m.home_gallery_link()}
          </Link>
        </div>
      </div>
      <div className="mb-18 md:mb-25">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
          {m.home_reviews_title()}
        </h2>
        <Reviews reviews={reviews()} />
      </div>
      <Cta />
    </div>
  );
}
