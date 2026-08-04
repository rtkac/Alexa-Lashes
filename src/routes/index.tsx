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
    src: "/1.webp",
    name: "2D mihalnice",
  },
  {
    thumbSrc: "/2-thumb.jpg",
    src: "/2.webp",
    name: "1D mihalnice",
  },
  {
    thumbSrc: "/3-thumb.jpg",
    src: "/3.webp",
    name: "3-4D mihalnice",
  },
  {
    thumbSrc: "/4-thumb.jpg",
    src: "/4.webp",
    name: "2D mihalnice mokrý efekt",
  },
  {
    thumbSrc: "/5-thumb.jpg",
    src: "/5.webp",
    name: "2D hnedé mihalnice mokrý efekt",
  },
];

const REVIEWS_COUNT = 27;

const REVIEW_URLS = [
  "https://maps.app.goo.gl/9U6Q9Fw7bVGKxefV6", // 1
  "https://maps.app.goo.gl/1ChGUGpWm3f2oPKV9", // 2
  "https://maps.app.goo.gl/XvL2rC2Hbme8WoSVA", // 3
  "https://maps.app.goo.gl/CJiMfJo38iBBn6gP9", // 4
  "https://maps.app.goo.gl/PzXfC4WNqBCgfn9r9", // 5
  "https://maps.app.goo.gl/zeNuoPXuUqx3cHm58", // 6
  "https://maps.app.goo.gl/hWDEp5Pt6HqMaBrT9", // 7
  "https://maps.app.goo.gl/hEJVQ3TfhVejWRaP8", // 8
  "https://maps.app.goo.gl/96i4JNDxeSG5Cc3u5", // 9
  "https://maps.app.goo.gl/qEgJ9S8Coxc4M2vK7", // 10
  "https://maps.app.goo.gl/uoQgh5BpxLn5nJh27", // 11
  "https://maps.app.goo.gl/aqFucHQW7k1EZbWc9", // 12
  "https://maps.app.goo.gl/vFo2gkCTN1oz5pWk6", // 13
  "https://maps.app.goo.gl/wC1sH7urBxwtb5cm6", // 14
  "https://maps.app.goo.gl/AZojrnuhEGdrjw1J7", // 15
  "https://maps.app.goo.gl/Vqxnw1UhbK29byDj6", // 16
  "https://maps.app.goo.gl/9jb1H8f8TQSr3dxF8", // 17
  "https://maps.app.goo.gl/sz1r3DqWFAgmaVK89", // 18
  "https://maps.app.goo.gl/L5QS66EeYfRnRoiq8", // 19
  "https://maps.app.goo.gl/NjpiUoqwPMhYTZpV9", // 20
  "https://maps.app.goo.gl/WBNHey2s4NVPoVoa8", // 21
  "https://maps.app.goo.gl/9yUDJnbx8Ew7KJt79", // 22
  "https://maps.app.goo.gl/a8GAEmZsQ4TqsU628", // 23
  "https://maps.app.goo.gl/i1xf7dU2AT6G2iaHA", // 24
  "https://maps.app.goo.gl/JNiVP2LAWP3JdFzP6", // 25
  "https://maps.app.goo.gl/fkbCMPLwZ8cDSoyq5", // 26
  "https://maps.app.goo.gl/WziBccAA99WhHhHx9", // 27
];

const reviews = (): Review[] =>
  Array.from({ length: REVIEWS_COUNT }, (_, i) => {
    const n = REVIEWS_COUNT - i; // newest first
    return {
      name: (m[`reviews_${n}_name` as keyof typeof m] as () => string)(),
      description: (m[`reviews_${n}_desc` as keyof typeof m] as () => string)(),
      url: REVIEW_URLS[n - 1],
    };
  });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: m.meta_index_title() },
      { name: "description", content: m.meta_index_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_index_title() },
      { property: "og:description", content: m.meta_index_desc() },
      { property: "og:image", content: "https://alexalashes.sk/banner-main-desktop.webp" },
    ],
    links: [
      { rel: "alternate", href: "https://alexalashes.sk/", hrefLang: "sk" },
      { rel: "alternate", href: "https://alexalashes.sk/en", hrefLang: "en" },
      { rel: "alternate", href: "https://alexalashes.sk/ru", hrefLang: "ru" },
      { rel: "alternate", href: "https://alexalashes.sk/", hrefLang: "x-default" },
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
          image: "https://alexalashes.sk/banner-main-desktop.webp",
          logo: "https://alexalashes.sk/logo.png",
          owner: {
            "@type": "Person",
            jobTitle: "Lash Stylist",
            name: "Oleksandra Afanasieva",
            image: "https://alexalashes.sk/alexa-lashes-stylist.webp",
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
            reviewCount: "46", // update with the actual number of reviews from Google Maps
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
        image="bg-[url(/banner-main-mobile.webp)] md:bg-[url(/banner-main-desktop.webp)]"
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
