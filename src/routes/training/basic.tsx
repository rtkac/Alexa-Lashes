import { createFileRoute } from "@tanstack/react-router";

import Banner from "@/components/Banner";
import Includes from "@/components/Includes";
import { LashMaster } from "@/components/LashMaster";
import { Program } from "@/components/Program";
import TrainingPrice from "@/components/TrainingPrice";
import { m } from "@/paraglide/messages";
import { instagramUrl } from "@/types";

const benefits: string[] = [
  m.training_basic_benefit_1_title(),
  m.training_basic_benefit_2_title(),
  m.training_basic_benefit_3_title(),
  m.training_basic_benefit_4_title(),
  m.training_basic_benefit_5_title(),
  m.training_basic_benefit_6_title(),
  m.training_basic_benefit_7_title(),
];

const includes: string[] = [
  m.training_basic_includes_1_title(),
  m.training_basic_includes_2_title(),
  m.training_basic_includes_3_title(),
  m.training_basic_includes_4_title(),
  m.training_basic_includes_5_title(),
];

export const Route = createFileRoute("/training/basic")({
  head: () => ({
    meta: [
      { title: m.meta_training_basic_title() },
      { name: "description", content: m.meta_training_basic_desc() },
      { property: "og:type", content: "article" },
      { property: "og:title", content: m.meta_training_basic_title() },
      { property: "og:description", content: m.meta_training_basic_desc() },
      { property: "og:image", content: "https://alexalashes.sk/basic-training-banner.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: m.meta_schema_training_basic_title(),
          description: m.meta_training_basic_desc(),
          image: "https://alexalashes.sk/basic-training-banner.jpg",
          instructor: {
            "@type": "Person",
            jobTitle: "Lash Stylist",
            name: "Oleksandra Afanasieva",
            sameAs: instagramUrl,
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["onsite"],
            offers: {
              "@type": "Offer",
              price: "870",
              priceCurrency: "EUR",
            },
          },
          location: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Pajštúnska 1",
              addressLocality: "Bratislava",
              addressRegion: "Bratislava",
              postalCode: "85101",
              addressCountry: "SK",
            },
            url: "https://alexalashes.sk/contact",
          },
          duration: "PT16H",
          availableLanguage: [
            {
              "@type": "Language",
              name: "Slovak",
            },
            {
              "@type": "Language",
              name: "Russian",
            },
            {
              "@type": "Language",
              name: "Ukrainian",
            },
          ],
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
        title={m.training_basic_banner_title()}
        description={m.training_basic_banner_desc()}
        primaryAction={{ link: { to: "/contact" }, label: m.training_basic_banner_link_contact() }}
        image="bg-[url(/basic-training-banner.jpg)]"
        isDark
      />
      <div className="mx-auto mb-20 max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-primary text-xl md:text-3xl">
          {m.training_basic_welcome_title()}
        </h2>
        <p className="mb-4">{m.training_basic_welcome_desc_1()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_2()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_3()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_4()}</p>
        <p className="mb-4">{m.training_basic_welcome_desc_5()}</p>
        <p className="mb-4 font-bold">{m.training_basic_welcome_desc_6()}</p>
      </div>
      <div className="mb-18">
        <h2 className="mb-10 text-center font-bold text-xl md:text-3xl dark:text-primary">
          {m.training_basic_why_title()}
        </h2>
        <Includes data={benefits} />
        <p className="text-center text-neutral-500 text-sm">{m.training_basic_why_desc()}</p>
      </div>
      <div className="mb-18">
        <h2 className="mb-10 text-center font-bold text-xl md:text-3xl dark:text-primary">
          {m.training_basic_program_title()}
        </h2>
        <Program />
      </div>
      <div className="mb-18">
        <h2 className="mb-5 text-center font-bold text-xl md:text-3xl dark:text-primary">
          {m.training_basic_includes_title()}
        </h2>
        <p className="mb-5 text-center">{m.training_basic_includes_desc()}</p>
        <Includes data={includes} />
      </div>
      <div className="mb-18">
        <TrainingPrice duration={m.training_basic_duration()} price={870} />
      </div>
      <div className="mb-8">
        <LashMaster title={m.teacher_title()} desc_1={m.teacher_desc()} />
      </div>
    </div>
  );
}
