import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import Banner from "@/components/Banner";
import Cta from "@/components/Cta";
import { LashMaster } from "@/components/LashMaster";
import PreviewGallery from "@/components/PreviewGallery";
import { m } from "@/paraglide/messages";
import type { Gallery } from "@/types";

const gallery = (): Gallery[] => [
  {
    thumbSrc: "/reception.jpg",
    src: "/reception.webp",
    name: "Recepcia Alexa Lashes",
  },
  {
    thumbSrc: "/salon-4.jpg",
    src: "/salon-4.webp",
    name: "Darčeky pre klientov salónu",
  },
  {
    thumbSrc: "/salon-2.jpg",
    src: "/salon-2.webp",
    name: "Čakáreň Alexa Lashes",
  },
  {
    thumbSrc: "/salon-3.jpg",
    src: "/salon-3.webp",
    name: "Kozmetické kreslo so svetlom",
  },
  {
    thumbSrc: "/salon-5.jpg",
    src: "/salon-5.webp",
    name: "Kvety a darčeková poukážka",
  },
];

export const Route = createFileRoute("/about")({
  head: ({ match }) => ({
    meta: [
      { title: m.meta_about_title() },
      { name: "description", content: m.meta_about_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_about_title() },
      { property: "og:description", content: m.meta_about_desc() },
      { property: "og:image", content: "https://alexalashes.sk/salon-2.webp" },
    ],
    links: [
      { rel: "alternate", href: `https://alexalashes.sk${match.pathname}/`, hrefLang: "sk" },
      { rel: "alternate", href: `https://alexalashes.sk/en${match.pathname}/`, hrefLang: "en" },
      {
        rel: "alternate",
        href: `https://alexalashes.sk${match.pathname}/`,
        hrefLang: "x-default",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="md:mb-25">
        <Banner
          title={m.about_banner_title()}
          description={m.about_banner_desc()}
          image="bg-[url(/salon-2.webp)]"
          isDark
        />
      </div>
      <div className="mb-18 grid gap-8 sm:grid-cols-2 md:mb-25 md:gap-12">
        <div className="text-center sm:text-left">
          <div className="space-y-5">
            <h2 className="font-bold text-xl md:text-3xl dark:text-primary">{m.about_title()}</h2>
            <p className="leading-6">{m.about_desc_1()}</p>
            <p className="leading-6">
              <ParaglideMessage
                message={m.about_desc_2}
                inputs={{}}
                markup={{
                  link: ({ children }) => <Link to="/training/">{children}</Link>,
                }}
              />
            </p>
            <p className="rounded-r-md border-primary border-l-4 bg-primary-light p-5 font-bold text-primary italic">
              {m.about_desc_label()}
            </p>
          </div>
        </div>
        <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-md sm:max-h-full md:max-h-105">
          <img src="/salon-alexa.webp" alt="Salón Alexa Lashes" className="w-full rounded-md" />
        </div>
      </div>
      <div className="mb-18 md:mb-25">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl dark:text-primary">
          {m.about_gallery_title()}
        </h2>
        <PreviewGallery gallery={gallery()} />
      </div>
      <div className="mb-18 md:mb-25">
        <LashMaster
          title={m.lash_master_title()}
          desc_1={
            <ParaglideMessage
              message={m.lash_master_desc_1}
              inputs={{}}
              markup={{
                link: ({ children }) => <Link to="/">{children}</Link>,
              }}
            />
          }
          desc_2={m.lash_master_desc_2()}
        />
      </div>
      <Cta />
    </div>
  );
}
