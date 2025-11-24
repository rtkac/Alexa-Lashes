import { createFileRoute } from "@tanstack/react-router";
import { AwardIcon, EyeClosedIcon, UsersIcon } from "lucide-react";

import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import Faqs from "@/components/Faqs";
import Teacher from "@/components/Teacher";
import TrainingPrice from "@/components/TrainingPrice";
import { m } from "@/paraglide/messages";
import type { Benefit, Faq } from "@/types";

const benefits: Benefit[] = [
  {
    icon: <UsersIcon className="mb-4 text-primary" />,
    title: m.training_advanced_benefit_1_title(),
    description: m.training_advanced_benefit_1_desc(),
  },
  {
    icon: <EyeClosedIcon className="mb-4 text-primary" />,
    title: m.training_advanced_benefit_2_title(),
    description: m.training_advanced_benefit_2_desc(),
  },
  {
    icon: <AwardIcon className="mb-4 text-primary" />,
    title: m.training_advanced_benefit_3_title(),
    description: m.training_advanced_benefit_3_desc(),
  },
];

const faqs: Faq[] = [
  {
    question: m.training_advanced_faq_1_title(),
    answer: m.training_advanced_faq_1_desc(),
  },
  {
    question: m.training_advanced_faq_2_title(),
    answer: m.training_advanced_faq_2_desc(),
  },
  {
    question: m.training_advanced_faq_3_title(),
    answer: m.training_advanced_faq_3_desc(),
  },
  {
    question: m.training_advanced_faq_4_title(),
    answer: m.training_advanced_faq_4_desc(),
  },
];

export const Route = createFileRoute("/training/advanced")({
  head: () => ({
    meta: [
      {
        title: m.meta_training_advanced_title(),
      },
      {
        name: "description",
        content: m.meta_training_advanced_desc(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Banner
        title={m.training_advanced_banner_title()}
        description={m.training_advanced_banner_desc()}
        primaryAction={{ link: "/contact", label: m.training_advanced_banner_link_contact() }}
      />
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h2 className="mb-2.5 font-bold text-xl md:text-3xl">
          {m.training_advanced_welcome_title()}
        </h2>
        <p>{m.training_advanced_welcome_desc()}</p>
      </div>
      <div className="mb-18">
        <Benefits data={benefits} />
      </div>
      <div className="mb-18">
        <h2 className="mb-2.5 text-center font-bold text-xl md:text-2xl">
          {m.training_advanced_faq_title()}
        </h2>
        <Faqs data={faqs} />
      </div>
      <div className="mb-18">
        <Teacher />
      </div>
      <div className="mb-8">
        <TrainingPrice duration={m.training_advanced_duration()} price={850} />
      </div>
    </div>
  );
}
