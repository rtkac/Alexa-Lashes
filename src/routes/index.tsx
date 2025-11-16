import { createFileRoute } from "@tanstack/react-router";

import Banner from "@/components/Banner";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: m.meta_title(),
      },
      {
        name: "description",
        content: m.meta_desc(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Banner />
    </div>
  );
}
