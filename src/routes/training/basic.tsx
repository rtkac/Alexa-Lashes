import { createFileRoute } from "@tanstack/react-router";
import { ArchiveIcon, AwardIcon, EyeClosedIcon } from "lucide-react";

import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import FaqTraining from "@/components/FaqTraining";
import Teacher from "@/components/Teacher";
import TrainingPrice from "@/components/TrainingPrice";
import { m } from "@/paraglide/messages";
import type { Benefit } from "@/types";

const benefits: Benefit[] = [
  {
    icon: <AwardIcon className="mb-4 text-primary" />,
    title: m.training_basic_benefit_1_title(),
    description: m.training_basic_benefit_1_desc(),
  },
  {
    icon: <ArchiveIcon className="mb-4 text-primary" />,
    title: m.training_basic_benefit_2_title(),
    description: m.training_basic_benefit_2_desc(),
  },
  {
    icon: <EyeClosedIcon className="mb-4 text-primary" />,
    title: m.training_basic_benefit_3_title(),
    description: m.training_basic_benefit_3_desc(),
  },
];

export const Route = createFileRoute("/training/basic")({
  head: () => ({
    meta: [
      {
        title: m.meta_training_basic_title(),
      },
      {
        name: "description",
        content: m.meta_training_basic_desc(),
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
        primaryAction={{ link: "/contact", label: m.training_basic_banner_link_contact() }}
      />
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h2 className="mb-2.5 font-bold text-xl md:text-3xl">{m.training_basic_welcome_title()}</h2>
        <p>{m.training_basic_welcome_desc()}</p>
      </div>
      <div className="mb-18">
        <Benefits data={benefits} />
      </div>
      <div className="mb-18">
        <h2 className="mb-2.5 text-center font-bold text-xl md:text-2xl">
          {m.training_basic_faq_title()}
        </h2>
        <FaqTraining variant="basic" />
      </div>
      <div className="mb-18">
        <Teacher />
      </div>
      <div className="mb-8">
        <TrainingPrice />
      </div>
    </div>
  );
}
