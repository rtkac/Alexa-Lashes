import { createFileRoute } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import Gallery from "@/components/Gallery";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/gallery")({
  head: () => {
    return {
      meta: [
        { title: m.meta_gallery_title() },
        { name: "description", content: m.meta_gallery_desc() },
        { property: "og:type", content: "website" },
        { property: "og:title", content: m.meta_gallery_title() },
        { property: "og:description", content: m.meta_gallery_desc() },
        { property: "og:image", content: "/home/1.jpg" },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-10 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-2xl md:text-4xl">{m.gallery_title()}</h1>
        <p>{m.gallery_desc()}</p>
      </div>
      <div className="mb-18">
        <Gallery />
      </div>
      <Cta
        title={m.cta_gallery_title()}
        description={m.cta_gallery_desc()}
        buttonLabel={m.cta_gallery_button()}
      />
    </div>
  );
}
