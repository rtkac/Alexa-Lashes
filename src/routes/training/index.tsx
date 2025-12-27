import { createFileRoute } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import PreviewGallery from "@/components/PreviewGallery";
import Trainings from "@/components/Trainings";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/training/")({
  head: () => ({
    meta: [
      { title: m.meta_training_title() },
      { name: "description", content: m.meta_training_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_training_title() },
      { property: "og:description", content: m.meta_training_desc() },
      { property: "og:image", content: "https://placehold.co/1500x800/656e6c/656e6c" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-2xl md:text-4xl">{m.training_title()}</h1>
        <p>{m.training_desc()}</p>
      </div>

      <div className="mb-14">
        <Trainings />
      </div>

      <div className="mb-18">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl">
          {m.training_gallery_title()}
        </h2>
        <PreviewGallery />
      </div>

      <Cta
        variant="white"
        title={m.cta_training_title()}
        description={m.cta_training_desc()}
        buttonLabel={m.cta_training_button()}
      />
    </div>
  );
}
