import { createFileRoute } from "@tanstack/react-router";

import Cta from "@/components/Cta";
import Gallery from "@/components/Gallery";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-8 max-w-180 text-center">
        <h1 className="mb-2.5 font-bold text-xl md:text-4xl">{m.gallery_title()}</h1>
        <p className="mb-10">{m.gallery_desc()}</p>
      </div>
      <Gallery />
      <Cta />
    </div>
  );
}
