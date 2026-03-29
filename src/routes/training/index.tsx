import { createFileRoute, Link } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import PreviewGallery from "@/components/PreviewGallery";
import Trainings from "@/components/Trainings";
import { m } from "@/paraglide/messages";
import type { Gallery } from "@/types";

const gallery: Gallery[] = [
  {
    thumbSrc: "/course-1.jpg",
    src: "/course-1.jpg",
    name: "Gallery Image 1",
  },
  {
    thumbSrc: "/course-2.jpg",
    src: "/course-2.jpg",
    name: "Gallery Image 2",
  },
  {
    thumbSrc: "/course-3.jpg",
    src: "/course-3.jpg",
    name: "Gallery Image 3",
  },
  {
    thumbSrc: "/course-4.jpg",
    src: "/course-4.jpg",
    name: "Gallery Image 4",
  },
  {
    thumbSrc: "/course-5.jpg",
    src: "/course-5.jpg",
    name: "Gallery Image 5",
  },
];

export const Route = createFileRoute("/training/")({
  head: () => ({
    meta: [
      { title: m.meta_training_title() },
      { name: "description", content: m.meta_training_desc() },
      { property: "og:type", content: "website" },
      { property: "og:title", content: m.meta_training_title() },
      { property: "og:description", content: m.meta_training_desc() },
      { property: "og:image", content: "https://alexalashes.sk/basic-training-banner.jpg" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-14 max-w-180 text-center">
        <h1 className="mb-3 font-bold text-2xl md:text-4xl dark:text-primary">
          {m.training_title()}
        </h1>
        <p className="leading-6">{m.training_desc()}</p>
      </div>

      <div className="mb-18">
        <Trainings />
      </div>

      <div className="mb-18">
        <h2 className="mb-6 text-center font-bold text-xl md:text-2xl">
          {m.training_gallery_title()}
        </h2>
        <div className="mb-6">
          <PreviewGallery gallery={gallery} />
        </div>
        <div className="flex justify-center">
          <Link to="/gallery" className="btn-outline-primary">
            {m.training_gallery_link()}
          </Link>
        </div>
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
