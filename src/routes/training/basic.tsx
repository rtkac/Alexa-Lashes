import { createFileRoute } from "@tanstack/react-router";

import Banner from "@/components/Banner";
import Includes from "@/components/Includes";
import { Program } from "@/components/Program";
import Teacher from "@/components/Teacher";
import TrainingPrice from "@/components/TrainingPrice";
import { m } from "@/paraglide/messages";

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
      { property: "og:image", content: "https://placehold.co/1500x800/656e6c/656e6c" },
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
        primaryAction={{ link: "/contact", label: m.training_basic_banner_link_contact() }}
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
        <Teacher />
      </div>
    </div>
  );
}
